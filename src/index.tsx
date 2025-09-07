import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { getTranslation, getSupportedLanguages, type SupportedLanguage } from './translations'

const app = new Hono()

// Enable CORS for frontend-backend communication
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Language detection middleware
const getLanguage = (c: any): SupportedLanguage => {
  const urlLang = c.req.query('lang') as SupportedLanguage;
  const acceptLanguage = c.req.header('Accept-Language') || '';
  
  if (urlLang && ['ar', 'en', 'tr', 'hi', 'de', 'zh', 'es', 'it', 'ja', 'id'].includes(urlLang)) {
    return urlLang;
  }
  
  // Detect from Accept-Language header
  if (acceptLanguage.includes('ar')) return 'ar';
  if (acceptLanguage.includes('tr')) return 'tr';
  if (acceptLanguage.includes('hi')) return 'hi';
  if (acceptLanguage.includes('de')) return 'de';
  if (acceptLanguage.includes('zh')) return 'zh';
  if (acceptLanguage.includes('es')) return 'es';
  if (acceptLanguage.includes('it')) return 'it';
  if (acceptLanguage.includes('ja')) return 'ja';
  if (acceptLanguage.includes('id')) return 'id';
  
  return 'en'; // default to English
};

// API route for language switching
app.get('/api/languages', (c) => {
  return c.json(getSupportedLanguages());
});

// About page
app.get('/about', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  const languages = getSupportedLanguages();
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t.about.title} - ${t.hero.title}</title>
        
        <!-- SEO Meta Tags -->
        <meta name="description" content="${lang === 'ar' 
          ? 'تعرف على فريق Apex ReportCraft - رواد تطوير أدوات التقارير بالذكاء الاصطناعي. مهمتنا جعل Oracle APEX أكثر قوة مع دعم العربية الكامل'
          : 'Meet the Apex ReportCraft team - pioneers in AI-powered reporting tools. Our mission is making Oracle APEX more powerful with complete Arabic support'}">
        <meta name="keywords" content="${lang === 'ar'
          ? 'من نحن, فريق ARC, تاريخ الشركة, مهمة, رؤية, Oracle APEX, تقارير'
          : 'about us, ARC team, company history, mission, vision, Oracle APEX, reports'}">
        
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: '${t.about.title}',
            page_location: window.location.href,
            language: '${lang}'
          });
        </script>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #5A9BD5 0%, #EA6700 100%); }
        </style>
    </head>
    <body class="bg-gray-50 ${isRTL ? 'rtl' : ''}">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/" class="flex items-center">
                            <div class="w-10 h-10 bg-arc-blue rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                                <div class="w-6 h-6 relative">
                                    <div class="absolute w-4 h-4 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                            <span class="text-xl font-bold text-arc-gray">ARC</span>
                        </a>
                    </div>
                    
                    <div class="hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}">
                        <a href="/" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.home}</a>
                        <a href="#features" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.features}</a>
                        <a href="#pricing" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.pricing}</a>
                        <a href="/about" class="text-arc-blue font-semibold">${t.footer.company.about}</a>
                        <a href="/vision" class="text-arc-gray hover:text-arc-blue transition-colors">${lang === 'ar' ? 'رؤيتنا' : 'Vision'}</a>
                        <a href="/blog?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.footer.company.blog}</a>
                        <a href="/contact" class="text-arc-gray hover:text-arc-blue transition-colors">${t.footer.support.contact}</a>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <div class="relative group">
                            <button class="flex items-center text-arc-gray hover:text-arc-blue transition-colors">
                                <i class="fas fa-globe ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${languages.find(l => l.code === lang)?.nativeName || 'English'}
                                <i class="fas fa-chevron-down ${isRTL ? 'mr-2' : 'ml-2'} text-xs"></i>
                            </button>
                            <div class="absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                ${languages.map(l => `
                                    <a href="/about?lang=${l.code}" class="block px-4 py-2 text-sm text-arc-gray hover:bg-gray-100 hover:text-arc-blue">
                                        ${l.nativeName}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="gradient-bg text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">${t.about.title}</h1>
                <p class="text-xl text-white/90 max-w-3xl mx-auto">${t.about.subtitle}</p>
            </div>
        </section>

        <!-- Content Sections -->
        <section class="py-20">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-1 gap-12">
                    <!-- Story -->
                    <div class="bg-white rounded-xl p-8 shadow-lg">
                        <h2 class="text-3xl font-bold text-arc-gray mb-6">${t.about.story.title}</h2>
                        <p class="text-gray-600 leading-relaxed text-lg">${t.about.story.content}</p>
                    </div>
                    
                    <!-- Mission -->
                    <div class="bg-white rounded-xl p-8 shadow-lg">
                        <h2 class="text-3xl font-bold text-arc-gray mb-6">${t.about.mission.title}</h2>
                        <p class="text-gray-600 leading-relaxed text-lg">${t.about.mission.content}</p>
                    </div>
                    
                    <!-- Team -->
                    <div class="bg-white rounded-xl p-8 shadow-lg">
                        <h2 class="text-3xl font-bold text-arc-gray mb-6">${t.about.team.title}</h2>
                        <p class="text-gray-600 leading-relaxed text-lg">${t.about.team.content}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="bg-arc-blue text-white py-16">
            <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl font-bold mb-4">${lang === 'ar' ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}</h2>
                <p class="text-xl mb-8">${lang === 'ar' ? 'انضم إلى آلاف المطورين الذين يستخدمون ARC' : 'Join thousands of developers using ARC'}</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/" class="bg-white text-arc-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        ${t.hero.ctaPrimary}
                    </a>
                    <a href="/contact" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-arc-blue transition-colors">
                        ${t.footer.support.contact}
                    </a>
                </div>
            </div>
        </section>

        <script src="/static/app.js"></script>
    </body>
    </html>
  `);
});

// Vision page
app.get('/vision', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  const languages = getSupportedLanguages();
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t.vision.title} - ${t.hero.title}</title>
        
        <!-- SEO Meta Tags -->
        <meta name="description" content="${lang === 'ar'
          ? 'رؤية وقيم Apex ReportCraft - نحو مستقبل أفضل لتقارير Oracle APEX. الابتكار والجودة والدعم والمجتمع في قلب كل ما نقوم به'
          : 'Apex ReportCraft vision and values - towards a better future for Oracle APEX reporting. Innovation, quality, support, and community at the heart of everything we do'}">
        
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: '${t.vision.title}',
            page_location: window.location.href,
            language: '${lang}'
          });
        </script>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #5A9BD5 0%, #EA6700 100%); }
        </style>
    </head>
    <body class="bg-gray-50 ${isRTL ? 'rtl' : ''}">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/" class="flex items-center">
                            <div class="w-10 h-10 bg-arc-blue rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                                <div class="w-6 h-6 relative">
                                    <div class="absolute w-4 h-4 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                            <span class="text-xl font-bold text-arc-gray">ARC</span>
                        </a>
                    </div>
                    
                    <div class="hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}">
                        <a href="/" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.home}</a>
                        <a href="/#features" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.features}</a>
                        <a href="/#pricing" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.pricing}</a>
                        <a href="/about" class="text-arc-gray hover:text-arc-blue transition-colors">${t.footer.company.about}</a>
                        <a href="/vision" class="text-arc-blue font-semibold">${lang === 'ar' ? 'رؤيتنا' : 'Vision'}</a>
                        <a href="/blog?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.footer.company.blog}</a>
                        <a href="/contact" class="text-arc-gray hover:text-arc-blue transition-colors">${t.footer.support.contact}</a>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <div class="relative group">
                            <button class="flex items-center text-arc-gray hover:text-arc-blue transition-colors">
                                <i class="fas fa-globe ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${languages.find(l => l.code === lang)?.nativeName || 'English'}
                                <i class="fas fa-chevron-down ${isRTL ? 'mr-2' : 'ml-2'} text-xs"></i>
                            </button>
                            <div class="absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                ${languages.map(l => `
                                    <a href="/vision?lang=${l.code}" class="block px-4 py-2 text-sm text-arc-gray hover:bg-gray-100 hover:text-arc-blue">
                                        ${l.nativeName}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="gradient-bg text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">${t.vision.title}</h1>
                <p class="text-xl text-white/90 max-w-3xl mx-auto">${t.vision.subtitle}</p>
            </div>
        </section>

        <!-- Vision Content -->
        <section class="py-20">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Our Vision -->
                <div class="bg-white rounded-xl p-8 shadow-lg mb-12">
                    <h2 class="text-3xl font-bold text-arc-gray mb-6">${t.vision.ourVision.title}</h2>
                    <p class="text-gray-600 leading-relaxed text-lg">${t.vision.ourVision.content}</p>
                </div>
                
                <!-- Values -->
                <div class="bg-white rounded-xl p-8 shadow-lg">
                    <h2 class="text-3xl font-bold text-arc-gray mb-8">${t.vision.values.title}</h2>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="p-6 bg-arc-blue/5 rounded-lg">
                            <div class="flex items-center mb-4">
                                <i class="fas fa-lightbulb text-arc-blue text-2xl ${isRTL ? 'ml-4' : 'mr-4'}"></i>
                                <h3 class="text-xl font-semibold text-arc-gray">${lang === 'ar' ? 'الابتكار' : 'Innovation'}</h3>
                            </div>
                            <p class="text-gray-600">${t.vision.values.innovation}</p>
                        </div>
                        
                        <div class="p-6 bg-arc-orange/5 rounded-lg">
                            <div class="flex items-center mb-4">
                                <i class="fas fa-medal text-arc-orange text-2xl ${isRTL ? 'ml-4' : 'mr-4'}"></i>
                                <h3 class="text-xl font-semibold text-arc-gray">${lang === 'ar' ? 'الجودة' : 'Quality'}</h3>
                            </div>
                            <p class="text-gray-600">${t.vision.values.quality}</p>
                        </div>
                        
                        <div class="p-6 bg-arc-green/5 rounded-lg">
                            <div class="flex items-center mb-4">
                                <i class="fas fa-headset text-arc-green text-2xl ${isRTL ? 'ml-4' : 'mr-4'}"></i>
                                <h3 class="text-xl font-semibold text-arc-gray">${lang === 'ar' ? 'الدعم' : 'Support'}</h3>
                            </div>
                            <p class="text-gray-600">${t.vision.values.support}</p>
                        </div>
                        
                        <div class="p-6 bg-purple-50 rounded-lg">
                            <div class="flex items-center mb-4">
                                <i class="fas fa-users text-purple-600 text-2xl ${isRTL ? 'ml-4' : 'mr-4'}"></i>
                                <h3 class="text-xl font-semibold text-arc-gray">${lang === 'ar' ? 'المجتمع' : 'Community'}</h3>
                            </div>
                            <p class="text-gray-600">${t.vision.values.community}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="bg-arc-green text-white py-16">
            <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl font-bold mb-4">${lang === 'ar' ? 'كن جزءاً من رؤيتنا' : 'Be Part of Our Vision'}</h2>
                <p class="text-xl mb-8">${lang === 'ar' ? 'انضم إلينا في رحلة تحويل عالم التقارير' : 'Join us in transforming the world of reporting'}</p>
                <a href="/" class="bg-white text-arc-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    ${t.hero.ctaPrimary}
                </a>
            </div>
        </section>

        <script src="/static/app.js"></script>
    </body>
    </html>
  `);
});

// Signup page
app.get('/signup', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  const languages = getSupportedLanguages();
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t.signup.title} - ${t.hero.title}</title>
        
        <!-- SEO Meta Tags -->
        <meta name="description" content="${lang === 'ar'
          ? 'انشئ حسابك المجاني في ARC واكتشف قوة الذكاء الاصطناعي في تطوير تقارير Oracle APEX. دعم كامل للعربية، مساعد AI ذكي، وميزات احترافية'
          : 'Create your free ARC account and discover the power of AI in Oracle APEX report development. Complete Arabic support, smart AI assistant, and professional features'}">
        <meta name="keywords" content="${lang === 'ar'
          ? 'تسجيل, حساب مجاني, ARC, Oracle APEX, ذكاء اصطناعي, تقارير, عربي'
          : 'signup, free account, ARC, Oracle APEX, artificial intelligence, reports, registration'}">
        
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: '${t.signup.title}',
            page_location: window.location.href,
            language: '${lang}'
          });
          
          // Track form interactions
          function trackSignupProgress(step) {
            gtag('event', 'signup_progress', {
              event_category: 'Signup',
              event_label: step,
              language: '${lang}'
            });
          }
          
          function trackSocialSignup(provider) {
            gtag('event', 'social_signup', {
              event_category: 'Signup',
              event_label: provider,
              language: '${lang}'
            });
          }
        </script>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #5A9BD5 0%, #EA6700 100%); }
          .glass-effect { backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.1); }
          .float-animation { animation: float 3s ease-in-out infinite; }
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        </style>
    </head>
    <body class="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen ${isRTL ? 'rtl' : ''}">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/" class="flex items-center">
                            <div class="w-10 h-10 bg-arc-blue rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                                <div class="w-6 h-6 relative">
                                    <div class="absolute w-4 h-4 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                            <span class="text-xl font-bold text-arc-gray">ARC</span>
                        </a>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <div class="relative group">
                            <button class="flex items-center text-arc-gray hover:text-arc-blue transition-colors">
                                <i class="fas fa-globe ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${languages.find(l => l.code === lang)?.nativeName || 'English'}
                                <i class="fas fa-chevron-down ${isRTL ? 'mr-2' : 'ml-2'} text-xs"></i>
                            </button>
                            <div class="absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                ${languages.map(l => `
                                    <a href="/signup?lang=${l.code}" class="block px-4 py-2 text-sm text-arc-gray hover:bg-gray-100 hover:text-arc-blue">
                                        ${l.nativeName}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                        <a href="/?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.home}</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                
                <!-- Left Side - Benefits & Marketing -->
                <div class="order-2 lg:order-1">
                    <!-- Hero Text -->
                    <div class="mb-8">
                        <h1 class="text-4xl md:text-5xl font-bold text-arc-gray mb-4 leading-tight">${t.signup.title}</h1>
                        <p class="text-xl text-gray-600 mb-6">${t.signup.subtitle}</p>
                    </div>

                    <!-- Benefits Section -->
                    <div class="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-8">
                        <h2 class="text-2xl font-bold text-arc-gray mb-6 flex items-center">
                            <i class="fas fa-star-of-life text-arc-orange ${isRTL ? 'ml-3' : 'mr-3'}"></i>
                            ${t.signup.benefits.title}
                        </h2>
                        <div class="space-y-4">
                            ${t.signup.benefits.items.map((item, index) => `
                                <div class="flex items-start space-x-4 ${isRTL ? 'space-x-reverse' : ''} p-4 rounded-xl bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                                    <div class="w-8 h-8 bg-gradient-to-r from-arc-blue to-arc-green rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                                        <span class="text-white text-xs font-bold">${index + 1}</span>
                                    </div>
                                    <span class="text-gray-700 font-medium flex-1">${item}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Trust Indicators -->
                    <div class="flex items-center justify-center lg:justify-start space-x-8 ${isRTL ? 'space-x-reverse' : ''} text-gray-600">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-arc-blue">100K+</div>
                            <div class="text-sm">${lang === 'ar' ? 'مطور نشط' : 'Active Developers'}</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-arc-green">4.9★</div>
                            <div class="text-sm">${lang === 'ar' ? 'تقييم المستخدمين' : 'User Rating'}</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-arc-orange">24/7</div>
                            <div class="text-sm">${lang === 'ar' ? 'دعم فني' : 'Support'}</div>
                        </div>
                    </div>
                </div>

                <!-- Right Side - Signup Form -->
                <div class="order-1 lg:order-2">
                    <div class="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                        
                        <!-- Social Signup Section -->
                        <div class="p-8 bg-gradient-to-br from-blue-50 to-orange-50 border-b border-gray-100">
                            <h3 class="text-lg font-semibold text-arc-gray mb-4 text-center">${t.signup.social.title}</h3>
                            <div class="space-y-3">
                                <button onclick="trackSocialSignup('google')" class="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group">
                                    <svg class="w-5 h-5 ${isRTL ? 'ml-3' : 'mr-3'}" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <span class="text-gray-700 font-medium">${t.signup.social.google}</span>
                                </button>
                                
                                <div class="grid grid-cols-2 gap-3">
                                    <button onclick="trackSocialSignup('github')" class="flex items-center justify-center px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                                        <i class="fab fa-github ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                        <span class="text-sm font-medium">${t.signup.social.github}</span>
                                    </button>
                                    <button onclick="trackSocialSignup('microsoft')" class="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        <i class="fab fa-microsoft ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                        <span class="text-sm font-medium">${t.signup.social.microsoft}</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="relative my-6">
                                <div class="absolute inset-0 flex items-center">
                                    <div class="w-full border-t border-gray-300"></div>
                                </div>
                                <div class="relative flex justify-center text-sm">
                                    <span class="px-4 bg-blue-50 text-gray-500">${lang === 'ar' ? 'أو' : 'OR'}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Email Signup Form -->
                        <div class="p-8">
                            <form class="space-y-6" onsubmit="trackSignupProgress('form_submit'); return false;">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">${t.signup.form.firstName}</label>
                                        <input type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arc-blue focus:border-arc-blue transition-colors" placeholder="${lang === 'ar' ? 'أحمد' : 'John'}">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">${t.signup.form.lastName}</label>
                                        <input type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arc-blue focus:border-arc-blue transition-colors" placeholder="${lang === 'ar' ? 'محمد' : 'Doe'}">
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">${t.signup.form.email}</label>
                                    <input type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arc-blue focus:border-arc-blue transition-colors" placeholder="${lang === 'ar' ? 'ahmed@example.com' : 'john@example.com'}">
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">${t.signup.form.password}</label>
                                        <input type="password" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arc-blue focus:border-arc-blue transition-colors">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">${t.signup.form.confirmPassword}</label>
                                        <input type="password" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arc-blue focus:border-arc-blue transition-colors">
                                    </div>
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">${t.signup.form.company}</label>
                                        <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arc-blue focus:border-arc-blue transition-colors" placeholder="${lang === 'ar' ? 'اختياري' : 'Optional'}">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">${t.signup.form.role}</label>
                                        <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arc-blue focus:border-arc-blue transition-colors">
                                            <option value="">${lang === 'ar' ? 'اختر المنصب' : 'Select Role'}</option>
                                            <option value="developer">${lang === 'ar' ? 'مطور' : 'Developer'}</option>
                                            <option value="manager">${lang === 'ar' ? 'مدير' : 'Manager'}</option>
                                            <option value="analyst">${lang === 'ar' ? 'محلل' : 'Analyst'}</option>
                                            <option value="other">${lang === 'ar' ? 'أخرى' : 'Other'}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}">
                                    <input type="checkbox" id="terms" required class="w-4 h-4 text-arc-blue border-gray-300 rounded focus:ring-arc-blue">
                                    <label for="terms" class="text-sm text-gray-600 flex-1">
                                        ${t.signup.form.agreeTerms}
                                    </label>
                                </div>

                                <div class="flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}">
                                    <input type="checkbox" id="newsletter" class="w-4 h-4 text-arc-blue border-gray-300 rounded focus:ring-arc-blue">
                                    <label for="newsletter" class="text-sm text-gray-600 flex-1">
                                        ${t.signup.form.newsletter}
                                    </label>
                                </div>

                                <button type="submit" class="w-full bg-gradient-to-r from-arc-blue to-arc-orange text-white py-4 px-6 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                    ${t.signup.form.submit}
                                </button>
                            </form>

                            <!-- Login Link -->
                            <div class="mt-8 text-center">
                                <p class="text-sm text-gray-600">
                                    ${t.signup.login.title}
                                    <a href="/login?lang=${lang}" class="text-arc-blue hover:text-arc-orange transition-colors font-semibold">
                                        ${t.signup.login.link}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Decorative Elements -->
        <div class="fixed top-20 ${isRTL ? 'right-10' : 'left-10'} w-20 h-20 bg-arc-blue/10 rounded-full float-animation"></div>
        <div class="fixed bottom-20 ${isRTL ? 'left-20' : 'right-20'} w-32 h-32 bg-arc-orange/10 rounded-full float-animation"></div>
        
        <script src="/static/app.js"></script>
    </body>
    </html>
  `);
});

