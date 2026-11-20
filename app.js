document.addEventListener('DOMContentLoaded', () => {
  const sections = [...document.querySelectorAll('.page-section')];
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const menu = document.querySelector('.main-nav');
  const menuToggle = document.querySelector('.menu-toggle');

  function showPage() {
    const hash = window.location.hash || '#home';
    const targetId = hash.slice(1);
    const target = document.getElementById(targetId);
    const requestedSection = sections.find(section => section.id === targetId);
    const nestedSection = target && target.closest('.page-section');
    const page = requestedSection ? targetId : nestedSection ? nestedSection.id : 'home';
    sections.forEach(section => section.classList.toggle('active', section.id === page));
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === '#' + page;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    if (menu) menu.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    if (target && !requestedSection) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('hashchange', showPage);
  navLinks.forEach(link => link.addEventListener('click', () => {
    if (menu) menu.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }));
  if (menuToggle && menu) menuToggle.addEventListener('click', () => {
    const opened = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(opened));
  });
  showPage();

  const cityFilter = document.querySelector('#city-filter');
  if (cityFilter) cityFilter.addEventListener('change', () => {
    document.querySelectorAll('.branch-row').forEach(card => {
      card.hidden = cityFilter.value !== 'all' && card.dataset.city !== cityFilter.value;
    });
  });

  const newsFilter = document.querySelector('#news-filter');
  if (newsFilter) newsFilter.addEventListener('change', () => {
    let visible = 0;
    document.querySelectorAll('.news-item').forEach(card => {
      const show = newsFilter.value === 'all' || card.dataset.category === newsFilter.value;
      card.hidden = !show;
      if (show) visible += 1;
    });
    const empty = document.querySelector('#news-empty');
    if (empty) empty.hidden = visible !== 0;
  });

  const images = window.SITE_IMAGES || {};
  document.querySelectorAll('[data-image]').forEach(slot => {
    const key = slot.dataset.image;
    const url = images[key];
    if (url && url.trim()) {
      slot.style.backgroundImage = 'url("' + url.replace(/"/g, '\\"') + '")';
      slot.classList.add('has-photo');
      slot.setAttribute('role', 'img');
      slot.setAttribute('aria-label', 'Иллюстрация: ' + key);
    }
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
});