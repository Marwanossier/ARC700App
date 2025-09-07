// نظام الترجمة متعدد اللغات لموقع Apex ReportCraft
export interface Translations {
  // Navigation & Common
  nav: {
    home: string;
    features: string;
    pricing: string;
    community: string;
    documentation: string;
    support: string;
    login: string;
    signup: string;
    getStarted: string;
    language: string;
  };
  
  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    watchDemo: string;
  };
  
  // Features Section
  features: {
    title: string;
    subtitle: string;
    easyToUse: {
      title: string;
      description: string;
    };
    apexNative: {
      title: string;
      description: string;
    };
    quickLearning: {
      title: string;
      description: string;
    };
    powerful: {
      title: string;
      description: string;
    };
    flexible: {
      title: string;
      description: string;
    };
    secure: {
      title: string;
      description: string;
    };
  };
  
  // Pricing Section
  pricing: {
    title: string;
    subtitle: string;
    monthly: string;
    yearly: string;
    free: {
      name: string;
      price: string;
      description: string;
      features: string[];
      cta: string;
    };
    pro: {
      name: string;
      price: string;
      description: string;
      features: string[];
      cta: string;
      popular: string;
    };
    developer: {
      name: string;
      price: string;
      description: string;
      features: string[];
      cta: string;
    };
    enterprise: {
      name: string;
      price: string;
      description: string;
      features: string[];
      cta: string;
    };
  };
  
  // Community Section
  community: {
    title: string;
    subtitle: string;
    discord: {
      title: string;
      description: string;
      members: string;
    };
    forum: {
      title: string;
      description: string;
      topics: string;
    };
    github: {
      title: string;
      description: string;
      stars: string;
    };
  };
  
  // Footer
  footer: {
    product: {
      title: string;
      features: string;
      pricing: string;
      documentation: string;
      releases: string;
    };
    company: {
      title: string;
      about: string;
      careers: string;
      press: string;
      blog: string;
    };
    support: {
      title: string;
      helpCenter: string;
      community: string;
      contact: string;
      status: string;
    };
    legal: {
      title: string;
      privacy: string;
      terms: string;
      security: string;
    };
    copyright: string;
  };

  // About page
  about: {
    title: string;
    subtitle: string;
    story: {
      title: string;
      content: string;
    };
    mission: {
      title: string;
      content: string;
    };
    team: {
      title: string;
      content: string;
    };
  };

  // Vision page
  vision: {
    title: string;
    subtitle: string;
    ourVision: {
      title: string;
      content: string;
    };
    values: {
      title: string;
      innovation: string;
      quality: string;
      support: string;
      community: string;
    };
  };

  // Contact page
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      send: string;
    };
    info: {
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
  };
  
  // Signup Page
  signup: {
    title: string;
    subtitle: string;
    form: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
      company: string;
      role: string;
      phone: string;
      country: string;
      agreeTerms: string;
      newsletter: string;
      submit: string;
    };
    benefits: {
      title: string;
      items: string[];
    };
    social: {
      title: string;
      google: string;
      github: string;
      microsoft: string;
    };
    login: {
      title: string;
      link: string;
    };
  };
  
  // Blog Page
  blog: {
    title: string;
    subtitle: string;
    categories: {
      all: string;
      tutorials: string;
      features: string;
      news: string;
      tips: string;
    };
    search: {
      placeholder: string;
      button: string;
    };
    readMore: string;
    author: string;
    publishedOn: string;
    readTime: string;
    tags: string;
    noResults: string;
  };
}

// Arabic translations
export const ar: Translations = {
  nav: {
    home: "الرئيسية",
    features: "المميزات",
    pricing: "الأسعار",
    community: "المجتمع",
    documentation: "التوثيق",
    support: "الدعم",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    getStarted: "ابدأ الآن",
    language: "اللغة"
  },
  hero: {
    title: "Apex ReportCraft (ARC)",
    subtitle: "🚀 ثورة في عالم تقارير Oracle APEX",
    description: "💡 اكتشف قوة الذكاء الاصطناعي في إنشاء تقارير استثنائية! ARC يحول أفكارك إلى تقارير تفاعلية مذهلة في ثوانٍ معدودة. أول أداة عربية 100% مع تكامل APEX الأصلي - اجعل تقاريرك تتحدث العربية بطلاقة! ✨",
    ctaPrimary: "🎯 ابدأ رحلتك المجانية",
    ctaSecondary: "🎥 شاهد السحر يحدث",
    watchDemo: "مشاهدة العرض"
  },
  features: {
    title: "✨ لماذا يختار 100,000+ مطور ARC؟",
    subtitle: "🏆 الأداة الوحيدة التي تجمع بين قوة الذكاء الاصطناعي والعبقرية العربية - مصممة خصيصاً لتحقيق أحلام المطورين!",
    easyToUse: {
      title: "🔥 تكامل APEX سحري",
      description: "انس الخوادم المعقدة والإعدادات المملة! ARC ينصب نفسه في ثوانٍ ويعمل كالسحر داخل قاعدة البيانات - بساطة لا تصدق!"
    },
    apexNative: {
      title: "🤖 عبقرية الذكاء الاصطناعي",
      description: "مساعدك الشخصي الذكي يقرأ أفكارك! يقترح عليك التصاميم المثالية ويحول بياناتك إلى لوحات فنية تخطف الأنظار"
    },
    quickLearning: {
      title: "🌟 عربي أصيل 100%",
      description: "أول أداة تقارير تتكلم العربية من القلب! تخطيط مثالي من اليمين لليسار، قوالب عربية فاخرة، وتجربة محلية استثنائية"
    },
    powerful: {
      title: "⚡ سحب وإفلات خارق",
      description: "اسحب... أفلت... واو! تقارير معقدة تُنشأ في ثوانٍ، معاينة فورية مذهلة، ومرونة لا حدود لها - كأنك تلعب!"
    },
    flexible: {
      title: "التقارير الفرعية والمحورية",
      description: "قدرات متقدمة للتقارير متعددة المستويات مع إمكانيات التنقل والاستكشاف التفاعلي"
    },
    secure: {
      title: "تعاون الفريق والأمان",
      description: "ميزات تعاون متقدمة مع أذونات دقيقة وأمان على مستوى المؤسسة"
    }
  },
  pricing: {
    title: "خطط الاشتراك",
    subtitle: "خطط مرنة مصممة لجميع احتياجاتك - من المطورين الأفراد إلى المؤسسات الكبيرة",
    monthly: "شهرياً",
    yearly: "سنوياً",
    free: {
      name: "مجاني",
      price: "$0",
      description: "مثالي للمطورين الأفراد والطلاب",
      features: [
        "تقارير أساسية",
        "5 قوالب تقارير",
        "تصدير PDF",
        "دعم المجتمع",
        "تكامل APEX أساسي"
      ],
      cta: "ابدأ مجاناً"
    },
    pro: {
      name: "احترافي",
      price: "$49",
      description: "للفرق الصغيرة والمتوسطة",
      features: [
        "تقارير متقدمة",
        "50 قالب",
        "التقارير الفرعية",
        "الجداول المحورية",
        "دعم البريد الإلكتروني",
        "تصدير متعدد الأشكال"
      ],
      cta: "اشترك الآن",
      popular: "الأكثر شعبية"
    },
    developer: {
      name: "مطور",
      price: "$199",
      description: "لرخصة مطور واحد مع ميزات متقدمة",
      features: [
        "تقارير غير محدودة",
        "+100 قالب",
        "مساعد التصميم بالذكاء الاصطناعي",
        "تعاون الفريق",
        "تكامل ERP/CRM",
        "دعم الأولوية 24/7"
      ],
      cta: "رخصة المطور"
    },
    enterprise: {
      name: "المؤسسة",
      price: "$299",
      description: "للمؤسسات مع احتياجات شاملة",
      features: [
        "جميع مميزات المطور",
        "دعم مخصص 24/7",
        "تدريب مخصص",
        "SLA مضمون",
        "نشر محلي",
        "تخصيص كامل"
      ],
      cta: "تواصل معنا"
    }
  },
  community: {
    title: "شبكة الشركاء والمجتمع",
    subtitle: "انضم إلى شبكة المطورين والشركاء في دول الخليج والعالم",
    discord: {
      title: "مجتمع المطورين",
      description: "تواصل مع مطوري APEX وشارك التجارب",
      members: "مطور+"
    },
    forum: {
      title: "الدعم العربي",
      description: "مركز دعم متخصص باللغة العربية 24/7",
      topics: "استفسار+"
    },
    github: {
      title: "الشراكات الإقليمية",
      description: "شبكة شركاء Oracle معتمدين في دول الخليج",
      stars: "شريك+"
    }
  },
  footer: {
    product: {
      title: "المنتج",
      features: "المميزات",
      pricing: "الأسعار",
      documentation: "التوثيق",
      releases: "الإصدارات"
    },
    company: {
      title: "الشركة",
      about: "عن الشركة",
      careers: "الوظائف",
      press: "الصحافة",
      blog: "المدونة"
    },
    support: {
      title: "الدعم",
      helpCenter: "مركز المساعدة",
      community: "المجتمع",
      contact: "تواصل معنا",
      status: "حالة النظام"
    },
    legal: {
      title: "قانوني",
      privacy: "سياسة الخصوصية",
      terms: "شروط الاستخدام",
      security: "الأمان"
    },
    copyright: "© 2024 Apex ReportCraft. جميع الحقوق محفوظة."
  },

  about: {
    title: "من نحن",
    subtitle: "نحن فريق من الخبراء المتخصصين في تطوير حلول التقارير لـ Oracle APEX",
    story: {
      title: "قصتنا",
      content: "بدأت رحلتنا من إدراك الحاجة الماسة لحل تقارير احترافي ومتكامل مع Oracle APEX. مع سنوات من الخبرة في تطوير التطبيقات والتقارير، قررنا إنشاء ARC لتكون الأداة الأولى والوحيدة التي تجمع بين السهولة والقوة والدعم الكامل للغة العربية."
    },
    mission: {
      title: "مهمتنا",
      content: "مهمتنا هي تمكين المطورين والمؤسسات من إنشاء تقارير احترافية وتفاعلية بسهولة وسرعة، مع التركيز على الجودة والابتكار والدعم المتميز للمنطقة العربية."
    },
    team: {
      title: "فريقنا",
      content: "فريقنا مكون من خبراء في Oracle APEX وتطوير التقارير والذكاء الاصطناعي، جميعهم ملتزمون بتقديم أفضل تجربة للمستخدمين في المنطقة العربية وحول العالم."
    }
  },

  vision: {
    title: "رؤيتنا",
    subtitle: "نسعى لأن نكون الحل الأول والأكثر ثقة في عالم تقارير Oracle APEX",
    ourVision: {
      title: "رؤيتنا",
      content: "أن نصبح المعيار الذهبي لحلول التقارير في Oracle APEX على مستوى العالم، مع كوننا الرائدين في دعم اللغة العربية والمنطقة الخليجية، وأن نمكن كل مطور ومؤسسة من تحويل البيانات إلى قصص مؤثرة وقرارات ذكية."
    },
    values: {
      title: "قيمنا",
      innovation: "الابتكار: نبتكر باستمرار لنقدم أحدث التقنيات مثل الذكاء الاصطناعي في التصميم",
      quality: "الجودة: نسعى للتميز في كل جانب من جوانب منتجنا وخدماتنا",
      support: "الدعم: نقدم دعماً متميزاً باللغة العربية على مدار 24/7",
      community: "المجتمع: نبني مجتمعاً قوياً من المطورين والخبراء في المنطقة"
    }
  },

  contact: {
    title: "تواصل معنا",
    subtitle: "نحن هنا لمساعدتك. تواصل معنا في أي وقت وسنكون سعداء للإجابة على استفساراتك",
    form: {
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "الرسالة",
      send: "إرسال الرسالة"
    },
    info: {
      address: "المملكة العربية السعودية، الرياض",
      phone: "+966 50 123 4567",
      email: "info@apexreportcraft.com",
      hours: "الأحد - الخميس: 9:00 ص - 6:00 م"
    }
  },
  
  // Signup Page Arabic
  signup: {
    title: "🚀 انضم إلى ثورة التقارير",
    subtitle: "ابدأ رحلتك مع ARC واكتشف قوة الذكاء الاصطناعي في إنشاء تقارير استثنائية",
    form: {
      firstName: "الاسم الأول",
      lastName: "الاسم الأخير", 
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      company: "اسم الشركة",
      role: "المنصب الوظيفي",
      phone: "رقم الهاتف",
      country: "البلد",
      agreeTerms: "أوافق على شروط الاستخدام وسياسة الخصوصية",
      newsletter: "أريد تلقي النشرة الإخبارية وآخر الأخبار",
      submit: "🎯 إنشاء الحساب المجاني"
    },
    benefits: {
      title: "🌟 لماذا تختار ARC؟",
      items: [
        "🤖 مساعد الذكاء الاصطناعي المتقدم",
        "🌍 دعم كامل للغة العربية مع RTL",
        "⚡ إنشاء تقارير في دقائق وليس ساعات",
        "🔒 أمان متقدم وحماية البيانات",
        "📞 دعم فني 24/7 باللغة العربية",
        "🆓 خطة مجانية إلى الأبد"
      ]
    },
    social: {
      title: "أو سجل باستخدام:",
      google: "متابعة مع Google",
      github: "متابعة مع GitHub", 
      microsoft: "متابعة مع Microsoft"
    },
    login: {
      title: "لديك حساب بالفعل؟",
      link: "تسجيل الدخول"
    }
  },
  
  // Blog Page Arabic
  blog: {
    title: "📚 مدونة ARC",
    subtitle: "اكتشف أحدث النصائح والحيل والتقنيات لتطوير تقارير Oracle APEX الاحترافية",
    categories: {
      all: "جميع المقالات",
      tutorials: "دروس تعليمية",
      features: "الميزات الجديدة", 
      news: "الأخبار",
      tips: "نصائح وحيل"
    },
    search: {
      placeholder: "ابحث في المقالات...",
      button: "بحث"
    },
    readMore: "قراءة المزيد",
    author: "الكاتب",
    publishedOn: "نُشر في",
    readTime: "دقائق قراءة",
    tags: "التصنيفات",
    noResults: "لم يتم العثور على مقالات مطابقة لبحثك"
  }
};

