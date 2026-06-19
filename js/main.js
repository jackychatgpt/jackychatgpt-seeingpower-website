const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const year = document.querySelector('[data-year]');

const heroVisibilityStyle = document.createElement('style');
heroVisibilityStyle.setAttribute('data-hero-visibility-fix', 'true');
heroVisibilityStyle.textContent = `
  .hero {
    background: #07192f !important;
  }

  .hero::before {
    inset: 0 !important;
    background-image: url('assets/images/hero-industrial-energy.svg?v=clear20260619') !important;
    background-size: cover !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
    filter: saturate(1.18) contrast(1.14) brightness(1.08) !important;
  }

  .hero-overlay {
    background: linear-gradient(90deg,
      rgba(2, 10, 28, 0.74) 0%,
      rgba(2, 15, 38, 0.56) 24%,
      rgba(2, 21, 52, 0.26) 42%,
      rgba(3, 45, 86, 0.08) 58%,
      rgba(255, 255, 255, 0) 76%) !important;
  }

  .network-pattern,
  .energy-lines {
    display: none !important;
  }

  .hero-copy {
    max-width: 660px !important;
    background: linear-gradient(90deg, rgba(1, 11, 31, 0.78), rgba(1, 18, 45, 0.54)) !important;
    border: 1px solid rgba(255, 255, 255, 0.18) !important;
    box-shadow: 0 22px 54px rgba(0, 10, 35, 0.34) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  .hero h1,
  .hero-subtitle,
  .hero-description,
  .hero-kicker {
    text-shadow: 0 4px 18px rgba(0, 0, 0, 0.78) !important;
  }

  .hero-proof {
    background: rgba(2, 14, 36, 0.44) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  @media (max-width: 1120px) {
    .hero::before {
      background-position: 58% center !important;
      filter: saturate(1.16) contrast(1.12) brightness(1.05) !important;
    }
    .hero-overlay {
      background: linear-gradient(180deg,
        rgba(2, 10, 28, 0.76) 0%,
        rgba(2, 18, 44, 0.52) 48%,
        rgba(2, 25, 58, 0.26) 100%) !important;
    }
  }

  @media (max-width: 560px) {
    .hero::before {
      background-position: 60% center !important;
    }
    .hero-copy {
      background: rgba(1, 12, 34, 0.76) !important;
    }
  }
`;
document.head.appendChild(heroVisibilityStyle);

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
