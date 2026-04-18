import { OWNER, ASCII_NAME, PROJECTS, CLIENTS, SKILLS, TOOLS, TESTIMONIALS, ARTICLES } from './portfolioData.js';

// ================================================================
// COMMAND DEFINITIONS
// ================================================================

const _e = OWNER.email;

export const COMMANDS = {
  '/help': { desc: 'List all available commands' },
  '/about': { desc: 'Who am I?' },
  '/work': { desc: 'Featured projects & case studies' },
  '/clients': { desc: 'Companies I\'ve worked with' },
  '/skills': { desc: 'Expertise & capabilities' },
  '/philosophy': { desc: 'My development philosophy' },
  '/social': { desc: 'Social profiles & links' },
  '/articles': { desc: 'Published articles & guides' },
  '/testimonials': { desc: 'What people say about me' },
  '/contact': { desc: 'Get in touch' },
  '/shortcuts': { desc: 'Keyboard shortcuts & power moves' },
  '/aichat': { desc: 'Toggle AI chat mode (or use /aichat <question>)' },
  '/aichat_off': { desc: 'Toggle AI chat mode off' },
  '/voice': { desc: 'Start voice command input' },
  '/stats': { desc: 'View analytics & command usage stats' },
  '/regedit': { desc: 'Windows Registry viewer (haha)' },
  '/devmode': { desc: 'Developer mode with jokes' },
  '/qrcode': { desc: 'Generate QR code for portfolio sharing' },
  '/clear': { desc: 'Clear the terminal' },
};

export const INFO_COMMANDS = {
  '/linkedin': { desc: 'LinkedIn profile' },
  '/github': { desc: 'GitHub profile' },
  '/instagram': { desc: 'Instagram profile' },
  '/phone': { desc: 'Phone number' },
  '/email': { desc: 'Email address' },
  '/location': { desc: 'Where I\'m based' },
};

export const PROJECT_COMMANDS = Object.fromEntries(
  PROJECTS.map(p => [`/${p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`, { desc: p.name + ' — ' + p.type }])
);

export const THEME_COMMANDS = {
  '/dark': { desc: 'Dark mode (default)' },
  '/light': { desc: 'Light mode' },
  '/retro': { desc: 'Retro CRT mode' },
  '/glass': { desc: 'Modern glass mode' },
  '/themes': { desc: 'Browse all themes' },
};

export const ALIASES = {
  '/portfolio': '/work', '/projects': '/work', '/me': '/about',
  '/hire': '/contact', '/call': '/phone', '/mail': '/email',
  '/blog': '/articles', '/writing': '/articles',
  '/reviews': '/testimonials', '/recommendations': '/testimonials',
  '/links': '/social', '/socials': '/social',
  '/reset': '/clear', '/cls': '/clear',
  '/gh': '/github', '/ig': '/instagram', '/insta': '/instagram',
  '/expertise': '/skills', '/services': '/skills',
  '/dark mode': '/dark', '/light mode': '/light',
  '/theme': '/themes', '/colors': '/themes',
};

// ================================================================
// CONTENT GENERATORS
// ================================================================

export function buildHelp() {
  const lines = [
    { text: 'Available Commands', cls: 'heading' },
    { text: '' },
    { html: `  <span class="cmd-desc" style="text-transform:uppercase;letter-spacing:1px;font-size:0.75em">Navigation</span>` },
  ];
  for (const [cmd, data] of Object.entries(COMMANDS)) {
    lines.push({ html: `  <span class="cmd-name">${cmd}</span> <span class="cmd-desc">${data.desc}</span>` });
  }
  lines.push({ text: '' });
  lines.push({ html: `  <span class="cmd-desc" style="text-transform:uppercase;letter-spacing:1px;font-size:0.75em">Quick Info</span>` });
  for (const [cmd, data] of Object.entries(INFO_COMMANDS)) {
    lines.push({ html: `  <span class="cmd-name">${cmd}</span> <span class="cmd-desc">${data.desc}</span>` });
  }
  lines.push({ text: '' });
  lines.push({ html: `  <span class="cmd-desc" style="text-transform:uppercase;letter-spacing:1px;font-size:0.75em">Projects</span>` });
  for (const [cmd, data] of Object.entries(PROJECT_COMMANDS)) {
    lines.push({ html: `  <span class="cmd-name">${cmd}</span> <span class="cmd-desc">${data.desc}</span>` });
  }
  lines.push({ text: '' });
  lines.push({ html: `  <span class="cmd-desc" style="text-transform:uppercase;letter-spacing:1px;font-size:0.75em">Themes</span>` });
  for (const [cmd, data] of Object.entries(THEME_COMMANDS)) {
    lines.push({ html: `  <span class="cmd-name">${cmd}</span> <span class="cmd-desc">${data.desc}</span>` });
  }
  lines.push({ text: '' });
  lines.push({ text: 'Tip: Use ↑↓ for history, Tab for autocomplete.', cls: 'dim' });
  lines.push({ text: '  ...and a few secrets, if you look.', cls: 'dim', style: 'opacity:0.5;font-style:italic' });
  return lines;
}