// English translations
export const en: Translations = {
  nav: {
    home: "Home",
    features: "Features",
    pricing: "Pricing",
    community: "Community",
    documentation: "Documentation",
    support: "Support",
    login: "Login",
    signup: "Sign Up",
    getStarted: "Get Started",
    language: "Language"
  },
  hero: {
    title: "Apex ReportCraft (ARC)",
    subtitle: "🚀 Revolution in Oracle APEX Reporting",
    description: "💡 Discover the AI-powered magic that transforms data into stunning reports! ARC turns your wildest reporting dreams into reality in seconds. The world's first 100% Arabic-native APEX tool - where innovation meets tradition! ✨",
    ctaPrimary: "🎯 Start Your Free Journey",
    ctaSecondary: "🎥 See the Magic Happen",
    watchDemo: "Watch Demo"
  },
  features: {
    title: "✨ Why 100,000+ Developers Choose ARC?",
    subtitle: "🏆 The only tool that combines AI brilliance with cultural excellence - engineered to make developers' dreams come true!",
    easyToUse: {
      title: "🔥 Magical APEX Integration",
      description: "Forget complex servers and boring setups! ARC installs in seconds and works like magic inside your database - simplicity beyond belief!"
    },
    apexNative: {
      title: "🤖 AI Genius at Work",
      description: "Your personal AI assistant reads your mind! Suggests perfect designs and transforms your data into artistic masterpieces that steal the show"
    },
    quickLearning: {
      title: "🌟 100% Authentic Arabic",
      description: "The first reporting tool that speaks Arabic from the heart! Perfect RTL layouts, luxurious Arabic templates, and exceptional local experience"
    },
    powerful: {
      title: "⚡ Super Drag & Drop",
      description: "Drag... Drop... Wow! Complex reports created in seconds, stunning live previews, and limitless flexibility - it's like playing a game!"
    },
    flexible: {
      title: "Sub-Reports & Pivot Tables",
      description: "Advanced multi-level reporting capabilities with interactive drill-down and exploration features"
    },
    secure: {
      title: "Team Collaboration & Security",
      description: "Advanced collaboration features with granular permissions and enterprise-grade security"
    }
  },
  pricing: {
    title: "Flexible Pricing Plans",
    subtitle: "From individual developers to large enterprises - we have the right plan for you",
    monthly: "Monthly",
    yearly: "Yearly",
    free: {
      name: "Free",
      price: "$0",
      description: "Perfect for individual developers and students",
      features: [
        "Basic Reports",
        "5 Report Templates",
        "PDF Export",
        "Community Support",
        "Basic APEX Integration"
      ],
      cta: "Get Started"
    },
    pro: {
      name: "Pro",
      price: "$49",
      description: "For small and medium teams",
      features: [
        "Advanced Reports",
        "50 Templates",
        "Sub-Reports",
        "Pivot Tables",
        "Email Support",
        "Multi-format Export"
      ],
      cta: "Subscribe Now",
      popular: "Most Popular"
    },
    developer: {
      name: "Developer",
      price: "$199",
      description: "Single developer license with advanced features",
      features: [
        "Unlimited Reports",
        "100+ Templates",
        "AI Design Assistant",
        "Team Collaboration",
        "ERP/CRM Integration",
        "Priority 24/7 Support"
      ],
      cta: "Developer License"
    },
    enterprise: {
      name: "Enterprise",
      price: "$299",
      description: "For organizations with comprehensive needs",
      features: [
        "All Developer Features",
        "Dedicated 24/7 Support",
        "Custom Training",
        "Guaranteed SLA",
        "On-premise Deployment",
        "Full Customization"
      ],
      cta: "Contact Sales"
    }
  },
  community: {
    title: "Partner Network & Community",
    subtitle: "Join our network of developers and partners across the Gulf region and globally",
    discord: {
      title: "Developer Community",
      description: "Connect with APEX developers and share experiences",
      members: "developers+"
    },
    forum: {
      title: "Arabic Support",
      description: "Specialized Arabic language support center 24/7",
      topics: "queries+"
    },
    github: {
      title: "Regional Partners",
      description: "Certified Oracle partner network across the Gulf region",
      stars: "partners+"
    }
  },
  footer: {
    product: {
      title: "Product",
      features: "Features",
      pricing: "Pricing",
      documentation: "Documentation",
      releases: "Releases"
    },
    company: {
      title: "Company",
      about: "About",
      careers: "Careers",
      press: "Press",
      blog: "Blog"
    },
    support: {
      title: "Support",
      helpCenter: "Help Center",
      community: "Community",
      contact: "Contact",
      status: "Status"
    },
    legal: {
      title: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      security: "Security"
    },
    copyright: "© 2024 Apex ReportCraft. All rights reserved."
  },

  about: {
    title: "About Us",
    subtitle: "We are a team of experts specialized in developing reporting solutions for Oracle APEX",
    story: {
      title: "Our Story",
      content: "Our journey began with recognizing the urgent need for a professional and integrated reporting solution for Oracle APEX. With years of experience in application and report development, we decided to create ARC to be the first and only tool that combines ease, power, and complete Arabic language support."
    },
    mission: {
      title: "Our Mission",
      content: "Our mission is to empower developers and organizations to create professional and interactive reports easily and quickly, focusing on quality, innovation, and excellent support for the Arab region."
    },
    team: {
      title: "Our Team",
      content: "Our team consists of experts in Oracle APEX, report development, and artificial intelligence, all committed to providing the best user experience in the Arab region and around the world."
    }
  },

  vision: {
    title: "Our Vision",
    subtitle: "We strive to be the first and most trusted solution in the world of Oracle APEX reporting",
    ourVision: {
      title: "Our Vision",
      content: "To become the gold standard for reporting solutions in Oracle APEX worldwide, while being the leaders in Arabic language support and the Gulf region, enabling every developer and organization to transform data into impactful stories and smart decisions."
    },
    values: {
      title: "Our Values",
      innovation: "Innovation: We continuously innovate to deliver the latest technologies like AI in design",
      quality: "Quality: We strive for excellence in every aspect of our product and services",
      support: "Support: We provide exceptional Arabic language support 24/7",
      community: "Community: We build a strong community of developers and experts in the region"
    }
  },

  contact: {
    title: "Contact Us",
    subtitle: "We're here to help you. Contact us anytime and we'll be happy to answer your questions",
    form: {
      name: "Full Name",
      email: "Email Address",
      subject: "Subject",
      message: "Message",
      send: "Send Message"
    },
    info: {
      address: "Saudi Arabia, Riyadh",
      phone: "+966 50 123 4567",
      email: "info@apexreportcraft.com",
      hours: "Sunday - Thursday: 9:00 AM - 6:00 PM"
    }
  },
  
  // Signup Page English
  signup: {
    title: "🚀 Join the Reporting Revolution",
    subtitle: "Start your journey with ARC and discover the power of AI in creating exceptional reports",
    form: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      company: "Company Name",
      role: "Job Title",
      phone: "Phone Number", 
      country: "Country",
      agreeTerms: "I agree to the Terms of Service and Privacy Policy",
      newsletter: "I want to receive newsletter and latest updates",
      submit: "🎯 Create Free Account"
    },
    benefits: {
      title: "🌟 Why Choose ARC?",
      items: [
        "🤖 Advanced AI Assistant",
        "🌍 Full Arabic Support with RTL", 
        "⚡ Create reports in minutes, not hours",
        "🔒 Advanced security and data protection",
        "📞 24/7 Arabic technical support",
        "🆓 Free plan forever"
      ]
    },
    social: {
      title: "Or sign up with:",
      google: "Continue with Google",
      github: "Continue with GitHub",
      microsoft: "Continue with Microsoft"
    },
    login: {
      title: "Already have an account?",
      link: "Sign In"
    }
  },
  
  // Blog Page English
  blog: {
    title: "📚 ARC Blog",
    subtitle: "Discover the latest tips, tricks, and techniques for developing professional Oracle APEX reports",
    categories: {
      all: "All Articles",
      tutorials: "Tutorials",
      features: "New Features",
      news: "News", 
      tips: "Tips & Tricks"
    },
    search: {
      placeholder: "Search articles...",
      button: "Search"
    },
    readMore: "Read More",
    author: "Author",
    publishedOn: "Published on",
    readTime: "min read",
    tags: "Tags",
    noResults: "No articles found matching your search"
  }
};

