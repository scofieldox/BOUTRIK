import droneUavMapping from "../assets/images/drone_uav_mapping_1782099031410.jpg";
import gisDataAnalytics from "../assets/images/gis_data_analytics_1782099045595.jpg";
import gnssSurveyFieldImg from "../assets/images/gnss_survey_field_1782352782520.jpg";

export interface ContentBlock {
  type: "paragraph" | "heading" | "quote" | "table" | "bullet-list";
  text?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
}

export interface BlogPost {
  id: number;
  category: { fr: string; ar: string };
  title: { fr: string; ar: string };
  excerpt: { fr: string; ar: string };
  author: { fr: string; ar: string };
  date: { fr: string; ar: string };
  image: string;
  readTime: { fr: string; ar: string };
  tags: { fr: string[]; ar: string[] };
  content: {
    fr: ContentBlock[];
    ar: ContentBlock[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: { fr: "UAV Drone Tech", ar: "تقنيات الدرون الجوية" },
    title: {
      fr: "L'Avenir de la Cartographie par Drone et LiDAR au Maroc",
      ar: "مستقبل الخرائط الرقمية بالدرون والليدار في المغرب"
    },
    excerpt: {
      fr: "Comment l'intégration de capteurs LiDAR légers révolutionne le suivi des infrastructures côtières et des chantiers d'énergie de grande envergure dans l'Oriental.",
      ar: "كيف يُحدث دمج مستشعرات الليدار المحمولة جوّاً ثورةً في مراقبة البنى التحتية الساحلية ومشاريع الطاقة الكبرى بالجهة الشرقية."
    },
    author: { fr: "Nabil Boutrik", ar: "نبيل بوتريق" },
    date: { fr: "10 Avril 2026", ar: "10 أبريل 2026" },
    image: droneUavMapping,
    readTime: { fr: "5 min de lecture", ar: "5 دقائق قراءة" },
    tags: {
      fr: ["Drone", "LiDAR", "Topographie", "Oriental", "BIM"],
      ar: ["درون", "ليدار", "طبوغرافيا", "الشرق", "نمذجة"]
    },
    content: {
      fr: [
        {
          type: "heading",
          text: "Une Révolution Précise au Millimètre"
        },
        {
          type: "paragraph",
          text: "La région de l'Oriental, portée par des projets d'envergure tels que le port de Nador West Med et l'aménagement de la lagune de Marchica, vit une transformation technologique sans précédent. L'utilisation classique des récepteurs GPS de terrain est désormais complétée, voire remplacée, par des campagnes de survol drone équipés de capteurs LiDAR (Light Detection and Ranging) de dernière génération."
        },
        {
          type: "quote",
          text: "La combinaison de la photogrammétrie haute résolution et du LiDAR actif permet de traverser la végétation dense et de cartographier le relief avec une précision absolue, là où d'autres technologies échouent."
        },
        {
          type: "heading",
          text: "Performances et livrables de haute précision"
        },
        {
          type: "paragraph",
          text: "Pour assurer la fiabilité des études hydrologiques et de terrassement, nos équipes s'appuient sur des données géoréférencées par des stations de contrôle au sol (GCP) connectées au réseau national de stations permanentes. Les résultats permettent de générer des modèles numériques de terrain (MNT) exploitables directement sous AutoCAD, Revit, et ArcGIS."
        },
        {
          type: "table",
          headers: ["Paramètre", "Technologie Drone", "Topographie Classique"],
          rows: [
            ["Précision planimétrique", "1.5 cm", "1.0 cm"],
            ["Densité moyenne de points", "500 pts/m²", "1 pt / 10m²"],
            ["Vitesse de couverture", "150 ha / jour", "5 ha / jour"],
            ["Accès zones dangereuses", "À distance (Sécurisé)", "Exposition directe"]
          ]
        },
        {
          type: "paragraph",
          text: "Le gain de productivité global est estimé à plus de 80%, tout en augmentant drastiquement la sécurité des ingénieurs et techniciens géomètres-topographes sur les terrains à risques ou escarpés comme les falaises de Marchica ou les carrières de Selouane."
        }
      ],
      ar: [
        {
          type: "heading",
          text: "ثورة تكنولوجية بدقة مليمترية"
        },
        {
          type: "paragraph",
          text: "تشهد الجهة الشرقية، مدفوعة بمشاريع كبرى مثل ميناء الناظور غرب المتوسط وتهيئة بحيرة مارتشيكا، تحولاً رقمياً هندسياً غير مسبوق. إن الاستخدام الكلاسيكي لأجهزة نظام تحديد المواقع العالمي (GPS) أصبح اليوم مدعوماً، بل ومستبدلاً في كثير من الأحيان، بحملات المسح الجوي بواسطة الطائرات بدون طيار (الدرون) المجهزة بمستشعرات الليدار النشطة من الجيل الأحدث."
        },
        {
          type: "quote",
          text: "إن دمج القياسات التصويرية الجوية عالية الدقة مع نظام الليدار الفعال يسمح باختراق الغطاء النباتي الكثيف ورسم التضاريس بدقة مطلقة، حيث تفشل التكنولوجيات الأخرى."
        },
        {
          type: "heading",
          text: "الأداء والمخرجات عالية الدقة"
        },
        {
          type: "paragraph",
          text: "لضمان موثوقية الدراسات الهيدرولوجية وأعمال الحفر والردم، تعتمد فرقنا على البيانات المرجعية الجغرافية المدعومة بنقاط التحكم الأرضية (GCPs) المتصلة بالشبكة الوطنية للمحطات الدائمة. تتيح النتائج توليد نماذج رقمية للتضاريس (MNT) جاهزة للاستخدام المباشر في برامج AutoCAD و Revit و ArcGIS."
        },
        {
          type: "table",
          headers: ["العامل", "تقنية الدرون", "الرفع الطبوغرافي الكلاسيكي"],
          rows: [
            ["الدقة المسطحة", "1.5 سم", "1.0 سم"],
            ["كثافة النقاط", "500 نقطة/م²", "نقطة واحدة / 10م²"],
            ["سرعة التغطية", "150 هكتار / يوم", "5 هكتارات / يوم"],
            ["الوصول للمناطق الوعرة", "عن بعد بأمان", "مخاطر ميدانية مباشرة"]
          ]
        },
        {
          type: "paragraph",
          text: "يُقدر الارتفاع في الإنتاجية بأكثر من 80%، مع تحسين سلامة المهندسين والتقنيين الطبوغرافيين في التضاريس الوعرة كالمقالع بمناطق سلوان والمنحدرات الساحلية المطلة على البحر."
        }
      ]
    }
  },
  {
    id: 2,
    category: { fr: "Topography", ar: "الهندسة الطبوغرافية" },
    title: {
      fr: "Sécurisation Foncier : Rôle Clé de la Topographie dans l'Immobilier",
      ar: "تأمين العقار: دور الهندسة الطبوغرافية في المعاملات العقارية"
    },
    excerpt: {
      fr: "Comprendre l'importance cruciale des levés de délimitation, des expertises judiciaires et du rétablissement de bornes pour éviter les litiges à Nador.",
      ar: "فهم الأهمية البالغة للمسوحات الطبوغرافية الرسمية، وتحديد الحدود العقارية، والخبرات القضائية لتفادي النزاعات العقارية بإقليم الناظور."
    },
    author: { fr: "Nabil Boutrik", ar: "نبيل بوتريق" },
    date: { fr: "28 Mars 2026", ar: "28 مارس 2026" },
    image: gnssSurveyFieldImg,
    readTime: { fr: "4 min de lecture", ar: "4 دقائق قراءة" },
    tags: {
      fr: ["Cadastre", "Foncier", "ONIGT", "Nador", "Expertise"],
      ar: ["محافظة عقارية", "الملكية", "الهيئة الوطنية", "الناظور", "خبرة"]
    },
    content: {
      fr: [
        {
          type: "heading",
          text: "Sécuriser le Foncier : Un Impératif Économique"
        },
        {
          type: "paragraph",
          text: "L'investissement immobilier, touristique et industriel dans la province de Nador connaît une accélération majeure avec les nouvelles zones d'activité. Cependant, la complexité des statuts juridiques des terres (Melk, collectif, domanial) impose une rigueur topographique absolue. Un plan de délimitation ou d'implantation n'est pas qu'un dessin, c'est l'acte fondateur sécurisant votre capital."
        },
        {
          type: "quote",
          text: "Plus de 40% des litiges immobiliers devant les tribunaux de l'Oriental proviennent d'erreurs d'implantation d'origine ou de chevauchements de titres qui auraient pu être évités par un levé topographique contradictoire."
        },
        {
          type: "heading",
          text: "Le Rôle de l'Ingénieur Géomètre-Topographe Agréé"
        },
        {
          type: "paragraph",
          text: "Au Maroc, la profession est strictement encadrée par la loi 30-93. Faire appel à un ingénieur topographe agréé par l'Ordre National (ONIGT) comme ECART TOP garantit la recevabilité de tous vos dossiers administratifs de conservation foncière."
        },
        {
          type: "bullet-list",
          items: [
            "Rétablissement de bornes disparues ou déplacées avec précision millimétrique",
            "Mise en copropriété (Loi 18-00) pour grands ensembles résidentiels",
            "Mise en concordance entre la situation physique réelle et le plan cadastral",
            "Assistance technique et contre-expertises pour les tribunaux"
          ]
        },
        {
          type: "paragraph",
          text: "Grâce à notre équipement de pointe (stations totales robotisées Leica FlexLine et récepteurs GNSS multi-fréquences), nous matérialisons les limites géométriques de vos parcelles avec une assurance légale totale."
        }
      ],
      ar: [
        {
          type: "heading",
          text: "تأمين العقار: ضرورة اقتصادية ملحة"
        },
        {
          type: "paragraph",
          text: "تشهد الاستثمارات العقارية والسياحية والصناعية بإقليم الناظور نمواً متسارعاً مع تهيئة مناطق الأنشطة الاقتصادية الجديدة. ومع ذلك، فإن الطبيعة المعقدة للأنظمة القانونية للأراضي (ملك، سلالية، جموع، أملاك مخزنية) تفرض صرامة طبوغرافية مطلقة. إن تصميم تحديد الحدود أو التوقيع الهندسي ليس مجرد رسم، بل هو الحجة الأساسية لحماية رأس مالك."
        },
        {
          type: "quote",
          text: "أكثر من 40% من النزاعات العقارية المعروضة على محاكم الجهة الشرقية تعود إلى أخطاء في التوقيع الميداني أو تداخل الرسوم العقارية، والتي كان من السهل تفاديها بمسح طبوغرافي دقيق من طرف مختص معتمد."
        },
        {
          type: "heading",
          text: "دور المهندس المساح الطبوغرافي المعتمد"
        },
        {
          type: "paragraph",
          text: "في المغرب، تخضع مهنة المهندس الجغرافي الطبوغرافي لتنظيم صارم بموجب القانون 30-93. إن الاستعانة بمهندس معتمد ومقيد في جدول الهيئة الوطنية للمهندسين المساحين الطبوغرافيين (ONIGT) مثل إيكارطوب تضمن قبول ملفاتكم وصلاحيتها القانونية التامة."
        },
        {
          type: "bullet-list",
          items: [
            "إعادة تعيين وبناء الأنصاب والحدود المفقودة بدقة مليمترية",
            "ملفات الملكية المشتركة (قانون 18-00) للمجمعات السكنية الكبرى",
            "إجراءات المطابقة والتحيين العقاري لتصحيح أخطاء التصاميم القديمة",
            "إعداد تقارير الخبرة المضادة المعتمدة لدى المحاكم والإدارات"
          ]
        },
        {
          type: "paragraph",
          text: "باستخدام أحدث أجهزة الرصد المتكاملة (محطات Leica الروبوتية ومستقبلات الأقمار الاصطناعية متعددة الترددات)، نجسد الحدود الهندسية لعقاراتكم بأعلى درجات الموثوقية والأمان القانوني."
        }
      ]
    }
  },
  {
    id: 3,
    category: { fr: "GIS Mapping", ar: "نظم المعلومات الجغرافية" },
    title: {
      fr: "SIG & Jumeaux Numériques : Vers la Ville Intelligente de Nador",
      ar: "نظم المعلومات الجغرافية: نحو توائم رقمية لمدينة الناظور"
    },
    excerpt: {
      fr: "Comment l'intégration des données de numérisation 3D et des bases de données géospatiales aide les communes à optimiser les réseaux de fluides et la voirie.",
      ar: "كيف يساعد دمج بيانات المسح ثلاثي الأبعاد وقواعد البيانات الجغرافية الجماعات المحلية بالمنطقة على تحسين إدارة الشبكات والتعمير."
    },
    author: { fr: "Nabil Boutrik", ar: "نبيل بوتريق" },
    date: { fr: "15 Mars 2026", ar: "15 مارس 2026" },
    image: gisDataAnalytics,
    readTime: { fr: "6 min de lecture", ar: "6 دقائق قراءة" },
    tags: {
      fr: ["SIG", "Smart City", "BIM", "Urbanisme", "3D Mapping"],
      ar: ["نظم جغرافية", "مدن ذكية", "نمذجة البناء", "التعمير", "مسح ثلاثي"]
    },
    content: {
      fr: [
        {
          type: "heading",
          text: "L'Intelligence Spatiale au Service de l'Urbanisme"
        },
        {
          type: "paragraph",
          text: "La croissance rapide du Grand Nador exige des méthodes de gouvernance modernes. Les méthodes traditionnelles basées sur des plans papier figés ou des dessins vectoriels déconnectés ne suffisent plus. Un Système d'Information Géologique et Géospatial (SIG) centralise toutes les données clés d'une commune : réseaux d'assainissement, voirie, eau potable, éclairage public et titres cadastraux."
        },
        {
          type: "quote",
          text: "Le SIG n'est pas une simple carte animée, c'est un cerveau numérique urbain qui permet de simuler la gestion des inondations, de planifier les extensions et de diviser par deux le temps d'intervention technique."
        },
        {
          type: "heading",
          text: "L'Ère des Jumeaux Numériques 3D et du CityGML"
        },
        {
          type: "paragraph",
          text: "Chez ECART TOP, nous concevons des projets innovants de Jumeaux Numériques en combinant des levés par balayage laser mobile (Mobile Mapping System) avec des maquettes BIM. Cela permet de créer des répliques 3D photoréalistes et structurelles des quartiers."
        },
        {
          type: "paragraph",
          text: "Les retombées technologiques sont gigantesques : calcul précis de l'ensoleillement urbain pour l'énergie solaire, détection automatique des déformations de chaussée, gestion prédictive de l'éclairage public et inventaire automatique des panneaux de signalisation."
        }
      ],
      ar: [
        {
          type: "heading",
          text: "الذكاء الجغرافي المكاني في خدمة التعمير والتخطيط"
        },
        {
          type: "paragraph",
          text: "يتطلب النمو الحضري السريع للناظور الكبرى أساليب حكامة حديثة ورقمية. لم تعد المخططات الورقية الجامدة أو الملفات المتجهة المعزولة كافية لمواكبة هذا التطور. يقوم نظام المعلومات الجغرافي (SIG) بمركزة كافة المعطيات الحيوية للجماعة الترابية: شبكات التطهير السائل، الطرق، قنوات الماء الصالح للشرب، الإنارة العمومية، والملك العقاري."
        },
        {
          type: "quote",
          text: "نظام المعلومات الجغرافي ليس مجرد خريطة تفاعلية، بل هو العقل الرقمي للمدينة الذي يتيح محاكاة مخاطر الفيضانات، وتخطيط البنية التحتية، وتقليص أوقات التدخل الفني بنسبة 50%."
        },
        {
          type: "heading",
          text: "عصر التوائم الرقمية ثلاثية الأبعاد (3D) ونمذجة المدن"
        },
        {
          type: "paragraph",
          text: "في إيكارطوب، نقوم بتطوير مشاريع ريادية للتوائم الرقمية من خلال دمج تقنيات المسح الليزري المتحرك (Mobile Mapping) مع نمذجة معلومات البناء (BIM). يتيح هذا النهج إنشاء نسخ افتراضية ثلاثية الأبعاد مطابقة تماماً للمدن والأحياء السكنية."
        },
        {
          type: "paragraph",
          text: "العائد التكنولوجي والعملي لهذه النظم هائل جداً: حساب زوايا الإشعاع الشمسي لأسطح المباني لدعم الطاقة المتجددة، التحديد الآلي لعيوب الطرق الإسفلتية، الإدارة الاستباقية لشبكات الإنارة، والإحصاء الذكي لعلامات التشوير المروري."
        }
      ]
    }
  }
];
