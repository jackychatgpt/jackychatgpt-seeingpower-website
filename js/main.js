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

  let bg = hero.querySelector('.hero-industrial-bg');
  if (!bg) {
    bg = document.createElement('div');
    bg.className = 'hero-industrial-bg';
    bg.setAttribute('aria-hidden', 'true');
    hero.insertBefore(bg, hero.firstChild);
  }
  bg.innerHTML = '<div class="light-points">' + '<span></span>'.repeat(12) + '</div>';

  const oldPulseStyle = document.querySelector('#seeingpower-pulse-streaks');
  if (oldPulseStyle) oldPulseStyle.remove();
  const pulseStyle = document.createElement('style');
  pulseStyle.id = 'seeingpower-pulse-streaks';
  pulseStyle.textContent = `
    #home.hero .hero-industrial-bg::before,#home.hero .hero-industrial-bg::after{display:none!important;content:none!important}
    #home.hero .hero-industrial-bg{position:absolute!important;inset:0!important;z-index:2!important;pointer-events:none!important;display:block!important;background:transparent!important}
    #home.hero .light-points{position:absolute!important;inset:0!important;display:block!important;pointer-events:none!important}
    #home.hero .light-points span{position:absolute!important;display:block!important;width:5px!important;height:5px!important;border-radius:50%!important;background:#ffdfad!important;box-shadow:0 0 8px #ffe8c8,0 0 18px rgba(226,150,76,.78),0 0 32px rgba(90,150,205,.22)!important;animation:spWarmBlink 2.3s ease-in-out infinite!important}
    #home.hero .light-points span:nth-child(1){top:25%!important;left:58%!important;animation-delay:.1s!important}
    #home.hero .light-points span:nth-child(2){top:33%!important;left:70%!important;animation-delay:.6s!important}
    #home.hero .light-points span:nth-child(3){top:48%!important;left:78%!important;animation-delay:1.1s!important}
    #home.hero .light-points span:nth-child(4){top:59%!important;left:67%!important;animation-delay:1.6s!important}
    #home.hero .light-points span:nth-child(5){top:66%!important;left:84%!important;animation-delay:.4s!important}
    #home.hero .light-points span:nth-child(6){top:40%!important;left:90%!important;animation-delay:1.3s!important}
    #home.hero .light-points span:nth-child(7){top:74%!important;left:55%!important;animation-delay:1.9s!important}
    #home.hero .light-points span:nth-child(n+8){display:none!important}
    @keyframes spWarmBlink{0%,100%{opacity:.22;transform:scale(.72)}50%{opacity:.92;transform:scale(1.42)}}
    @media(max-width:900px){#home.hero .light-points span{width:4px!important;height:4px!important}}
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
