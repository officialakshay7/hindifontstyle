/* shared.js — nav, hamburger, faq */
document.addEventListener('DOMContentLoaded', () => {

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
