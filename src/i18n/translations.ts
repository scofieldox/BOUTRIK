import marchicaSurveyImg from "../assets/images/marchica_survey_1782354320299.jpg";
import subdivisionMappingImg from "../assets/images/subdivision_mapping_1782352708876.jpg";
import gisAnalysisImg from "../assets/images/gis_analysis_1782352722617.jpg";
import facadeLaserScanMaleImg from "../assets/images/facade_laser_scan_male_1782354336834.jpg";
import masterPlanSurveyMaleImg from "../assets/images/master_plan_survey_male_1782354354558.jpg";
import gisDataAnalyticsImg from "../assets/images/gis_data_analytics_1782099045595.jpg";

export const translations = {
  fr: {
    company: "ECARTTOP",
    slogan: "Ingénierie / SIG / Topographie",
    engineer: "Nabil Boutrik • Ingénieur Topographe",
    name: "VOTRE MESURE DE CONFIANCE",
    heroDesc: "Cabinet spécialisé dans les levés de haute précision, le cadastre et l'ingénierie géospatiale à Nador. Nous transformons les données complexes en plans exploitables.",
    nav: {
      home: "Accueil",
      about: "À Propos",
      services: "Services",
      portfolio: "Portfolio",
      seisme: "Séisme Marrakech",
      studio: "Boutique Carto",
      blog: "Blog",
      careers: "Carrières",
      contact: "Contact"
    },
    home: {
      hero: {
        title: "VOTRE MESURE",
        subtitle: "DE CONFIANCE",
        desc: "Cabinet spécialisé dans les levés de haute précision, le cadastre et l'ingénierie géospatiale à Nador. Nous transformons les données complexes en plans exploitables.",
        cta: "Démarrer un Projet"
      },
      stats: {
        years: "Années d'Expérience",
        projects: "Projets Réalisés",
        clients: "Clients Satisfaits",
        precision: "Précision Garantie",
        droneHours: "Heures de Vol Drone"
      }
    },
    about: {
      title: "ECARTTOP",
      profile: "Notre Cabinet",
      desc: "Le cabinet ECARTTOP, dirigé par des experts en Ingénierie Géomètre-Topographe, se distingue par sa vision axée sur la rigueur technique et juridique. Membre de l'Ordre National, nous accompagnons les promoteurs, les administrations et les particuliers dans la région de Nador.",
      stats: [
        { value: "15+", label: "Années d'Expérience" },
        { value: "500+", label: "Missions Réussies" }
      ],
      values: [
        { title: "Agréé ANCFCC", text: "Expertise Foncière & Cadastrale" },
        { title: "Innovation SIG", text: "Solutions Géospatiales Avancées" }
      ],
      quote: "La précision n'est pas une option, c'est notre fondement."
    },
    services: {
      title: "Nos Expertises",
      desc: "Solutions métriques avancées pour le foncier, le génie civil et l'aménagement urbain.",
      items: [
        { 
          id: "topo",
          title: "Levés Topographiques", 
          desc: "Expertise de pointe utilisant GNSS (RTK) et stations robotisées pour une précision millimétrique certifiée.",
          features: ["Bornage de propriété", "Plans de masse"],
          techDetails: "Précision millimétrique assurée par récepteurs GNSS RTK de haute technologie et stations robotisées Trimble S5, garantissant la fiabilité absolue de vos plans de masse et implantations."
        },
        { 
          id: "foncier",
          title: "Droit Foncier", 
          desc: "Expertise juridique et technique pour la sécurisation de votre patrimoine immobilier et la gestion de vos titres fonciers.",
          features: ["ANCFCC Dossiers", "Division & Lotissement"],
          techDetails: "Instruction complète des dossiers cadastraux ANCFCC, mise en concordance des titres fonciers, copropriétés complexes, lotissements et morcellements selon la réglementation en vigueur."
        },
        { 
          id: "sig",
          title: "SIG & LiDAR", 
          desc: "Analyses géospatiales complexes et cartographie par drone pour une visualisation 3D haute densité.",
          features: ["Modélisation Numérique", "Monitoring par Drone"],
          techDetails: "Modélisation 3D haute définition, nuages de points LiDAR denses pour calculs de volumes, photogrammétrie par drone UAV de précision et intégration de bases de données SIG multi-couches."
        }
      ]
    },
    portfolio: {
      title: "Projets Réalisés",
      desc: "Découvrez nos réalisations majeures dans la région de l'Oriental.",
      items: [
        { 
          id: "infrastructure-nador",
          src: marchicaSurveyImg, 
          title: "Infrastructure Nador West Med", 
          category: "Cartographie Numérique",
          client: "Nador West Med SA",
          description: "Levés topographiques de haute précision pour le développement du complexe portuaire Nador West Med. Ce projet a nécessité l'utilisation de stations totales robotisées et de GNSS RTK pour garantir une précision millimétrique sur une zone de plus de 500 hectares.",
          metrics: "Précision < 5mm | 500+ Hectares couverts"
        },
        { 
          id: "lotissement-al-omrane",
          src: subdivisionMappingImg, 
          title: "Lotissement Al Omrane", 
          category: "Cartographie Numérique",
          client: "Al Omrane Oriental",
          description: "Conception et suivi topographique pour un nouveau lotissement résidentiel. Nous avons réalisé le plan de masse, le piquetage des axes de voirie et la délimitation des parcelles pour plus de 200 lots.",
          metrics: "200+ Parcelles délimitées | 12km de voirie"
        },
        { 
          id: "analyse-sig-regionale",
          src: gisAnalysisImg, 
          title: "Analyse SIG Régionale", 
          category: "Cartographie Numérique",
          client: "Conseil Régional de l'Oriental",
          description: "Mise en place d'un Système d'Information Géographique pour la gestion des ressources territoriales. Intégration de données LiDAR et imagerie satellite pour l'analyse de l'occupation du sol.",
          metrics: "Base de données 50GB | 15 Couches thématiques"
        },
        {
          id: "cartographie-casablanca",
          src: gisDataAnalyticsImg,
          title: "Cartographie Interactive de Casablanca",
          category: "Cartographie Numérique",
          client: "Wilaya de Casablanca-Settat",
          description: "Développement d'une plateforme WebGIS interactive pour la métropole de Casablanca. Intégration de plans cadastraux multi-sources, réseaux d'infrastructure majeurs et imagerie haute définition.",
          metrics: "Couverture 1200+ km² | +50 Couches SIG"
        }
      ]
    },
    blog: {
      title: "Actualités & Insights",
      desc: "Suivez les dernières innovations et actualités du secteur de la géomatique à Nador.",
      posts: [
        {
          img: facadeLaserScanMaleImg,
          tag: "Technologie",
          date: "10 Avril 2026",
          title: "L'avenir du mapping par drone au Maroc",
          desc: "Comment les données haute résolution révolutionnent la planification des infrastructures énergétiques de grande envergure dans l'Oriental."
        },
        {
          img: masterPlanSurveyMaleImg,
          tag: "Juridique",
          date: "28 Mars 2026",
          title: "Comprendre les titres fonciers et le cadastre",
          desc: "Un guide essentiel pour les promoteurs sur l'importance des levés de précision dans les transactions immobilières."
        }
      ]
    },
    careers: {
      title: "Rejoignez ECARTTOP",
      desc: "Nous recherchons des talents passionnés par la géométrie et l'innovation territoriale.",
      positions: [
        { 
          title: "Ingénieur Géomètre Senior", 
          dept: "Technique", 
          type: "CDI", 
          location: "Nador, Maroc", 
          salary: "Selon profil" 
        },
        { 
          title: "Analyse SIG / Data Manager", 
          dept: "Data & GIS", 
          type: "Hybride", 
          location: "Nador", 
          salary: "Compétitif" 
        }
      ]
    },
    contact: {
      title: "Prenons Contact",
      subtitle: "Votre projet mérite une précision d'expert.",
      desc: "Vous avez une question ou un projet ? Notre équipe est prête à vous accompagner.",
      info: {
        address: "172 bd Youssef Ibn Tachfine, Ennasr 3ème étage, Nador",
        phone: "06 60 07 66 77",
        email: "contact@ecarttop.ma"
      },
      form: {
        name: "Nom Complet",
        email: "Email",
        subject: "Sujet",
        message: "Votre projet...",
        send: "Envoyer le message"
      }
    },
    ai: {
      title: "Assistant ECARTTOP",
      welcome: "Bonjour ! Je suis l'assistant IA d'ECARTTOP. Je peux vous renseigner sur nos services à Nador ou vous mettre en contact avec l'Ingénieur Nabil Boutrik.",
      placeholder: "Posez une question..."
    }
  },
  ar: {
    company: "إيكارطوب",
    slogan: "هندسة / نظم المعلومات الجغرافية / الطوبوغرافيا",
    engineer: "نبيل بوتريق • مهندس مساح طوبوغرافي",
    name: "قياسكم الموثوق",
    heroDesc: "مكتب متخصص في المسوحات عالية الدقة، المسح العقاري والهندسة الجيومكانية في الناظور. نحول البيانات المعقدة إلى خرائط قابلة للاستغلال.",
    nav: {
      home: "الرئيسية",
      about: "حول المكتب",
      services: "الخدمات",
      portfolio: "إنجازاتنا",
      seisme: "زلزال مراكش",
      studio: "متجر الخرائط",
      blog: "المدونة",
      careers: "وظائف",
      contact: "اتصال"
    },
    home: {
      hero: {
        title: "قياسكم",
        subtitle: "الموثوق",
        desc: "مكتب متخصص في المسوحات عالية الدقة، المسح العقاري والهندسة الجيومكانية في الناظور. نحول البيانات المعقدة إلى خرائط قابلة للاستغلال.",
        cta: "ابدأ مشروعك"
      },
      stats: {
        years: "سنة من الخبرة",
        projects: "مشاريع منجزة",
        clients: "عملاء راضون",
        precision: "دقة مضمونة",
        droneHours: "ساعات طيران الدرون"
      }
    },
    about: {
      title: "إيكارطوب",
      profile: "مكتبنا",
      desc: "يتميز مكتب إيكارطوب، تحت إشراف خبراء في الهندسة المساحية الطوبوغرافية، برؤية تركز على الصرامة التقنية والقانونية. كأعضاء في الهيئة الوطنية، نواكب المنعشين، الإدارات والخواص في منطقة الناظور.",
      stats: [
        { value: "15+", label: "سنة من الخبرة" },
        { value: "500+", label: "مهمة ناجحة" }
      ],
      values: [
        { title: "معتمد من ANCFCC", text: "خبرة عقارية ومساحية" },
        { title: "ابتكار SIG", text: "حلول جيومكانية متطورة" }
      ],
      quote: "الدقة ليست خياراً، بل هي أساسنا."
    },
    services: {
      title: "خبراتنا",
      desc: "حلول مترية متقدمة للعقارات والهندسة المدنية والتخطيط العمراني.",
      items: [
        { 
          id: "topo",
          title: "المسح الطوبوغرافي", 
          desc: "خبرة متطورة باستخدام GNSS (RTK) والمحطات الروبوتية لضمان دقة مليمترية معتمدة.",
          features: ["تحديد حدود الملكية", "تصاميم الكتلة"],
          techDetails: "دقة مليمترية مضمونة بفضل أجهزة استقبال GNSS RTK ثنائية التردد المتطورة ومحطات Trimble S5 الروبوتية لضمان موثوقية تامة لجميع المخططات الطوبوغرافية والمسوحات."
        },
        { 
          id: "foncier",
          title: "القانون العقاري", 
          desc: "خبرة قانونية وتقنية لتأمين ممتلكاتكم العقارية وإدارة رسومكم العقارية.",
          features: ["ملفات المحافظة العقارية", "القسمة والتجزئة"],
          techDetails: "دراسة وإعداد شامل لملفات المحافظة العقارية والمسح العقاري (ANCFCC)، مطابقة الرسوم والملكيات، تجزئة الأراضي وتقسيمها طبقاً للقوانين والأنظمة الجاري بها العمل."
        },
        { 
          id: "sig",
          title: "SIG & LiDAR", 
          desc: "تحليلات جيومكانية معقدة وخرائط بالدرون لتصور ثلاثي الأبعاد عالي الكثافة.",
          features: ["النمذجة الرقمية", "المراقبة بالدرون"],
          techDetails: "نمذجة ثلاثية الأبعاد فائقة الدقة، معالجة سحابة نقاط LiDAR الكثيفة لحسابات حجوم الأتربة، المسح الجوي بالدرون (UAV)، ودمج قواعد البيانات الجغرافية متعددة الطبقات."
        }
      ]
    },
    portfolio: {
      title: "إنجازاتنا",
      desc: "اكتشف أهم إنجازاتنا في الجهة الشرقية.",
      items: [
        { 
          id: "infrastructure-nador",
          src: marchicaSurveyImg, 
          title: "بنية تحتية الناظور غرب المتوسط", 
          category: "رسم الخرائط الرقمية",
          client: "Nador West Med SA",
          description: "مسوحات طوبوغرافية عالية الدقة لتطوير المجمع المينائي الناظور غرب المتوسط. تطلب هذا المشروع استخدام محطات روبوتية و GNSS RTK لضمان دقة مليمترية على مساحة تزيد عن 500 هكتار.",
          metrics: "دقة < 5 ملم | تغطية 500+ هكتار"
        },
        { 
          id: "lotissement-al-omrane",
          src: subdivisionMappingImg, 
          title: "تجزئة العمران", 
          category: "رسم الخرائط الرقمية",
          client: "Al Omrane Oriental",
          description: "تصميم ومتابعة طوبوغرافية لتجزئة سكنية جديدة. قمنا بإعداد تصميم الكتلة، وتحديد محاور الطرق وتحديد القطع الأرضية لأكثر من 200 بقعة.",
          metrics: "تحديد 200+ بقعة | 12 كلم من الطرق"
        },
        { 
          id: "analyse-sig-regionale",
          src: gisAnalysisImg, 
          title: "تحليل SIG جهوي", 
          category: "رسم الخرائط الرقمية",
          client: "Conseil Régional de l'Oriental",
          description: "وضع نظام معلومات جغرافي لإدارة الموارد الترابية. دمج بيانات LiDAR وصور الأقمار الصناعية لتحليل استخدام الأراضي.",
          metrics: "قاعدة بيانات 50 جيجابايت | 15 طبقة موضوعاتية"
        },
        {
          id: "cartographie-casablanca",
          src: gisDataAnalyticsImg,
          title: "رسم الخرائط التفاعلية للدار البيضاء",
          category: "رسم الخرائط الرقمية",
          client: "Wilaya de Casablanca-Settat",
          description: "تطوير منصة ويب للمعلومات الجغرافية (WebGIS) التفاعلية لمدينة الدار البيضاء الكبرى لتوحيد كافة الطبقات البيانية.",
          metrics: "تغطية 1200+ كم² | أكثر من 50 طبقة جغرافية"
        }
      ]
    },
    blog: {
      title: "أخبار وآفاق",
      desc: "تابع آخر الابتكارات والأخبار في قطاع الجيوماتكس بالناظور.",
      posts: [
        {
          img: facadeLaserScanMaleImg,
          tag: "تكنولوجيا",
          date: "10 أبريل 2026",
          title: "مستقبل الخرائط بالدرون في المغرب",
          desc: "كيف تحدث البيانات عالية الدقة ثورة في تخطيط البنية التحتية للطاقة واسعة النطاق في الشرق."
        },
        {
          img: masterPlanSurveyMaleImg,
          tag: "قانوني",
          date: "28 مارس 2026",
          title: "فهم الرسوم العقارية والمسح العقاري",
          desc: "دليل أساسي للمنعشين حول أهمية المسوحات الدقيقة في المعاملات العقارية."
        }
      ]
    },
    careers: {
      title: "انضم إلى إيكارطوب",
      desc: "نحن نبحث عن مواهب شغوفة بالهندسة والابتكار الترابي.",
      positions: [
        { 
          title: "مهندس مساح طوبوغرافي أول", 
          dept: "تقني", 
          type: "دوام كامل", 
          location: "الناظور، المغرب", 
          salary: "حسب الملف الشخصي" 
        },
        { 
          title: "محلل SIG / مدير بيانات", 
          dept: "البيانات ونظم المعلومات الجغرافية", 
          type: "هجين", 
          location: "الناظور", 
          salary: "تنافسي" 
        }
      ]
    },
    contact: {
      title: "اتصل بنا",
      subtitle: "مشروعكم يستحق دقة الخبراء.",
      desc: "هل لديك سؤال أو مشروع؟ فريقنا جاهز لمواكبتك.",
      info: {
        address: "172 شارع يوسف بن تاشفين، النصر الطابق الثالث، الناظور",
        phone: "06 60 07 66 77",
        email: "contact@ecarttop.ma"
      },
      form: {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        subject: "الموضوع",
        message: "مشروعكم...",
        send: "إرسال الرسالة"
      }
    },
    ai: {
      title: "مساعد إيكارطوب",
      welcome: "مرحباً! أنا المساعد الذكي لإيكارطوب. يمكنني إطلاعكم على خدماتنا في الناظور أو توصيلكم بالمهندس نبيل بوتريق.",
      placeholder: "اطرح سؤالاً..."
    }
  }
};
