// Ford Fach — light minimal build

document.addEventListener('DOMContentLoaded', () => {
  // Sticky navbar
  const nav = document.querySelector('.navbar');
  const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => links?.classList.toggle('open'));
  links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

  // Reveal on scroll
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // Animated counters
  const animate = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const dur = 1600; const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      el.textContent = val.toLocaleString('pl-PL') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); countObs.unobserve(e.target); } });
  }, { threshold: .5 });
  document.querySelectorAll('[data-target]').forEach(el => countObs.observe(el));

  // Contact form
  const form = document.getElementById('bookingForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = '✓ Rezerwacja wysłana!';
    btn.style.background = '#16A34A';
    setTimeout(() => { btn.textContent = original; btn.style.background = ''; form.reset(); document.querySelectorAll('.pill.on').forEach((p,i)=>{ if(i>0) p.classList.remove('on'); }); }, 3200);
  });

  // Footer year
  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
});

// Service pill selector
function pickPill(el) {
  el.parentElement.querySelectorAll('.pill').forEach(p => p.classList.remove('on'));
  el.classList.add('on');
}

// Gallery filter
function filterGallery(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.masonry-item').forEach(item => {
    item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
  });
}

// FAQ accordion
function toggleFaq(el) {
  const item = el.parentElement;
  const ans  = item.querySelector('.faq-a');
  const open = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-a').classList.remove('open'); });
  if (!open) { item.classList.add('open'); ans.classList.add('open'); }
}
