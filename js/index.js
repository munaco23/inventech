// Page Loading Animation
window.addEventListener('load', function() {
    // Hide loader after page is fully loaded
    setTimeout(function() {
        document.body.classList.add('loaded');
        document.getElementById('page-loader').classList.add('hidden');
    }, 1500); // Show loader for 1.5 seconds minimum
});

// Alternative: Hide loader when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // If page loads very quickly, still show loader for minimum time
    setTimeout(function() {
        if (!document.body.classList.contains('loaded')) {
            document.body.classList.add('loaded');
            document.getElementById('page-loader').classList.add('hidden');
        }
    }, 1000);
});

// Logo Image Slider Animation
function initLogoSlider() {
    const slidingImages = document.querySelectorAll('.sliding-image');
    let currentIndex = 0;
    
    // Start with no image visible
    slidingImages.forEach(img => {
        img.classList.remove('active', 'sliding-out');
    });
    
    function showNextImage() {
        // Add active class to current image (slide in from left)
        slidingImages[currentIndex].classList.add('active');
        
        // After staying visible, slide out to left
        setTimeout(() => {
            slidingImages[currentIndex].classList.add('sliding-out');
            
            // After sliding out, prepare next image
            setTimeout(() => {
                // Remove all classes from current image
                slidingImages[currentIndex].classList.remove('active', 'sliding-out');
                
                // Move to next image
                currentIndex = (currentIndex + 1) % slidingImages.length;
                
                // Start the cycle again
                showNextImage();
            }, 800); // Wait for slide out animation
        }, 2000); // Stay visible for 2 seconds
    }
    
    // Start the animation cycle after a delay
    setTimeout(showNextImage, 1000); // Start after 1 second
}

// Initialize logo slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initLogoSlider();
});

// Particles.js Configuration
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.5,
            "random": false
        },
        "size": {
            "value": 3,
            "random": true
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        }
    },
    "retina_detect": true
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Counter animation function
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            if (target > 0) {
                animateCounter(counter, target);
                counterObserver.unobserve(counter); // Only animate once
            }
        }
    });
}, { threshold: 0.3 });

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.service-card, .section-header, .contact-content, .contact-right');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Prepare counters for animation
    document.querySelectorAll('.counter').forEach(el => {
        // Set initial state
        el.textContent = '0';
        
        // Observe for counter animation
        counterObserver.observe(el);
    });
    
    // Also observe stat-items for fade-in effect
    document.querySelectorAll('.stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Testimonial Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;

    const track = slider.querySelector('.testimonial-track');
    const slides = slider.querySelectorAll('.testimonial-slide');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.prev-arrow');
    const nextBtn = slider.querySelector('.next-arrow');
    
    let currentSlide = 0;
    let autoPlayInterval;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAutoPlay(); startAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAutoPlay(); startAutoPlay(); });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Pause auto-play on hover
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    // Start auto-play
    startAutoPlay();
}); 