// Turkish translations
export const tr: Translations = {
  nav: {
    home: "Ana Sayfa",
    features: "Özellikler", 
    pricing: "Fiyatlandırma",
    community: "Topluluk",
    documentation: "Dokümantasyon",
    support: "Destek",
    login: "Giriş Yap",
    signup: "Kayıt Ol",
    getStarted: "Başlayın",
    language: "Dil"
  },
  hero: {
    title: "Apex ReportCraft",
    subtitle: "Profesyonel Raporlama Aracı",
    description: "Apex ReportCraft ile kolayca profesyonel ve etkileşimli raporlar oluşturun. Oracle APEX Developer gibi tanıdık arayüz ve gelişmiş raporlama yetenekleri.",
    ctaPrimary: "Ücretsiz Deneyin",
    ctaSecondary: "Demo İzleyin",
    watchDemo: "Demo İzle"
  },
  features: {
    title: "Neden Apex ReportCraft?",
    subtitle: "Aracımızı geliştiriciler için mükemmel seçim yapan özellikleri keşfedin",
    easyToUse: {
      title: "Kullanımı Kolay",
      description: "Oracle APEX Developer'a benzer tanıdık arayüz, öğrenme ve kullanımı hızlı ve kolay hale getirir"
    },
    apexNative: {
      title: "Yerli APEX",
      description: "Oracle APEX ortamı için özel olarak oluşturulmuş, tüm sistem bileşenleri için tam destek"
    },
    quickLearning: {
      title: "Hızlı Öğrenme",
      description: "Oracle APEX ortamına aşina geliştiriciler için kısa öğrenme eğrisi"
    },
    powerful: {
      title: "Güçlü ve Esnek",
      description: "Yüksek performansla karmaşık ve etkileşimli raporlar oluşturma için gelişmiş yetenekler"
    },
    flexible: {
      title: "Esnek Özelleştirme",
      description: "Özelleştirilebilir şablonlar ve yeniden kullanılabilir bileşenler"
    },
    secure: {
      title: "Güvenli ve Güvenilir",
      description: "Şifreleme ve gelişmiş kimlik doğrulama desteği ile yüksek güvenlik standartları"
    }
  },
  pricing: {
    title: "Abonelik Planları",
    subtitle: "İhtiyaçlarınıza uygun planı seçin",
    monthly: "Aylık",
    yearly: "Yıllık",
    starter: {
      name: "Başlangıç",
      price: "$29",
      description: "Küçük projeler ve bireyler için mükemmel",
      features: [
        "10 rapor'a kadar",
        "5 GB depolama",
        "E-posta desteği",
        "Temel şablonlar",
        "PDF dışa aktarma"
      ],
      cta: "Ücretsiz Başla"
    },
    professional: {
      name: "Profesyonel",
      price: "$99",
      description: "Takımlar ve orta ölçekli şirketler için",
      features: [
        "Sınırsız raporlar",
        "100 GB depolama",
        "Öncelikli destek",
        "Gelişmiş şablonlar",
        "Çoklu format dışa aktarma",
        "Takım işbirliği",
        "Gelişmiş API"
      ],
      cta: "14 gün ücretsiz deneyin",
      popular: "En Popüler"
    },
    enterprise: {
      name: "Kurumsal",
      price: "Özel",
      description: "Özel ihtiyaçları olan büyük kuruluşlar için",
      features: [
        "Tüm Profesyonel özellikler",
        "Sınırsız depolama",
        "7/24 özel destek",
        "Özel eğitim",
        "Garantili SLA",
        "Yerinde dağıtım",
        "Tam özelleştirme"
      ],
      cta: "Bizimle İletişime Geçin"
    }
  },
  community: {
    title: "Topluluğumuza Katılın",
    subtitle: "Dünyanın her yerinden geliştiriciler ve uzmanlarla bağlantı kurun",
    discord: {
      title: "Discord",
      description: "Toplulukla gerçek zamanlı bağlantı kurun",
      members: "üye+"
    },
    forum: {
      title: "Forum",
      description: "Sorular sorun ve deneyimlerinizi paylaşın",
      topics: "konu+"
    },
    github: {
      title: "GitHub",
      description: "Proje geliştirmeye katkıda bulunun",
      stars: "yıldız+"
    }
  },
  footer: {
    product: {
      title: "Ürün",
      features: "Özellikler",
      pricing: "Fiyatlandırma",
      documentation: "Dokümantasyon",
      releases: "Sürümler"
    },
    company: {
      title: "Şirket",
      about: "Hakkımızda",
      careers: "Kariyer",
      press: "Basın",
      blog: "Blog"
    },
    support: {
      title: "Destek",
      helpCenter: "Yardım Merkezi",
      community: "Topluluk",
      contact: "İletişim",
      status: "Durum"
    },
    legal: {
      title: "Yasal",
      privacy: "Gizlilik Politikası",
      terms: "Hizmet Koşulları",
      security: "Güvenlik"
    },
    copyright: "© 2024 Apex ReportCraft. Tüm hakları saklıdır."
  },

  about: {
    title: "Hakkımızda",
    subtitle: "Oracle APEX için raporlama çözümleri geliştirmede uzmanlaşmış bir ekibiz",
    story: {
      title: "Hikayemiz",
      content: "Yolculuğumuz Oracle APEX için profesyonel ve entegre bir raporlama çözümüne duyulan acil ihtiyacı fark etmekle başladı."
    },
    mission: {
      title: "Misyonumuz", 
      content: "Misyonumuz geliştiricileri ve kuruluşları kolayca profesyonel ve etkileşimli raporlar oluşturabilmeleri için güçlendirmektir."
    },
    team: {
      title: "Ekibimiz",
      content: "Ekibimiz Oracle APEX, rapor geliştirme ve yapay zeka uzmanlarından oluşur."
    }
  },

  vision: {
    title: "Vizyonumuz",
    subtitle: "Oracle APEX raporlama dünyasında ilk ve en güvenilir çözüm olmaya çalışıyoruz",
    ourVision: {
      title: "Vizyonumuz", 
      content: "Oracle APEX'te raporlama çözümlerinin altın standardı haline gelmek."
    },
    values: {
      title: "Değerlerimiz",
      innovation: "İnovasyon: Tasarımda AI gibi en yeni teknolojileri sunmak için sürekli yenilik yapıyoruz",
      quality: "Kalite: Ürün ve hizmetlerimizin her alanında mükemmellik için çabalıyoruz", 
      support: "Destek: 24/7 mükemmel destek sağlıyoruz",
      community: "Topluluk: Bölgede güçlü bir geliştirici ve uzman topluluğu oluşturuyoruz"
    }
  },

  contact: {
    title: "İletişime Geçin",
    subtitle: "Size yardımcı olmak için buradayız. İstediğiniz zaman bizimle iletişime geçin",
    form: {
      name: "Tam Ad",
      email: "E-posta Adresi", 
      subject: "Konu",
      message: "Mesaj",
      send: "Mesaj Gönder"
    },
    info: {
      address: "Türkiye, İstanbul",
      phone: "+90 212 123 4567",
      email: "info@apexreportcraft.com.tr",
      hours: "Pazartesi - Cuma: 09:00 - 18:00"
    }
  },
  
  // Signup Page Turkish
  signup: {
    title: "🚀 Raporlama Devrimine Katılın",
    subtitle: "ARC ile yolculuğunuza başlayın ve istisnai raporlar oluşturmada AI'nın gücünü keşfedin",
    form: {
      firstName: "Ad",
      lastName: "Soyad",
      email: "E-posta Adresi",
      password: "Şifre",
      confirmPassword: "Şifre Onayı", 
      company: "Şirket Adı",
      role: "İş Unvanı",
      phone: "Telefon Numarası",
      country: "Ülke",
      agreeTerms: "Hizmet Koşullarını ve Gizlilik Politikasını kabul ediyorum",
      newsletter: "Bülten ve son güncellemeleri almak istiyorum",
      submit: "🎯 Ücretsiz Hesap Oluştur"
    },
    benefits: {
      title: "🌟 Neden ARC'yi Seçmelisiniz?",
      items: [
        "🤖 Gelişmiş AI Asistanı",
        "🌍 RTL ile Tam Türkçe Desteği",
        "⚡ Saatler değil, dakikalar içinde rapor oluşturun", 
        "🔒 İleri düzey güvenlik ve veri koruması",
        "📞 24/7 Türkçe teknik destek",
        "🆓 Sonsuza kadar ücretsiz plan"
      ]
    },
    social: {
      title: "Veya şununla kayıt olun:",
      google: "Google ile Devam Et",
      github: "GitHub ile Devam Et",
      microsoft: "Microsoft ile Devam Et"
    },
    login: {
      title: "Zaten hesabınız var mı?",
      link: "Giriş Yap"
    }
  },
  
  // Blog Page Turkish
  blog: {
    title: "📚 ARC Blog",
    subtitle: "Profesyonel Oracle APEX raporları geliştirmek için en son ipuçları, püf noktaları ve teknikleri keşfedin",
    categories: {
      all: "Tüm Makaleler",
      tutorials: "Eğitimler",
      features: "Yeni Özellikler",
      news: "Haberler",
      tips: "İpuçları ve Püf Noktaları"
    },
    search: {
      placeholder: "Makalelerde ara...",
      button: "Ara"
    },
    readMore: "Devamını Oku",
    author: "Yazar", 
    publishedOn: "Yayınlanma Tarihi",
    readTime: "dk okuma",
    tags: "Etiketler", 
    noResults: "Aramanızla eşleşen makale bulunamadı"
  }
};

