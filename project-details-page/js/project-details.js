
document.addEventListener('DOMContentLoaded', () => {
  const bar = document.querySelector('header nav .bar');
  const menu = document.querySelector('header nav ul');
  if (bar && menu) {
    bar.addEventListener('click', e => { e.stopPropagation(); bar.classList.toggle('active'); menu.classList.toggle('active'); });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { bar.classList.remove('active'); menu.classList.remove('active'); }));
    document.addEventListener('click', e => { if (!bar.contains(e.target) && !menu.contains(e.target)) { bar.classList.remove('active'); menu.classList.remove('active'); }});
  }
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const closeBtn = lightbox?.querySelector('button');
  document.querySelectorAll('.project-gallery figure[data-image]').forEach(figure => {
    figure.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = figure.dataset.image;
      lightbox.classList.add('active');
    });
  });
  const close = () => lightbox?.classList.remove('active');
  closeBtn?.addEventListener('click', close);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});
