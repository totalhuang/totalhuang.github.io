// ============================================================
// NAVBAR SCROLL EFFECT
// ============================================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============================================================
// SCROLL REVEAL (Intersection Observer)
// ============================================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
  '.reveal, .timeline-item, .news-item'
).forEach(el => revealObserver.observe(el));

// ============================================================
// MODAL
// ============================================================
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-box').focus?.();
}

function closeModal(modal) {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// News items with data-modal
document.querySelectorAll('.news-item[data-modal]').forEach(item => {
  item.addEventListener('click', (e) => {
    if (e.target.closest('.news-expand') || e.target === item || item.contains(e.target)) {
      openModal(item.dataset.modal);
    }
  });
});

// Close buttons inside modals
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.closest('.modal')));
});

// Click on overlay to close
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', () => closeModal(overlay.closest('.modal')));
});

// Esc key to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.open').forEach(m => closeModal(m));
  }
});

// ============================================================
// NEWS "SHOW MORE" (if > 6 items, hide the rest)
// ============================================================
const newsList = document.getElementById('newsList');
const btnShowMore = document.getElementById('btnShowMore');
const MAX_VISIBLE = 6;

function initNewsCollapse() {
  const items = newsList.querySelectorAll('.news-item');
  if (items.length <= MAX_VISIBLE) return;

  items.forEach((item, i) => {
    if (i >= MAX_VISIBLE) item.classList.add('news-hidden');
  });

  btnShowMore.style.display = 'block';
  btnShowMore.textContent = `Show ${items.length - MAX_VISIBLE} more`;

  btnShowMore.addEventListener('click', () => {
    newsList.querySelectorAll('.news-hidden').forEach(item => {
      item.classList.remove('news-hidden');
      revealObserver.observe(item);
    });
    btnShowMore.style.display = 'none';
  });
}

document.addEventListener('DOMContentLoaded', initNewsCollapse);

// ============================================================
// SMOOTH ANCHOR SCROLL WITH NAVBAR OFFSET
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ============================================================
// TYPING EFFECT for hero tagline
// ============================================================
const taglineEl = document.querySelector('.hero-tagline');
if (taglineEl && taglineEl.textContent.trim()) {
  const text = taglineEl.textContent.trim();
  taglineEl.textContent = '';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      taglineEl.textContent += text[i++];
      setTimeout(type, 40);
    }
  };
  setTimeout(type, 600);
}