// Hindi translations
export const hi: Translations = {
  nav: {
    home: "होम",
    features: "सुविधाएं",
    pricing: "मूल्य निर्धारण",
    community: "समुदाय",
    documentation: "दस्तावेज़ीकरण",
    support: "सहायता",
    login: "लॉगिन",
    signup: "साइन अप",
    getStarted: "शुरुआत करें",
    language: "भाषा"
  },
  hero: {
    title: "Apex ReportCraft",
    subtitle: "प्रोफेशनल रिपोर्टिंग टूल",
    description: "Apex ReportCraft के साथ आसानी से पेशेवर और इंटरैक्टिव रिपोर्ट बनाएं। Oracle APEX Developer जैसा परिचित इंटरफ़ेस और उन्नत रिपोर्टिंग क्षमताएं।",
    ctaPrimary: "मुफ़्त आज़माएं",
    ctaSecondary: "डेमो देखें",
    watchDemo: "डेमो देखें"
  },
  features: {
    title: "Apex ReportCraft क्यों?",
    subtitle: "उन विशेषताओं की खोज करें जो हमारे टूल को डेवलपर्स के लिए सही विकल्प बनाती हैं",
    easyToUse: {
      title: "उपयोग में आसान",
      description: "Oracle APEX Developer के समान परिचित इंटरफ़ेस, सीखने और उपयोग को त्वरित और आसान बनाता है"
    },
    apexNative: {
      title: "नेटिव APEX",
      description: "Oracle APEX वातावरण के लिए विशेष रूप से निर्मित, सभी सिस्टम घटकों के लिए पूर्ण समर्थन के साथ"
    },
    quickLearning: {
      title: "त्वरित सीखना",
      description: "Oracle APEX वातावरण से परिचित डेवलपर्स के लिए छोटी सीखने की अवधि"
    },
    powerful: {
      title: "शक्तिशाली और लचीला",
      description: "उच्च प्रदर्शन के साथ जटिल और इंटरैक्टिव रिपोर्ट बनाने के लिए उन्नत क्षमताएं"
    },
    flexible: {
      title: "लचीला अनुकूलन",
      description: "अनुकूलन योग्य टेम्प्लेट और पुन: उपयोग योग्य घटक"
    },
    secure: {
      title: "सुरक्षित और विश्वसनीय",
      description: "एन्क्रिप्शन और उन्नत प्रमाणीकरण समर्थन के साथ उच्च सुरक्षा मानक"
    }
  },
  pricing: {
    title: "सब्स्क्रिप्शन प्लान",
    subtitle: "अपनी आवश्यकताओं के अनुकूल प्लान चुनें",
    monthly: "मासिक",
    yearly: "वार्षिक",
    starter: {
      name: "स्टार्टर",
      price: "$29",
      description: "छोटी परियोजनाओं और व्यक्तियों के लिए बिल्कुल सही",
      features: [
        "10 रिपोर्ट तक",
        "5 GB स्टोरेज",
        "ईमेल सहायता",
        "बुनियादी टेम्प्लेट",
        "PDF एक्सपोर्ट"
      ],
      cta: "मुफ़्त शुरुआत करें"
    },
    professional: {
      name: "प्रोफेशनल",
      price: "$99",
      description: "टीमों और मध्यम आकार की कंपनियों के लिए",
      features: [
        "असीमित रिपोर्ट",
        "100 GB स्टोरेज",
        "प्राथमिकता समर्थन",
        "उन्नत टेम्प्लेट",
        "मल्टी-फॉर्मेट एक्सपोर्ट",
        "टीम सहयोग",
        "उन्नत API"
      ],
      cta: "14 दिन मुफ़्त आज़माएं",
      popular: "सबसे लोकप्रिय"
    },
    enterprise: {
      name: "एंटरप्राइज़",
      price: "कस्टम",
      description: "विशेष आवश्यकताओं वाले बड़े उद्यमों के लिए",
      features: [
        "सभी प्रोफेशनल सुविधाएं",
        "असीमित स्टोरेज",
        "24/7 समर्पित सहायता",
        "कस्टम प्रशिक्षण",
        "गारंटीशुदा SLA",
        "ऑन-प्रिमाइसेस डिप्लॉयमेंट",
        "पूर्ण अनुकूलन"
      ],
      cta: "हमसे संपर्क करें"
    }
  },
  community: {
    title: "हमारे समुदाय में शामिल हों",
    subtitle: "दुनिया भर के डेवलपर्स और विशेषज्ञों से जुड़ें",
    discord: {
      title: "डिस्कॉर्ड",
      description: "समुदाय के साथ रियल-टाइम में जुड़ें",
      members: "सदस्य+"
    },
    forum: {
      title: "फोरम",
      description: "प्रश्न पूछें और अनुभव साझा करें",
      topics: "विषय+"
    },
    github: {
      title: "गिटहब",
      description: "परियोजना विकास में योगदान दें",
      stars: "स्टार+"
    }
  },
  footer: {
    product: {
      title: "उत्पाद",
      features: "सुविधाएं",
      pricing: "मूल्य निर्धारण",
      documentation: "दस्तावेज़ीकरण",
      releases: "रिलीज़"
    },
    company: {
      title: "कंपनी",
      about: "के बारे में",
      careers: "करियर",
      press: "प्रेस",
      blog: "ब्लॉग"
    },
    support: {
      title: "सहायता",
      helpCenter: "सहायता केंद्र",
      community: "समुदाय",
      contact: "संपर्क",
      status: "स्थिति"
    },
    legal: {
      title: "कानूनी",
      privacy: "गोपनीयता नीति",
      terms: "सेवा की शर्तें",
      security: "सुरक्षा"
    },
    copyright: "© 2024 Apex ReportCraft। सभी अधिकार सुरक्षित।"
  },

  about: {
    title: "हमारे बारे में",
    subtitle: "हम Oracle APEX के लिए रिपोर्टिंग समाधान विकसित करने में विशेषज्ञ विशेषज्ञों की एक टीम हैं",
    story: {
      title: "हमारी कहानी", 
      content: "हमारी यात्रा Oracle APEX के लिए एक पेशेवर और एकीकृत रिपोर्टिंग समाधान की तत्काल आवश्यकता को पहचानने से शुरू हुई।"
    },
    mission: {
      title: "हमारा मिशन",
      content: "हमारा मिशन डेवलपर्स और संगठनों को आसानी से पेशेवर और इंटरैक्टिव रिपोर्ट बनाने के लिए सशक्त बनाना है।"
    },
    team: {
      title: "हमारी टीम",
      content: "हमारी टीम Oracle APEX, रिपोर्ट डेवलपमेंट और आर्टिफिशियल इंटेलिजेंस के विशेषज्ञों से मिलकर बनी है।"
    }
  },

  vision: {
    title: "हमारा विज़न", 
    subtitle: "हम Oracle APEX रिपोर्टिंग की दुनिया में पहला और सबसे भरोसेमंद समाधान बनने का प्रयास करते हैं",
    ourVision: {
      title: "हमारा विज़न",
      content: "Oracle APEX में रिपोर्टिंग समाधानों के लिए गोल्ड स्टैंडर्ड बनना।"
    },
    values: {
      title: "हमारे मूल्य",
      innovation: "नवाचार: हम डिज़ाइन में AI जैसी नवीनतम तकनीकों को प्रदान करने के लिए लगातार नवाचार करते हैं",
      quality: "गुणवत्ता: हम अपने उत्पाद और सेवाओं के हर पहलू में उत्कृष्टता के लिए प्रयास करते हैं",
      support: "सहायता: हम 24/7 असाधारण सहायता प्रदान करते हैं", 
      community: "समुदाय: हम क्षेत्र में डेवलपर्स और विशेषज्ञों का एक मजबूत समुदाय बनाते हैं"
    }
  },

  contact: {
    title: "हमसे संपर्क करें",
    subtitle: "हम आपकी सहायता के लिए यहाँ हैं। किसी भी समय हमसे संपर्क करें",
    form: {
      name: "पूरा नाम",
      email: "ईमेल पता",
      subject: "विषय", 
      message: "संदेश",
      send: "संदेश भेजें"
    },
    info: {
      address: "भारत, मुंबई",
      phone: "+91 22 123 4567",
      email: "info@apexreportcraft.in", 
      hours: "सोमवार - शुक्रवार: 09:00 - 18:00"
    }
  },
  
  // Signup Page Hindi
  signup: {
    title: "🚀 रिपोर्टिंग क्रांति में शामिल हों",
    subtitle: "ARC के साथ अपनी यात्रा शुरू करें और असाधारण रिपोर्ट बनाने में AI की शक्ति की खोज करें",
    form: {
      firstName: "पहला नाम",
      lastName: "अंतिम नाम",
      email: "ईमेल पता", 
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      company: "कंपनी का नाम",
      role: "नौकरी का शीर्षक",
      phone: "फ़ोन नंबर",
      country: "देश",
      agreeTerms: "मैं सेवा की शर्तों और गोपनीयता नीति से सहमत हूँ",
      newsletter: "मैं न्यूज़लेटर और नवीनतम अपडेट प्राप्त करना चाहता हूँ", 
      submit: "🎯 निःशुल्क खाता बनाएं"
    },
    benefits: {
      title: "🌟 ARC क्यों चुनें?",
      items: [
        "🤖 उन्नत AI असिस्टेंट",
        "🌍 RTL के साथ पूर्ण हिंदी सहायता",
        "⚡ घंटों में नहीं, मिनटों में रिपोर्ट बनाएं",
        "🔒 उन्नत सुरक्षा और डेटा सुरक्षा", 
        "📞 24/7 हिंदी तकनीकी सहायता",
        "🆓 हमेशा के लिए निःशुल्क योजना"
      ]
    },
    social: {
      title: "या इसके साथ साइन अप करें:",
      google: "Google के साथ जारी रखें", 
      github: "GitHub के साथ जारी रखें",
      microsoft: "Microsoft के साथ जारी रखें"
    },
    login: {
      title: "क्या आपका पहले से खाता है?",
      link: "साइन इन करें"
    }
  },
  
  // Blog Page Hindi
  blog: {
    title: "📚 ARC ब्लॉग",
    subtitle: "पेशेवर Oracle APEX रिपोर्ट विकसित करने के लिए नवीनतम टिप्स, ट्रिक्स और तकनीकों की खोज करें",
    categories: {
      all: "सभी लेख", 
      tutorials: "ट्यूटोरियल",
      features: "नई सुविधाएं",
      news: "समाचार",
      tips: "टिप्स और ट्रिक्स"
    },
    search: {
      placeholder: "लेखों में खोजें...",
      button: "खोजें"
    },
    readMore: "और पढ़ें",
    author: "लेखक",
    publishedOn: "प्रकाशित",
    readTime: "मिनट पढ़ना",
    tags: "टैग", 
    noResults: "आपकी खोज से मेल खाने वाले कोई लेख नहीं मिले"
  }
};

