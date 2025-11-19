// Web Development Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Hub & Spokes interactivity
    const hubSection = document.querySelector('.why-choose-us-web.theme-hub');
    if (hubSection) {
        const hubItems = hubSection.querySelectorAll('.hub-item');
        const titleEl = hubSection.querySelector('.hub-title');
        const textEl = hubSection.querySelector('.hub-text');

        const setActive = (btn) => {
            hubItems.forEach(i => i.classList.remove('active'));
            btn.classList.add('active');
            const t = btn.getAttribute('data-title') || '';
            const d = btn.getAttribute('data-text') || '';
            if (titleEl) titleEl.textContent = t;
            if (textEl) textEl.textContent = d;
        };

        hubItems.forEach(btn => {
            btn.addEventListener('click', () => { setActive(btn); resetAutoplay(); });
            btn.addEventListener('mouseenter', () => {
                // light preview without changing active state permanently
                const t = btn.getAttribute('data-title');
                const d = btn.getAttribute('data-text');
                if (titleEl && t) titleEl.textContent = t;
                if (textEl && d) textEl.textContent = d;
            });
        });

        // Ensure an initial active
        const initial = hubSection.querySelector('.hub-item.active') || hubItems[0];
        if (initial) setActive(initial);

        // Autoplay: cycle active item every ~2.6s when in view
        const order = Array.from(hubItems);
        const INTERVAL_MS = 2600;
        let timer = null;

        const currentIndex = () => {
            const idx = order.findIndex(el => el.classList.contains('active'));
            return idx >= 0 ? idx : 0;
        };
        const next = () => {
            const idx = currentIndex();
            const nxt = order[(idx + 1) % order.length];
            setActive(nxt);
        };
        const startAutoplay = () => { if (!timer) timer = setInterval(next, INTERVAL_MS); };
        const stopAutoplay = () => { if (timer) { clearInterval(timer); timer = null; } };
        const resetAutoplay = () => { stopAutoplay(); startAutoplay(); };

        // Pause on hover and resume on leave
        hubSection.addEventListener('mouseenter', stopAutoplay);
        hubSection.addEventListener('mouseleave', startAutoplay);

        // Start only when section is in view
        const visObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoplay();
                } else {
                    stopAutoplay();
                }
            });
        }, { threshold: 0.3 });
        visObserver.observe(hubSection);
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 80; // Account for fixed header
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
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
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-item, .step-item, .feature-item, .portfolio-item, .pricing-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Development Process Section Animations
    const processObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    
    // Observe process elements
    document.querySelectorAll('.development-process .section-header, .process-step, .process-footer').forEach(el => {
        processObserver.observe(el);
    });

    // Integrations section scroll reveal
    const integrations = document.querySelector('.integrations');
    if (integrations) {
        const intObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    integrations.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });

        intObserver.observe(integrations);
    }

    // Counter animation for hero stats
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(progress * target);
            element.textContent = current + (target === 98 ? '%' : target === 150 ? '+' : '');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    // Trigger counter animation when hero stats come into view
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    
                    setTimeout(() => animateCounter(statNumbers[0], 150), 200);
                    setTimeout(() => animateCounter(statNumbers[1], 98), 400);
                    setTimeout(() => animateCounter(statNumbers[2], 24), 600);
                    
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(heroStats);
    }
    
    // Add hover effect to tech tags
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Portfolio item animations
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            const img = this.querySelector('img');
            
            if (overlay && img) {
                overlay.style.opacity = '1';
                img.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            const img = this.querySelector('img');
            
            if (overlay && img) {
                overlay.style.opacity = '0';
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // Add parallax effect to hero illustration
    const heroIllustration = document.querySelector('.main-illustration');
    
    if (heroIllustration) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroIllustration.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Add stagger animation to service items
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add click tracking for CTA buttons (for analytics)
    const ctaButtons = document.querySelectorAll('.btn, .pricing-btn, .view-project');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add analytics tracking here if needed
            console.log('CTA clicked:', this.textContent.trim());
        });
    });
});

// Add scroll-to-top functionality
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    
    // Show/hide scroll to top button
    let scrollTopBtn = document.getElementById('scroll-to-top');
    
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.id = 'scroll-to-top';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #2FD5C7, #14D8C8);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(47, 213, 199, 0.3);
        `;
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(scrollTopBtn);
    }
    
    if (scrollTop > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Add form validation if contact forms are present
document.addEventListener('submit', function(e) {
    const form = e.target;
    
    if (form.classList.contains('contact-form')) {
        e.preventDefault();
        
        // Basic form validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '#2FD5C7';
            }
        });
        
        if (isValid) {
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    }
});