export function buildAbout() {
  return [
    { text: `About ${OWNER.name}`, cls: 'heading' },
    { text: '' },
    { text: `  Developer & creator with a passion for crafting elegant, performant, and accessible web experiences. Based in ${OWNER.location}.` },
    { text: '' },
    { text: 'What I do', cls: 'heading' },
    { text: '' },
    { text: '  I build things for the web. From performant APIs to pixel-perfect UIs, my work lives at the intersection of engineering precision and thoughtful design.' },
    { text: '' },
    { text: '  At every stage I ask: "Does this solve the real problem?" Clever code means nothing if it doesn\'t serve the user.' },
    { text: '' },
    { text: 'Background', cls: 'heading' },
    { text: '' },
    { text: '  Started coding at age 14. Fell in love with the immediacy of the web — write something, refresh the browser, see it live. That feeling never gets old.', cls: 'accent' },
    { text: '' },
    { text: 'Beyond the screen', cls: 'heading' },
    { text: '' },
    { text: '  ◆ Cricket enthusiast (and lifelong fan of the bansuri)', cls: 'cyan' },
    { text: '  ◆ Occasional writer on dev topics', cls: 'cyan' },
    { text: '  ◆ Open source contributor', cls: 'cyan' },
    { text: '  ◆ Always learning something new', cls: 'cyan' },
    { text: '' },
    { text: '  → /work to see what I\'ve built', cls: 'dim' },
    { text: '  → /testimonials to see what people say', cls: 'dim' },
    { text: '  // try: cat readme.md', cls: 'dim', style: 'opacity:0.4' },
  ];
}

