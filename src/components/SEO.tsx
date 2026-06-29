import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export interface SEOProps {
  page: 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'careers' | 'contact' | 'projectDetail';
  customTitle?: string;
  customDescription?: string;
  projectTitle?: string;
}

const seoTranslations = {
  fr: {
    home: {
      title: "ECARTTOP | Cabinet d'Ingénierie, SIG & Topographie à Nador",
      desc: "Cabinet de topographie agréé ANCFCC à Nador. Spécialiste en levés de haute précision, droit foncier, cadastre, modélisation 3D et SIG à Nador et région de l'Oriental.",
      keywords: "topographie, ingénieur topographe, Nador, Maroc, SIG, ANCFCC, cadastre, levé topographique, drone, LiDAR"
    },
    about: {
      title: "À Propos de Nous | ECARTTOP Nador",
      desc: "Découvrez le cabinet ECARTTOP dirigé par Nabil Boutrik, ingénieur topographe agréé. Équipe d'experts offrant rigueur technique et juridique pour vos besoins topographiques.",
      keywords: "Nabil Boutrik, cabinet topographe Nador, ingénieur géomètre, ordre national topographes, cadastre Maroc"
    },
    services: {
      title: "Nos Services en Topographie, Foncier, SIG & LiDAR | ECARTTOP",
      desc: "Des solutions de pointe aux particuliers et administrations : levés topographiques certifiés, dossiers ANCFCC pour le droit foncier, modélisation numérique 3D et SIG.",
      keywords: "levé topographique, bornage, division parcelle, droit foncier, ANCFCC, LiDAR par drone, SIG Maroc"
    },
    portfolio: {
      title: "Nos Réalisations & Projets Sur le Terrain | ECARTTOP",
      desc: "Découvrez le portfolio des projets d'ECARTTOP à Nador et dans l'Oriental : infrastructures industrielles (Nador West Med), lotissements résidentiels (Al Omrane) et SIG.",
      keywords: "projets topographiques, Nador West Med, Al Omrane Oujda, cartographie Maroc, SIG régional"
    },
    blog: {
      title: "Blog et Actualités de la Géomatique | ECARTTOP",
      desc: "Suivez les actualités professionnelles de la topographie à Nador: nouvelles technologies, LiDAR, développement territorial, droit foncier et législation au Maroc.",
      keywords: "blog topographie, actualités géomatique, drones Maroc, cadastre Nador, SIG actualités"
    },
    careers: {
      title: "Rejoignez Notre Cabinet Topographique | Carrières ECARTTOP",
      desc: "Donnez de l'élan à vos ambitions dans l'ingénierie et la topographie. Postulez pour des emplois de techniciens topographes ou de stages d'ingénieurs à Nador.",
      keywords: "recrutement topographe, offre emploi Nador, stage topographie, technicien topographe Maroc, ingénieur géomètre recrutement"
    },
    contact: {
      title: "Contactez un Ingénieur Topographe à Nador | ECARTTOP",
      desc: "Besoin d'une expertise technique ou juridique pour votre foncier ? Demandez un devis ou contactez le cabinet ECARTTOP à Nador. Service rapide et certifié.",
      keywords: "cabinet topographique Nador téléphone, adresse ECARTTOP, devis topographie, rendez-vous ingénieur topographe"
    },
    projectDetail: {
      title: "Projet Spécialisé | ECARTTOP",
      desc: "Détails d'exécution technique par le cabinet ECARTTOP: précision certifiée et ingénierie de pointe.",
      keywords: "ingénierie de précision, rapport technique, géomatique appliquée"
    }
  },
  ar: {
    home: {
      title: "إيكارت توب | مكتب هندسة، نظم المعلومات الجغرافية والطبوغرافيا بالناظور",
      desc: "مكتب طبوغرافيا معتمد من الوكالة الوطنية للمحافظة العقارية بالناظور. متخصص في المسح العقاري، التحفيظ، كارتوغرافيا الطائرات بدون طيار، ونظم المعلومات الجغرافية.",
      keywords: "الطبوغرافيا, مهندس طبوغرافي, الناظور, المغرب, نظم المعلومات الجغرافية, المحافظة العقارية, التحفيظ, مسح عقاري, درون, ليدار"
    },
    about: {
      title: "من نحن | إيكارت توب الناظور",
      desc: "تعرف على مكتب إيكارت توب تحت إدارة نبيل بوتريك، مهندس مساح طبوغرافي معتمد. فريقنا يجمع بين الدقة التقنية والخبرة القانونية لحماية وتثمين عقاراتكم.",
      keywords: "نبيل بوتريك, مكتب طبوغرافيا الناظور, الهيئة الوطنية للمهندسين المساحين الطبوغرافيين, المحافظة العقارية المغرب"
    },
    services: {
      title: "خدماتنا وتخصصاتنا الطبوغرافية، العقارية ونظم SIG | إيكارت توب",
      desc: "خدمات متكاملة للمواطنين والمقاولات: مسوحات معتمدة، ملفات التحفيظ العقاري، تقسيم وتجديد بقع الأرض، خرائط ثلاثية الأبعاد ونظم المعلومات الجغرافية.",
      keywords: "مسح طبوغرافي, تحديد الحدود, تقسيم بقعة, القانون العقاري, المحافظة العقارية, كارتوغرافيا درون"
    },
    portfolio: {
      title: "مشاريعنا وإنجازاتنا الميدانية بالجهة الشرقية | إيكارت توب",
      desc: "تصفح أبرز مساهمات إيكارت توب الميدانية بالناظور والشرق: مشاريع البنية التحتية الكبرى (ميناء الناظور غرب المتوسط)، تجزئات سكنية (العمران) ومسوحات جهوية.",
      keywords: "مشاريع طبوغرافية, الناظور غرب المتوسط, تجزئة العمران, خرائط رقمية المغرب"
    },
    blog: {
      title: "مدونة علوم الجيوماتكس والطبوغرافيا | إيكارت توب",
      desc: "تابع آخر مقالات وأخبار الهندسة الطبوغرافية والتطورات العقارية في المغرب: أنظمة المسح الجيومكاني، تقنيات القياس الحديثة والتحفيظ العقاري.",
      keywords: "مدونة الطبوغرافيا, أخبار الجيوماتكس, تقنيات الدرون, قوانين التحفيظ الناظور"
    },
    careers: {
      title: "فرص العمل والتوظيف بمكتب إيكارت توب | الناظور",
      desc: "انضم إلى فريق عملنا المتميز بالناظور. نوفر فرص عمل وتدريب للتقنيين المتميزين والمهندسين الطبوغرافيين الباحثين عن التميز المهني.",
      keywords: "توظيف طبوغرافي, وظائف بالناظور, تدريب طوبوغرافيا المغرب, مطلوب تقني طوبوغرافي"
    },
    contact: {
      title: "اتصل بمهندس طبوغرافي معتمد بالناظور | إيكارت توب",
      desc: "هل تبحث عن استشارة قانونية أو تقنية لعقارك؟ تواصل مع مكتب إيكارت توب بالناظور للحصول على استشارة أو طلب تسعيرة لمشروعك.",
      keywords: "هاتف مكتب طبوغرافيا الناظور, عنوان إيكارت توب, وثائق التحفيظ, استشارة مهندس مساح"
    },
    projectDetail: {
      title: "تفاصيل المشروع | إيكارت توب",
      desc: "تفاصيل الإنجاز الفني والتقني لمشاريع مكتب إيكارت توب المعتمدة: دقة متناهية وحلول مبتكرة.",
      keywords: "إنجاز تقني, مشروع طبوغرافي, هندسة المساحة الدقيقة"
    }
  }
};

