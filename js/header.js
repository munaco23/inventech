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
    // Full markup copied from header.html (with relative paths)
    const fallbackHTML = `
<!-- Site Header / Navigation -->
<style>
  /* Overlay submenu (inside full-screen menu) */
  .nav-container-menu-right ul li.has-submenu > a{ display:flex; align-items:center; gap:8px; }
  .nav-container-menu-right ul li.has-submenu > a .caret{ width:18px; height:18px; opacity:.85; transition: transform .25s ease, opacity .2s ease; vertical-align:middle; }
  .nav-container-menu-right ul li.has-submenu > a:hover .caret{ opacity:1; }
  /* closed: down chevron; open: rotate to up */
  .nav-container-menu-right ul li.open > a .caret{ transform: rotate(180deg); }

  .nav-container-menu-right ul li > .submenu{ list-style:none; margin:8px 0 0 12px; padding:0; display:grid; gap:8px; overflow:hidden; max-height:0; opacity:0; transform: translateY(-6px); transition: max-height .35s ease, opacity .25s ease, transform .25s ease; }
  .nav-container-menu-right ul li > .submenu a{ font-size:1.05rem; font-weight:600; color:#0f172a; text-decoration:none; opacity:.9; }
  .nav-container-menu-right ul li > .submenu a:hover{ color:#14b8a6; }
  .nav-container-menu-right ul li.open > .submenu{ max-height:500px; opacity:1; transform: translateY(0); }
  @media (max-width: 640px){ .nav-container-menu-right ul li > .submenu a{ font-size:1.02rem; } }

  /* basic desktop hover dropdown if header is used outside overlay */
  .nav-container .submenu{ display:none; position:absolute; background:#fff; border:1px solid rgba(2,6,23,.08); border-radius:12px; padding:10px 12px; box-shadow:0 10px 24px rgba(2,6,23,.08); max-height:initial; opacity:1; transform:none; }
  .nav-container ul li:hover > .submenu{ display:block; }
</style>
<nav>
  <div class="nav-container">
    <div class="logo">
      <img src="imgaes/logo13.png" alt="" style=" width: 90px;  height: 80px; ">
      <div class="logo-image-slider">
        <div class="sliding-image active">
          <img src="imgaes/logo09.png" alt="Image 1">
        </div>
        <div class="sliding-image">
          <img src="imgaes/logo09.png" alt="Image 1 duplicate">
        </div>
      </div>
    </div>
    <div class="menu">
      <a href="https://wa.me/923396500012" target="_blank" rel="noopener">Let's Talk</a>
      <div class="humburger">
        <div class="humburger1"></div>
        <div class="humburger2"></div>
      </div>
    </div>
  </div>
  <div class="nav-container-menu">
    <div class="nav-container-menu-uper">
      <div class="nav-container-menu-left">
        <div class="nav-container-menu-left-img">
          <img src="imgaes/LogoLight.avif" alt="Default Image" id="menu-hover-img">
        </div>
      </div>
      <div class="nav-container-menu-right">
        <ul>
          <li data-image="imgaes/home.jpg"><a href="index.html">Home</a></li>
          <li data-image="imgaes/About-header.png"><a href="about.html">About</a></li>
          <li data-image="imgaes/services.jpg" class="has-submenu">
            <a href="index.html#services">Services 
              <svg class="caret" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <ul class="submenu">
              <li><a href="services/web-development.html">Web Development</a></li>
              <li><a href="services/app-development.html">App Development</a></li>
              <li><a href="services/wordpress.html">WordPress</a></li>
              <li><a href="services/custom-software.html">Custom Software</a></li>
            </ul>
          </li>
          <li data-image="imgaes/experties.jpg"><a href="index.html#expertise">Expertise</a></li>
          <li data-image="imgaes/whychoseus.jpg"><a href="index.html#why-choose-us">Why Choose Us</a></li>
          <li data-image="imgaes/testominal.jpg"><a href="terms.html">Terms & Conditions</a></li>
          <li data-image="imgaes/contact.jpg"><a href="index.html#contact">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="nav-container-menu-lower">
      <div class="nav-container-menu-lower-getintouch">
        <div class="nav-container-menu-lower-getintouch-text">
          <p>Get in Touch</p>
        </div>
        <div class="get-in-touch-cards">
          <div class="get-in-touch-card">
            <i class="fas fa-envelope"></i>
            <span>
              <a href="mailto:salmanshahbaz1215@gmail.com">inventechworld@gmail.com</a>
            </span>
          </div>
          <div class="get-in-touch-card">
            <i class="fas fa-phone"></i>
            <span>
              <a href="tel:+923001234567">+92 3396500012</a>
            </span>
          </div>
          <div class="get-in-touch-card">
            <i class="fas fa-map-marker-alt"></i>
            <span>
              <a href="#">People colony, Gujranwala Pakistan</a>
            </span>
          </div>
        </div>
      </div>
      <div class="nav-container-menu-lower-followsus">
        <div class="nav-container-menu-lower-followsus-text">
          <p>Follow Us</p>
        </div>
        <div class="nav-container-menu-lower-followsus-icons">
          <a href="https://www.facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
          <a href="https://www.twitter.com" target="_blank"><i class="fab fa-twitter"></i></a>
          <a href="https://www.instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
          <a href="https://www.linkedin.com" target="_blank"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </div>
  </div>
</nav>
`;

    injectHeader(fallbackHTML);
  }

  // If opened directly from filesystem, fetch will be blocked. Inject fallback immediately.
  if (location.protocol === 'file:') {
    injectFallbackHeader();
    return;
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
