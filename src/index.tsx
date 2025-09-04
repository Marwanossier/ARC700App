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
                        
                        <a href="https://app.apex-reportcraft.com/login" target="_blank" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.login}</a>
                        <a href="https://app.apex-reportcraft.com/signup" target="_blank" class="bg-arc-blue text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">${t.nav.getStarted}</a>
                        
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

        <!-- Hero Section -->
        <section id="home" class="relative overflow-hidden">
            <div class="gradient-bg">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div class="text-center">
                        <div class="float-animation mb-8">
                            <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                <div class="w-16 h-16 relative">
                                    <div class="absolute w-10 h-10 bg-arc-orange rounded-full"></div>
                                    <div class="absolute top-1 ${isRTL ? 'left-5' : 'right-5'} w-5 h-5 bg-arc-green rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        
                        <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">
                            ${t.hero.title}
                        </h1>
                        <p class="text-xl text-white/90 mb-6">
                            ${t.hero.subtitle}
                        </p>
                        <p class="text-lg text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
                            ${t.hero.description}
                        </p>
                        
                        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href="https://app.apex-reportcraft.com/signup" target="_blank" class="bg-white text-arc-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                                <i class="fas fa-rocket ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${t.hero.ctaPrimary}
                            </a>
                            <a href="https://demo.apex-reportcraft.com" target="_blank" class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-arc-blue transition-colors">
                                <i class="fas fa-play ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${t.hero.ctaSecondary}
                            </a>
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
                    <div class="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                        <div class="w-12 h-12 bg-arc-blue rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-mouse-pointer text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-arc-gray mb-3">${t.features.easyToUse.title}</h3>
                        <p class="text-gray-600">${t.features.easyToUse.description}</p>
                    </div>
                    
                    <div class="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                        <div class="w-12 h-12 bg-arc-orange rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-code text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-arc-gray mb-3">${t.features.apexNative.title}</h3>
                        <p class="text-gray-600">${t.features.apexNative.description}</p>
                    </div>
                    
                    <div class="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                        <div class="w-12 h-12 bg-arc-green rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-graduation-cap text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-arc-gray mb-3">${t.features.quickLearning.title}</h3>
                        <p class="text-gray-600">${t.features.quickLearning.description}</p>
                    </div>
                    
                    <div class="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                        <div class="w-12 h-12 bg-arc-blue rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-bolt text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-arc-gray mb-3">${t.features.powerful.title}</h3>
                        <p class="text-gray-600">${t.features.powerful.description}</p>
                    </div>
                    
                    <div class="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                        <div class="w-12 h-12 bg-arc-orange rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-cogs text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-arc-gray mb-3">${t.features.flexible.title}</h3>
                        <p class="text-gray-600">${t.features.flexible.description}</p>
                    </div>
                    
                    <div class="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                        <div class="w-12 h-12 bg-arc-green rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-shield-alt text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-arc-gray mb-3">${t.features.secure.title}</h3>
                        <p class="text-gray-600">${t.features.secure.description}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Pricing Section -->
        <section id="pricing" class="py-20 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-arc-gray mb-4">${t.pricing.title}</h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">${t.pricing.subtitle}</p>
                </div>
                
                <div class="flex justify-center mb-8">
                    <div class="bg-white rounded-lg p-1 shadow-sm">
                        <div class="flex">
                            <button class="px-6 py-2 rounded-md bg-arc-blue text-white font-medium">${t.pricing.monthly}</button>
                            <button class="px-6 py-2 rounded-md text-arc-gray font-medium">${t.pricing.yearly}</button>
                        </div>
                    </div>
                </div>
                
                <div class="grid lg:grid-cols-5 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    <!-- Free Plan -->
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                        <h3 class="text-lg font-semibold text-arc-gray mb-2">${t.pricing.free.name}</h3>
                        <div class="text-3xl font-bold text-arc-green mb-2">${t.pricing.free.price}<span class="text-sm text-gray-500"> ${lang === 'ar' ? 'للأبد' : 'forever'}</span></div>
                        <p class="text-gray-600 mb-4 text-sm">${t.pricing.free.description}</p>
                        
                        <ul class="space-y-2 mb-6">
                            ${t.pricing.free.features.map(feature => `
                                <li class="flex items-center">
                                    <i class="fas fa-check text-arc-green ${isRTL ? 'ml-2' : 'mr-2'} text-sm"></i>
                                    <span class="text-gray-600 text-sm">${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                        
                        <a href="https://app.apex-reportcraft.com/signup?plan=free" target="_blank" class="w-full bg-arc-green text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-center block text-sm">
                            ${t.pricing.free.cta}
                        </a>
                    </div>
                    
                    <!-- Pro Plan (Most Popular) -->
                    <div class="bg-white rounded-xl p-6 shadow-xl border-2 border-arc-orange relative">
                        <div class="absolute -top-3 ${isRTL ? 'right-2' : 'left-2'} bg-arc-orange text-white px-3 py-1 rounded-full text-xs font-semibold">
                            ${t.pricing.pro.popular}
                        </div>
                        
                        <h3 class="text-lg font-semibold text-arc-gray mb-2">${t.pricing.pro.name}</h3>
                        <div class="text-3xl font-bold text-arc-orange mb-2">${t.pricing.pro.price}<span class="text-sm text-gray-500">/${t.pricing.monthly}</span></div>
                        <p class="text-gray-600 mb-4 text-sm">${t.pricing.pro.description}</p>
                        
                        <ul class="space-y-2 mb-6">
                            ${t.pricing.pro.features.map(feature => `
                                <li class="flex items-center">
                                    <i class="fas fa-check text-arc-green ${isRTL ? 'ml-2' : 'mr-2'} text-sm"></i>
                                    <span class="text-gray-600 text-sm">${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                        
                        <a href="https://app.apex-reportcraft.com/signup?plan=pro" target="_blank" class="w-full bg-arc-orange text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-center block text-sm">
                            ${t.pricing.pro.cta}
                        </a>
                    </div>
                    
                    <!-- Developer Plan -->
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                        <h3 class="text-lg font-semibold text-arc-gray mb-2">${t.pricing.developer.name}</h3>
                        <div class="text-3xl font-bold text-arc-blue mb-2">${t.pricing.developer.price}<span class="text-sm text-gray-500">/${t.pricing.monthly}</span></div>
                        <p class="text-gray-600 mb-4 text-sm">${t.pricing.developer.description}</p>
                        
                        <ul class="space-y-2 mb-6">
                            ${t.pricing.developer.features.map(feature => `
                                <li class="flex items-center">
                                    <i class="fas fa-check text-arc-green ${isRTL ? 'ml-2' : 'mr-2'} text-sm"></i>
                                    <span class="text-gray-600 text-sm">${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                        
                        <a href="https://app.apex-reportcraft.com/signup?plan=developer" target="_blank" class="w-full bg-arc-blue text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-center block text-sm">
                            ${t.pricing.developer.cta}
                        </a>
                    </div>
                    
                    <!-- Enterprise Plan -->
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                        <h3 class="text-lg font-semibold text-arc-gray mb-2">${t.pricing.enterprise.name}</h3>
                        <div class="text-3xl font-bold text-arc-gray mb-2">${t.pricing.enterprise.price}<span class="text-sm text-gray-500">/${t.pricing.monthly}</span></div>
                        <p class="text-gray-600 mb-4 text-sm">${t.pricing.enterprise.description}</p>
                        
                        <ul class="space-y-2 mb-6">
                            ${t.pricing.enterprise.features.map(feature => `
                                <li class="flex items-center">
                                    <i class="fas fa-check text-arc-green ${isRTL ? 'ml-2' : 'mr-2'} text-sm"></i>
                                    <span class="text-gray-600 text-sm">${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                        
                        <a href="https://app.apex-reportcraft.com/contact/enterprise" target="_blank" class="w-full bg-arc-gray text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-center block text-sm">
                            ${t.pricing.enterprise.cta}
                        </a>
                    </div>
                    
                    <!-- White Label Plan -->
                    <div class="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 shadow-lg border border-purple-200">
                        <h3 class="text-lg font-semibold text-purple-800 mb-2">${t.pricing.whiteLabel.name}</h3>
                        <div class="text-3xl font-bold text-purple-600 mb-2">${t.pricing.whiteLabel.price}<span class="text-sm text-gray-500"> ${lang === 'ar' ? 'سنوياً' : '/year'}</span></div>
                        <p class="text-gray-600 mb-4 text-sm">${t.pricing.whiteLabel.description}</p>
                        
                        <ul class="space-y-2 mb-6">
                            ${t.pricing.whiteLabel.features.map(feature => `
                                <li class="flex items-center">
                                    <i class="fas fa-star text-purple-500 ${isRTL ? 'ml-2' : 'mr-2'} text-sm"></i>
                                    <span class="text-gray-600 text-sm">${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                        
                        <a href="https://app.apex-reportcraft.com/contact/white-label" target="_blank" class="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-center block text-sm">
                            ${t.pricing.whiteLabel.cta}
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
                            <li><a href="https://blog.apex-reportcraft.com" target="_blank" class="text-gray-300 hover:text-white transition-colors">${t.footer.company.blog}</a></li>
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
                        <div class="w-8 h-8 bg-arc-blue rounded-full flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-robot text-white text-xs"></i>
                        </div>
                        <div class="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-xs">
                            <p class="text-sm text-gray-800">
                                ${lang === 'ar' 
                                    ? 'مرحباً! أنا مساعد ARC الذكي. كيف يمكنني مساعدتك اليوم؟' 
                                    : 'Hello! I\'m the ARC Smart Assistant. How can I help you today?'
                                }
                            </p>
                        </div>
                    </div>
                    
                    <!-- Quick Action Buttons -->
                    <div class="space-y-2 mb-4">
                        <button class="chat-quick-btn w-full text-${isRTL ? 'right' : 'left'} bg-white hover:bg-arc-blue hover:text-white transition-colors p-3 rounded-lg shadow-sm text-sm border border-gray-200">
                            <i class="fas fa-question-circle ${isRTL ? 'ml-2' : 'mr-2'} text-arc-blue"></i>
                            ${lang === 'ar' ? 'كيف أبدأ مع ARC؟' : 'How do I get started with ARC?'}
                        </button>
                        <button class="chat-quick-btn w-full text-${isRTL ? 'right' : 'left'} bg-white hover:bg-arc-blue hover:text-white transition-colors p-3 rounded-lg shadow-sm text-sm border border-gray-200">
                            <i class="fas fa-dollar-sign ${isRTL ? 'ml-2' : 'mr-2'} text-arc-green"></i>
                            ${lang === 'ar' ? 'معلومات عن الأسعار' : 'Pricing information'}
                        </button>
                        <button class="chat-quick-btn w-full text-${isRTL ? 'right' : 'left'} bg-white hover:bg-arc-blue hover:text-white transition-colors p-3 rounded-lg shadow-sm text-sm border border-gray-200">
                            <i class="fas fa-cog ${isRTL ? 'ml-2' : 'mr-2'} text-arc-orange"></i>
                            ${lang === 'ar' ? 'المساعدة التقنية' : 'Technical support'}
                        </button>
                        <button class="chat-quick-btn w-full text-${isRTL ? 'right' : 'left'} bg-white hover:bg-arc-blue hover:text-white transition-colors p-3 rounded-lg shadow-sm text-sm border border-gray-200">
                            <i class="fas fa-book ${isRTL ? 'ml-2' : 'mr-2'} text-purple-600"></i>
                            ${lang === 'ar' ? 'الوثائق والدروس' : 'Documentation & tutorials'}
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
    </body>
    </html>
  `);
});

export default app