// German translations
export const de: Translations = {
  nav: {
    home: "Startseite",
    features: "Funktionen",
    pricing: "Preise",
    community: "Community",
    documentation: "Dokumentation",
    support: "Support",
    login: "Anmelden",
    signup: "Registrieren",
    getStarted: "Loslegen",
    language: "Sprache"
  },
  hero: {
    title: "Apex ReportCraft",
    subtitle: "Professionelles Reporting-Tool",
    description: "Erstellen Sie einfach professionelle und interaktive Berichte mit Apex ReportCraft. Vertraute Benutzeroberfläche wie Oracle APEX Developer mit erweiterten Reporting-Funktionen.",
    ctaPrimary: "Kostenlos testen",
    ctaSecondary: "Demo ansehen",
    watchDemo: "Demo ansehen"
  },
  features: {
    title: "Warum Apex ReportCraft?",
    subtitle: "Entdecken Sie die Funktionen, die unser Tool zur perfekten Wahl für Entwickler machen",
    easyToUse: {
      title: "Einfach zu verwenden",
      description: "Vertraute Benutzeroberfläche ähnlich Oracle APEX Developer macht das Lernen und die Nutzung schnell und einfach"
    },
    apexNative: {
      title: "Native APEX",
      description: "Speziell für Oracle APEX-Umgebung entwickelt mit vollständiger Unterstützung für alle Systemkomponenten"
    },
    quickLearning: {
      title: "Schnelles Lernen",
      description: "Kurze Lernkurve für Entwickler, die mit der Oracle APEX-Umgebung vertraut sind"
    },
    powerful: {
      title: "Leistungsstark und flexibel",
      description: "Erweiterte Funktionen zum Erstellen komplexer und interaktiver Berichte mit hoher Leistung"
    },
    flexible: {
      title: "Flexible Anpassung",
      description: "Anpassbare Vorlagen und wiederverwendbare Komponenten"
    },
    secure: {
      title: "Sicher und zuverlässig",
      description: "Hohe Sicherheitsstandards mit Verschlüsselung und erweiterte Authentifizierungsunterstützung"
    }
  },
  pricing: {
    title: "Abonnement-Pläne",
    subtitle: "Wählen Sie den Plan, der Ihren Anforderungen entspricht",
    monthly: "Monatlich",
    yearly: "Jährlich",
    starter: {
      name: "Starter",
      price: "29€",
      description: "Perfekt für kleine Projekte und Einzelpersonen",
      features: [
        "Bis zu 10 Berichte",
        "5 GB Speicher",
        "E-Mail-Support",
        "Grundvorlagen",
        "PDF-Export"
      ],
      cta: "Kostenlos starten"
    },
    professional: {
      name: "Professional",
      price: "99€",
      description: "Für Teams und mittelständische Unternehmen",
      features: [
        "Unbegrenzte Berichte",
        "100 GB Speicher",
        "Prioritäts-Support",
        "Erweiterte Vorlagen",
        "Multi-Format-Export",
        "Team-Zusammenarbeit",
        "Erweiterte API"
      ],
      cta: "14 Tage kostenlos testen",
      popular: "Am beliebtesten"
    },
    enterprise: {
      name: "Enterprise",
      price: "Individuell",
      description: "Für große Unternehmen mit besonderen Anforderungen",
      features: [
        "Alle Professional-Funktionen",
        "Unbegrenzter Speicher",
        "24/7 dedizierter Support",
        "Benutzerdefinierte Schulung",
        "Garantierte SLA",
        "Vor-Ort-Bereitstellung",
        "Vollständige Anpassung"
      ],
      cta: "Kontakt aufnehmen"
    }
  },
  community: {
    title: "Treten Sie unserer Community bei",
    subtitle: "Verbinden Sie sich mit Entwicklern und Experten aus der ganzen Welt",
    discord: {
      title: "Discord",
      description: "Verbinden Sie sich in Echtzeit mit der Community",
      members: "Mitglieder+"
    },
    forum: {
      title: "Forum",
      description: "Stellen Sie Fragen und teilen Sie Erfahrungen",
      topics: "Themen+"
    },
    github: {
      title: "GitHub",
      description: "Tragen Sie zur Projektentwicklung bei",
      stars: "Sterne+"
    }
  },
  footer: {
    product: {
      title: "Produkt",
      features: "Funktionen",
      pricing: "Preise",
      documentation: "Dokumentation",
      releases: "Releases"
    },
    company: {
      title: "Unternehmen",
      about: "Über uns",
      careers: "Karriere",
      press: "Presse",
      blog: "Blog"
    },
    support: {
      title: "Support",
      helpCenter: "Hilfecenter",
      community: "Community",
      contact: "Kontakt",
      status: "Status"
    },
    legal: {
      title: "Rechtliches",
      privacy: "Datenschutz",
      terms: "Nutzungsbedingungen",
      security: "Sicherheit"
    },
    copyright: "© 2024 Apex ReportCraft. Alle Rechte vorbehalten."
  },

  about: {
    title: "Über uns",
    subtitle: "Wir sind ein Expertenteam, das sich auf die Entwicklung von Reporting-Lösungen für Oracle APEX spezialisiert hat",
    story: {
      title: "Unsere Geschichte",
      content: "Unsere Reise begann mit der Erkenntnis des dringenden Bedarfs an einer professionellen und integrierten Reporting-Lösung für Oracle APEX."
    },
    mission: {
      title: "Unsere Mission",
      content: "Unsere Mission ist es, Entwickler und Organisationen zu befähigen, einfach professionelle und interaktive Berichte zu erstellen."
    },
    team: {
      title: "Unser Team",
      content: "Unser Team besteht aus Experten in Oracle APEX, Berichtsentwicklung und künstlicher Intelligenz."
    }
  },

  vision: {
    title: "Unsere Vision",
    subtitle: "Wir streben danach, die erste und vertrauenswürdigste Lösung in der Welt des Oracle APEX-Reportings zu werden",
    ourVision: {
      title: "Unsere Vision",
      content: "Der Goldstandard für Reporting-Lösungen in Oracle APEX zu werden."
    },
    values: {
      title: "Unsere Werte",
      innovation: "Innovation: Wir innovieren kontinuierlich, um die neuesten Technologien wie AI im Design zu liefern",
      quality: "Qualität: Wir streben nach Exzellenz in jedem Aspekt unseres Produkts und Services",
      support: "Support: Wir bieten außergewöhnlichen 24/7 Support",
      community: "Gemeinschaft: Wir bauen eine starke Gemeinschaft von Entwicklern und Experten in der Region auf"
    }
  },

  contact: {
    title: "Kontaktieren Sie uns",
    subtitle: "Wir sind hier, um Ihnen zu helfen. Kontaktieren Sie uns jederzeit",
    form: {
      name: "Vollständiger Name",
      email: "E-Mail-Adresse",
      subject: "Betreff",
      message: "Nachricht",
      send: "Nachricht senden"
    },
    info: {
      address: "Deutschland, Berlin",
      phone: "+49 30 123 4567",
      email: "info@apexreportcraft.de",
      hours: "Montag - Freitag: 09:00 - 18:00"
    }
  },
  
  // Signup Page German
  signup: {
    title: "🚀 Treten Sie der Reporting-Revolution bei",
    subtitle: "Beginnen Sie Ihre Reise mit ARC und entdecken Sie die Macht der KI bei der Erstellung außergewöhnlicher Berichte",
    form: {
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail-Adresse",
      password: "Passwort",
      confirmPassword: "Passwort bestätigen",
      company: "Firmenname",
      role: "Berufsbezeichnung",
      phone: "Telefonnummer",
      country: "Land",
      agreeTerms: "Ich stimme den Nutzungsbedingungen und der Datenschutzerklärung zu",
      newsletter: "Ich möchte Newsletter und aktuelle Updates erhalten",
      submit: "🎯 Kostenloses Konto erstellen"
    },
    benefits: {
      title: "🌟 Warum ARC wählen?",
      items: [
        "🤖 Fortschrittlicher KI-Assistent",
        "🌍 Vollständige deutsche Unterstützung mit RTL",
        "⚡ Berichte in Minuten, nicht Stunden erstellen",
        "🔒 Erweiterte Sicherheit und Datenschutz",
        "📞 24/7 deutscher technischer Support",
        "🆓 Für immer kostenloser Plan"
      ]
    },
    social: {
      title: "Oder registrieren Sie sich mit:",
      google: "Mit Google fortfahren",
      github: "Mit GitHub fortfahren",
      microsoft: "Mit Microsoft fortfahren"
    },
    login: {
      title: "Haben Sie bereits ein Konto?",
      link: "Anmelden"
    }
  },
  
  // Blog Page German
  blog: {
    title: "📚 ARC Blog",
    subtitle: "Entdecken Sie die neuesten Tipps, Tricks und Techniken für die Entwicklung professioneller Oracle APEX-Berichte",
    categories: {
      all: "Alle Artikel",
      tutorials: "Anleitungen",
      features: "Neue Features",
      news: "Nachrichten",
      tips: "Tipps & Tricks"
    },
    search: {
      placeholder: "Artikel durchsuchen...",
      button: "Suchen"
    },
    readMore: "Weiterlesen",
    author: "Autor",
    publishedOn: "Veröffentlicht am",
    readTime: "Min. Lesezeit",
    tags: "Tags",
    noResults: "Keine Artikel gefunden, die Ihrer Suche entsprechen"
  }
};

// Chinese translations
export const zh: Translations = {
  nav: {
    home: "首页",
    features: "功能",
    pricing: "定价",
    community: "社区",
    documentation: "文档",
    support: "支持",
    login: "登录",
    signup: "注册",
    getStarted: "开始使用",
    language: "语言"
  },
  hero: {
    title: "Apex ReportCraft",
    subtitle: "专业报表工具",
    description: "使用Apex ReportCraft轻松创建专业的交互式报表。熟悉的Oracle APEX Developer界面和先进的报表功能。",
    ctaPrimary: "免费试用",
    ctaSecondary: "观看演示",
    watchDemo: "观看演示"
  },
  features: {
    title: "为什么选择Apex ReportCraft？",
    subtitle: "探索使我们的工具成为开发者完美选择的功能",
    easyToUse: {
      title: "易于使用",
      description: "类似Oracle APEX Developer的熟悉界面，使学习和使用快速简便"
    },
    apexNative: {
      title: "原生APEX",
      description: "专为Oracle APEX环境构建，完全支持所有系统组件"
    },
    quickLearning: {
      title: "快速学习",
      description: "对熟悉Oracle APEX环境的开发者来说学习曲线很短"
    },
    powerful: {
      title: "强大且灵活",
      description: "具有高性能的高级功能，用于创建复杂的交互式报表"
    },
    flexible: {
      title: "灵活定制",
      description: "可定制的模板和可重用的组件"
    },
    secure: {
      title: "安全可靠",
      description: "高安全标准，支持加密和高级认证"
    }
  },
  pricing: {
    title: "订阅计划",
    subtitle: "选择适合您需求的计划",
    monthly: "月付",
    yearly: "年付",
    starter: {
      name: "入门版",
      price: "¥199",
      description: "适合小型项目和个人",
      features: [
        "最多10个报表",
        "5 GB存储",
        "邮件支持",
        "基础模板",
        "PDF导出"
      ],
      cta: "免费开始"
    },
    professional: {
      name: "专业版",
      price: "¥699",
      description: "适合团队和中型公司",
      features: [
        "无限报表",
        "100 GB存储",
        "优先支持",
        "高级模板",
        "多格式导出",
        "团队协作",
        "高级API"
      ],
      cta: "14天免费试用",
      popular: "最受欢迎"
    },
    enterprise: {
      name: "企业版",
      price: "定制",
      description: "适合有特殊需求的大型企业",
      features: [
        "所有专业版功能",
        "无限存储",
        "24/7专属支持",
        "定制培训",
        "保证SLA",
        "本地部署",
        "完全定制"
      ],
      cta: "联系我们"
    }
  },
  community: {
    title: "加入我们的社区",
    subtitle: "与来自世界各地的开发者和专家建立联系",
    discord: {
      title: "Discord",
      description: "与社区实时连接",
      members: "成员+"
    },
    forum: {
      title: "论坛",
      description: "提问题和分享经验",
      topics: "主题+"
    },
    github: {
      title: "GitHub",
      description: "为项目开发做贡献",
      stars: "星标+"
    }
  },
  footer: {
    product: {
      title: "产品",
      features: "功能",
      pricing: "定价",
      documentation: "文档",
      releases: "版本"
    },
    company: {
      title: "公司",
      about: "关于我们",
      careers: "招聘",
      press: "媒体",
      blog: "博客"
    },
    support: {
      title: "支持",
      helpCenter: "帮助中心",
      community: "社区",
      contact: "联系我们",
      status: "状态"
    },
    legal: {
      title: "法律",
      privacy: "隐私政策",
      terms: "服务条款",
      security: "安全"
    },
    copyright: "© 2024 Apex ReportCraft. 版权所有。"
  },

  about: {
    title: "关于我们",
    subtitle: "我们是专门为Oracle APEX开发报表解决方案的专家团队",
    story: {
      title: "我们的故事",
      content: "我们的旅程始于认识到Oracle APEX急需专业和集成的报表解决方案。"
    },
    mission: {
      title: "我们的使命",
      content: "我们的使命是赋能开发者和组织轻松创建专业和交互式报表。"
    },
    team: {
      title: "我们的团队",
      content: "我们的团队由Oracle APEX、报表开发和人工智能方面的专家组成。"
    }
  },

  vision: {
    title: "我们的愿景",
    subtitle: "我们努力成为Oracle APEX报表世界中第一个也是最值得信赖的解决方案",
    ourVision: {
      title: "我们的愿景",
      content: "成为Oracle APEX报表解决方案的黄金标准。"
    },
    values: {
      title: "我们的价值观",
      innovation: "创新：我们持续创新以提供设计中的AI等最新技术",
      quality: "质量：我们在产品和服务的每个方面都追求卓越",
      support: "支持：我们提供卓越的24/7支持",
      community: "社区：我们在该地区建立强大的开发者和专家社区"
    }
  },

  contact: {
    title: "联系我们",
    subtitle: "我们在这里为您提供帮助。随时联系我们",
    form: {
      name: "全名",
      email: "邮箱地址",
      subject: "主题",
      message: "消息",
      send: "发送消息"
    },
    info: {
      address: "中国，北京",
      phone: "+86 10 123 4567",
      email: "info@apexreportcraft.cn",
      hours: "周一 - 周五：09:00 - 18:00"
    }
  },
  
  // Signup Page Chinese
  signup: {
    title: "🚀 加入报表革命",
    subtitle: "开始您的ARC之旅，发现AI在创建卓越报表中的力量",
    form: {
      firstName: "名",
      lastName: "姓",
      email: "邮箱地址",
      password: "密码",
      confirmPassword: "确认密码",
      company: "公司名称",
      role: "职位",
      phone: "电话号码",
      country: "国家",
      agreeTerms: "我同意服务条款和隐私政策",
      newsletter: "我想接收新闻通讯和最新更新",
      submit: "🎯 创建免费账户"
    },
    benefits: {
      title: "🌟 为什么选择ARC？",
      items: [
        "🤖 高级AI助手",
        "🌍 完整的中文支持",
        "⚡ 几分钟而非几小时创建报表",
        "🔒 高级安全和数据保护",
        "📞 24/7中文技术支持",
        "🆓 永久免费计划"
      ]
    },
    social: {
      title: "或者使用以下方式注册：",
      google: "使用Google继续",
      github: "使用GitHub继续",
      microsoft: "使用Microsoft继续"
    },
    login: {
      title: "已有账户？",
      link: "登录"
    }
  },
  
  // Blog Page Chinese
  blog: {
    title: "📚 ARC博客",
    subtitle: "发现开发专业Oracle APEX报表的最新技巧、诀窍和技术",
    categories: {
      all: "所有文章",
      tutorials: "教程",
      features: "新功能",
      news: "新闻",
      tips: "技巧和诀窍"
    },
    search: {
      placeholder: "搜索文章...",
      button: "搜索"
    },
    readMore: "阅读更多",
    author: "作者",
    publishedOn: "发布于",
    readTime: "分钟阅读",
    tags: "标签",
    noResults: "未找到与您搜索匹配的文章"
  }
};

