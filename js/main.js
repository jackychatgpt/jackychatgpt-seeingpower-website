const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const year = document.querySelector('[data-year]');

if (year) year.textContent = new Date().getFullYear();

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 12);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const hero = document.querySelector('#home.hero');
if (hero) {
  const oldInlineHeroStyle = document.querySelector('#force-real-photo-banner');
  if (oldInlineHeroStyle) oldInlineHeroStyle.remove();
  hero.classList.add('hero-photo');
  hero.querySelectorAll('.hero-bg-svg, .hero-bg-img, .hero-video-bg, .hero-video-fallback, .hero-motion-layer, .hero-readable-layer, .hero-overlay').forEach((el) => el.remove());
  if (!hero.querySelector('.hero-industrial-bg')) {
    const bg = document.createElement('div');
    bg.className = 'hero-industrial-bg';
    bg.setAttribute('aria-hidden', 'true');
    bg.innerHTML = '<div class="hero-trails"></div><div class="light-points">' + '<span></span>'.repeat(12) + '</div>';
    hero.insertBefore(bg, hero.firstChild);
  }
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}
