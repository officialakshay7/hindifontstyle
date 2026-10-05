/* shared.js — shared navigation, footer, hamburger, and FAQ */
document.addEventListener('DOMContentLoaded', () => {
  const converters = [
    ['Unicode Converter', '/fonts/unicode-converter'],
    ['Kruti Dev Converter', '/fonts/krutidev-converter']
  ];
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
  const path = window.location.pathname;
  const isToolsPage = path.startsWith('/tools/');
  const isFontsPage = path.startsWith('/fonts/');
  const isBlogPage = path.startsWith('/blog/');

  const makeMenu = (className, label, indexHref, links, isDesktop) => {
    const menu = document.createElement(isDesktop ? 'li' : 'div');
    menu.className = className;
    const trigger = document.createElement('button');
    trigger.className = 'dropdown-trigger';
    trigger.type = 'button';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = `${label} <span aria-hidden="true">⏷</span>`;
    if ((className === 'tools-menu' && isToolsPage) || (className === 'converters-menu' && isFontsPage)) {
      trigger.classList.add('active');
    }
    const list = document.createElement('div');
    list.className = 'dropdown-list';
    [[`All ${label}`, indexHref], ...links].forEach(([linkLabel, href]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = linkLabel;
      list.appendChild(link);
    });
    menu.append(trigger, list);
    trigger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      trigger.setAttribute('aria-expanded', open);
    });
    return { menu, trigger };
  };

  const makeLinks = links => links.map(([label, href]) =>
    `<li><a href="${href}">${label}</a></li>`).join('');

  document.querySelectorAll('nav.nav').forEach(nav => {
    nav.className = 'nav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Main navigation');
    nav.innerHTML = `
      <div class="nav-inner">
        <a href="/" class="nav-logo" aria-label="HindiFontStyle Home"><span class="hi">हिंदी</span>FontStyle<span class="dot">·</span>co.in</a>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
        <ul class="nav-links" role="list">
          <li><a href="/">Home</a></li>
          <li class="converters-placeholder"></li>
          <li class="tools-placeholder"></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/pages/about-us">About</a></li>
          <li><a href="/pages/contact-us">Contact</a></li>
          <li><a href="/#generator" class="nav-cta">Generate →</a></li>
        </ul>
      </div>
      <div class="mob-nav" id="mobNav" aria-hidden="true">
        <a href="/">Home</a>
        <div class="converters-placeholder"></div>
        <div class="tools-placeholder"></div>
        <a href="/blog/">Blog</a>
        <a href="/pages/about-us">About Us</a>
        <a href="/pages/contact-us">Contact</a>
        <a href="/#generator">Generate Fonts →</a>
      </div>`;

    const desktopLinks = nav.querySelector('.nav-links');
    const mobileLinks = nav.querySelector('.mob-nav');
    [
      [desktopLinks, true, 'converters-placeholder', 'converters-menu', 'Converters', '/fonts/', converters],
      [desktopLinks, true, 'tools-placeholder', 'tools-menu', 'Tools', '/tools/', tools],
      [mobileLinks, false, 'converters-placeholder', 'converters-menu', 'Converters', '/fonts/', converters],
      [mobileLinks, false, 'tools-placeholder', 'tools-menu', 'Tools', '/tools/', tools]
    ].forEach(([parent, isDesktop, placeholderClass, menuClass, label, indexHref, links]) => {
      const placeholder = parent.querySelector(`.${placeholderClass}`);
      const { menu, trigger } = makeMenu(menuClass, label, indexHref, links, isDesktop);
      placeholder.replaceWith(menu);
      if ((menuClass === 'tools-menu' && isToolsPage) ||
          (menuClass === 'converters-menu' && isFontsPage) ||
          (label === 'Blog' && isBlogPage)) {
        trigger.classList.add('active');
      }
    });

    nav.querySelectorAll('.nav-links a, .mob-nav a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === path || (href === '/blog/' && isBlogPage)) link.classList.add('active');
    });
  });

  document.querySelectorAll('footer').forEach(footer => {
    footer.removeAttribute('style');
    footer.className = '';
    footer.setAttribute('role', 'contentinfo');
    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="footer-logo"><span>हिंदी</span>FontStyle.co.in</div>
            <p class="footer-tagline">Free Hindi font generators, converters, and online tools for Hindi and Marathi text.</p>
          </div>
          <div class="footer-col">
            <h4>Tools</h4>
            <ul>
              <li><a href="/tools/">All Tools</a></li>
              <li><a href="/#generator">Hindi Font Generator</a></li>
              ${makeLinks(tools)}
            </ul>
          </div>
          <div class="footer-col">
            <h4>Converters</h4>
            <ul>
              <li><a href="/fonts/">All Converters</a></li>
              ${makeLinks(converters)}
            </ul>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="/blog/">Blog &amp; Guides</a></li>
              <li><a href="/pages/about-us">About Us</a></li>
              <li><a href="/pages/contact-us">Contact</a></li>
              <li><a href="/pages/privacy-policy">Privacy Policy</a></li>
              <li><a href="/pages/terms-and-conditions">Terms &amp; Conditions</a></li>
              <li><a href="/pages/disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 HindiFontStyle.co.in — Free Hindi tools for everyone.</span>
          <span>Fonts open-source · OFL &amp; Apache 2.0</span>
        </div>
      </div>`;
  });

  /* Hamburger */
  const hb = document.getElementById('hamburger');
  const mn = document.getElementById('mobNav');
  if (hb && mn) {
    hb.addEventListener('click', () => {
      const o = hb.classList.toggle('open');
      hb.setAttribute('aria-expanded', o);
      mn.style.display = o ? 'block' : 'none';
      mn.setAttribute('aria-hidden', String(!o));
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

  /* Scroll-reveal (simple IntersectionObserver) */
  if ('IntersectionObserver' in window) {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }
});