// Spanish translations
export const es: Translations = {
  nav: {
    home: "Inicio",
    features: "Características",
    pricing: "Precios",
    community: "Comunidad",
    documentation: "Documentación",
    support: "Soporte",
    login: "Iniciar sesión",
    signup: "Registrarse",
    getStarted: "Comenzar",
    language: "Idioma"
  },
  hero: {
    title: "Apex ReportCraft",
    subtitle: "Herramienta de Reportes Profesional",
    description: "Crea reportes profesionales e interactivos fácilmente con Apex ReportCraft. Interfaz familiar como Oracle APEX Developer con capacidades avanzadas de reportes.",
    ctaPrimary: "Probar gratis",
    ctaSecondary: "Ver demo",
    watchDemo: "Ver demo"
  },
  features: {
    title: "¿Por qué Apex ReportCraft?",
    subtitle: "Descubre las características que hacen de nuestra herramienta la elección perfecta para desarrolladores",
    easyToUse: {
      title: "Fácil de usar",
      description: "Interfaz familiar similar a Oracle APEX Developer, hace que el aprendizaje y uso sea rápido y fácil"
    },
    apexNative: {
      title: "APEX Nativo",
      description: "Construido específicamente para el entorno Oracle APEX con soporte completo para todos los componentes del sistema"
    },
    quickLearning: {
      title: "Aprendizaje rápido",
      description: "Curva de aprendizaje corta para desarrolladores familiarizados con el entorno Oracle APEX"
    },
    powerful: {
      title: "Potente y flexible",
      description: "Capacidades avanzadas para crear reportes complejos e interactivos con alto rendimiento"
    },
    flexible: {
      title: "Personalización flexible",
      description: "Plantillas personalizables y componentes reutilizables"
    },
    secure: {
      title: "Seguro y confiable",
      description: "Altos estándares de seguridad con cifrado y soporte de autenticación avanzada"
    }
  },
  pricing: {
    title: "Planes de Suscripción",
    subtitle: "Elige el plan que se adapte a tus necesidades",
    monthly: "Mensual",
    yearly: "Anual",
    starter: {
      name: "Inicial",
      price: "$29",
      description: "Perfecto para proyectos pequeños e individuos",
      features: [
        "Hasta 10 reportes",
        "5 GB almacenamiento",
        "Soporte por email",
        "Plantillas básicas",
        "Exportar PDF"
      ],
      cta: "Comenzar gratis"
    },
    professional: {
      name: "Profesional",
      price: "$99",
      description: "Para equipos y empresas medianas",
      features: [
        "Reportes ilimitados",
        "100 GB almacenamiento",
        "Soporte prioritario",
        "Plantillas avanzadas",
        "Exportar múltiples formatos",
        "Colaboración en equipo",
        "API avanzada"
      ],
      cta: "Probar 14 días gratis",
      popular: "Más popular"
    },
    enterprise: {
      name: "Empresarial",
      price: "Personalizado",
      description: "Para grandes empresas con necesidades especiales",
      features: [
        "Todas las características profesionales",
        "Almacenamiento ilimitado",
        "Soporte dedicado 24/7",
        "Entrenamiento personalizado",
        "SLA garantizado",
        "Despliegue local",
        "Personalización completa"
      ],
      cta: "Contáctanos"
    }
  },
  community: {
    title: "Únete a nuestra comunidad",
    subtitle: "Conéctate con desarrolladores y expertos de todo el mundo",
    discord: {
      title: "Discord",
      description: "Conéctate con la comunidad en tiempo real",
      members: "miembros+"
    },
    forum: {
      title: "Foro",
      description: "Haz preguntas y comparte experiencias",
      topics: "temas+"
    },
    github: {
      title: "GitHub",
      description: "Contribuye al desarrollo del proyecto",
      stars: "estrellas+"
    }
  },
  footer: {
    product: {
      title: "Producto",
      features: "Características",
      pricing: "Precios",
      documentation: "Documentación",
      releases: "Lanzamientos"
    },
    company: {
      title: "Empresa",
      about: "Acerca de",
      careers: "Carreras",
      press: "Prensa",
      blog: "Blog"
    },
    support: {
      title: "Soporte",
      helpCenter: "Centro de ayuda",
      community: "Comunidad",
      contact: "Contacto",
      status: "Estado"
    },
    legal: {
      title: "Legal",
      privacy: "Política de privacidad",
      terms: "Términos de servicio",
      security: "Seguridad"
    },
    copyright: "© 2024 Apex ReportCraft. Todos los derechos reservados."
  },

  about: {
    title: "Acerca de nosotros",
    subtitle: "Somos un equipo de expertos especializados en desarrollar soluciones de reportes para Oracle APEX",
    story: {
      title: "Nuestra historia",
      content: "Nuestro viaje comenzó con el reconocimiento de la necesidad urgente de una solución profesional e integrada de reportes para Oracle APEX."
    },
    mission: {
      title: "Nuestra misión",
      content: "Nuestra misión es empoderar a desarrolladores y organizaciones para crear reportes profesionales e interactivos fácilmente."
    },
    team: {
      title: "Nuestro equipo",
      content: "Nuestro equipo está compuesto por expertos en Oracle APEX, desarrollo de reportes e inteligencia artificial."
    }
  },

  vision: {
    title: "Nuestra visión",
    subtitle: "Nos esforzamos por ser la primera y más confiable solución en el mundo de reportes de Oracle APEX",
    ourVision: {
      title: "Nuestra visión",
      content: "Convertirnos en el estándar de oro para soluciones de reportes en Oracle APEX."
    },
    values: {
      title: "Nuestros valores",
      innovation: "Innovación: Innovamos continuamente para entregar las últimas tecnologías como IA en diseño",
      quality: "Calidad: Nos esforzamos por la excelencia en cada aspecto de nuestro producto y servicios",
      support: "Soporte: Proporcionamos soporte excepcional 24/7",
      community: "Comunidad: Construimos una fuerte comunidad de desarrolladores y expertos en la región"
    }
  },

  contact: {
    title: "Contáctanos",
    subtitle: "Estamos aquí para ayudarte. Contáctanos en cualquier momento",
    form: {
      name: "Nombre completo",
      email: "Dirección de correo",
      subject: "Asunto",
      message: "Mensaje",
      send: "Enviar mensaje"
    },
    info: {
      address: "España, Madrid",
      phone: "+34 91 123 4567",
      email: "info@apexreportcraft.es",
      hours: "Lunes - Viernes: 09:00 - 18:00"
    }
  },
  
  // Signup Page Spanish
  signup: {
    title: "🚀 Únete a la Revolución de Reportes",
    subtitle: "Inicia tu viaje con ARC y descubre el poder de la IA para crear reportes excepcionales",
    form: {
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Dirección de correo",
      password: "Contraseña",
      confirmPassword: "Confirmar contraseña",
      company: "Nombre de la empresa",
      role: "Título del trabajo",
      phone: "Número de teléfono",
      country: "País",
      agreeTerms: "Acepto los Términos de Servicio y la Política de Privacidad",
      newsletter: "Quiero recibir el boletín y las últimas actualizaciones",
      submit: "🎯 Crear cuenta gratuita"
    },
    benefits: {
      title: "🌟 ¿Por qué elegir ARC?",
      items: [
        "🤖 Asistente de IA avanzado",
        "🌍 Soporte completo en español con RTL",
        "⚡ Crear reportes en minutos, no horas",
        "🔒 Seguridad avanzada y protección de datos",
        "📞 Soporte técnico 24/7 en español",
        "🆓 Plan gratuito para siempre"
      ]
    },
    social: {
      title: "O regístrate con:",
      google: "Continuar con Google",
      github: "Continuar con GitHub",
      microsoft: "Continuar con Microsoft"
    },
    login: {
      title: "¿Ya tienes una cuenta?",
      link: "Iniciar sesión"
    }
  },
  
  // Blog Page Spanish
  blog: {
    title: "📚 Blog de ARC",
    subtitle: "Descubre los últimos consejos, trucos y técnicas para desarrollar reportes profesionales de Oracle APEX",
    categories: {
      all: "Todos los artículos",
      tutorials: "Tutoriales",
      features: "Nuevas características",
      news: "Noticias",
      tips: "Consejos y trucos"
    },
    search: {
      placeholder: "Buscar artículos...",
      button: "Buscar"
    },
    readMore: "Leer más",
    author: "Autor",
    publishedOn: "Publicado el",
    readTime: "min de lectura",
    tags: "Etiquetas",
    noResults: "No se encontraron artículos que coincidan con su búsqueda"
  }
};