// Blog page
app.get('/blog', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  const languages = getSupportedLanguages();
  
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: lang === 'ar' ? 'دليل البداية السريعة لـ ARC' : 'ARC Quick Start Guide',
      excerpt: lang === 'ar' ? 'تعلم كيفية إعداد ARC وإنشاء تقريرك الأول في أقل من 10 دقائق' : 'Learn how to set up ARC and create your first report in under 10 minutes',
      author: lang === 'ar' ? 'فريق ARC' : 'ARC Team',
      date: '2024-01-15',
      readTime: 5,
      category: 'tutorials',
      tags: [lang === 'ar' ? 'بداية' : 'getting-started', 'tutorials'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop'
    },
    {
      id: 2,
      title: lang === 'ar' ? 'ميزات الذكاء الاصطناعي الجديدة في ARC 2.0' : 'New AI Features in ARC 2.0',
      excerpt: lang === 'ar' ? 'اكتشف المساعد الذكي الجديد وميزات التحليل التلقائي المتقدمة' : 'Discover the new smart assistant and advanced automated analysis features',
      author: lang === 'ar' ? 'د. سارة أحمد' : 'Dr. Sarah Ahmed',
      date: '2024-01-10',
      readTime: 8,
      category: 'features',
      tags: [lang === 'ar' ? 'ذكاء-اصطناعي' : 'ai', lang === 'ar' ? 'ميزات-جديدة' : 'new-features'],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
    },
    {
      id: 3,
      title: lang === 'ar' ? 'أفضل الممارسات لتطوير تقارير APEX احترافية' : 'Best Practices for Professional APEX Reports',
      excerpt: lang === 'ar' ? 'نصائح وحيل من خبراء التطوير لإنشاء تقارير عالية الجودة' : 'Tips and tricks from development experts for creating high-quality reports',
      author: lang === 'ar' ? 'محمد الخالدي' : 'Mohamed Al-Khalidi',
      date: '2024-01-05',
      readTime: 12,
      category: 'tips',
      tags: [lang === 'ar' ? 'أفضل-الممارسات' : 'best-practices', 'apex', lang === 'ar' ? 'تطوير' : 'development'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
    },
    {
      id: 4,
      title: lang === 'ar' ? 'تحديث أمني مهم لجميع المستخدمين' : 'Important Security Update for All Users',
      excerpt: lang === 'ar' ? 'إجراءات الأمان الجديدة وتحسينات الحماية في الإصدار الأخير' : 'New security measures and protection improvements in the latest release',
      author: lang === 'ar' ? 'فريق الأمان' : 'Security Team',
      date: '2024-01-01',
      readTime: 6,
      category: 'news',
      tags: [lang === 'ar' ? 'أمان' : 'security', lang === 'ar' ? 'تحديث' : 'update'],
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=400&fit=crop'
    }
  ];

  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t.blog.title} - ${t.hero.title}</title>
        
        <!-- SEO Meta Tags -->
        <meta name="description" content="${lang === 'ar'
          ? 'مدونة ARC - اكتشف أحدث النصائح والحيل في تطوير تقارير Oracle APEX. مقالات تعليمية، ميزات جديدة، وأفضل الممارسات من خبراء التطوير'
          : 'ARC Blog - Discover the latest tips and tricks in Oracle APEX report development. Tutorials, new features, and best practices from development experts'}">
        <meta name="keywords" content="${lang === 'ar'
          ? 'مدونة ARC, دروس Oracle APEX, نصائح تقارير, تطوير, ذكاء اصطناعي, برمجة'
          : 'ARC blog, Oracle APEX tutorials, reporting tips, development, artificial intelligence, programming'}">
        
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: '${t.blog.title}',
            page_location: window.location.href,
            language: '${lang}'
          });
          
          // Track blog interactions
          function trackBlogClick(postId, postTitle) {
            gtag('event', 'blog_post_click', {
              event_category: 'Blog',
              event_label: postTitle,
              custom_parameter_1: postId,
              language: '${lang}'
            });
          }
          
          function trackBlogSearch(query) {
            gtag('event', 'blog_search', {
              event_category: 'Blog',
              event_label: query,
              language: '${lang}'
            });
          }
        </script>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #5A9BD5 0%, #EA6700 100%); }
          .hover-lift { transition: all 0.3s ease; }
          .hover-lift:hover { transform: translateY(-8px); }
        </style>
    </head>
    <body class="bg-gray-50 ${isRTL ? 'rtl' : ''}">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/" class="flex items-center">
                            <div class="w-10 h-10 bg-arc-blue rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                                <div class="w-6 h-6 relative">
                                    <div class="absolute w-4 h-4 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                            <span class="text-xl font-bold text-arc-gray">ARC</span>
                        </a>
                    </div>
                    
                    <div class="hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}">
                        <a href="/?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.home}</a>
                        <a href="/?lang=${lang}#features" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.features}</a>
                        <a href="/?lang=${lang}#pricing" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.pricing}</a>
                        <a href="/about?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.footer.company.about}</a>
                        <a href="/blog?lang=${lang}" class="text-arc-blue font-semibold">${t.footer.company.blog}</a>
                        <a href="/contact?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.footer.support.contact}</a>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <div class="relative group">
                            <button class="flex items-center text-arc-gray hover:text-arc-blue transition-colors">
                                <i class="fas fa-globe ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${languages.find(l => l.code === lang)?.nativeName || 'English'}
                                <i class="fas fa-chevron-down ${isRTL ? 'mr-2' : 'ml-2'} text-xs"></i>
                            </button>
                            <div class="absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                ${languages.map(l => `
                                    <a href="/blog?lang=${l.code}" class="block px-4 py-2 text-sm text-arc-gray hover:bg-gray-100 hover:text-arc-blue">
                                        ${l.nativeName}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                        <a href="/signup?lang=${lang}" class="bg-arc-blue text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">${t.nav.signup}</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="gradient-bg text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">${t.blog.title}</h1>
                <p class="text-xl text-white/90 max-w-3xl mx-auto mb-8">${t.blog.subtitle}</p>
                
                <!-- Search Bar -->
                <div class="max-w-2xl mx-auto relative">
                    <div class="flex">
                        <input 
                            type="text" 
                            id="blog-search"
                            placeholder="${t.blog.search.placeholder}" 
                            class="flex-1 px-6 py-4 rounded-${isRTL ? 'r' : 'l'}-xl border-0 focus:ring-4 focus:ring-white/20 text-gray-900 text-lg"
                            onkeyup="handleSearch(event)"
                        >
                        <button 
                            onclick="performSearch()"
                            class="bg-white text-arc-blue px-8 py-4 rounded-${isRTL ? 'l' : 'r'}-xl hover:bg-gray-100 transition-colors font-semibold"
                        >
                            <i class="fas fa-search ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                            ${t.blog.search.button}
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Categories & Filter -->
        <section class="py-8 bg-white border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-wrap justify-center gap-4">
                    <button onclick="filterPosts('all')" class="category-btn active px-6 py-3 rounded-full bg-arc-blue text-white font-semibold hover:bg-opacity-90 transition-all">
                        ${t.blog.categories.all}
                    </button>
                    <button onclick="filterPosts('tutorials')" class="category-btn px-6 py-3 rounded-full bg-gray-100 text-arc-gray font-semibold hover:bg-arc-blue hover:text-white transition-all">
                        ${t.blog.categories.tutorials}
                    </button>
                    <button onclick="filterPosts('features')" class="category-btn px-6 py-3 rounded-full bg-gray-100 text-arc-gray font-semibold hover:bg-arc-green hover:text-white transition-all">
                        ${t.blog.categories.features}
                    </button>
                    <button onclick="filterPosts('news')" class="category-btn px-6 py-3 rounded-full bg-gray-100 text-arc-gray font-semibold hover:bg-arc-orange hover:text-white transition-all">
                        ${t.blog.categories.news}
                    </button>
                    <button onclick="filterPosts('tips')" class="category-btn px-6 py-3 rounded-full bg-gray-100 text-arc-gray font-semibold hover:bg-purple-500 hover:text-white transition-all">
                        ${t.blog.categories.tips}
                    </button>
                </div>
            </div>
        </section>

        <!-- Blog Posts -->
        <section class="py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div id="blog-posts" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${blogPosts.map(post => `
                        <article class="blog-post bg-white rounded-2xl shadow-lg overflow-hidden hover-lift cursor-pointer" data-category="${post.category}" onclick="trackBlogClick(${post.id}, '${post.title}')">
                            <!-- Post Image -->
                            <div class="relative overflow-hidden">
                                <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300">
                                <div class="absolute top-4 ${isRTL ? 'right-4' : 'left-4'}">
                                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${
                                      post.category === 'tutorials' ? 'bg-arc-blue text-white' :
                                      post.category === 'features' ? 'bg-arc-green text-white' :
                                      post.category === 'news' ? 'bg-arc-orange text-white' :
                                      'bg-purple-500 text-white'
                                    }">
                                        ${t.blog.categories[post.category]}
                                    </span>
                                </div>
                            </div>

                            <!-- Post Content -->
                            <div class="p-6">
                                <!-- Meta Info -->
                                <div class="flex items-center text-sm text-gray-500 mb-3 space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                                    <div class="flex items-center">
                                        <i class="fas fa-user ${isRTL ? 'ml-1' : 'mr-1'}"></i>
                                        <span>${post.author}</span>
                                    </div>
                                    <div class="flex items-center">
                                        <i class="fas fa-calendar ${isRTL ? 'ml-1' : 'mr-1'}"></i>
                                        <span>${post.date}</span>
                                    </div>
                                    <div class="flex items-center">
                                        <i class="fas fa-clock ${isRTL ? 'ml-1' : 'mr-1'}"></i>
                                        <span>${post.readTime} ${t.blog.readTime}</span>
                                    </div>
                                </div>

                                <!-- Title -->
                                <h3 class="text-xl font-bold text-arc-gray mb-3 hover:text-arc-blue transition-colors line-clamp-2">
                                    ${post.title}
                                </h3>

                                <!-- Excerpt -->
                                <p class="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                                    ${post.excerpt}
                                </p>

                                <!-- Tags -->
                                <div class="flex flex-wrap gap-2 mb-4">
                                    ${post.tags.map(tag => `
                                        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-arc-blue hover:text-white transition-colors cursor-pointer">
                                            #${tag}
                                        </span>
                                    `).join('')}
                                </div>

                                <!-- Read More -->
                                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span class="text-arc-blue font-semibold hover:text-arc-orange transition-colors cursor-pointer">
                                        ${t.blog.readMore}
                                        <i class="fas fa-arrow-${isRTL ? 'left' : 'right'} ${isRTL ? 'mr-2' : 'ml-2'} text-sm"></i>
                                    </span>
                                    <div class="flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}">
                                        <button class="text-gray-400 hover:text-arc-blue transition-colors">
                                            <i class="fas fa-share-alt"></i>
                                        </button>
                                        <button class="text-gray-400 hover:text-red-500 transition-colors">
                                            <i class="fas fa-heart"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    `).join('')}
                </div>

                <!-- No Results Message -->
                <div id="no-results" class="hidden text-center py-16">
                    <div class="text-6xl text-gray-300 mb-4">📝</div>
                    <h3 class="text-2xl font-bold text-gray-600 mb-2">${t.blog.noResults}</h3>
                    <p class="text-gray-500 mb-6">${lang === 'ar' ? 'جرب البحث بكلمات مختلفة أو تصفح جميع المقالات' : 'Try searching with different keywords or browse all articles'}</p>
                    <button onclick="clearSearch()" class="bg-arc-blue text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors">
                        ${lang === 'ar' ? 'مسح البحث' : 'Clear Search'}
                    </button>
                </div>
            </div>
        </section>

        <!-- Newsletter Subscription -->
        <section class="py-16 bg-gradient-to-r from-arc-blue to-arc-orange text-white">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-3xl font-bold mb-4">${lang === 'ar' ? 'اشترك في النشرة الإخبارية' : 'Subscribe to Our Newsletter'}</h2>
                <p class="text-xl mb-8 text-white/90">${lang === 'ar' ? 'احصل على أحدث المقالات والنصائح مباشرة في بريدك الإلكتروني' : 'Get the latest articles and tips delivered directly to your inbox'}</p>
                <div class="flex max-w-md mx-auto">
                    <input type="email" placeholder="${lang === 'ar' ? 'بريدك الإلكتروني' : 'Your email address'}" class="flex-1 px-6 py-3 rounded-${isRTL ? 'r' : 'l'}-lg border-0 text-gray-900">
                    <button class="bg-white text-arc-blue px-6 py-3 rounded-${isRTL ? 'l' : 'r'}-lg font-semibold hover:bg-gray-100 transition-colors">
                        ${lang === 'ar' ? 'اشترك' : 'Subscribe'}
                    </button>
                </div>
                <p class="text-sm text-white/70 mt-4">${lang === 'ar' ? 'لن نرسل لك رسائل مزعجة. يمكنك إلغاء الاشتراك في أي وقت.' : 'No spam. Unsubscribe anytime.'}</p>
            </div>
        </section>

        <script src="/static/app.js"></script>
        <script>
            // Blog functionality
            function handleSearch(event) {
                if (event.key === 'Enter') {
                    performSearch();
                }
            }

            function performSearch() {
                const query = document.getElementById('blog-search').value.toLowerCase();
                trackBlogSearch(query);
                
                const posts = document.querySelectorAll('.blog-post');
                let hasResults = false;

                posts.forEach(post => {
                    const title = post.querySelector('h3').textContent.toLowerCase();
                    const excerpt = post.querySelector('p').textContent.toLowerCase();
                    
                    if (title.includes(query) || excerpt.includes(query) || query === '') {
                        post.style.display = 'block';
                        hasResults = true;
                    } else {
                        post.style.display = 'none';
                    }
                });

                document.getElementById('no-results').style.display = hasResults ? 'none' : 'block';
            }

            function filterPosts(category) {
                // Update active button
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active', 'bg-arc-blue', 'text-white');
                    btn.classList.add('bg-gray-100', 'text-arc-gray');
                });
                event.target.classList.add('active', 'bg-arc-blue', 'text-white');
                event.target.classList.remove('bg-gray-100', 'text-arc-gray');

                // Filter posts
                const posts = document.querySelectorAll('.blog-post');
                let hasResults = false;

                posts.forEach(post => {
                    if (category === 'all' || post.dataset.category === category) {
                        post.style.display = 'block';
                        hasResults = true;
                    } else {
                        post.style.display = 'none';
                    }
                });

                document.getElementById('no-results').style.display = hasResults ? 'none' : 'block';
            }

            function clearSearch() {
                document.getElementById('blog-search').value = '';
                document.querySelectorAll('.blog-post').forEach(post => {
                    post.style.display = 'block';
                });
                document.getElementById('no-results').style.display = 'none';
                
                // Reset to "all" category
                document.querySelectorAll('.category-btn').forEach((btn, index) => {
                    if (index === 0) {
                        btn.classList.add('active', 'bg-arc-blue', 'text-white');
                        btn.classList.remove('bg-gray-100', 'text-arc-gray');
                    } else {
                        btn.classList.remove('active', 'bg-arc-blue', 'text-white');
                        btn.classList.add('bg-gray-100', 'text-arc-gray');
                    }
                });
            }
        </script>
    </body>
    </html>
  `);
});

