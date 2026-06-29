import marchicaSurveyImg from "../assets/images/marchica_survey_1782354320299.jpg";
import subdivisionMappingImg from "../assets/images/subdivision_mapping_1782352708876.jpg";
import gisAnalysisImg from "../assets/images/gis_analysis_1782352722617.jpg";
import cadastralSurveyImg from "../assets/images/cadastral_survey_1782352738234.jpg";
import facadeLaserScanMaleImg from "../assets/images/facade_laser_scan_male_1782354336834.jpg";
import masterPlanSurveyMaleImg from "../assets/images/master_plan_survey_male_1782354354558.jpg";
import gisDataAnalyticsImg from "../assets/images/gis_data_analytics_1782099045595.jpg";

export interface ProjectTranslations {
  title: string;
  category: string;
  metrics: string;
  description: string;
  location?: string;
  duration: string;
  testimonial?: {
    author: string;
    role: string;
    quote: string;
  };
}

export interface Project {
  id: number | string;
  client: string;
  image: string;
  videoUrl?: string;
  date?: string;
  modelUrl?: string;
  technologies: string[];
  performanceData?: { name: string; value: number }[];
  milestones?: { date: string; fr: string; ar: string }[];
  fr: ProjectTranslations;
  ar: ProjectTranslations;
}