// Italian translations
export const it: Translations = {
  nav: {
    home: "Home",
    features: "Caratteristiche",
    pricing: "Prezzi",
    community: "Comunità",
    documentation: "Documentazione",
    support: "Supporto",
    login: "Accedi",
    signup: "Registrati",
    getStarted: "Inizia",
    language: "Lingua"
  },
  hero: {
    title: "Apex ReportCraft",
    subtitle: "Strumento di Reportistica Professionale",
    description: "Crea report professionali e interattivi facilmente con Apex ReportCraft. Interfaccia familiare come Oracle APEX Developer con capacità avanzate di reportistica.",
    ctaPrimary: "Prova gratuitamente",
    ctaSecondary: "Guarda demo",
    watchDemo: "Guarda demo"
  },
  features: {
    title: "Perché Apex ReportCraft?",
    subtitle: "Scopri le caratteristiche che rendono il nostro strumento la scelta perfetta per gli sviluppatori",
    easyToUse: {
      title: "Facile da usare",
      description: "Interfaccia familiare simile a Oracle APEX Developer, rende l'apprendimento e l'utilizzo rapido e facile"
    },
    apexNative: {
      title: "APEX Nativo",
      description: "Costruito specificamente per l'ambiente Oracle APEX con supporto completo per tutti i componenti del sistema"
    },
    quickLearning: {
      title: "Apprendimento rapido",
      description: "Curva di apprendimento breve per sviluppatori familiari con l'ambiente Oracle APEX"
    },
    powerful: {
      title: "Potente e flessibile",
      description: "Capacità avanzate per creare report complessi e interattivi con alte prestazioni"
    },
    flexible: {
      title: "Personalizzazione flessibile",
      description: "Template personalizzabili e componenti riutilizzabili"
    },
    secure: {
      title: "Sicuro e affidabile",
      description: "Alti standard di sicurezza con crittografia e supporto di autenticazione avanzata"
    }
  },
  pricing: {
    title: "Piani di Abbonamento",
    subtitle: "Scegli il piano che si adatta alle tue esigenze",
    monthly: "Mensile",
    yearly: "Annuale",
    starter: {
      name: "Starter",
      price: "€29",
      description: "Perfetto per progetti piccoli e individui",
      features: [
        "Fino a 10 report",
        "5 GB di storage",
        "Supporto email",
        "Template di base",
        "Esportazione PDF"
      ],
      cta: "Inizia gratuitamente"
    },
    professional: {
      name: "Professionale",
      price: "€99",
      description: "Per team e aziende di medie dimensioni",
      features: [
        "Report illimitati",
        "100 GB di storage",
        "Supporto prioritario",
        "Template avanzati",
        "Esportazione multi-formato",
        "Collaborazione di team",
        "API avanzate"
      ],
      cta: "Prova 14 giorni gratis",
      popular: "Più popolare"
    },
    enterprise: {
      name: "Enterprise",
      price: "Personalizzato",
      description: "Per grandi aziende con esigenze speciali",
      features: [
        "Tutte le caratteristiche professionali",
        "Storage illimitato",
        "Supporto dedicato 24/7",
        "Formazione personalizzata",
        "SLA garantito",
        "Distribuzione on-premise",
        "Personalizzazione completa"
      ],
      cta: "Contattaci"
    }
  },
  community: {
    title: "Unisciti alla nostra comunità",
    subtitle: "Connettiti con sviluppatori ed esperti da tutto il mondo",
    discord: {
      title: "Discord",
      description: "Connettiti con la comunità in tempo reale",
      members: "membri+"
    },
    forum: {
      title: "Forum",
      description: "Fai domande e condividi esperienze",
      topics: "argomenti+"
    },
    github: {
      title: "GitHub",
      description: "Contribuisci allo sviluppo del progetto",
      stars: "stelle+"
    }
  },
  footer: {
    product: {
      title: "Prodotto",
      features: "Caratteristiche",
      pricing: "Prezzi",
      documentation: "Documentazione",
      releases: "Rilasci"
    },
    company: {
      title: "Azienda",
      about: "Chi siamo",
      careers: "Carriere",
      press: "Stampa",
      blog: "Blog"
    },
    support: {
      title: "Supporto",
      helpCenter: "Centro assistenza",
      community: "Comunità",
      contact: "Contatto",
      status: "Stato"
    },
    legal: {
      title: "Legale",
      privacy: "Privacy Policy",
      terms: "Termini di servizio",
      security: "Sicurezza"
    },
    copyright: "© 2024 Apex ReportCraft. Tutti i diritti riservati."
  },

  about: {
    title: "Chi siamo",
    subtitle: "Siamo un team di esperti specializzati nello sviluppo di soluzioni di reporting per Oracle APEX",
    story: {
      title: "La nostra storia",
      content: "Il nostro viaggio è iniziato con il riconoscimento del bisogno urgente di una soluzione professionale e integrata di reporting per Oracle APEX."
    },
    mission: {
      title: "La nostra missione",
      content: "La nostra missione è potenziare sviluppatori e organizzazioni per creare facilmente report professionali e interattivi."
    },
    team: {
      title: "Il nostro team",
      content: "Il nostro team è composto da esperti in Oracle APEX, sviluppo di report e intelligenza artificiale."
    }
  },

  vision: {
    title: "La nostra visione",
    subtitle: "Ci sforziamo di essere la prima e più affidabile soluzione nel mondo del reporting Oracle APEX",
    ourVision: {
      title: "La nostra visione",
      content: "Diventare il gold standard per le soluzioni di reporting in Oracle APEX."
    },
    values: {
      title: "I nostri valori",
      innovation: "Innovazione: Innoviamo continuamente per fornire le ultime tecnologie come l'AI nel design",
      quality: "Qualità: Ci sforziamo per l'eccellenza in ogni aspetto del nostro prodotto e servizi",
      support: "Supporto: Forniamo supporto eccezionale 24/7",
      community: "Comunità: Costruiamo una forte comunità di sviluppatori ed esperti nella regione"
    }
  },

  contact: {
    title: "Contattaci",
    subtitle: "Siamo qui per aiutarti. Contattaci in qualsiasi momento",
    form: {
      name: "Nome completo",
      email: "Indirizzo email",
      subject: "Oggetto",
      message: "Messaggio",
      send: "Invia messaggio"
    },
    info: {
      address: "Italia, Milano",
      phone: "+39 02 123 4567",
      email: "info@apexreportcraft.it",
      hours: "Lunedì - Venerdì: 09:00 - 18:00"
    }
  },
  
  // Signup Page Italian
  signup: {
    title: "🚀 Unisciti alla Rivoluzione dei Report",
    subtitle: "Inizia il tuo viaggio con ARC e scopri il potere dell'AI nella creazione di report eccezionali",
    form: {
      firstName: "Nome",
      lastName: "Cognome",
      email: "Indirizzo email",
      password: "Password",
      confirmPassword: "Conferma password",
      company: "Nome azienda",
      role: "Titolo lavorativo",
      phone: "Numero di telefono",
      country: "Paese",
      agreeTerms: "Accetto i Termini di Servizio e la Politica sulla Privacy",
      newsletter: "Voglio ricevere la newsletter e gli ultimi aggiornamenti",
      submit: "🎯 Crea account gratuito"
    },
    benefits: {
      title: "🌟 Perché scegliere ARC?",
      items: [
        "🤖 Assistente AI avanzato",
        "🌍 Supporto completo italiano con RTL",
        "⚡ Crea report in minuti, non ore",
        "🔒 Sicurezza avanzata e protezione dati",
        "📞 Supporto tecnico 24/7 in italiano",
        "🆓 Piano gratuito per sempre"
      ]
    },
    social: {
      title: "O registrati con:",
      google: "Continua con Google",
      github: "Continua con GitHub",
      microsoft: "Continua con Microsoft"
    },
    login: {
      title: "Hai già un account?",
      link: "Accedi"
    }
  },
  
  // Blog Page Italian
  blog: {
    title: "📚 Blog ARC",
    subtitle: "Scopri i più recenti suggerimenti, trucchi e tecniche per sviluppare report professionali Oracle APEX",
    categories: {
      all: "Tutti gli articoli",
      tutorials: "Tutorial",
      features: "Nuove funzionalità",
      news: "Notizie",
      tips: "Suggerimenti e trucchi"
    },
    search: {
      placeholder: "Cerca articoli...",
      button: "Cerca"
    },
    readMore: "Leggi di più",
    author: "Autore",
    publishedOn: "Pubblicato il",
    readTime: "min di lettura",
    tags: "Tag",
    noResults: "Nessun articolo trovato corrispondente alla tua ricerca"
  }
};

// Japanese translations
export const ja: Translations = {
  nav: {
    home: "ホーム",
    features: "機能",
    pricing: "料金",
    community: "コミュニティ",
    documentation: "ドキュメント",
    support: "サポート",
    login: "ログイン",
    signup: "サインアップ",
    getStarted: "始める",
    language: "言語"
  },
  hero: {
    title: "Apex ReportCraft",
    subtitle: "プロフェッショナルレポートツール",
    description: "Apex ReportCraftで簡単にプロフェッショナルでインタラクティブなレポートを作成します。Oracle APEX Developerのような親しみやすいインターフェースと高度なレポート機能。",
    ctaPrimary: "無料で試す",
    ctaSecondary: "デモを見る",
    watchDemo: "デモを見る"
  },
  features: {
    title: "なぜApex ReportCraft？",
    subtitle: "私たちのツールが開発者にとって完璧な選択である機能を発見してください",
    easyToUse: {
      title: "使いやすい",
      description: "Oracle APEX Developerに似た親しみやすいインターフェースで、学習と使用を迅速かつ簡単にします"
    },
    apexNative: {
      title: "ネイティブAPEX",
      description: "Oracle APEX環境専用に構築され、すべてのシステムコンポーネントを完全サポート"
    },
    quickLearning: {
      title: "迅速な学習",
      description: "Oracle APEX環境に慣れ親しんだ開発者のための短い学習曲線"
    },
    powerful: {
      title: "強力で柔軟",
      description: "高性能で複雑でインタラクティブなレポートを作成するための高度な機能"
    },
    flexible: {
      title: "柔軟なカスタマイズ",
      description: "カスタマイズ可能なテンプレートと再利用可能なコンポーネント"
    },
    secure: {
      title: "安全で信頼性",
      description: "暗号化と高度な認証サポートを備えた高いセキュリティ基準"
    }
  },
  pricing: {
    title: "サブスクリプションプラン",
    subtitle: "ニーズに合ったプランを選択してください",
    monthly: "月額",
    yearly: "年額",
    starter: {
      name: "スターター",
      price: "¥2,900",
      description: "小さなプロジェクトと個人に最適",
      features: [
        "最大10のレポート",
        "5GBストレージ",
        "メールサポート",
        "基本テンプレート",
        "PDFエクスポート"
      ],
      cta: "無料で開始"
    },
    professional: {
      name: "プロフェッショナル",
      price: "¥9,900",
      description: "チームと中規模企業向け",
      features: [
        "無制限のレポート",
        "100GBストレージ",
        "優先サポート",
        "高度なテンプレート",
        "マルチフォーマットエクスポート",
        "チームコラボレーション",
        "高度なAPI"
      ],
      cta: "14日間無料試用",
      popular: "最も人気"
    },
    enterprise: {
      name: "エンタープライズ",
      price: "カスタム",
      description: "特別なニーズを持つ大企業向け",
      features: [
        "すべてのプロフェッショナル機能",
        "無制限ストレージ",
        "24/7専用サポート",
        "カスタムトレーニング",
        "保証されたSLA",
        "オンプレミス展開",
        "完全なカスタマイズ"
      ],
      cta: "お問い合わせ"
    }
  },
  community: {
    title: "コミュニティに参加",
    subtitle: "世界中の開発者や専門家とつながる",
    discord: {
      title: "Discord",
      description: "コミュニティとリアルタイムでつながる",
      members: "メンバー+"
    },
    forum: {
      title: "フォーラム",
      description: "質問をして経験を共有する",
      topics: "トピック+"
    },
    github: {
      title: "GitHub",
      description: "プロジェクト開発に貢献する",
      stars: "スター+"
    }
  },
  footer: {
    product: {
      title: "製品",
      features: "機能",
      pricing: "料金",
      documentation: "ドキュメント",
      releases: "リリース"
    },
    company: {
      title: "会社",
      about: "会社概要",
      careers: "キャリア",
      press: "プレス",
      blog: "ブログ"
    },
    support: {
      title: "サポート",
      helpCenter: "ヘルプセンター",
      community: "コミュニティ",
      contact: "お問い合わせ",
      status: "ステータス"
    },
    legal: {
      title: "法的事項",
      privacy: "プライバシーポリシー",
      terms: "利用規約",
      security: "セキュリティ"
    },
    copyright: "© 2024 Apex ReportCraft. 全著作権所有。"
  },

  about: {
    title: "私たちについて",
    subtitle: "私たちはOracle APEXのレポートソリューション開発を専門とする専門家チームです",
    story: {
      title: "私たちの物語",
      content: "私たちの旅は、Oracle APEXのプロフェッショナルで統合されたレポートソリューションの緊急な必要性を認識することから始まりました。"
    },
    mission: {
      title: "私たちの使命",
      content: "私たちの使命は、開発者と組織がプロフェッショナルでインタラクティブなレポートを簡単に作成できるようにすることです。"
    },
    team: {
      title: "私たちのチーム",
      content: "私たちのチームは、Oracle APEX、レポート開発、人工知能の専門家で構成されています。"
    }
  },

  vision: {
    title: "私たちのビジョン",
    subtitle: "Oracle APEXレポートの世界で最初で最も信頼できるソリューションになることを目指しています",
    ourVision: {
      title: "私たちのビジョン",
      content: "Oracle APEXのレポートソリューションのゴールドスタンダードになること。"
    },
    values: {
      title: "私たちの価値観",
      innovation: "革新：デザインにおけるAIなど最新技術を提供するために継続的に革新しています",
      quality: "品質：製品とサービスのあらゆる面で卓越性を追求します",
      support: "サポート：24/7の優れたサポートを提供します",
      community: "コミュニティ：地域で開発者と専門家の強いコミュニティを構築します"
    }
  },

  contact: {
    title: "お問い合わせ",
    subtitle: "私たちがお手伝いします。いつでもお気軽にお問い合わせください",
    form: {
      name: "フルネーム",
      email: "メールアドレス",
      subject: "件名",
      message: "メッセージ",
      send: "メッセージを送信"
    },
    info: {
      address: "日本、東京",
      phone: "+81 3 123 4567",
      email: "info@apexreportcraft.jp",
      hours: "月曜日 - 金曜日：09:00 - 18:00"
    }
  },
  
  // Signup Page Japanese
  signup: {
    title: "🚀 レポート革命に参加",
    subtitle: "ARCでの旅を始めて、優れたレポート作成におけるAIの力を発見してください",
    form: {
      firstName: "名",
      lastName: "姓",
      email: "メールアドレス",
      password: "パスワード",
      confirmPassword: "パスワード確認",
      company: "会社名",
      role: "職種",
      phone: "電話番号",
      country: "国",
      agreeTerms: "利用規約とプライバシーポリシーに同意します",
      newsletter: "ニュースレターと最新情報を受け取りたい",
      submit: "🎯 無料アカウントを作成"
    },
    benefits: {
      title: "🌟 なぜARCを選ぶのか？",
      items: [
        "🤖 高度なAIアシスタント",
        "🌍 RTL対応完全日本語サポート",
        "⚡ 時間ではなく分でレポートを作成",
        "🔒 高度なセキュリティとデータ保護",
        "📞 24/7日本語技術サポート",
        "🆓 永久無料プラン"
      ]
    },
    social: {
      title: "または次でサインアップ：",
      google: "Googleで続行",
      github: "GitHubで続行",
      microsoft: "Microsoftで続行"
    },
    login: {
      title: "既にアカウントをお持ちですか？",
      link: "サインイン"
    }
  },
  
  // Blog Page Japanese
  blog: {
    title: "📚 ARCブログ",
    subtitle: "プロフェッショナルなOracle APEXレポート開発のための最新のヒント、コツ、技術を発見してください",
    categories: {
      all: "すべての記事",
      tutorials: "チュートリアル",
      features: "新機能",
      news: "ニュース",
      tips: "ヒントとコツ"
    },
    search: {
      placeholder: "記事を検索...",
      button: "検索"
    },
    readMore: "続きを読む",
    author: "著者",
    publishedOn: "公開日",
    readTime: "分間の読書",
    tags: "タグ",
    noResults: "検索に一致する記事が見つかりませんでした"
  }
};

