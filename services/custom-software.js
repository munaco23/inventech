// Custom Software Solutions Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
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

    // FAQ accordion behaviour
    const faqItems = document.querySelectorAll('.software-faq .faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special animation for horizontal flow steps
                if (entry.target.classList.contains('flow-step')) {
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations (hero + sections)
    const animateElements = document.querySelectorAll(
        '.software-hero .hero-text, .software-hero .hero-illustration, .software-types .section-header, .software-types .type-card, .more-industries .section-header, .more-industries .industry-item, .software-process .flow-step, .software-technologies .cs-tech-text, .software-technologies .cs-tech-visual, .tech-category, .software-faq .faq-item'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Counter animation for statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const target = parseInt(text.replace(/\D/g, ''));
        const increment = target / 60;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }, 30);
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

    // Enhanced hover effects for type cards
    const typeCards = document.querySelectorAll('.type-card');
    
    typeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.02)';
            
            // Animate the SVG icon
            const svg = this.querySelector('.type-illustration svg');
            if (svg) {
                svg.style.transform = 'scale(1.15) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const svg = this.querySelector('.type-illustration svg');
            if (svg) {
                svg.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Industry items hover effects
    const industryItems = document.querySelectorAll('.industry-item');
    
    industryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            
            const svg = this.querySelector('.industry-icon svg');
            if (svg) {
                svg.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const svg = this.querySelector('.industry-icon svg');
            if (svg) {
                svg.style.transform = 'scale(1)';
            }
        });
    });

    // Tech tags interactive effects
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        tag.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            }, 150);
        });
    });

    // Flow timeline items staggered animation
    const timelineItems = document.querySelectorAll('.flow-step');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const step = parseInt(entry.target.dataset.step || '0', 10);
                const delay = (step - 1) * 150;

                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, delay);

                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -10% 0px' });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(60px) scale(0.96)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        timelineObserver.observe(item);
    });

    // No vertical spine progress for the new horizontal flow timeline

    // Ensure no parallax/motion on scroll for hero illustration
    const heroIllustration = document.querySelector('.software-illustration');
    if (heroIllustration) {
        heroIllustration.style.transform = 'none';
    }

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
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
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Form validation (if contact forms exist)
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
                    
                    // Add shake animation
                    field.style.animation = 'shake 0.5s ease-in-out';
                } else {
                    field.style.borderColor = '#2FD5C7';
                    field.style.boxShadow = '0 0 0 3px rgba(47, 213, 199, 0.1)';
                    field.style.animation = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Show error message
                let errorMsg = form.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.style.cssText = `
                        color: #ef4444;
                        background: rgba(239, 68, 68, 0.1);
                        padding: 1rem;
                        border-radius: 8px;
                        margin-top: 1rem;
                        text-align: center;
                        font-weight: 500;
                    `;
                    form.appendChild(errorMsg);
                }
                errorMsg.textContent = 'Please fill in all required fields.';
                
                setTimeout(() => {
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }, 5000);
            }
        });
    });

    // Add loading states for interactive elements (exclude .industry-item so it only animates on scroll)
    const interactiveElements = document.querySelectorAll('.type-card, .tech-category');
    
    interactiveElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('fade-in-up');
    });

    // Lazy loading for images (if any)
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

    // Add scroll progress indicator
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
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        animation: fade-in-up 0.6s ease forwards;
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
