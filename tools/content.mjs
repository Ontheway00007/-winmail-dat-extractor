/**
 * All site content lives here. `tools/build.mjs` turns it into static HTML.
 *
 * Page shape:
 *   kind: 'home' | 'guides' | 'article' | 'legal'
 *   slug: URL segment ('' for the home page)
 *   title / metaTitle / description: search snippet copy
 *   h1, lead, sections[{id,h2,html}], faqs[{q,a}], howTo, sources, related
 */

export const SITE = {
  origin: 'https://winmail-dat-extractor.vercel.app',
  name: 'Winmail.dat Extractor',
  tagline: 'Open winmail.dat files in your browser and download the trapped Outlook attachments as a ZIP.',
  repo: 'https://github.com/Ontheway00007/-winmail-dat-extractor',
  googleVerification: 'hXT62BUuVEpy25HgLysnlof1lrKRcib5wT9YqQJxoEI',
  googleVerificationFile: 'google5d93febf81e26a1b.html',
  buildDate: '2026-07-25',
  retiredSlugs: []
};

const UPDATED = '2026-07-25';
const PUBLISHED = '2026-07-24';

/* ------------------------------------------------------------ shared blocks */

const MS_TNEF_CONVERSION = { label: 'Microsoft Learn: TNEF conversion options in Exchange', url: 'https://learn.microsoft.com/en-us/exchange/mail-flow/content-conversion/tnef-conversion' };
const MS_TNEF_FORMAT = { label: 'Microsoft Learn: Transport Neutral Encapsulation Format (TNEF)', url: 'https://learn.microsoft.com/en-us/office/client-developer/outlook/mapi/transport-neutral-encapsulation-format-tnef' };
const MS_MESSAGE_FORMAT = { label: 'Microsoft Support: change the message format in Outlook', url: 'https://support.microsoft.com/en-us/office/change-the-message-format-to-html-rich-text-format-or-plain-text-338a389d-11da-47fe-b693-cf41f792fefa' };

/* ------------------------------------------------------------------ homepage */

const home = {
  kind: 'home',
  slug: '',
  metaTitle: 'Winmail.dat Extractor — Open Winmail.dat Online, Free',
  title: 'Winmail.dat Extractor — Open Winmail.dat Online, Free',
  ogTitle: 'Open winmail.dat online and get your attachments back',
  description: 'Free winmail.dat extractor. Open winmail.dat, win.dat or ATT00001.dat in your browser, recover the Outlook TNEF attachments and download them as one ZIP.',
  h1: 'Open winmail.dat and recover your attachments',
  lead: 'Select the winmail.dat file your Outlook contact sent you. This free extractor reads the TNEF container on your own device, lists the real attachments inside it and packages them into a single ZIP. Nothing is uploaded, so even confidential documents stay private.',
  updated: UPDATED,
  changefreq: 'weekly',
  priority: '1.0',
  featured: [
    'how-to-open-winmail-dat-on-iphone',
    'how-to-open-winmail-dat-on-android',
    'how-to-open-winmail-dat-on-windows',
    'how-to-open-winmail-dat-on-mac',
    'what-is-winmail-dat',
    'how-to-stop-outlook-sending-winmail-dat'
  ],
  howTo: {
    name: 'How to open a winmail.dat file and extract its attachments',
    description: 'Save the winmail.dat attachment from your email, open it with the browser-based extractor and download the recovered files as a ZIP.',
    totalTime: 'PT2M',
    tools: ['A web browser', 'The winmail.dat email attachment'],
    steps: [
      { id: 'step-save', name: 'Save the winmail.dat attachment', text: 'In your email app, download the attachment named winmail.dat, win.dat, ATT00001.dat or “Part 1.2” to your Files, Downloads or Documents folder.' },
      { id: 'step-select', name: 'Select the file in the extractor', text: 'Choose the saved file with the picker above, or drag it onto the drop area on a desktop computer. The browser verifies the TNEF signature and reads the container locally.' },
      { id: 'step-download', name: 'Download the recovered attachments', text: 'Check the list of recovered filenames and sizes, then select Download ZIP to save every extracted attachment in one archive.' }
    ]
  },
  benefits: [
    { tag: 'Private', title: 'Your file is never uploaded', text: 'The parsing, the filename recovery and the ZIP creation all happen in JavaScript on your device. There is no server-side queue holding your contracts, invoices or medical letters.' },
    { tag: 'Universal', title: 'No app, no Outlook licence', text: 'It works in Safari on iPhone, Chrome on Android, Edge on Windows and Safari on macOS. You do not need Outlook, a desktop unpacker or an email plugin.' },
    { tag: 'Complete', title: 'Every attachment in one ZIP', text: 'A single winmail.dat often hides several files. The extractor keeps the original filenames, avoids duplicate names and hands you one archive instead of a pile of unnamed blobs.' },
    { tag: 'Honest', title: 'Clear limits, no fake results', text: 'If the container only holds a meeting request or Outlook-specific data, the tool says so instead of producing a broken download. Guides then explain exactly what to ask the sender for.' },
    { tag: 'Free', title: 'No account or file quota', text: 'There is no sign-up, no watermark, no daily conversion limit and no email address to hand over. Large files are limited only by your device memory.' },
    { tag: 'Open', title: 'Auditable source code', text: 'The extractor is a single readable script. Security-minded teams can review exactly how the TNEF parser and ZIP writer behave before using it.' }
  ],
  faqs: [
    { q: 'What is a winmail.dat file?', a: 'It is a Microsoft TNEF container produced by Outlook or Exchange. It can carry Outlook Rich Text formatting, MAPI properties and the ordinary file attachments the sender added to the message. Mail apps that do not understand TNEF show the container itself instead of the files.' },
    { q: 'Does this website upload my email attachment?', a: 'No. The extractor reads the selected file and builds the ZIP entirely inside your browser using the File API, so the bytes never travel to our hosting provider. You can confirm this by loading the page, disconnecting from the network and extracting a file offline.' },
    { q: 'Why is my attachment called Part 1.2 or ATT00001.dat instead of winmail.dat?', a: 'Some mail servers and apps rename an application/ms-tnef part when the original filename is missing. Files called win.dat, ATT00001.dat, winmail.dat.bin or Part 1.2 are usually the same kind of TNEF container and can be selected here as-is.' },
    { q: 'Can every winmail.dat file be extracted?', a: 'No. Containers that hold only a meeting request, an embedded Outlook item, voting buttons, custom MAPI properties or truncated data have no ordinary files to recover. In that case the honest fix is to ask the sender to resend using HTML format.' },
    { q: 'Is it safe to open the files that come out?', a: 'The extraction itself does not execute anything, but the recovered documents deserve the same caution as any email attachment. Only open files you expected from a sender you trust, and scan executables, scripts and macro-enabled Office documents first.' },
    { q: 'How can the sender stop sending winmail.dat?', a: 'The sender should switch the message format from Outlook Rich Text to HTML or plain text, or remove Rich Text from a saved contact. Microsoft 365 administrators can also disable TNEF for external recipients or a specific remote domain.' },
    { q: 'Can I rename winmail.dat to PDF to open it?', a: 'No. TNEF is a package format, not a mislabelled document, so renaming produces a corrupt file. The container has to be parsed before the PDF or Word file inside it can be recovered.' },
    { q: 'Does it work offline and on old devices?', a: 'Yes. Any browser with File API support, including Safari on older iPhones and iPads, can run the extractor, and the page keeps working after you go offline because there is no server round-trip.' }
  ]
};

/* --------------------------------------------------------------- guides hub */

const guidesHub = {
  kind: 'guides',
  slug: 'guides',
  crumb: 'Guides',
  title: 'Winmail.dat Guides: Open, Convert and Stop TNEF Files',
  description: 'Every winmail.dat guide in one place: open TNEF attachments on iPhone, Android, Windows, Mac and Gmail, convert them to ZIP or PDF, and stop Outlook sending them.',
  h1: 'Winmail.dat guides',
  lead: 'Practical, device-specific instructions for recipients who cannot open a winmail.dat attachment, plus the permanent fix for the Outlook sender who keeps creating them.',
  updated: UPDATED,
  priority: '0.7'
};

/* ---------------------------------------------------------------- articles */