// Indonesian translations
export const id: Translations = {
  nav: {
    home: "Beranda",
    features: "Fitur",
    pricing: "Harga",
    community: "Komunitas",
    documentation: "Dokumentasi",
    support: "Dukungan",
    login: "Masuk",
    signup: "Daftar",
    getStarted: "Mulai",
    language: "Bahasa"
  },
  hero: {
    title: "Apex ReportCraft",
    subtitle: "Alat Pelaporan Profesional",
    description: "Buat laporan profesional dan interaktif dengan mudah menggunakan Apex ReportCraft. Antarmuka familiar seperti Oracle APEX Developer dengan kemampuan pelaporan canggih.",
    ctaPrimary: "Coba Gratis",
    ctaSecondary: "Lihat Demo",
    watchDemo: "Lihat Demo"
  },
  features: {
    title: "Mengapa Apex ReportCraft?",
    subtitle: "Temukan fitur-fitur yang membuat alat kami menjadi pilihan sempurna untuk pengembang",
    easyToUse: {
      title: "Mudah Digunakan",
      description: "Antarmuka familiar mirip Oracle APEX Developer, membuat pembelajaran dan penggunaan menjadi cepat dan mudah"
    },
    apexNative: {
      title: "APEX Native",
      description: "Dibangun khusus untuk lingkungan Oracle APEX dengan dukungan penuh untuk semua komponen sistem"
    },
    quickLearning: {
      title: "Pembelajaran Cepat",
      description: "Kurva pembelajaran singkat untuk pengembang yang familiar dengan lingkungan Oracle APEX"
    },
    powerful: {
      title: "Kuat dan Fleksibel",
      description: "Kemampuan canggih untuk membuat laporan kompleks dan interaktif dengan performa tinggi"
    },
    flexible: {
      title: "Kustomisasi Fleksibel",
      description: "Template yang dapat dikustomisasi dan komponen yang dapat digunakan kembali"
    },
    secure: {
      title: "Aman dan Terpercaya",
      description: "Standar keamanan tinggi dengan enkripsi dan dukungan autentikasi canggih"
    }
  },
  pricing: {
    title: "Paket Berlangganan",
    subtitle: "Pilih paket yang sesuai dengan kebutuhan Anda",
    monthly: "Bulanan",
    yearly: "Tahunan",
    starter: {
      name: "Pemula",
      price: "$29",
      description: "Sempurna untuk proyek kecil dan individu",
      features: [
        "Hingga 10 laporan",
        "Penyimpanan 5 GB",
        "Dukungan email",
        "Template dasar",
        "Ekspor PDF"
      ],
      cta: "Mulai Gratis"
    },
    professional: {
      name: "Profesional",
      price: "$99",
      description: "Untuk tim dan perusahaan menengah",
      features: [
        "Laporan tak terbatas",
        "Penyimpanan 100 GB",
        "Dukungan prioritas",
        "Template canggih",
        "Ekspor multi-format",
        "Kolaborasi tim",
        "API canggih"
      ],
      cta: "Coba 14 hari gratis",
      popular: "Paling Populer"
    },
    enterprise: {
      name: "Enterprise",
      price: "Khusus",
      description: "Untuk perusahaan besar dengan kebutuhan khusus",
      features: [
        "Semua fitur Profesional",
        "Penyimpanan tak terbatas",
        "Dukungan khusus 24/7",
        "Pelatihan khusus",
        "SLA terjamin",
        "Deployment on-premise",
        "Kustomisasi penuh"
      ],
      cta: "Hubungi Kami"
    }
  },
  community: {
    title: "Bergabung dengan Komunitas Kami",
    subtitle: "Terhubung dengan pengembang dan ahli dari seluruh dunia",
    discord: {
      title: "Discord",
      description: "Terhubung dengan komunitas secara real-time",
      members: "anggota+"
    },
    forum: {
      title: "Forum",
      description: "Ajukan pertanyaan dan berbagi pengalaman",
      topics: "topik+"
    },
    github: {
      title: "GitHub",
      description: "Berkontribusi pada pengembangan proyek",
      stars: "bintang+"
    }
  },
  footer: {
    product: {
      title: "Produk",
      features: "Fitur",
      pricing: "Harga",
      documentation: "Dokumentasi",
      releases: "Rilis"
    },
    company: {
      title: "Perusahaan",
      about: "Tentang Kami",
      careers: "Karier",
      press: "Pers",
      blog: "Blog"
    },
    support: {
      title: "Dukungan",
      helpCenter: "Pusat Bantuan",
      community: "Komunitas",
      contact: "Kontak",
      status: "Status"
    },
    legal: {
      title: "Hukum",
      privacy: "Kebijakan Privasi",
      terms: "Syarat Layanan",
      security: "Keamanan"
    },
    copyright: "© 2024 Apex ReportCraft. Hak cipta dilindungi."
  },

  about: {
    title: "Tentang Kami",
    subtitle: "Kami adalah tim ahli yang berspesialisasi dalam mengembangkan solusi pelaporan untuk Oracle APEX",
    story: {
      title: "Kisah Kami",
      content: "Perjalanan kami dimulai dengan mengakui kebutuhan mendesak akan solusi pelaporan yang profesional dan terintegrasi untuk Oracle APEX."
    },
    mission: {
      title: "Misi Kami",
      content: "Misi kami adalah memberdayakan pengembang dan organisasi untuk dengan mudah membuat laporan yang profesional dan interaktif."
    },
    team: {
      title: "Tim Kami",
      content: "Tim kami terdiri dari para ahli Oracle APEX, pengembangan laporan, dan kecerdasan buatan."
    }
  },

  vision: {
    title: "Visi Kami",
    subtitle: "Kami berusaha menjadi solusi pertama dan paling terpercaya di dunia pelaporan Oracle APEX",
    ourVision: {
      title: "Visi Kami",
      content: "Menjadi standar emas untuk solusi pelaporan di Oracle APEX."
    },
    values: {
      title: "Nilai-nilai Kami",
      innovation: "Inovasi: Kami terus berinovasi untuk memberikan teknologi terbaru seperti AI dalam desain",
      quality: "Kualitas: Kami berusaha untuk keunggulan dalam setiap aspek produk dan layanan kami",
      support: "Dukungan: Kami menyediakan dukungan luar biasa 24/7",
      community: "Komunitas: Kami membangun komunitas yang kuat dari pengembang dan ahli di wilayah ini"
    }
  },

  contact: {
    title: "Hubungi Kami",
    subtitle: "Kami di sini untuk membantu Anda. Hubungi kami kapan saja",
    form: {
      name: "Nama Lengkap",
      email: "Alamat Email",
      subject: "Subjek",
      message: "Pesan",
      send: "Kirim Pesan"
    },
    info: {
      address: "Indonesia, Jakarta",
      phone: "+62 21 123 4567",
      email: "info@apexreportcraft.id",
      hours: "Senin - Jumat: 09:00 - 18:00"
    }
  },
  
  // Signup Page Indonesian
  signup: {
    title: "🚀 Bergabung dengan Revolusi Pelaporan",
    subtitle: "Mulai perjalanan Anda dengan ARC dan temukan kekuatan AI dalam menciptakan laporan luar biasa",
    form: {
      firstName: "Nama Depan",
      lastName: "Nama Belakang",
      email: "Alamat Email",
      password: "Kata Sandi",
      confirmPassword: "Konfirmasi Kata Sandi",
      company: "Nama Perusahaan",
      role: "Jabatan",
      phone: "Nomor Telepon",
      country: "Negara",
      agreeTerms: "Saya menyetujui Syarat Layanan dan Kebijakan Privasi",
      newsletter: "Saya ingin menerima newsletter dan pembaruan terbaru",
      submit: "🎯 Buat Akun Gratis"
    },
    benefits: {
      title: "🌟 Mengapa Memilih ARC?",
      items: [
        "🤖 Asisten AI Canggih",
        "🌍 Dukungan Bahasa Indonesia Lengkap dengan RTL",
        "⚡ Buat laporan dalam hitungan menit, bukan jam",
        "🔒 Keamanan canggih dan perlindungan data",
        "📞 Dukungan teknis 24/7 dalam Bahasa Indonesia",
        "🆓 Rencana gratis selamanya"
      ]
    },
    social: {
      title: "Atau daftar dengan:",
      google: "Lanjutkan dengan Google",
      github: "Lanjutkan dengan GitHub",
      microsoft: "Lanjutkan dengan Microsoft"
    },
    login: {
      title: "Sudah punya akun?",
      link: "Masuk"
    }
  },
  
  // Blog Page Indonesian
  blog: {
    title: "📚 Blog ARC",
    subtitle: "Temukan tips, trik, dan teknik terbaru untuk mengembangkan laporan Oracle APEX profesional",
    categories: {
      all: "Semua Artikel",
      tutorials: "Tutorial",
      features: "Fitur Baru",
      news: "Berita",
      tips: "Tips & Trik"
    },
    search: {
      placeholder: "Cari artikel...",
      button: "Cari"
    },
    readMore: "Baca Selengkapnya",
    author: "Penulis",
    publishedOn: "Diterbitkan pada",
    readTime: "menit baca",
    tags: "Tag",
    noResults: "Tidak ada artikel yang ditemukan sesuai dengan pencarian Anda"
  }
};

// All supported languages
export const languages = {
  ar, en, tr, hi, de, zh, es, it, ja, id
} as const;

export type SupportedLanguage = keyof typeof languages;

// Language utility functions
export const getTranslation = (lang: SupportedLanguage): Translations => {
  return languages[lang] || languages.en;
};

export const getSupportedLanguages = (): { code: SupportedLanguage; name: string; nativeName: string }[] => {
  return [
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' }
  ];
};