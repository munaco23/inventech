// WordPress Development Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Advanced scroll animations with WordPress-themed effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Special WordPress-themed animations
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
                }
                if (entry.target.classList.contains('plugin-type')) {
                    entry.target.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll(
        '.service-card, .plugin-type, .theme-feature, .process-step, .tech-category, .pricing-card'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.9)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        
        // Add WordPress-specific transforms
        if (el.classList.contains('service-card')) {
            el.style.transform = 'translateY(50px) scale(0.9) rotateX(15deg)';
        }
        if (el.classList.contains('plugin-type')) {
            el.style.transform = 'translateY(50px) scale(0.9) rotateY(10deg)';
        }
        
        observer.observe(el);
    });

    // Counter animation for WordPress statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        
        let target = parseInt(text.replace(/\D/g, ''));
        const increment = target / 80;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (hasPercent) {
                element.textContent = `${displayValue}%`;
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

    // Enhanced hover effects for service cards with WordPress theme
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-30px) scale(1.05) rotateX(-8deg)';
            
            // WordPress-themed icon animation
            const svg = this.querySelector('.service-icon svg');
            if (svg) {
                svg.style.transform = 'scale(1.25) rotate(15deg)';
                svg.style.filter = 'drop-shadow(0 15px 30px rgba(47, 213, 199, 0.4))';
            }
            
            // Add WordPress glow effect
            this.style.boxShadow = '0 40px 90px rgba(47, 213, 199, 0.3), 0 0 0 1px rgba(47, 213, 199, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            
            const svg = this.querySelector('.service-icon svg');
            if (svg) {
                svg.style.transform = 'scale(1) rotate(0deg)';
                svg.style.filter = 'none';
            }
            
            this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.08)';
        });
    });

    // Plugin type cards with WordPress-style 3D effects
    const pluginTypes = document.querySelectorAll('.plugin-type');
    
    pluginTypes.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            this.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // Theme feature cards with WordPress animation
    const themeFeatures = document.querySelectorAll('.theme-feature');
    
    themeFeatures.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.05)';
            
            // Add WordPress-style pulse effect
            this.style.boxShadow = '0 25px 60px rgba(47, 213, 199, 0.2), 0 0 0 8px rgba(47, 213, 199, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.08)';
        });
    });

    // Process steps with WordPress timeline animation
    const processSteps = document.querySelectorAll('.process-step');
    
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    
                    // Animate step number with WordPress pulse
                    const stepNumber = entry.target.querySelector('.step-number');
                    if (stepNumber) {
                        stepNumber.style.animation = 'wpStepPulse 1s ease';
                    }
                }, index * 300);
                processObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(50px) scale(0.9)';
        step.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        processObserver.observe(step);
    });

    // Tech tags with WordPress-themed wave animation
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach((tag, index) => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.1)';
            this.style.zIndex = '10';
            
            // WordPress-themed ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(47, 213, 199, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: wpRippleExpand 0.8s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
        
        // WordPress click effect
        tag.addEventListener('click', function() {
            this.style.transform = 'translateY(-8px) scale(0.95)';
            this.innerHTML = `<i class="fab fa-wordpress"></i> ${this.textContent}`;
            
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.1)';
                this.innerHTML = this.textContent.replace('🔧 ', '');
            }, 200);
        });
    });

    // Pricing cards with WordPress magnetic effect
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (!this.classList.contains('featured')) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / 15;
                const deltaY = (y - centerY) / 15;
                
                this.style.transform = `translateY(-20px) translateX(${deltaX}px) translateZ(${deltaY}px) scale(1.03)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) translateX(0) translateZ(0) scale(1)';
            }
        });
    });

    // WordPress parallax effect for hero illustration
    let wpTicking = false;
    
    function updateWpParallax() {
        const scrolled = window.pageYOffset;
        const wpIllustration = document.querySelector('.wp-illustration');
        
        if (wpIllustration) {
            const rate = scrolled * -0.15;
            const scale = 1 + (scrolled * 0.0001);
            wpIllustration.style.transform = `translateY(${rate}px) scale(${scale})`;
        }
        
        wpTicking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!wpTicking) {
            requestAnimationFrame(updateWpParallax);
            wpTicking = true;
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

    // WordPress-themed button effects
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
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: wpButtonRipple 0.8s ease-out;
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

    // WordPress plugin simulation
    const pluginButtons = document.querySelectorAll('[data-wp-plugin]');
    
    pluginButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create WordPress plugin activation effect
            const wpIcon = document.createElement('div');
            wpIcon.innerHTML = '<i class="fab fa-wordpress"></i>';
            wpIcon.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                color: #2FD5C7;
                font-size: 2rem;
                pointer-events: none;
                z-index: 1000;
                animation: wpPluginActivate 1.5s ease-out forwards;
            `;
            
            document.body.appendChild(wpIcon);
            
            setTimeout(() => {
                wpIcon.remove();
            }, 1500);
            
            // Button feedback
            this.style.transform = 'scale(0.95)';
            this.innerHTML = '<i class="fas fa-check"></i> Plugin Activated!';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.innerHTML = '<i class="fab fa-wordpress"></i> Install Plugin';
            }, 2000);
        });
    });

    // WordPress progress bar with logo
    const progressBar = document.createElement('div');
    progressBar.innerHTML = '<i class="fab fa-wordpress"></i>';
    progressBar.style.cssText = `
        position: fixed;
        top: 80px;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(135deg, #2FD5C7, #14B8A6);
        z-index: 1000;
        transition: width 0.1s ease;
        box-shadow: 0 0 15px rgba(47, 213, 199, 0.6);
        display: flex;
        align-items: center;
        padding-left: 10px;
        color: white;
        font-size: 0.8rem;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // WordPress theme customizer simulation
    const customizerButtons = document.querySelectorAll('[data-wp-customize]');
    
    customizerButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Create customizer panel effect
            const panel = document.createElement('div');
            panel.style.cssText = `
                position: fixed;
                top: 80px;
                right: -300px;
                width: 280px;
                height: calc(100vh - 80px);
                background: white;
                box-shadow: -5px 0 20px rgba(0,0,0,0.1);
                z-index: 1000;
                transition: right 0.3s ease;
                padding: 20px;
                overflow-y: auto;
            `;
            
            panel.innerHTML = `
                <h3>WordPress Customizer</h3>
                <div style="margin: 20px 0;">
                    <label>Site Title</label>
                    <input type="text" style="width: 100%; padding: 8px; margin: 5px 0;">
                </div>
                <div style="margin: 20px 0;">
                    <label>Primary Color</label>
                    <input type="color" value="#2FD5C7" style="width: 100%; padding: 8px; margin: 5px 0;">
                </div>
                <button onclick="this.parentElement.remove()" style="background: #2FD5C7; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Close</button>
            `;
            
            document.body.appendChild(panel);
            
            setTimeout(() => {
                panel.style.right = '0';
            }, 100);
        });
    });

    // Form validation with WordPress styling
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
                    field.style.animation = 'wpFieldShake 0.5s ease-in-out';
                } else {
                    field.style.borderColor = '#2FD5C7';
                    field.style.boxShadow = '0 0 0 3px rgba(47, 213, 199, 0.1)';
                    field.style.animation = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // WordPress-styled error message
                let errorMsg = form.querySelector('.wp-error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'wp-error-message';
                    errorMsg.style.cssText = `
                        color: #ef4444;
                        background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
                        padding: 1rem 1.5rem;
                        border-radius: 12px;
                        margin-top: 1rem;
                        text-align: center;
                        font-weight: 500;
                        border: 1px solid rgba(239, 68, 68, 0.2);
                        animation: wpErrorSlideIn 0.3s ease;
                    `;
                    form.appendChild(errorMsg);
                }
                errorMsg.innerHTML = '<i class="fab fa-wordpress"></i> Please complete all required fields.';
                
                setTimeout(() => {
                    if (errorMsg) {
                        errorMsg.style.animation = 'wpErrorSlideOut 0.3s ease';
                        setTimeout(() => errorMsg.remove(), 300);
                    }
                }, 5000);
            }
        });
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

// Add WordPress-themed CSS animations
const wpStyle = document.createElement('style');
wpStyle.textContent = `
    @keyframes wpRippleExpand {
        to {
            width: 120px;
            height: 120px;
            opacity: 0;
        }
    }
    
    @keyframes wpButtonRipple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes wpFieldShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes wpStepPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(47, 213, 199, 0.3); }
    }
    
    @keyframes wpPluginActivate {
        0% { transform: scale(1) rotate(0deg); opacity: 1; }
        50% { transform: scale(2) rotate(180deg); opacity: 0.8; }
        100% { transform: scale(0.5) rotate(360deg) translateY(-150px); opacity: 0; }
    }
    
    @keyframes wpErrorSlideIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes wpErrorSlideOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(wpStyle);

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
