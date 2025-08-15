// assets/js/animations.js
// Инициализация AOS (появления при скролле)
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    window.AOS.init({
      duration: 700,
      easing: 'ease-out-quart',
      once: true,
      offset: 80,
    });
  }
});