(function () {
  function ensureStylesheet(href) {
    if (!href) return;
    const existing = document.querySelector('link[rel="stylesheet"][href="' + href + '"]');
    if (existing) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  function loadComponent(opts) {
    const mount = document.getElementById(opts.mountId);
    if (!mount) return Promise.resolve(false);

    if (opts.cssHref) ensureStylesheet(opts.cssHref);

    return fetch(opts.htmlPath)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load ' + opts.htmlPath);
        return res.text();
      })
      .then(function (html) {
        mount.innerHTML = html;

        // AOS sets [data-aos] elements to opacity:0 until it recalculates.
        // When HTML is injected after AOS.init(), we must refresh it.
        try {
          if (window.AOS) {
            if (typeof window.AOS.refreshHard === 'function') {
              requestAnimationFrame(function () {
                window.AOS.refreshHard();
              });
            } else if (typeof window.AOS.refresh === 'function') {
              requestAnimationFrame(function () {
                window.AOS.refresh();
              });
            }
          } else {
            // Fallback: make sure injected animated items are visible.
            mount.querySelectorAll('[data-aos]').forEach(function (el) {
              el.style.opacity = '1';
              el.style.transform = 'none';
            });
          }
        } catch (e) {
          // As a safe fallback, make sure items are visible.
          try {
            mount.querySelectorAll('[data-aos]').forEach(function (el) {
              el.style.opacity = '1';
              el.style.transform = 'none';
            });
          } catch (e2) { /* noop */ }
        }

        return true;
      })
      .catch(function () {
        return false;
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadComponent({
      mountId: 'why-choose-us-mount',
      htmlPath: 'components/home/whychoose-us/whychoose-us.html',
      cssHref: 'components/home/whychoose-us/whychoose-us.css'
    });
  });
})();
