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