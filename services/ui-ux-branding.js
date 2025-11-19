// UI/UX Design & Branding Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Advanced scroll animations with design-themed effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Special design-themed animations
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
                }
                if (entry.target.classList.contains('process-step')) {
                    entry.target.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll(
        '.service-card, .process-step, .tool-category, .portfolio-item, .pricing-card'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.9)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        
        // Add design-specific transforms
        if (el.classList.contains('service-card')) {
            el.style.transform = 'translateY(50px) scale(0.9) rotateX(15deg)';
        }
        if (el.classList.contains('process-step')) {
            el.style.transform = 'translateY(50px) scale(0.9) rotateY(10deg)';
        }
        
        observer.observe(el);
    });

    // Counter animation for design statistics
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

    // Enhanced hover effects for service cards with design theme
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-35px) scale(1.05) rotateX(-10deg)';
            
            // Design-themed icon animation
            const svg = this.querySelector('.service-icon svg');
            if (svg) {
                svg.style.transform = 'scale(1.3) rotate(20deg)';
                svg.style.filter = 'drop-shadow(0 20px 40px rgba(47, 213, 199, 0.5))';
            }
            
            // Add design glow effect
            this.style.boxShadow = '0 45px 100px rgba(47, 213, 199, 0.3), 0 0 0 1px rgba(47, 213, 199, 0.1)';
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

    // Process step cards with design-style 3D effects
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
        });
        
        // Add step number pulse effect
        card.addEventListener('mouseenter', function() {
            const stepNumber = this.querySelector('.step-number');
            if (stepNumber) {
                stepNumber.style.animation = 'designStepPulse 1s ease';
            }
        });
    });

    // Tool tags with design-themed wave animation
    const toolTags = document.querySelectorAll('.tool-tag');
    
    toolTags.forEach((tag, index) => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.1)';
            this.style.zIndex = '10';
            
            // Design-themed ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(47, 213, 199, 0.4);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: designRippleExpand 0.8s ease-out;
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
        
        // Design tool click effect
        tag.addEventListener('click', function() {
            this.style.transform = 'translateY(-8px) scale(0.95)';
            this.innerHTML = `<i class="fas fa-palette"></i> ${this.textContent}`;
            
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.1)';
                this.innerHTML = this.textContent.replace('🎨 ', '');
            }, 200);
        });
    });

    // Portfolio items with design showcase effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.03)';
            
            // Animate the design mockup
            const svg = this.querySelector('.design-mockup svg');
            if (svg) {
                svg.style.transform = 'scale(1.1) rotate(2deg)';
                svg.style.filter = 'drop-shadow(0 15px 35px rgba(47, 213, 199, 0.3))';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const svg = this.querySelector('.design-mockup svg');
            if (svg) {
                svg.style.transform = 'scale(1) rotate(0deg)';
                svg.style.filter = 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15))';
            }
        });
    });

    // Pricing cards with design magnetic effect
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (!this.classList.contains('featured')) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / 12;
                const deltaY = (y - centerY) / 12;
                
                this.style.transform = `translateY(-20px) translateX(${deltaX}px) translateZ(${deltaY}px) scale(1.03)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) translateX(0) translateZ(0) scale(1)';
            }
        });
    });

    // Design parallax effect for hero illustration
    let designTicking = false;
    
    function updateDesignParallax() {
        const scrolled = window.pageYOffset;
        const designIllustration = document.querySelector('.design-illustration');
        
        if (designIllustration) {
            const rate = scrolled * -0.1;
            const scale = 1 + (scrolled * 0.0001);
            designIllustration.style.transform = `translateY(${rate}px) scale(${scale})`;
        }
        
        designTicking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!designTicking) {
            requestAnimationFrame(updateDesignParallax);
            designTicking = true;
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

    // Design-themed button effects
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
                animation: designButtonRipple 0.8s ease-out;
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

    // Design color palette simulation
    const colorButtons = document.querySelectorAll('[data-design-color]');
    
    colorButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create color palette effect
            const colorPalette = document.createElement('div');
            colorPalette.innerHTML = `
                <div style="display: flex; gap: 10px; align-items: center;">
                    <div style="width: 30px; height: 30px; background: #2FD5C7; border-radius: 50%;"></div>
                    <div style="width: 30px; height: 30px; background: #14B8A6; border-radius: 50%;"></div>
                    <div style="width: 30px; height: 30px; background: #052C3F; border-radius: 50%;"></div>
                </div>
            `;
            colorPalette.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                background: white;
                padding: 15px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: designColorShow 1.5s ease-out forwards;
            `;
            
            document.body.appendChild(colorPalette);
            
            setTimeout(() => {
                colorPalette.remove();
            }, 1500);
            
            // Button feedback
            this.style.transform = 'scale(0.95)';
            this.innerHTML = '<i class="fas fa-palette"></i> Colors Applied!';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.innerHTML = '<i class="fas fa-palette"></i> Choose Colors';
            }, 2000);
        });
    });

    // Design progress bar with palette indicator
    const progressBar = document.createElement('div');
    progressBar.innerHTML = '<i class="fas fa-palette"></i>';
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

    // Design tool picker simulation
    const toolButtons = document.querySelectorAll('[data-design-tool]');
    
    toolButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Create tool picker panel
            const toolPanel = document.createElement('div');
            toolPanel.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 300px;
                height: 200px;
                background: white;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                z-index: 1000;
                padding: 20px;
                animation: designToolShow 0.3s ease;
            `;
            
            toolPanel.innerHTML = `
                <h3 style="margin: 0 0 20px 0; color: #1e293b;">Design Tools</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <button style="padding: 10px; border: 1px solid #2FD5C7; background: white; border-radius: 8px; cursor: pointer;">Figma</button>
                    <button style="padding: 10px; border: 1px solid #2FD5C7; background: white; border-radius: 8px; cursor: pointer;">Adobe XD</button>
                    <button style="padding: 10px; border: 1px solid #2FD5C7; background: white; border-radius: 8px; cursor: pointer;">Sketch</button>
                    <button style="padding: 10px; border: 1px solid #2FD5C7; background: white; border-radius: 8px; cursor: pointer;">Photoshop</button>
                </div>
                <button onclick="this.parentElement.remove()" style="margin-top: 20px; background: #2FD5C7; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; width: 100%;">Close</button>
            `;
            
            document.body.appendChild(toolPanel);
        });
    });

    // Form validation with design styling
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
                    field.style.animation = 'designFieldShake 0.5s ease-in-out';
                } else {
                    field.style.borderColor = '#2FD5C7';
                    field.style.boxShadow = '0 0 0 3px rgba(47, 213, 199, 0.1)';
                    field.style.animation = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Design-styled error message
                let errorMsg = form.querySelector('.design-error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'design-error-message';
                    errorMsg.style.cssText = `
                        color: #ef4444;
                        background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
                        padding: 1rem 1.5rem;
                        border-radius: 12px;
                        margin-top: 1rem;
                        text-align: center;
                        font-weight: 500;
                        border: 1px solid rgba(239, 68, 68, 0.2);
                        animation: designErrorSlideIn 0.3s ease;
                    `;
                    form.appendChild(errorMsg);
                }
                errorMsg.innerHTML = '<i class="fas fa-palette"></i> Please complete all design requirements.';
                
                setTimeout(() => {
                    if (errorMsg) {
                        errorMsg.style.animation = 'designErrorSlideOut 0.3s ease';
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

// Add design-themed CSS animations
const designStyle = document.createElement('style');
designStyle.textContent = `
    @keyframes designRippleExpand {
        to {
            width: 120px;
            height: 120px;
            opacity: 0;
        }
    }
    
    @keyframes designButtonRipple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes designFieldShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes designStepPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(47, 213, 199, 0.3); }
    }
    
    @keyframes designColorShow {
        0% { transform: scale(0) rotate(0deg); opacity: 0; }
        50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
        100% { transform: scale(0.8) rotate(360deg) translateY(-100px); opacity: 0; }
    }
    
    @keyframes designToolShow {
        from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
        to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    
    @keyframes designErrorSlideIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes designErrorSlideOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(designStyle);

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
