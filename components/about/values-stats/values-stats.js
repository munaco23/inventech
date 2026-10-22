/**
 * Values & Stats Component Script - Lightweight Number Counter
 * Path: components/about/values-stats/values-stats.js
 */

document.addEventListener('DOMContentLoaded', function () {
    const statsSection = document.querySelector('.stats-strip');
    if (!statsSection) return;

    let animated = false;

    const countUp = (el, target, suffix = '') => {
        let current = 0;
        const duration = 1400; // ms
        const startTime = performance.now();

        const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(easeOut * target);

            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target + suffix;
            }
        };

        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                const statElements = statsSection.querySelectorAll('.stat-number');
                statElements.forEach(el => {
                    const rawText = el.textContent.trim();
                    const numMatch = rawText.match(/\d+/);
                    if (numMatch) {
                        const targetNum = parseInt(numMatch[0], 10);
                        const suffix = rawText.replace(numMatch[0], '');
                        countUp(el, targetNum, suffix);
                    }
                });
            }
        });
    }, { threshold: 0.25 });

    observer.observe(statsSection);
});
