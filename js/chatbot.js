// Knowledge Base for the Chatbot
const responses = {
    greetings: [
        "Hello! Welcome to our web development agency. How can I assist you today?",
        "Hi there! How can I help with your website needs?",
        "Welcome! What can I help you with today?"
    ],
    services: [
        "We offer web development, UI/UX design, and digital marketing services.",
        "Our services include website development, e-commerce solutions, and SEO.",
        "We specialize in creating responsive websites and web applications."
    ],
    pricing: [
        "Our pricing is based on project requirements. Let's discuss your needs!",
        "We provide custom quotes. Could you share details about your project?",
        "Prices vary by project scope. Contact us for a free consultation."
    ],
    contact: [
        "Email us at info@yourwebsite.com or call +123-456-7890.",
        "Reach us at contact@yourwebsite.com for inquiries.",
        "Call us at +123-456-7890 during business hours."
    ],
    default: [
        "I'm not sure I understand. Could you rephrase that?",
        "Could you provide more details about your question?",
        "I'm still learning! Could you ask that differently?"
    ]
};

// Get response based on user input (local fallback)
function getResponse(message) {
    const lowerMsg = message.toLowerCase();
    
    if (/(hi|hello|hey)/.test(lowerMsg)) {
        return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
    } 
    else if (/(service|what do you do|offer)/.test(lowerMsg)) {
        return responses.services[Math.floor(Math.random() * responses.services.length)];
    }
    else if (/(price|cost|how much)/.test(lowerMsg)) {
        return responses.pricing[Math.floor(Math.random() * responses.pricing.length)];
    }
    else if (/(contact|email|phone|reach)/.test(lowerMsg)) {
        return responses.contact[Math.floor(Math.random() * responses.contact.length)];
    }
    else {
        return responses.default[Math.floor(Math.random() * responses.default.length)];
    }
}

// Gemini API integration (robust)
async function generateWithGemini(promptText) {
    const apiKey = (window && window.GEMINI_API_KEY) ? window.GEMINI_API_KEY : '';
    if (!apiKey) throw new Error('Missing GEMINI API key');

    // Use API key via query param (browser-friendly)
    // Note: "-live" variants are realtime/WebSocket models and are not supported by generateContent.
    // For chat text responses, use gemini-2.0-flash here.
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + encodeURIComponent(apiKey);
    const body = {
        systemInstruction: {
            role: 'system',
            parts: [{ text: (
`You are the AI assistant for a software agency website. Stay focused on the company's services and pages.
Answer concisely, in helpful, friendly language. If a question is off-topic, politely steer back to our services.
If you are unsure or need more details, share our contact and invite the user to reach out.

Company context:
- Services: Web Development, App Development, WordPress Development, Custom Software.
- This site has pages at /services/web-development.html, /services/app-development.html, /services/wordpress.html, /services/custom-software.html.
- Contact: Email salmanshahbaz1215@gmail.com, Contact section anchor #contact on Home page.

Rules:
1) Prioritize answers related to our services, offerings, processes, tech stack, timelines, pricing guidance (no fixed quotes), and how to start a project.
2) If the user asks about unrelated topics (e.g., homework help, news, general knowledge), respond briefly and redirect to our services.
3) If you cannot confidently answer, say you’ll connect them with our team and provide: Email: salmanshahbaz1215@gmail.com and suggest visiting the Contact section (#contact).
4) Keep replies short (2-5 sentences).`
            )}]
        },
        contents: [{ role: 'user', parts: [{ text: promptText }]}],
        generationConfig: {
            temperature: 0.6,
            topK: 40,
            topP: 0.9,
            maxOutputTokens: 350
        }
    };

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        const errText = await res.text().catch(() => '');
        console.error('Gemini HTTP error', res.status, errText);
        throw new Error('Gemini request failed: ' + res.status + ' ' + errText);
    }

    const data = await res.json();
    console.debug('Gemini response', data);
    if (!data?.candidates || data.candidates.length === 0) {
        console.warn('Gemini no candidates', data);
        // Try alternative shape (some responses return plain text)
        const alt = data?.output || data?.text || '';
        if (alt) return String(alt);
        throw new Error('No candidates');
    }
    // Extract text safely from different shapes
    let text = '';
    try {
        const parts = data?.candidates?.[0]?.content?.parts;
        if (Array.isArray(parts)) {
            text = parts.map(p => p?.text || '').join('').trim();
        } else if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            text = data.candidates[0].content.parts[0].text;
        }
    } catch (e) {
        console.warn('Gemini parse warning', e);
    }
    if (!text) {
        console.warn('Gemini empty response', data);
        text = '';
    }
    return text || 'Sorry, I could not generate a reply right now.';
}

