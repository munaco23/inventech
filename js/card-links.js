// Make service cards with data-href clickable without changing markup/styles
(function(){
  function handleActivate(card){
    const url = card.getAttribute('data-href');
    if (url) window.location.href = url;
  }
  function onClick(e){
    const card = e.currentTarget;
    handleActivate(card);
  }
  function onKey(e){
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleActivate(e.currentTarget);
    }
  }
  function init(){
    document.querySelectorAll('.service-card[data-href]')
      .forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', onClick);
        card.addEventListener('keydown', onKey);
      });
  }
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