// Individual Pricing Pages
app.get('/pricing/:plan', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  const languages = getSupportedLanguages();
  const plan = c.req.param('plan');
  
  // Validate plan
  const validPlans = ['free', 'pro', 'developer', 'enterprise'];
  if (!validPlans.includes(plan)) {
    return c.redirect(`/?lang=${lang}#pricing`);
  }
  
  const planData = t.pricing[plan];
  const planColors = {
    free: { bg: 'from-arc-green to-emerald-600', accent: 'arc-green', light: 'green' },
    pro: { bg: 'from-arc-orange to-red-500', accent: 'arc-orange', light: 'orange' },
    developer: { bg: 'from-arc-blue to-blue-600', accent: 'arc-blue', light: 'blue' },
    enterprise: { bg: 'from-purple-600 to-indigo-600', accent: 'purple-600', light: 'purple' }
  };
  
  const color = planColors[plan];
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${planData.name} ${lang === 'ar' ? 'خطة' : 'Plan'} - ${t.hero.title}</title>
        
        <!-- SEO Meta Tags -->
        <meta name="description" content="${planData.description}">
        <meta name="keywords" content="${plan}, pricing, ARC, Oracle APEX, ${lang === 'ar' ? 'خطة, تسعير' : 'plan, subscription'}">
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          
          /* Plan-specific gradients */
          .plan-free { background: linear-gradient(135deg, #66B032 0%, #10b981 100%); }
          .plan-pro { background: linear-gradient(135deg, #EA6700 0%, #ef4444 100%); }
          .plan-developer { background: linear-gradient(135deg, #5A9BD5 0%, #2563eb 100%); }
          .plan-enterprise { background: linear-gradient(135deg, #9333ea 0%, #4f46e5 100%); }
          
          .plan-${plan} { background: ${
            plan === 'free' ? 'linear-gradient(135deg, #66B032 0%, #10b981 100%)' :
            plan === 'pro' ? 'linear-gradient(135deg, #EA6700 0%, #ef4444 100%)' :
            plan === 'developer' ? 'linear-gradient(135deg, #5A9BD5 0%, #2563eb 100%)' :
            'linear-gradient(135deg, #9333ea 0%, #4f46e5 100%)'
          }; }
          
          .feature-bg-${plan} { 
            background: ${
              plan === 'free' ? 'linear-gradient(135deg, #66B032 0%, #10b981 100%)' :
              plan === 'pro' ? 'linear-gradient(135deg, #EA6700 0%, #ef4444 100%)' :
              plan === 'developer' ? 'linear-gradient(135deg, #5A9BD5 0%, #2563eb 100%)' :
              'linear-gradient(135deg, #9333ea 0%, #4f46e5 100%)'
            }; 
          }
          
          .cta-bg-${plan} { 
            background: ${
              plan === 'free' ? 'linear-gradient(135deg, #66B032 0%, #10b981 100%)' :
              plan === 'pro' ? 'linear-gradient(135deg, #EA6700 0%, #ef4444 100%)' :
              plan === 'developer' ? 'linear-gradient(135deg, #5A9BD5 0%, #2563eb 100%)' :
              'linear-gradient(135deg, #9333ea 0%, #4f46e5 100%)'
            }; 
          }
          
          .text-${plan}-600 { 
            color: ${
              plan === 'free' ? '#66B032' :
              plan === 'pro' ? '#EA6700' :
              plan === 'developer' ? '#5A9BD5' :
              '#9333ea'
            }; 
          }
          
          .hover-text-${plan} { 
            transition: color 0.3s ease;
          }
          .hover-text-${plan}:hover { 
            color: ${
              plan === 'free' ? '#10b981' :
              plan === 'pro' ? '#ef4444' :
              plan === 'developer' ? '#2563eb' :
              '#4f46e5'
            }; 
          }
          
          .animate-float { animation: float 3s ease-in-out infinite; }
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        </style>
    </head>
    <body class="bg-gray-50 ${isRTL ? 'rtl' : ''}">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/?lang=${lang}" class="flex items-center">
                            <div class="w-10 h-10 bg-arc-blue rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                                <div class="w-6 h-6 relative">
                                    <div class="absolute w-4 h-4 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                            <span class="text-xl font-bold text-arc-gray">ARC</span>
                        </a>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <a href="/?lang=${lang}#pricing" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.pricing}</a>
                        <a href="/?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.home}</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="plan-${plan} text-white py-20 relative overflow-hidden">
            <!-- Background Effects -->
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="absolute top-10 ${isRTL ? 'right-10' : 'left-10'} w-32 h-32 bg-white/10 rounded-full animate-float"></div>
            <div class="absolute bottom-10 ${isRTL ? 'left-20' : 'right-20'} w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
            
            <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="mb-8 animate-float">
                    <div class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        ${plan === 'free' ? '<i class="fas fa-gift text-4xl text-white"></i>' : 
                          plan === 'pro' ? '<i class="fas fa-crown text-4xl text-white"></i>' :
                          plan === 'developer' ? '<i class="fas fa-code text-4xl text-white"></i>' :
                          '<i class="fas fa-building text-4xl text-white"></i>'}
                    </div>
                </div>
                
                <h1 class="text-5xl md:text-6xl font-black mb-6 drop-shadow-2xl">
                    <span class="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                        ${planData.name} ${lang === 'ar' ? 'خطة' : 'Plan'}
                    </span>
                </h1>
                
                <p class="text-xl md:text-2xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg">
                    ${planData.description}
                </p>
                
                <!-- Price Display -->
                <div class="bg-white/20 backdrop-blur-lg rounded-3xl p-8 mb-8 max-w-md mx-auto border border-white/30 shadow-2xl">
                    ${plan === 'enterprise' ? `
                        <div class="text-5xl md:text-6xl font-black mb-4 text-white drop-shadow-xl">${lang === 'ar' ? 'مخصص' : 'Custom'}</div>
                        <p class="text-xl text-white/90 font-medium">${lang === 'ar' ? 'حسب احتياجاتك' : 'Based on your needs'}</p>
                        <div class="mt-4 flex items-center justify-center">
                            <i class="fas fa-handshake text-2xl text-white/80 ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                            <span class="text-white/80">${lang === 'ar' ? 'تواصل معنا' : 'Contact us'}</span>
                        </div>
                    ` : `
                        <div class="text-6xl md:text-7xl font-black mb-4 text-white drop-shadow-xl">
                            ${plan === 'free' ? '$0' : plan === 'pro' ? '$49' : '$199'}
                            <span class="text-2xl font-normal text-white/80">/${lang === 'ar' ? 'شهر' : 'mo'}</span>
                        </div>
                        <div class="text-lg text-white/90 font-medium">
                            ${plan === 'pro' ? (lang === 'ar' ? '💰 وفر 20% سنوياً!' : '💰 Save 20% yearly!') : 
                              plan === 'developer' ? (lang === 'ar' ? '💰 وفر 20% سنوياً!' : '💰 Save 20% yearly!') : 
                              plan === 'free' ? (lang === 'ar' ? '🎉 مجاني إلى الأبد' : '🎉 Free forever') : ''}
                        </div>
                        ${plan !== 'free' ? `
                            <div class="mt-4 text-sm text-white/70">
                                ${lang === 'ar' ? 'الخطة السنوية:' : 'Annual plan:'} 
                                <span class="font-bold text-white">
                                    ${plan === 'pro' ? '$39/mo' : '$159/mo'}
                                </span>
                            </div>
                        ` : ''}
                    `}
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-20">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl font-bold text-arc-gray mb-12 text-center">
                    ${lang === 'ar' ? 'ما ستحصل عليه' : 'What You Get'}
                </h2>
                
                <div class="grid md:grid-cols-2 gap-8 mb-12">
                    ${planData.features.map((feature, index) => `
                        <div class="flex items-start p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 hover:border-gray-200">
                            <div class="w-10 h-10 feature-bg-${plan} rounded-xl flex items-center justify-center ${isRTL ? 'ml-4' : 'mr-4'} flex-shrink-0 shadow-lg">
                                <i class="fas fa-check text-white text-sm"></i>
                            </div>
                            <div class="flex-1">
                                <h3 class="font-bold text-arc-gray mb-2 text-lg">${feature}</h3>
                                <p class="text-gray-600">
                                    ${index % 4 === 0 ? (lang === 'ar' ? '✨ ميزة أساسية مضمونة' : '✨ Core feature included') :
                                      index % 4 === 1 ? (lang === 'ar' ? '🚀 تسريع الإنتاجية' : '🚀 Boost productivity') :
                                      index % 4 === 2 ? (lang === 'ar' ? '🔒 حماية متقدمة' : '🔒 Advanced security') :
                                      (lang === 'ar' ? '📊 تحليلات شاملة' : '📊 Comprehensive analytics')}
                                </p>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- CTA Section -->
                <div class="text-center cta-bg-${plan} rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
                    <!-- Background Effects -->
                    <div class="absolute inset-0 bg-black/10"></div>
                    <div class="absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-40 h-40 bg-white/5 rounded-full -translate-y-20 ${isRTL ? 'translate-x-20' : '-translate-x-20'}"></div>
                    <div class="absolute bottom-0 ${isRTL ? 'left-0' : 'right-0'} w-32 h-32 bg-white/10 rounded-full translate-y-16 ${isRTL ? '-translate-x-16' : 'translate-x-16'}"></div>
                    
                    <div class="relative z-10">
                        <div class="mb-6">
                            <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                <i class="fas fa-rocket text-3xl text-white"></i>
                            </div>
                        </div>
                        
                        <h3 class="text-4xl md:text-5xl font-black mb-6 drop-shadow-xl">
                            ${lang === 'ar' ? '🚀 جاهز للبدء؟' : '🚀 Ready to Get Started?'}
                        </h3>
                        
                        <p class="text-xl md:text-2xl mb-8 text-white/95 max-w-2xl mx-auto leading-relaxed font-medium">
                            ${plan === 'free' ? 
                              (lang === 'ar' ? 'ابدأ مجاناً ولا تحتاج لبطاقة ائتمان - انطلق في رحلتك اليوم!' : 'Start for free, no credit card required - begin your journey today!') :
                              (lang === 'ar' ? 'اشترك الآن واحصل على 30 يوم تجربة مجانية مع ضمان استرداد المال' : 'Subscribe now and get 30 days free trial with money-back guarantee')
                            }
                        </p>
                        
                        <div class="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="/signup?lang=${lang}&plan=${plan}" class="group bg-white text-${plan}-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-rotate-1">
                                <div class="flex items-center justify-center">
                                    <i class="fas fa-${plan === 'free' ? 'gift' : plan === 'pro' ? 'crown' : plan === 'developer' ? 'code' : 'building'} ${isRTL ? 'ml-3' : 'mr-3'} group-hover:animate-bounce"></i>
                                    ${planData.cta}
                                </div>
                            </a>
                            <a href="/contact?lang=${lang}" class="group border-3 border-white text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-${plan}-600 transition-all duration-300 transform hover:scale-105 hover:rotate-1">
                                <div class="flex items-center justify-center">
                                    <i class="fas fa-headset ${isRTL ? 'ml-3' : 'mr-3'} group-hover:animate-pulse"></i>
                                    ${lang === 'ar' ? 'تحدث مع خبير' : 'Talk to Expert'}
                                </div>
                            </a>
                        </div>
                        
                        <!-- Trust Indicators -->
                        <div class="mt-8 flex items-center justify-center space-x-8 ${isRTL ? 'space-x-reverse' : ''} text-white/80">
                            <div class="flex items-center">
                                <i class="fas fa-shield-check ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                <span class="text-sm font-medium">${lang === 'ar' ? 'آمن 100%' : '100% Secure'}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-undo ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                <span class="text-sm font-medium">${lang === 'ar' ? 'ضمان الاسترداد' : 'Money Back'}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-clock ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                <span class="text-sm font-medium">${lang === 'ar' ? 'دعم 24/7' : '24/7 Support'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Comparison -->
                <div class="mt-16 text-center">
                    <h3 class="text-2xl font-bold text-arc-gray mb-6">
                        ${lang === 'ar' ? 'مقارنة الخطط' : 'Compare Plans'}
                    </h3>
                    <a href="/?lang=${lang}#pricing" class="inline-flex items-center text-arc-blue hover:text-arc-orange transition-colors font-semibold">
                        <i class="fas fa-table ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                        ${lang === 'ar' ? 'مقارنة جميع الخطط' : 'Compare All Plans'}
                    </a>
                </div>
            </div>
        </section>

        <script src="/static/app.js"></script>
    </body>
    </html>
  `);
});

// Signup Process page (after clicking "Start Free Journey")
app.get('/signup/process', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  const languages = getSupportedLanguages();
  const plan = c.req.query('plan') || 'free';
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${lang === 'ar' ? 'إنشاء حسابك المجاني' : 'Create Your Free Account'} - ${t.hero.title}</title>
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #5A9BD5 0%, #EA6700 100%); }
          .step-active { background: linear-gradient(135deg, #5A9BD5, #EA6700); }
          .step-completed { background: linear-gradient(135deg, #66B032, #10b981); }
          .step-pending { background: #e5e7eb; }
          .progress-bar { transition: width 1s ease-in-out; }
        </style>
    </head>
    <body class="bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 min-h-screen ${isRTL ? 'rtl' : ''}">
        <!-- Navigation -->
        <nav class="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/?lang=${lang}" class="flex items-center">
                            <div class="w-10 h-10 bg-arc-blue rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                                <div class="w-6 h-6 relative">
                                    <div class="absolute w-4 h-4 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                            <span class="text-xl font-bold text-arc-gray">ARC</span>
                        </a>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <a href="/login?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">
                            ${lang === 'ar' ? 'لديك حساب؟ سجل دخول' : 'Have account? Login'}
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        <div class="min-h-screen py-12">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <!-- Progress Steps -->
                <div class="mb-12">
                    <div class="flex items-center justify-center space-x-8 ${isRTL ? 'space-x-reverse' : ''} mb-8">
                        ${[
                          { step: 1, title: lang === 'ar' ? 'المعلومات الأساسية' : 'Basic Info', icon: 'fas fa-user' },
                          { step: 2, title: lang === 'ar' ? 'اختيار الخطة' : 'Choose Plan', icon: 'fas fa-star' },
                          { step: 3, title: lang === 'ar' ? 'التأكيد' : 'Confirmation', icon: 'fas fa-check' }
                        ].map((item, index) => `
                            <div class="flex items-center">
                                <div class="flex flex-col items-center">
                                    <div class="w-12 h-12 ${index === 0 ? 'step-active' : 'step-pending'} rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                        ${index === 0 ? '<i class="' + item.icon + '"></i>' : item.step}
                                    </div>
                                    <span class="text-sm font-medium text-gray-600 mt-2">${item.title}</span>
                                </div>
                                ${index < 2 ? `
                                    <div class="w-16 h-1 bg-gray-200 mx-4 relative overflow-hidden rounded-full">
                                        <div class="progress-bar h-full bg-gradient-to-r from-arc-blue to-arc-orange ${index === 0 ? 'w-1/3' : 'w-0'}"></div>
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Main Content -->
                <div class="grid lg:grid-cols-2 gap-12">
                    
                    <!-- Left Side - Welcome & Benefits -->
                    <div class="order-2 lg:order-1">
                        <div class="sticky top-24">
                            <!-- Welcome Message -->
                            <div class="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 mb-8">
                                <div class="text-center mb-6">
                                    <div class="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                        <i class="fas fa-rocket text-3xl text-white"></i>
                                    </div>
                                    <h2 class="text-3xl font-bold text-arc-gray mb-2">
                                        ${lang === 'ar' ? '🎉 مرحباً بك في ARC!' : '🎉 Welcome to ARC!'}
                                    </h2>
                                    <p class="text-gray-600">
                                        ${lang === 'ar' ? 'أنت على بُعد دقائق من ثورة في عالم التقارير!' : 'You\'re minutes away from a reporting revolution!'}
                                    </p>
                                </div>
                                
                                <!-- Plan Selection -->
                                <div class="bg-gradient-to-r from-arc-green/10 to-emerald-500/10 rounded-2xl p-6 border border-arc-green/20">
                                    <h3 class="font-bold text-arc-gray mb-3 flex items-center">
                                        <i class="fas fa-gift text-arc-green ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                        ${lang === 'ar' ? 'خطتك المختارة' : 'Your Selected Plan'}
                                    </h3>
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <div class="text-2xl font-bold text-arc-green">${plan === 'free' ? (lang === 'ar' ? 'المجانية' : 'Free') : plan === 'pro' ? 'Pro' : plan === 'developer' ? 'Developer' : 'Enterprise'}</div>
                                            <div class="text-sm text-gray-600">${plan === 'free' ? '$0/month' : plan === 'pro' ? '$49/month' : plan === 'developer' ? '$199/month' : 'Custom'}</div>
                                        </div>
                                        <a href="/?lang=${lang}#pricing" class="text-arc-blue hover:text-arc-orange text-sm font-semibold">
                                            ${lang === 'ar' ? 'تغيير الخطة' : 'Change Plan'}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!-- Benefits -->
                            <div class="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                                <h3 class="text-xl font-bold text-arc-gray mb-6 flex items-center">
                                    <i class="fas fa-star text-arc-orange ${isRTL ? 'ml-3' : 'mr-3'}"></i>
                                    ${lang === 'ar' ? 'ماذا ستحصل بعد التسجيل؟' : 'What you get after signing up?'}
                                </h3>
                                <div class="space-y-4">
                                    ${[
                                      { icon: 'fas fa-zap', title: lang === 'ar' ? 'إعداد فوري' : 'Instant Setup', desc: lang === 'ar' ? 'حسابك جاهز في ثوانٍ' : 'Account ready in seconds' },
                                      { icon: 'fas fa-chart-line', title: lang === 'ar' ? 'تقارير فورية' : 'Instant Reports', desc: lang === 'ar' ? 'ابدأ إنشاء التقارير فوراً' : 'Start creating reports immediately' },
                                      { icon: 'fas fa-robot', title: lang === 'ar' ? 'مساعد AI ذكي' : 'Smart AI Assistant', desc: lang === 'ar' ? 'مساعدك الشخصي للتقارير' : 'Your personal reporting assistant' },
                                      { icon: 'fas fa-graduation-cap', title: lang === 'ar' ? 'دروس مجانية' : 'Free Tutorials', desc: lang === 'ar' ? 'تعلم كل شيء مجاناً' : 'Learn everything for free' },
                                      { icon: 'fas fa-headset', title: lang === 'ar' ? 'دعم مباشر' : 'Live Support', desc: lang === 'ar' ? 'فريق الدعم متاح 24/7' : 'Support team available 24/7' }
                                    ].map((benefit, index) => `
                                        <div class="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group cursor-pointer">
                                            <div class="w-10 h-10 bg-gradient-to-r from-arc-blue to-arc-orange rounded-xl flex items-center justify-center ${isRTL ? 'ml-4' : 'mr-4'} group-hover:scale-110 transition-transform">
                                                <i class="${benefit.icon} text-white text-sm"></i>
                                            </div>
                                            <div>
                                                <h4 class="font-semibold text-arc-gray group-hover:text-arc-blue transition-colors">${benefit.title}</h4>
                                                <p class="text-sm text-gray-600">${benefit.desc}</p>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Side - Signup Form -->
                    <div class="order-1 lg:order-2">
                        <div class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                            
                            <!-- Form Header -->
                            <div class="gradient-bg p-8 text-white text-center">
                                <h1 class="text-3xl font-bold mb-2">${lang === 'ar' ? 'إنشاء حسابك المجاني' : 'Create Your Free Account'}</h1>
                                <p class="text-white/90">${lang === 'ar' ? 'خطوة واحدة تفصلك عن المستقبل' : 'One step away from the future'}</p>
                            </div>

                            <!-- Signup Form -->
                            <div class="p-8">
                                <!-- Quick Social Signup -->
                                <div class="mb-8">
                                    <p class="text-center text-gray-600 mb-6 font-medium">${lang === 'ar' ? '⚡ التسجيل السريع' : '⚡ Quick Signup'}</p>
                                    <div class="grid grid-cols-2 gap-4 mb-4">
                                        <button class="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group">
                                            <i class="fab fa-google text-red-500 ${isRTL ? 'ml-2' : 'mr-2'} group-hover:scale-110 transition-transform"></i>
                                            <span class="font-medium text-gray-700">Google</span>
                                        </button>
                                        <button class="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group">
                                            <i class="fab fa-microsoft text-blue-500 ${isRTL ? 'ml-2' : 'mr-2'} group-hover:scale-110 transition-transform"></i>
                                            <span class="font-medium text-gray-700">Microsoft</span>
                                        </button>
                                    </div>
                                    <button class="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-800 hover:shadow-md transition-all group">
                                        <i class="fab fa-github text-gray-800 ${isRTL ? 'ml-2' : 'mr-2'} group-hover:scale-110 transition-transform"></i>
                                        <span class="font-medium text-gray-700">GitHub</span>
                                    </button>
                                </div>

                                <!-- Divider -->
                                <div class="relative mb-8">
                                    <div class="absolute inset-0 flex items-center">
                                        <div class="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div class="relative flex justify-center text-sm">
                                        <span class="px-4 bg-white text-gray-500">${lang === 'ar' ? 'أو بالبريد الإلكتروني' : 'Or with email'}</span>
                                    </div>
                                </div>

                                <!-- Email Form -->
                                <form class="space-y-6">
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-2">${lang === 'ar' ? 'الاسم الأول' : 'First Name'}</label>
                                            <input type="text" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-arc-blue focus:ring-4 focus:ring-arc-blue/20 transition-all" placeholder="${lang === 'ar' ? 'أحمد' : 'John'}">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-2">${lang === 'ar' ? 'الاسم الأخير' : 'Last Name'}</label>
                                            <input type="text" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-arc-blue focus:ring-4 focus:ring-arc-blue/20 transition-all" placeholder="${lang === 'ar' ? 'محمد' : 'Doe'}">
                                        </div>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-bold text-gray-700 mb-2">${lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</label>
                                        <input type="email" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-arc-blue focus:ring-4 focus:ring-arc-blue/20 transition-all" placeholder="${lang === 'ar' ? 'ahmed@example.com' : 'john@example.com'}">
                                    </div>

                                    <div>
                                        <label class="block text-sm font-bold text-gray-700 mb-2">${lang === 'ar' ? 'كلمة المرور' : 'Password'}</label>
                                        <div class="relative">
                                            <input type="password" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-arc-blue focus:ring-4 focus:ring-arc-blue/20 transition-all pr-12" placeholder="${lang === 'ar' ? 'كلمة مرور قوية' : 'Strong password'}">
                                            <button type="button" class="absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </div>
                                        <div class="mt-2">
                                            <div class="flex space-x-1 ${isRTL ? 'space-x-reverse' : ''}">
                                                <div class="h-2 w-1/4 bg-red-300 rounded"></div>
                                                <div class="h-2 w-1/4 bg-gray-200 rounded"></div>
                                                <div class="h-2 w-1/4 bg-gray-200 rounded"></div>
                                                <div class="h-2 w-1/4 bg-gray-200 rounded"></div>
                                            </div>
                                            <p class="text-xs text-gray-500 mt-1">${lang === 'ar' ? 'قوة كلمة المرور: ضعيفة' : 'Password strength: Weak'}</p>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-2">${lang === 'ar' ? 'الشركة' : 'Company'} <span class="text-gray-400">(${lang === 'ar' ? 'اختياري' : 'Optional'})</span></label>
                                            <input type="text" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-arc-blue focus:ring-4 focus:ring-arc-blue/20 transition-all" placeholder="${lang === 'ar' ? 'اسم الشركة' : 'Company name'}">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-2">${lang === 'ar' ? 'المنصب' : 'Job Role'}</label>
                                            <select class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-arc-blue focus:ring-4 focus:ring-arc-blue/20 transition-all">
                                                <option value="">${lang === 'ar' ? 'اختر المنصب' : 'Select role'}</option>
                                                <option value="developer">${lang === 'ar' ? 'مطور' : 'Developer'}</option>
                                                <option value="analyst">${lang === 'ar' ? 'محلل' : 'Data Analyst'}</option>
                                                <option value="manager">${lang === 'ar' ? 'مدير' : 'Manager'}</option>
                                                <option value="other">${lang === 'ar' ? 'أخرى' : 'Other'}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <!-- Agreements -->
                                    <div class="space-y-3">
                                        <label class="flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''} cursor-pointer">
                                            <input type="checkbox" required class="mt-1 w-5 h-5 text-arc-blue border-2 border-gray-300 rounded focus:ring-arc-blue">
                                            <span class="text-sm text-gray-600 flex-1">
                                                ${lang === 'ar' ? 'أوافق على ' : 'I agree to the '}
                                                <a href="#" class="text-arc-blue hover:underline font-semibold">${lang === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}</a>
                                                ${lang === 'ar' ? ' و' : ' and '}
                                                <a href="#" class="text-arc-blue hover:underline font-semibold">${lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
                                            </span>
                                        </label>
                                        
                                        <label class="flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''} cursor-pointer">
                                            <input type="checkbox" class="mt-1 w-5 h-5 text-arc-blue border-2 border-gray-300 rounded focus:ring-arc-blue">
                                            <span class="text-sm text-gray-600 flex-1">
                                                ${lang === 'ar' ? 'أريد تلقي النشرات الإخبارية والتحديثات (يمكن إلغاء الاشتراك لاحقاً)' : 'I want to receive newsletters and updates (can unsubscribe later)'}
                                            </span>
                                        </label>
                                    </div>

                                    <!-- Submit Button -->
                                    <button type="submit" class="w-full gradient-bg text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                                        <div class="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                        <div class="relative flex items-center justify-center">
                                            <i class="fas fa-rocket ${isRTL ? 'ml-3' : 'mr-3'} group-hover:animate-bounce"></i>
                                            ${lang === 'ar' ? '🚀 ابدأ رحلتك المجانية الآن!' : '🚀 Start Your Free Journey Now!'}
                                        </div>
                                    </button>
                                </form>

                                <!-- Login Link -->
                                <div class="mt-8 text-center">
                                    <p class="text-gray-600">
                                        ${lang === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'}
                                        <a href="/login?lang=${lang}" class="text-arc-blue hover:text-arc-orange font-bold transition-colors">
                                            ${lang === 'ar' ? 'سجل دخولك هنا' : 'Sign in here'}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script src="/static/app.js"></script>
        <script>
            // Password strength indicator
            document.addEventListener('DOMContentLoaded', function() {
                const passwordInput = document.querySelector('input[type="password"]');
                const strengthBars = document.querySelectorAll('.h-2');
                const strengthText = document.querySelector('.text-xs.text-gray-500');
                
                passwordInput?.addEventListener('input', function() {
                    const password = this.value;
                    let strength = 0;
                    
                    if (password.length >= 8) strength++;
                    if (/[a-z]/.test(password)) strength++;
                    if (/[A-Z]/.test(password)) strength++;
                    if (/[0-9]/.test(password)) strength++;
                    if (/[^A-Za-z0-9]/.test(password)) strength++;
                    
                    const colors = ['bg-red-300', 'bg-orange-300', 'bg-yellow-300', 'bg-green-400'];
                    const texts = ['${lang === 'ar' ? 'ضعيفة' : 'Weak'}', '${lang === 'ar' ? 'مقبولة' : 'Fair'}', '${lang === 'ar' ? 'جيدة' : 'Good'}', '${lang === 'ar' ? 'قوية' : 'Strong'}'];
                    
                    strengthBars.forEach((bar, index) => {
                        bar.className = 'h-2 w-1/4 rounded ' + (index < Math.min(strength, 4) ? colors[Math.min(strength-1, 3)] : 'bg-gray-200');
                    });
                    
                    if (strengthText && password.length > 0) {
                        strengthText.textContent = '${lang === 'ar' ? 'قوة كلمة المرور: ' : 'Password strength: '}' + (texts[Math.min(strength-1, 3)] || texts[0]);
                    }
                });
            });
        </script>
    </body>
    </html>
  `);
});

// Demo page
app.get('/demo', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${lang === 'ar' ? 'العرض التوضيحي التفاعلي' : 'Interactive Demo'} - ${t.hero.title}</title>
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #5A9BD5 0%, #EA6700 100%); }
          .demo-screen { transition: all 0.5s ease-in-out; }
          .typing { animation: typing 2s steps(20, end), blink 0.75s step-end infinite; }
          @keyframes typing { from { width: 0; } to { width: 100%; } }
          @keyframes blink { from, to { border-color: transparent; } 50% { border-color: orange; } }
        </style>
    </head>
    <body class="bg-gray-900 text-white ${isRTL ? 'rtl' : ''}">
        <!-- Navigation -->
        <nav class="bg-gray-800 shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/?lang=${lang}" class="flex items-center">
                            <div class="w-10 h-10 bg-arc-blue rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                                <div class="w-6 h-6 relative">
                                    <div class="absolute w-4 h-4 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                            <span class="text-xl font-bold text-white">ARC Demo</span>
                        </a>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <a href="/signup/process?lang=${lang}" class="bg-arc-orange text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                            ${lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                        </a>
                        <a href="/?lang=${lang}" class="text-gray-300 hover:text-white transition-colors">
                            ${lang === 'ar' ? 'العودة للموقع' : 'Back to Site'}
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Demo Interface -->
        <div class="min-h-screen p-6">
            <div class="max-w-7xl mx-auto">
                
                <!-- Demo Header -->
                <div class="text-center mb-8">
                    <h1 class="text-4xl font-bold mb-4">
                        ${lang === 'ar' ? '🚀 تجربة ARC التفاعلية' : '🚀 Interactive ARC Experience'}
                    </h1>
                    <p class="text-xl text-gray-300">
                        ${lang === 'ar' ? 'اكتشف قوة الذكاء الاصطناعي في إنشاء التقارير' : 'Discover the power of AI in report creation'}
                    </p>
                </div>

                <!-- Demo Stages -->
                <div class="grid lg:grid-cols-3 gap-8">
                    
                    <!-- Stage 1: AI Assistant -->
                    <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-arc-blue transition-all">
                        <div class="text-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-r from-arc-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                <i class="fas fa-robot text-2xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold">${lang === 'ar' ? 'مساعد AI الذكي' : 'Smart AI Assistant'}</h3>
                        </div>
                        
                        <!-- Chat Interface -->
                        <div class="bg-gray-900 rounded-xl p-4 h-80 overflow-y-auto mb-4">
                            <div class="space-y-4">
                                <div class="flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''}">
                                    <div class="w-8 h-8 bg-arc-blue rounded-full flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-robot text-sm text-white"></i>
                                    </div>
                                    <div class="bg-gray-700 rounded-lg p-3 flex-1">
                                        <p class="text-sm">${lang === 'ar' ? 'مرحباً! أنا مساعدك الذكي. ما نوع التقرير الذي تريد إنشاءه؟' : 'Hello! I\'m your smart assistant. What type of report would you like to create?'}</p>
                                    </div>
                                </div>
                                
                                <div class="flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''} justify-end">
                                    <div class="bg-arc-orange rounded-lg p-3 flex-1 max-w-xs">
                                        <p class="text-sm text-white">${lang === 'ar' ? 'أريد تقرير مبيعات شهري لمتجري الإلكتروني' : 'I want a monthly sales report for my e-commerce store'}</p>
                                    </div>
                                    <div class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-user text-sm text-white"></i>
                                    </div>
                                </div>
                                
                                <div class="flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''}">
                                    <div class="w-8 h-8 bg-arc-blue rounded-full flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-robot text-sm text-white"></i>
                                    </div>
                                    <div class="bg-gray-700 rounded-lg p-3 flex-1">
                                        <p class="text-sm">${lang === 'ar' ? 'ممتاز! سأنشئ لك تقرير مبيعات شامل. هل تريد تضمين مقارنة بالشهر السابق؟' : 'Perfect! I\'ll create a comprehensive sales report. Would you like to include comparison with the previous month?'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <button onclick="startDemo(1)" class="w-full bg-arc-blue text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors font-semibold">
                            ${lang === 'ar' ? 'جرب المحادثة' : 'Try Chat'}
                        </button>
                    </div>

                    <!-- Stage 2: Report Generation -->
                    <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-arc-orange transition-all">
                        <div class="text-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-r from-arc-orange to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                <i class="fas fa-chart-bar text-2xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold">${lang === 'ar' ? 'إنشاء تلقائي للتقارير' : 'Automatic Report Generation'}</h3>
                        </div>
                        
                        <!-- Report Preview -->
                        <div class="bg-gray-900 rounded-xl p-4 h-80 overflow-hidden mb-4">
                            <div class="mb-4">
                                <div class="flex items-center justify-between mb-2">
                                    <h4 class="font-bold text-lg">${lang === 'ar' ? 'تقرير المبيعات - يناير 2024' : 'Sales Report - January 2024'}</h4>
                                    <span class="text-arc-green text-sm">${lang === 'ar' ? 'مكتمل' : 'Complete'}</span>
                                </div>
                                <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div class="h-full bg-gradient-to-r from-arc-orange to-arc-green rounded-full" style="width: 85%;"></div>
                                </div>
                            </div>
                            
                            <!-- Fake Chart -->
                            <div class="space-y-3">
                                <div class="flex items-end space-x-1 ${isRTL ? 'space-x-reverse' : ''} h-24">
                                    ${Array.from({length: 7}, (_, i) => `
                                        <div class="flex-1 bg-gradient-to-t ${i % 2 === 0 ? 'from-arc-blue to-blue-400' : 'from-arc-orange to-red-400'} rounded-t" style="height: ${20 + Math.random() * 60}%"></div>
                                    `).join('')}
                                </div>
                                
                                <div class="grid grid-cols-2 gap-4 text-sm">
                                    <div class="bg-gray-800 rounded p-3">
                                        <div class="text-arc-green font-bold text-xl">$45,230</div>
                                        <div class="text-gray-400">${lang === 'ar' ? 'إجمالي المبيعات' : 'Total Sales'}</div>
                                    </div>
                                    <div class="bg-gray-800 rounded p-3">
                                        <div class="text-arc-orange font-bold text-xl">↗ 23%</div>
                                        <div class="text-gray-400">${lang === 'ar' ? 'نمو شهري' : 'Growth'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <button onclick="startDemo(2)" class="w-full bg-arc-orange text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors font-semibold">
                            ${lang === 'ar' ? 'شاهد الإنشاء' : 'Watch Generation'}
                        </button>
                    </div>

                    <!-- Stage 3: Customization -->
                    <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-arc-green transition-all">
                        <div class="text-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-r from-arc-green to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                <i class="fas fa-palette text-2xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold">${lang === 'ar' ? 'التخصيص الذكي' : 'Smart Customization'}</h3>
                        </div>
                        
                        <!-- Customization Options -->
                        <div class="bg-gray-900 rounded-xl p-4 h-80 overflow-y-auto mb-4">
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-2">${lang === 'ar' ? 'نوع المخطط' : 'Chart Type'}</label>
                                    <select class="w-full bg-gray-800 border border-gray-600 rounded p-2 text-sm">
                                        <option>${lang === 'ar' ? 'مخطط أعمدة' : 'Bar Chart'}</option>
                                        <option>${lang === 'ar' ? 'مخطط خطي' : 'Line Chart'}</option>
                                        <option>${lang === 'ar' ? 'مخطط دائري' : 'Pie Chart'}</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium mb-2">${lang === 'ar' ? 'الألوان' : 'Colors'}</label>
                                    <div class="flex space-x-2 ${isRTL ? 'space-x-reverse' : ''}">
                                        <div class="w-8 h-8 bg-arc-blue rounded-full border-2 border-white"></div>
                                        <div class="w-8 h-8 bg-arc-orange rounded-full"></div>
                                        <div class="w-8 h-8 bg-arc-green rounded-full"></div>
                                        <div class="w-8 h-8 bg-purple-500 rounded-full"></div>
                                    </div>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium mb-2">${lang === 'ar' ? 'الفترة الزمنية' : 'Time Period'}</label>
                                    <div class="grid grid-cols-2 gap-2">
                                        <button class="bg-arc-blue text-white py-2 px-3 rounded text-sm">${lang === 'ar' ? 'شهري' : 'Monthly'}</button>
                                        <button class="bg-gray-700 text-gray-300 py-2 px-3 rounded text-sm">${lang === 'ar' ? 'أسبوعي' : 'Weekly'}</button>
                                    </div>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium mb-2">${lang === 'ar' ? 'التصدير' : 'Export Format'}</label>
                                    <div class="flex space-x-2 ${isRTL ? 'space-x-reverse' : ''}">
                                        <button class="flex-1 bg-gray-700 text-gray-300 py-2 px-2 rounded text-xs">PDF</button>
                                        <button class="flex-1 bg-gray-700 text-gray-300 py-2 px-2 rounded text-xs">Excel</button>
                                        <button class="flex-1 bg-gray-700 text-gray-300 py-2 px-2 rounded text-xs">PNG</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <button onclick="startDemo(3)" class="w-full bg-arc-green text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors font-semibold">
                            ${lang === 'ar' ? 'جرب التخصيص' : 'Try Customization'}
                        </button>
                    </div>
                </div>

                <!-- Demo Controls -->
                <div class="mt-12 text-center">
                    <div class="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                        <h3 class="text-2xl font-bold mb-4">${lang === 'ar' ? 'جاهز لتجربة الإصدار الكامل؟' : 'Ready to try the full version?'}</h3>
                        <p class="text-gray-300 mb-6">${lang === 'ar' ? 'احصل على جميع المميزات مع حسابك المجاني' : 'Get all features with your free account'}</p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/signup/process?lang=${lang}" class="bg-gradient-to-r from-arc-blue to-arc-orange text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all">
                                ${lang === 'ar' ? '🚀 ابدأ مجاناً الآن' : '🚀 Start Free Now'}
                            </a>
                            <a href="/?lang=${lang}" class="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-xl font-bold hover:border-gray-500 hover:text-white transition-colors">
                                ${lang === 'ar' ? 'العودة للموقع' : 'Back to Site'}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            function startDemo(stage) {
                // Simple demo interactions
                if (stage === 1) {
                    alert('${lang === 'ar' ? 'هذا مثال على محادثة مع مساعد AI الذكي في ARC!' : 'This is an example of chatting with ARC\'s smart AI assistant!'}');
                } else if (stage === 2) {
                    alert('${lang === 'ar' ? 'شاهد كيف ينشئ ARC التقارير تلقائياً بناءً على طلبك!' : 'See how ARC automatically generates reports based on your request!'}');
                } else if (stage === 3) {
                    alert('${lang === 'ar' ? 'خصص تقاريرك بالطريقة التي تريدها بسهولة تامة!' : 'Customize your reports exactly the way you want with ease!'}');
                }
            }
        </script>
    </body>
    </html>
  `);
});

// User Profile page
app.get('/profile', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  const languages = getSupportedLanguages();
  
  // Mock user data (in real app, this would come from database/session)
  const userData = {
    name: lang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
    email: 'ahmed@example.com',
    plan: 'pro',
    joinDate: '2024-01-15',
    avatar: 'https://ui-avatars.com/api/?name=Ahmed+Mohamed&background=5A9BD5&color=fff&size=150',
    usage: {
      reports: { used: 45, limit: 100 },
      storage: { used: 2.3, limit: 10 }, // GB
      apiCalls: { used: 1250, limit: 5000 }
    }
  };
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${lang === 'ar' ? 'الملف الشخصي' : 'User Profile'} - ${t.hero.title}</title>
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #5A9BD5 0%, #EA6700 100%); }
          .usage-bar { transition: width 1s ease-in-out; }
        </style>
    </head>
    <body class="bg-gray-50 ${isRTL ? 'rtl' : ''}">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/?lang=${lang}" class="flex items-center">
                            <div class="w-10 h-10 bg-arc-blue rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                                <div class="w-6 h-6 relative">
                                    <div class="absolute w-4 h-4 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                            <span class="text-xl font-bold text-arc-gray">ARC</span>
                        </a>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <div class="relative group">
                            <button class="flex items-center text-arc-gray hover:text-arc-blue transition-colors">
                                <img src="${userData.avatar}" alt="${userData.name}" class="w-8 h-8 rounded-full ${isRTL ? 'ml-2' : 'mr-2'}">
                                <span class="font-medium">${userData.name}</span>
                                <i class="fas fa-chevron-down ${isRTL ? 'mr-2' : 'ml-2'} text-xs"></i>
                            </button>
                            <div class="absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                <a href="/profile?lang=${lang}" class="block px-4 py-2 text-sm text-arc-blue font-semibold hover:bg-gray-100">
                                    <i class="fas fa-user ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                    ${lang === 'ar' ? 'الملف الشخصي' : 'Profile'}
                                </a>
                                <a href="/?lang=${lang}" class="block px-4 py-2 text-sm text-arc-gray hover:bg-gray-100">
                                    <i class="fas fa-home ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                    ${lang === 'ar' ? 'الصفحة الرئيسية' : 'Dashboard'}
                                </a>
                                <hr class="my-1">
                                <a href="/login?lang=${lang}" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                    <i class="fas fa-sign-out-alt ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                    ${lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid lg:grid-cols-4 gap-8">
                
                <!-- Sidebar -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                        <!-- Profile Header -->
                        <div class="text-center mb-6">
                            <img src="${userData.avatar}" alt="${userData.name}" class="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg">
                            <h2 class="text-xl font-bold text-arc-gray">${userData.name}</h2>
                            <p class="text-gray-600">${userData.email}</p>
                            <div class="mt-3">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-arc-orange to-red-500 text-white">
                                    <i class="fas fa-crown ${isRTL ? 'ml-1' : 'mr-1'} text-xs"></i>
                                    ${t.pricing[userData.plan].name}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Navigation Menu -->
                        <nav class="space-y-2">
                            ${[
                              { id: 'overview', icon: 'fas fa-tachometer-alt', text: lang === 'ar' ? 'نظرة عامة' : 'Overview' },
                              { id: 'usage', icon: 'fas fa-chart-bar', text: lang === 'ar' ? 'الاستهلاك' : 'Usage' },
                              { id: 'billing', icon: 'fas fa-credit-card', text: lang === 'ar' ? 'الفواتير' : 'Billing' },
                              { id: 'settings', icon: 'fas fa-cog', text: lang === 'ar' ? 'الإعدادات' : 'Settings' },
                              { id: 'security', icon: 'fas fa-shield-alt', text: lang === 'ar' ? 'الأمان' : 'Security' }
                            ].map((item, index) => `
                                <button onclick="showTab('${item.id}')" class="tab-btn w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 rounded-xl transition-all ${index === 0 ? 'bg-arc-blue text-white' : 'text-gray-600 hover:bg-gray-100'}" id="${item.id}-tab">
                                    <i class="${item.icon} ${isRTL ? 'ml-3' : 'mr-3'}"></i>
                                    ${item.text}
                                </button>
                            `).join('')}
                        </nav>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="lg:col-span-3">
                    
                    <!-- Overview Tab -->
                    <div id="overview-content" class="tab-content">
                        <!-- Welcome Banner -->
                        <div class="gradient-bg rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
                            <div class="relative z-10">
                                <h1 class="text-3xl font-bold mb-2">
                                    ${lang === 'ar' ? 'مرحباً، ' + userData.name.split(' ')[0] + '!' : 'Welcome back, ' + userData.name.split(' ')[0] + '!'}
                                </h1>
                                <p class="text-white/90 mb-6">
                                    ${lang === 'ar' ? 'إليك ملخص سريع عن نشاطك في ARC' : 'Here\'s a quick overview of your ARC activity'}
                                </p>
                                <div class="flex flex-wrap gap-4">
                                    <div class="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                                        <div class="text-2xl font-bold">${userData.usage.reports.used}</div>
                                        <div class="text-sm text-white/80">${lang === 'ar' ? 'تقرير' : 'Reports'}</div>
                                    </div>
                                    <div class="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                                        <div class="text-2xl font-bold">${userData.usage.storage.used}GB</div>
                                        <div class="text-sm text-white/80">${lang === 'ar' ? 'تخزين' : 'Storage'}</div>
                                    </div>
                                    <div class="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                                        <div class="text-2xl font-bold">${Math.round((new Date() - new Date(userData.joinDate)) / (1000 * 60 * 60 * 24))}</div>
                                        <div class="text-sm text-white/80">${lang === 'ar' ? 'يوم معنا' : 'Days with us'}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-32 h-32 bg-white/10 rounded-full -translate-y-8 ${isRTL ? '-translate-x-8' : 'translate-x-8'}"></div>
                        </div>

                        <!-- Quick Stats -->
                        <div class="grid md:grid-cols-3 gap-6 mb-8">
                            ${[
                              { 
                                title: lang === 'ar' ? 'التقارير النشطة' : 'Active Reports', 
                                value: userData.usage.reports.used, 
                                icon: 'fas fa-chart-line', 
                                color: 'blue',
                                change: '+12%'
                              },
                              { 
                                title: lang === 'ar' ? 'مساحة التخزين' : 'Storage Used', 
                                value: userData.usage.storage.used + 'GB', 
                                icon: 'fas fa-database', 
                                color: 'green',
                                change: '+5%'
                              },
                              { 
                                title: lang === 'ar' ? 'استدعاءات API' : 'API Calls', 
                                value: userData.usage.apiCalls.used.toLocaleString(), 
                                icon: 'fas fa-code', 
                                color: 'orange',
                                change: '+18%'
                              }
                            ].map(stat => `
                                <div class="bg-white rounded-2xl p-6 shadow-lg border border-${stat.color === 'blue' ? 'blue' : stat.color === 'green' ? 'green' : 'orange'}-100 hover:shadow-xl transition-all">
                                    <div class="flex items-center justify-between mb-4">
                                        <div class="w-12 h-12 bg-${stat.color === 'blue' ? 'arc-blue' : stat.color === 'green' ? 'arc-green' : 'arc-orange'} rounded-xl flex items-center justify-center">
                                            <i class="${stat.icon} text-white text-lg"></i>
                                        </div>
                                        <span class="text-sm font-medium text-green-600">${stat.change}</span>
                                    </div>
                                    <h3 class="text-2xl font-bold text-arc-gray mb-1">${stat.value}</h3>
                                    <p class="text-gray-600">${stat.title}</p>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Recent Activity -->
                        <div class="bg-white rounded-2xl shadow-lg p-6">
                            <h3 class="text-xl font-bold text-arc-gray mb-6 flex items-center">
                                <i class="fas fa-clock text-arc-blue ${isRTL ? 'ml-3' : 'mr-3'}"></i>
                                ${lang === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
                            </h3>
                            <div class="space-y-4">
                                ${[
                                  { action: lang === 'ar' ? 'تم إنشاء تقرير جديد' : 'Created new report', time: lang === 'ar' ? 'منذ ساعتين' : '2 hours ago', icon: 'fas fa-plus-circle', color: 'green' },
                                  { action: lang === 'ar' ? 'تم تحديث الملف الشخصي' : 'Updated profile', time: lang === 'ar' ? 'أمس' : 'Yesterday', icon: 'fas fa-user-edit', color: 'blue' },
                                  { action: lang === 'ar' ? 'تم تسجيل الدخول من جهاز جديد' : 'Logged in from new device', time: lang === 'ar' ? 'منذ 3 أيام' : '3 days ago', icon: 'fas fa-mobile-alt', color: 'orange' },
                                  { action: lang === 'ar' ? 'تم ترقية الخطة إلى Pro' : 'Upgraded to Pro plan', time: lang === 'ar' ? 'منذ أسبوع' : '1 week ago', icon: 'fas fa-crown', color: 'purple' }
                                ].map(activity => `
                                    <div class="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div class="w-10 h-10 bg-${activity.color === 'green' ? 'green' : activity.color === 'blue' ? 'blue' : activity.color === 'orange' ? 'orange' : 'purple'}-100 rounded-full flex items-center justify-center ${isRTL ? 'ml-4' : 'mr-4'}">
                                            <i class="${activity.icon} text-${activity.color === 'green' ? 'green' : activity.color === 'blue' ? 'blue' : activity.color === 'orange' ? 'orange' : 'purple'}-600 text-sm"></i>
                                        </div>
                                        <div class="flex-1">
                                            <p class="font-medium text-arc-gray">${activity.action}</p>
                                            <p class="text-sm text-gray-500">${activity.time}</p>
                                        </div>
                                        <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} text-gray-400"></i>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Usage Tab -->
                    <div id="usage-content" class="tab-content hidden">
                        <div class="bg-white rounded-2xl shadow-lg p-8">
                            <h2 class="text-2xl font-bold text-arc-gray mb-8 flex items-center">
                                <i class="fas fa-chart-bar text-arc-blue ${isRTL ? 'ml-3' : 'mr-3'}"></i>
                                ${lang === 'ar' ? 'استهلاك الموارد' : 'Resource Usage'}
                            </h2>
                            
                            <!-- Usage Cards -->
                            <div class="grid gap-8">
                                ${[
                                  { 
                                    name: lang === 'ar' ? 'التقارير' : 'Reports', 
                                    used: userData.usage.reports.used, 
                                    limit: userData.usage.reports.limit,
                                    icon: 'fas fa-chart-line',
                                    color: 'arc-blue',
                                    description: lang === 'ar' ? 'عدد التقارير التي أنشأتها هذا الشهر' : 'Number of reports created this month'
                                  },
                                  { 
                                    name: lang === 'ar' ? 'مساحة التخزين' : 'Storage Space', 
                                    used: userData.usage.storage.used, 
                                    limit: userData.usage.storage.limit,
                                    icon: 'fas fa-database',
                                    color: 'arc-green',
                                    description: lang === 'ar' ? 'المساحة المستخدمة لحفظ التقارير والبيانات (GB)' : 'Space used for reports and data storage (GB)'
                                  },
                                  { 
                                    name: lang === 'ar' ? 'استدعاءات API' : 'API Calls', 
                                    used: userData.usage.apiCalls.used, 
                                    limit: userData.usage.apiCalls.limit,
                                    icon: 'fas fa-code',
                                    color: 'arc-orange',
                                    description: lang === 'ar' ? 'عدد استدعاءات API المستخدمة هذا الشهر' : 'Number of API calls used this month'
                                  }
                                ].map(resource => {
                                  const percentage = Math.round((resource.used / resource.limit) * 100);
                                  return `
                                    <div class="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all">
                                        <div class="flex items-center justify-between mb-4">
                                            <div class="flex items-center">
                                                <div class="w-12 h-12 bg-${resource.color} rounded-xl flex items-center justify-center ${isRTL ? 'ml-4' : 'mr-4'}">
                                                    <i class="${resource.icon} text-white text-lg"></i>
                                                </div>
                                                <div>
                                                    <h3 class="text-lg font-semibold text-arc-gray">${resource.name}</h3>
                                                    <p class="text-sm text-gray-500">${resource.description}</p>
                                                </div>
                                            </div>
                                            <div class="text-${isRTL ? 'left' : 'right'}">
                                                <div class="text-2xl font-bold text-arc-gray">${percentage}%</div>
                                                <div class="text-sm text-gray-500">${resource.used}/${resource.limit}</div>
                                            </div>
                                        </div>
                                        
                                        <!-- Progress Bar -->
                                        <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                                            <div class="usage-bar bg-gradient-to-r from-${resource.color} to-${resource.color === 'arc-blue' ? 'blue-600' : resource.color === 'arc-green' ? 'emerald-600' : 'red-500'} h-3 rounded-full" style="width: ${percentage}%"></div>
                                        </div>
                                        
                                        <!-- Status -->
                                        <div class="flex items-center justify-between text-sm">
                                            <span class="text-gray-600">
                                                ${percentage < 70 ? (lang === 'ar' ? 'استهلاك جيد' : 'Good usage') : 
                                                  percentage < 90 ? (lang === 'ar' ? 'تحذير' : 'Warning') : 
                                                  (lang === 'ar' ? 'حد أقصى' : 'Limit reached')}
                                            </span>
                                            ${percentage > 80 ? `
                                                <a href="/?lang=${lang}#pricing" class="text-arc-orange hover:text-red-500 font-semibold">
                                                    ${lang === 'ar' ? 'ترقية الخطة' : 'Upgrade Plan'}
                                                </a>
                                            ` : ''}
                                        </div>
                                    </div>
                                  `;
                                }).join('')}
                            </div>

                            <!-- Upgrade Notice -->
                            <div class="mt-8 bg-gradient-to-r from-arc-orange/10 to-red-500/10 border border-arc-orange/20 rounded-2xl p-6">
                                <div class="flex items-start">
                                    <i class="fas fa-info-circle text-arc-orange text-xl ${isRTL ? 'ml-4' : 'mr-4'} mt-1"></i>
                                    <div class="flex-1">
                                        <h4 class="font-semibold text-arc-gray mb-2">
                                            ${lang === 'ar' ? 'هل تحتاج المزيد من الموارد؟' : 'Need more resources?'}
                                        </h4>
                                        <p class="text-gray-600 mb-4">
                                            ${lang === 'ar' ? 'ترقية خطتك للحصول على موارد أكثر وميزات إضافية' : 'Upgrade your plan to get more resources and additional features'}
                                        </p>
                                        <a href="/?lang=${lang}#pricing" class="inline-flex items-center bg-arc-orange text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-500 transition-colors">
                                            <i class="fas fa-rocket ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                            ${lang === 'ar' ? 'ترقية الآن' : 'Upgrade Now'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Other tabs content (simplified for length) -->
                    ${['billing', 'settings', 'security'].map(tab => `
                        <div id="${tab}-content" class="tab-content hidden">
                            <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
                                <i class="fas fa-${tab === 'billing' ? 'credit-card' : tab === 'settings' ? 'cog' : 'shield-alt'} text-6xl text-gray-300 mb-4"></i>
                                <h2 class="text-2xl font-bold text-arc-gray mb-4">
                                    ${tab === 'billing' ? (lang === 'ar' ? 'الفواتير والدفع' : 'Billing & Payment') :
                                      tab === 'settings' ? (lang === 'ar' ? 'إعدادات الحساب' : 'Account Settings') :
                                      (lang === 'ar' ? 'الأمان والخصوصية' : 'Security & Privacy')}
                                </h2>
                                <p class="text-gray-600 mb-8">
                                    ${lang === 'ar' ? 'هذا القسم قيد التطوير وسيكون متاحاً قريباً' : 'This section is under development and will be available soon'}
                                </p>
                                <div class="flex justify-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                                    <button class="bg-arc-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-colors">
                                        ${lang === 'ar' ? 'قريباً' : 'Coming Soon'}
                                    </button>
                                    <a href="/contact?lang=${lang}" class="border-2 border-arc-blue text-arc-blue px-6 py-3 rounded-xl font-semibold hover:bg-arc-blue hover:text-white transition-colors">
                                        ${lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <script src="/static/app.js"></script>
        <script>
            function showTab(tabId) {
                // Hide all tab contents
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.add('hidden');
                });
                
                // Remove active class from all tab buttons
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.remove('bg-arc-blue', 'text-white');
                    btn.classList.add('text-gray-600', 'hover:bg-gray-100');
                });
                
                // Show selected tab content
                document.getElementById(tabId + '-content').classList.remove('hidden');
                
                // Add active class to selected tab button
                const activeBtn = document.getElementById(tabId + '-tab');
                activeBtn.classList.add('bg-arc-blue', 'text-white');
                activeBtn.classList.remove('text-gray-600', 'hover:bg-gray-100');
                
                // Animate usage bars if usage tab is selected
                if (tabId === 'usage') {
                    setTimeout(() => {
                        document.querySelectorAll('.usage-bar').forEach(bar => {
                            const width = bar.style.width;
                            bar.style.width = '0%';
                            setTimeout(() => {
                                bar.style.width = width;
                            }, 100);
                        });
                    }, 100);
                }
            }
        </script>
    </body>
    </html>
  `);
});

// Enhanced Login page
app.get('/login', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  const languages = getSupportedLanguages();
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t.nav.login} - ${t.hero.title}</title>
        
        <!-- SEO Meta Tags -->
        <meta name="description" content="${lang === 'ar'
          ? 'تسجيل الدخول إلى حسابك في ARC - الوصول السريع لجميع أدواتك وتقاريرك المحفوظة. دعم العربية الكامل وحماية متقدمة'
          : 'Login to your ARC account - quick access to all your tools and saved reports. Complete Arabic support and advanced security'}">
        
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: '${t.nav.login}',
            page_location: window.location.href,
            language: '${lang}'
          });
          
          function trackLoginMethod(method) {
            gtag('event', 'login_method', {
              event_category: 'Authentication',
              event_label: method,
              language: '${lang}'
            });
          }
        </script>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #5A9BD5 0%, #EA6700 100%); }
          .glass-effect { backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.1); }
        </style>
    </head>
    <body class="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-screen ${isRTL ? 'rtl' : ''}">
        <!-- Navigation -->
        <nav class="bg-white/10 backdrop-blur-sm border-b border-white/20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/?lang=${lang}" class="flex items-center">
                            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'} shadow-lg">
                                <div class="w-6 h-6 relative">
                                    <div class="absolute w-4 h-4 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                            <span class="text-xl font-bold text-white">ARC</span>
                        </a>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <div class="relative group">
                            <button class="flex items-center text-white/90 hover:text-white transition-colors">
                                <i class="fas fa-globe ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${languages.find(l => l.code === lang)?.nativeName || 'English'}
                                <i class="fas fa-chevron-down ${isRTL ? 'mr-2' : 'ml-2'} text-xs"></i>
                            </button>
                            <div class="absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                ${languages.map(l => `
                                    <a href="/login?lang=${l.code}" class="block px-4 py-2 text-sm text-arc-gray hover:bg-gray-100 hover:text-arc-blue">
                                        ${l.nativeName}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                        <a href="/?lang=${lang}" class="text-white/90 hover:text-white transition-colors">${t.nav.home}</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Main Login Section -->
        <div class="min-h-screen flex items-center justify-center px-4 py-12">
            <div class="max-w-6xl w-full">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    
                    <!-- Left Side - Branding & Benefits -->
                    <div class="text-center lg:text-${isRTL ? 'right' : 'left'} text-white">
                        <!-- Logo Animation -->
                        <div class="mb-8 flex justify-center lg:justify-${isRTL ? 'end' : 'start'}">
                            <div class="w-32 h-32 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-2xl animate-pulse">
                                <div class="w-20 h-20 relative">
                                    <div class="absolute w-12 h-12 bg-gradient-to-r from-arc-orange to-red-500 rounded-full animate-bounce"></div>
                                    <div class="absolute top-2 ${isRTL ? 'left-6' : 'right-6'} w-6 h-6 bg-gradient-to-r from-arc-green to-emerald-500 rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-3 h-3 bg-arc-blue rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        <h1 class="text-4xl md:text-5xl font-bold mb-6">
                            <span class="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                                ${lang === 'ar' ? 'مرحباً بعودتك!' : 'Welcome Back!'}
                            </span>
                        </h1>
                        <p class="text-xl text-white/90 mb-8 leading-relaxed">
                            ${lang === 'ar' 
                              ? 'استكمل رحلتك في عالم تقارير Oracle APEX المذهلة مع أدواتك المحفوظة وإعداداتك الشخصية'
                              : 'Continue your Oracle APEX reporting journey with your saved tools and personal settings'
                            }
                        </p>

                        <!-- Benefits -->
                        <div class="space-y-4 mb-8">
                            ${[
                              { icon: 'fas fa-chart-line', text: lang === 'ar' ? 'تقاريرك المحفوظة' : 'Your saved reports' },
                              { icon: 'fas fa-cog', text: lang === 'ar' ? 'الإعدادات الشخصية' : 'Personal settings' },
                              { icon: 'fas fa-cloud', text: lang === 'ar' ? 'النسخ الاحتياطي السحابي' : 'Cloud backup' },
                              { icon: 'fas fa-users', text: lang === 'ar' ? 'فرق العمل المشتركة' : 'Team collaboration' }
                            ].map(item => `
                                <div class="flex items-center justify-center lg:justify-${isRTL ? 'end' : 'start'} space-x-3 ${isRTL ? 'space-x-reverse' : ''}">
                                    <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <i class="${item.icon} text-sm"></i>
                                    </div>
                                    <span class="text-white/90">${item.text}</span>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Trust Indicators -->
                        <div class="flex items-center justify-center lg:justify-${isRTL ? 'end' : 'start'} space-x-6 ${isRTL ? 'space-x-reverse' : ''} text-sm">
                            <div class="flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}">
                                <i class="fas fa-shield-alt text-arc-green"></i>
                                <span>${lang === 'ar' ? 'حماية متقدمة' : 'Advanced Security'}</span>
                            </div>
                            <div class="flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}">
                                <i class="fas fa-clock text-arc-blue"></i>
                                <span>${lang === 'ar' ? 'متوفر 24/7' : 'Available 24/7'}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Right Side - Login Forms -->
                    <div class="max-w-md mx-auto lg:mx-0 lg:${isRTL ? 'mr' : 'ml'}-auto">
                        <div class="glass-effect rounded-3xl p-8 shadow-2xl border border-white/20">
                            
                            <!-- Header -->
                            <div class="text-center mb-8">
                                <h2 class="text-2xl font-bold text-white mb-2">${t.nav.login}</h2>
                                <p class="text-white/80">${lang === 'ar' ? 'اختر طريقة تسجيل الدخول المفضلة لك' : 'Choose your preferred login method'}</p>
                            </div>

                            <!-- Quick Login Options -->
                            <div class="space-y-4 mb-8">
                                <!-- Main App Login -->
                                <a 
                                    href="https://app.apex-reportcraft.com/login" 
                                    target="_blank"
                                    onclick="trackLoginMethod('main_app')"
                                    class="w-full group relative bg-gradient-to-r from-arc-blue to-blue-600 text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 text-center block font-semibold overflow-hidden"
                                >
                                    <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-arc-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div class="relative flex items-center justify-center">
                                        <i class="fas fa-rocket ${isRTL ? 'ml-3' : 'mr-3'} text-lg"></i>
                                        ${lang === 'ar' ? '🚀 دخول للتطبيق الرئيسي' : '🚀 Login to Main App'}
                                    </div>
                                </a>

                                <!-- Social Login Options -->
                                <div class="grid grid-cols-2 gap-3">
                                    <button onclick="trackLoginMethod('google')" class="flex items-center justify-center px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-colors border border-white/30">
                                        <i class="fab fa-google ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                        <span class="text-sm font-medium">Google</span>
                                    </button>
                                    <button onclick="trackLoginMethod('microsoft')" class="flex items-center justify-center px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-colors border border-white/30">
                                        <i class="fab fa-microsoft ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                        <span class="text-sm font-medium">Microsoft</span>
                                    </button>
                                </div>
                                
                                <!-- Additional Options -->
                                <div class="grid grid-cols-2 gap-3">
                                    <button onclick="trackLoginMethod('github')" class="flex items-center justify-center px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-colors border border-white/30">
                                        <i class="fab fa-github ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                        <span class="text-sm font-medium">GitHub</span>
                                    </button>
                                    <button onclick="trackLoginMethod('linkedin')" class="flex items-center justify-center px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-colors border border-white/30">
                                        <i class="fab fa-linkedin ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                        <span class="text-sm font-medium">LinkedIn</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Divider -->
                            <div class="relative my-6">
                                <div class="absolute inset-0 flex items-center">
                                    <div class="w-full border-t border-white/30"></div>
                                </div>
                                <div class="relative flex justify-center text-sm">
                                    <span class="px-4 bg-transparent text-white/70">${lang === 'ar' ? 'أو' : 'OR'}</span>
                                </div>
                            </div>

                            <!-- Alternative Options -->
                            <div class="space-y-4">
                                <!-- Demo Access -->
                                <a href="https://demo.apex-reportcraft.com" target="_blank" class="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-6 rounded-xl hover:bg-white/30 transition-colors text-center block font-medium border border-white/30">
                                    <i class="fas fa-play-circle ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                    ${lang === 'ar' ? '🎮 جرب العرض التوضيحي' : '🎮 Try Demo Version'}
                                </a>
                                
                                <!-- Help -->
                                <a href="/help?lang=${lang}" class="w-full bg-transparent text-white/90 py-3 px-6 rounded-xl hover:bg-white/10 transition-colors text-center block font-medium border border-white/30">
                                    <i class="fas fa-question-circle ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                    ${lang === 'ar' ? '❓ تحتاج مساعدة؟' : '❓ Need Help?'}
                                </a>
                            </div>

                            <!-- Footer Links -->
                            <div class="mt-8 text-center space-y-2">
                                <p class="text-sm text-white/70">
                                    ${lang === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}
                                    <a href="/signup?lang=${lang}" class="text-white font-semibold hover:text-blue-200 transition-colors">
                                        ${t.nav.signup}
                                    </a>
                                </p>
                                <div class="flex justify-center space-x-4 ${isRTL ? 'space-x-reverse' : ''} text-xs">
                                    <a href="/?lang=${lang}" class="text-white/60 hover:text-white transition-colors">
                                        ${lang === 'ar' ? 'الرئيسية' : 'Home'}
                                    </a>
                                    <span class="text-white/40">•</span>
                                    <a href="/about?lang=${lang}" class="text-white/60 hover:text-white transition-colors">
                                        ${lang === 'ar' ? 'من نحن' : 'About'}
                                    </a>
                                    <span class="text-white/40">•</span>
                                    <a href="/contact?lang=${lang}" class="text-white/60 hover:text-white transition-colors">
                                        ${lang === 'ar' ? 'تواصل معنا' : 'Contact'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Decorative Elements -->
        <div class="fixed top-20 ${isRTL ? 'right-10' : 'left-10'} w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
        <div class="fixed bottom-20 ${isRTL ? 'left-20' : 'right-20'} w-32 h-32 bg-arc-orange/10 rounded-full animate-bounce"></div>
        
        <script src="/static/app.js"></script>
    </body>
    </html>
  `);
});

// Help page
app.get('/help', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  const languages = getSupportedLanguages();
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${lang === 'ar' ? 'مركز المساعدة' : 'Help Center'} - ${t.hero.title}</title>
        
        <!-- SEO Meta Tags -->
        <meta name="description" content="${lang === 'ar'
          ? 'مركز المساعدة الشامل لـ ARC - أدلة، دروس، أسئلة شائعة، وحلول تقنية. احصل على المساعدة في كل ما تحتاجه لإتقان استخدام ARC'
          : 'Complete ARC Help Center - guides, tutorials, FAQs, and technical solutions. Get help with everything you need to master ARC'}">
        
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: '${lang === 'ar' ? 'مركز المساعدة' : 'Help Center'}',
            page_location: window.location.href,
            language: '${lang}'
          });
        </script>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #5A9BD5 0%, #EA6700 100%); }
          .help-card:hover { transform: translateY(-4px); }
        </style>
    </head>
    <body class="bg-gray-50 ${isRTL ? 'rtl' : ''}">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/" class="flex items-center">
                            <div class="w-10 h-10 bg-arc-blue rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                                <div class="w-6 h-6 relative">
                                    <div class="absolute w-4 h-4 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                            <span class="text-xl font-bold text-arc-gray">ARC</span>
                        </a>
                    </div>
                    
                    <div class="hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}">
                        <a href="/?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.home}</a>
                        <a href="/?lang=${lang}#features" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.features}</a>
                        <a href="/?lang=${lang}#pricing" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.pricing}</a>
                        <a href="/about?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.footer.company.about}</a>
                        <a href="/help?lang=${lang}" class="text-arc-blue font-semibold">${lang === 'ar' ? 'المساعدة' : 'Help'}</a>
                        <a href="/contact?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.footer.support.contact}</a>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <div class="relative group">
                            <button class="flex items-center text-arc-gray hover:text-arc-blue transition-colors">
                                <i class="fas fa-globe ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${languages.find(l => l.code === lang)?.nativeName || 'English'}
                                <i class="fas fa-chevron-down ${isRTL ? 'mr-2' : 'ml-2'} text-xs"></i>
                            </button>
                            <div class="absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                ${languages.map(l => `
                                    <a href="/help?lang=${l.code}" class="block px-4 py-2 text-sm text-arc-gray hover:bg-gray-100 hover:text-arc-blue">
                                        ${l.nativeName}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="gradient-bg text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="mb-6">
                    <i class="fas fa-life-ring text-6xl mb-4 animate-pulse"></i>
                </div>
                <h1 class="text-4xl md:text-5xl font-bold mb-4">${lang === 'ar' ? '🆘 مركز المساعدة الشامل' : '🆘 Complete Help Center'}</h1>
                <p class="text-xl text-white/90 max-w-3xl mx-auto mb-8">${lang === 'ar' ? 'كل ما تحتاجه للنجاح مع ARC - من البداية إلى الاحتراف' : 'Everything you need to succeed with ARC - from beginner to expert'}</p>
                
                <!-- Search Bar -->
                <div class="max-w-2xl mx-auto relative">
                    <div class="flex">
                        <input 
                            type="text" 
                            placeholder="${lang === 'ar' ? 'ابحث عن المساعدة...' : 'Search for help...'}" 
                            class="flex-1 px-6 py-4 rounded-${isRTL ? 'r' : 'l'}-xl border-0 focus:ring-4 focus:ring-white/20 text-gray-900 text-lg"
                        >
                        <button class="bg-white text-arc-blue px-8 py-4 rounded-${isRTL ? 'l' : 'r'}-xl hover:bg-gray-100 transition-colors font-semibold">
                            <i class="fas fa-search ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                            ${lang === 'ar' ? 'بحث' : 'Search'}
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Quick Help Categories -->
        <section class="py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl font-bold text-arc-gray mb-12 text-center">${lang === 'ar' ? '🚀 ابدأ من هنا' : '🚀 Start Here'}</h2>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <!-- Getting Started -->
                    <div class="help-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 group cursor-pointer">
                        <div class="w-16 h-16 bg-gradient-to-r from-arc-blue to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <i class="fas fa-rocket text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-arc-gray mb-3 group-hover:text-arc-blue transition-colors">${lang === 'ar' ? 'البدء السريع' : 'Quick Start'}</h3>
                        <p class="text-gray-600 text-sm mb-4">${lang === 'ar' ? 'تعلم أساسيات ARC في 5 دقائق' : 'Learn ARC basics in 5 minutes'}</p>
                        <div class="text-arc-blue font-semibold text-sm flex items-center">
                            ${lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                            <i class="fas fa-arrow-${isRTL ? 'left' : 'right'} ${isRTL ? 'mr-2' : 'ml-2'} group-hover:translate-x-1 transition-transform"></i>
                        </div>
                    </div>

                    <!-- Tutorials -->
                    <div class="help-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 group cursor-pointer">
                        <div class="w-16 h-16 bg-gradient-to-r from-arc-green to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <i class="fas fa-graduation-cap text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-arc-gray mb-3 group-hover:text-arc-green transition-colors">${lang === 'ar' ? 'دروس تفاعلية' : 'Interactive Tutorials'}</h3>
                        <p class="text-gray-600 text-sm mb-4">${lang === 'ar' ? 'دروس خطوة بخطوة مع أمثلة عملية' : 'Step-by-step tutorials with examples'}</p>
                        <div class="text-arc-green font-semibold text-sm flex items-center">
                            ${lang === 'ar' ? 'تصفح الدروس' : 'Browse Tutorials'}
                            <i class="fas fa-arrow-${isRTL ? 'left' : 'right'} ${isRTL ? 'mr-2' : 'ml-2'} group-hover:translate-x-1 transition-transform"></i>
                        </div>
                    </div>

                    <!-- FAQ -->
                    <div class="help-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 group cursor-pointer">
                        <div class="w-16 h-16 bg-gradient-to-r from-arc-orange to-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <i class="fas fa-question-circle text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-arc-gray mb-3 group-hover:text-arc-orange transition-colors">${lang === 'ar' ? 'أسئلة شائعة' : 'FAQ'}</h3>
                        <p class="text-gray-600 text-sm mb-4">${lang === 'ar' ? 'إجابات سريعة لأكثر الأسئلة شيوعاً' : 'Quick answers to common questions'}</p>
                        <div class="text-arc-orange font-semibold text-sm flex items-center">
                            ${lang === 'ar' ? 'تصفح الأسئلة' : 'View FAQ'}
                            <i class="fas fa-arrow-${isRTL ? 'left' : 'right'} ${isRTL ? 'mr-2' : 'ml-2'} group-hover:translate-x-1 transition-transform"></i>
                        </div>
                    </div>

                    <!-- Video Guides -->
                    <div class="help-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 group cursor-pointer">
                        <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <i class="fas fa-play-circle text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-arc-gray mb-3 group-hover:text-purple-600 transition-colors">${lang === 'ar' ? 'فيديوهات تعليمية' : 'Video Guides'}</h3>
                        <p class="text-gray-600 text-sm mb-4">${lang === 'ar' ? 'شاهد كيفية استخدام ARC خطوة بخطوة' : 'Watch how to use ARC step by step'}</p>
                        <div class="text-purple-600 font-semibold text-sm flex items-center">
                            ${lang === 'ar' ? 'مشاهدة الفيديوهات' : 'Watch Videos'}
                            <i class="fas fa-arrow-${isRTL ? 'left' : 'right'} ${isRTL ? 'mr-2' : 'ml-2'} group-hover:translate-x-1 transition-transform"></i>
                        </div>
                    </div>
                </div>

                <!-- Popular Help Topics -->
                <div class="bg-white rounded-2xl p-8 shadow-lg">
                    <h3 class="text-2xl font-bold text-arc-gray mb-8 flex items-center">
                        <i class="fas fa-fire text-arc-orange ${isRTL ? 'ml-3' : 'mr-3'}"></i>
                        ${lang === 'ar' ? 'المواضيع الأكثر بحثاً' : 'Most Popular Topics'}
                    </h3>
                    
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${[
                          { icon: 'fas fa-cog', title: lang === 'ar' ? 'إعداد ARC لأول مرة' : 'Setting up ARC for first time', views: '15,247' },
                          { icon: 'fas fa-database', title: lang === 'ar' ? 'ربط قاعدة البيانات' : 'Connecting your database', views: '12,891' },
                          { icon: 'fas fa-chart-line', title: lang === 'ar' ? 'إنشاء تقرير تفاعلي' : 'Creating interactive reports', views: '10,563' },
                          { icon: 'fas fa-palette', title: lang === 'ar' ? 'تخصيص التقارير' : 'Customizing reports', views: '8,942' },
                          { icon: 'fas fa-share-alt', title: lang === 'ar' ? 'مشاركة التقارير' : 'Sharing reports', views: '7,234' },
                          { icon: 'fas fa-mobile-alt', title: lang === 'ar' ? 'التقارير المتجاوبة' : 'Responsive reports', views: '6,128' }
                        ].map(topic => `
                            <div class="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                                <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center ${isRTL ? 'ml-4' : 'mr-4'} group-hover:bg-arc-blue group-hover:text-white transition-colors">
                                    <i class="${topic.icon} text-sm"></i>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-semibold text-arc-gray group-hover:text-arc-blue transition-colors mb-1">${topic.title}</h4>
                                    <p class="text-xs text-gray-500">${topic.views} ${lang === 'ar' ? 'مشاهدة' : 'views'}</p>
                                </div>
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} text-gray-400 group-hover:text-arc-blue transition-colors"></i>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Support -->
        <section class="py-16 bg-gradient-to-r from-arc-blue to-arc-orange text-white">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-3xl font-bold mb-4">${lang === 'ar' ? '💬 هل تحتاج المزيد من المساعدة؟' : '💬 Need More Help?'}</h2>
                <p class="text-xl mb-8 text-white/90">${lang === 'ar' ? 'فريق الدعم الفني جاهز لمساعدتك 24/7' : 'Our support team is ready to help you 24/7'}</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/contact?lang=${lang}" class="bg-white text-arc-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        <i class="fas fa-envelope ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                        ${lang === 'ar' ? 'تواصل معنا' : 'Contact Support'}
                    </a>
                    <a href="https://community.apex-reportcraft.com" target="_blank" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-arc-blue transition-colors">
                        <i class="fas fa-comments ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                        ${lang === 'ar' ? 'انضم للمجتمع' : 'Join Community'}
                    </a>
                </div>
            </div>
        </section>

        <script src="/static/app.js"></script>
    </body>
    </html>
  `);
});

// Contact page
app.get('/contact', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  const languages = getSupportedLanguages();
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t.contact.title} - ${t.hero.title}</title>
        
        <!-- SEO Meta Tags -->
        <meta name="description" content="${lang === 'ar'
          ? 'تواصل مع فريق Apex ReportCraft - دعم 24/7، استشارات تقنية، ومساعدة في تطوير تقاريرك. نحن هنا لمساعدتك في كل خطوة'
          : 'Contact Apex ReportCraft team - 24/7 support, technical consultations, and help developing your reports. We are here to help you every step of the way'}">
        
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: '${t.contact.title}',
            page_location: window.location.href,
            language: '${lang}'
          });
          
          // Track form submissions
          function trackContactForm() {
            gtag('event', 'form_submit', {
              event_category: 'Contact',
              event_label: 'contact_form',
              language: '${lang}'
            });
          }
        </script>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #5A9BD5 0%, #EA6700 100%); }
        </style>
    </head>
    <body class="bg-gray-50 ${isRTL ? 'rtl' : ''}">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/" class="flex items-center">
                            <div class="w-10 h-10 bg-arc-blue rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                                <div class="w-6 h-6 relative">
                                    <div class="absolute w-4 h-4 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                            <span class="text-xl font-bold text-arc-gray">ARC</span>
                        </a>
                    </div>
                    
                    <div class="hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}">
                        <a href="/" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.home}</a>
                        <a href="/#features" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.features}</a>
                        <a href="/#pricing" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.pricing}</a>
                        <a href="/about" class="text-arc-gray hover:text-arc-blue transition-colors">${t.footer.company.about}</a>
                        <a href="/vision" class="text-arc-gray hover:text-arc-blue transition-colors">${lang === 'ar' ? 'رؤيتنا' : 'Vision'}</a>
                        <a href="/blog?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.footer.company.blog}</a>
                        <a href="/contact" class="text-arc-blue font-semibold">${t.footer.support.contact}</a>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <div class="relative group">
                            <button class="flex items-center text-arc-gray hover:text-arc-blue transition-colors">
                                <i class="fas fa-globe ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${languages.find(l => l.code === lang)?.nativeName || 'English'}
                                <i class="fas fa-chevron-down ${isRTL ? 'mr-2' : 'ml-2'} text-xs"></i>
                            </button>
                            <div class="absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                ${languages.map(l => `
                                    <a href="/contact?lang=${l.code}" class="block px-4 py-2 text-sm text-arc-gray hover:bg-gray-100 hover:text-arc-blue">
                                        ${l.nativeName}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="gradient-bg text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">${t.contact.title}</h1>
                <p class="text-xl text-white/90 max-w-3xl mx-auto">${t.contact.subtitle}</p>
            </div>
        </section>

        <!-- Contact Content -->
        <section class="py-20">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-12">
                    <!-- Contact Form -->
                    <div class="bg-white rounded-xl p-8 shadow-lg">
                        <h2 class="text-2xl font-bold text-arc-gray mb-6">${lang === 'ar' ? 'أرسل لنا رسالة' : 'Send us a message'}</h2>
                        <form class="space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">${t.contact.form.name}</label>
                                <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-arc-blue focus:border-arc-blue" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">${t.contact.form.email}</label>
                                <input type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-arc-blue focus:border-arc-blue" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">${t.contact.form.subject}</label>
                                <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-arc-blue focus:border-arc-blue" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">${t.contact.form.message}</label>
                                <textarea rows="6" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-arc-blue focus:border-arc-blue" required></textarea>
                            </div>
                            <button type="submit" class="w-full bg-arc-blue text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors font-semibold">
                                <i class="fas fa-paper-plane ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${t.contact.form.send}
                            </button>
                        </form>
                    </div>
                    
                    <!-- Contact Info -->
                    <div class="space-y-8">
                        <div class="bg-white rounded-xl p-8 shadow-lg">
                            <h3 class="text-xl font-semibold text-arc-gray mb-6">${lang === 'ar' ? 'معلومات التواصل' : 'Contact Information'}</h3>
                            <div class="space-y-4">
                                <div class="flex items-center">
                                    <i class="fas fa-map-marker-alt text-arc-blue text-xl ${isRTL ? 'ml-4' : 'mr-4'}"></i>
                                    <span class="text-gray-600">${t.contact.info.address}</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-phone text-arc-green text-xl ${isRTL ? 'ml-4' : 'mr-4'}"></i>
                                    <span class="text-gray-600">${t.contact.info.phone}</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-envelope text-arc-orange text-xl ${isRTL ? 'ml-4' : 'mr-4'}"></i>
                                    <span class="text-gray-600">${t.contact.info.email}</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-clock text-arc-gray text-xl ${isRTL ? 'ml-4' : 'mr-4'}"></i>
                                    <span class="text-gray-600">${t.contact.info.hours}</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Quick Links -->
                        <div class="bg-white rounded-xl p-8 shadow-lg">
                            <h3 class="text-xl font-semibold text-arc-gray mb-6">${lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h3>
                            <div class="space-y-3">
                                <a href="/#features" class="flex items-center text-arc-gray hover:text-arc-blue transition-colors">
                                    <i class="fas fa-star ${isRTL ? 'ml-3' : 'mr-3'}"></i>
                                    ${t.nav.features}
                                </a>
                                <a href="/#pricing" class="flex items-center text-arc-gray hover:text-arc-blue transition-colors">
                                    <i class="fas fa-tag ${isRTL ? 'ml-3' : 'mr-3'}"></i>
                                    ${t.nav.pricing}
                                </a>
                                <a href="/about" class="flex items-center text-arc-gray hover:text-arc-blue transition-colors">
                                    <i class="fas fa-info-circle ${isRTL ? 'ml-3' : 'mr-3'}"></i>
                                    ${t.footer.company.about}
                                </a>
                                <a href="/#community" class="flex items-center text-arc-gray hover:text-arc-blue transition-colors">
                                    <i class="fas fa-users ${isRTL ? 'ml-3' : 'mr-3'}"></i>
                                    ${t.nav.community}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <script src="/static/app.js"></script>
    </body>
    </html>
  `);
});

// 404 Not Found page
app.notFound((c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  const languages = getSupportedLanguages();
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${lang === 'ar' ? 'الصفحة غير موجودة - 404' : 'Page Not Found - 404'} - ${t.hero.title}</title>
        
        <!-- SEO Meta Tags -->
        <meta name="description" content="${lang === 'ar'
          ? 'عذراً، الصفحة التي تبحث عنها غير موجودة. تصفح صفحاتنا الأخرى أو ابحث عما تحتاجه في ARC'
          : 'Sorry, the page you are looking for does not exist. Browse our other pages or search for what you need in ARC'}">
        <meta name="robots" content="noindex, nofollow">
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #5A9BD5 0%, #EA6700 100%); }
          .float-404 { animation: float404 4s ease-in-out infinite; }
          @keyframes float404 { 
            0%, 100% { transform: translateY(0px) rotate(0deg); } 
            50% { transform: translateY(-20px) rotate(5deg); } 
          }
          .pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }
          @keyframes pulseGlow { 
            0%, 100% { box-shadow: 0 0 20px rgba(90, 155, 213, 0.3); } 
            50% { box-shadow: 0 0 40px rgba(234, 103, 0, 0.5); } 
          }
        </style>
    </head>
    <body class="bg-gradient-to-br from-slate-100 via-blue-50 to-orange-50 min-h-screen ${isRTL ? 'rtl' : ''}">
        <!-- Navigation -->
        <nav class="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/?lang=${lang}" class="flex items-center">
                            <div class="w-10 h-10 bg-arc-blue rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'} pulse-glow">
                                <div class="w-6 h-6 relative">
                                    <div class="absolute w-4 h-4 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                            <span class="text-xl font-bold text-arc-gray">ARC</span>
                        </a>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <div class="relative group">
                            <button class="flex items-center text-arc-gray hover:text-arc-blue transition-colors">
                                <i class="fas fa-globe ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${languages.find(l => l.code === lang)?.nativeName || 'English'}
                                <i class="fas fa-chevron-down ${isRTL ? 'mr-2' : 'ml-2'} text-xs"></i>
                            </button>
                            <div class="absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                ${languages.map(l => `
                                    <a href="/?lang=${l.code}" class="block px-4 py-2 text-sm text-arc-gray hover:bg-gray-100 hover:text-arc-blue">
                                        ${l.nativeName}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                        <a href="/?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.home}</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Main 404 Content -->
        <div class="min-h-screen flex items-center justify-center px-4 py-20">
            <div class="max-w-4xl mx-auto text-center">
                
                <!-- 404 Animation -->
                <div class="mb-12">
                    <div class="float-404 inline-block">
                        <div class="text-8xl md:text-9xl font-black bg-gradient-to-r from-arc-blue via-arc-orange to-arc-green bg-clip-text text-transparent">
                            404
                        </div>
                    </div>
                    <div class="mt-4 flex justify-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <div class="w-4 h-4 bg-arc-blue rounded-full animate-bounce"></div>
                        <div class="w-4 h-4 bg-arc-orange rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
                        <div class="w-4 h-4 bg-arc-green rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
                    </div>
                </div>

                <!-- Error Message -->
                <div class="mb-12">
                    <h1 class="text-3xl md:text-4xl font-bold text-arc-gray mb-4">
                        ${lang === 'ar' 
                          ? '🤔 عذراً، الصفحة غير موجودة!' 
                          : '🤔 Oops! Page Not Found!'
                        }
                    </h1>
                    <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        ${lang === 'ar'
                          ? 'يبدو أن الصفحة التي تبحث عنها قد انتقلت أو لم تعد موجودة. لا تقلق، سنساعدك في العثور على ما تحتاجه!'
                          : 'It looks like the page you are looking for has moved or no longer exists. Don\'t worry, we\'ll help you find what you need!'
                        }
                    </p>
                </div>

                <!-- Quick Navigation -->
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <!-- Home -->
                    <a href="/?lang=${lang}" class="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-arc-blue transform hover:scale-105">
                        <div class="w-12 h-12 bg-gradient-to-r from-arc-blue to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <i class="fas fa-home text-white text-lg"></i>
                        </div>
                        <h3 class="font-semibold text-arc-gray group-hover:text-arc-blue transition-colors mb-2">
                            ${lang === 'ar' ? 'الصفحة الرئيسية' : 'Home Page'}
                        </h3>
                        <p class="text-sm text-gray-600">
                            ${lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Back to main page'}
                        </p>
                    </a>

                    <!-- Features -->
                    <a href="/?lang=${lang}#features" class="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-arc-green transform hover:scale-105">
                        <div class="w-12 h-12 bg-gradient-to-r from-arc-green to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <i class="fas fa-star text-white text-lg"></i>
                        </div>
                        <h3 class="font-semibold text-arc-gray group-hover:text-arc-green transition-colors mb-2">
                            ${lang === 'ar' ? 'المميزات' : 'Features'}
                        </h3>
                        <p class="text-sm text-gray-600">
                            ${lang === 'ar' ? 'اكتشف مميزات ARC' : 'Discover ARC features'}
                        </p>
                    </a>

                    <!-- Pricing -->
                    <a href="/?lang=${lang}#pricing" class="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 hover:border-arc-orange transform hover:scale-105">
                        <div class="w-12 h-12 bg-gradient-to-r from-arc-orange to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <i class="fas fa-tag text-white text-lg"></i>
                        </div>
                        <h3 class="font-semibold text-arc-gray group-hover:text-arc-orange transition-colors mb-2">
                            ${lang === 'ar' ? 'الأسعار' : 'Pricing'}
                        </h3>
                        <p class="text-sm text-gray-600">
                            ${lang === 'ar' ? 'خطط الأسعار المختلفة' : 'View pricing plans'}
                        </p>
                    </a>

                    <!-- Help -->
                    <a href="/help?lang=${lang}" class="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-500 transform hover:scale-105">
                        <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <i class="fas fa-life-ring text-white text-lg"></i>
                        </div>
                        <h3 class="font-semibold text-arc-gray group-hover:text-purple-600 transition-colors mb-2">
                            ${lang === 'ar' ? 'المساعدة' : 'Help Center'}
                        </h3>
                        <p class="text-sm text-gray-600">
                            ${lang === 'ar' ? 'احصل على المساعدة' : 'Get help and support'}
                        </p>
                    </a>
                </div>

                <!-- Search Section -->
                <div class="bg-white rounded-2xl p-8 shadow-xl mb-12 border border-gray-100">
                    <h3 class="text-xl font-bold text-arc-gray mb-6 flex items-center justify-center">
                        <i class="fas fa-search text-arc-blue ${isRTL ? 'ml-3' : 'mr-3'}"></i>
                        ${lang === 'ar' ? 'ابحث عما تريد' : 'Search for what you need'}
                    </h3>
                    <div class="max-w-md mx-auto">
                        <div class="flex">
                            <input 
                                type="text" 
                                placeholder="${lang === 'ar' ? 'ابحث في ARC...' : 'Search ARC...'}" 
                                class="flex-1 px-6 py-3 border border-gray-300 rounded-${isRTL ? 'r' : 'l'}-xl focus:ring-2 focus:ring-arc-blue focus:border-arc-blue transition-colors"
                            >
                            <button class="bg-gradient-to-r from-arc-blue to-blue-600 text-white px-6 py-3 rounded-${isRTL ? 'l' : 'r'}-xl hover:shadow-lg transition-all font-semibold">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Popular Links -->
                <div class="bg-gradient-to-r from-arc-blue/10 to-arc-orange/10 rounded-2xl p-8 border border-arc-blue/20">
                    <h3 class="text-xl font-bold text-arc-gray mb-6">
                        ${lang === 'ar' ? '🔥 الروابط الأكثر زيارة' : '🔥 Popular Links'}
                    </h3>
                    <div class="flex flex-wrap justify-center gap-4">
                        ${[
                          { href: '/signup?lang=' + lang, text: lang === 'ar' ? 'إنشاء حساب جديد' : 'Create Account', icon: 'fas fa-user-plus' },
                          { href: '/login?lang=' + lang, text: lang === 'ar' ? 'تسجيل الدخول' : 'Login', icon: 'fas fa-sign-in-alt' },
                          { href: '/about?lang=' + lang, text: lang === 'ar' ? 'من نحن' : 'About Us', icon: 'fas fa-info-circle' },
                          { href: '/blog?lang=' + lang, text: lang === 'ar' ? 'المدونة' : 'Blog', icon: 'fas fa-blog' },
                          { href: '/contact?lang=' + lang, text: lang === 'ar' ? 'تواصل معنا' : 'Contact', icon: 'fas fa-envelope' }
                        ].map(link => `
                            <a href="${link.href}" class="inline-flex items-center px-4 py-2 bg-white text-arc-gray rounded-lg hover:bg-arc-blue hover:text-white transition-all shadow-md hover:shadow-lg">
                                <i class="${link.icon} ${isRTL ? 'ml-2' : 'mr-2'} text-sm"></i>
                                ${link.text}
                            </a>
                        `).join('')}
                    </div>
                </div>

                <!-- Report Issue -->
                <div class="mt-12 text-center">
                    <p class="text-gray-500 mb-4">
                        ${lang === 'ar' 
                          ? 'هل تعتقد أن هذه الصفحة يجب أن تكون موجودة؟'
                          : 'Think this page should exist?'
                        }
                    </p>
                    <a href="/contact?lang=${lang}" class="inline-flex items-center text-arc-blue hover:text-arc-orange transition-colors font-semibold">
                        <i class="fas fa-bug ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                        ${lang === 'ar' ? 'أبلغ عن المشكلة' : 'Report an Issue'}
                    </a>
                </div>
            </div>
        </div>

        <!-- Floating Elements -->
        <div class="fixed top-20 ${isRTL ? 'right-10' : 'left-10'} w-16 h-16 bg-arc-blue/10 rounded-full animate-pulse"></div>
        <div class="fixed bottom-20 ${isRTL ? 'left-10' : 'right-10'} w-20 h-20 bg-arc-orange/10 rounded-full animate-bounce"></div>
        
        <script src="/static/app.js"></script>
    </body>
    </html>
  `, 404);
});

// Main route with language support
app.get('/', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  const languages = getSupportedLanguages();
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t.hero.title} - ${t.hero.subtitle}</title>
        
        <!-- SEO Meta Tags -->
        <meta name="description" content="${lang === 'ar' 
          ? 'أول أداة تقارير Oracle APEX بالذكاء الاصطناعي مع دعم العربية الكامل. إنشاء تقارير مذهلة في دقائق مع مساعد AI ذكي وتكامل APEX أصلي. ابدأ مجاناً الآن!' 
          : 'First AI-powered Oracle APEX reporting tool with complete Arabic support. Create stunning reports in minutes with smart AI assistant and native APEX integration. Start free now!'}">
        <meta name="keywords" content="${lang === 'ar'
          ? 'Oracle APEX, تقارير, ذكاء اصطناعي, عربي, ARC, برمجة, قواعد بيانات, تطوير, مجاني'
          : 'Oracle APEX, reports, artificial intelligence, Arabic, ARC, programming, database, development, free'}">
        <meta name="author" content="Apex ReportCraft Team">
        <meta name="robots" content="index, follow">
        <meta name="language" content="${lang === 'ar' ? 'Arabic' : 'English'}">
        <meta name="revisit-after" content="7 days">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://apex-reportcraft.com/">
        <meta property="og:title" content="${t.hero.title} - ${t.hero.subtitle}">
        <meta property="og:description" content="${lang === 'ar'
          ? 'ثورة في عالم تقارير Oracle APEX! اكتشف قوة الذكاء الاصطناعي مع دعم العربية الكامل'
          : 'Revolution in Oracle APEX reporting! Discover AI-powered magic with complete Arabic support'}">
        <meta property="og:image" content="https://apex-reportcraft.com/images/og-image.jpg">
        <meta property="og:locale" content="${lang === 'ar' ? 'ar_SA' : 'en_US'}">
        <meta property="og:site_name" content="Apex ReportCraft (ARC)">
        
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:url" content="https://apex-reportcraft.com/">
        <meta name="twitter:title" content="${t.hero.title} - ${t.hero.subtitle}">
        <meta name="twitter:description" content="${lang === 'ar'
          ? 'أول أداة تقارير Oracle APEX بالذكاء الاصطناعي مع دعم العربية الكامل'
          : 'First AI-powered Oracle APEX reporting tool with complete Arabic support'}">
        <meta name="twitter:image" content="https://apex-reportcraft.com/images/twitter-card.jpg">
        <meta name="twitter:site" content="@apex_reportcraft">
        <meta name="twitter:creator" content="@apex_reportcraft">
        
        <!-- Additional SEO -->
        <link rel="canonical" href="https://apex-reportcraft.com/${lang !== 'en' ? '?lang=' + lang : ''}">
        <link rel="alternate" hreflang="ar" href="https://apex-reportcraft.com/?lang=ar">
        <link rel="alternate" hreflang="en" href="https://apex-reportcraft.com/?lang=en">
        <link rel="alternate" hreflang="x-default" href="https://apex-reportcraft.com/">
        
        <!-- Favicon -->
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: '${t.hero.title}',
            page_location: window.location.href,
            language: '${lang}',
            custom_map: {'custom_parameter_1': 'user_language'}
          });
          
          // Track chatbot usage
          function trackChatbot(action, label) {
            gtag('event', action, {
              event_category: 'Chatbot',
              event_label: label,
              language: '${lang}'
            });
          }
          
          // Track pricing clicks
          function trackPricing(plan) {
            gtag('event', 'pricing_click', {
              event_category: 'Pricing',
              event_label: plan,
              language: '${lang}'
            });
          }
        </script>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          body { font-family: 'Inter', sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #5A9BD5 0%, #EA6700 100%); }
          .text-gradient { background: linear-gradient(135deg, #5A9BD5, #EA6700); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          .rtl { direction: rtl; }
          .float-animation { animation: float 3s ease-in-out infinite; }
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        </style>
    </head>
    <body class="bg-gray-50 ${isRTL ? 'rtl' : ''}">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 flex items-center">
                            <div class="w-10 h-10 bg-arc-blue rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                                <div class="w-6 h-6 relative">
                                    <div class="absolute w-4 h-4 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                            <span class="text-xl font-bold text-arc-gray">ARC</span>
                        </div>
                    </div>
                    
                    <div class="hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}">
                        <a href="#home" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.home}</a>
                        <a href="#features" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.features}</a>
                        <a href="#pricing" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.pricing}</a>
                        <a href="/about?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.footer.company.about}</a>
                        <a href="/vision?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${lang === 'ar' ? 'رؤيتنا' : 'Vision'}</a>
                        <a href="/help?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${lang === 'ar' ? 'المساعدة' : 'Help'}</a>
                        <a href="/contact?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.footer.support.contact}</a>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <!-- Language Selector -->
                        <div class="relative group">
                            <button class="flex items-center text-arc-gray hover:text-arc-blue transition-colors">
                                <i class="fas fa-globe ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${languages.find(l => l.code === lang)?.nativeName || 'English'}
                                <i class="fas fa-chevron-down ${isRTL ? 'mr-2' : 'ml-2'} text-xs"></i>
                            </button>
                            <div class="absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                ${languages.map(l => `
                                    <a href="/?lang=${l.code}" class="block px-4 py-2 text-sm text-arc-gray hover:bg-gray-100 hover:text-arc-blue">
                                        ${l.nativeName}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                        
                        <a href="/blog?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.footer.company.blog}</a>
                        <a href="/signup?lang=${lang}" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.signup}</a>
                        <a href="https://app.apex-reportcraft.com/login" target="_blank" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.login}</a>
                        <a href="/signup?lang=${lang}" class="bg-arc-blue text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">${t.nav.getStarted}</a>
                        
                        <!-- Mobile menu button -->
                        <div class="md:hidden">
                            <button class="text-arc-gray hover:text-arc-blue">
                                <i class="fas fa-bars text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section - Enhanced with Better Visibility -->
        <section id="home" class="relative overflow-hidden">
            <!-- Enhanced Multi-layer Background for Better Text Visibility -->
            <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-arc-blue/80 via-blue-600/70 to-arc-orange/80"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse"></div>
            
            <!-- Floating Geometric Shapes for Visual Interest -->
            <div class="absolute top-20 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
            <div class="absolute bottom-32 right-1/3 w-48 h-48 bg-arc-orange/10 rounded-full blur-2xl animate-bounce"></div>
            <div class="absolute top-1/3 right-1/4 w-24 h-24 bg-arc-green/10 rounded-full blur-lg float-animation"></div>
            
            <div class="relative z-10">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div class="text-center">
                        <!-- Enhanced Logo Animation -->
                        <div class="float-animation mb-8 relative">
                            <div class="w-32 h-32 bg-gradient-to-r from-white to-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white/30 backdrop-blur-sm">
                                <div class="w-20 h-20 relative">
                                    <div class="absolute w-12 h-12 bg-gradient-to-r from-arc-orange to-red-500 rounded-full animate-pulse shadow-lg"></div>
                                    <div class="absolute top-2 ${isRTL ? 'left-6' : 'right-6'} w-6 h-6 bg-gradient-to-r from-arc-green to-emerald-500 rounded-full pulse-glow shadow-lg"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-3 h-3 bg-arc-blue rounded-full animate-bounce"></div>
                                </div>
                            </div>
                            <!-- Floating particles -->
                            <div class="absolute top-0 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
                            <div class="absolute top-8 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
                            <div class="absolute bottom-4 left-1/3 w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></div>
                        </div>
                        
                        <!-- Clean and Professional Typography -->
                        <h1 class="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl text-center">
                            <span class="inline-block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                ${t.hero.title}
                            </span>
                        </h1>
                        
                        <div class="text-2xl md:text-4xl font-bold mb-8 text-center">
                            <span class="inline-block text-white drop-shadow-xl">
                                ${t.hero.subtitle}
                            </span>
                        </div>
                        
                        <div class="max-w-4xl mx-auto mb-12 text-center">
                            <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
                                <p class="text-lg md:text-xl text-white font-medium leading-relaxed">
                                    ${t.hero.description}
                                </p>
                            </div>
                        </div>
                        
                        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <!-- Primary CTA with advanced styling -->
                            <a href="https://app.apex-reportcraft.com/signup" target="_blank" class="group relative bg-white text-arc-blue px-10 py-5 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-rotate-1">
                                <div class="absolute inset-0 bg-gradient-to-r from-arc-blue/10 to-arc-orange/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div class="relative flex items-center">
                                    <div class="w-8 h-8 bg-gradient-to-r from-arc-blue to-arc-orange rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'} group-hover:animate-spin">
                                        <i class="fas fa-rocket text-white text-sm"></i>
                                    </div>
                                    <span class="text-lg gradient-text-hover">${t.hero.ctaPrimary}</span>
                                </div>
                                <div class="absolute -top-1 -right-1 w-6 h-6 bg-arc-orange rounded-full flex items-center justify-center animate-pulse">
                                    <span class="text-white text-xs font-bold">!</span>
                                </div>
                            </a>
                            
                            <!-- Secondary CTA with glass effect -->
                            <a href="https://demo.apex-reportcraft.com" target="_blank" class="group relative glass-effect border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:rotate-1">
                                <div class="relative flex items-center">
                                    <div class="w-8 h-8 border-2 border-white/50 rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'} group-hover:border-white transition-colors">
                                        <i class="fas fa-play text-sm group-hover:animate-pulse"></i>
                                    </div>
                                    <span class="text-lg">${t.hero.ctaSecondary}</span>
                                </div>
                            </a>
                        </div>
                        
                        <!-- Trust indicators -->
                        <div class="mt-12 flex items-center justify-center space-x-8 ${isRTL ? 'space-x-reverse' : ''} opacity-80">
                            <div class="flex items-center text-white/90">
                                <i class="fas fa-users ${isRTL ? 'ml-2' : 'mr-2'} text-arc-green"></i>
                                <span class="font-semibold">100K+ ${lang === 'ar' ? 'مطور' : 'Developers'}</span>
                            </div>
                            <div class="flex items-center text-white/90">
                                <i class="fas fa-star ${isRTL ? 'ml-2' : 'mr-2'} text-yellow-400"></i>
                                <span class="font-semibold">4.9/5 ${lang === 'ar' ? 'تقييم' : 'Rating'}</span>
                            </div>
                            <div class="flex items-center text-white/90">
                                <i class="fas fa-shield-alt ${isRTL ? 'ml-2' : 'mr-2'} text-arc-blue"></i>
                                <span class="font-semibold">${lang === 'ar' ? 'آمن 100%' : '100% Secure'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Decorative elements -->
            <div class="absolute top-20 ${isRTL ? 'right-10' : 'left-10'} w-20 h-20 bg-white/10 rounded-full"></div>
            <div class="absolute bottom-20 ${isRTL ? 'left-20' : 'right-20'} w-32 h-32 bg-white/5 rounded-full"></div>
        </section>

        <!-- Features Section -->
        <section id="features" class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-arc-gray mb-4">${t.features.title}</h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">${t.features.subtitle}</p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Feature Card 1 - Enhanced -->
                    <div class="group relative bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 border border-blue-100 hover:border-arc-blue transform hover:scale-105 hover:-rotate-1">
                        <div class="absolute inset-0 bg-gradient-to-br from-arc-blue/5 to-arc-orange/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div class="relative">
                            <div class="w-16 h-16 bg-gradient-to-r from-arc-blue to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse shadow-lg">
                                <i class="fas fa-magic text-white text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold text-arc-gray mb-4 group-hover:text-arc-blue transition-colors">${t.features.easyToUse.title}</h3>
                            <p class="text-gray-600 leading-relaxed group-hover:text-gray-700">${t.features.easyToUse.description}</p>
                            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div class="w-8 h-8 bg-arc-blue/20 rounded-full flex items-center justify-center">
                                    <i class="fas fa-arrow-right text-arc-blue text-sm"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Feature Card 2 -->
                    <div class="group relative bg-gradient-to-br from-white to-orange-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 border border-orange-100 hover:border-arc-orange transform hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-br from-arc-orange/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div class="relative">
                            <div class="w-16 h-16 bg-gradient-to-r from-arc-orange to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce shadow-lg">
                                <i class="fas fa-brain text-white text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold text-arc-gray mb-4 group-hover:text-arc-orange transition-colors">${t.features.apexNative.title}</h3>
                            <p class="text-gray-600 leading-relaxed group-hover:text-gray-700">${t.features.apexNative.description}</p>
                            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div class="w-8 h-8 bg-arc-orange/20 rounded-full flex items-center justify-center">
                                    <i class="fas fa-lightbulb text-arc-orange text-sm"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Feature Card 3 -->
                    <div class="group relative bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 border border-green-100 hover:border-arc-green transform hover:scale-105 hover:rotate-1">
                        <div class="absolute inset-0 bg-gradient-to-br from-arc-green/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div class="relative">
                            <div class="w-16 h-16 bg-gradient-to-r from-arc-green to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse shadow-lg">
                                <i class="fas fa-globe text-white text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold text-arc-gray mb-4 group-hover:text-arc-green transition-colors">${t.features.quickLearning.title}</h3>
                            <p class="text-gray-600 leading-relaxed group-hover:text-gray-700">${t.features.quickLearning.description}</p>
                            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div class="w-8 h-8 bg-arc-green/20 rounded-full flex items-center justify-center">
                                    <i class="fas fa-check text-arc-green text-sm"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Feature Card 4 -->
                    <div class="group relative bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 border border-purple-100 hover:border-purple-500 transform hover:scale-105 hover:-rotate-1">
                        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div class="relative">
                            <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-spin shadow-lg">
                                <i class="fas fa-mouse-pointer text-white text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold text-arc-gray mb-4 group-hover:text-purple-600 transition-colors">${t.features.powerful.title}</h3>
                            <p class="text-gray-600 leading-relaxed group-hover:text-gray-700">${t.features.powerful.description}</p>
                            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div class="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                                    <i class="fas fa-bolt text-purple-500 text-sm"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Feature Card 5 -->
                    <div class="group relative bg-gradient-to-br from-white to-cyan-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 border border-cyan-100 hover:border-cyan-500 transform hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div class="relative">
                            <div class="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce shadow-lg">
                                <i class="fas fa-cogs text-white text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold text-arc-gray mb-4 group-hover:text-cyan-600 transition-colors">${t.features.flexible.title}</h3>
                            <p class="text-gray-600 leading-relaxed group-hover:text-gray-700">${t.features.flexible.description}</p>
                            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div class="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                                    <i class="fas fa-expand text-cyan-500 text-sm"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Feature Card 6 -->
                    <div class="group relative bg-gradient-to-br from-white to-emerald-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:border-emerald-500 transform hover:scale-105 hover:rotate-1">
                        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div class="relative">
                            <div class="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse shadow-lg">
                                <i class="fas fa-shield-alt text-white text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold text-arc-gray mb-4 group-hover:text-emerald-600 transition-colors">${t.features.secure.title}</h3>
                            <p class="text-gray-600 leading-relaxed group-hover:text-gray-700">${t.features.secure.description}</p>
                            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div class="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                    <i class="fas fa-lock text-emerald-500 text-sm"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Pricing Section -->
        <section id="pricing" class="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/30">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-arc-gray mb-4">${t.pricing.title}</h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">${t.pricing.subtitle}</p>
                </div>
                
                <!-- Enhanced Pricing Toggle -->
                <div class="flex justify-center mb-12">
                    <div class="bg-white rounded-2xl p-2 shadow-xl border border-gray-200 relative overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-r from-arc-blue/5 to-arc-orange/5"></div>
                        <div class="relative flex items-center">
                            <button 
                                id="monthly-btn" 
                                onclick="togglePricing('monthly')" 
                                class="px-8 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-arc-blue to-blue-600 text-white shadow-lg"
                            >
                                <i class="fas fa-calendar-alt ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${t.pricing.monthly}
                            </button>
                            <button 
                                id="yearly-btn" 
                                onclick="togglePricing('yearly')" 
                                class="px-8 py-3 rounded-xl font-semibold transition-all duration-300 text-arc-gray hover:text-arc-blue hover:bg-gray-50"
                            >
                                <i class="fas fa-calendar ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${t.pricing.yearly}
                                <span class="bg-arc-orange text-white text-xs px-2 py-1 rounded-full ${isRTL ? 'mr-2' : 'ml-2'}">-20%</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <!-- Free Plan -->
                    <div class="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group">
                        <div class="text-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-r from-arc-green to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                                <i class="fas fa-gift text-white text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold text-arc-gray mb-2">${t.pricing.free.name}</h3>
                            <div class="price-container">
                                <div class="monthly-price">
                                    <div class="text-4xl font-bold text-arc-green mb-2">$0<span class="text-lg text-gray-500">/${lang === 'ar' ? 'شهر' : 'mo'}</span></div>
                                </div>
                                <div class="yearly-price hidden">
                                    <div class="text-4xl font-bold text-arc-green mb-2">$0<span class="text-lg text-gray-500">/${lang === 'ar' ? 'سنة' : 'yr'}</span></div>
                                </div>
                            </div>
                            <p class="text-gray-600 mb-6 text-sm">${t.pricing.free.description}</p>
                        </div>
                        
                        <ul class="space-y-3 mb-8">
                            ${t.pricing.free.features.map(feature => `
                                <li class="flex items-start">
                                    <div class="w-5 h-5 bg-arc-green rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0 mt-0.5">
                                        <i class="fas fa-check text-white text-xs"></i>
                                    </div>
                                    <span class="text-gray-600 text-sm flex-1">${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                        
                        <a href="/pricing/free?lang=${lang}" class="w-full bg-gradient-to-r from-arc-green to-emerald-500 text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-center block transform hover:scale-105">
                            <i class="fas fa-rocket ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                            ${t.pricing.free.cta}
                        </a>
                    </div>
                    
                    <!-- Pro Plan (Most Popular) -->
                    <div class="bg-white rounded-2xl p-8 shadow-2xl border-2 border-arc-orange relative hover:shadow-3xl transition-all duration-500 transform hover:scale-110 group overflow-hidden">
                        <!-- Popular Badge -->
                        <div class="absolute -top-4 -${isRTL ? 'right-4' : 'left-4'} bg-gradient-to-r from-arc-orange to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-12 animate-pulse">
                            <i class="fas fa-crown ${isRTL ? 'ml-1' : 'mr-1'}"></i>
                            ${t.pricing.pro.popular}
                        </div>
                        
                        <!-- Glowing Background -->
                        <div class="absolute inset-0 bg-gradient-to-br from-arc-orange/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div class="relative text-center mb-6">
                            <div class="w-20 h-20 bg-gradient-to-r from-arc-orange to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce shadow-xl">
                                <i class="fas fa-star text-white text-3xl"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-arc-gray mb-2">${t.pricing.pro.name}</h3>
                            <div class="price-container">
                                <div class="monthly-price">
                                    <div class="text-5xl font-bold text-arc-orange mb-1">$49<span class="text-xl text-gray-500">/${lang === 'ar' ? 'شهر' : 'mo'}</span></div>
                                    <div class="text-sm text-gray-500">${lang === 'ar' ? '$588 سنوياً' : '$588 per year'}</div>
                                </div>
                                <div class="yearly-price hidden">
                                    <div class="text-5xl font-bold text-arc-orange mb-1">$39<span class="text-xl text-gray-500">/${lang === 'ar' ? 'شهر' : 'mo'}</span></div>
                                    <div class="text-sm text-green-600 font-semibold">${lang === 'ar' ? 'وفر $120 سنوياً!' : 'Save $120 yearly!'}</div>
                                </div>
                            </div>
                            <p class="text-gray-600 mb-6">${t.pricing.pro.description}</p>
                        </div>
                        
                        <ul class="space-y-4 mb-8">
                            ${t.pricing.pro.features.map(feature => `
                                <li class="flex items-start">
                                    <div class="w-6 h-6 bg-gradient-to-r from-arc-orange to-red-500 rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0 mt-0.5">
                                        <i class="fas fa-check text-white text-xs"></i>
                                    </div>
                                    <span class="text-gray-700 flex-1 font-medium">${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                        
                        <a href="/pricing/pro?lang=${lang}" class="w-full bg-gradient-to-r from-arc-orange to-red-500 text-white py-5 px-6 rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg text-center block transform hover:scale-105 relative overflow-hidden group">
                            <div class="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span class="relative flex items-center justify-center">
                                <i class="fas fa-crown ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${t.pricing.pro.cta}
                            </span>
                        </a>
                    </div>
                    
                    <!-- Developer Plan -->
                    <div class="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group hover:border-arc-blue">
                        <div class="text-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-r from-arc-blue to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                                <i class="fas fa-code text-white text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold text-arc-gray mb-2">${t.pricing.developer.name}</h3>
                            <div class="price-container">
                                <div class="monthly-price">
                                    <div class="text-4xl font-bold text-arc-blue mb-2">$199<span class="text-lg text-gray-500">/${lang === 'ar' ? 'شهر' : 'mo'}</span></div>
                                </div>
                                <div class="yearly-price hidden">
                                    <div class="text-4xl font-bold text-arc-blue mb-2">$159<span class="text-lg text-gray-500">/${lang === 'ar' ? 'شهر' : 'mo'}</span></div>
                                    <div class="text-sm text-green-600 font-semibold">${lang === 'ar' ? 'وفر $480 سنوياً!' : 'Save $480 yearly!'}</div>
                                </div>
                            </div>
                            <p class="text-gray-600 mb-6 text-sm">${t.pricing.developer.description}</p>
                        </div>
                        
                        <ul class="space-y-3 mb-8">
                            ${t.pricing.developer.features.map(feature => `
                                <li class="flex items-start">
                                    <div class="w-5 h-5 bg-arc-blue rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0 mt-0.5">
                                        <i class="fas fa-check text-white text-xs"></i>
                                    </div>
                                    <span class="text-gray-600 text-sm flex-1">${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                        
                        <a href="/pricing/developer?lang=${lang}" class="w-full bg-gradient-to-r from-arc-blue to-blue-600 text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-center block transform hover:scale-105">
                            <i class="fas fa-code ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                            ${t.pricing.developer.cta}
                        </a>
                    </div>
                    
                    <!-- Enterprise Plan -->
                    <div class="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group hover:border-purple-500 relative overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div class="relative text-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                                <i class="fas fa-building text-white text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold text-arc-gray mb-2">${t.pricing.enterprise.name}</h3>
                            <div class="price-container">
                                <div class="monthly-price">
                                    <div class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">${lang === 'ar' ? 'مخصص' : 'Custom'}</div>
                                </div>
                                <div class="yearly-price hidden">
                                    <div class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">${lang === 'ar' ? 'مخصص' : 'Custom'}</div>
                                </div>
                            </div>
                            <p class="text-gray-600 mb-6 text-sm">${t.pricing.enterprise.description}</p>
                        </div>
                        
                        <ul class="space-y-3 mb-8">
                            ${t.pricing.enterprise.features.map(feature => `
                                <li class="flex items-start">
                                    <div class="w-5 h-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0 mt-0.5">
                                        <i class="fas fa-check text-white text-xs"></i>
                                    </div>
                                    <span class="text-gray-600 text-sm flex-1">${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                        
                        <a href="/pricing/enterprise?lang=${lang}" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-center block transform hover:scale-105">
                            <i class="fas fa-handshake ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                            ${t.pricing.enterprise.cta}
                        </a>
                    </div>

                </div>
            </div>
        </section>

        <!-- Community Section -->
        <section id="community" class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-arc-gray mb-4">${t.community.title}</h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">${t.community.subtitle}</p>
                </div>
                
                <div class="grid md:grid-cols-3 gap-8">
                    <a href="https://discord.gg/apex-reportcraft" target="_blank" class="block text-center p-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl text-white hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                        <i class="fab fa-discord text-5xl mb-4"></i>
                        <h3 class="text-xl font-semibold mb-2">${t.community.discord.title}</h3>
                        <p class="mb-4 opacity-90">${t.community.discord.description}</p>
                        <div class="text-2xl font-bold">850,000+ ${t.community.discord.members}</div>
                        <p class="text-sm opacity-75 mt-2">${lang === 'ar' ? 'مطور Oracle APEX عالمياً' : 'Oracle APEX developers worldwide'}</p>
                        <div class="mt-4 inline-flex items-center text-sm font-medium">
                            ${lang === 'ar' ? 'انضم الآن' : 'Join Now'} 
                            <i class="fas fa-external-link-alt ${isRTL ? 'mr-2' : 'ml-2'}"></i>
                        </div>
                    </a>
                    
                    <a href="https://community.apex-reportcraft.com" target="_blank" class="block text-center p-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                        <i class="fas fa-comments text-5xl mb-4"></i>
                        <h3 class="text-xl font-semibold mb-2">${t.community.forum.title}</h3>
                        <p class="mb-4 opacity-90">${t.community.forum.description}</p>
                        <div class="text-2xl font-bold">24/7 ${t.community.forum.topics}</div>
                        <p class="text-sm opacity-75 mt-2">${lang === 'ar' ? 'دعم احترافي بالعربية' : 'Professional Arabic Support'}</p>
                        <div class="mt-4 inline-flex items-center text-sm font-medium">
                            ${lang === 'ar' ? 'تصفح المنتدى' : 'Browse Forum'} 
                            <i class="fas fa-external-link-alt ${isRTL ? 'mr-2' : 'ml-2'}"></i>
                        </div>
                    </a>
                    
                    <a href="https://github.com/apex-reportcraft" target="_blank" class="block text-center p-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                        <i class="fab fa-github text-5xl mb-4"></i>
                        <h3 class="text-xl font-semibold mb-2">${t.community.github.title}</h3>
                        <p class="mb-4 opacity-90">${t.community.github.description}</p>
                        <div class="text-2xl font-bold">2.5k+ ${t.community.github.stars}</div>
                        <p class="text-sm opacity-75 mt-2">${lang === 'ar' ? 'مفتوح المصدر ومجاني' : 'Open Source & Free'}</p>
                        <div class="mt-4 inline-flex items-center text-sm font-medium">
                            ${lang === 'ar' ? 'تصفح الكود' : 'Browse Code'} 
                            <i class="fas fa-external-link-alt ${isRTL ? 'mr-2' : 'ml-2'}"></i>
                        </div>
                    </a>
                </div>
                
                <!-- Social Media Links -->
                <div class="mt-16 text-center">
                    <h3 class="text-2xl font-bold text-arc-gray mb-8">${lang === 'ar' ? 'تابعنا على وسائل التواصل' : 'Follow Us on Social Media'}</h3>
                    <div class="flex justify-center space-x-6 ${isRTL ? 'space-x-reverse' : ''}">
                        <a href="https://twitter.com/apex_reportcraft" target="_blank" class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl">
                            <i class="fab fa-twitter text-xl"></i>
                        </a>
                        <a href="https://linkedin.com/company/apex-reportcraft" target="_blank" class="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl">
                            <i class="fab fa-linkedin-in text-xl"></i>
                        </a>
                        <a href="https://youtube.com/@apex-reportcraft" target="_blank" class="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl">
                            <i class="fab fa-youtube text-xl"></i>
                        </a>
                        <a href="https://facebook.com/apex-reportcraft" target="_blank" class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                            <i class="fab fa-facebook-f text-xl"></i>
                        </a>
                        <a href="https://instagram.com/apex_reportcraft" target="_blank" class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-arc-gray text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid md:grid-cols-4 gap-8">
                    <div>
                        <div class="flex items-center mb-4">
                            <div class="w-10 h-10 bg-arc-blue rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                                <div class="w-6 h-6 relative">
                                    <div class="absolute w-4 h-4 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                            <span class="text-xl font-bold">ARC</span>
                        </div>
                        <p class="text-gray-300">Apex ReportCraft - أداة التقارير الاحترافية للمطورين</p>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold mb-4">${t.footer.product.title}</h4>
                        <ul class="space-y-2">
                            <li><a href="#features" class="text-gray-300 hover:text-white transition-colors">${t.footer.product.features}</a></li>
                            <li><a href="#pricing" class="text-gray-300 hover:text-white transition-colors">${t.footer.product.pricing}</a></li>
                            <li><a href="https://docs.apex-reportcraft.com" target="_blank" class="text-gray-300 hover:text-white transition-colors">${t.footer.product.documentation}</a></li>
                            <li><a href="https://github.com/apex-reportcraft/releases" target="_blank" class="text-gray-300 hover:text-white transition-colors">${t.footer.product.releases}</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold mb-4">${t.footer.company.title}</h4>
                        <ul class="space-y-2">
                            <li><a href="/about?lang=${lang}" class="text-gray-300 hover:text-white transition-colors">${t.footer.company.about}</a></li>
                            <li><a href="https://careers.apex-reportcraft.com" target="_blank" class="text-gray-300 hover:text-white transition-colors">${t.footer.company.careers}</a></li>
                            <li><a href="https://press.apex-reportcraft.com" target="_blank" class="text-gray-300 hover:text-white transition-colors">${t.footer.company.press}</a></li>
                            <li><a href="/blog?lang=${lang}" class="text-gray-300 hover:text-white transition-colors">${t.footer.company.blog}</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold mb-4">${t.footer.support.title}</h4>
                        <ul class="space-y-2">
                            <li><a href="https://help.apex-reportcraft.com" target="_blank" class="text-gray-300 hover:text-white transition-colors">${t.footer.support.helpCenter}</a></li>
                            <li><a href="https://community.apex-reportcraft.com" target="_blank" class="text-gray-300 hover:text-white transition-colors">${t.footer.support.community}</a></li>
                            <li><a href="/contact?lang=${lang}" class="text-gray-300 hover:text-white transition-colors">${t.footer.support.contact}</a></li>
                            <li><a href="https://status.apex-reportcraft.com" target="_blank" class="text-gray-300 hover:text-white transition-colors">${t.footer.support.status}</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="border-t border-gray-600 mt-8 pt-8 text-center">
                    <p class="text-gray-300">${t.footer.copyright}</p>
                </div>
            </div>
        </footer>

        <!-- Chatbot Widget -->
        <div id="chatbot" class="fixed ${isRTL ? 'left-6' : 'right-6'} bottom-6 z-50">
            <!-- Chat Button -->
            <button id="chat-toggle" class="bg-arc-blue text-white w-16 h-16 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center group">
                <i id="chat-icon" class="fas fa-comment text-xl transition-transform duration-300 group-hover:scale-110"></i>
                <div class="absolute -top-2 -${isRTL ? 'left-2' : 'right-2'} w-4 h-4 bg-arc-orange rounded-full animate-pulse"></div>
            </button>

            <!-- Chat Window -->
            <div id="chat-window" class="absolute bottom-20 ${isRTL ? 'left-0' : 'right-0'} w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 transform scale-0 opacity-0 transition-all duration-300 origin-bottom-${isRTL ? 'left' : 'right'}">
                <!-- Header -->
                <div class="bg-gradient-to-r from-arc-blue to-arc-orange text-white p-4 rounded-t-2xl">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                                <i class="fas fa-robot text-arc-blue text-sm"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-sm">${lang === 'ar' ? 'مساعد ARC الذكي' : 'ARC Smart Assistant'}</h4>
                                <p class="text-xs opacity-90">${lang === 'ar' ? 'متصل الآن' : 'Online now'}</p>
                            </div>
                        </div>
                        <button id="chat-close" class="text-white hover:bg-white hover:bg-opacity-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                            <i class="fas fa-times text-sm"></i>
                        </button>
                    </div>
                </div>

                <!-- Messages -->
                <div id="chat-messages" class="h-80 p-4 overflow-y-auto bg-gray-50">
                    <!-- Welcome Message -->
                    <div class="flex items-start space-x-2 ${isRTL ? 'space-x-reverse' : ''} mb-4">
                        <div class="w-8 h-8 bg-gradient-to-r from-arc-blue to-arc-orange rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                            <i class="fas fa-brain text-white text-xs"></i>
                        </div>
                        <div class="bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200 rounded-2xl rounded-tl-sm p-4 shadow-md max-w-xs">
                            <div class="flex items-center mb-2">
                                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse ${isRTL ? 'ml-2' : 'mr-2'}"></div>
                                <span class="text-xs text-gray-500 font-medium">${lang === 'ar' ? 'متصل الآن' : 'Online Now'}</span>
                            </div>
                            <p class="text-sm text-gray-800 font-medium">
                                ${lang === 'ar' 
                                    ? '🤖 مرحباً! أنا الخبير التقني الذكي في ARC. أستطيع مساعدتك في كل شيء من الإعداد إلى حل المشاكل المعقدة!' 
                                    : '🤖 Hello! I\'m ARC\'s Smart Technical Expert. I can help you with everything from setup to solving complex issues!'
                                }
                            </p>
                        </div>
                    </div>
                    
                    <!-- Advanced Quick Action Buttons -->
                    <div class="space-y-3 mb-4">
                        <div class="grid grid-cols-2 gap-2">
                            <button class="chat-quick-btn group text-center bg-gradient-to-r from-blue-50 to-blue-100 hover:from-arc-blue hover:to-blue-600 hover:text-white transition-all duration-300 p-3 rounded-xl shadow-sm text-xs border border-blue-200 transform hover:scale-105">
                                <i class="fas fa-rocket text-arc-blue group-hover:text-white text-lg mb-1 block"></i>
                                <span class="font-semibold">${lang === 'ar' ? 'بدء سريع' : 'Quick Start'}</span>
                            </button>
                            <button class="chat-quick-btn group text-center bg-gradient-to-r from-green-50 to-green-100 hover:from-arc-green hover:to-green-600 hover:text-white transition-all duration-300 p-3 rounded-xl shadow-sm text-xs border border-green-200 transform hover:scale-105">
                                <i class="fas fa-dollar-sign text-arc-green group-hover:text-white text-lg mb-1 block"></i>
                                <span class="font-semibold">${lang === 'ar' ? 'الأسعار' : 'Pricing'}</span>
                            </button>
                        </div>
                        
                        <button class="chat-quick-btn w-full text-${isRTL ? 'right' : 'left'} bg-gradient-to-r from-orange-50 to-red-50 hover:from-arc-orange hover:to-red-500 hover:text-white transition-all duration-300 p-3 rounded-xl shadow-sm text-sm border border-orange-200 transform hover:scale-105">
                            <i class="fas fa-tools ${isRTL ? 'ml-2' : 'mr-2'} text-arc-orange group-hover:text-white"></i>
                            <span class="font-semibold">${lang === 'ar' ? '🔧 حل المشاكل التقنية' : '🔧 Technical Troubleshooting'}</span>
                        </button>
                        
                        <button class="chat-quick-btn w-full text-${isRTL ? 'right' : 'left'} bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 p-3 rounded-xl shadow-sm text-sm border border-purple-200 transform hover:scale-105">
                            <i class="fas fa-database ${isRTL ? 'ml-2' : 'mr-2'} text-purple-600"></i>
                            <span class="font-semibold">${lang === 'ar' ? '🗄️ تكامل قواعد البيانات' : '🗄️ Database Integration'}</span>
                        </button>
                        
                        <button class="chat-quick-btn w-full text-${isRTL ? 'right' : 'left'} bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-500 hover:to-blue-500 hover:text-white transition-all duration-300 p-3 rounded-xl shadow-sm text-sm border border-indigo-200 transform hover:scale-105">
                            <i class="fas fa-magic ${isRTL ? 'ml-2' : 'mr-2'} text-indigo-600"></i>
                            <span class="font-semibold">${lang === 'ar' ? '✨ ميزات الذكاء الاصطناعي' : '✨ AI Features Guide'}</span>
                        </button>
                        
                        <button class="chat-quick-btn w-full text-${isRTL ? 'right' : 'left'} bg-gradient-to-r from-teal-50 to-green-50 hover:from-teal-500 hover:to-green-500 hover:text-white transition-all duration-300 p-3 rounded-xl shadow-sm text-sm border border-teal-200 transform hover:scale-105">
                            <i class="fas fa-code ${isRTL ? 'ml-2' : 'mr-2'} text-teal-600"></i>
                            <span class="font-semibold">${lang === 'ar' ? '👨‍💻 أمثلة الكود والAPI' : '👨‍💻 Code Examples & API'}</span>
                        </button>
                    </div>
                </div>

                <!-- Input -->
                <div class="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                    <div class="flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}">
                        <input 
                            type="text" 
                            id="chat-input" 
                            placeholder="${lang === 'ar' ? 'اكتب رسالتك هنا...' : 'Type your message...'}" 
                            class="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-arc-blue focus:border-transparent text-sm"
                        >
                        <button id="chat-send" class="bg-arc-blue text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors">
                            <i class="fas fa-paper-plane text-sm"></i>
                        </button>
                    </div>
                    <p class="text-xs text-gray-500 mt-2 text-center">
                        ${lang === 'ar' ? 'مدعوم بالذكاء الاصطناعي • متوفر 24/7' : 'Powered by AI • Available 24/7'}
                    </p>
                </div>
            </div>
        </div>

        <script src="/static/app.js"></script>
        
        <!-- Pricing Toggle JavaScript -->
        <script>
            let currentPricing = 'monthly';
            
            function togglePricing(type) {
                if (currentPricing === type) return;
                
                currentPricing = type;
                
                // Update button states
                const monthlyBtn = document.getElementById('monthly-btn');
                const yearlyBtn = document.getElementById('yearly-btn');
                
                if (type === 'monthly') {
                    monthlyBtn.className = 'px-8 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-arc-blue to-blue-600 text-white shadow-lg';
                    yearlyBtn.className = 'px-8 py-3 rounded-xl font-semibold transition-all duration-300 text-arc-gray hover:text-arc-blue hover:bg-gray-50';
                } else {
                    yearlyBtn.className = 'px-8 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-arc-green to-emerald-600 text-white shadow-lg';
                    monthlyBtn.className = 'px-8 py-3 rounded-xl font-semibold transition-all duration-300 text-arc-gray hover:text-arc-blue hover:bg-gray-50';
                }
                
                // Toggle price visibility with smooth transition
                const monthlyPrices = document.querySelectorAll('.monthly-price');
                const yearlyPrices = document.querySelectorAll('.yearly-price');
                
                if (type === 'monthly') {
                    monthlyPrices.forEach(price => {
                        price.classList.remove('hidden');
                        price.style.opacity = '0';
                        setTimeout(() => {
                            price.style.opacity = '1';
                        }, 50);
                    });
                    yearlyPrices.forEach(price => {
                        price.style.opacity = '0';
                        setTimeout(() => {
                            price.classList.add('hidden');
                        }, 300);
                    });
                } else {
                    yearlyPrices.forEach(price => {
                        price.classList.remove('hidden');
                        price.style.opacity = '0';
                        setTimeout(() => {
                            price.style.opacity = '1';
                        }, 50);
                    });
                    monthlyPrices.forEach(price => {
                        price.style.opacity = '0';
                        setTimeout(() => {
                            price.classList.add('hidden');
                        }, 300);
                    });
                }
                
                // Track pricing toggle for analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'pricing_toggle', {
                        event_category: 'Pricing',
                        event_label: type,
                        language: '${lang}'
                    });
                }
            }
            
            // Chatbot functionality
            document.addEventListener('DOMContentLoaded', function() {
                const chatToggle = document.getElementById('chat-toggle');
                const chatWindow = document.getElementById('chat-window');
                const chatClose = document.getElementById('chat-close');
                const chatIcon = document.getElementById('chat-icon');
                
                let isOpen = false;
                
                function toggleChat() {
                    isOpen = !isOpen;
                    
                    if (isOpen) {
                        chatWindow.classList.remove('scale-0', 'opacity-0');
                        chatWindow.classList.add('scale-100', 'opacity-100');
                        chatIcon.className = 'fas fa-times text-xl transition-transform duration-300 group-hover:scale-110';
                        if (typeof trackChatbot !== 'undefined') {
                            trackChatbot('open', 'chat_opened');
                        }
                    } else {
                        chatWindow.classList.add('scale-0', 'opacity-0');
                        chatWindow.classList.remove('scale-100', 'opacity-100');
                        chatIcon.className = 'fas fa-comment text-xl transition-transform duration-300 group-hover:scale-110';
                    }
                }
                
                chatToggle?.addEventListener('click', toggleChat);
                chatClose?.addEventListener('click', toggleChat);
                
                // Quick action buttons
                document.querySelectorAll('.chat-quick-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const text = this.textContent.trim();
                        if (typeof trackChatbot !== 'undefined') {
                            trackChatbot('quick_action', text);
                        }
                        // Here you would integrate with actual chatbot service
                        console.log('Quick action clicked:', text);
                    });
                });
                
                // Send button
                const chatSend = document.getElementById('chat-send');
                const chatInput = document.getElementById('chat-input');
                
                function sendMessage() {
                    const message = chatInput?.value.trim();
                    if (message) {
                        if (typeof trackChatbot !== 'undefined') {
                            trackChatbot('send_message', message);
                        }
                        // Here you would integrate with actual chatbot service
                        console.log('Message sent:', message);
                        chatInput.value = '';
                    }
                }
                
                chatSend?.addEventListener('click', sendMessage);
                chatInput?.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                });
            });
        </script>
    </body>
    </html>
  `);
});

// App Signup page (app.apex-reportcraft.com/signup simulation)
app.get('/app/signup', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${lang === 'ar' ? 'إنشاء حساب - تطبيق ARC' : 'Create Account - ARC App'}</title>
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .app-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          .glass-effect { backdrop-filter: blur(15px); background: rgba(255, 255, 255, 0.1); }
        </style>
    </head>
    <body class="app-bg min-h-screen ${isRTL ? 'rtl' : ''}">
        
        <!-- App Header -->
        <header class="bg-white/10 backdrop-blur-md border-b border-white/20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                            <div class="w-6 h-6 relative">
                                <div class="absolute w-4 h-4 bg-white rounded-full"></div>
                                <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-orange rounded-full"></div>
                            </div>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-white">ARC App</h1>
                            <p class="text-xs text-white/70">${lang === 'ar' ? 'تطبيق الويب' : 'Web Application'}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <a href="/app/login?lang=${lang}" class="text-white/80 hover:text-white transition-colors">
                            ${lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
                        </a>
                        <a href="/?lang=${lang}" class="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                            ${lang === 'ar' ? 'الموقع الرئيسي' : 'Main Site'}
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <div class="min-h-screen flex items-center justify-center p-4">
            <div class="max-w-md w-full">
                
                <!-- App Signup Form -->
                <div class="glass-effect rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <div class="text-center mb-8">
                        <div class="w-20 h-20 bg-gradient-to-r from-arc-blue to-arc-orange rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <i class="fas fa-rocket text-white text-2xl"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-white mb-2">
                            ${lang === 'ar' ? 'انضم إلى ARC App' : 'Join ARC App'}
                        </h2>
                        <p class="text-white/70">
                            ${lang === 'ar' ? 'ابدأ رحلتك في إنشاء التقارير الذكية' : 'Start your smart reporting journey'}
                        </p>
                    </div>

                    <form class="space-y-6">
                        <!-- Full Name -->
                        <div>
                            <label class="block text-sm font-medium text-white mb-2">
                                ${lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                            </label>
                            <input type="text" required 
                                class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-colors" 
                                placeholder="${lang === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}">
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-medium text-white mb-2">
                                ${lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                            </label>
                            <input type="email" required 
                                class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-colors" 
                                placeholder="${lang === 'ar' ? 'your@email.com' : 'your@email.com'}">
                        </div>

                        <!-- Password -->
                        <div>
                            <label class="block text-sm font-medium text-white mb-2">
                                ${lang === 'ar' ? 'كلمة المرور' : 'Password'}
                            </label>
                            <input type="password" required 
                                class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-colors" 
                                placeholder="${lang === 'ar' ? '••••••••' : '••••••••'}">
                        </div>

                        <!-- Plan Selection -->
                        <div>
                            <label class="block text-sm font-medium text-white mb-2">
                                ${lang === 'ar' ? 'اختر خطتك' : 'Choose Your Plan'}
                            </label>
                            <select class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-colors">
                                <option value="free" class="bg-gray-800">${lang === 'ar' ? 'مجاني' : 'Free'}</option>
                                <option value="pro" class="bg-gray-800">${lang === 'ar' ? 'احترافي' : 'Pro'}</option>
                                <option value="developer" class="bg-gray-800">${lang === 'ar' ? 'مطور' : 'Developer'}</option>
                                <option value="enterprise" class="bg-gray-800">${lang === 'ar' ? 'مؤسسي' : 'Enterprise'}</option>
                            </select>
                        </div>

                        <!-- Terms -->
                        <div class="flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''}">
                            <input type="checkbox" id="app-terms" required class="mt-1 w-4 h-4 text-white bg-white/10 border-white/30 rounded focus:ring-white/50">
                            <label for="app-terms" class="text-sm text-white/80">
                                ${lang === 'ar' ? 'أوافق على' : 'I agree to'} 
                                <a href="#" class="text-white underline hover:text-white/80">${lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}</a> 
                                ${lang === 'ar' ? 'و' : 'and'} 
                                <a href="#" class="text-white underline hover:text-white/80">${lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
                            </label>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" class="w-full bg-gradient-to-r from-white to-white/80 text-arc-gray py-3 px-6 rounded-lg font-bold hover:from-white/90 hover:to-white/70 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            ${lang === 'ar' ? '🚀 إنشاء الحساب' : '🚀 Create Account'}
                        </button>
                    </form>

                    <!-- Login Link -->
                    <div class="mt-6 text-center">
                        <p class="text-sm text-white/70">
                            ${lang === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'}
                            <a href="/app/login?lang=${lang}" class="text-white font-semibold hover:text-white/80 transition-colors">
                                ${lang === 'ar' ? 'سجل دخولك' : 'Sign In'}
                            </a>
                        </p>
                    </div>
                </div>

                <!-- App Features Preview -->
                <div class="mt-8 glass-effect rounded-2xl p-6 border border-white/20">
                    <h3 class="text-lg font-bold text-white mb-4 text-center">
                        ${lang === 'ar' ? '🎯 ما ستحصل عليه' : '🎯 What You Get'}
                    </h3>
                    <div class="grid grid-cols-2 gap-4">
                        ${[
                          { icon: 'fas fa-robot', text: lang === 'ar' ? 'مساعد AI ذكي' : 'Smart AI Assistant' },
                          { icon: 'fas fa-chart-line', text: lang === 'ar' ? 'تقارير متقدمة' : 'Advanced Reports' },
                          { icon: 'fas fa-language', text: lang === 'ar' ? 'دعم العربية' : 'Arabic Support' },
                          { icon: 'fas fa-cloud', text: lang === 'ar' ? 'تخزين سحابي' : 'Cloud Storage' }
                        ].map(feature => `
                            <div class="flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}">
                                <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                    <i class="${feature.icon} text-white text-xs"></i>
                                </div>
                                <span class="text-white/80 text-sm">${feature.text}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

            </div>
        </div>

    </body>
    </html>
  `);
});

// Demo Site page (demo.apex-reportcraft.com simulation)
app.get('/demo-site', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${lang === 'ar' ? 'تجربة ARC مباشرة' : 'Try ARC Live Demo'}</title>
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .demo-gradient { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 25%, #db2777 50%, #dc2626 75%, #ea580c 100%); }
          .demo-panel { min-height: 400px; }
        </style>
    </head>
    <body class="bg-gray-900 text-white ${isRTL ? 'rtl' : ''}">
        
        <!-- Demo Header -->
        <header class="bg-gray-800 border-b border-gray-700">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <div class="demo-gradient w-10 h-10 rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                            <i class="fas fa-play text-white"></i>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-white">ARC Live Demo</h1>
                            <p class="text-xs text-gray-300">${lang === 'ar' ? 'تجربة مباشرة' : 'Interactive Experience'}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <span class="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            <i class="fas fa-circle text-xs ${isRTL ? 'ml-1' : 'mr-1'}"></i>
                            ${lang === 'ar' ? 'متصل' : 'Live'}
                        </span>
                        <a href="/app/signup?lang=${lang}" class="bg-arc-blue text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                            ${lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                        </a>
                        <a href="/?lang=${lang}" class="text-gray-300 hover:text-white transition-colors">
                            ${lang === 'ar' ? 'الموقع الرئيسي' : 'Main Site'}
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Demo Hero -->
        <div class="demo-gradient py-20">
            <div class="max-w-4xl mx-auto text-center px-4">
                <h1 class="text-5xl font-bold mb-6">
                    ${lang === 'ar' ? '🎮 جرب ARC الآن' : '🎮 Try ARC Now'}
                </h1>
                <p class="text-xl text-white/90 mb-8">
                    ${lang === 'ar' ? 'اكتشف قوة الذكاء الاصطناعي في إنشاء تقارير Oracle APEX' : 'Discover the power of AI in Oracle APEX reporting'}
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onclick="startLiveDemo()" class="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors transform hover:scale-105">
                        ${lang === 'ar' ? '🚀 ابدأ التجربة المباشرة' : '🚀 Start Live Demo'}
                    </button>
                    <button onclick="watchTour()" class="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
                        ${lang === 'ar' ? '📽️ شاهد الجولة' : '📽️ Watch Tour'}
                    </button>
                </div>
            </div>
        </div>

        <!-- Interactive Demo Panels -->
        <div class="max-w-7xl mx-auto px-4 py-16">
            <div class="grid lg:grid-cols-2 gap-8 mb-16">
                
                <!-- AI Assistant Demo -->
                <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-arc-blue rounded-xl flex items-center justify-center ${isRTL ? 'ml-4' : 'mr-4'}">
                            <i class="fas fa-robot text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold">${lang === 'ar' ? 'مساعد AI الذكي' : 'Smart AI Assistant'}</h3>
                            <p class="text-gray-400">${lang === 'ar' ? 'تفاعل بالعربية والإنجليزية' : 'Chat in Arabic & English'}</p>
                        </div>
                    </div>
                    
                    <div class="demo-panel bg-gray-900 rounded-xl p-4 mb-4">
                        <!-- Chat Interface -->
                        <div class="space-y-4 mb-4" id="demo-chat">
                            <div class="flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''}">
                                <div class="w-8 h-8 bg-arc-blue rounded-full flex items-center justify-center">
                                    <i class="fas fa-robot text-white text-sm"></i>
                                </div>
                                <div class="bg-gray-700 rounded-lg p-3 flex-1">
                                    <p class="text-sm">${lang === 'ar' ? 'مرحباً! كيف يمكنني مساعدتك في إنشاء تقريرك اليوم؟' : 'Hello! How can I help you create your report today?'}</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Quick Actions -->
                        <div class="flex flex-wrap gap-2">
                            ${[
                              lang === 'ar' ? 'إنشاء تقرير مبيعات' : 'Create Sales Report',
                              lang === 'ar' ? 'تحليل البيانات' : 'Analyze Data',
                              lang === 'ar' ? 'إضافة مخطط' : 'Add Chart'
                            ].map(action => `
                                <button onclick="addDemoMessage('${action}')" class="bg-arc-blue/20 text-arc-blue px-3 py-1 rounded-lg text-sm hover:bg-arc-blue/30 transition-colors">
                                    ${action}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <button onclick="tryAIAssistant()" class="w-full bg-arc-blue text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                        ${lang === 'ar' ? 'جرب المساعد الذكي' : 'Try AI Assistant'}
                    </button>
                </div>

                <!-- Report Builder Demo -->
                <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-arc-orange rounded-xl flex items-center justify-center ${isRTL ? 'ml-4' : 'mr-4'}">
                            <i class="fas fa-chart-bar text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold">${lang === 'ar' ? 'منشئ التقارير' : 'Report Builder'}</h3>
                            <p class="text-gray-400">${lang === 'ar' ? 'إنشاء تلقائي ذكي' : 'Smart Auto Generation'}</p>
                        </div>
                    </div>
                    
                    <div class="demo-panel bg-gray-900 rounded-xl p-4 mb-4">
                        <!-- Mock Report Preview -->
                        <div class="space-y-4">
                            <div class="bg-gray-700 rounded-lg p-3">
                                <div class="flex justify-between items-center mb-2">
                                    <h4 class="font-medium">${lang === 'ar' ? 'تقرير المبيعات الشهري' : 'Monthly Sales Report'}</h4>
                                    <span class="bg-green-600 text-white px-2 py-1 rounded text-xs">${lang === 'ar' ? 'جاهز' : 'Ready'}</span>
                                </div>
                                <div class="grid grid-cols-3 gap-2 mb-3">
                                    <div class="bg-arc-blue/20 p-2 rounded text-center">
                                        <div class="text-lg font-bold text-arc-blue">$52K</div>
                                        <div class="text-xs text-gray-400">${lang === 'ar' ? 'المجموع' : 'Total'}</div>
                                    </div>
                                    <div class="bg-arc-green/20 p-2 rounded text-center">
                                        <div class="text-lg font-bold text-arc-green">+15%</div>
                                        <div class="text-xs text-gray-400">${lang === 'ar' ? 'النمو' : 'Growth'}</div>
                                    </div>
                                    <div class="bg-arc-orange/20 p-2 rounded text-center">
                                        <div class="text-lg font-bold text-arc-orange">342</div>
                                        <div class="text-xs text-gray-400">${lang === 'ar' ? 'الطلبات' : 'Orders'}</div>
                                    </div>
                                </div>
                                <div class="h-20 bg-gray-600 rounded flex items-center justify-center">
                                    <i class="fas fa-chart-line text-2xl text-gray-400"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button onclick="tryReportBuilder()" class="w-full bg-arc-orange text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                        ${lang === 'ar' ? 'جرب منشئ التقارير' : 'Try Report Builder'}
                    </button>
                </div>

            </div>

            <!-- Call to Action -->
            <div class="text-center bg-gradient-to-r from-arc-blue to-arc-orange rounded-2xl p-8">
                <h2 class="text-3xl font-bold mb-4">${lang === 'ar' ? 'جاهز للبدء؟' : 'Ready to Get Started?'}</h2>
                <p class="text-xl mb-6">${lang === 'ar' ? 'انشئ حسابك المجاني الآن واكتشف المزيد' : 'Create your free account and discover more'}</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/app/signup?lang=${lang}" class="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                        ${lang === 'ar' ? '🚀 ابدأ مجاناً' : '🚀 Start Free'}
                    </a>
                    <a href="/?lang=${lang}" class="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
                        ${lang === 'ar' ? 'تعرف على المزيد' : 'Learn More'}
                    </a>
                </div>
            </div>
        </div>

        <script>
            function startLiveDemo() {
                alert('${lang === 'ar' ? 'سيتم إطلاق التجربة المباشرة قريباً!' : 'Live demo will launch soon!'}');
            }
            
            function watchTour() {
                alert('${lang === 'ar' ? 'جولة الفيديو متاحة قريباً!' : 'Video tour coming soon!'}');
            }
            
            function addDemoMessage(message) {
                const chat = document.getElementById('demo-chat');
                const userMsg = document.createElement('div');
                userMsg.className = 'flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''} justify-end';
                userMsg.innerHTML = \`
                    <div class="bg-arc-blue rounded-lg p-3 max-w-xs">
                        <p class="text-sm text-white">\${message}</p>
                    </div>
                    <div class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-white text-sm"></i>
                    </div>
                \`;
                chat.appendChild(userMsg);
                
                // Add AI response
                setTimeout(() => {
                    const aiMsg = document.createElement('div');
                    aiMsg.className = 'flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''}';
                    aiMsg.innerHTML = \`
                        <div class="w-8 h-8 bg-arc-blue rounded-full flex items-center justify-center">
                            <i class="fas fa-robot text-white text-sm"></i>
                        </div>
                        <div class="bg-gray-700 rounded-lg p-3 flex-1">
                            <p class="text-sm">${lang === 'ar' ? 'ممتاز! سأقوم بإنشاء هذا التقرير لك الآن...' : 'Great! I\\'ll create this report for you now...'}</p>
                        </div>
                    \`;
                    chat.appendChild(aiMsg);
                    chat.scrollTop = chat.scrollHeight;
                }, 1000);
                
                chat.scrollTop = chat.scrollHeight;
            }
            
            function tryAIAssistant() {
                window.open('/app/signup?lang=${lang}', '_blank');
            }
            
            function tryReportBuilder() {
                window.open('/app/signup?lang=${lang}', '_blank');
            }
        </script>

    </body>
    </html>
  `);
});

// App Login page (app.apex-reportcraft.com/login simulation)
app.get('/app/login', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${lang === 'ar' ? 'تسجيل الدخول - تطبيق ARC' : 'Login - ARC App'}</title>
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .login-bg { background: linear-gradient(135deg, #1e3a8a 0%, #7c2d12 100%); }
          .glass-effect { backdrop-filter: blur(15px); background: rgba(255, 255, 255, 0.1); }
        </style>
    </head>
    <body class="login-bg min-h-screen ${isRTL ? 'rtl' : ''}">
        
        <!-- App Header -->
        <header class="bg-black/20 backdrop-blur-md border-b border-white/10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                            <div class="w-6 h-6 relative">
                                <div class="absolute w-4 h-4 bg-white rounded-full"></div>
                                <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-orange rounded-full"></div>
                            </div>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-white">ARC App</h1>
                            <p class="text-xs text-white/70">${lang === 'ar' ? 'تطبيق الويب' : 'Web Application'}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <a href="/app/signup?lang=${lang}" class="text-white/80 hover:text-white transition-colors">
                            ${lang === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
                        </a>
                        <a href="/?lang=${lang}" class="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                            ${lang === 'ar' ? 'الموقع الرئيسي' : 'Main Site'}
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <div class="min-h-screen flex items-center justify-center p-4">
            <div class="max-w-md w-full">
                
                <!-- Login Form -->
                <div class="glass-effect rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <div class="text-center mb-8">
                        <div class="w-20 h-20 bg-gradient-to-r from-arc-blue to-arc-orange rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <i class="fas fa-sign-in-alt text-white text-2xl"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-white mb-2">
                            ${lang === 'ar' ? 'مرحباً بعودتك' : 'Welcome Back'}
                        </h2>
                        <p class="text-white/70">
                            ${lang === 'ar' ? 'سجل دخولك للوصول إلى حسابك' : 'Sign in to access your account'}
                        </p>
                    </div>

                    <form class="space-y-6">
                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-medium text-white mb-2">
                                ${lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                            </label>
                            <input type="email" required 
                                class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-colors" 
                                placeholder="${lang === 'ar' ? 'your@email.com' : 'your@email.com'}">
                        </div>

                        <!-- Password -->
                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <label class="block text-sm font-medium text-white">
                                    ${lang === 'ar' ? 'كلمة المرور' : 'Password'}
                                </label>
                                <a href="#" class="text-sm text-white/80 hover:text-white transition-colors">
                                    ${lang === 'ar' ? 'هل نسيت كلمة المرور؟' : 'Forgot password?'}
                                </a>
                            </div>
                            <input type="password" required 
                                class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-colors" 
                                placeholder="${lang === 'ar' ? '••••••••' : '••••••••'}">
                        </div>

                        <!-- Remember Me -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}">
                                <input type="checkbox" id="remember" class="w-4 h-4 text-white bg-white/10 border-white/30 rounded focus:ring-white/50">
                                <label for="remember" class="text-sm text-white/80">
                                    ${lang === 'ar' ? 'تذكرني' : 'Remember me'}
                                </label>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" class="w-full bg-gradient-to-r from-white to-white/80 text-arc-gray py-3 px-6 rounded-lg font-bold hover:from-white/90 hover:to-white/70 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            ${lang === 'ar' ? '🚀 تسجيل الدخول' : '🚀 Sign In'}
                        </button>

                        <!-- Divider -->
                        <div class="relative my-6">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-white/20"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-transparent text-white/70">${lang === 'ar' ? 'أو' : 'Or'}</span>
                            </div>
                        </div>

                        <!-- Social Login -->
                        <div class="grid grid-cols-2 gap-3">
                            <button type="button" class="flex items-center justify-center px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white hover:bg-white/20 transition-colors">
                                <svg class="w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                </svg>
                                <span class="text-sm">Google</span>
                            </button>
                            <button type="button" class="flex items-center justify-center px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white hover:bg-white/20 transition-colors">
                                <i class="fab fa-microsoft ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                <span class="text-sm">Microsoft</span>
                            </button>
                        </div>
                    </form>

                    <!-- Sign Up Link -->
                    <div class="mt-6 text-center">
                        <p class="text-sm text-white/70">
                            ${lang === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}
                            <a href="/app/signup?lang=${lang}" class="text-white font-semibold hover:text-white/80 transition-colors">
                                ${lang === 'ar' ? 'إنشاء حساب جديد' : 'Create one now'}
                            </a>
                        </p>
                    </div>
                </div>

                <!-- Quick Access -->
                <div class="mt-8 glass-effect rounded-2xl p-6 border border-white/20">
                    <h3 class="text-lg font-bold text-white mb-4 text-center">
                        ${lang === 'ar' ? '⚡ الوصول السريع' : '⚡ Quick Access'}
                    </h3>
                    <div class="grid grid-cols-2 gap-4">
                        <a href="/demo-site?lang=${lang}" class="flex items-center justify-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                            <i class="fas fa-play text-arc-orange"></i>
                            <span class="text-white/80 text-sm">${lang === 'ar' ? 'تجربة مباشرة' : 'Live Demo'}</span>
                        </a>
                        <a href="/community?lang=${lang}" class="flex items-center justify-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                            <i class="fas fa-users text-arc-blue"></i>
                            <span class="text-white/80 text-sm">${lang === 'ar' ? 'المجتمع' : 'Community'}</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>

    </body>
    </html>
  `);
});

// Community page (community.apex-reportcraft.com simulation)
app.get('/community', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${lang === 'ar' ? 'مجتمع ARC' : 'ARC Community'}</title>
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .community-gradient { background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%); }
        </style>
    </head>
    <body class="bg-gray-50 ${isRTL ? 'rtl' : ''}">
        
        <!-- Community Header -->
        <header class="community-gradient">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                            <i class="fas fa-users text-white"></i>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-white">ARC Community</h1>
                            <p class="text-xs text-white/80">${lang === 'ar' ? 'مجتمع المطورين' : 'Developer Community'}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <span class="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
                            ${lang === 'ar' ? '🔥 5,247 عضو نشط' : '🔥 5,247 Active Members'}
                        </span>
                        <a href="/app/login?lang=${lang}" class="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                            ${lang === 'ar' ? 'انضم الآن' : 'Join Now'}
                        </a>
                        <a href="/?lang=${lang}" class="text-white/80 hover:text-white transition-colors">
                            ${lang === 'ar' ? 'الموقع الرئيسي' : 'Main Site'}
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Community Hero -->
        <div class="community-gradient py-20">
            <div class="max-w-4xl mx-auto text-center px-4">
                <h1 class="text-5xl font-bold text-white mb-6">
                    ${lang === 'ar' ? '🌟 انضم إلى مجتمع ARC' : '🌟 Join the ARC Community'}
                </h1>
                <p class="text-xl text-white/90 mb-8">
                    ${lang === 'ar' ? 'تواصل مع المطورين، تعلم، شارك الخبرات وابني مشاريع رائعة معاً' : 'Connect with developers, learn, share experiences and build amazing projects together'}
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onclick="joinCommunity()" class="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors transform hover:scale-105">
                        ${lang === 'ar' ? '🚀 انضم الآن مجاناً' : '🚀 Join Free Now'}
                    </button>
                    <button onclick="exploreCommunity()" class="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
                        ${lang === 'ar' ? '👀 استكشف المجتمع' : '👀 Explore Community'}
                    </button>
                </div>
            </div>
        </div>

        <!-- Community Stats -->
        <div class="max-w-7xl mx-auto px-4 py-16">
            <div class="grid md:grid-cols-4 gap-8 mb-16">
                ${[
                  { number: '5,247', label: lang === 'ar' ? 'مطور نشط' : 'Active Developers', icon: 'fas fa-users', color: 'blue' },
                  { number: '1,832', label: lang === 'ar' ? 'مشروع مشترك' : 'Shared Projects', icon: 'fas fa-code-branch', color: 'green' },
                  { number: '892', label: lang === 'ar' ? 'سؤال مجاب' : 'Questions Answered', icon: 'fas fa-question-circle', color: 'orange' },
                  { number: '156', label: lang === 'ar' ? 'خبير معتمد' : 'Certified Experts', icon: 'fas fa-medal', color: 'purple' }
                ].map(stat => `
                    <div class="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:scale-105">
                        <div class="w-16 h-16 mx-auto mb-4 bg-${stat.color === 'blue' ? 'arc-blue' : stat.color === 'green' ? 'arc-green' : stat.color === 'orange' ? 'arc-orange' : 'purple-600'} rounded-2xl flex items-center justify-center">
                            <i class="${stat.icon} text-white text-2xl"></i>
                        </div>
                        <div class="text-3xl font-bold text-arc-gray mb-2">${stat.number}</div>
                        <div class="text-gray-600 font-medium">${stat.label}</div>
                    </div>
                `).join('')}
            </div>

            <!-- Community Sections -->
            <div class="grid lg:grid-cols-2 gap-8 mb-16">
                
                <!-- Recent Discussions -->
                <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold text-arc-gray flex items-center">
                            <i class="fas fa-comments text-arc-blue ${isRTL ? 'ml-3' : 'mr-3'}"></i>
                            ${lang === 'ar' ? 'المناقشات الحديثة' : 'Recent Discussions'}
                        </h3>
                        <span class="bg-arc-blue/10 text-arc-blue px-3 py-1 rounded-full text-sm font-medium">
                            ${lang === 'ar' ? '24 جديد' : '24 New'}
                        </span>
                    </div>
                    
                    <div class="space-y-4">
                        ${[
                          {
                            title: lang === 'ar' ? 'كيفية دمج API مخصص مع ARC؟' : 'How to integrate custom API with ARC?',
                            author: 'Ahmed_Dev',
                            replies: 12,
                            time: lang === 'ar' ? 'منذ ساعتين' : '2 hours ago',
                            category: lang === 'ar' ? 'تطوير' : 'Development'
                          },
                          {
                            title: lang === 'ar' ? 'أفضل الممارسات لتصميم التقارير' : 'Best practices for report design',
                            author: 'Sarah_UX',
                            replies: 8,
                            time: lang === 'ar' ? 'منذ 4 ساعات' : '4 hours ago',
                            category: lang === 'ar' ? 'تصميم' : 'Design'
                          },
                          {
                            title: lang === 'ar' ? 'مشكلة في الاتصال بـ Oracle APEX' : 'Oracle APEX connection issue',
                            author: 'Mohamed_DB',
                            replies: 15,
                            time: lang === 'ar' ? 'منذ 6 ساعات' : '6 hours ago',
                            category: lang === 'ar' ? 'دعم' : 'Support'
                          }
                        ].map(discussion => `
                            <div class="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                                <div class="flex items-start justify-between mb-2">
                                    <h4 class="font-semibold text-arc-gray hover:text-arc-blue transition-colors">${discussion.title}</h4>
                                    <span class="bg-arc-${discussion.category === 'تطوير' || discussion.category === 'Development' ? 'blue' : discussion.category === 'تصميم' || discussion.category === 'Design' ? 'green' : 'orange'}/10 text-arc-${discussion.category === 'تطوير' || discussion.category === 'Development' ? 'blue' : discussion.category === 'تصميم' || discussion.category === 'Design' ? 'green' : 'orange'} px-2 py-1 rounded text-xs font-medium">
                                        ${discussion.category}
                                    </span>
                                </div>
                                <div class="flex items-center justify-between text-sm text-gray-600">
                                    <div class="flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}">
                                        <div class="w-6 h-6 bg-arc-blue rounded-full flex items-center justify-center">
                                            <span class="text-white text-xs font-bold">${discussion.author[0]}</span>
                                        </div>
                                        <span>${discussion.author}</span>
                                    </div>
                                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                                        <span class="flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}">
                                            <i class="fas fa-reply text-xs"></i>
                                            <span>${discussion.replies}</span>
                                        </span>
                                        <span>${discussion.time}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <button class="w-full mt-4 bg-arc-blue text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                        ${lang === 'ar' ? 'عرض جميع المناقشات' : 'View All Discussions'}
                    </button>
                </div>

                <!-- Popular Resources -->
                <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold text-arc-gray flex items-center">
                            <i class="fas fa-book text-arc-green ${isRTL ? 'ml-3' : 'mr-3'}"></i>
                            ${lang === 'ar' ? 'الموارد الشائعة' : 'Popular Resources'}
                        </h3>
                        <span class="bg-arc-green/10 text-arc-green px-3 py-1 rounded-full text-sm font-medium">
                            ${lang === 'ar' ? 'مُحدث' : 'Updated'}
                        </span>
                    </div>
                    
                    <div class="space-y-4">
                        ${[
                          {
                            title: lang === 'ar' ? 'دليل البداية السريعة' : 'Quick Start Guide',
                            description: lang === 'ar' ? 'تعلم أساسيات ARC في 10 دقائق' : 'Learn ARC basics in 10 minutes',
                            type: lang === 'ar' ? 'دليل' : 'Guide',
                            downloads: 2847,
                            icon: 'fas fa-rocket'
                          },
                          {
                            title: lang === 'ar' ? 'قوالب التقارير الجاهزة' : 'Ready Report Templates',
                            description: lang === 'ar' ? 'مجموعة من القوالب الاحترافية' : 'Collection of professional templates',
                            type: lang === 'ar' ? 'قوالب' : 'Templates',
                            downloads: 1924,
                            icon: 'fas fa-file-alt'
                          },
                          {
                            title: lang === 'ar' ? 'API Documentation' : 'API Documentation',
                            description: lang === 'ar' ? 'دليل شامل لـ API' : 'Complete API reference',
                            type: lang === 'ar' ? 'وثائق' : 'Docs',
                            downloads: 1567,
                            icon: 'fas fa-code'
                          }
                        ].map(resource => `
                            <div class="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                                <div class="flex items-start space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                                    <div class="w-12 h-12 bg-arc-green rounded-xl flex items-center justify-center">
                                        <i class="${resource.icon} text-white"></i>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex items-center justify-between mb-1">
                                            <h4 class="font-semibold text-arc-gray">${resource.title}</h4>
                                            <span class="bg-arc-green/10 text-arc-green px-2 py-1 rounded text-xs font-medium">
                                                ${resource.type}
                                            </span>
                                        </div>
                                        <p class="text-sm text-gray-600 mb-2">${resource.description}</p>
                                        <div class="flex items-center justify-between text-xs text-gray-500">
                                            <span class="flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}">
                                                <i class="fas fa-download"></i>
                                                <span>${resource.downloads.toLocaleString()} ${lang === 'ar' ? 'تحميل' : 'downloads'}</span>
                                            </span>
                                            <button class="text-arc-green hover:text-arc-green/80 font-medium">
                                                ${lang === 'ar' ? 'تحميل' : 'Download'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <button class="w-full mt-4 bg-arc-green text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                        ${lang === 'ar' ? 'عرض جميع الموارد' : 'View All Resources'}
                    </button>
                </div>

            </div>

            <!-- Call to Action -->
            <div class="text-center bg-gradient-to-r from-arc-blue to-arc-purple rounded-2xl p-8">
                <h2 class="text-3xl font-bold text-white mb-4">
                    ${lang === 'ar' ? 'جاهز للانضمام إلى مجتمعنا؟' : 'Ready to Join Our Community?'}
                </h2>
                <p class="text-xl text-white/90 mb-6">
                    ${lang === 'ar' ? 'احصل على المساعدة، شارك الخبرات، وتواصل مع المطورين حول العالم' : 'Get help, share experiences, and connect with developers worldwide'}
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/app/signup?lang=${lang}" class="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                        ${lang === 'ar' ? '🚀 انضم مجاناً' : '🚀 Join Free'}
                    </a>
                    <a href="/app/login?lang=${lang}" class="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
                        ${lang === 'ar' ? 'لدي حساب بالفعل' : 'I Have Account'}
                    </a>
                </div>
            </div>
        </div>

        <script>
            function joinCommunity() {
                window.location.href = '/app/signup?lang=${lang}';
            }
            
            function exploreCommunity() {
                alert('${lang === 'ar' ? 'سيتم فتح منصة المجتمع قريباً!' : 'Community platform opening soon!'}');
            }
        </script>

    </body>
    </html>
  `);
});

// Help page with all internal links
app.get('/help', (c) => {
  const lang = getLanguage(c);
  const t = getTranslation(lang);
  const isRTL = lang === 'ar';
  const languages = getSupportedLanguages();

  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${lang === 'ar' ? 'مركز المساعدة - ARC' : 'Help Center - ARC'}</title>
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'arc-blue': '#5A9BD5',
                  'arc-orange': '#EA6700', 
                  'arc-green': '#66B032',
                  'arc-gray': '#4A4A4A'
                }
              }
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
          body { font-family: ${isRTL ? "'Cairo', 'Inter'" : "'Inter'"}, sans-serif; }
          .help-card { transition: all 0.3s ease; }
          .help-card:hover { transform: translateY(-5px); }
        </style>
    </head>
    <body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen ${isRTL ? 'rtl' : ''}">
        
        <!-- Help Header -->
        <header class="bg-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <a href="/?lang=${lang}" class="flex items-center">
                            <div class="w-10 h-10 bg-arc-blue rounded-full flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'}">
                                <div class="w-6 h-6 relative">
                                    <div class="absolute w-4 h-4 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-0 ${isRTL ? 'left-2' : 'right-2'} w-2 h-2 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                            <span class="text-xl font-bold text-arc-gray">ARC ${lang === 'ar' ? 'مساعدة' : 'Help'}</span>
                        </a>
                    </div>
                    
                    <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <!-- Language Selector -->
                        <div class="relative group">
                            <button class="flex items-center text-arc-gray hover:text-arc-blue transition-colors">
                                <i class="fas fa-globe ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${languages.find(l => l.code === lang)?.nativeName || 'English'}
                                <i class="fas fa-chevron-down ${isRTL ? 'mr-2' : 'ml-2'} text-xs"></i>
                            </button>
                            <div class="absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                ${languages.map(l => `
                                    <a href="/help?lang=${l.code}" class="block px-4 py-2 text-sm text-arc-gray hover:bg-gray-100 hover:text-arc-blue">
                                        ${l.nativeName}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                        <a href="/?lang=${lang}" class="bg-arc-blue text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                            ${lang === 'ar' ? 'العودة للموقع' : 'Back to Site'}
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Help Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <!-- Hero Section -->
            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-bold text-arc-gray mb-4">
                    ${lang === 'ar' ? '🔍 مركز المساعدة الشامل' : '🔍 Comprehensive Help Center'}
                </h1>
                <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    ${lang === 'ar' 
                      ? 'اكتشف جميع مواقع وصفحات ARC - دليلك الشامل للتنقل والاستفادة من جميع الخدمات المتاحة'
                      : 'Explore all ARC sites and pages - your comprehensive guide to navigate and benefit from all available services'
                    }
                </p>
                
                <!-- Quick Search -->
                <div class="max-w-md mx-auto relative">
                    <input type="text" id="searchInput" placeholder="${lang === 'ar' ? 'البحث في المساعدة...' : 'Search help...'}" 
                           class="w-full px-4 py-3 ${isRTL ? 'pr-12' : 'pl-12'} border border-gray-300 rounded-xl focus:ring-2 focus:ring-arc-blue focus:border-arc-blue">
                    <i class="fas fa-search absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
            </div>

            <!-- Main Platforms -->
            <div class="mb-12">
                <h2 class="text-3xl font-bold text-arc-gray mb-6 text-center">
                    ${lang === 'ar' ? '🏢 المنصات الرئيسية' : '🏢 Main Platforms'}
                </h2>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    <!-- Main Website -->
                    <div class="help-card bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div class="w-16 h-16 bg-gradient-to-r from-arc-blue to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                            <i class="fas fa-home text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-arc-gray mb-2 text-center">
                            ${lang === 'ar' ? 'الموقع الرئيسي' : 'Main Website'}
                        </h3>
                        <p class="text-gray-600 text-sm mb-4 text-center">
                            ${lang === 'ar' ? 'معلومات المنتج، الأسعار، المدونة' : 'Product info, pricing, blog'}
                        </p>
                        <div class="space-y-2">
                            <a href="/?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'الصفحة الرئيسية' : 'Homepage'}
                            </a>
                            <a href="/about?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'من نحن' : 'About Us'}
                            </a>
                            <a href="/blog?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'المدونة' : 'Blog'}
                            </a>
                            <a href="/pricing/free?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'الأسعار' : 'Pricing'}
                            </a>
                        </div>
                    </div>

                    <!-- App Platform -->
                    <div class="help-card bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div class="w-16 h-16 bg-gradient-to-r from-arc-orange to-red-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                            <i class="fas fa-desktop text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-arc-gray mb-2 text-center">
                            ${lang === 'ar' ? 'منصة التطبيق' : 'App Platform'}
                        </h3>
                        <p class="text-gray-600 text-sm mb-4 text-center">
                            ${lang === 'ar' ? 'تسجيل الدخول، لوحة التحكم، الأدوات' : 'Login, dashboard, tools'}
                        </p>
                        <div class="space-y-2">
                            <a href="/app/login?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
                            </a>
                            <a href="/app/signup?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
                            </a>
                            <a href="/app/dashboard?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                            </a>
                            <a href="/app/reports?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'التقارير' : 'Reports'}
                            </a>
                        </div>
                    </div>

                    <!-- Demo Site -->
                    <div class="help-card bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div class="w-16 h-16 bg-gradient-to-r from-arc-green to-emerald-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                            <i class="fas fa-play-circle text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-arc-gray mb-2 text-center">
                            ${lang === 'ar' ? 'موقع العروض التوضيحية' : 'Demo Site'}
                        </h3>
                        <p class="text-gray-600 text-sm mb-4 text-center">
                            ${lang === 'ar' ? 'تجربة المنتج، عروض تفاعلية' : 'Try product, interactive demos'}
                        </p>
                        <div class="space-y-2">
                            <a href="/demo-site?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'الصفحة الرئيسية' : 'Demo Homepage'}
                            </a>
                            <a href="/demo?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'العرض التفاعلي' : 'Interactive Demo'}
                            </a>
                            <a href="/demo-site/features?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'الميزات' : 'Features'}
                            </a>
                            <a href="/demo-site/tutorials?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'الدروس' : 'Tutorials'}
                            </a>
                        </div>
                    </div>

                    <!-- Community -->
                    <div class="help-card bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div class="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                            <i class="fas fa-users text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-arc-gray mb-2 text-center">
                            ${lang === 'ar' ? 'منصة المجتمع' : 'Community Platform'}
                        </h3>
                        <p class="text-gray-600 text-sm mb-4 text-center">
                            ${lang === 'ar' ? 'منتديات، مناقشات، دعم' : 'Forums, discussions, support'}
                        </p>
                        <div class="space-y-2">
                            <a href="/community?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'الصفحة الرئيسية' : 'Community Home'}
                            </a>
                            <a href="/community/forums?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'المنتديات' : 'Forums'}
                            </a>
                            <a href="/community/support?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'الدعم الفني' : 'Support'}
                            </a>
                            <a href="/community/events?lang=${lang}" class="block text-arc-blue hover:text-arc-orange transition-colors text-sm">
                                <i class="fas fa-chevron-${isRTL ? 'left' : 'right'} ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${lang === 'ar' ? 'الفعاليات' : 'Events'}
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <!-- All Pages Directory -->
            <div class="mb-12">
                <h2 class="text-3xl font-bold text-arc-gray mb-6 text-center">
                    ${lang === 'ar' ? '📖 دليل جميع الصفحات' : '📖 Complete Page Directory'}
                </h2>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    <!-- User Pages -->
                    <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 class="text-lg font-bold text-arc-gray mb-4 flex items-center">
                            <i class="fas fa-user ${isRTL ? 'ml-3' : 'mr-3'} text-arc-blue"></i>
                            ${lang === 'ar' ? 'صفحات المستخدم' : 'User Pages'}
                        </h3>
                        <div class="space-y-2 text-sm">
                            <a href="/signup?lang=${lang}" class="block text-gray-600 hover:text-arc-blue transition-colors">
                                <i class="fas fa-user-plus ${isRTL ? 'ml-2' : 'mr-2'} w-4"></i>
                                ${lang === 'ar' ? 'تسجيل عام' : 'General Signup'}
                            </a>
                            <a href="/signup/process?lang=${lang}" class="block text-gray-600 hover:text-arc-blue transition-colors">
                                <i class="fas fa-clipboard-list ${isRTL ? 'ml-2' : 'mr-2'} w-4"></i>
                                ${lang === 'ar' ? 'عملية التسجيل' : 'Signup Process'}
                            </a>
                            <a href="/profile?lang=${lang}" class="block text-gray-600 hover:text-arc-blue transition-colors">
                                <i class="fas fa-user-circle ${isRTL ? 'ml-2' : 'mr-2'} w-4"></i>
                                ${lang === 'ar' ? 'الملف الشخصي' : 'User Profile'}
                            </a>
                            <a href="/login?lang=${lang}" class="block text-gray-600 hover:text-arc-blue transition-colors">
                                <i class="fas fa-sign-in-alt ${isRTL ? 'ml-2' : 'mr-2'} w-4"></i>
                                ${lang === 'ar' ? 'تسجيل دخول عام' : 'General Login'}
                            </a>
                        </div>
                    </div>

                    <!-- Product Pages -->
                    <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 class="text-lg font-bold text-arc-gray mb-4 flex items-center">
                            <i class="fas fa-box ${isRTL ? 'ml-3' : 'mr-3'} text-arc-orange"></i>
                            ${lang === 'ar' ? 'صفحات المنتج' : 'Product Pages'}
                        </h3>
                        <div class="space-y-2 text-sm">
                            <a href="/pricing/free?lang=${lang}" class="block text-gray-600 hover:text-arc-blue transition-colors">
                                <i class="fas fa-gift ${isRTL ? 'ml-2' : 'mr-2'} w-4"></i>
                                ${lang === 'ar' ? 'الخطة المجانية' : 'Free Plan'}
                            </a>
                            <a href="/pricing/pro?lang=${lang}" class="block text-gray-600 hover:text-arc-blue transition-colors">
                                <i class="fas fa-crown ${isRTL ? 'ml-2' : 'mr-2'} w-4"></i>
                                ${lang === 'ar' ? 'الخطة الاحترافية' : 'Pro Plan'}
                            </a>
                            <a href="/pricing/developer?lang=${lang}" class="block text-gray-600 hover:text-arc-blue transition-colors">
                                <i class="fas fa-code ${isRTL ? 'ml-2' : 'mr-2'} w-4"></i>
                                ${lang === 'ar' ? 'خطة المطورين' : 'Developer Plan'}
                            </a>
                            <a href="/pricing/enterprise?lang=${lang}" class="block text-gray-600 hover:text-arc-blue transition-colors">
                                <i class="fas fa-building ${isRTL ? 'ml-2' : 'mr-2'} w-4"></i>
                                ${lang === 'ar' ? 'الخطة المؤسسية' : 'Enterprise Plan'}
                            </a>
                        </div>
                    </div>

                    <!-- Information Pages -->
                    <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 class="text-lg font-bold text-arc-gray mb-4 flex items-center">
                            <i class="fas fa-info-circle ${isRTL ? 'ml-3' : 'mr-3'} text-arc-green"></i>
                            ${lang === 'ar' ? 'صفحات المعلومات' : 'Information Pages'}
                        </h3>
                        <div class="space-y-2 text-sm">
                            <a href="/contact?lang=${lang}" class="block text-gray-600 hover:text-arc-blue transition-colors">
                                <i class="fas fa-envelope ${isRTL ? 'ml-2' : 'mr-2'} w-4"></i>
                                ${lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                            </a>
                            <a href="/vision?lang=${lang}" class="block text-gray-600 hover:text-arc-blue transition-colors">
                                <i class="fas fa-eye ${isRTL ? 'ml-2' : 'mr-2'} w-4"></i>
                                ${lang === 'ar' ? 'رؤيتنا' : 'Our Vision'}
                            </a>
                            <a href="/404?lang=${lang}" class="block text-gray-600 hover:text-arc-blue transition-colors">
                                <i class="fas fa-exclamation-triangle ${isRTL ? 'ml-2' : 'mr-2'} w-4"></i>
                                ${lang === 'ar' ? 'صفحة الخطأ 404' : '404 Error Page'}
                            </a>
                            <a href="/help?lang=${lang}" class="block text-gray-600 hover:text-arc-blue transition-colors">
                                <i class="fas fa-question-circle ${isRTL ? 'ml-2' : 'mr-2'} w-4"></i>
                                ${lang === 'ar' ? 'مركز المساعدة' : 'Help Center'}
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
                <h2 class="text-2xl font-bold text-arc-gray mb-6">
                    ${lang === 'ar' ? '⚡ إجراءات سريعة' : '⚡ Quick Actions'}
                </h2>
                
                <div class="grid md:grid-cols-4 gap-4">
                    <a href="/app/signup?lang=${lang}" class="bg-gradient-to-r from-arc-blue to-blue-600 text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all transform hover:scale-105">
                        <i class="fas fa-rocket mb-2 text-2xl block"></i>
                        <span class="font-bold">${lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}</span>
                    </a>
                    
                    <a href="/demo-site?lang=${lang}" class="bg-gradient-to-r from-arc-green to-emerald-600 text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all transform hover:scale-105">
                        <i class="fas fa-play mb-2 text-2xl block"></i>
                        <span class="font-bold">${lang === 'ar' ? 'جرب العرض' : 'Try Demo'}</span>
                    </a>
                    
                    <a href="/community?lang=${lang}" class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all transform hover:scale-105">
                        <i class="fas fa-users mb-2 text-2xl block"></i>
                        <span class="font-bold">${lang === 'ar' ? 'انضم للمجتمع' : 'Join Community'}</span>
                    </a>
                    
                    <a href="/contact?lang=${lang}" class="bg-gradient-to-r from-arc-orange to-red-600 text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all transform hover:scale-105">
                        <i class="fas fa-headset mb-2 text-2xl block"></i>
                        <span class="font-bold">${lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}</span>
                    </a>
                </div>
            </div>

        </div>

        <!-- Help Footer -->
        <footer class="bg-white border-t border-gray-200 mt-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="text-center">
                    <h3 class="text-lg font-bold text-arc-gray mb-4">
                        ${lang === 'ar' ? 'هل تحتاج مساعدة إضافية؟' : 'Need Additional Help?'}
                    </h3>
                    <p class="text-gray-600 mb-6">
                        ${lang === 'ar' 
                          ? 'فريق الدعم متاح 24/7 لمساعدتك في أي استفسار'
                          : 'Our support team is available 24/7 to help with any questions'
                        }
                    </p>
                    <div class="flex justify-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
                        <a href="/contact?lang=${lang}" class="bg-arc-blue text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors">
                            ${lang === 'ar' ? 'تواصل مع الدعم' : 'Contact Support'}
                        </a>
                        <a href="/community/support?lang=${lang}" class="border border-arc-blue text-arc-blue px-6 py-3 rounded-lg hover:bg-arc-blue hover:text-white transition-colors">
                            ${lang === 'ar' ? 'المنتدى' : 'Community Forum'}
                        </a>
                    </div>
                </div>
            </div>
        </footer>

        <script>
            // Search functionality
            document.getElementById('searchInput').addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const cards = document.querySelectorAll('.help-card');
                
                cards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = searchTerm === '' ? 'block' : 'none';
                    }
                });
            });
        </script>

    </body>
    </html>
  `);
});

export default app
