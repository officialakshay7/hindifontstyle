/* shared.js — nav, hamburger, faq */
document.addEventListener('DOMContentLoaded', () => {

  const tools = [
    ['Hindi Fancy Text', '/tools/hindi-fancy-text'],
    ['Hindi Keyboard', '/tools/hindi-keyboard'],
    ['Hindi Typing', '/tools/hindi-typing'],
    ['Hindi Voice Typing', '/tools/hindi-voice-typing'],
    ['Hindi to English', '/tools/hindi-to-english'],
    ['Hindi Text to Speech', '/tools/hindi-text-speech'],
    ['Hindi Text Image', '/tools/hindi-text-image'],
    ['Hindi Lorem Ipsum', '/tools/hindi-lorem-ipsum'],
    ['Hindi Word Counter', '/tools/hindi-word-counter'],
    ['Hindi Character Limit', '/tools/hindi-character-limit'],
    ['BGMI Name Generator', '/tools/bgmi-name-generator'],
    ['Marathi Font Generator', '/tools/marathi-font-generator']
  ];
  const converters = [
    ['Unicode Converter', '/fonts/unicode-converter'],
    ['Kruti Dev Converter', '/fonts/krutidev-converter']
  ];

  const addMenu = (nav, className, label, links, reference) => {
    const menu = document.createElement(nav.classList.contains('nav-links') ? 'li' : 'div');
    menu.className = className;
    const trigger = document.createElement('button');
    trigger.className = 'dropdown-trigger';
    trigger.type = 'button';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = `${label} <span aria-hidden="true">⏷</span>`;
    const list = document.createElement('div');
    list.className = 'dropdown-list';
    links.forEach(([linkLabel, href]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = linkLabel;
      list.appendChild(link);
    });
    menu.append(trigger, list);
    reference.after(menu);
    trigger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      trigger.setAttribute('aria-expanded', open);
    });
    return menu;
  };

  document.querySelectorAll('.nav-links, .mob-nav').forEach(nav => {
    if (nav.querySelector('.converters-menu')) return;
    const unicodeLink = [...nav.querySelectorAll('a')].find(a => a.href.includes('/fonts/unicode-converter'));
    const krutiLink = [...nav.querySelectorAll('a')].find(a => a.href.includes('/fonts/krutidev-converter'));
    if (!unicodeLink || !krutiLink) return;
    const unicodeItem = unicodeLink.closest('li, .mob-nav > a');
    const krutiItem = krutiLink.closest('li, .mob-nav > a');
    const convertersMenu = addMenu(nav, 'converters-menu', 'Converters', converters, unicodeItem);
    unicodeItem.remove();
    krutiItem.remove();
    addMenu(nav, 'tools-menu', 'Tools', tools, convertersMenu);
  });

  /* Keep every footer's Tools section complete, including compact footers. */
  const toolLinks = () => tools.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join('');
  document.querySelectorAll('footer').forEach(footer => {
    const heading = [...footer.querySelectorAll('h4')].find(h => h.textContent.trim() === 'Tools');
    if (heading) {
      const list = heading.nextElementSibling;
      if (list && list.tagName === 'UL') list.innerHTML = `<li><a href="/#generator">Font Generator</a></li><li><a href="/fonts/unicode-converter">Unicode Converter</a></li><li><a href="/fonts/krutidev-converter">Kruti Dev Converter</a></li>${toolLinks()}`;
      return;
    }
    const section = document.createElement('div');
    section.className = 'footer-tools';
    section.innerHTML = `<strong>Tools</strong><div>${toolLinks().replace(/<li>/g, '').replace(/<\/li>/g, '')}</div>`;
    footer.appendChild(section);
  });

  /* Hamburger */
  const hb = document.getElementById('hamburger');
  const mn = document.getElementById('mobNav');
  if (hb && mn) {
    hb.addEventListener('click', () => {
      const o = hb.classList.toggle('open');
      hb.setAttribute('aria-expanded', o);
      mn.style.display = o ? 'block' : 'none';
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
      const ans = btn.nextElementSibling;
      if (ans) ans.classList.toggle('show', isOpen);
    });
  });

  /* Active nav link */
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mob-nav a').forEach(a => {
    if (a.getAttribute('href') === path || (path.includes('/blog/') && a.getAttribute('href') === '/blog/')) {
      a.classList.add('active');
    }
  });

  /* Scroll-reveal (simple IntersectionObserver) */
  if ('IntersectionObserver' in window) {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }
});
