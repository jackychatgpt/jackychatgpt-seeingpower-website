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
  hero.querySelectorAll('.hero-bg-svg, .hero-bg-img, .hero-video-bg, .hero-video-fallback, .hero-motion-layer, .hero-readable-layer, .hero-overlay, .hero-trails').forEach((el) => el.remove());
  if (!hero.querySelector('.hero-industrial-bg')) {
    const bg = document.createElement('div');
    bg.className = 'hero-industrial-bg';
    bg.setAttribute('aria-hidden', 'true');
    bg.innerHTML = '<div class="light-points">' + '<span></span>'.repeat(12) + '</div>';
    hero.insertBefore(bg, hero.firstChild);
  } else {
    const bg = hero.querySelector('.hero-industrial-bg');
    bg.innerHTML = '<div class="light-points">' + '<span></span>'.repeat(12) + '</div>';
  }

  const oldPulseStyle = document.querySelector('#seeingpower-pulse-streaks');
  if (oldPulseStyle) oldPulseStyle.remove();
  const pulseStyle = document.createElement('style');
  pulseStyle.id = 'seeingpower-pulse-streaks';
  pulseStyle.textContent = `
    #home.hero { position: relative !important; }
    #home.hero .hero-industrial-bg::before {
      content: "" !important;
      display: block !important;
      position: absolute !important;
      inset: 0 !important;
      z-index: 2 !important;
      pointer-events: none !important;
      opacity: .72 !important;
      background:
        linear-gradient(112deg, transparent 0%, transparent 43%, rgba(72,190,255,.55) 46%, rgba(255,255,255,.72) 47%, transparent 50%, transparent 100%),
        linear-gradient(116deg, transparent 0%, transparent 55%, rgba(255,172,58,.46) 58%, rgba(255,255,255,.55) 59%, transparent 62%, transparent 100%) !important;
      background-size: 260% 100%, 310% 100% !important;
      animation: seeingPowerStreaks 6.8s linear infinite !important;
      mix-blend-mode: screen !important;
    }
    #home.hero .hero-industrial-bg::after {
      content: "" !important;
      display: block !important;
      position: absolute !important;
      inset: 0 !important;
      z-index: 2 !important;
      pointer-events: none !important;
      opacity: .78 !important;
      background:
        radial-gradient(circle at 72% 34%, rgba(255,255,255,.95) 0 2px, transparent 7px),
        radial-gradient(circle at 83% 46%, rgba(100,210,255,.85) 0 2px, transparent 8px),
        radial-gradient(circle at 63% 62%, rgba(255,185,75,.78) 0 2px, transparent 8px),
        radial-gradient(circle at 78% 68%, rgba(255,255,255,.75) 0 2px, transparent 7px) !important;
      animation: seeingPowerBlink 2.6s ease-in-out infinite !important;
      mix-blend-mode: screen !important;
    }
    @keyframes seeingPowerStreaks {
      0% { background-position: 180% 0, 210% 0; }
      100% { background-position: -120% 0, -135% 0; }
    }
    @keyframes seeingPowerBlink {
      0%, 100% { opacity: .22; filter: blur(.4px); }
      50% { opacity: .9; filter: blur(0); }
    }
    @media (max-width: 900px) {
      #home.hero .hero-industrial-bg::before { opacity: .42 !important; }
      #home.hero .hero-industrial-bg::after { opacity: .48 !important; }
    }
  `;
  document.head.appendChild(pulseStyle);
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
