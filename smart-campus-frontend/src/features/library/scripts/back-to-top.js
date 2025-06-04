document.addEventListener('DOMContentLoaded', function() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = 'flex';
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
      setTimeout(() => {
        backToTopBtn.style.display = 'none';
      }, 300);
    }
  });
});
