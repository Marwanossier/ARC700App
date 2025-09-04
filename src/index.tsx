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
                        <a href="#community" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.community}</a>
                        <a href="#" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.documentation}</a>
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
                        
                        <a href="#" class="text-arc-gray hover:text-arc-blue transition-colors">${t.nav.login}</a>
                        <a href="#" class="bg-arc-blue text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">${t.nav.getStarted}</a>
                        
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
                            <a href="#" class="bg-white text-arc-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                                <i class="fas fa-rocket ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                                ${t.hero.ctaPrimary}
                            </a>
                            <a href="#" class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-arc-blue transition-colors">
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
                        
                        <a href="#" class="w-full bg-arc-green text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-center block text-sm">
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
                        
                        <a href="#" class="w-full bg-arc-orange text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-center block text-sm">
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
                        
                        <a href="#" class="w-full bg-arc-blue text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-center block text-sm">
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
                        
                        <a href="#" class="w-full bg-arc-gray text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-center block text-sm">
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
                        
                        <a href="#" class="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-center block text-sm">
                            ${t.pricing.whiteLabel.cta}
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Market Leadership Section -->
        <section class="py-20 bg-gradient-to-br from-arc-blue to-arc-orange text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-white mb-4">${lang === 'ar' ? 'قائد السوق في تقارير APEX' : 'Market Leader in APEX Reporting'}</h2>
                    <p class="text-xl text-white/90 max-w-3xl mx-auto">${lang === 'ar' ? 'نحن نهدف للسيطرة على سوق تقارير Oracle APEX بحلول مبتكرة وشراكات استراتيجية' : 'We aim to dominate the Oracle APEX reporting market with innovative solutions and strategic partnerships'}</p>
                </div>
                
                <div class="grid md:grid-cols-4 gap-8 text-center">
                    <div class="bg-white/10 backdrop-blur rounded-xl p-6">
                        <div class="text-3xl font-bold mb-2">$264.40B</div>
                        <p class="text-white/80">${lang === 'ar' ? 'سوق المنصات منخفضة الكود بحلول 2032' : 'Low-code platform market by 2032'}</p>
                    </div>
                    
                    <div class="bg-white/10 backdrop-blur rounded-xl p-6">
                        <div class="text-3xl font-bold mb-2">45%</div>
                        <p class="text-white/80">${lang === 'ar' ? 'نمو سنوي في اعتماد APEX بالخليج' : 'Annual APEX adoption growth in Gulf'}</p>
                    </div>
                    
                    <div class="bg-white/10 backdrop-blur rounded-xl p-6">
                        <div class="text-3xl font-bold mb-2">85%</div>
                        <p class="text-white/80">${lang === 'ar' ? 'عدم رضا العملاء عن أدوات التقارير الحالية' : 'Customer dissatisfaction with current tools'}</p>
                    </div>
                    
                    <div class="bg-white/10 backdrop-blur rounded-xl p-6">
                        <div class="text-3xl font-bold mb-2">$30B+</div>
                        <p class="text-white/80">${lang === 'ar' ? 'استثمارات التحول الرقمي بالخليج' : 'Digital transformation investments in Gulf'}</p>
                    </div>
                </div>
                
                <div class="mt-12 bg-white/10 backdrop-blur rounded-xl p-8">
                    <h3 class="text-2xl font-bold text-center mb-8">${lang === 'ar' ? 'مقارنة مع المنافسين' : 'Competitive Advantage'}</h3>
                    <div class="grid md:grid-cols-3 gap-6 text-sm">
                        <div>
                            <h4 class="font-semibold mb-3 text-arc-orange">APEX Office Print (AOP)</h4>
                            <ul class="space-y-1 text-white/80">
                                <li>• ${lang === 'ar' ? 'يتطلب خادم منفصل' : 'Requires separate server'}</li>
                                <li>• ${lang === 'ar' ? 'تكلفة عالية (~$3,500)' : 'High cost (~$3,500)'}</li>
                                <li>• ${lang === 'ar' ? 'إعداد معقد' : 'Complex setup'}</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-3 text-arc-green">ARD Advantage</h4>
                            <ul class="space-y-1 text-white/80">
                                <li>• ${lang === 'ar' ? 'تكامل أصلي بـ APEX' : 'Native APEX integration'}</li>
                                <li>• ${lang === 'ar' ? 'أسعار مرنة من $0' : 'Flexible pricing from $0'}</li>
                                <li>• ${lang === 'ar' ? 'دعم العربية الكامل' : 'Complete Arabic support'}</li>
                                <li>• ${lang === 'ar' ? 'مساعد ذكي للتصميم' : 'AI design assistant'}</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-3 text-gray-300">JasperReports</h4>
                            <ul class="space-y-1 text-white/80">
                                <li>• ${lang === 'ar' ? 'غير مدمج مع APEX' : 'Not APEX-native'}</li>
                                <li>• ${lang === 'ar' ? 'يحتاج Java وPL/SQL' : 'Requires Java & PL/SQL'}</li>
                                <li>• ${lang === 'ar' ? 'واجهة قديمة' : 'Legacy interface'}</li>
                            </ul>
                        </div>
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
                    <div class="text-center p-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl text-white">
                        <i class="fas fa-users text-5xl mb-4"></i>
                        <h3 class="text-xl font-semibold mb-2">${t.community.discord.title}</h3>
                        <p class="mb-4 opacity-90">${t.community.discord.description}</p>
                        <div class="text-2xl font-bold">850,000+ ${t.community.discord.members}</div>
                        <p class="text-sm opacity-75 mt-2">${lang === 'ar' ? 'مطور Oracle APEX عالمياً' : 'Oracle APEX developers worldwide'}</p>
                    </div>
                    
                    <div class="text-center p-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white">
                        <i class="fas fa-headset text-5xl mb-4"></i>
                        <h3 class="text-xl font-semibold mb-2">${t.community.forum.title}</h3>
                        <p class="mb-4 opacity-90">${t.community.forum.description}</p>
                        <div class="text-2xl font-bold">24/7 ${t.community.forum.topics}</div>
                        <p class="text-sm opacity-75 mt-2">${lang === 'ar' ? 'دعم احترافي بالعربية' : 'Professional Arabic Support'}</p>
                    </div>
                    
                    <div class="text-center p-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white">
                        <i class="fas fa-handshake text-5xl mb-4"></i>
                        <h3 class="text-xl font-semibold mb-2">${t.community.github.title}</h3>
                        <p class="mb-4 opacity-90">${t.community.github.description}</p>
                        <div class="text-2xl font-bold">20+ ${t.community.github.stars}</div>
                        <p class="text-sm opacity-75 mt-2">${lang === 'ar' ? 'شريك معتمد في الخليج' : 'Certified partners in GCC'}</p>
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
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">${t.footer.product.features}</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">${t.footer.product.pricing}</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">${t.footer.product.documentation}</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">${t.footer.product.releases}</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold mb-4">${t.footer.company.title}</h4>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">${t.footer.company.about}</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">${t.footer.company.careers}</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">${t.footer.company.press}</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">${t.footer.company.blog}</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold mb-4">${t.footer.support.title}</h4>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">${t.footer.support.helpCenter}</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">${t.footer.support.community}</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">${t.footer.support.contact}</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">${t.footer.support.status}</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="border-t border-gray-600 mt-8 pt-8 text-center">
                    <p class="text-gray-300">${t.footer.copyright}</p>
                </div>
            </div>
        </footer>

        <script src="/static/app.js"></script>
    </body>
    </html>
  `);
});

export default app