export function buildWork() {
  const container = document.createElement('div');
  container.innerHTML = `<div class="output-line heading">Featured Work</div>
    <div class="output-line dim" style="margin-bottom:12px">  ${PROJECTS.length} projects • open to new collaborations</div>`;
  PROJECTS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <span class="project-year">${p.year}</span>
      <div class="project-name">${p.name}</div>
      <div class="project-type">${p.type}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
      ${p.stats ? `<div class="project-stats">${p.stats.map(s => `<span class="project-stat">✦ ${s}</span>`).join('')}</div>` : ''}
      ${p.url ? `<div style="margin-top:8px"><a href="${p.url}" target="_blank" rel="noopener noreferrer" style="color:var(--accent);font-size:0.8rem;text-decoration:underline">View on GitHub →</a></div>` : ''}
    `;
    container.appendChild(card);
  });
  const hint = document.createElement('div');
  hint.className = 'output-line dim';
  hint.style.marginTop = '12px';
  hint.textContent = '  → /contact to start a collaboration';
  container.appendChild(hint);
  return container;
}

export function buildClients() {
  const container = document.createElement('div');
  container.innerHTML = `<div class="output-line heading">Clients & Companies</div>
    <div class="output-line dim" style="margin-bottom:12px">  Collaborators across industries</div>`;
  const grid = document.createElement('div');
  grid.className = 'client-grid';
  CLIENTS.forEach(c => {
    const item = document.createElement('div');
    item.className = 'client-item';
    item.textContent = c;
    grid.appendChild(item);
  });
  container.appendChild(grid);
  const hint = document.createElement('div');
  hint.className = 'output-line dim';
  hint.style.marginTop = '12px';
  hint.textContent = '  → /work for detailed case studies';
  container.appendChild(hint);
  return container;
}

export function buildSkills() {
  const container = document.createElement('div');
  container.innerHTML = `<div class="output-line heading">Expertise & Capabilities</div><div style="height:8px"></div>`;
  SKILLS.forEach(s => {
    const bar = document.createElement('div');
    bar.className = 'skill-bar';
    bar.innerHTML = `
      <span class="skill-label">${s.name}</span>
      <div class="bar-track"><div class="bar-fill ${s.color}" data-width="${s.pct}%" style="width:0"></div></div>
      <span class="skill-pct">${s.pct}%</span>
    `;
    container.appendChild(bar);
  });
  const toolsSection = document.createElement('div');
  toolsSection.innerHTML = `
    <div class="output-line heading" style="margin-top:20px">Tools</div>
    ${TOOLS.map(t => `<div class="output-line" style="margin-top:4px">  ${t}</div>`).join('')}
    <div class="output-line dim" style="margin-top:12px">  → /philosophy to see how I think</div>
  `;
  container.appendChild(toolsSection);
  requestAnimationFrame(() => {
    setTimeout(() => {
      container.querySelectorAll('.bar-fill').forEach(el => {
        el.style.width = el.dataset.width;
      });
    }, 100);
  });
  return container;
}

export function buildPhilosophy() {
  return [
    { text: 'Development Philosophy', cls: 'heading' },
    { text: '' },
    { text: '  "Ship it, but ship it right."', cls: 'accent' },
    { text: '' },
    { text: '  ◆ Correctness First', cls: 'green' },
    { text: '    A fast wrong answer is still wrong. Write tests, think in edge cases.' },
    { text: '' },
    { text: '  ◆ User-Centric Engineering', cls: 'green' },
    { text: '    Performance IS a feature. Accessibility IS a feature. Both deserve engineering effort.' },
    { text: '' },
    { text: '  ◆ Simple Over Clever', cls: 'green' },
    { text: '    The code you don\'t write can\'t have bugs. Prefer boring, readable solutions.' },
    { text: '' },
    { text: '  ◆ Own It End-to-End', cls: 'green' },
    { text: '    From SQL query to pixel on screen — understanding the full stack makes better engineers.' },
    { text: '' },
    { text: '  → /contact to start a conversation', cls: 'dim' },
  ];
}

export function buildSocial() {
  const container = document.createElement('div');
  container.innerHTML = `<div class="output-line heading">Social Profiles</div><div style="height:8px"></div>`;
  const links = [
    { icon: 'in', name: 'LinkedIn', url: OWNER.linkedin, color: 'blue', handle: OWNER.linkedin.replace('https://linkedin.com', '') },
    { icon: 'gh', name: 'GitHub', url: OWNER.github, color: 'accent', handle: OWNER.github.replace('https://github.com/', '@') },
    { icon: 'ig', name: 'Instagram', url: OWNER.instagram, color: 'purple', handle: OWNER.instagram.replace('https://instagram.com/', '@') },
  ];
  links.forEach(l => {
    const row = document.createElement('a');
    row.href = l.url;
    row.target = '_blank';
    row.rel = 'noopener noreferrer';
    row.className = 'social-link';
    row.innerHTML = `
      <span class="social-badge ${l.color}">${l.icon}</span>
      <span class="social-name">${l.name}</span>
      <span class="social-handle">${l.handle}</span>
      <span class="social-arrow">→</span>
    `;
    container.appendChild(row);
  });
  const hint = document.createElement('div');
  hint.className = 'output-line dim';
  hint.style.marginTop = '12px';
  hint.textContent = '  → /contact to get in touch directly';
  container.appendChild(hint);
  return container;
}

export function buildContact() {
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="output-line heading">Get in Touch</div>
    <div style="height:12px"></div>
    <div class="output-line">[EMAIL]  ${_e} <button onclick="navigator.clipboard.writeText('${_e}'); alert('Copied!')" style="margin-left:12px; padding:2px 6px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:3px; color:var(--accent); cursor:pointer; font-size:0.8em">Copy</button></div>
    <div class="output-line">[PHONE]  ${OWNER.phone} <button onclick="navigator.clipboard.writeText('${OWNER.phone}'); alert('Copied!')" style="margin-left:12px; padding:2px 6px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:3px; color:var(--blue); cursor:pointer; font-size:0.8em">Copy</button></div>
    <div class="output-line">[LOC]  ${OWNER.location}</div>
    <div style="height:12px"></div>
    <div class="output-line">  Open to: full-time roles, contract work, consulting, open-source collaborations.</div>
    <div style="height:12px"></div>
    <div class="output-line accent">  Let's build something that matters.</div>
    <div style="height:12px"></div>
    <div class="output-line dim">  → /social for all my profiles</div>
    <div class="output-line dim" style="opacity:0.4">  // or just: sudo hire me</div>
  `;
  return container;
}

