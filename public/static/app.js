// Frontend JavaScript للموقع Apex ReportCraft
document.addEventListener('DOMContentLoaded', function() {
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

    // Pricing toggle functionality
    const monthlyBtn = document.querySelector('.pricing-monthly');
    const yearlyBtn = document.querySelector('.pricing-yearly');
    
    if (monthlyBtn && yearlyBtn) {
        monthlyBtn.addEventListener('click', function() {
            monthlyBtn.classList.add('bg-arc-blue', 'text-white');
            monthlyBtn.classList.remove('text-arc-gray');
            yearlyBtn.classList.remove('bg-arc-blue', 'text-white');
            yearlyBtn.classList.add('text-arc-gray');
        });
        
        yearlyBtn.addEventListener('click', function() {
            yearlyBtn.classList.add('bg-arc-blue', 'text-white');
            yearlyBtn.classList.remove('text-arc-gray');
            monthlyBtn.classList.remove('bg-arc-blue', 'text-white');
            monthlyBtn.classList.add('text-arc-gray');
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Language selector functionality
    const languageSelectors = document.querySelectorAll('.language-selector');
    languageSelectors.forEach(selector => {
        selector.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.dataset.lang;
            if (lang) {
                window.location.href = `/?lang=${lang}`;
            }
        });
    });

    // Add animation on scroll for feature cards
    const observeElements = document.querySelectorAll('.feature-card, .pricing-card, .community-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, { threshold: 0.1 });

    observeElements.forEach(el => observer.observe(el));

    // Form validation for contact forms (if any)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields');
            }
        });
    });

    // Add loading states for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.href === '#') {
                e.preventDefault();
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });

    // Console welcome message
    console.log(`
    🚀 Welcome to Apex ReportCraft (ARC)!
    
    Professional reporting tool for Oracle APEX developers.
    
    Features:
    ✅ Easy to use interface
    ✅ Native APEX integration  
    ✅ Quick learning curve
    ✅ Powerful & flexible
    ✅ Secure & reliable
    
    Visit: https://github.com/apex-reportcraft
    `);
});

// Utility functions
window.ARC = {
    // Language switching
    switchLanguage: function(lang) {
        window.location.href = `/?lang=${lang}`;
    },
    
    // Get current language from URL
    getCurrentLanguage: function() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lang') || 'en';
    },
    
    // Theme management (for future dark mode)
    setTheme: function(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('arc-theme', theme);
    },
    
    getTheme: function() {
        return localStorage.getItem('arc-theme') || 'light';
    }
};

// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    const quickBtns = document.querySelectorAll('.chat-quick-btn');
    const chatIcon = document.getElementById('chat-icon');

    let isChatOpen = false;

    // Toggle chat window
    function toggleChat() {
        isChatOpen = !isChatOpen;
        if (isChatOpen) {
            chatWindow.classList.remove('scale-0', 'opacity-0');
            chatWindow.classList.add('scale-100', 'opacity-100');
            chatIcon.className = 'fas fa-times text-xl transition-transform duration-300';
            chatInput.focus();
        } else {
            chatWindow.classList.remove('scale-100', 'opacity-100');
            chatWindow.classList.add('scale-0', 'opacity-0');
            chatIcon.className = 'fas fa-comment text-xl transition-transform duration-300 group-hover:scale-110';
        }
    }

    // Get current language for responses
    function getCurrentLanguage() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lang') || 'en';
    }

    // Add message to chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        const isRTL = getCurrentLanguage() === 'ar';
        
        messageDiv.className = `flex items-start space-x-2 ${isRTL ? 'space-x-reverse' : ''} mb-4 ${isUser ? 'justify-end' : ''}`;
        
        if (isUser) {
            messageDiv.innerHTML = `
                <div class="bg-arc-blue text-white rounded-2xl rounded-br-sm p-3 shadow-sm max-w-xs">
                    <p class="text-sm">${message}</p>
                </div>
                <div class="w-8 h-8 bg-arc-orange rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user text-white text-xs"></i>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="w-8 h-8 bg-arc-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-robot text-white text-xs"></i>
                </div>
                <div class="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-xs">
                    <p class="text-sm text-gray-800">${message}</p>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get bot response
    function getBotResponse(message) {
        const lang = getCurrentLanguage();
        const lowerMessage = message.toLowerCase();
        
        // Arabic responses
        if (lang === 'ar') {
            if (lowerMessage.includes('سعر') || lowerMessage.includes('أسعار') || lowerMessage.includes('تكلفة')) {
                return 'نقدم عدة خطط تسعير مناسبة لجميع الاحتياجات:\n• المجانية: 0$ إلى الأبد\n• المحترفة: 29$ شهرياً\n• المطور: 59$ شهرياً\n• المؤسسات: 149$ شهرياً\n• العلامة البيضاء: 2,999$ سنوياً\n\nيمكنك مراجعة تفاصيل أكثر في قسم الأسعار أعلاه.';
            }
            if (lowerMessage.includes('بداية') || lowerMessage.includes('أبدأ') || lowerMessage.includes('كيف')) {
                return 'للبداية مع ARC:\n1. اشترك في الخطة المجانية\n2. حمل الأداة وثبتها في مشروع APEX\n3. اتبع الدليل المرفق\n4. ابدأ في إنشاء تقاريرك الأولى\n\nالعملية بسيطة جداً وتستغرق أقل من 10 دقائق!';
            }
            if (lowerMessage.includes('دعم') || lowerMessage.includes('مساعدة') || lowerMessage.includes('تقني')) {
                return 'نقدم دعماً تقنياً شاملاً:\n• دعم مباشر عبر الدردشة (24/7)\n• منتدى مجتمع المطورين\n• وثائق شاملة بالعربية\n• دروس فيديو تفاعلية\n• دعم عبر البريد الإلكتروني\n\nفريقنا جاهز لمساعدتك في أي وقت!';
            }
            if (lowerMessage.includes('وثائق') || lowerMessage.includes('دليل') || lowerMessage.includes('تعليم')) {
                return 'تتوفر وثائق شاملة باللغة العربية:\n• دليل التركيب والإعداد\n• أمثلة عملية متقدمة\n• شرح جميع الميزات\n• نصائح وحيل للمحترفين\n• قوالب جاهزة للاستخدام\n\nكل شيء موثق بدقة لضمان تجربة ممتازة.';
            }
            return 'شكراً لتواصلك معنا! يمكنني مساعدتك في:\n• معلومات الأسعار والخطط\n• كيفية البدء مع ARC\n• الدعم التقني\n• الوثائق والتعليم\n\nما الذي تود معرفته؟';
        }
        
        // English responses
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
            return 'We offer flexible pricing plans for every need:\n• Free: $0 forever\n• Pro: $29/month\n• Developer: $59/month\n• Enterprise: $149/month\n• White Label: $2,999/year\n\nCheck out the pricing section above for full details!';
        }
        if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('get started')) {
            return 'Getting started with ARC is easy:\n1. Sign up for a free account\n2. Download and install the plugin in your APEX project\n3. Follow the quick setup guide\n4. Start creating your first reports\n\nIt takes less than 10 minutes to get up and running!';
        }
        if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('technical')) {
            return 'We provide comprehensive support:\n• 24/7 live chat support\n• Active developer community forum\n• Complete documentation\n• Video tutorials\n• Email support\n\nOur team is ready to help you succeed!';
        }
        if (lowerMessage.includes('documentation') || lowerMessage.includes('docs') || lowerMessage.includes('tutorial')) {
            return 'Comprehensive documentation is available:\n• Installation & setup guides\n• Advanced examples & use cases\n• Complete feature reference\n• Best practices & tips\n• Ready-to-use templates\n\nEverything you need to master ARC!';
        }
        
        return 'Thank you for reaching out! I can help you with:\n• Pricing and plans information\n• Getting started with ARC\n• Technical support\n• Documentation and tutorials\n\nWhat would you like to know?';
    }

    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, true);
        chatInput.value = '';

        // Show typing indicator
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response);
        }, 1000);
    }

    // Event listeners
    if (chatToggle) {
        chatToggle.addEventListener('click', toggleChat);
    }

    if (chatClose) {
        chatClose.addEventListener('click', toggleChat);
    }

    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Quick button responses
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            addMessage(buttonText, true);
            
            setTimeout(() => {
                const response = getBotResponse(buttonText);
                addMessage(response);
            }, 1000);
        });
    });
});