const articles = [
  {
    kind: 'article',
    slug: 'what-is-winmail-dat',
    crumb: 'What is winmail.dat?',
    linkLabel: 'What is a winmail.dat file?',
    cardTag: 'Explainer',
    cardDesc: 'Understand TNEF, why Outlook creates it and what can realistically be recovered.',
    title: 'What Is a Winmail.dat File? TNEF Explained Simply',
    description: 'A winmail.dat file is an Outlook TNEF container. Learn what is inside it, why your email app cannot read it, and how to recover the real attachments safely.',
    h1: 'What is a winmail.dat file?',
    lead: 'Short answer: winmail.dat is a Microsoft TNEF package that Outlook wraps around a message. Your attachments are usually still inside it, but a non-Outlook mail app cannot unwrap it, so it shows you the wrapper instead.',
    published: PUBLISHED,
    updated: UPDATED,
    readingTime: '6 min read',
    about: ['winmail.dat', 'Transport Neutral Encapsulation Format', 'Microsoft Outlook'],
    keyFacts: {
      title: 'Key facts',
      items: [
        'winmail.dat is a Transport Neutral Encapsulation Format (TNEF) container created by Outlook or Exchange, not a corrupted document.',
        'It usually contains the real attachments plus Outlook Rich Text formatting and MAPI properties.',
        'Renaming it to .pdf or .docx never works, because it is a package rather than a single mislabelled file.',
        'Only the sender can prevent it permanently, by sending HTML or plain text instead of Rich Text.'
      ]
    },
    sections: [
      {
        id: 'definition',
        h2: 'The definition, in plain language',
        tocLabel: 'Plain-language definition',
        html: `<p>A <strong>winmail.dat</strong> file is a binary container in Microsoft&rsquo;s <strong>Transport Neutral Encapsulation Format (TNEF)</strong>. Outlook and Exchange use it to carry things that ordinary internet email cannot express on its own: Outlook Rich Text formatting, embedded objects, voting buttons, custom forms, reminders and MAPI properties.</p>
<p>Think of it as a shipping box. Outlook packs your PDF, your Word document and the message formatting into the box, seals it, and expects the recipient&rsquo;s Outlook to unpack it invisibly. When the recipient uses Apple Mail, Gmail, Thunderbird, a phone mail app or a webmail client that does not speak TNEF, nobody opens the box. The mail app shows the sealed box itself, named <code>winmail.dat</code>, <code>win.dat</code>, <code>ATT00001.dat</code>, <code>winmail.dat.bin</code> or a generic label such as &ldquo;Part 1.2&rdquo;.</p>
<p>This matters for one practical reason: your attachments are usually not lost. They are one parsing step away.</p>`
      },
      {
        id: 'inside',
        h2: 'What is actually inside a winmail.dat file',
        tocLabel: 'What is inside it',
        html: `<p>A TNEF container is a sequence of attributes. Each attribute has a level (message or attachment), an identifier, a length and a payload. The interesting ones for recovery are the attachment attributes:</p>
<table>
<thead><tr><th>Contents</th><th>Recoverable as a normal file?</th></tr></thead>
<tbody>
<tr><td>By-value file attachments (PDF, DOCX, XLSX, images, ZIP, CSV)</td><td>Yes — this is the common case</td></tr>
<tr><td>Original filenames and display names</td><td>Yes, when the sender&rsquo;s Outlook included them</td></tr>
<tr><td>Outlook Rich Text body (compressed RTF)</td><td>No — it is message formatting, not an attachment</td></tr>
<tr><td>Meeting requests and calendar properties</td><td>No — the data has no standalone file form</td></tr>
<tr><td>Embedded Outlook items, OLE objects, custom forms</td><td>Rarely — these are Outlook-only object types</td></tr>
</tbody>
</table>
<div class="callout"><strong>Important:</strong> a perfectly valid winmail.dat does not always contain a downloadable document. If the sender only used Rich Text formatting or sent a meeting invitation, the container may hold formatting and calendar data and nothing else.</div>`
      },
      {
        id: 'why-you-got-it',
        h2: 'Why you received one',
        tocLabel: 'Why you received one',
        html: `<p>There are three usual causes, all on the sending side:</p>
<ul>
<li><strong>Rich Text format.</strong> The sender&rsquo;s message, or a specific saved contact, is configured to use Outlook Rich Text rather than HTML. Outlook then encapsulates the message as TNEF.</li>
<li><strong>Server-side conversion settings.</strong> An Exchange or Microsoft 365 remote-domain or mail-flow setting allows TNEF to leave the organisation instead of being converted for external recipients.</li>
<li><strong>Forwarding and gateway quirks.</strong> A message that passes through mailing lists, archiving gateways or third-party filters can lose the conversion step that would normally have stripped TNEF.</li>
</ul>
<p>Nothing you did as the recipient caused it, and no setting in Gmail or Apple Mail can undo it retroactively. That is why a recipient-side extractor is the fastest route to your files, while <a href="/how-to-stop-outlook-sending-winmail-dat/">fixing the sender&rsquo;s message format</a> is the long-term cure.</p>`
      },
      {
        id: 'open-it',
        h2: 'How to open winmail.dat right now',
        tocLabel: 'How to open it now',
        html: `<p>Save the attachment to your device, then run it through a TNEF parser. The <a href="/#extract">extractor on this site</a> verifies the TNEF signature, walks the attachment attributes, restores the original filenames and packages every recovered file into one ZIP — all inside your browser, with no upload.</p>
<p>Device-specific walkthroughs, including where the file lands on each platform:</p>
<ul>
<li><a href="/how-to-open-winmail-dat-on-iphone/">Open winmail.dat on iPhone or iPad</a></li>
<li><a href="/how-to-open-winmail-dat-on-android/">Open winmail.dat on Android</a></li>
<li><a href="/how-to-open-winmail-dat-on-windows/">Open winmail.dat on Windows 11 and 10</a></li>
<li><a href="/how-to-open-winmail-dat-on-mac/">Open winmail.dat on a Mac</a></li>
<li><a href="/how-to-open-winmail-dat-in-gmail/">Open winmail.dat in Gmail</a></li>
</ul>`
      },
      {
        id: 'myths',
        h2: 'Four myths worth clearing up',
        tocLabel: 'Myths and mistakes',
        html: `<h3>&ldquo;Just rename it to .pdf&rdquo;</h3>
<p>This is the most repeated bad advice about winmail.dat. A file extension does not change the bytes. TNEF is a multi-part package with its own headers, so a renamed copy opens as a damaged file in every reader.</p>
<h3>&ldquo;It is a virus&rdquo;</h3>
<p>The container itself is a format, not malware. It can, however, carry any attachment the sender chose, including a malicious one, so treat the extracted files with normal caution. See <a href="/is-winmail-dat-safe/">is winmail.dat safe?</a></p>
<h3>&ldquo;My email provider is broken&rdquo;</h3>
<p>Gmail, Apple Mail and most modern clients deliberately do not implement Outlook&rsquo;s proprietary encapsulation. The incompatibility is by design, not a bug in your mailbox.</p>
<h3>&ldquo;A converter can always rebuild the document&rdquo;</h3>
<p>Only if the document is really inside. No tool can turn a meeting request or an RTF body into a PDF that the sender never attached.</p>`
      },
      {
        id: 'terminology',
        h2: 'TNEF terminology you may meet',
        tocLabel: 'Terminology',
        html: `<ul>
<li><strong>TNEF</strong> — Transport Neutral Encapsulation Format, the container format itself.</li>
<li><strong>application/ms-tnef</strong> — the MIME type mail servers use for the part; some clients rename it to a generic filename.</li>
<li><strong>MAPI</strong> — the Microsoft messaging API whose properties TNEF was designed to preserve.</li>
<li><strong>By-value attachment</strong> — an attachment whose bytes are stored inside the container. These are the ones an extractor can recover.</li>
<li><strong>By-reference attachment</strong> — a pointer to a file elsewhere; there are no bytes to recover.</li>
<li><strong>Compressed RTF</strong> — the Rich Text body stored in the container, responsible for the formatting Outlook wanted to preserve.</li>
</ul>`
      }
    ],
    faqs: [
      { q: 'Is winmail.dat a virus?', a: 'No. It is a legitimate Microsoft container format. The files inside it deserve the same caution as any email attachment, but the format itself is not malicious.' },
      { q: 'Can I delete winmail.dat?', a: 'Yes, once you have extracted anything you need from it. If the message text arrived intact and you were not expecting attachments, the container is safe to discard.' },
      { q: 'Why does Outlook not show winmail.dat to other Outlook users?', a: 'Outlook recognises TNEF and rebuilds the message from it, so the container is consumed invisibly. Only clients that cannot decode TNEF expose the raw file.' },
      { q: 'Does winmail.dat mean the sender used Windows?', a: 'It means the sender used Outlook or Exchange with Rich Text or TNEF enabled. Outlook for Mac can produce it too, so the operating system is not the deciding factor.' },
      { q: 'How big can a winmail.dat file be?', a: 'It is as large as the attachments inside it plus a small overhead, so a 12 MB winmail.dat usually means roughly 12 MB of real documents are waiting inside.' },
      { q: 'What does it mean if extraction finds no files?', a: 'The container is valid TNEF but holds no by-value attachments, typically because it carries only Rich Text formatting, a meeting request or an Outlook-only object. Ask the sender to resend in HTML format.' }
    ],
    sources: [MS_TNEF_FORMAT, MS_TNEF_CONVERSION],
    related: ['winmail-dat-viewer', 'att00001-dat-file', 'how-to-stop-outlook-sending-winmail-dat', 'is-winmail-dat-safe']
  },

  {
    kind: 'article',
    slug: 'winmail-dat-viewer',
    crumb: 'Winmail.dat viewer',
    linkLabel: 'Winmail.dat viewer and opener',
    cardTag: 'Tool guide',
    cardDesc: 'How to view what is inside a TNEF file online, and how to judge a winmail.dat opener.',
    title: 'Winmail.dat Viewer: See What Is Inside a TNEF File Online',
    description: 'Use a free online winmail.dat viewer to list the attachments inside a TNEF file before downloading, and learn how to judge any winmail.dat opener.',
    h1: 'Winmail.dat viewer and opener',
    lead: 'Before you download anything, it helps to see what a winmail.dat file actually contains. This page explains how to list the contents of a TNEF container in your browser and how to evaluate the many winmail.dat openers competing for your file.',
    published: PUBLISHED,
    updated: UPDATED,
    readingTime: '5 min read',
    howTo: {
      name: 'How to view the contents of a winmail.dat file',
      totalTime: 'PT1M',
      steps: [
        { id: 'view-save', name: 'Save the container', text: 'Download the winmail.dat attachment from your email app to a folder you can browse, such as Downloads or Files.' },
        { id: 'view-open', name: 'Open the viewer', text: 'Go to the extractor on the homepage. It runs entirely in your browser, so the file is not sent anywhere.' },
        { id: 'view-list', name: 'Read the file list', text: 'Select the container. The viewer shows each recovered attachment with its original filename and size before you download anything.' },
        { id: 'view-decide', name: 'Decide what to do next', text: 'Download the ZIP if the filenames look like the documents you expected, or ask the sender to resend if the container holds no ordinary files.' }
      ]
    },
    sections: [
      {
        id: 'view-first',
        h2: 'Why viewing before extracting is useful',
        tocLabel: 'Why view first',
        html: `<p>A winmail.dat file gives you no hint about its contents. Two containers of similar size can hold a signed contract or nothing but Rich Text formatting. Listing the contents first tells you three things immediately:</p>
<ul>
<li><strong>Whether real files exist.</strong> If the list is empty, no converter on the internet will do better, and the correct next step is to contact the sender.</li>
<li><strong>Whether the filenames match expectations.</strong> An unexpected <code>.exe</code>, <code>.js</code>, <code>.iso</code> or macro-enabled Office file is a reason to stop and verify with the sender.</li>
<li><strong>Whether anything is missing.</strong> If a colleague mentioned five documents and the viewer lists two, the rest may have been sent by reference or stripped by a gateway.</li>
</ul>
<p>The <a href="/#extract">viewer on this site</a> lists names and sizes as soon as the container is parsed, and only builds a ZIP when you ask for one.</p>`
      },
      {
        id: 'how-viewer-works',
        h2: 'How a browser-based viewer works',
        tocLabel: 'How it works',
        html: `<p>The tool reads the file with the browser File API, checks the four-byte TNEF signature, then walks the attribute stream. Attachment-level attributes carry the display name, the transport filename and the raw bytes. The viewer decodes the names (handling both Windows-1252 and UTF-16 encodings), removes characters that are illegal in filenames, de-duplicates repeated names and reports the byte count of each payload.</p>
<p>Because all of that is plain JavaScript, the container never leaves your device, and the page keeps working with the network disconnected. That is a meaningful difference from server-side converters, which necessarily receive a copy of your email attachment.</p>`
      },
      {
        id: 'choosing',
        h2: 'How to judge any winmail.dat opener',
        tocLabel: 'Choosing an opener',
        html: `<p>Search results are full of winmail.dat openers. A short checklist separates the trustworthy ones:</p>
<table>
<thead><tr><th>Question</th><th>What a good answer looks like</th></tr></thead>
<tbody>
<tr><td>Where is the file processed?</td><td>In the browser, with a clear statement that no upload happens</td></tr>
<tr><td>What happens to uploads?</td><td>If uploads are required, a published retention and deletion policy</td></tr>
<tr><td>Is there an email or sign-up wall?</td><td>No. Extraction should not require an account</td></tr>
<tr><td>Are limits disclosed?</td><td>Yes, including which TNEF object types are unsupported</td></tr>
<tr><td>Can the code be reviewed?</td><td>Source available for inspection</td></tr>
<tr><td>Are the results honest?</td><td>An empty container produces a clear message, not a broken download</td></tr>
</tbody>
</table>
<div class="callout warning"><strong>Confidential documents:</strong> if the attachment contains legal, medical, financial or HR material, avoid any tool that uploads it. Client-side extraction or a desktop tool keeps custody of the data with you.</div>`
      },
      {
        id: 'alternatives',
        h2: 'Desktop and email-client alternatives',
        tocLabel: 'Other options',
        html: `<p>A browser viewer is the quickest route, but there are other legitimate paths:</p>
<ul>
<li><strong>Outlook itself.</strong> Opening the message in any version of Outlook, including Outlook on the web with a Microsoft 365 mailbox, usually resolves the container invisibly.</li>
<li><strong>Forward the message.</strong> Forwarding to a colleague who uses Outlook lets them save the attachments and send them back as ordinary files.</li>
<li><strong>Command-line tools.</strong> On Linux and macOS, the classic <code>tnef</code> utility unpacks containers from a terminal, which suits scripted or batch recovery.</li>
<li><strong>Ask for a resend.</strong> The most reliable fix, and the only one that also prevents the next occurrence.</li>
</ul>`
      }
    ],
    faqs: [
      { q: 'Can I view winmail.dat without downloading anything?', a: 'Yes. A browser-based viewer lists the attachment names and sizes as soon as it parses the container, so you can inspect the contents and only then decide whether to save the ZIP.' },
      { q: 'Is there a winmail.dat viewer for iPhone?', a: 'The browser viewer works in Safari on iPhone and iPad, so no App Store download is needed. Save the attachment to Files first, then select it in the viewer.' },
      { q: 'Why does the viewer show a file with no name?', a: 'Some senders omit the display name and transport name attributes. The viewer then assigns a placeholder such as attachment-1, and you can rename it after extraction based on the file type.' },
      { q: 'Can a viewer show the message text inside winmail.dat?', a: 'The message body is stored as compressed RTF rather than as an attachment, so an attachment viewer will not display it. The readable text usually arrived in the email itself.' },
      { q: 'Does the viewer work with .dat files that are not TNEF?', a: 'No. If the signature check fails, the file is a different kind of .dat file, such as a database or game data file, and needs the application that created it.' }
    ],
    sources: [MS_TNEF_FORMAT],
    related: ['what-is-winmail-dat', 'winmail-dat-to-zip', 'is-winmail-dat-safe', 'how-to-open-winmail-dat-on-windows']
  },

  {
    kind: 'article',
    slug: 'how-to-open-winmail-dat-on-iphone',
    crumb: 'On iPhone',
    linkLabel: 'Open winmail.dat on iPhone or iPad',
    cardTag: 'iPhone & iPad',
    cardDesc: 'Save the attachment to Files, extract it in Safari and open the recovered documents.',
    title: 'How to Open Winmail.dat on iPhone (No App Needed)',
    description: 'Open winmail.dat on iPhone or iPad without installing an app. Save the attachment to Files, extract the Outlook attachments in Safari and open your PDF or Word file.',
    h1: 'How to open winmail.dat on iPhone and iPad',
    lead: 'Apple Mail cannot unpack Outlook TNEF containers, so a winmail.dat attachment looks like a dead end on iOS. It is not. Save the file to Files, run it through a browser extractor and your documents come back with their original names.',
    published: PUBLISHED,
    updated: UPDATED,
    readingTime: '6 min read',
    keyFacts: {
      title: 'What you need',
      items: [
        'An iPhone or iPad running any recent version of iOS or iPadOS.',
        'The email containing winmail.dat, win.dat or an attachment shown as “Part 1.2”.',
        'Safari or Chrome — no App Store download and no Outlook subscription.'
      ]
    },
    howTo: {
      name: 'How to open a winmail.dat file on an iPhone',
      totalTime: 'PT3M',
      tools: ['iPhone or iPad', 'Safari', 'The winmail.dat attachment'],
      steps: [
        { id: 'ios-step-1', name: 'Open the email and tap the attachment', text: 'Open the message in Mail, Gmail or Outlook for iOS and tap the winmail.dat attachment once so the preview sheet appears.' },
        { id: 'ios-step-2', name: 'Save it to the Files app', text: 'Tap the share icon, choose Save to Files and pick a location such as On My iPhone or iCloud Drive, then tap Save.' },
        { id: 'ios-step-3', name: 'Open the extractor in Safari', text: 'Open the winmail.dat extractor in Safari and tap Choose file. iOS shows a picker with Photo Library, Take Photo and Choose File options.' },
        { id: 'ios-step-4', name: 'Pick the saved container', text: 'Tap Choose File, browse to the folder where you saved the container and select it. The extractor parses it on the device and lists the attachments it found.' },
        { id: 'ios-step-5', name: 'Download and open the ZIP', text: 'Tap Download ZIP, then open the Files app, find the archive in Downloads and tap it once. iOS unzips it into a folder you can browse and open with Preview, Pages, Numbers or any other app.' }
      ]
    },
    sections: [
      {
        id: 'why-ios',
        h2: 'Why iPhone shows winmail.dat instead of your file',
        tocLabel: 'Why it happens on iOS',
        html: `<p>Apple Mail follows internet email standards and does not implement Outlook&rsquo;s proprietary TNEF encapsulation. When a message arrives with an <code>application/ms-tnef</code> part, iOS has nothing to open it with, so it presents the raw container. Tapping it shows a preview that fails, or an app-chooser sheet with no useful option.</p>
<p>No iOS setting changes this, and switching from Mail to Gmail or Outlook for iOS does not reliably help either — Outlook for iOS resolves some containers but not all. Extracting the container yourself is the dependable route.</p>`
      },
      {
        id: 'steps',
        h2: 'The five-step walkthrough',
        tocLabel: 'Step-by-step',
        html: `<h3>1. Tap the attachment in your mail app</h3>
<p>In Mail, scroll to the bottom of the message and tap the attachment once. Do not use a long press followed by Quick Look; the share sheet is what you need.</p>
<h3>2. Save to Files</h3>
<p>Tap the share icon (a square with an upward arrow), then <strong>Save to Files</strong>. Choosing <strong>On My iPhone &rsaquo; Downloads</strong> makes the file easy to find again. In Gmail for iOS, use the download arrow first, then share the downloaded item to Files.</p>
<h3>3. Open the extractor</h3>
<p>Open <a href="/#extract">the extractor</a> in Safari and tap <strong>Choose file</strong>. In the sheet that appears, select <strong>Choose File</strong> rather than Photo Library.</p>
<h3>4. Select the container</h3>
<p>Browse to the folder you used in step 2. If you cannot see the file, tap <strong>Browse</strong> at the bottom, then <strong>Recents</strong> — iOS lists recently saved documents there. Select it, and the extractor immediately reports how many attachments it recovered.</p>
<h3>5. Download and unzip</h3>
<p>Tap <strong>Download ZIP</strong>. Safari saves it to your Downloads location. Open <strong>Files</strong>, tap the ZIP once and iOS creates a folder with the same name containing your documents.</p>
<div class="callout tip"><strong>Tip:</strong> if the ZIP holds a single PDF, tap it and use the share icon to send it straight to Books, Drive or a colleague without extra steps.</div>`
      },
      {
        id: 'troubleshooting',
        h2: 'Troubleshooting on iOS',
        tocLabel: 'Troubleshooting',
        html: `<table>
<thead><tr><th>Symptom</th><th>What to do</th></tr></thead>
<tbody>
<tr><td>The file picker will not show the container</td><td>Use Browse &rsaquo; Recents, or move the file into On My iPhone &rsaquo; Downloads and try again.</td></tr>
<tr><td>Attachment is greyed out in Mail</td><td>Pull to refresh the mailbox so Mail finishes downloading the full message, then tap again.</td></tr>
<tr><td>Extraction reports no attachments</td><td>The container holds only formatting or a meeting request. Ask the sender to resend the files with HTML format.</td></tr>
<tr><td>ZIP will not open</td><td>Open it from the Files app rather than from the browser download list; Safari&rsquo;s preview cannot unzip archives.</td></tr>
<tr><td>Recovered file has an odd name</td><td>Rename it in Files and keep the extension, for example .pdf or .docx, so the right app opens it.</td></tr>
</tbody>
</table>`
      },
      {
        id: 'ipad',
        h2: 'Notes for iPad',
        tocLabel: 'iPad differences',
        html: `<p>The steps are identical on iPadOS, with two conveniences: you can drag the attachment from Mail directly into the Files app, and you can drag the saved file from Files onto the extractor&rsquo;s drop area in Safari using Split View. Everything else, including the ZIP handling, behaves the same way.</p>`
      }
    ],
    faqs: [
      { q: 'Is there a winmail.dat app for iPhone?', a: 'Several exist, but you do not need one. A browser extractor does the same work without installing software or granting an app access to your files.' },
      { q: 'Can I open winmail.dat in Outlook for iOS?', a: 'Sometimes. Outlook for iOS resolves many TNEF containers server-side, so it is worth trying if you have the app, but it does not handle every case.' },
      { q: 'Where does Safari save downloaded files on iPhone?', a: 'By default to the Downloads folder in Files, either on the device or in iCloud Drive depending on your Safari settings under Settings, Apps, Safari, Downloads.' },
      { q: 'Why does my attachment appear as Part 1.2 on iPhone?', a: 'Mail assigns a generic name when the TNEF part has no filename. It is still the same container and can be saved and extracted in exactly the same way.' },
      { q: 'Does extracting on iPhone use my mobile data?', a: 'Only downloading the email attachment uses data. The extraction itself runs offline on the device, so no upload consumes your allowance.' },
      { q: 'Can I forward the recovered files from my iPhone?', a: 'Yes. After unzipping in Files, select the documents and use the share icon to attach them to a new message as ordinary files.' }
    ],
    sources: [MS_TNEF_CONVERSION, { label: 'Apple Support: use the Files app on iPhone', url: 'https://support.apple.com/en-us/102331' }],
    related: ['how-to-open-winmail-dat-on-android', 'what-is-winmail-dat', 'winmail-dat-to-pdf', 'how-to-stop-outlook-sending-winmail-dat']
  },

  {
    kind: 'article',
    slug: 'how-to-open-winmail-dat-on-android',
    crumb: 'On Android',
    linkLabel: 'Open winmail.dat on Android',
    cardTag: 'Android',
    cardDesc: 'Download the DAT file, extract it in Chrome and unzip it with the Files app.',
    title: 'How to Open Winmail.dat on Android (Free, No App)',
    description: 'Open a winmail.dat attachment on Android without installing an app. Download the file in Gmail or Outlook, extract the attachments in Chrome and unzip them locally.',
    h1: 'How to open winmail.dat on Android',
    lead: 'On Android the winmail.dat file usually lands in your Downloads folder and then sits there with no app able to open it. A browser extractor turns it back into ordinary PDFs, images and Office documents in about a minute.',
    published: PUBLISHED,
    updated: UPDATED,
    readingTime: '5 min read',
    keyFacts: {
      title: 'What you need',
      items: [
        'Any Android phone or tablet with Chrome, Edge, Firefox or Samsung Internet.',
        'The email containing winmail.dat, win.dat or ATT00001.dat.',
        'The Files or My Files app that came with your device, for unzipping.'
      ]
    },
    howTo: {
      name: 'How to open a winmail.dat file on Android',
      totalTime: 'PT3M',
      tools: ['Android phone or tablet', 'Chrome', 'The winmail.dat attachment'],
      steps: [
        { id: 'and-step-1', name: 'Download the attachment', text: 'Open the message in Gmail, Outlook or Samsung Email and tap the download icon on the winmail.dat attachment. It is saved to your Downloads folder.' },
        { id: 'and-step-2', name: 'Open the extractor in Chrome', text: 'Open the winmail.dat extractor in Chrome and tap Choose file to open the Android document picker.' },
        { id: 'and-step-3', name: 'Select the downloaded file', text: 'Choose Downloads in the picker, or use the hamburger menu to browse your device storage, and select the container.' },
        { id: 'and-step-4', name: 'Review the extracted list', text: 'The extractor parses the container on the device and lists each recovered attachment with its original filename and size.' },
        { id: 'and-step-5', name: 'Download and unzip', text: 'Tap Download ZIP, open your Files app, tap the archive and choose Extract to unpack the documents into a folder.' }
      ]
    },
    sections: [
      {
        id: 'why-android',
        h2: 'Why Android cannot open the file directly',
        tocLabel: 'Why it happens',
        html: `<p>Android has no built-in handler for Microsoft&rsquo;s TNEF format, and a <code>.dat</code> extension tells the system nothing about the contents. Tapping the download therefore produces &ldquo;Cannot open file&rdquo;, or an app chooser where nothing works. Gmail behaves the same way, because Gmail does not decode TNEF either — it simply delivers the attachment as it arrived.</p>
<p>The fix is to parse the container. Because a browser extractor runs locally, you avoid installing an unknown app and avoid granting broad storage permissions to a converter.</p>`
      },
      {
        id: 'steps',
        h2: 'Step-by-step on Android',
        tocLabel: 'Step-by-step',
        html: `<h3>1. Download the container</h3>
<p>In Gmail, tap the download arrow on the attachment card. In Outlook for Android, tap the attachment, then the download icon. In Samsung Email, use the download link beneath the attachment name. The file goes to <strong>Internal storage &rsaquo; Download</strong>.</p>
<h3>2. Open the extractor</h3>
<p>Open <a href="/#extract">the extractor</a> in your browser and tap <strong>Choose file</strong>. Android shows the Documents picker.</p>
<h3>3. Find the file</h3>
<p>Tap <strong>Downloads</strong> in the picker&rsquo;s sidebar. If it is missing, tap the three-line menu, choose your device name and open the Download folder. Sorting by <strong>Recent</strong> is the quickest way to spot a file you just saved.</p>
<h3>4. Check the results</h3>
<p>The extractor validates the TNEF signature and lists the attachments. If it reports that no ordinary attachments were found, the container carries only Outlook data and the sender needs to resend.</p>
<h3>5. Unzip on the device</h3>
<p>Tap <strong>Download ZIP</strong>, then open <strong>Files</strong> (or My Files on Samsung), tap the archive and choose <strong>Extract</strong> or <strong>Unzip here</strong>. Google Drive, WPS Office and other apps can open the documents once unpacked.</p>
<div class="callout tip"><strong>Tip:</strong> if your Files app cannot unzip, upload the ZIP to Google Drive and use Drive&rsquo;s built-in Extract option, or open the ZIP in the Google Files app under Browse.</div>`
      },
      {
        id: 'troubleshooting',
        h2: 'Android troubleshooting',
        tocLabel: 'Troubleshooting',
        html: `<table>
<thead><tr><th>Symptom</th><th>What to do</th></tr></thead>
<tbody>
<tr><td>Downloads folder appears empty in the picker</td><td>Switch the picker to your device storage, then open Download. Some launchers hide the shortcut.</td></tr>
<tr><td>Gmail shows no download icon</td><td>Open the message in the browser at mail.google.com, where the attachment can be downloaded directly.</td></tr>
<tr><td>Browser reports a file-size problem</td><td>Close background apps to free memory, or extract on a computer if the container is very large.</td></tr>
<tr><td>Extraction succeeds but a document will not open</td><td>Install a viewer for the file type, such as a PDF reader or an Office app; the extraction preserved the original bytes.</td></tr>
<tr><td>Names look scrambled</td><td>The sender&rsquo;s Outlook stored a non-Latin filename; rename the file in Files and keep the extension.</td></tr>
</tbody>
</table>`
      },
      {
        id: 'chromebook',
        h2: 'The same method on a Chromebook',
        tocLabel: 'Chromebook note',
        html: `<p>ChromeOS uses the same browser engine and the same Files app model, so the steps transfer directly: download the container, extract it in Chrome, then double-click the ZIP in Files, which mounts it as a browsable folder. Copy the documents out of the mounted archive before editing them.</p>`
      }
    ],
    faqs: [
      { q: 'Do I need a winmail.dat app from the Play Store?', a: 'No. A browser-based extractor avoids installing an app and does not need storage permissions beyond the file you pick yourself.' },
      { q: 'Where do Android downloads go?', a: 'To Internal storage, Download by default. Your Files or My Files app lists the same folder under Downloads.' },
      { q: 'Why does Gmail on Android not open winmail.dat?', a: 'Gmail does not decode Outlook TNEF containers. It passes the attachment through unchanged, so the decoding has to happen on your device.' },
      { q: 'Can I extract winmail.dat on Android without internet?', a: 'Yes, once the extractor page is loaded. The parsing runs locally, so it completes even in airplane mode.' },
      { q: 'Is Samsung Internet supported?', a: 'Yes. Any modern Android browser with File API support works, including Samsung Internet, Chrome, Edge and Firefox.' }
    ],
    sources: [MS_TNEF_CONVERSION, { label: 'Google Help: download Gmail attachments', url: 'https://support.google.com/mail/answer/6584' }],
    related: ['how-to-open-winmail-dat-on-iphone', 'how-to-open-winmail-dat-in-gmail', 'winmail-dat-to-zip', 'what-is-winmail-dat']
  }
];


