// Dynamically load the site header into #site-header
(function() {
  function injectHeader(html) {
    const container = document.getElementById('site-header');
    if (!container) return;
    container.innerHTML = html;
    // Notify listeners that header has been injected
    document.dispatchEvent(new Event('header:loaded'));
  }

  const candidates = [
    'header.html',
    '../header.html',
    '../../header.html'
  ];

  function injectFallbackHeader() {
    const fallbackHTML = `
      <nav style="position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(0,0,0,0.1);">
        <div style="max-width: 1200px; margin: 0 auto; height: 80px; display: flex; align-items: center; justify-content: space-between; padding: 0 24px;">
          <div class="logo" style="display: flex; align-items: center;">
            <img src="/imgaes/logo13.png" alt="Logo" style="width: 90px; height: 80px;">
          </div>
          <div class="menu" style="display: flex; align-items: center; gap: 20px;">
            <a href="#contact" style="color: #0f172a; font-weight: 600; text-decoration: none;">Let's Talk</a>
            <div class="humburger" style="width: 30px; height: 20px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer;">
              <div class="humburger1" style="width: 100%; height: 2px; background-color: #0f172a; transition: all 0.3s ease;"></div>
              <div class="humburger2" style="width: 100%; height: 2px; background-color: #0f172a; transition: all 0.3s ease;"></div>
            </div>
          </div>
        </div>
        <div class="nav-container-menu" style="position: absolute; top: 80px; left: 0; width: 100%; background: white; transform: translateY(-120%); transition: transform 0.7s ease; z-index: 101; padding: 50px 0;">
          <div class="nav-container-menu-uper" style="display: flex; max-width: 1200px; margin: 0 auto; padding: 0 24px;">
            <div class="nav-container-menu-left" style="flex: 1;">
              <div class="nav-container-menu-left-img">
                <img src="/imgaes/LogoLight.avif" alt="Menu Image" id="menu-hover-img" style="width: 100%; max-width: 400px; border-radius: 10px;">
              </div>
            </div>
            <div class="nav-container-menu-right" style="flex: 1; padding-left: 40px;">
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li data-image="/imgaes/home.jpg" style="margin-bottom: 20px;"><a href="/Home.Html#home" style="color: #0f172a; font-size: 2rem; font-weight: 600; text-decoration: none;">Home</a></li>
                <li data-image="/imgaes/about.jpg" style="margin-bottom: 20px;"><a href="/about.html" style="color: #0f172a; font-size: 2rem; font-weight: 600; text-decoration: none;">About</a></li>
                <li data-image="/imgaes/services.jpg" style="margin-bottom: 20px;"><a href="/Home.Html#services" style="color: #0f172a; font-size: 2rem; font-weight: 600; text-decoration: none;">Services</a></li>
                <li data-image="/imgaes/experties.jpg" style="margin-bottom: 20px;"><a href="/Home.Html#expertise" style="color: #0f172a; font-size: 2rem; font-weight: 600; text-decoration: none;">Expertise</a></li>
                <li data-image="/imgaes/whychoseus.jpg" style="margin-bottom: 20px;"><a href="/Home.Html#why-choose-us" style="color: #0f172a; font-size: 2rem; font-weight: 600; text-decoration: none;">Why Choose Us</a></li>
                <li data-image="/imgaes/terms.jpg" style="margin-bottom: 20px;"><a href="/terms.html" style="color: #0f172a; font-size: 2rem; font-weight: 600; text-decoration: none;">Terms & Conditions</a></li>
                <li data-image="/imgaes/contact.jpg" style="margin-bottom: 20px;"><a href="/Home.Html#contact" style="color: #0f172a; font-size: 2rem; font-weight: 600; text-decoration: none;">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    `;
    
    injectHeader(fallbackHTML);
  }

  (function tryNext(i){
    if (i >= candidates.length) {
      console.warn('Failed to load header from all paths, using fallback');
      return injectFallbackHeader();
    }
    fetch(candidates[i], { cache: 'no-cache' })
      .then(res => res.ok ? res.text() : Promise.reject())
      .then(html => {
        injectHeader(html);
      })
      .catch(() => tryNext(i+1));
  })(0);
})();
