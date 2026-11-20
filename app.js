document.addEventListener('DOMContentLoaded', () => {
  const sections = [...document.querySelectorAll('.page-section')];
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const menu = document.querySelector('.main-nav');
  const menuToggle = document.querySelector('.menu-toggle');

  // Переключение трёх разделов по hash-ссылкам.
  function showPage() {
    const requested = (window.location.hash || '#home').slice(1);
    const page = sections.some(section => section.id === requested) ? requested : 'home';
    sections.forEach(section => section.classList.toggle('active', section.id === page));
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === '#' + page;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('hashchange', showPage);
  navLinks.forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
  menuToggle.addEventListener('click', () => {
    const opened = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(opened));
  });
  showPage();

  // Фильтр филиалов по городу.
  const cityFilter = document.querySelector('#city-filter');
  if (cityFilter) {
    cityFilter.addEventListener('change', () => {
      document.querySelectorAll('.location-card').forEach(card => {
        card.hidden = cityFilter.value !== 'all' && card.dataset.city !== cityFilter.value;
      });
    });
  }

  // Фильтр новостей по категории.
  const newsFilter = document.querySelector('#news-filter');
  if (newsFilter) {
    newsFilter.addEventListener('change', () => {
      let visible = 0;
      document.querySelectorAll('.news-card').forEach(card => {
        const show = newsFilter.value === 'all' || card.dataset.category === newsFilter.value;
        card.hidden = !show;
        if (show) visible += 1;
      });
      document.querySelector('#news-empty').hidden = visible !== 0;
    });
  }

  document.querySelector('#year').textContent = new Date().getFullYear();
});