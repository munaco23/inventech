document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    const slideDuration = 5000; // 5 seconds

    // Initialize slider
    function initSlider() {
        // Show first slide
        if (slides.length > 0) {
            slides[0].classList.add('active');
            dots[0]?.classList.add('active');
        }
        
        // Start auto slide
        startAutoSlide();
        
        // Pause auto slide on hover
        const slider = document.querySelector('.testimonial-slider');
        if (slider) {
            slider.addEventListener('mouseenter', pauseAutoSlide);
            slider.addEventListener('mouseleave', startAutoSlide);
            // Pause auto slide when window loses focus
            window.addEventListener('blur', pauseAutoSlide);
            window.addEventListener('focus', startAutoSlide);
        }
    }
    
    function startAutoSlide() {
        // Clear any existing interval
        clearInterval(autoSlideInterval);
        // Start new interval
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }
    
    function pauseAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (totalSlides === 0) return;
        
        // Pause auto slide when manually changing slides
        pauseAutoSlide();
        
        // Update current slide classes with transition
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('prev');
        dots[currentSlide]?.classList.remove('active');
        
        // Update new slide index
        currentSlide = (index + totalSlides) % totalSlides;
        
        // Update slide and dot classes
        slides[currentSlide].classList.remove('next', 'prev');
        slides[currentSlide].classList.add('active');
        dots[currentSlide]?.classList.add('active');
        
        // Restart auto slide after a delay
        setTimeout(startAutoSlide, slideDuration + 1000);
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const sliderTrack = document.querySelector('.testimonial-track');
    if (sliderTrack) {
        sliderTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        sliderTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum swipe distance in pixels
        const swipeDiff = touchStartX - touchEndX;
        
        if (Math.abs(swipeDiff) > swipeThreshold) {
            if (swipeDiff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
    
    // Initialize the slider
    initSlider();
});