// Add message to chat
function addMessage(content, isUser = false) {
    const chatMessages = document.getElementById('chatbot-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle user input
function handleUserInput() {
    const userInput = document.getElementById('user-input');
    if (!userInput) return;
    
    const message = userInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, true);
    userInput.value = '';
    
    // Show typing indicator
    const chatMessages = document.getElementById('chatbot-messages');
    if (chatMessages) {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chatbot-message bot typing-indicator';
        typingIndicator.innerHTML = '<div class="message-content">Typing...</div>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Try Gemini first; fallback to local responses
    (async () => {
        try {
            const reply = await generateWithGemini(message);
            const typingIndicators = document.querySelectorAll('.typing-indicator');
            typingIndicators.forEach(indicator => indicator.remove());
            addMessage(reply);
        } catch (err) {
            const typingIndicators = document.querySelectorAll('.typing-indicator');
            typingIndicators.forEach(indicator => indicator.remove());
            console.error('Gemini failed', err);
            addMessage("Sorry, I couldn't generate a reply right now. Please try again.\n(" + (err && err.message ? err.message : 'Unknown error') + ")");
        }
    })();
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const chatbotWidget = document.querySelector('.chatbot-widget');
    let chatbotToggle = document.querySelector('.chatbot-toggle');
    const altToggle = document.querySelector('.chatbot-trigger');
    const chatbotClose = document.querySelector('.chatbot-close');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // Initialize chat widget
    if (chatbotWidget) {
        // Ensure hidden initially
        chatbotWidget.style.display = 'none';

        const toggle = (e) => {
            if (e) e.preventDefault();
            const isHidden = chatbotWidget.style.display === 'none' || !chatbotWidget.style.display;
            chatbotWidget.style.display = isHidden ? 'flex' : 'none';
            chatbotWidget.classList.toggle('active', isHidden);
            if (isHidden && userInput) userInput.focus();
        };

        // Ensure a floating toggle exists; if not, create one
        if (!chatbotToggle) {
            chatbotToggle = document.createElement('button');
            chatbotToggle.className = 'chatbot-toggle';
            chatbotToggle.setAttribute('aria-label', 'Open chat');
            chatbotToggle.innerHTML = '<i class="fas fa-comments"></i>';
            document.body.appendChild(chatbotToggle);
        }

        if (chatbotToggle) chatbotToggle.addEventListener('click', toggle);
        if (altToggle) altToggle.addEventListener('click', toggle);

        if (chatbotClose) {
            chatbotClose.addEventListener('click', function(e) {
                e.stopPropagation();
                chatbotWidget.style.display = 'none';
                chatbotWidget.classList.remove('active');
            });
        }
    }
    
    // Add event listeners for sending messages
    if (sendButton) {
        sendButton.addEventListener('click', handleUserInput);
    }
    
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleUserInput();
            }
        });
    }
    
    // Initial welcome message (only show if no previous messages)
    const chatMessages = document.getElementById('chatbot-messages');
    if (chatMessages && chatMessages.children.length === 0) {
        setTimeout(() => {
            addMessage(responses.greetings[0]);
        }, 1000);
    }
});
