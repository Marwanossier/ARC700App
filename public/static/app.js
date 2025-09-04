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

    // Advanced AI-powered bot response system
    function getBotResponse(message) {
        const lang = getCurrentLanguage();
        const lowerMessage = message.toLowerCase();
        
        // Arabic responses with advanced technical support
        if (lang === 'ar') {
            // Pricing queries
            if (lowerMessage.includes('سعر') || lowerMessage.includes('أسعار') || lowerMessage.includes('تكلفة')) {
                return '💰 **خطط الأسعار الذكية لـ ARC:**\n\n🆓 **المجانية**: 0$ - مثالية للبداية!\n• 5 تقارير شهرياً\n• دعم المجتمع\n• قوالب أساسية\n\n⭐ **المحترفة**: 29$/شهر - الأكثر شيوعاً!\n• تقارير غير محدودة\n• مساعد AI متقدم\n• تصدير بجودة عالية\n\n🚀 **المطور**: 59$/شهر - للمحترفين!\n• API كاملة\n• تخصيص متقدم\n• أولوية في الدعم\n\n🏢 **المؤسسات**: 149$/شهر\n• مستخدمين غير محدودين\n• دعم 24/7\n• تدريب مخصص\n\n💡 **نصيحة**: ابدأ مجاناً واترقِ حسب احتياجاتك!';
            }
            
            // Quick start queries
            if (lowerMessage.includes('بداية') || lowerMessage.includes('أبدأ') || lowerMessage.includes('بدء سريع')) {
                return '🚀 **البدء السريع مع ARC - دليل خطوة بخطوة:**\n\n**الخطوة 1**: التسجيل (دقيقتان)\n• زيارة app.apex-reportcraft.com\n• إنشاء حساب مجاني\n• تفعيل البريد الإلكتروني\n\n**الخطوة 2**: التحميل والتثبيت (5 دقائق)\n• تحميل ARC Package\n• استيراد في APEX Workspace\n• تشغيل سكريبت الإعداد\n\n**الخطوة 3**: أول تقرير! (3 دقائق)\n• اختيار قالب\n• ربط مصدر البيانات\n• تخصيص التصميم\n• معاينة والنشر!\n\n✅ **النتيجة**: تقريرك الأول جاهز في أقل من 10 دقائق!';
            }
            
            // Technical troubleshooting
            if (lowerMessage.includes('مشكلة') || lowerMessage.includes('خطأ') || lowerMessage.includes('تقني') || lowerMessage.includes('حل المشاكل')) {
                return '🔧 **حلول المشاكل التقنية الشائعة:**\n\n**مشكلة التثبيت:**\n• تأكد من صلاحيات APEX Admin\n• تحقق من إصدار Oracle (11g+)\n• راجع ملف التسجيل للأخطاء\n\n**مشاكل الأداء:**\n• زيادة APEX Memory Pool\n• فهرسة الجداول المستخدمة\n• تحسين استعلامات SQL\n\n**مشاكل التصدير:**\n• تحقق من مساحة Temp\n• ضبط إعدادات PDF\n• فحص الخطوط المستخدمة\n\n**مشاكل العربية:**\n• ضبط Character Set: AL32UTF8\n• تفعيل RTL Support\n• اختبار الخطوط العربية\n\n🆘 **تحتاج مساعدة فورية؟** اكتب "دعم عاجل" وسأوصلك بخبير تقني!';
            }
            
            // Database integration
            if (lowerMessage.includes('قاعدة بيانات') || lowerMessage.includes('تكامل') || lowerMessage.includes('ربط')) {
                return '🗄️ **تكامل قواعد البيانات مع ARC:**\n\n**قواعد البيانات المدعومة:**\n✅ Oracle Database (الأمثل)\n✅ MySQL/MariaDB\n✅ PostgreSQL\n✅ SQL Server\n✅ REST APIs\n\n**طرق الربط:**\n1️⃣ **Native APEX**: ربط مباشر مع الجداول\n2️⃣ **Database Links**: للقواعد الخارجية\n3️⃣ **REST Data Sources**: للخدمات الخارجية\n4️⃣ **File Upload**: استيراد Excel/CSV\n\n**أفضل الممارسات:**\n• استخدام Views للأمان\n• إنشاء Indexes للسرعة\n• تطبيق Data Validation\n• النسخ الاحتياطي المنتظم\n\n🎯 **نصيحة خبير**: ابدأ بـ Native APEX للأداء الأمثل!';
            }
            
            // AI features
            if (lowerMessage.includes('ذكاء') || lowerMessage.includes('ai') || lowerMessage.includes('اصطناعي')) {
                return '🤖 **ميزات الذكاء الاصطناعي في ARC:**\n\n**المساعد الذكي للتصميم:**\n• اقتراح تخطيط مثالي للتقرير\n• اختيار الألوان المناسبة\n• تحسين ترتيب العناصر\n\n**التحليل التلقائي:**\n• اكتشاف الأنماط في البيانات\n• اقتراح المخططات المناسبة\n• تحديد البيانات الشاذة\n\n**التحسين الذكي:**\n• تحسين استعلامات SQL\n• ضغط حجم التقارير\n• تسريع وقت التحميل\n\n**الترجمة الذكية:**\n• ترجمة التقارير تلقائياً\n• تكييف التخطيط للغات RTL\n• تحسين الخطوط العربية\n\n✨ **قريباً**: مولد التقارير بالأوامر الصوتية!';
            }
            
            // Code examples and API
            if (lowerMessage.includes('كود') || lowerMessage.includes('api') || lowerMessage.includes('برمجة') || lowerMessage.includes('أمثلة')) {
                return '👨‍💻 **أمثلة الكود والAPI:**\n\n**إنشاء تقرير بـ PL/SQL:**\n```sql\nBEGIN\n  ARC_REPORTS.create_report(\n    p_name => \'تقرير المبيعات\',\n    p_query => \'SELECT * FROM sales\',\n    p_template => \'modern_arabic\'\n  );\nEND;\n```\n\n**تصدير عبر API:**\n```javascript\nfetch(\'/apex/arc/export\', {\n  method: \'POST\',\n  body: JSON.stringify({\n    reportId: 123,\n    format: \'pdf\',\n    locale: \'ar\'\n  })\n})\n```\n\n**ربط مع JavaScript:**\n```javascript\nARC.render({\n  container: \'#report\',\n  data: salesData,\n  theme: \'arabic-rtl\'\n});\n```\n\n📚 **مزيد من الأمثلة**: docs.apex-reportcraft.com/examples';
            }
            
            return '🤖 **أهلاً بك! أنا الخبير التقني الذكي لـ ARC**\n\nيمكنني مساعدتك في:\n🚀 **البدء السريع** - دليل التثبيت خطوة بخطوة\n💰 **خطط الأسعار** - اختيار الباقة المناسبة\n🔧 **حل المشاكل التقنية** - دعم فني متخصص\n🗄️ **تكامل قواعد البيانات** - ربط مصادر البيانات\n✨ **ميزات الذكاء الاصطناعي** - استخدام AI\n👨‍💻 **أمثلة الكود** - كود جاهز وAPI\n\n**اكتب سؤالك أو اختر من الأزرار أعلاه! 🎯**';
        }
        
        // English responses with advanced technical support
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
            return '💰 **Smart Pricing Plans for ARC:**\n\n🆓 **Free**: $0 - Perfect to start!\n• 5 reports/month\n• Community support\n• Basic templates\n\n⭐ **Pro**: $29/month - Most popular!\n• Unlimited reports\n• Advanced AI assistant\n• High-quality export\n\n🚀 **Developer**: $59/month - For professionals!\n• Full API access\n• Advanced customization\n• Priority support\n\n🏢 **Enterprise**: $149/month\n• Unlimited users\n• 24/7 support\n• Custom training\n\n💡 **Tip**: Start free and upgrade as needed!';
        }
        
        if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('quick start')) {
            return '🚀 **Quick Start with ARC - Step by Step:**\n\n**Step 1**: Sign Up (2 minutes)\n• Visit app.apex-reportcraft.com\n• Create free account\n• Verify email\n\n**Step 2**: Download & Install (5 minutes)\n• Download ARC Package\n• Import to APEX Workspace\n• Run setup script\n\n**Step 3**: First Report! (3 minutes)\n• Choose template\n• Connect data source\n• Customize design\n• Preview & publish!\n\n✅ **Result**: Your first report ready in under 10 minutes!';
        }
        
        if (lowerMessage.includes('troubleshoot') || lowerMessage.includes('error') || lowerMessage.includes('problem') || lowerMessage.includes('technical') || lowerMessage.includes('issue')) {
            return '🔧 **Technical Troubleshooting Guide:**\n\n**Installation Issues:**\n• Ensure APEX Admin privileges\n• Check Oracle version (11g+)\n• Review installation logs\n\n**Performance Problems:**\n• Increase APEX Memory Pool\n• Index used tables\n• Optimize SQL queries\n\n**Export Issues:**\n• Check Temp space\n• Configure PDF settings\n• Verify font availability\n\n**Arabic Issues:**\n• Set Character Set: AL32UTF8\n• Enable RTL Support\n• Test Arabic fonts\n\n🆘 **Need immediate help?** Type "urgent support" and I\'ll connect you with a technical expert!';
        }
        
        if (lowerMessage.includes('database') || lowerMessage.includes('integration') || lowerMessage.includes('connect')) {
            return '🗄️ **Database Integration with ARC:**\n\n**Supported Databases:**\n✅ Oracle Database (Optimal)\n✅ MySQL/MariaDB\n✅ PostgreSQL\n✅ SQL Server\n✅ REST APIs\n\n**Connection Methods:**\n1️⃣ **Native APEX**: Direct table connection\n2️⃣ **Database Links**: External databases\n3️⃣ **REST Data Sources**: External services\n4️⃣ **File Upload**: Excel/CSV import\n\n**Best Practices:**\n• Use Views for security\n• Create Indexes for speed\n• Apply Data Validation\n• Regular backups\n\n🎯 **Expert Tip**: Start with Native APEX for optimal performance!';
        }
        
        if (lowerMessage.includes('ai') || lowerMessage.includes('artificial') || lowerMessage.includes('intelligent')) {
            return '🤖 **AI Features in ARC:**\n\n**Smart Design Assistant:**\n• Suggest optimal report layout\n• Choose appropriate colors\n• Optimize element arrangement\n\n**Auto Analysis:**\n• Discover data patterns\n• Suggest suitable charts\n• Identify outliers\n\n**Smart Optimization:**\n• Optimize SQL queries\n• Compress report size\n• Speed up loading time\n\n**Intelligent Translation:**\n• Auto-translate reports\n• Adapt layout for RTL languages\n• Optimize Arabic fonts\n\n✨ **Coming Soon**: Voice-powered report generation!';
        }
        
        if (lowerMessage.includes('code') || lowerMessage.includes('api') || lowerMessage.includes('example') || lowerMessage.includes('programming')) {
            return '👨‍💻 **Code Examples & API:**\n\n**Create Report with PL/SQL:**\n```sql\nBEGIN\n  ARC_REPORTS.create_report(\n    p_name => \'Sales Report\',\n    p_query => \'SELECT * FROM sales\',\n    p_template => \'modern_professional\'\n  );\nEND;\n```\n\n**Export via API:**\n```javascript\nfetch(\'/apex/arc/export\', {\n  method: \'POST\',\n  body: JSON.stringify({\n    reportId: 123,\n    format: \'pdf\',\n    locale: \'en\'\n  })\n})\n```\n\n**JavaScript Integration:**\n```javascript\nARC.render({\n  container: \'#report\',\n  data: salesData,\n  theme: \'professional\'\n});\n```\n\n📚 **More Examples**: docs.apex-reportcraft.com/examples';
        }
        
        return '🤖 **Hello! I\'m ARC\'s Smart Technical Expert**\n\nI can help you with:\n🚀 **Quick Start** - Step-by-step setup guide\n💰 **Pricing Plans** - Choose the right plan\n🔧 **Technical Troubleshooting** - Expert technical support\n🗄️ **Database Integration** - Connect data sources\n✨ **AI Features** - Leverage artificial intelligence\n👨‍💻 **Code Examples** - Ready code & API\n\n**Ask your question or choose from buttons above! 🎯**';
    }

    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Track chatbot usage
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chatbot_message', {
                event_category: 'Chatbot',
                event_label: 'user_message',
                language: getCurrentLanguage()
            });
        }

        // Add user message
        addMessage(message, true);
        chatInput.value = '';

        // Show typing indicator
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response);
            
            // Track bot response
            if (typeof gtag !== 'undefined') {
                gtag('event', 'chatbot_response', {
                    event_category: 'Chatbot',
                    event_label: 'bot_response',
                    language: getCurrentLanguage()
                });
            }
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
            
            // Track quick button clicks
            if (typeof gtag !== 'undefined') {
                gtag('event', 'quick_button_click', {
                    event_category: 'Chatbot',
                    event_label: buttonText,
                    language: getCurrentLanguage()
                });
            }
            
            addMessage(buttonText, true);
            
            setTimeout(() => {
                const response = getBotResponse(buttonText);
                addMessage(response);
            }, 1000);
        });
    });

    // Track pricing plan clicks
    document.querySelectorAll('a[href*="signup?plan="], a[href*="contact/enterprise"]').forEach(link => {
        link.addEventListener('click', function() {
            const href = this.getAttribute('href');
            let plan = 'unknown';
            
            if (href.includes('plan=free')) plan = 'free';
            else if (href.includes('plan=pro')) plan = 'pro';
            else if (href.includes('plan=developer')) plan = 'developer';
            else if (href.includes('enterprise')) plan = 'enterprise';
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'pricing_click', {
                    event_category: 'Pricing',
                    event_label: plan,
                    language: getCurrentLanguage(),
                    value: plan === 'pro' ? 29 : plan === 'developer' ? 59 : plan === 'enterprise' ? 149 : 0
                });
            }
        });
    });

    // Track social media clicks
    document.querySelectorAll('a[href*="discord.gg"], a[href*="github.com"], a[href*="community"], a[href*="twitter.com"], a[href*="linkedin.com"]').forEach(link => {
        link.addEventListener('click', function() {
            const href = this.getAttribute('href');
            let platform = 'unknown';
            
            if (href.includes('discord')) platform = 'discord';
            else if (href.includes('github')) platform = 'github';
            else if (href.includes('community')) platform = 'community';
            else if (href.includes('twitter')) platform = 'twitter';
            else if (href.includes('linkedin')) platform = 'linkedin';
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    event_category: 'Social',
                    event_label: platform,
                    language: getCurrentLanguage()
                });
            }
        });
    });
});