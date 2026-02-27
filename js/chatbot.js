// Knowledge Base for the Chatbot
const responses = {
    greetings: [
        "Hello! I'm the AI assistant for InvenTech. How can I help you today?",
        "Hi! How can I help with your web/app/WordPress project?",
        "Welcome to InvenTech! What would you like to know about our services?"
    ],
    services: [
        "We provide Web Development, App Development, WordPress Development, and Custom Software solutions.",
        "Our team builds modern, responsive websites, mobile apps, and business software tailored to your needs.",
        "We can help with full-stack development, APIs, dashboards, integrations, and maintenance."
    ],
    pricing: [
        "Our pricing is based on project requirements. Let's discuss your needs!",
        "We provide custom quotes. Could you share details about your project?",
        "Prices vary by project scope. Contact us for a free consultation."
    ],
    contact: [
        "You can email us at inventechworld@gmail.com or use the Contact section on this page (#contact).",
        "For a quick start, share your requirements here or reach out via email: inventechworld@gmail.com.",
        "Please visit the Contact section (#contact) to send your project details, or email us at inventechworld@gmail.com."
    ],
    default: [
        "I can help with questions about our software services (web, apps, WordPress, custom software). What are you looking to build?",
        "Please share a bit more detail about your project (type, features, timeline), and I'll guide you.",
        "I can only help with InvenTech's services and project inquiries. For anything else, please contact us at inventechworld@gmail.com."
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
    else if (/(who are you|about|company|inventech|inven\s*tech)/.test(lowerMsg)) {
        return "I'm InvenTech's AI assistant. I can help with our services, timelines, pricing guidance, and how to start your project.";
    }
    else {
        return responses.default[Math.floor(Math.random() * responses.default.length)];
    }
}

function isLikelyOffTopic(message) {
    const m = String(message || '').toLowerCase();
    return /\b(homework|assignment|solve|math|physics|chemistry|history|politics|election|celebrity|movie|song|lyrics|cricket score|news)\b/.test(m);
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
`You are the AI assistant for InvenTech (a software house). You must ONLY answer questions related to InvenTech's services and website.
Be professional, concise, and helpful.

InvenTech context:
- Services: Web Development, App Development, WordPress Development, Custom Software.
- Relevant pages: /services/web-development.html, /services/app-development.html, /services/wordpress.html, /services/custom-software.html.
- Contact: salmanshahbaz1215@gmail.com and the Contact section on the Home page (#contact).

Rules:
1) Only discuss InvenTech services, process, timelines, pricing guidance (no fixed quotes), and how to start a project.
2) If the user asks anything off-topic (general knowledge, homework, politics, etc.), refuse briefly and redirect to our services.
3) If you need more details, ask 1-2 clarifying questions (type of project, features, timeline, budget range).
4) If you cannot answer confidently, recommend contacting us at salmanshahbaz1215@gmail.com or #contact.
5) Keep replies short (2-5 sentences).`
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
        const e = new Error('Gemini request failed');
        e.status = res.status;
        e.details = errText;
        throw e;
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

function shouldFallbackToLocal(err) {
    const status = err && typeof err.status === 'number' ? err.status : undefined;
    const msg = String((err && err.message) ? err.message : '');
    const details = String((err && err.details) ? err.details : '');

    if (/Missing GEMINI API key/i.test(msg)) return true;
    if (status === 401 || status === 403) return true;
    if (status === 429) return true;
    if (/PERMISSION_DENIED/i.test(details) || /API key/i.test(details)) return true;
    if (/RESOURCE_EXHAUSTED/i.test(details) || /quota/i.test(details) || /rate limit/i.test(details)) return true;
    return false;
}

function getUserFacingGeminiError(err) {
    const status = err && typeof err.status === 'number' ? err.status : undefined;

    if (status === 401 || status === 403) {
        return 'AI assistant is temporarily unavailable. Please contact us via email for help.';
    }
    if (status === 429) {
        return 'AI assistant is busy right now (rate limit reached). Please wait a moment and try again.';
    }
    if (err && /Missing GEMINI API key/i.test(String(err.message || ''))) {
        return 'AI assistant is not configured right now. Please contact us via email for help.';
    }
    return "Sorry, I couldn't generate a reply right now. Please try again.";
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
    const sendButton = document.getElementById('send-button');
    if (handleUserInput._inFlight) return;
    
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

    if (isLikelyOffTopic(message)) {
        const typingIndicators = document.querySelectorAll('.typing-indicator');
        typingIndicators.forEach(indicator => indicator.remove());
        addMessage(getResponse(message));
        return;
    }
    
    // Try Gemini first; fallback to local responses
    (async () => {
        handleUserInput._inFlight = true;
        if (sendButton) sendButton.disabled = true;
        userInput.disabled = true;
        try {
            const reply = await generateWithGemini(message);
            const typingIndicators = document.querySelectorAll('.typing-indicator');
            typingIndicators.forEach(indicator => indicator.remove());
            addMessage(reply);
        } catch (err) {
            const typingIndicators = document.querySelectorAll('.typing-indicator');
            typingIndicators.forEach(indicator => indicator.remove());
            console.error('Gemini failed', err);
            if (shouldFallbackToLocal(err)) {
                addMessage(getResponse(message));
                return;
            }
            addMessage(getUserFacingGeminiError(err));
        } finally {
            handleUserInput._inFlight = false;
            if (sendButton) sendButton.disabled = false;
            userInput.disabled = false;
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
