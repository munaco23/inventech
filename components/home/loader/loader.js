/**
 * Inventech Simple & Premium Splash Screen Script
 * Path: components/home/loader/loader.js
 */

(function () {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    const fill = loader.querySelector('.loader-line-fill');
    let progress = 0;
    let target = 25;
    let isLoaded = false;
    let timer = null;

    function setProgress(val) {
        progress = Math.min(Math.max(val, 0), 100);
        if (fill) fill.style.width = progress + '%';
        if (progress >= 100) {
            closeLoader();
        }
    }

    function closeLoader() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        loader.classList.add('is-loaded', 'hidden');
        document.body.classList.add('loaded');
        setTimeout(function () {
            loader.style.display = 'none';
        }, 550);
    }

    // Smooth progress simulation (completes in ~0.8s - 1.0s)
    timer = setInterval(function () {
        if (isLoaded) {
            target = 100;
        } else if (target < 90) {
            target += Math.random() * 20 + 10;
        }

        if (progress < target) {
            const step = Math.max((target - progress) * 0.35, 2);
            setProgress(progress + step);
        }
    }, 40);

    // Page loaded
    window.addEventListener('load', function () {
        isLoaded = true;
        target = 100;
    });

    // Safeguard timeout (max 1.2s)
    setTimeout(function () {
        isLoaded = true;
        target = 100;
        setProgress(100);
    }, 1200);
})();
