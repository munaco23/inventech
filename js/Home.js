// Hide page loader when everything is loaded
window.addEventListener('load', function() {
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        // Add fade out animation
        pageLoader.style.opacity = '0';
        // Remove from DOM after animation completes
        setTimeout(() => {
            pageLoader.style.display = 'none';
        }, 500); // Match this with your CSS transition time
    }
});

// Initialize particles
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

// Navigation Bar Image Slider with Smooth Transition
const sliderContainer = document.querySelector('.logo');
const sliderImages = document.querySelectorAll('.sliding-image');
let currentSlide = 0;

function showNextSlide() {
    const currentActive = document.querySelector('.sliding-image.active');
    if (currentActive) {
        currentActive.style.transform = 'translateX(-100%)';
        currentActive.classList.remove('active');
        
        currentSlide = (currentSlide + 1) % sliderImages.length;
        const nextSlide = sliderImages[currentSlide];
        
        nextSlide.style.transform = 'translateX(100%)';
        nextSlide.classList.add('active');
        
        // Reset position and animate in
        setTimeout(() => {
            nextSlide.style.transition = 'transform 0.5s ease-in-out';
            nextSlide.style.transform = 'translateX(0)';
            
            // Reset previous slide position
            setTimeout(() => {
                currentActive.style.transition = 'none';
                currentActive.style.transform = 'translateX(100%)';
            }, 500);
        }, 10);
    }
}

// Initialize first slide
if (sliderImages.length > 0) {
    sliderImages[0].classList.add('active');
    sliderImages[0].style.transform = 'translateX(0)';
    
    // Start slider after 2 seconds
    setTimeout(() => {
        setInterval(showNextSlide, 3000);
    }, 2000);
}

// Counter Animation
function animateCounter(counterElement, target) {
    let current = 0;
    const increment = target / 50; // Adjust speed of counting
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counterElement.textContent = Math.round(current);
    }, 20);
}

// Scroll Animation Function
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
}

// Initialize counters and scroll animations when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.counter');
            if (counter && !counter.dataset.animated) {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counter.dataset.animated = 'true';
            }
        }
    });
}, {
    threshold: 0.5
});

// Observe all counter and animated elements
document.querySelectorAll('.stat-item, .animate-on-scroll').forEach(item => {
    observer.observe(item);
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Initial check in case elements are already in view
window.addEventListener('load', () => {
    animateOnScroll();
    // Recalculate on window resize
    window.addEventListener('resize', animateOnScroll);
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

// Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotWidget = document.querySelector('.chatbot-widget');
    const chatbotTrigger = document.querySelector('.chatbot-trigger');
    const closeButton = document.querySelector('.chatbot-close');
    const sendButton = document.querySelector('.chatbot-send');
    const chatInput = document.querySelector('.chatbot-input input');
    const messagesContainer = document.querySelector('.chatbot-messages');

    // Toggle chat widget
    function toggleChat() {
        chatbotWidget.classList.toggle('active');
        if (chatbotWidget.classList.contains('active')) {
            chatInput.focus();
        }
    }

    // Add message to chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
            <div class="message-time">${timeString}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Get bot response
    function getBotResponse(userMessage) {
        const message = userMessage.toLowerCase().trim();
        
        // Common greetings
        if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
            return "Hello! I'm your website assistant. How can I help you today?";
        }
        
        // About services
        if (message.includes('service') || message.includes('what do you offer') || message.includes('what can you do')) {
            return "We offer professional web development, mobile app development, UI/UX design, and digital marketing services. You can find more details in our Services section.";
        }
        
        // Contact information
        if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('address')) {
            return "You can reach us at: \n• Email: info@yourwebsite.com \n• Phone: +1 (123) 456-7890 \n• Address: 123 Web Street, Digital City";
        }
        
        // Pricing
        if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
            return "Our pricing varies based on project requirements. Could you please share more details about your project so I can provide an accurate estimate?";
        }
        
        // Portfolio/Work
        if (message.includes('portfolio') || message.includes('work') || message.includes('projects')) {
            return "You can check out our portfolio in the 'Our Work' section to see examples of our previous projects.";
        }
        
        // Default response
        return "I'm sorry, I didn't understand that. Could you please rephrase your question? Or you can check our website for more information.";
    }

    // Handle send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message
        addMessage(message, true);
        chatInput.value = '';
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chatbot-message bot';
        typingIndicator.id = 'typing-indicator';
        typingIndicator.innerHTML = '<div class="message-content">Typing...</div>';
        messagesContainer.appendChild(typingIndicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Simulate bot thinking
        setTimeout(() => {
            // Remove typing indicator
            const indicator = document.getElementById('typing-indicator');
            if (indicator) indicator.remove();
            
            // Add bot response
            const response = getBotResponse(message);
            addMessage(response);
        }, 1000);
    }

    // Event Listeners
    chatbotTrigger.addEventListener('click', toggleChat);
    closeButton.addEventListener('click', toggleChat);
    
    sendButton.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add initial welcome message if no messages exist
    if (messagesContainer.children.length === 0) {
        setTimeout(() => {
            addMessage("Hello! I'm your website assistant. How can I help you today?");
        }, 500);
    }
});

// Expertise Section - Auto-scrolling with pause on hover
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.tech-slider');
    const slideTrack = document.querySelector('.tech-slide-track');
    const slides = document.querySelectorAll('.tech-slide');
    
    if (!slider || !slideTrack) return;
    
    // Clone slides for infinite loop effect
    const slidesArray = Array.from(slides);
    const totalSlides = slidesArray.length / 2; // Since we have duplicates
    
    // Set the width of the track based on the number of slides
    slideTrack.style.width = `calc(${totalSlides * 180}px + ${(totalSlides - 1) * 32}px)`;
    
    // Pause animation on hover
    slider.addEventListener('mouseenter', () => {
        slideTrack.style.animationPlayState = 'paused';
    });
    
    slider.addEventListener('mouseleave', () => {
        slideTrack.style.animationPlayState = 'running';
    });
    
    // Add touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    
    slider.addEventListener('touchstart', touchStart, { passive: true });
    slider.addEventListener('touchmove', touchMove, { passive: true });
    slider.addEventListener('touchend', touchEnd);
    
    function touchStart(e) {
        touchStartX = e.touches[0].clientX;
        isDragging = true;
        cancelAnimationFrame(animationID);
    }
    
    function touchMove(e) {
        if (!isDragging) return;
        touchEndX = e.touches[0].clientX;
        const diff = touchStartX - touchEndX;
        currentTranslate = prevTranslate - diff;
        slideTrack.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function touchEnd() {
        if (!isDragging) return;
        isDragging = false;
        prevTranslate = currentTranslate;
        
        // Add momentum/snap effect
        const threshold = 50;
        if (Math.abs(currentTranslate - prevTranslate) > threshold) {
            // Snap to next/prev slide
            const slideWidth = slides[0].offsetWidth + 32; // 32px gap
            const currentSlide = Math.round(currentTranslate / slideWidth);
            currentTranslate = currentSlide * slideWidth;
        }
        
        // Animate back to position
        slideTrack.style.transition = 'transform 0.5s ease-out';
        slideTrack.style.transform = `translateX(${currentTranslate}px)`;
        
        // Reset transition after animation
        setTimeout(() => {
            slideTrack.style.transition = 'none';
        }, 500);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Reset animation
        slideTrack.style.animation = 'none';
        void slideTrack.offsetHeight; // Trigger reflow
        slideTrack.style.animation = 'scroll 40s linear infinite';
    });
});