articles.push(
  {
    kind: 'article',
    slug: 'how-to-open-winmail-dat-on-windows',
    crumb: 'On Windows',
    linkLabel: 'Open winmail.dat on Windows 11 and 10',
    cardTag: 'Windows',
    cardDesc: 'Three ways to unpack a TNEF container on Windows, with and without Outlook.',
    title: 'How to Open Winmail.dat on Windows 11 and 10',
    description: 'Open winmail.dat on Windows 11 or 10 without Outlook. Extract the TNEF attachments in your browser, or use Outlook or the command line, and get your files back.',
    h1: 'How to open winmail.dat on Windows 11 and 10',
    lead: 'Windows has no built-in handler for TNEF, so double-clicking winmail.dat opens the &ldquo;How do you want to open this file?&rdquo; dialog and nothing useful happens. Here are the three routes that do work, starting with the one that needs no software at all.',
    published: PUBLISHED,
    updated: UPDATED,
    readingTime: '6 min read',
    keyFacts: {
      title: 'Quick answer',
      items: [
        'Do not rename the file — TNEF is a package, so a .pdf or .docx extension only produces a corrupt document.',
        'Fastest route: save the attachment, then extract it in Edge or Chrome with a client-side extractor.',
        'If you have Outlook, opening the original message in Outlook usually resolves the container automatically.',
        'Never let Windows &ldquo;always open&rdquo; .dat files with an application chosen at random.'
      ]
    },
    howTo: {
      name: 'How to open a winmail.dat file on Windows',
      totalTime: 'PT3M',
      tools: ['Windows 11 or Windows 10 PC', 'Microsoft Edge or Chrome', 'The winmail.dat attachment'],
      steps: [
        { id: 'win-step-1', name: 'Save the attachment to a folder', text: 'In your mail client or webmail, download the winmail.dat attachment into Downloads or Documents so you can browse to it.' },
        { id: 'win-step-2', name: 'Open the extractor in your browser', text: 'Open the winmail.dat extractor in Edge, Chrome or Firefox. It processes the file locally, so the document never leaves the PC.' },
        { id: 'win-step-3', name: 'Drag the file onto the drop area', text: 'Drag winmail.dat from File Explorer onto the drop area, or select Choose file and pick it from the folder you used.' },
        { id: 'win-step-4', name: 'Check the recovered filenames', text: 'The extractor lists every attachment found inside the container with its original name and size.' },
        { id: 'win-step-5', name: 'Download the ZIP and extract it', text: 'Select Download ZIP, then right-click the archive in File Explorer and choose Extract All to unpack your documents.' }
      ]
    },
    sections: [
      {
        id: 'browser-method',
        h2: 'Method 1: extract it in your browser (no install)',
        tocLabel: 'Method 1: browser',
        html: `<p>This is the fastest and safest option on a managed work laptop, because it requires no administrator rights and no download of an unknown executable. Save the attachment, open <a href="/#extract">the extractor</a>, and drag the file onto the drop area. Drag and drop works from File Explorer, from the desktop and from the Edge downloads flyout.</p>
<p>The parsing runs in JavaScript on your PC, so confidential contracts and payroll files are never uploaded. When the list of recovered files appears, download the ZIP and unpack it with the built-in Windows extractor: right-click the archive, choose <strong>Extract All</strong>, then confirm the destination folder.</p>
<div class="callout tip"><strong>Corporate PCs:</strong> because there is no installer and no upload, this method usually satisfies IT policies that block third-party converters. Check the source code first if your security team requires it.</div>`
      },
      {
        id: 'outlook-method',
        h2: 'Method 2: let Outlook do it',
        tocLabel: 'Method 2: Outlook',
        html: `<p>If Outlook is installed and the message is in an account Outlook can access, open the original email there. Outlook recognises TNEF and rebuilds the message, showing the attachments as normal files that you can save with <strong>File &rsaquo; Save Attachments</strong>.</p>
<p>If the message arrived in a different mailbox, forward it to an address that Outlook opens, or ask a colleague with Outlook to forward the extracted files back. Outlook on the web with a Microsoft 365 mailbox behaves the same way.</p>
<p>Note that dragging winmail.dat into an open Outlook window does not work: Outlook resolves TNEF as part of receiving a message, not as a file it can open directly.</p>`
      },
      {
        id: 'cli-method',
        h2: 'Method 3: command line and batch recovery',
        tocLabel: 'Method 3: command line',
        html: `<p>For repeated or scripted recovery, a command-line TNEF unpacker is convenient. On Windows the practical options are the <code>tnef</code> utility inside Windows Subsystem for Linux, or a PowerShell script that calls a TNEF library. In WSL, installing the distribution&rsquo;s <code>tnef</code> package and running it against the container writes the attachments into the current directory.</p>
<p>This route suits a helpdesk that receives many affected messages, or an archive migration where hundreds of stored containers need unpacking. For a single file, the browser method is quicker.</p>`
      },
      {
        id: 'do-not',
        h2: 'What not to do',
        tocLabel: 'What not to do',
        html: `<ul>
<li><strong>Do not rename the file.</strong> Changing <code>winmail.dat</code> to <code>report.pdf</code> cannot work; the bytes are a container, not a PDF.</li>
<li><strong>Do not set a default app for .dat.</strong> The extension is used by unrelated programs, so a permanent association causes confusion later.</li>
<li><strong>Do not install a random &ldquo;DAT opener&rdquo; from a search ad.</strong> This category attracts bundled adware. Prefer a client-side tool or a well-known open-source utility.</li>
<li><strong>Do not upload sensitive attachments to unknown converters.</strong> A server-side converter necessarily receives a copy of the document.</li>
</ul>`
      },
      {
        id: 'troubleshooting',
        h2: 'Windows troubleshooting',
        tocLabel: 'Troubleshooting',
        html: `<table>
<thead><tr><th>Symptom</th><th>Cause and fix</th></tr></thead>
<tbody>
<tr><td>&ldquo;This is not a valid TNEF file&rdquo;</td><td>The .dat file came from another program. Ask the sender what it was, or check whether the download completed.</td></tr>
<tr><td>Extraction finds nothing</td><td>The container holds only Rich Text or a meeting request. Request a resend in HTML format.</td></tr>
<tr><td>Windows blocks the extracted file</td><td>Right-click the document, open Properties and select Unblock if the file came from the internet zone.</td></tr>
<tr><td>Office says the file is corrupt</td><td>Try Open and Repair in Word or Excel; if it still fails, the sender&rsquo;s original was already damaged.</td></tr>
<tr><td>Filenames arrive truncated</td><td>Outlook stored a shortened transport name. Rename the file and keep the extension.</td></tr>
</tbody>
</table>`
      }
    ],
    faqs: [
      { q: 'Can Windows 11 open winmail.dat natively?', a: 'No. Windows has no TNEF handler, so the container has to be parsed by Outlook or an extractor before its contents become normal files.' },
      { q: 'How do I open winmail.dat without Outlook?', a: 'Use a client-side extractor in Edge or Chrome. Save the attachment, select it in the extractor and download the recovered files as a ZIP.' },
      { q: 'Is there a Microsoft tool for winmail.dat?', a: 'Microsoft ships TNEF support inside Outlook and Exchange rather than as a standalone utility, so there is no official separate unpacker to download.' },
      { q: 'Why is winmail.dat 0 KB?', a: 'A zero-byte container means the download failed or the mail gateway stripped the content. Ask the sender to resend before trying to extract it.' },
      { q: 'Does Windows Mail open winmail.dat?', a: 'No. The Mail and Outlook for Windows apps built on the new engine do not reliably decode TNEF from external senders, so the same extraction steps apply.' },
      { q: 'Can I extract several winmail.dat files at once?', a: 'The browser extractor handles one container at a time. For batches, a command-line TNEF utility in WSL is a better fit.' }
    ],
    sources: [MS_TNEF_CONVERSION, MS_TNEF_FORMAT, { label: 'Microsoft Support: zip and unzip files in Windows', url: 'https://support.microsoft.com/en-us/windows/zip-and-unzip-files-8d28fa72-f2f9-712f-67df-f80cf89fd4e5' }],
    related: ['how-to-open-winmail-dat-on-mac', 'winmail-dat-viewer', 'how-to-stop-outlook-sending-winmail-dat', 'what-is-winmail-dat']
  },

  {
    kind: 'article',
    slug: 'how-to-open-winmail-dat-on-mac',
    crumb: 'On Mac',
    linkLabel: 'Open winmail.dat on a Mac',
    cardTag: 'macOS',
    cardDesc: 'Extract TNEF attachments from Apple Mail on macOS, in the browser or the Terminal.',
    title: 'How to Open Winmail.dat on Mac (macOS, Apple Mail)',
    description: 'Apple Mail cannot read Outlook TNEF files. Learn how to open winmail.dat on a Mac using a browser extractor, Outlook for Mac or the Terminal tnef command.',
    h1: 'How to open winmail.dat on a Mac',
    lead: 'Apple Mail shows winmail.dat as an unreadable attachment because macOS has no TNEF support. On a Mac you have three good options: extract it in Safari, open the message in Outlook for Mac, or unpack it from the Terminal.',
    published: PUBLISHED,
    updated: UPDATED,
    readingTime: '5 min read',
    howTo: {
      name: 'How to open a winmail.dat file on macOS',
      totalTime: 'PT3M',
      tools: ['Mac running macOS', 'Safari or Chrome', 'The winmail.dat attachment'],
      steps: [
        { id: 'mac-step-1', name: 'Save the attachment from Mail', text: 'In Apple Mail, drag the winmail.dat attachment to the desktop, or use File then Save Attachments to store it in a folder.' },
        { id: 'mac-step-2', name: 'Open the extractor in Safari', text: 'Open the winmail.dat extractor. The container is parsed locally by the browser, so nothing is uploaded.' },
        { id: 'mac-step-3', name: 'Drop the container onto the page', text: 'Drag the saved file onto the drop area, or select Choose file and pick it in the Finder sheet.' },
        { id: 'mac-step-4', name: 'Download the ZIP', text: 'Review the recovered filenames, then select Download ZIP to save one archive to your Downloads folder.' },
        { id: 'mac-step-5', name: 'Unzip with Archive Utility', text: 'Double-click the ZIP in Finder. macOS unpacks it into a folder next to the archive, ready to open in Preview, Pages or Office.' }
      ]
    },
    sections: [
      {
        id: 'why-mac',
        h2: 'Why Apple Mail cannot read it',
        tocLabel: 'Why it happens on macOS',
        html: `<p>TNEF is Microsoft&rsquo;s way of preserving Outlook-specific message features across the internet. Apple Mail implements the open MIME standards instead, so an <code>application/ms-tnef</code> part has no handler. Mail displays the plain text of the message and leaves the container as an attachment named <code>winmail.dat</code>.</p>
<p>Quick Look cannot preview it, TextEdit shows binary noise, and Archive Utility refuses it because it is not an archive. None of this indicates a damaged file: it just needs a TNEF parser.</p>`
      },
      {
        id: 'browser',
        h2: 'Fastest route: the browser extractor',
        tocLabel: 'Browser method',
        html: `<p>Drag the attachment from the Mail message straight onto the desktop, then drag it from the desktop onto <a href="/#extract">the extractor</a> in Safari. Because the parsing happens in the page, no copy of the document is uploaded — useful for client files under confidentiality obligations.</p>
<p>After downloading the ZIP, double-click it in Finder. Archive Utility expands it into a folder with the original filenames intact. If a document opens in the wrong application, use <strong>Get Info &rsaquo; Open with</strong> to set the right one.</p>`
      },
      {
        id: 'outlook-mac',
        h2: 'Using Outlook for Mac or Microsoft 365',
        tocLabel: 'Outlook for Mac',
        html: `<p>If your account is also available in Outlook for Mac or Outlook on the web, open the original message there. Outlook decodes the container and lists the attachments normally, and you can then save them to Finder as ordinary files.</p>
<p>This is often the quickest path in an office where the same mailbox is configured in both clients, and it also confirms whether the container really did contain attachments.</p>`
      },
      {
        id: 'terminal',
        h2: 'Terminal method for power users',
        tocLabel: 'Terminal method',
        html: `<p>The classic <code>tnef</code> utility unpacks containers from the command line and is available through Homebrew. After installing it, running the tool against the container writes each attachment into the current directory, and a list-only flag prints the contents without extracting.</p>
<p>This is the most convenient approach when you have a folder full of containers from an archive export, or when you want to script recovery as part of a migration. Verify the output filenames before opening anything, exactly as you would with the browser method.</p>`
      },
      {
        id: 'troubleshooting',
        h2: 'macOS troubleshooting',
        tocLabel: 'Troubleshooting',
        html: `<table>
<thead><tr><th>Symptom</th><th>What to do</th></tr></thead>
<tbody>
<tr><td>Dragging from Mail does nothing</td><td>Use File then Save Attachments in Mail, then drag from Finder instead.</td></tr>
<tr><td>Quick Look shows a blank preview</td><td>Expected: macOS cannot preview TNEF. Extract first, then preview the recovered files.</td></tr>
<tr><td>Extraction finds no attachments</td><td>The container carries only formatting or calendar data. Ask for a resend in HTML format.</td></tr>
<tr><td>&ldquo;File is damaged&rdquo; when opening a recovered document</td><td>The sender&rsquo;s original may be corrupt. Compare the file size with what the sender expects.</td></tr>
<tr><td>Gatekeeper warns about an extracted app or installer</td><td>Do not bypass the warning. Confirm with the sender before running any executable that arrived by email.</td></tr>
</tbody>
</table>`
      }
    ],
    faqs: [
      { q: 'Is there a free winmail.dat opener for Mac?', a: 'Yes. A browser-based extractor works on any Mac without installing software, and the open-source tnef command-line tool is available through Homebrew.' },
      { q: 'Can Preview or Archive Utility open winmail.dat?', a: 'No. Neither understands TNEF; Archive Utility only handles real archive formats such as ZIP and tar.' },
      { q: 'Does Apple Mail have a setting to decode TNEF?', a: 'No. There is no preference for it, so the container must be extracted with another tool.' },
      { q: 'Why does the same file open fine on my colleague\u2019s PC?', a: 'Their mail client is probably Outlook, which decodes TNEF automatically. The file is identical; only the client differs.' },
      { q: 'Will extracting change the documents inside?', a: 'No. The recovered files are byte-for-byte copies of what the sender attached, so signatures and checksums remain valid.' }
    ],
    sources: [MS_TNEF_FORMAT, { label: 'Apple Support: compress or uncompress files on Mac', url: 'https://support.apple.com/guide/mac-help/zip-and-unzip-files-and-folders-on-mac-mchlp2528/mac' }],
    related: ['how-to-open-winmail-dat-on-windows', 'how-to-open-winmail-dat-on-iphone', 'winmail-dat-viewer', 'is-winmail-dat-safe']
  },

  {
    kind: 'article',
    slug: 'how-to-open-winmail-dat-in-gmail',
    crumb: 'In Gmail',
    linkLabel: 'Open winmail.dat in Gmail',
    cardTag: 'Gmail',
    cardDesc: 'Why Gmail cannot decode TNEF, and the quickest workaround in the browser.',
    title: 'How to Open Winmail.dat in Gmail (Web and Mobile)',
    description: 'Gmail cannot decode Outlook TNEF attachments. Learn why winmail.dat appears in Gmail and how to extract the real attachments in your browser in under a minute.',
    h1: 'How to open winmail.dat in Gmail',
    lead: 'Gmail delivers a winmail.dat attachment exactly as Outlook sent it, without decoding it. There is no Gmail setting that changes this, so the practical fix is to download the container and extract it yourself.',
    published: PUBLISHED,
    updated: UPDATED,
    readingTime: '5 min read',
    keyFacts: {
      title: 'Quick answer',
      items: [
        'Gmail does not support Outlook TNEF, so the container is shown instead of your attachments.',
        'Download winmail.dat from the message, then extract it in the same browser tab session.',
        'Google Drive, Docs and the Gmail preview cannot open the container either.',
        'Only the Outlook sender can stop it happening again.'
      ]
    },
    howTo: {
      name: 'How to open a winmail.dat attachment received in Gmail',
      totalTime: 'PT2M',
      tools: ['Gmail account', 'A web browser', 'The winmail.dat attachment'],
      steps: [
        { id: 'gm-step-1', name: 'Open the message in Gmail', text: 'Open the email that contains the winmail.dat attachment in the Gmail web interface or the Gmail app.' },
        { id: 'gm-step-2', name: 'Download the attachment', text: 'Hover over the attachment card and select the download arrow. Gmail saves the container to your Downloads folder without trying to preview it.' },
        { id: 'gm-step-3', name: 'Open the extractor', text: 'Open the winmail.dat extractor in a new tab. It parses the container in the browser, so the file is not uploaded to any service.' },
        { id: 'gm-step-4', name: 'Select the container and download the ZIP', text: 'Choose the downloaded file, review the recovered attachment names, then download the ZIP and unpack it.' }
      ]
    },
    sections: [
      {
        id: 'why-gmail',
        h2: 'Why Gmail shows winmail.dat',
        tocLabel: 'Why Gmail shows it',
        html: `<p>Gmail follows internet mail standards and does not implement Microsoft&rsquo;s proprietary encapsulation. When a message arrives with a TNEF part, Gmail keeps it as an attachment so nothing is lost, but it will not unpack it. You see the message text, plus a <code>winmail.dat</code> file that Gmail&rsquo;s preview cannot display.</p>
<p>Google Workspace administrators have no TNEF-decoding setting to enable, and forwarding the message inside Gmail does not change the encapsulation. The decode has to happen on the sending side or on your device.</p>`
      },
      {
        id: 'workaround',
        h2: 'The fastest workaround',
        tocLabel: 'Fastest workaround',
        html: `<p>Download the attachment, then extract it with <a href="/#extract">the browser extractor</a>. On a computer you can drag the file straight from the Chrome download bar onto the drop area, which takes a few seconds. On a phone, follow the <a href="/how-to-open-winmail-dat-on-android/">Android walkthrough</a> or the <a href="/how-to-open-winmail-dat-on-iphone/">iPhone walkthrough</a> for the file-picker details.</p>
<div class="callout"><strong>Do not save it to Drive expecting a preview.</strong> Google Drive has no TNEF viewer, so the container will sit there as an unopenable file. Extract first, then upload the recovered documents if you want them in Drive.</div>`
      },
      {
        id: 'forwarding',
        h2: 'Alternative: route the message through Outlook',
        tocLabel: 'Route via Outlook',
        html: `<p>If you also have a Microsoft 365 or Outlook.com mailbox, forward the message there and open it in Outlook. Outlook decodes the container and shows the attachments normally, and you can forward them back to Gmail as ordinary files.</p>
<p>This works well as a one-off, but it copies the attachment into another mailbox, so it is less appropriate for confidential material than extracting locally.</p>`
      },
      {
        id: 'prevent',
        h2: 'Ask the sender for the permanent fix',
        tocLabel: 'Prevent it recurring',
        html: `<p>If the same contact keeps sending containers, send them a short request: switch the message format from <strong>Rich Text</strong> to <strong>HTML</strong>, and remove the Rich Text preference from your saved contact entry. Administrators can also disable TNEF for external recipients. The full instructions are in <a href="/how-to-stop-outlook-sending-winmail-dat/">stop Outlook sending winmail.dat</a>, which you can forward as a link.</p>`
      }
    ],
    faqs: [
      { q: 'Can Gmail be configured to open winmail.dat?', a: 'No. Gmail has no TNEF setting for users or Workspace administrators, so the container has to be extracted separately.' },
      { q: 'Why can I not preview winmail.dat in Gmail?', a: 'Gmail previews only known document and image formats. A TNEF container is a Microsoft-specific package that the preview engine does not decode.' },
      { q: 'Does forwarding the email in Gmail fix it?', a: 'No. Forwarding preserves the same encapsulated attachment, so the recipient sees the identical winmail.dat file.' },
      { q: 'Can Google Drive open a winmail.dat file?', a: 'No. Drive stores it but has no viewer for TNEF, so extract the container first and upload the recovered documents instead.' },
      { q: 'Is the attachment lost if Gmail cannot read it?', a: 'Not usually. The real files are inside the container and can be recovered as long as the sender attached ordinary documents.' }
    ],
    sources: [MS_TNEF_CONVERSION, { label: 'Google Help: download Gmail attachments', url: 'https://support.google.com/mail/answer/6584' }],
    related: ['how-to-open-winmail-dat-on-android', 'how-to-open-winmail-dat-on-windows', 'how-to-stop-outlook-sending-winmail-dat', 'what-is-winmail-dat']
  },

  {
    kind: 'article',
    slug: 'winmail-dat-to-zip',
    crumb: 'Winmail.dat to ZIP',
    linkLabel: 'Convert winmail.dat to ZIP',
    cardTag: 'Conversion',
    cardDesc: 'What conversion really means, what the ZIP contains and when it cannot work.',
    title: 'Convert Winmail.dat to ZIP Online (Free, No Upload)',
    description: 'Convert winmail.dat to a ZIP archive in your browser. Understand what the conversion really does, what the ZIP contains and why some containers cannot be converted.',
    h1: 'Convert winmail.dat to ZIP',
    lead: 'Converting winmail.dat to ZIP is really an extraction: the TNEF container is unpacked and the attachments inside it are repackaged into a standard archive that every operating system can open.',
    published: PUBLISHED,
    updated: UPDATED,
    readingTime: '5 min read',
    howTo: {
      name: 'How to convert a winmail.dat file to a ZIP archive',
      totalTime: 'PT2M',
      steps: [
        { id: 'zip-step-1', name: 'Save the winmail.dat file', text: 'Download the container from your email app to a folder you can browse.' },
        { id: 'zip-step-2', name: 'Open the converter', text: 'Open the extractor on the homepage. Conversion happens in the browser, so the container is not uploaded.' },
        { id: 'zip-step-3', name: 'Select the container', text: 'Choose the file. The parser reads the TNEF attribute stream and collects every by-value attachment with its original filename.' },
        { id: 'zip-step-4', name: 'Download the ZIP', text: 'Select Download ZIP. The archive is assembled in memory and saved with a name based on the original container.' },
        { id: 'zip-step-5', name: 'Unpack the archive', text: 'Use Extract All on Windows, double-click on macOS, or the Files app on iPhone and Android to unpack the documents.' }
      ]
    },
    sections: [
      {
        id: 'what-conversion-means',
        h2: 'What &ldquo;winmail.dat to ZIP&rdquo; actually means',
        tocLabel: 'What conversion means',
        html: `<p>There is no format transformation involved. TNEF and ZIP are both containers, so the operation is: read the TNEF container, pull out the embedded files unchanged, and write them into a ZIP directory structure. Your PDF stays exactly the same PDF, byte for byte.</p>
<p>That is why the result is trustworthy: no re-encoding, no quality loss, no reflowed documents. If you compute a checksum of an extracted file and compare it with the sender&rsquo;s original, they match.</p>`
      },
      {
        id: 'why-zip',
        h2: 'Why a ZIP is the right output',
        tocLabel: 'Why ZIP',
        html: `<ul>
<li><strong>Multiple files, one download.</strong> A single container often holds several documents, and mobile browsers handle one download far better than five.</li>
<li><strong>Universal support.</strong> Windows, macOS, iOS, Android and ChromeOS all unpack ZIP without extra software.</li>
<li><strong>Filenames survive.</strong> The archive stores names in UTF-8, so accented and non-Latin filenames stay readable.</li>
<li><strong>Easy to forward.</strong> One archive is simple to attach to a reply or drop into shared storage.</li>
</ul>
<p>The archive is written without compression, because the files inside a container are typically already-compressed PDFs and Office documents. This keeps the conversion fast even on a phone, at the cost of a slightly larger archive.</p>`
      },
      {
        id: 'limits',
        h2: 'When conversion cannot work',
        tocLabel: 'When it fails',
        html: `<table>
<thead><tr><th>Situation</th><th>Result</th></tr></thead>
<tbody>
<tr><td>Container holds only Rich Text formatting</td><td>No files to place in a ZIP; the message text already arrived in the email</td></tr>
<tr><td>Meeting request or calendar data only</td><td>Nothing to convert; ask the sender to resend as an .ics or plain invitation</td></tr>
<tr><td>Embedded Outlook item or OLE object</td><td>Not a standalone document, so it cannot become a normal file</td></tr>
<tr><td>Truncated or gateway-modified container</td><td>The parser reports damaged data; request a resend</td></tr>
<tr><td>Not a TNEF file at all</td><td>The signature check fails; the .dat came from another program</td></tr>
</tbody>
</table>
<p>An honest converter tells you which of these happened. A tool that silently hands you an empty or broken archive is worse than one that reports the truth.</p>`
      },
      {
        id: 'privacy',
        h2: 'Privacy: local versus server-side conversion',
        tocLabel: 'Privacy considerations',
        html: `<p>Most &ldquo;online converters&rdquo; upload your file, convert it on a server and give you a download link. That means a copy of your attachment — possibly a contract, a payslip or a patient letter — exists on infrastructure you do not control, for a retention period you cannot verify.</p>
<p>Client-side conversion avoids this entirely. The <a href="/#extract">extractor here</a> reads the file with the File API and builds the ZIP in memory, so the only copies are on your device. If you want to prove it, load the page, switch off networking and convert a container offline.</p>`
      }
    ],
    faqs: [
      { q: 'Is winmail.dat just a renamed ZIP file?', a: 'No. TNEF is a different container format with its own attribute stream, so a ZIP tool cannot open it directly. It has to be parsed, then repackaged.' },
      { q: 'Will conversion change my documents?', a: 'No. The attachments are copied out unchanged, so file sizes and checksums match the sender\u2019s originals.' },
      { q: 'Why is the ZIP bigger than the winmail.dat file?', a: 'The archive is stored without compression for speed, and each entry adds a small header. The documents inside are identical to the originals.' },
      { q: 'Can I convert winmail.dat to ZIP on a phone?', a: 'Yes. The converter runs in mobile browsers, and both iOS Files and Android Files can unpack the resulting archive.' },
      { q: 'Is there a size limit?', a: 'Only your device memory. The tool declines files above roughly 150 MB to avoid crashing mobile browsers; use a computer for anything larger.' }
    ],
    sources: [MS_TNEF_FORMAT],
    related: ['winmail-dat-to-pdf', 'winmail-dat-viewer', 'what-is-winmail-dat', 'how-to-open-winmail-dat-on-windows']
  },

  {
    kind: 'article',
    slug: 'winmail-dat-to-pdf',
    crumb: 'Winmail.dat to PDF',
    linkLabel: 'Get the PDF out of winmail.dat',
    cardTag: 'Conversion',
    cardDesc: 'The honest answer about winmail.dat to PDF, and how to recover the original document.',
    title: 'Winmail.dat to PDF: How to Recover the PDF Inside',
    description: 'You cannot convert winmail.dat to PDF, but you can extract the PDF the sender attached. How to recover it, and what to do when the container holds no PDF.',
    h1: 'Winmail.dat to PDF: how to get your document back',
    lead: 'Searching for a winmail.dat to PDF converter usually means one thing: a colleague sent an invoice or a contract and your mail app shows a useless .dat file. The PDF is probably already inside the container — it needs extracting, not converting.',
    published: PUBLISHED,
    updated: UPDATED,
    readingTime: '5 min read',
    keyFacts: {
      title: 'The short version',
      items: [
        'A winmail.dat container is not a document, so there is nothing to convert into a PDF.',
        'If the sender attached a PDF, extraction returns that exact PDF, unchanged.',
        'If the sender only used Rich Text formatting, no PDF exists and no tool can create one.',
        'Renaming winmail.dat to .pdf always produces a file your reader rejects.'
      ]
    },
    howTo: {
      name: 'How to recover a PDF from a winmail.dat attachment',
      totalTime: 'PT2M',
      steps: [
        { id: 'pdf-step-1', name: 'Save the container', text: 'Download the winmail.dat attachment from your email app to your device.' },
        { id: 'pdf-step-2', name: 'Extract it in the browser', text: 'Open the extractor, select the container and let it list the attachments it finds inside.' },
        { id: 'pdf-step-3', name: 'Look for the PDF in the list', text: 'Check the recovered filenames for a .pdf entry and confirm the size looks plausible for the document you expected.' },
        { id: 'pdf-step-4', name: 'Download and open it', text: 'Download the ZIP, unpack it and open the PDF in your usual reader. The file is byte-identical to what the sender attached.' }
      ]
    },
    sections: [
      {
        id: 'why-no-converter',
        h2: 'Why a &ldquo;winmail.dat to PDF converter&rdquo; is the wrong search',
        tocLabel: 'Why no converter exists',
        html: `<p>Conversion means changing one document format into another, such as DOCX to PDF. A winmail.dat file is not a document at all — it is a package that may contain documents. So the useful operation is extraction: open the package and take out what is inside.</p>
<p>Sites advertising winmail.dat to PDF conversion are doing exactly that, usually after uploading your file to a server. You get the same result from a client-side extractor without handing over a copy of the document.</p>
<div class="callout warning"><strong>Never rename to .pdf.</strong> A PDF reader checks the file header, and the TNEF header is not a PDF header. You will get &ldquo;damaged file&rdquo; or &ldquo;cannot open&rdquo; every time.</div>`
      },
      {
        id: 'recover',
        h2: 'How to recover the original PDF',
        tocLabel: 'Recover the PDF',
        html: `<p>Save the container and run it through <a href="/#extract">the extractor</a>. The list of recovered files shows names and sizes, so you can confirm the PDF is present before downloading anything. Because extraction copies the bytes unchanged, digital signatures, form fields and embedded fonts all survive intact — important for invoices, tenders and signed agreements.</p>
<p>If several documents were attached, the ZIP contains all of them. Unpack it and keep only what you need.</p>`
      },
      {
        id: 'no-pdf',
        h2: 'What if there is no PDF inside?',
        tocLabel: 'When no PDF exists',
        html: `<p>Two outcomes are common:</p>
<ul>
<li><strong>The list contains a Word or Excel file instead.</strong> The sender attached DOCX or XLSX, not PDF. Open it and export to PDF yourself if you need that format — Word, Pages, LibreOffice and Google Docs all do this.</li>
<li><strong>The list is empty.</strong> The container holds only Rich Text formatting or Outlook data. No PDF was ever attached, so ask the sender to resend the document with the message format set to HTML.</li>
</ul>
<p>A short message that works: &ldquo;Your email arrived as a winmail.dat attachment that I cannot open. Could you resend the PDF with the message format set to HTML rather than Rich Text?&rdquo; You can also send them <a href="/how-to-stop-outlook-sending-winmail-dat/">the sender-side fix</a>.</p>`
      },
      {
        id: 'other-types',
        h2: 'Other file types you may recover',
        tocLabel: 'Other file types',
        html: `<p>Extraction is format-agnostic, so the same process returns whatever the sender attached:</p>
<ul>
<li>Word, Excel and PowerPoint documents, including macro-enabled variants — treat these with care.</li>
<li>Images such as JPEG, PNG, HEIC and TIFF, often company logos pulled from a signature.</li>
<li>Plain text, CSV and XML data files.</li>
<li>Nested ZIP archives, which you unpack a second time.</li>
<li>Occasionally a signature image or embedded logo that you can safely ignore.</li>
</ul>`
      }
    ],
    faqs: [
      { q: 'Can I convert winmail.dat to PDF online?', a: 'Not literally. The container is extracted rather than converted; if the sender attached a PDF, extraction returns that PDF unchanged.' },
      { q: 'Why does renaming winmail.dat to PDF not work?', a: 'PDF readers validate the file header. A TNEF container starts with a different signature, so the reader rejects it as damaged.' },
      { q: 'Does extraction reduce PDF quality?', a: 'No. The bytes are copied verbatim, so resolution, fonts, form fields and digital signatures are preserved.' },
      { q: 'The extractor found a .docx but I need a PDF. What now?', a: 'Open the Word file and export it to PDF, or ask the sender for a PDF version. The extractor does not change document formats.' },
      { q: 'Can a PDF hidden in winmail.dat be dangerous?', a: 'A PDF can contain malicious scripts, so open recovered documents only if you expected them, and keep your reader updated.' }
    ],
    sources: [MS_TNEF_FORMAT, MS_MESSAGE_FORMAT],
    related: ['winmail-dat-to-zip', 'is-winmail-dat-safe', 'what-is-winmail-dat', 'how-to-stop-outlook-sending-winmail-dat']
  },

  {
    kind: 'article',
    slug: 'att00001-dat-file',
    crumb: 'ATT00001.dat',
    linkLabel: 'ATT00001.dat and other odd names',
    cardTag: 'Explainer',
    cardDesc: 'ATT00001.dat, win.dat, Part 1.2 — why the same container arrives with different names.',
    title: 'ATT00001.dat: What It Is and How to Open It',
    description: 'ATT00001.dat, win.dat and Part 1.2 attachments are usually the same Outlook TNEF container as winmail.dat. Learn what they are and how to extract the files inside.',
    h1: 'ATT00001.dat and other strangely named attachments',
    lead: 'Not every TNEF container arrives called winmail.dat. Depending on the mail server and client, the same file can appear as ATT00001.dat, ATT00002.txt, win.dat, winmail.dat.bin or simply &ldquo;Part 1.2&rdquo;. The handling is identical.',
    published: PUBLISHED,
    updated: UPDATED,
    readingTime: '4 min read',
    sections: [
      {
        id: 'names',
        h2: 'The names you are likely to see',
        tocLabel: 'Common filenames',
        html: `<table>
<thead><tr><th>Filename</th><th>Usual explanation</th></tr></thead>
<tbody>
<tr><td><code>winmail.dat</code></td><td>The standard name Outlook gives a TNEF container</td></tr>
<tr><td><code>win.dat</code></td><td>A shortened variant produced by some gateways and older clients</td></tr>
<tr><td><code>ATT00001.dat</code>, <code>ATT00002.dat</code></td><td>A placeholder assigned when the MIME part has no filename; the number increments per part</td></tr>
<tr><td><code>ATT00001.htm</code>, <code>ATT00001.txt</code></td><td>Usually the alternative body of the message rather than a real attachment</td></tr>
<tr><td><code>Part 1.2</code>, <code>Mail Attachment</code>, <code>noname</code></td><td>Generic labels used by iOS Mail, some webmail and mailing-list software</td></tr>
<tr><td><code>winmail.dat.bin</code></td><td>An extra extension added by a download or transfer step</td></tr>
</tbody>
</table>
<p>The name is cosmetic. What matters is the content, and the only reliable test is to check the file signature — which is exactly what an extractor does before attempting anything.</p>`
      },
      {
        id: 'why-renamed',
        h2: 'Why the name changes in transit',
        tocLabel: 'Why names change',
        html: `<p>An email attachment carries its filename in MIME headers. When the sending client omits the name, or a gateway strips or rewrites headers during virus scanning, signature stamping or list distribution, the receiving client has to invent something. Apple Mail uses part numbers, other clients use ATT-prefixed placeholders, and some archiving systems add a <code>.bin</code> suffix.</p>
<p>The <code>ATT00001.htm</code> and <code>ATT00001.txt</code> variants are slightly different: those are usually the HTML or plain-text alternative body that a gateway exposed as a file. They contain the message text you already read, so they can normally be discarded.</p>`
      },
      {
        id: 'how-to-open',
        h2: 'How to open them',
        tocLabel: 'How to open them',
        html: `<p>Save the attachment under whatever name it has and select it in <a href="/#extract">the extractor</a>. The tool verifies the TNEF signature rather than trusting the extension, so a container named <code>Part 1.2</code> or <code>ATT00001.dat</code> is handled exactly like <code>winmail.dat</code>.</p>
<p>If the signature check fails, you have a genuinely different file. Common non-TNEF <code>.dat</code> files include database exports, game save data, application caches and Microsoft Access data — those need the program that produced them, and the sender is the fastest way to find out which.</p>`
      },
      {
        id: 'multiple',
        h2: 'When you receive several numbered attachments',
        tocLabel: 'Several ATT files',
        html: `<p>Messages that pass through gateways sometimes arrive with a handful of parts: <code>ATT00001.htm</code>, <code>ATT00002.dat</code>, <code>ATT00003.png</code>. A practical order of work:</p>
<ol>
<li>Try the <code>.dat</code> parts in the extractor first — that is where real documents usually hide.</li>
<li>Open the <code>.htm</code> or <code>.txt</code> parts in a browser or text editor if the message body looked incomplete.</li>
<li>Treat small <code>.png</code>, <code>.gif</code> or <code>.jpg</code> parts as signature graphics unless you were expecting images.</li>
<li>If nothing useful appears, reply and ask for a resend in HTML format.</li>
</ol>`
      }
    ],
    faqs: [
      { q: 'Is ATT00001.dat the same as winmail.dat?', a: 'Usually yes. It is typically the same Outlook TNEF container with a placeholder name assigned because the filename header was missing.' },
      { q: 'What is ATT00001.htm?', a: 'It is normally the HTML version of the message body exposed as a file by a mail gateway, not a separate document.' },
      { q: 'Why do I get Part 1.2 instead of a filename?', a: 'Apple Mail labels unnamed MIME parts by their position in the message, so Part 1.2 is a location rather than a real filename.' },
      { q: 'Can I delete the ATT files?', a: 'Once you have extracted anything useful, yes. Alternative-body parts and signature images can be discarded safely.' },
      { q: 'What if the .dat file is not TNEF?', a: 'Then it belongs to another application. Ask the sender which program created it, because a .dat extension carries no format information.' }
    ],
    sources: [MS_TNEF_FORMAT, MS_TNEF_CONVERSION],
    related: ['what-is-winmail-dat', 'winmail-dat-viewer', 'how-to-open-winmail-dat-on-iphone', 'is-winmail-dat-safe']
  },

  {
    kind: 'article',
    slug: 'how-to-stop-outlook-sending-winmail-dat',
    crumb: 'Stop winmail.dat',
    linkLabel: 'Stop Outlook sending winmail.dat',
    cardTag: 'For senders',
    cardDesc: 'Fix the message format, the saved contact and the Exchange setting behind TNEF.',
    title: 'How to Stop Outlook Sending Winmail.dat (Sender Fix)',
    description: 'Stop Outlook creating winmail.dat attachments: change the message format to HTML, fix the Rich Text setting on saved contacts and adjust Exchange TNEF conversion.',
    h1: 'How to stop Outlook sending winmail.dat',
    lead: 'Only the sender can fix this permanently. There are three layers to check: the individual message format, the saved contact record, and the organisation-wide TNEF conversion setting. Work through them in that order.',
    published: PUBLISHED,
    updated: UPDATED,
    readingTime: '6 min read',
    keyFacts: {
      title: 'The three fixes',
      items: [
        'Per message: set the format to HTML or Plain Text before sending.',
        'Per contact: remove the Rich Text preference stored on the recipient\u2019s contact card.',
        'Organisation-wide: configure TNEF conversion for external recipients or a remote domain.',
        'Recipients cannot fix this themselves; they can only extract the container after the fact.'
      ]
    },
    howTo: {
      name: 'How to stop Outlook sending winmail.dat attachments',
      totalTime: 'PT5M',
      tools: ['Microsoft Outlook', 'Optional: Exchange or Microsoft 365 admin access'],
      steps: [
        { id: 'stop-step-1', name: 'Change the default message format to HTML', text: 'In Outlook, open File then Options then Mail, and set the option for composing messages to HTML instead of Rich Text.' },
        { id: 'stop-step-2', name: 'Fix the format on the current message', text: 'While composing, open the Format Text tab and select HTML or Plain Text before sending.' },
        { id: 'stop-step-3', name: 'Clear Rich Text from the saved contact', text: 'Open the recipient in Contacts, edit the email address entry and set the internet format to send plain text or HTML only.' },
        { id: 'stop-step-4', name: 'Check the autocomplete cache', text: 'Delete the recipient from the autocomplete list so a stale Rich Text preference is not reused, then retype the address.' },
        { id: 'stop-step-5', name: 'Ask an administrator about TNEF conversion', text: 'For a recurring organisation-wide problem, have an administrator configure TNEF conversion for external recipients or the affected remote domain.' }
      ]
    },
    sections: [
      {
        id: 'per-message',
        h2: 'Fix 1: the message format',
        tocLabel: 'Fix 1: message format',
        html: `<p>Outlook supports three formats: HTML, Plain Text and Outlook Rich Text (RTF). Only Rich Text triggers TNEF encapsulation for external recipients, so it is the setting to avoid when writing to people outside your organisation.</p>
<p>For every future message, change the default under <strong>File &rsaquo; Options &rsaquo; Mail</strong>, in the section that controls the format used when composing. For a message you are writing right now, use the <strong>Format Text</strong> tab on the ribbon and select <strong>HTML</strong>. In new Outlook and Outlook on the web, HTML is the default and Rich Text is not offered, which is why the problem is usually reported from classic Outlook.</p>
<div class="callout tip"><strong>Test it:</strong> send a message with one attachment to a personal Gmail address. If the attachment arrives with its real filename, the format fix worked.</div>`
      },
      {
        id: 'per-contact',
        h2: 'Fix 2: the saved contact and autocomplete cache',
        tocLabel: 'Fix 2: contact record',
        html: `<p>This is the step people miss. A contact record can store a per-recipient format preference, and it overrides your global default. If one particular colleague or client always receives winmail.dat while everyone else is fine, the contact record is almost certainly the cause.</p>
<p>Open the contact, edit the email address entry and set the internet sending format so that Rich Text is not used. Then delete the recipient from Outlook&rsquo;s autocomplete suggestions — press Delete while the suggestion is highlighted — because the cached entry can carry the old preference. Retype the address fully on the next message.</p>`
      },
      {
        id: 'admin',
        h2: 'Fix 3: Exchange and Microsoft 365 settings',
        tocLabel: 'Fix 3: admin settings',
        html: `<p>Administrators can control TNEF at the organisation level. Exchange and Exchange Online let you set the TNEF conversion behaviour for a remote domain, for individual mail users or contacts, and through mail-flow rules. Setting conversion so that TNEF is disabled for external destinations means Outlook Rich Text messages are converted before they leave the organisation, regardless of what individual users choose.</p>
<p>This is the durable fix for a company that keeps generating complaints from customers and partners. It is also worth checking any archiving, signature-stamping or security gateway in the path, because some of them re-encapsulate messages or strip the headers that would otherwise have prevented the problem.</p>`
      },
      {
        id: 'checklist',
        h2: 'Sender checklist',
        tocLabel: 'Sender checklist',
        html: `<table>
<thead><tr><th>Check</th><th>Where</th></tr></thead>
<tbody>
<tr><td>Default compose format is HTML</td><td>File &rsaquo; Options &rsaquo; Mail</td></tr>
<tr><td>Current message is not Rich Text</td><td>Format Text tab while composing</td></tr>
<tr><td>Contact has no Rich Text preference</td><td>Contacts &rsaquo; email address entry</td></tr>
<tr><td>Autocomplete entry deleted and address retyped</td><td>To field suggestions</td></tr>
<tr><td>Signature does not force Rich Text</td><td>Signature settings</td></tr>
<tr><td>TNEF conversion configured for external mail</td><td>Exchange or Microsoft 365 admin</td></tr>
<tr><td>Gateway or archiving product not re-encapsulating</td><td>Mail-flow path review</td></tr>
</tbody>
</table>`
      },
      {
        id: 'recipient-side',
        h2: 'What recipients can do meanwhile',
        tocLabel: 'For recipients',
        html: `<p>Recipients have no setting that decodes TNEF in Gmail, Apple Mail or a phone mail app. Until the sender applies the fix, use <a href="/#extract">the extractor</a> to recover the attachments from each container, or follow the walkthrough for <a href="/how-to-open-winmail-dat-on-iphone/">iPhone</a>, <a href="/how-to-open-winmail-dat-on-android/">Android</a>, <a href="/how-to-open-winmail-dat-on-windows/">Windows</a> or <a href="/how-to-open-winmail-dat-on-mac/">macOS</a>.</p>`
      }
    ],
    faqs: [
      { q: 'Why does only one recipient get winmail.dat from me?', a: 'A per-recipient Rich Text preference is stored on that contact record or in the autocomplete cache. Clear both and retype the address.' },
      { q: 'Does switching to plain text stop winmail.dat?', a: 'Yes, plain text avoids TNEF, but it also removes all formatting. HTML is normally the better choice because it keeps formatting and remains compatible.' },
      { q: 'Does new Outlook or Outlook on the web still send winmail.dat?', a: 'They compose in HTML and do not offer Outlook Rich Text, so they are far less likely to produce it. Server-side settings and gateways can still be involved.' },
      { q: 'Can the recipient prevent winmail.dat?', a: 'No. The encapsulation is applied when the message is sent, so only the sender or their administrator can prevent it.' },
      { q: 'Does removing the attachment help?', a: 'No. Rich Text messages can produce a container even with no attachment, because the formatting itself is encapsulated.' },
      { q: 'Is meeting-request winmail.dat the same problem?', a: 'It has the same root cause. Sending invitations in HTML-compatible format, or letting the server convert TNEF for external recipients, resolves it.' }
    ],
    sources: [MS_MESSAGE_FORMAT, MS_TNEF_CONVERSION, { label: 'Microsoft Learn: Set-RemoteDomain TNEF options', url: 'https://learn.microsoft.com/en-us/powershell/module/exchange/set-remotedomain' }],
    related: ['what-is-winmail-dat', 'how-to-open-winmail-dat-in-gmail', 'how-to-open-winmail-dat-on-windows', 'is-winmail-dat-safe']
  },

  {
    kind: 'article',
    slug: 'is-winmail-dat-safe',
    crumb: 'Is it safe?',
    linkLabel: 'Is winmail.dat safe?',
    cardTag: 'Security',
    cardDesc: 'How to judge the sender, spot risky extracted files and handle work documents safely.',
    title: 'Is Winmail.dat Safe? Risks and Sensible Precautions',
    description: 'A winmail.dat file is a Microsoft container, not malware, but it can carry any attachment. How to check the sender, spot risky file types and extract it safely.',
    h1: 'Is winmail.dat safe to open?',
    lead: 'The container format itself is harmless — it is a Microsoft packaging standard. The risk lies in what a sender put inside it, and in the converter you choose to unpack it with. Both are manageable with a few checks.',
    published: PUBLISHED,
    updated: UPDATED,
    readingTime: '5 min read',
    keyFacts: {
      title: 'Summary',
      items: [
        'TNEF is a legitimate format created by Outlook and Exchange, not a malware indicator.',
        'The files inside deserve exactly the same caution as any email attachment.',
        'Extraction itself does not execute anything; opening the recovered documents is where risk begins.',
        'Client-side extraction avoids sending confidential documents to a third-party server.'
      ]
    },
    sections: [
      {
        id: 'format-safety',
        h2: 'The format is not the threat',
        tocLabel: 'Is the format dangerous?',
        html: `<p>Receiving a winmail.dat attachment does not mean the message is malicious. Countless legitimate business emails arrive this way every day because a sender used Outlook Rich Text. Deleting them unread is usually unnecessary, and it can mean losing a genuine invoice or contract.</p>
<p>What the container does do is hide the contents from your mail provider&rsquo;s preview and, in some configurations, from parts of the scanning chain. That is why a quick sanity check before opening the recovered files is worthwhile.</p>`
      },
      {
        id: 'assess-sender',
        h2: 'Step 1: assess the message, not the file',
        tocLabel: 'Assess the sender',
        html: `<p>Before extracting anything, ask the same questions you would about any attachment:</p>
<ul>
<li>Do you know the sender, and were you expecting a document from them?</li>
<li>Does the display name match the actual email address, including the domain spelling?</li>
<li>Is the message unusually urgent, vague, or pushing you to open the attachment quickly?</li>
<li>Does it reference an invoice, delivery, payroll change or password reset you did not initiate?</li>
</ul>
<p>If anything is off, verify by phone or a fresh message to a known address rather than by replying. Attacker-controlled reply addresses are common.</p>`
      },
      {
        id: 'risky-files',
        h2: 'Step 2: check what came out',
        tocLabel: 'Check the extracted files',
        html: `<p>After extraction you get a list of filenames. This is the most useful security moment, because the file type tells you a lot:</p>
<table>
<thead><tr><th>Extracted file type</th><th>Risk</th><th>Sensible action</th></tr></thead>
<tbody>
<tr><td>.pdf, .docx, .xlsx, .jpg, .png, .txt, .csv</td><td>Normal</td><td>Open if expected; keep your reader updated</td></tr>
<tr><td>.docm, .xlsm, .pptm (macro-enabled)</td><td>Elevated</td><td>Do not enable macros unless you verified the sender</td></tr>
<tr><td>.exe, .msi, .scr, .bat, .cmd, .ps1, .vbs, .js, .lnk</td><td>High</td><td>Do not run. Verify out of band or delete</td></tr>
<tr><td>.iso, .img, .zip inside the ZIP, password-protected archives</td><td>High</td><td>A common malware-delivery pattern; treat with suspicion</td></tr>
<tr><td>.html, .htm attachments asking you to sign in</td><td>High</td><td>Classic phishing page; do not enter credentials</td></tr>
</tbody>
</table>
<div class="callout warning"><strong>Double extensions:</strong> a file listed as <code>invoice.pdf.exe</code> is an executable, not a PDF. Check the last extension, not the first.</div>`
      },
      {
        id: 'tool-safety',
        h2: 'Step 3: choose the extractor carefully',
        tocLabel: 'Choosing a safe tool',
        html: `<p>The tool you use matters as much as the file. Two questions decide it:</p>
<ul>
<li><strong>Does it upload my document?</strong> A server-side converter receives a full copy of the attachment. For contracts, medical letters, HR files, tender documents or anything covered by GDPR or a confidentiality clause, that is a data transfer you probably cannot justify.</li>
<li><strong>Is it an installer?</strong> Downloadable &ldquo;DAT openers&rdquo; from search advertisements are a known vector for bundled adware. Prefer a client-side web tool or a well-established open-source utility.</li>
</ul>
<p>The <a href="/#extract">extractor on this site</a> runs entirely in the browser and states its limits openly. You can verify the claim by loading the page, going offline and extracting a container with no network connection.</p>`
      },
      {
        id: 'workplace',
        h2: 'Workplace and compliance notes',
        tocLabel: 'Workplace guidance',
        html: `<p>If you handle regulated data, three habits keep you on the right side of policy: extract locally rather than uploading; keep the original message until the recovered files are verified and archived; and report suspicious containers to your security team instead of forwarding them to colleagues to test.</p>
<p>For helpdesks, the durable fix is upstream. Ask the sending organisation to correct its message format, or ask your own administrators about TNEF conversion rules if internal senders are the source. The <a href="/how-to-stop-outlook-sending-winmail-dat/">sender-side guide</a> is a link you can paste into a ticket.</p>`
      }
    ],
    faqs: [
      { q: 'Can a winmail.dat file contain a virus?', a: 'Yes, in the same way any email attachment can, because the container simply carries whatever the sender attached. The format itself is not malicious.' },
      { q: 'Does my antivirus scan inside winmail.dat?', a: 'Many mail and endpoint scanners do inspect TNEF, but coverage varies. Scanning the extracted files locally is a reasonable extra step for unexpected messages.' },
      { q: 'Is it safe to use an online winmail.dat extractor?', a: 'It depends on where processing happens. A client-side extractor never receives your document, while a server-side converter necessarily does.' },
      { q: 'Should I delete winmail.dat from an unknown sender?', a: 'If you were not expecting the message and the sender is unknown, deleting it is a reasonable default. Nothing of yours is lost by not extracting it.' },
      { q: 'Can just opening winmail.dat infect my device?', a: 'Extraction does not execute code from the container. Risk appears only when you open or run a recovered file.' },
      { q: 'Is winmail.dat a sign of phishing?', a: 'Not by itself, since legitimate Outlook senders produce it constantly. Judge the message content, sender address and context instead.' }
    ],
    sources: [MS_TNEF_CONVERSION, MS_TNEF_FORMAT],
    related: ['what-is-winmail-dat', 'winmail-dat-viewer', 'how-to-stop-outlook-sending-winmail-dat', 'winmail-dat-to-pdf']
  }
);