export const SEO: React.FC<SEOProps> = ({ page, customTitle, customDescription, projectTitle }) => {
  const { lang } = useLanguage();
  
  const currentSeo = seoTranslations[lang][page] || seoTranslations.fr[page];

  let title = customTitle || currentSeo.title;
  let description = customDescription || currentSeo.desc;
  const keywords = currentSeo.keywords;

  if (page === 'projectDetail' && projectTitle) {
    if (lang === 'fr') {
      title = `${projectTitle} | Projet | ECARTTOP`;
      description = `Découvrez l'analyse et la réalisation technique du projet ${projectTitle} par le cabinet d'ingénierie topographique ECARTTOP à Nador.`;
    } else {
      title = `${projectTitle} | مشروع | إيكارت توب`;
      description = `اكتشف التحليلات الفنية والتنفيذ الهندسي لمشروع ${projectTitle} من طرف مكتب الهندسة الطبوغرافية إيكارت توب بالناظور.`;
    }
  }

  // Canonical details and alternate language links
  const siteUrl = "https://ecarttop.com"; // Professional assumed production URL
  const currentPath = page === 'home' ? '' : `/${page}`;
  const canonicalUrl = `${siteUrl}${currentPath}`;
  const alternateLang = lang === 'fr' ? 'ar' : 'fr';
  const alternateUrl = `${siteUrl}/${alternateLang}${currentPath}`;

  return (
    <Helmet>
      {/* HTML Language & Direction Attributes are updated by LanguageContext */}
      
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Search Engine Robots configuration */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Structured Canonical & Hreflang Tags */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang={lang} href={canonicalUrl} />
      <link rel="alternate" hrefLang={alternateLang} href={alternateUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="ECARTTOP" />
      <meta property="og:locale" content={lang === 'fr' ? 'fr_FR' : 'ar_AR'} />
      <meta property="og:image" content="https://i.ibb.co/RTs6pdLQ/IMG-20260412-005836.jpg" /> {/* High resolution banner background */}

      {/* Twitter Cards */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="https://i.ibb.co/RTs6pdLQ/IMG-20260412-005836.jpg" />
    </Helmet>
  );
};
