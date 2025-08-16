// assets/js/faq.js
// Аккордеон для FAQ
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const header = item.querySelector('.faq-q');
    const content = item.querySelector('.faq-a');
    if (!header || !content) return;
    header.addEventListener('click', () => {
      const expanded = item.classList.toggle('open');
      if (expanded) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
  });
});