/*!
 * Winmail.dat Extractor - client-side TNEF attachment extraction.
 * Everything runs in the browser: the selected file is never uploaded.
 */
(() => {
  'use strict';

  const input = document.getElementById('fileInput');
  const dropzone = document.getElementById('dropzone');
  const status = document.getElementById('status');
  const filesBox = document.getElementById('files');
  const fileList = document.getElementById('fileList');
  const filesTitle = document.getElementById('filesTitle');
  const downloadButton = document.getElementById('downloadButton');
  const resetButton = document.getElementById('resetButton');

  if (!input || !dropzone) return;

  let zipBlob = null;
  let zipName = 'winmail-attachments.zip';

  function showStatus(message, type = '') {
    status.className = `status show ${type}`.trim();
    status.textContent = message;
  }

  function resetResults(clearPicker = true) {
    zipBlob = null;
    fileList.replaceChildren();
    filesBox.classList.remove('show');
    status.className = 'status';
    status.textContent = '';
    if (clearPicker) input.value = '';
  }

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / (1024 ** i)).toFixed(i ? 1 : 0)} ${units[i]}`;
  }

  function safeName(value, fallback) {
    const cleaned = String(value || fallback)
      .replace(/[\\/:*?"<>|\x00-\x1f]/g, '_')
      .replace(/^\.+/, '')
      .trim();
    return cleaned || fallback;
  }

  function uniqueName(name, used) {
    if (!used.has(name)) { used.add(name); return name; }
    const dot = name.lastIndexOf('.');
    const stem = dot > 0 ? name.slice(0, dot) : name;
    const ext = dot > 0 ? name.slice(dot) : '';
    let n = 2;
    while (used.has(`${stem} (${n})${ext}`)) n += 1;
    const result = `${stem} (${n})${ext}`;
    used.add(result);
    return result;
  }

  function decodeName(data) {
    let end = data.length;
    while (end > 0 && data[end - 1] === 0) end -= 1;
    const bytes = data.subarray(0, end);
    if (!bytes.length) return '';

    let oddZeros = 0;
    for (let i = 1; i < bytes.length; i += 2) if (bytes[i] === 0) oddZeros += 1;
    const looksUtf16 = bytes.length >= 4 && oddZeros >= Math.floor(bytes.length / 4);

    try {
      return new TextDecoder(looksUtf16 ? 'utf-16le' : 'windows-1252').decode(bytes).replace(/\0/g, '').trim();
    } catch (_) {
      let text = '';
      for (const byte of bytes) text += String.fromCharCode(byte);
      return text.replace(/\0/g, '').trim();
    }
  }

  function parseTnef(bytes) {
    if (!(bytes instanceof Uint8Array) || bytes.length < 6) {
      throw new Error('The selected file is empty or too small.');
    }

    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const signature = view.getUint32(0, true);
    if (signature !== 0x223e9f78) {
      throw new Error('This is not a valid Outlook TNEF/winmail.dat file.');
    }

    const ATTR_ATTACH_DATA = 0x800f;
    const ATTR_ATTACH_TITLE = 0x8010;
    const ATTR_TRANSPORT_NAME = 0x9001;
    const ATTR_REND_DATA = 0x9002;
    const LEVEL_ATTACHMENT = 0x02;

    let offset = 6;
    let current = null;
    const attachments = [];

    const finishCurrent = () => {
      if (current && current.data && current.data.length) attachments.push(current);
      current = null;
    };

    while (offset + 11 <= bytes.length) {
      const level = view.getUint8(offset); offset += 1;
      const name = view.getUint16(offset, true); offset += 2;
      offset += 2; // attribute type
      const length = view.getUint32(offset, true); offset += 4;

      if (length > bytes.length - offset - 2) {
        throw new Error('The TNEF file is incomplete or damaged.');
      }

      const data = bytes.subarray(offset, offset + length);
      offset += length;
      offset += 2; // checksum

      if (level !== LEVEL_ATTACHMENT) continue;

      if (name === ATTR_REND_DATA) {
        finishCurrent();
        current = { name: '', transportName: '', data: null };
        continue;
      }

      if (!current) current = { name: '', transportName: '', data: null };

      if (name === ATTR_ATTACH_TITLE) current.name = decodeName(data);
      else if (name === ATTR_TRANSPORT_NAME) current.transportName = decodeName(data);
      else if (name === ATTR_ATTACH_DATA) current.data = new Uint8Array(data);
    }

    finishCurrent();
    return attachments;
  }

  const crcTable = (() => {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n += 1) {
      let c = n;
      for (let k = 0; k < 8; k += 1) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      table[n] = c >>> 0;
    }
    return table;
  })();

  function crc32(bytes) {
    let crc = 0xffffffff;
    for (let i = 0; i < bytes.length; i += 1) crc = crcTable[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  }

  function dosDateTime(date = new Date()) {
    const year = Math.max(1980, date.getFullYear());
    const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
    const day = (year - 1980) << 9 | ((date.getMonth() + 1) << 5) | date.getDate();
    return { time, day };
  }

  function makeZip(files) {
    const encoder = new TextEncoder();
    const parts = [];
    const centrals = [];
    let localOffset = 0;
    const { time, day } = dosDateTime();

    for (const file of files) {
      const nameBytes = encoder.encode(file.name);
      const data = file.data;
      const crc = crc32(data);

      const local = new Uint8Array(30 + nameBytes.length);
      const lv = new DataView(local.buffer);
      lv.setUint32(0, 0x04034b50, true);
      lv.setUint16(4, 20, true);
      lv.setUint16(6, 0x0800, true);
      lv.setUint16(8, 0, true);
      lv.setUint16(10, time, true);
      lv.setUint16(12, day, true);
      lv.setUint32(14, crc, true);
      lv.setUint32(18, data.length, true);
      lv.setUint32(22, data.length, true);
      lv.setUint16(26, nameBytes.length, true);
      lv.setUint16(28, 0, true);
      local.set(nameBytes, 30);
      parts.push(local, data);

      const central = new Uint8Array(46 + nameBytes.length);
      const cv = new DataView(central.buffer);
      cv.setUint32(0, 0x02014b50, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint16(8, 0x0800, true);
      cv.setUint16(10, 0, true);
      cv.setUint16(12, time, true);
      cv.setUint16(14, day, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, data.length, true);
      cv.setUint32(24, data.length, true);
      cv.setUint16(28, nameBytes.length, true);
      cv.setUint16(30, 0, true);
      cv.setUint16(32, 0, true);
      cv.setUint16(34, 0, true);
      cv.setUint16(36, 0, true);
      cv.setUint32(38, 0, true);
      cv.setUint32(42, localOffset, true);
      central.set(nameBytes, 46);
      centrals.push(central);

      localOffset += local.length + data.length;
    }

    const centralSize = centrals.reduce((sum, part) => sum + part.length, 0);
    const end = new Uint8Array(22);
    const ev = new DataView(end.buffer);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(4, 0, true);
    ev.setUint16(6, 0, true);
    ev.setUint16(8, files.length, true);
    ev.setUint16(10, files.length, true);
    ev.setUint32(12, centralSize, true);
    ev.setUint32(16, localOffset, true);
    ev.setUint16(20, 0, true);

    return new Blob([...parts, ...centrals, end], { type: 'application/zip' });
  }

  async function handleFile(file) {
    resetResults(false); // Important: do not clear Safari's selected file before reading it.
    if (!file) {
      showStatus('No file was selected.', 'error');
      return;
    }

    showStatus(`Selected ${file.name} (${formatBytes(file.size)}). Reading file…`, 'working');
    await new Promise(resolve => setTimeout(resolve, 30));

    try {
      if (file.size > 150 * 1024 * 1024) throw new Error('Please choose a file smaller than 150 MB.');
      const buffer = await file.arrayBuffer();
      showStatus('File loaded. Extracting attachments…', 'working');
      await new Promise(resolve => setTimeout(resolve, 20));

      const parsed = parseTnef(new Uint8Array(buffer));
      if (!parsed.length) {
        throw new Error('The file is valid TNEF, but no standard file attachments were found. It may contain only an Outlook meeting or embedded message.');
      }

      const used = new Set();
      const files = parsed.map((item, index) => ({
        name: uniqueName(safeName(item.name || item.transportName, `attachment-${index + 1}`), used),
        data: item.data
      }));

      showStatus(`Extracted ${files.length} file${files.length === 1 ? '' : 's'}. Creating ZIP…`, 'working');
      await new Promise(resolve => setTimeout(resolve, 20));
      zipBlob = makeZip(files);
      zipName = `${safeName(file.name.replace(/\.[^.]+$/, ''), 'winmail')}-attachments.zip`;

      for (const item of files) {
        const row = document.createElement('div');
        row.className = 'row';
        const left = document.createElement('div');
        left.className = 'name';
        left.textContent = item.name;
        const right = document.createElement('div');
        right.className = 'size';
        right.textContent = formatBytes(item.data.length);
        row.append(left, right);
        fileList.append(row);
      }

      filesTitle.textContent = `${files.length} file${files.length === 1 ? '' : 's'} extracted`;
      filesBox.classList.add('show');
      showStatus('Ready. Select Download ZIP below.', 'success');
      filesBox.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      showStatus(error && error.message ? error.message : 'Extraction failed. Please try another winmail.dat file.', 'error');
    }
  }

  input.addEventListener('change', () => {
    handleFile(input.files && input.files[0]);
  });

  ['dragenter', 'dragover'].forEach(type => dropzone.addEventListener(type, event => {
    event.preventDefault();
    dropzone.classList.add('dragover');
  }));
  ['dragleave', 'drop'].forEach(type => dropzone.addEventListener(type, event => {
    event.preventDefault();
    dropzone.classList.remove('dragover');
  }));
  dropzone.addEventListener('drop', event => handleFile(event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]));

  resetButton.addEventListener('click', () => {
    resetResults(true);
    input.click();
  });

  downloadButton.addEventListener('click', () => {
    if (!zipBlob) return;
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = zipName;
    link.style.display = 'none';
    document.body.append(link);
    link.click();
    setTimeout(() => {
      link.remove();
      URL.revokeObjectURL(url);
    }, 3000);
  });

  window.addEventListener('error', event => {
    showStatus(`App error: ${event.message || 'unknown JavaScript error'}`, 'error');
  });
  window.addEventListener('unhandledrejection', event => {
    const reason = event.reason && event.reason.message ? event.reason.message : String(event.reason || 'unknown error');
    showStatus(`App error: ${reason}`, 'error');
  });
})();
