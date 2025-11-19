document.addEventListener('DOMContentLoaded', function () {
  function initLogoSlider() {
    const slider = document.querySelector('.logo-image-slider');
    if (!slider) return;
    const slides = Array.from(slider.querySelectorAll('.sliding-image'));
    if (!slides.length) return;

    // If there's only one slide, ensure it's visible and skip interval to avoid flicker
    if (slides.length === 1) {
      slides[0].classList.add('active');
      slides[0].classList.remove('sliding-out');
      return;
    }

    let index = slides.findIndex(s => s.classList.contains('active'));
    if (index < 0) index = 0;

    let ticking = slider.getAttribute('data-initialized');
    if (ticking) return; // prevent double init
    slider.setAttribute('data-initialized', 'true');

    const TRANSITION_MS = 800; // match CSS transition duration
    const STAGGER_MS = Math.max(TRANSITION_MS - 100, 400); // bring next in near the end of prev slide-out
    const HOLD_MS = 1400; // pause between transitions

    let animating = false;
    function cycle(){
      if (animating) return; // safety
      animating = true;
      const prev = slides[index];
      const nextIndex = (index + 1) % slides.length;
      const next = slides[nextIndex];

      // Ensure only prev is active at start
      slides.forEach(s => { if (s !== prev) s.classList.remove('active','sliding-out'); });

      // Start slide-out
      prev.classList.remove('active');
      prev.classList.add('sliding-out');

      // Bring next in near the end of the slide-out to avoid visual clash
      const inTimer = setTimeout(() => {
        next.classList.add('active');
      }, STAGGER_MS);

      // Cleanup after out completes
      const outTimer = setTimeout(() => {
        prev.classList.remove('sliding-out');
        animating = false;
        index = nextIndex;
        // schedule next cycle after a hold period
        setTimeout(cycle, HOLD_MS);
      }, TRANSITION_MS + 30);
    }

    // initial delay so first state is stable
    setTimeout(cycle, HOLD_MS);
  }

  // Try now (if header already present)
  initLogoSlider();
  // Also when header is injected dynamically
  document.addEventListener('header:loaded', initLogoSlider, { once: false });
});