export const projects: Project[] = [
  {
    id: "modelisation-armila",
    client: "Province de Driouch / Commune M'hajer",
    image: gisAnalysisImg,
    videoUrl: "/Gis.mp4",
    date: "2024",
    technologies: ["ArcGIS", "Esri CityEngine", "SIG", "Modélisation Procédurale (CGA)", "Modélisation 3D"],
    performanceData: [
      { name: "Précision SIG", value: 98 },
      { name: "Densité Bâtiments", value: 95 },
      { name: "Vitesse de Rendu", value: 92 },
      { name: "Réalisme Visuel", value: 90 }
    ],
    milestones: [
      { date: "Fév 2024", fr: "Acquisition des données SIG & Topographiques", ar: "جمع البيانات الجغرافية والطبوغرافية" },
      { date: "Avr 2024", fr: "Développement des règles procédurales CGA", ar: "تطوير قواعد النمذجة الإجرائية CGA" },
      { date: "Juin 2024", fr: "Génération 3D du village d'Armila", ar: "توليد النموذج ثلاثي الأبعاد لقرية أرميلة" },
      { date: "Sept 2024", fr: "Intégration et livraison SIG finale", ar: "الدمج النهائي والتسليم في البيئة الجغرافية" }
    ],
    fr: {
      title: "Modélisation Procédurale 3D d'Armila",
      category: "SIG & Modélisation 3D",
      metrics: "Technologie CGA | 100% Modélisation 3D",
      description: "Modélisation procédurale 3D complète et détaillée du village de Douar Armila (Province de Driouch) dans un environnement de Système d'Information Géographique (SIG). Ce projet novateur utilise ArcGIS pour la gestion des données géospatiales de base et Esri CityEngine pour la génération automatique et précise des structures urbaines, bâtiments individuels, réseaux routiers et végétations à l'aide de scripts procéduraux CGA.",
      location: "Province de Driouch, Maroc",
      duration: "8 mois"
    },
    ar: {
      title: "النمذجة الإجرائية ثلاثية الأبعاد لقرية أرميلة",
      category: "نظم المعلومات الجغرافية والنمذجة ثلاثية الأبعاد",
      metrics: "تكنولوجيا CGA | نمذجة ثلاثية الأبعاد 100%",
      description: "نمذجة إجرائية ثلاثية الأبعاد كاملة ومفصلة لقرية دوار أرميلة (إقليم الدريوش) ضمن بيئة نظام المعلومات الجغرافي (SIG). يعتمد هذا المشروع المبتكر على برمجيات ArcGIS لإدارة البيانات الجيومكانية الأساسية، و Esri CityEngine لتوليد تلقائي ودقيق للمباني السكنية، وشبكات الطرق، والمساحات الخضراء باستخدام قواعد برمجية إجرائية (CGA) متطورة.",
      location: "إقليم الدريوش، المغرب",
      duration: "8 أشهر"
    }
  },
  {
    id: "infrastructure-nador",
    client: "Nador West Med SA",
    image: marchicaSurveyImg,
    date: "2024",
    modelUrl: "/infrastructure-nador-model.glb",
    technologies: ["Leica TS16", "GNSS GS18", "LiDAR", "AutoCAD Civil 3D"],
    performanceData: [
      { name: "Précision Planimétrique", value: 98 },
      { name: "Précision Altimétrique", value: 95 },
      { name: "Vitesse d'Exécution", value: 88 },
      { name: "Satisfaction Client", value: 100 }
    ],
    milestones: [
      { date: "Jan 2024", fr: "Initialisation", ar: "بداية المشروع" },
      { date: "Mar 2024", fr: "Levé GPS", ar: "الرفع بـ GPS" },
      { date: "Jun 2024", fr: "Modélisation 3D", ar: "النمذجة ثلاثية الأبعاد" },
      { date: "Oct 2024", fr: "Livraison Finale", ar: "التسليم النهائي" }
    ],
    fr: {
      title: "Infrastructure Nador West Med",
      category: "Cartographie Numérique",
      metrics: "Précision < 5mm | 500+ Hectares couverts",
      description: "Levés topographiques de haute précision pour le développement du complexe portuaire Nador West Med. Ce projet a nécessité l'utilisation de stations totales robotisées et de GNSS RTK pour garantir une précision millimétrique sur une zone de plus de 500 hectares.",
      location: "Nador, Maroc",
      duration: "18 mois",
      testimonial: {
        author: "Jean-Pierre Durand",
        role: "Chef de Projet",
        quote: "ECARTTOP a fourni des données d'une précision exceptionnelle, cruciales pour la réussite de ce chantier d'envergure."
      }
    },
    ar: {
      title: "بنية تحتية الناظور غرب المتوسط",
      category: "رسم الخرائط الرقمية",
      metrics: "دقة < 5 ملم | تغطية 500+ هكتار",
      description: "مسوحات طبوغرافية عالية الدقة لتطوير مجمع ميناء الناظور غرب المتوسط. تطلب هذا المشروع استخدام محطات شاملة آلية و GNSS RTK لضمان دقة مليمترية على مساحة تزيد عن 500 هكتار.",
      location: "الناظور، المغرب",
      duration: "18 شهراً",
      testimonial: {
        author: "جون بيير دوراند",
        role: "مدير المشروع",
        quote: "قدمت ECARTTOP بيانات بدقة استثنائية، كانت حاسمة لنجاح هذا المشروع الضخم."
      }
    }
  },
  {
    id: "lotissement-al-omrane",
    client: "Al Omrane Oriental",
    image: subdivisionMappingImg,
    date: "2023",
    modelUrl: "/lotissement-urban-model.glb",
    technologies: ["DJI Matrice 300 RTK", "PIX4D", "Global Mapper"],
    performanceData: [
      { name: "Densité du Nuage", value: 92 },
      { name: "Précision GSD", value: 96 },
      { name: "Couverture Terrain", value: 99 },
      { name: "Optimisation Temps", value: 85 }
    ],
    milestones: [
      { date: "Avr 2023", fr: "Vol Drone", ar: "تحليق الدرون" },
      { date: "Mai 2023", fr: "Calculs de Cubatures", ar: "حساب المكعبات" },
      { date: "Juil 2023", fr: "Plan de Masse", ar: "مخطط الكتلة" },
      { date: "Sept 2023", fr: "Délimitation", ar: "تحديد الحدود" }
    ],
    fr: {
      title: "Lotissement Al Omrane",
      category: "Cartographie Numérique",
      metrics: "200+ Parcelles délimitées | 12km de voirie",
      description: "Conception et suivi topographique pour un nouveau lotissement résidentiel. Nous avons réalisé le plan de masse, le piquetage des axes de voirie et la délimitation des parcelles pour plus de 200 lots.",
      location: "Oujda, Maroc",
      duration: "6 mois",
      testimonial: {
        author: "Ahmed Alami",
        role: "Directeur Technique",
        quote: "Leur approche innovante avec les drones a permis de gagner un temps précieux sur la phase de relevé initial."
      }
    },
    ar: {
      title: "تجزئة العمران",
      category: "رسم الخرائط الرقمية",
      metrics: "تحديد 200+ بقعة | 12 كم من الطرق",
      description: "تصميم ومتابعة طبوغرافية لتجزئة سكنية جديدة. قمنا بإعداد مخطط الكتلة، وتخطيط محاور الطرق وتحديد البقع لأكثر من 200 حصة.",
      location: "وجدة، المغرب",
      duration: "6 أشهر",
      testimonial: {
        author: "أحمد العلمي",
        role: "المدير التقني",
        quote: "سمح نهجهم المبتكر باستخدام الطائرات بدون طيار بتوفير وقت ثمين في مرحلة الرفع الأولي."
      }
    }
  },
  {
    id: "analyse-sig-regionale",
    client: "Conseil Régional de l'Oriental",
    image: gisAnalysisImg,
    date: "2024",
    technologies: ["ArcGIS Pro", "QGIS", "PostGIS"],
    performanceData: [
      { name: "Intégrité Données", value: 100 },
      { name: "Temps de Réponse", value: 94 },
      { name: "Complexité Analyse", value: 90 },
      { name: "Accessibilité", value: 98 }
    ],
    fr: {
      title: "Analyse SIG Régionale",
      category: "Cartographie Numérique",
      metrics: "Base de données 50GB | 15 Couches thématiques",
      description: "Mise en place d'un Système d'Information Géographique pour la gestion des ressources territoriales. Intégration de données LiDAR et imagerie satellite pour l'analyse de l'occupation du sol.",
      location: "Région de l'Oriental",
      duration: "12 mois"
    },
    ar: {
      title: "تحليل نظم المعلومات الجغرافية الإقليمي",
      category: "رسم الخرائط الرقمية",
      metrics: "قاعدة بيانات 50 جيجابايت | 15 طبقة موضوعية",
      description: "إنشاء نظام معلومات جغرافي لإدارة الموارد الترابية. دمج بيانات LiDAR وصور الأقمار الصناعية لتحليل غطاء الأرض.",
      location: "الجهة الشرقية",
      duration: "12 شهراً"
    }
  },
  {
    id: "projet-residentiel",
    client: "Promoteur Privé",
    image: cadastralSurveyImg,
    date: "2023",
    technologies: ["Trimble R12", "Business Center", "TopoCal"],
    fr: {
      title: "Projet Résidentiel",
      category: "Cadastre",
      metrics: "50+ Titres créés | Conformité 100%",
      description: "Mise en concordance et éclatement de titres pour un complexe résidentiel de luxe. Accompagnement juridique et technique complet.",
      location: "Nador, Maroc",
      duration: "4 mois"
    },
    ar: {
      title: "مشروع سكني",
      category: "المسح العقاري",
      metrics: "إنشاء 50+ رسم عقاري | مطابقة 100%",
      description: "مطابقة وتجزئة الرسوم العقارية لمجمع سكني فاخر. مواكبة قانونية وتقنية كاملة.",
      location: "الناظور، المغرب",
      duration: "4 أشهر"
    }
  },
  {
    id: "leve-facade",
    client: "Cabinet d'Architecture X",
    image: facadeLaserScanMaleImg,
    date: "2024",
    modelUrl: "/facade-survey-model.glb", // Upload your .glb file to the public folder and rename it to this to activate 3D view
    technologies: ["Faro Focus S350", "RealityCapture", "Revit"],
    fr: {
      title: "Levé de Façade",
      category: "Architecture",
      metrics: "Modèle 3D texturé | Précision 2mm",
      description: "Levé photogrammétrique et laser scanning d'une façade historique pour restauration.",
      location: "Casablanca, Maroc",
      duration: "2 semaines"
    },
    ar: {
      title: "رفع الواجهة",
      category: "الهندسة المعمارية",
      metrics: "نموذج ثلاثي الأبعاد | دقة 2 ملم",
      description: "رفع فوتوغرامتري ومسح ليزري لواجهة تاريخية من أجل الترميم.",
      location: "الدار البيضاء، المغرب",
      duration: "أسبوعان"
    }
  },
  {
    id: "plan-masse",
    client: "Bureau d'Études Y",
    image: masterPlanSurveyMaleImg,
    date: "2024",
    technologies: ["Station Totale Nikon", "Covadis", "AutoCAD"],
    fr: {
      title: "Plan de Masse",
      category: "Ingénierie",
      metrics: "Plan certifié | Délai 48h",
      description: "Établissement de plans de masse pour autorisation de construire d'une unité industrielle.",
      location: "Tanger, Maroc",
      duration: "2 jours"
    },
    ar: {
      title: "مخطط الكتلة",
      category: "الهندسة",
      metrics: "مخطط مصادق عليه | مدة 48 ساعة",
      description: "إعداد مخططات الكتلة للحصول على رخصة بناء لوحدة صناعية.",
      location: "طنجة، المغرب",
      duration: "يومان"
    }
  },
  {
    id: "cartographie-casablanca",
    client: "Wilaya de Casablanca-Settat",
    image: gisDataAnalyticsImg,
    date: "2025",
    modelUrl: "/casablanca-map-model.glb",
    technologies: ["ArcGIS Enterprise", "PostgreSQL", "WebGIS Hub", "Mobile Mapping System"],
    performanceData: [
      { name: "Précision Planimétrique", value: 99 },
      { name: "Intégrité des Données", value: 98 },
      { name: "Vitesse de Rendu", value: 95 },
      { name: "Nombre de Couches", value: 100 }
    ],
    milestones: [
      { date: "Mai 2024", fr: "Acquisition mobile", ar: "بدء المسح الميداني المتحرك" },
      { date: "Août 2024", fr: "Indexation base de données", ar: "فهرسة قواعد البيانات" },
      { date: "Nov 2024", fr: "Développement Plateforme", ar: "تطوير المنصة الرقمية" },
      { date: "Fév 2025", fr: "Lancement Officiel", ar: "الإطلاق الرسمي" }
    ],
    fr: {
      title: "Cartographie Interactive de Casablanca",
      category: "Cartographie Numérique",
      metrics: "Couverture 1200+ km² | +50 Couches SIG",
      description: "Développement d'une plateforme WebGIS interactive pour la métropole de Casablanca. Intégration de plans cadastraux multi-sources, réseaux d'infrastructure majeurs, imagerie satellite haute résolution et outils d'aide à la décision pour un aménagement urbain résilient et connecté.",
      location: "Casablanca, Maroc",
      duration: "14 mois",
      testimonial: {
        author: "Amine Benjelloun",
        role: "Directeur de l'Urbanisme",
        quote: "La plateforme cartographique développée a révolutionné notre gestion territoriale quotidienne en centralisant toutes nos couches de données géospatiales."
      }
    },
    ar: {
      title: "رسم الخرائط التفاعلية للدار البيضاء",
      category: "رسم الخرائط الرقمية",
      metrics: "تغطية 1200+ كم² | أكثر من 50 طبقة جغرافية",
      description: "تطوير منصة ويب للمعلومات الجغرافية (WebGIS) التفاعلية لمدينة الدار البيضاء الكبرى. دمج المخططات العقارية والمسح ليزري وشبكات البنية التحتية وصور الأقمار الصناعية عالية الدقة لتوفير أدوات متكاملة لاتخاذ القرار وتحسين التخطيط الحضري للمدينة.",
      location: "الدار البيضاء، المغرب",
      duration: "14 شهراً",
      testimonial: {
        author: "أمين بنجلون",
        role: "مدير التعمير والتخطيط",
        quote: "أحدثت منصة الخرائط التفاعلية ثورة حقيقية في تدبيرنا الترابي اليومي من خلال توحيد كافة الطبقات البيانية الجيومكانية في واجهة واحدة متكاملة."
      }
    }
  },
  {
    id: "seisme-marrakech",
    client: "ECARTTOP - Nabil Boutrik",
    image: gisAnalysisImg,
    date: "2023",
    technologies: ["Google My Maps", "SIG", "Analyse Satellite", "Données Terrain"],
    performanceData: [
      { name: "Zones d'Impact", value: 100 },
      { name: "Points d'Intérêt", value: 95 },
      { name: "Précision Visuelle", value: 90 },
      { name: "Fiabilité SIG", value: 98 }
    ],
    milestones: [
      { date: "Sept 2023", fr: "Déclenchement", ar: "الهزة الأرضية" },
      { date: "Oct 2023", fr: "Analyse d'Impact", ar: "تحليل الآثار والصدوع" },
      { date: "Nov 2023", fr: "Publication Carte", ar: "نشر الخريطة المفتوحة" },
      { date: "Continu", fr: "Reconstruction", ar: "إعادة الإعمار والمساندة" }
    ],
    fr: {
      title: "Séisme Marrakech - Impact & Cartographie",
      category: "SIG & Projet Solidaire",
      metrics: "100% Solidaire | Cartographie d'impact",
      description: "Le projet Séisme Marrakech est une carte interactive documentant et visualisant l’impact du séisme qui a touché la région de Marrakech. Réalisé par ECARTTOP – Nabil Boutrik, il permet de localiser les zones les plus affectées, d’identifier les points d'intérêt et de fournir un support pédagogique pour accompagner la reconstruction.",
      location: "Marrakech & Al Haouz",
      duration: "Projet Continu"
    },
    ar: {
      title: "زلزال مراكش - خريطة الأثر",
      category: "نظم جغرافية ومبادرة تضامنية",
      metrics: "100% تضامني | رسم خرائط الأثر",
      description: "مشروع زلزال مراكش هو خريطة تفاعلية لتوثيق وتصوير آثار الزلزال الذي ضرب منطقة مراكش. من إعداد إيكارطوب – المهندس نبيل بوتريق، يتيح تحديد المناطق الأكثر تضرراً، والمواقع الاستراتيجية ومراكز الدعم لمواكبة مبادرات إعادة الإعمار.",
      location: "مراكش والحوز",
      duration: "مشروع مستمر"
    }
  }
];
