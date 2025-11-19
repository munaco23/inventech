// Dynamically load the site footer into #site-footer
(function() {
  function injectFooter(html) {
    const container = document.getElementById('site-footer');
    if (!container) return;
    container.innerHTML = html;
  }

  const candidates = [
    'footer.html',
    '../footer.html',
    '../../footer.html'
  ];

  (function tryNext(i){
    if (i >= candidates.length) return console.error('Failed to load footer from all paths');
    fetch(candidates[i], { cache: 'no-cache' })
      .then(res => res.ok ? res.text() : Promise.reject())
      .then(html => injectFooter(html))
      .catch(() => tryNext(i+1));
  })(0);
})();