export function buildTestimonials() {
  const container = document.createElement('div');
  container.innerHTML = `<div class="output-line heading">Testimonials</div>
    <div class="output-line dim" style="margin-bottom:12px">  What colleagues and clients say</div>`;
  TESTIMONIALS.forEach(t => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-name" style="font-size:0.9em;font-weight:400">"${t.quote}"</div>
      <div style="margin-top:8px">
        <span class="${t.color}" style="font-weight:600">— ${t.name}</span>
        <span class="dim" style="margin-left:4px">${t.title}</span>
      </div>
      <div class="dim" style="font-size:0.75em;margin-top:2px">${t.relation}</div>
    `;
    container.appendChild(card);
  });
  const hint = document.createElement('div');
  hint.className = 'output-line dim';
  hint.style.marginTop = '12px';
  hint.innerHTML = `  → <a href="${OWNER.linkedin}" target="_blank" rel="noopener noreferrer" style="color:var(--accent)">LinkedIn</a> for all recommendations`;
  container.appendChild(hint);
  return container;
}

export function buildArticles() {
  const container = document.createElement('div');
  container.innerHTML = `<div class="output-line heading">Published Articles</div>
    <div class="output-line dim" style="margin-bottom:12px">  On code, design, and craft</div>`;
  ARTICLES.forEach(group => {
    const catEl = document.createElement('div');
    catEl.className = 'output-line';
    catEl.style.marginTop = '12px';
    catEl.innerHTML = `<span style="text-transform:uppercase;letter-spacing:1px;font-size:0.75em;color:var(--accent)">${group.cat}</span>`;
    container.appendChild(catEl);
    group.items.forEach(a => {
      const row = document.createElement('a');
      row.href = a.url;
      row.target = '_blank';
      row.rel = 'noopener noreferrer';
      row.className = 'social-link';
      row.style.padding = '6px 12px';
      row.innerHTML = `
        <span class="social-name" style="flex:1">${a.title}</span>
        <span class="social-arrow">→</span>
      `;
      container.appendChild(row);
    });
  });
  return container;
}

// ================================================================
// EASTER EGG COMMANDS
// ================================================================

export function buildSecrets() {
  return [
    { text: 'Secret Commands', cls: 'heading' },
    { text: '  Shhh... you found the cheat sheet.', cls: 'dim' },
    { text: '' },
    { text: '  Hidden Commands', cls: 'heading' },
    { html: '  <span class="cmd-name">sudo hire me</span> <span class="cmd-desc">Fake contract with progress bar</span>' },
    { html: '  <span class="cmd-name">rm -rf doubts</span> <span class="cmd-desc">Remove all your doubts</span>' },
    { html: '  <span class="cmd-name">/matrix</span> <span class="cmd-desc">Green rain mode</span>' },
    { html: '  <span class="cmd-name">/coffee</span> <span class="cmd-desc">Fuel status</span>' },
    { html: '  <span class="cmd-name">ls</span> <span class="cmd-desc">Skills as Linux files</span>' },
    { html: '  <span class="cmd-name">cat readme.md</span> <span class="cmd-desc">A hidden personal message</span>' },
    { html: '  <span class="cmd-name">ping me</span> <span class="cmd-desc">Am I available?</span>' },
    { html: '  <span class="cmd-name">git log</span> <span class="cmd-desc">Totally real commit history</span>' },
    { html: '  <span class="cmd-name">whoami</span> <span class="cmd-desc">The terminal knows you</span>' },
    { html: '  <span class="cmd-name">exit</span> <span class="cmd-desc">Try to leave. I dare you.</span>' },
    { text: '' },
    { text: '  Themes', cls: 'heading' },
    { html: '  <span class="cmd-name">/dark</span> <span class="cmd-desc">Default dark theme</span>' },
    { html: '  <span class="cmd-name">/light</span> <span class="cmd-desc">Light mode (controversial)</span>' },
    { html: '  <span class="cmd-name">/retro</span> <span class="cmd-desc">CRT phosphor mode</span>' },
    { html: '  <span class="cmd-name">/glass</span> <span class="cmd-desc">Glassmorphism mode</span>' },
    { text: '' },
    { text: '  Secrets', cls: 'heading' },
    { html: '  <span class="cmd-name">↑↑↓↓←→←→BA</span> <span class="cmd-desc">Konami code — party mode</span>' },
    { html: '  <span class="cmd-name">Idle 60s</span> <span class="cmd-desc">Terminal gets impatient</span>' },
  ];
}

// These are lazy-loaded to reduce initial bundle size
export async function buildMatrix() {
  const { buildMatrix: buildMatrixImpl } = await import('./heavy-builders.js');
  return buildMatrixImpl();
}

export async function buildCoffee() {
  const { buildCoffee: buildCoffeeImpl } = await import('./heavy-builders.js');
  return buildCoffeeImpl();
}

export function buildLs() {
  return [
    { text: 'total 42', cls: 'dim' },
    { text: 'drwxr-xr-x   skills/', cls: 'blue' },
    { text: 'drwxr-xr-x   projects/', cls: 'blue' },
    { text: 'drwxr-xr-x   experience/', cls: 'blue' },
    { text: '-rw-r--r--   react.js          [MASTERED]', cls: 'green' },
    { text: '-rw-r--r--   typescript.ts     [MASTERED]', cls: 'green' },
    { text: '-rw-r--r--   node.js           [PROFICIENT]', cls: 'accent' },
    { text: '-rw-r--r--   python.py         [PROFICIENT]', cls: 'accent' },
    { text: '-rw-r--r--   docker.sh         [LEARNING]', cls: 'yellow' },
    { text: '-rw-r--r--   readme.md         [???]', cls: 'dim' },
    { text: '' },
    { text: '  Hint: try "cat readme.md"', cls: 'dim', style: 'opacity:0.5;font-style:italic' },
  ];
}

export function buildReadme() {
  return [
    { text: '# readme.md', cls: 'accent' },
    { text: '' },
    { text: '  If you\'ve made it this far — genuinely, thank you.', cls: 'green' },
    { text: '' },
    { text: '  I built this portfolio because I believe the medium IS the message.', cls: '' },
    { text: '  A developer\'s portfolio should feel like a developer built it.', cls: '' },
    { text: '' },
    { text: '  I\'m currently:', cls: 'heading' },
    { text: '    → Building interesting things', cls: 'cyan' },
    { text: '    → Open to the right opportunity', cls: 'cyan' },
    { text: '    → Always up for a good conversation', cls: 'cyan' },
    { text: '' },
    { text: '  Feel free to /contact me. Or just say hi.', cls: 'accent' },
    { text: '' },
    { text: '  — ' + OWNER.name, cls: 'dim' },
  ];
}

export function buildWhoami() {
  return [
    { text: 'visitor', cls: 'green' },
    { text: '' },
    { text: '  uid=1000(visitor) gid=1000(curious) groups=1000(humans)', cls: 'dim' },
    { text: '' },
    { text: '  You seem to be: a developer, a designer, or a recruiter.', cls: '' },
    { text: '  Welcome. You\'re in the right place.', cls: 'accent' },
  ];
}

export function buildGitLog() {
  const commits = [
    { hash: 'a3f9c2d', msg: 'feat: add konami code easter egg', date: '2 hours ago' },
    { hash: 'b7e1a5f', msg: 'fix: stop overthinking, just ship it', date: '4 hours ago' },
    { hash: 'c2d8b3e', msg: 'refactor: renamed "bugs" to "undocumented features"', date: '1 day ago' },
    { hash: 'd9f4c1a', msg: 'chore: delete 500 lines of code (net positive)', date: '2 days ago' },
    { hash: 'e6a2b8c', msg: 'feat: portfolio v2 — terminal edition', date: '3 days ago' },
    { hash: 'f1c7d4b', msg: 'init: commit (it\'s happening)', date: '1 week ago' },
  ];
  const lines = [
    { text: 'git log --oneline --pretty', cls: 'dim' },
    { text: '' },
  ];
  commits.forEach(c => {
    lines.push({ html: `  <span style="color:var(--yellow)">${c.hash}</span> <span>${c.msg}</span> <span style="color:var(--text-muted)">(${c.date})</span>` });
  });
  lines.push({ text: '' });
  lines.push({ text: '  (HEAD -> main, origin/main)', cls: 'dim' });
  return lines;
}

export function buildPing() {
  return [
    { text: `PING ${OWNER.email} (127.0.0.1): 56 data bytes`, cls: 'dim' },
    { text: '' },
    { text: `  64 bytes from ${OWNER.email}: icmp_seq=0 ttl=64 time=0.001ms`, cls: 'green' },
    { text: `  64 bytes from ${OWNER.email}: icmp_seq=1 ttl=64 time=0.001ms`, cls: 'green' },
    { text: `  64 bytes from ${OWNER.email}: icmp_seq=2 ttl=64 time=0.001ms`, cls: 'green' },
    { text: '' },
    { text: `  ✦ Available for new opportunities`, cls: 'accent' },
    { html: `  → <a href="mailto:${OWNER.email}" style="color:var(--accent);text-decoration:underline">Send a message</a>` },
  ];
}

export const BOOT_LINES = [
  { text: 'Initializing portfolio system...', delay: 200 },
  { text: 'Bundling components...', delay: 150 },
  { text: 'Compiling TypeScript... ', delay: 200 },
  { text: '[████████████████████████] ', delay: 100, append: true },
  { text: 'done', delay: 100, cls: 'done', append: true },
  { text: '\nResolving ' + PROJECTS.length + ' projects...', delay: 150 },
  { text: 'Loading Easter eggs... ', delay: 200 },
  { text: 'ok', delay: 80, cls: 'done', append: true },
  { text: '\nAccessibility audit: passed ✓', delay: 100 },
  { text: 'TypeScript errors: 0 ✓', delay: 100 },
  { text: 'Don\'t search for /secrets here...', delay: 80, cls: 'dim' },
  { text: 'Strategic thinking: engaged', delay: 100 },
  { text: '\n✦ ', delay: 300 },
  { text: OWNER.name.toLowerCase().replace(' ', '.') + ' v' + OWNER.version, delay: 80, cls: 'accent', append: true },
  { text: ' — ready.\n', delay: 200, append: true },
  { text: 'Press Enter to continue...', delay: 100 },
];

export function buildShortcuts() {
  return [
    { text: 'Keyboard Shortcuts & Power Moves', cls: 'heading' },
    { text: '' },
    { text: 'Navigation', cls: 'heading' },
    { html: '  <span class="cmd-name">↑/↓</span> <span class="cmd-desc">Browse command history</span>' },
    { html: '  <span class="cmd-name">Tab</span> <span class="cmd-desc">Autocomplete commands</span>' },
    { html: '  <span class="cmd-name">Enter</span> <span class="cmd-desc">Execute command</span>' },
    { text: '' },
    { text: 'Editing', cls: 'heading' },
    { html: '  <span class="cmd-name">Ctrl+L</span> <span class="cmd-desc">Clear terminal</span>' },
    { html: '  <span class="cmd-name">Ctrl+R</span> <span class="cmd-desc">Search command history (coming soon)</span>' },
    { html: '  <span class="cmd-name">Ctrl+U</span> <span class="cmd-desc">Clear input line</span>' },
    { text: '' },
    { text: 'Themes', cls: 'heading' },
    { html: '  <span class="cmd-name">/dark</span> <span class="cmd-desc">Dark mode (default)</span>' },
    { html: '  <span class="cmd-name">/light</span> <span class="cmd-desc">Light mode</span>' },
    { html: '  <span class="cmd-name">/retro</span> <span class="cmd-desc">Retro CRT mode</span>' },
    { html: '  <span class="cmd-name">/glass</span> <span class="cmd-desc">Glassmorphism mode</span>' },
    { text: '' },
    { text: 'Hidden Features', cls: 'heading' },
    { html: '  <span class="cmd-name">ls</span> <span class="cmd-desc">Skills as Linux files</span>' },
    { html: '  <span class="cmd-name">whoami</span> <span class="cmd-desc">Who are you?</span>' },
    { html: '  <span class="cmd-name">ping me</span> <span class="cmd-desc">Am I available?</span>' },
    { html: '  <span class="cmd-name">/matrix</span> <span class="cmd-desc">Enter the Matrix</span>' },
    { html: '  <span class="cmd-name">/coffee</span> <span class="cmd-desc">Check fuel status</span>' },
    { html: '  <span class="cmd-name">sudo hire me</span> <span class="cmd-desc">Generate offer letter</span>' },
    { text: '' },
    { text: 'Pro Tip: Type /secrets to discover more hidden commands!', cls: 'dim', style: 'font-style:italic' },
  ];
}