/* ------------------------------------------------------------- legal / misc */

const legal = [
  {
    kind: 'legal',
    slug: 'about',
    crumb: 'About',
    title: 'About the Winmail.dat Extractor',
    description: 'What the Winmail.dat Extractor does, how the browser-based TNEF parser works, what it deliberately does not promise, and who maintains it.',
    h1: 'About this tool',
    updated: UPDATED,
    priority: '0.4',
    html: `<p>Winmail.dat Extractor is a focused utility for people who receive Microsoft TNEF attachments in an email app that cannot display them. It exists because the usual advice found online — rename the file, install an unknown converter, or upload a confidential document to a stranger&rsquo;s server — is worse than the problem.</p>
<h2>How it works</h2>
<p>The page loads a small JavaScript TNEF parser. When you select a file, the browser reads it with the File API, checks the TNEF signature, walks the attribute stream and collects every by-value attachment together with its display name and transport name. Filenames are decoded from Windows-1252 or UTF-16, sanitised, de-duplicated, and written into a ZIP archive that is assembled in memory. The selected file is not sent to our server, and there is no server-side processing endpoint at all.</p>
<h2>What it deliberately does not promise</h2>
<p>TNEF can carry many Outlook and MAPI object types. This tool targets standard by-value file attachments. It does not claim to reconstruct meeting requests, embedded Outlook items, OLE objects, custom forms, voting buttons or damaged containers. When extraction finds nothing, it says so, because a clear message is more useful than a broken download.</p>
<h2>Editorial approach</h2>
<p>The guides are written for the situation people are actually in: an attachment they need, on the device they have, without administrator rights. Each guide states what works, what does not, and when the only real answer is to ask the sender to resend. Technical claims are checked against Microsoft&rsquo;s published documentation, which is linked at the end of each article, and pages carry a visible last-updated date.</p>
<h2>Independence</h2>
<p>This website is not affiliated with, endorsed by or sponsored by Microsoft, Apple or Google. Outlook, Microsoft 365, Exchange, iPhone, iPadOS, macOS, Android and Gmail are trademarks of their respective owners and are named only to describe compatibility.</p>
<h2>Source code and feedback</h2>
<p>The extractor and the site generator are published so anyone can review the parser before trusting it: <a href="${SITE.repo}" rel="noopener">${SITE.repo}</a>. Corrections and bug reports are welcome through the repository&rsquo;s issue tracker.</p>`
  },
  {
    kind: 'legal',
    slug: 'privacy',
    crumb: 'Privacy',
    title: 'Privacy Policy',
    description: 'Privacy information for the Winmail.dat Extractor: local browser file processing, hosting logs, cookies, analytics and external links.',
    h1: 'Privacy Policy',
    updated: UPDATED,
    priority: '0.3',
    html: `<p><strong>Effective date:</strong> 25 July 2026</p>
<h2>File processing</h2>
<p>The extractor processes selected files inside your browser. The website does not upload, store, transmit or receive the contents of files chosen through the extractor, and no server-side conversion endpoint exists. You can verify this by loading the page, disconnecting from the network and extracting a file offline.</p>
<h2>Cookies and local storage</h2>
<p>The site sets no cookies and writes nothing to local storage or IndexedDB. Nothing about the files you extract is retained between visits.</p>
<h2>Hosting logs</h2>
<p>Our hosting provider may process ordinary technical request data — IP address, user agent, requested URL, timestamps and security or performance logs — when your browser loads pages and assets. These records concern page delivery only and never include the winmail.dat file selected through the local file picker.</p>
<h2>Analytics and advertising</h2>
<p>The current version contains no analytics script, advertising identifier, tracking pixel or third-party embed. If analytics is added later, this policy will be updated and any legally required consent controls will be implemented before collection begins.</p>
<h2>External links</h2>
<p>Guides link to official documentation from Microsoft, Apple and Google. Those websites operate under their own privacy policies, and following a link means their terms apply.</p>
<h2>Children</h2>
<p>The site is a general-purpose utility, is not directed at children, and does not knowingly collect personal information from anyone.</p>
<h2>Your rights</h2>
<p>Because no personal data is collected through the tool itself, there is normally nothing to access, correct or delete. Requests concerning hosting logs can be raised through the repository&rsquo;s issue tracker and will be forwarded to the hosting provider where applicable.</p>
<h2>Security</h2>
<p>No website can guarantee absolute security. Use a current browser, and do not open recovered attachments unless you trust the sender and expected the content.</p>`
  },
  {
    kind: 'legal',
    slug: 'terms',
    crumb: 'Terms',
    title: 'Terms of Use',
    description: 'Terms of use for the Winmail.dat Extractor, including the as-is nature of the utility, user responsibilities, limitations and acceptable use.',
    h1: 'Terms of Use',
    updated: UPDATED,
    priority: '0.3',
    html: `<p><strong>Effective date:</strong> 25 July 2026</p>
<h2>Utility provided as-is</h2>
<p>The website is provided for general convenience without warranties of accuracy, availability, compatibility, fitness for a particular purpose, or successful recovery of any attachment.</p>
<h2>Your responsibility</h2>
<p>You are responsible for having the authority to process the file you select, for maintaining your own backups, for checking recovered filenames before opening them, and for scanning attachments with security software appropriate to your environment.</p>
<h2>Limitations</h2>
<p>The tool does not support every TNEF variant or Outlook object type. Do not rely on it as the only copy or recovery method for important business, legal, medical or financial records.</p>
<h2>Acceptable use</h2>
<p>Do not use the website to violate privacy, intellectual property, computer security or other applicable laws, and do not attempt to disrupt, overload or reverse engineer the hosting service.</p>
<h2>Third-party names</h2>
<p>Product and company names are used only to describe compatibility and remain the property of their respective owners.</p>
<h2>Changes</h2>
<p>These terms may be updated as the tool changes. The effective date above indicates the current version.</p>`
  }
];

const notFound = {
  kind: 'legal',
  slug: '404',
  file: '404.html',
  crumb: 'Page not found',
  title: 'Page not found',
  metaTitle: 'Page not found | Winmail.dat Extractor',
  description: 'That page does not exist. Use the winmail.dat extractor or browse the guides to open an Outlook TNEF attachment.',
  h1: 'Page not found',
  updated: UPDATED,
  noindex: true,
  html: `<p>The address may be mistyped, or the page may have moved. These links cover almost everything on the site:</p>
<ul>
<li><a href="/">Winmail.dat extractor</a> — open a container and download the attachments</li>
<li><a href="/guides/">All guides</a> — iPhone, Android, Windows, Mac, Gmail, ZIP, PDF and more</li>
<li><a href="/what-is-winmail-dat/">What is a winmail.dat file?</a></li>
<li><a href="/how-to-stop-outlook-sending-winmail-dat/">Stop Outlook sending winmail.dat</a></li>
</ul>
<p><a class="button" href="/">Go to the extractor</a></p>`
};

export const pages = [home, guidesHub, ...articles, ...legal, notFound];
