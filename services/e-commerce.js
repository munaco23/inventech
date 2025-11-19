// E-commerce Development Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Advanced scroll animations with staggered effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Special animations for different card types
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
                }
                if (entry.target.classList.contains('platform-card')) {
                    entry.target.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll(
        '.feature-card, .platform-card, .step-card, .tech-category, .pricing-card'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.9)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        
        // Add special transforms for different card types
        if (el.classList.contains('feature-card')) {
            el.style.transform = 'translateY(50px) scale(0.9) rotateX(15deg)';
        }
        if (el.classList.contains('platform-card')) {
            el.style.transform = 'translateY(50px) scale(0.9) rotateY(10deg)';
        }
        
        observer.observe(el);
    });

    // Counter animation for statistics with easing
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasDollar = text.includes('$');
        const hasPercent = text.includes('%');
        
        let target = parseFloat(text.replace(/[^\d.]/g, ''));
        
        // Handle special cases
        if (hasDollar && text.includes('M')) {
            target = target; // Keep as is for $50M+
        }
        
        const increment = target / 80;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (hasDollar && text.includes('M')) {
                element.textContent = `$${displayValue}M${hasPlus ? '+' : ''}`;
            } else if (hasPercent) {
                element.textContent = `${displayValue.toFixed(1)}%`;
            } else {
                element.textContent = `${displayValue}${hasPlus ? '+' : ''}`;
            }
        }, 25);
    };

    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Enhanced hover effects for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-25px) scale(1.03) rotateX(-5deg)';
            
            // Animate the SVG icon with bounce
            const svg = this.querySelector('.feature-icon svg');
            if (svg) {
                svg.style.transform = 'scale(1.2) rotate(10deg)';
                svg.style.filter = 'drop-shadow(0 10px 20px rgba(47, 213, 199, 0.3))';
            }
            
            // Add glow effect
            this.style.boxShadow = '0 35px 80px rgba(47, 213, 199, 0.25), 0 0 0 1px rgba(47, 213, 199, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            
            const svg = this.querySelector('.feature-icon svg');
            if (svg) {
                svg.style.transform = 'scale(1) rotate(0deg)';
                svg.style.filter = 'none';
            }
            
            this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.08)';
        });
    });

    // Platform cards with 3D tilt effect
    const platformCards = document.querySelectorAll('.platform-card');
    
    platformCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // Step cards with sequential animation
    const stepCards = document.querySelectorAll('.step-card');
    
    stepCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            
            // Animate step number with pulse
            const stepNumber = this.querySelector('.step-number');
            if (stepNumber) {
                stepNumber.style.transform = 'scale(1.2)';
                stepNumber.style.boxShadow = '0 0 0 10px rgba(47, 213, 199, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const stepNumber = this.querySelector('.step-number');
            if (stepNumber) {
                stepNumber.style.transform = 'scale(1)';
                stepNumber.style.boxShadow = 'none';
            }
        });
    });

    // Tech tags with wave animation
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach((tag, index) => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.1)';
            this.style.zIndex = '10';
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: rippleExpand 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
        
        // Add click animation
        tag.addEventListener('click', function() {
            this.style.transform = 'translateY(-8px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.1)';
            }, 150);
        });
    });

    // Pricing cards with magnetic effect
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (!this.classList.contains('featured')) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / 20;
                const deltaY = (y - centerY) / 20;
                
                this.style.transform = `translateY(-20px) translateX(${deltaX}px) translateZ(${deltaY}px) scale(1.02)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) translateX(0) translateZ(0) scale(1)';
            }
        });
    });

    // Parallax effect for hero illustration
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroIllustration = document.querySelector('.ecommerce-illustration');
        
        if (heroIllustration) {
            const rate = scrolled * -0.2;
            heroIllustration.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Advanced button ripple effects
    const buttons = document.querySelectorAll('.btn, .pricing-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: buttonRipple 0.8s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });

    // Form validation with enhanced UX
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                    field.style.animation = 'fieldShake 0.5s ease-in-out';
                    
                    // Add error icon
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-icon')) {
                        const errorIcon = document.createElement('i');
                        errorIcon.className = 'fas fa-exclamation-circle error-icon';
                        errorIcon.style.cssText = `
                            position: absolute;
                            right: 10px;
                            top: 50%;
                            transform: translateY(-50%);
                            color: #ef4444;
                            animation: errorIconBounce 0.5s ease;
                        `;
                        field.parentNode.style.position = 'relative';
                        field.parentNode.appendChild(errorIcon);
                    }
                } else {
                    field.style.borderColor = '#2FD5C7';
                    field.style.boxShadow = '0 0 0 3px rgba(47, 213, 199, 0.1)';
                    field.style.animation = '';
                    
                    // Remove error icon
                    const errorIcon = field.parentNode.querySelector('.error-icon');
                    if (errorIcon) {
                        errorIcon.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Show enhanced error message
                let errorMsg = form.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.style.cssText = `
                        color: #ef4444;
                        background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
                        padding: 1rem 1.5rem;
                        border-radius: 12px;
                        margin-top: 1rem;
                        text-align: center;
                        font-weight: 500;
                        border: 1px solid rgba(239, 68, 68, 0.2);
                        animation: errorSlideIn 0.3s ease;
                    `;
                    form.appendChild(errorMsg);
                }
                errorMsg.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please fill in all required fields.';
                
                setTimeout(() => {
                    if (errorMsg) {
                        errorMsg.style.animation = 'errorSlideOut 0.3s ease';
                        setTimeout(() => errorMsg.remove(), 300);
                    }
                }, 5000);
            }
        });
    });

    // Shopping cart animation simulation
    const cartButtons = document.querySelectorAll('[data-add-to-cart]');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create floating cart icon
            const cartIcon = document.createElement('div');
            cartIcon.innerHTML = '<i class="fas fa-shopping-cart"></i>';
            cartIcon.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                color: #2FD5C7;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 1000;
                animation: cartFly 1s ease-out forwards;
            `;
            
            document.body.appendChild(cartIcon);
            
            setTimeout(() => {
                cartIcon.remove();
            }, 1000);
            
            // Button feedback
            this.style.transform = 'scale(0.95)';
            this.innerHTML = '<i class="fas fa-check"></i> Added!';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            }, 1500);
        });
    });

    // Progress bar for page scroll
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 80px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #2FD5C7, #14B8A6);
        z-index: 1000;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(47, 213, 199, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleExpand {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    @keyframes buttonRipple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes fieldShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes errorIconBounce {
        0%, 100% { transform: translateY(-50%) scale(1); }
        50% { transform: translateY(-50%) scale(1.2); }
    }
    
    @keyframes errorSlideIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes errorSlideOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
    
    @keyframes cartFly {
        0% { transform: scale(1) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
        100% { transform: scale(0.5) rotate(360deg) translateY(-100px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
