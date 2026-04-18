/* ---- Parallax Hero ---- */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.getElementById('heroBg').style.transform =
    `scale(1.08) translateY(${y * 0.3}px)`;
});

/* ---- Scroll Reveal ---- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll('.reveal, .photo-card, .detail-card')
  .forEach((el) => {
    observer.observe(el);
  });

/* Stagger photo cards */
document.querySelectorAll('.photo-card').forEach((card, i) => {
  card.style.transitionDelay = i * 0.07 + 's';
});

/* ---- Lightbox ---- */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');

document.querySelectorAll('.photo-card').forEach((card) => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    if (img) {
      lbImg.src = img.src;
      lightbox.classList.add('open');
    }
  });
});

document
  .getElementById('lbClose')
  .addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('open');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.classList.remove('open');
});

/* ---- Countdown ---- */
const TARGET = new Date('2026-08-01T18:00:00').getTime();

function pad(n) {
  return String(n).padStart(2, '0');
}

const cdDays = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMins = document.getElementById('cd-mins');
const cdSecs = document.getElementById('cd-secs');
const cdDone = document.getElementById('cd-done');

let prevVals = { days: '', hours: '', mins: '', secs: '' };

function tick() {
  const now = Date.now();
  const diff = TARGET - now;

  if (diff <= 0) {
    document.getElementById('countdownGrid').style.display = 'none';
    cdDone.style.display = 'block';
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const cur = {
    days: pad(days),
    hours: pad(hours),
    mins: pad(mins),
    secs: pad(secs),
  };

  [
    ['days', cdDays],
    ['hours', cdHours],
    ['mins', cdMins],
    ['secs', cdSecs],
  ].forEach(([k, el]) => {
    if (cur[k] !== prevVals[k]) {
      el.textContent = cur[k];
      el.classList.remove('flip');
      void el.offsetWidth;
      el.classList.add('flip');
      prevVals[k] = cur[k];
    }
  });
}

tick();
setInterval(tick, 1000);
