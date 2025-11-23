document.addEventListener('DOMContentLoaded', function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const fadeSelectors = [
    '.about-hero .hero-text',
    '.about-hero .hero-visual',
    '.about-highlights .highlight-card',
    '.about-stats .stat',
    '.about-story .story-text',
    '.about-story .story-points li',
    '.about-team .team-header',
    '.about-team .member-card'
  ].join(', ');

  const animatedEls = document.querySelectorAll(fadeSelectors);

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
        io.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedEls.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.98)';
    el.style.transition = `opacity 0.7s ease ${index * 0.05}s, transform 0.7s ease ${index * 0.05}s`;
    io.observe(el);
  });

  // Simple counter animation for stats numbers
  const statNumbers = document.querySelectorAll('.about-stats .num');

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const original = el.textContent.trim();
      const hasPlus = original.includes('+');
      const hasPercent = original.includes('%');
      const target = parseInt(original.replace(/\D/g, ''), 10) || 0;
      let current = 0;
      const steps = 80;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        const value = Math.floor(current);
        if (hasPercent) {
          el.textContent = `${value}%`;
        } else {
          el.textContent = `${value}${hasPlus ? '+' : ''}`;
        }
      }, 20);

      statsObserver.unobserve(el);
    });
  }, { threshold: 0.4 });

  statNumbers.forEach(num => statsObserver.observe(num));
});
