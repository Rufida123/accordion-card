const faq = document.querySelector('#faq');

faq.addEventListener('click', function (event) {
  const button = event.target;
  if (!button.classList.contains('question')) return;

  const chosen = button.dataset.q;
  const alreadyOpen = button.classList.contains('active');

  faq.querySelectorAll('.question').forEach(function (btn) {
    const isActive = btn.dataset.q === chosen && !alreadyOpen;
    btn.classList.toggle('active', isActive);
  });

  faq.querySelectorAll('.answer').forEach(function (panel) {
    const isMatch = panel.dataset.answer === chosen && !alreadyOpen;
    panel.classList.toggle('open', isMatch);
  });
});