// TOCA · comportamento mínimo: mensagens pré-preenchidas no WhatsApp, topo ao rolar, revelação suave.
(function () {
  var FONE = '5541998960730';
  document.querySelectorAll('.js-wa').forEach(function (a) {
    var msg = a.getAttribute('data-msg');
    a.href = 'https://wa.me/' + FONE + (msg ? '?text=' + encodeURIComponent(msg) : '');
    a.target = '_blank';
    a.rel = 'noopener';
  });

  var ano = document.querySelector('.js-ano');
  if (ano) ano.textContent = new Date().getFullYear();

  var topo = document.getElementById('topo');
  var onScroll = function () { topo.classList.toggle('rolou', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var alvos = document.querySelectorAll('.servicos li, .linha li, .formato, .perfis__lista article, .divisao__cols');
  var io = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visivel'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  alvos.forEach(function (el, i) {
    el.classList.add('revela');
    el.style.transitionDelay = (i % 3) * 80 + 'ms';
    io.observe(el);
  });
})();
