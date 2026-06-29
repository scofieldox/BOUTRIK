import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Map as MapIcon, 
  MapPin, 
  Layers, 
  HeartHandshake, 
  Info, 
  Sparkles, 
  Calendar,
  Share2,
  ExternalLink,
  Locate,
  Navigation,
  Globe,
  AlertTriangle,
  Activity,
  Users,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Flame,
  Shield,
  Truck,
  Eye,
  EyeOff,
  Compass,
  Crosshair,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { ScrollReveal } from "../components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const timelineEvents = [
  {
    id: "earthquake",
    date: "8 Sept 2023",
    time: "23:11",
    category: "crisis",
    icon: AlertTriangle,
    badgeFr: "Choc Initial",
    badgeAr: "الهزة الأولى",
    titleFr: "Le Séisme d'Al Haouz (Magnitude 6.8)",
    titleAr: "زلزال الحوز المدمر (قوة 6.8)",
    descFr: "Un séisme d'une violence historique secoue la province d'Al Haouz. Marrakech et l'ensemble de l'Atlas marocain ressentent des secousses destructrices.",
    descAr: "زلزال تاريخي عنيف يضرب إقليم الحوز والمناطق المحيطة به، حيث اهتزت مدينة مراكش وجبال الأطلس الكبير مسببة خسائر فادحة.",
    stats: {
      labelFr: "Épicentre",
      labelAr: "البؤرة",
      valFr: "Ighil (30km profondeur)",
      valAr: "إيغيل (عمق 30 كم)"
    },
    techDetailFr: "Analyse des ondes sismiques et détection immédiate par les réseaux de surveillance géophysiques mondiaux. Rupture géologique majeure le long du système de failles de l'Atlas.",
    techDetailAr: "تحليل الموجات الزلزالية ورصد فوري من الشبكات الجيوفيزيائية العالمية. حدوث تصدع جيولوجي رئيسي على طول نظام صدوع جبال الأطلس."
  },
  {
    id: "emergency",
    date: "9 - 12 Sept 2023",
    time: "72h d'or",
    category: "rescue",
    icon: Activity,
    badgeFr: "Secours d'Urgence",
    badgeAr: "الإنقاذ العاجل",
    titleFr: "Mobilisation et Opérations de Sauvetage",
    titleAr: "التعبئة الشاملة وعمليات الإنقاذ",
    descFr: "Déploiement immédiat des Forces Armées Royales, de la Protection Civile et des équipes médicales. Ouverture critique des pistes montagneuses bloquées par des éboulements.",
    descAr: "انتشار فوري لعناصر القوات المسلحة الملكية، والوقاية المدنية، والفرق الطبية. بذل جهود جبارة لفتح الطرق والمسالك الجبلية الوعرة المتضررة.",
    stats: {
      labelFr: "Hélicoptères",
      labelAr: "المروحيات",
      valFr: "Rotations non-stop",
      valAr: "طلعات مستمرة دون توقف"
    },
    techDetailFr: "Logistique aérienne par hélicoptères militaires pour atteindre les douars isolés à plus de 2000m d'altitude. Planification cartographique d'urgence pour identifier les voies praticables.",
    techDetailAr: "دعم لوجستي جوي باستخدام مروحيات عسكرية للوصول إلى الدواوير المعزولة على ارتفاع يفوق 2000 متر. رسم خرائط طوارئ للمسالك المفتوحة."
  },
  {
    id: "solidarity",
    date: "Mi-Sept 2023",
    time: "National",
    category: "rescue",
    icon: Users,
    badgeFr: "Solidarité",
    badgeAr: "تضامن وطني",
    titleFr: "Élan National de Solidarité Citoyenne",
    titleAr: "هبة تضامنية شعبية كبرى",
    descFr: "Des milliers de caravanes de solidarité chargées de vivres, tentes et couvertures convergent de tout le Maroc vers les provinces de l'Atlas.",
    descAr: "آلاف القوافل المحملة بالمساعدات الغذائية والخيام والأغطية تتدفق من جميع المدن والمناطق المغربية نحو القرى المتضررة في مشهد تضامني ملهم.",
    stats: {
      labelFr: "Soutien",
      labelAr: "الدعم",
      valFr: "100% Citoyen",
      valAr: "100% شعبي ومواطن"
    },
    techDetailFr: "Coordination entre les associations locales et les autorités pour la distribution équitable des kits d'urgence. Cartographie des camps d'hébergement provisoires.",
    techDetailAr: "تنسيق وثيق بين الجمعيات المحلية والسلطات لضمان التوزيع العادل للمساعدات. رسم خرائط أولية لمخيمات الإيواء المؤقتة."
  },
  {
    id: "mapping",
    date: "Fin Sept 2023",
    time: "SIG",
    category: "tech",
    icon: Layers,
    badgeFr: "Analyse Technique",
    badgeAr: "تحليل فني طوبوغرافي",
    titleFr: "Diagnostic Géospatial par ECARTTOP",
    titleAr: "التشخيص الجيومكاني لـ ECARTTOP",
    descFr: "Mobilisation bénévole d'ECARTTOP dirigée par Nabil Boutrik. Début de la collecte et de la structuration des couches de données géographiques (SIG) d'impact.",
    descAr: "مبادرة تضامنية وفنية من مكتب ECARTTOP برئاسة المهندس نبيل بوتريق. إطلاق عمليات تجميع وتدقيق الطبقات الجغرافية الأساسية لتحديد الأضرار.",
    stats: {
      labelFr: "Données",
      labelAr: "البيانات",
      valFr: "Couches SIG multi-sources",
      valAr: "طبقات جغرافية متعددة المصادر"
    },
    techDetailFr: "Traitement de données spatiales d'urgence. Intégration de coordonnées GPS, de cartes topographiques existantes et d'indices de déformation sismique.",
    techDetailAr: "معالجة متقدمة للمعلومات الجغرافية. دمج إحداثيات GPS، والخرائط الطوبوغرافية المتاحة، ومؤشرات التصدعات الأرضية والجيولوجية."
  },
  {
    id: "launch",
    date: "Octobre 2023",
    time: "Live Map",
    category: "tech",
    icon: MapIcon,
    badgeFr: "Publication",
    badgeAr: "نشر الخريطة",
    titleFr: "Lancement de la Carte Interactive d'Impact",
    titleAr: "إطلاق الخرائط التفاعلية للعموم",
    descFr: "Mise en ligne de la carte interactive d'impact d'ECARTTOP. Un outil public précieux pour localiser les zones affectées, les pistes sécurisées et les infrastructures logistiques.",
    descAr: "إتاحة الخريطة التفاعلية المتكاملة لـ ECARTTOP للعموم عبر الإنترنت. أداة رقمية حيوية لتحديد المناطق الأكثر تضرراً ومسالك الإغاثة ومراكز الدعم.",
    stats: {
      labelFr: "Statut",
      labelAr: "الحالة",
      valFr: "Accès libre / Open-data",
      valAr: "متاحة مجاناً للجميع"
    },
    techDetailFr: "Développement d'une interface cartographique interactive optimisée pour les équipes de terrain. Consolidation de l'outil pour faciliter l'orientation des volontaires.",
    techDetailAr: "تطوير واجهة خرائطية تفاعلية ومبسطة تلائم الهواتف والأجهزة الميدانية لمساعدة المتطوعين وفرق التدخل في الميدان."
  },
  {
    id: "reconstruction",
    date: "Novembre 2023 - Présent",
    time: "Futur",
    category: "rebuild",
    icon: Sparkles,
    badgeFr: "Reconstruction",
    badgeAr: "إعادة الإعمار",
    titleFr: "Expertise Topographique & Reconfiguration",
    titleAr: "الخبرة الطوبوغرافية وإعادة الإعمار",
    descFr: "Inspections par drone des falaises instables, modélisation topographique et accompagnement technique des ingénieurs pour la reconstruction solide et durable des douars.",
    descAr: "معاينة المنحدرات غير المستقرة بالدرون، وإجراء المسوحات الطوبوغرافية التفصيلية لمواكبة المهندسين في وضع تصاميم هندسية آمنة ومستدامة.",
    stats: {
      labelFr: "Objectif",
      labelAr: "الهدف",
      valFr: "Zéro risque structurel",
      valAr: "بناء آمن ومقاوم للزلازل"
    },
    techDetailFr: "Modélisation 3D par photogrammétrie drone (UAV), cartographie haute résolution des zones à risques d'éboulement et établissement de plans de recollement précis.",
    techDetailAr: "النمذجة ثلاثية الأبعاد باستخدام التصوير الجوي بالدرون (UAV)، وتحديد مناطق مخاطر الانهيارات الصخرية لدعم التخطيط العمراني الآمن."
  }
];

const mapPoints = [
  {
    id: "epicenter",
    category: "damage",
    lat: "31.111° N",
    lng: "8.411° W",
    elevation: "1350m",
    topOffset: "50%",
    leftOffset: "40%",
    statusFr: "Zone de Catastrophe",
    statusAr: "منطقة كارثة",
    statusColor: "red",
    fr: {
      name: "Épicentre d'Ighil",
      desc: "Point d'origine du séisme de magnitude 6.8. Éboulements de terrain massifs bloquant l'accès principal.",
      survey: "Relevé Drone par ECARTTOP - Modélisation des failles de rupture active.",
      accessibility: "Accès hélicoptère uniquement les premiers jours."
    },
    ar: {
      name: "بؤرة إيغيل",
      desc: "نقطة انطلاق الهزة الأرضية العنيفة بقوة 6.8 درجات. انهيارات صخرية ضخمة أدت لقطع الطرق الجبلية.",
      survey: "مسح جوي بالدرون ECARTTOP - نمذجة التصدعات النشطة.",
      accessibility: "وصول عبر المروحيات فقط في الأيام الأولى."
    }
  },
  {
    id: "talat-nyaaqoub",
    category: "damage",
    lat: "31.025° N",
    lng: "8.452° W",
    elevation: "1200m",
    topOffset: "62%",
    leftOffset: "35%",
    statusFr: "Destruction Lourde",
    statusAr: "دمار شديد",
    statusColor: "red",
    fr: {
      name: "Talat N'Yaaqoub",
      desc: "Centre urbain de montagne lourdement impacté. Effondrement de plus de 80% des habitations traditionnelles en pisé.",
      survey: "Relevé photogrammétrique complet réalisé pour guider le relogement.",
      accessibility: "Piste restaurée pour convois 4x4."
    },
    ar: {
      name: "ثلاث نيعقوب",
      desc: "مركز جبلي تضرر بشدة. انهيار أكثر من 80% من البنايات الطينية التقليدية.",
      survey: "مسح تصويري كامل لتوجيه مخططات إعادة الإيواء.",
      accessibility: "تم إصلاح المسلك لمرور شاحنات الدفع الرباعي."
    }
  },
  {
    id: "asni-shelter",
    category: "shelter",
    lat: "31.245° N",
    lng: "7.985° W",
    elevation: "1150m",
    topOffset: "45%",
    leftOffset: "55%",
    statusFr: "Actif - 500+ Familles",
    statusAr: "نشط - أكثر من 500 أسرة",
    statusColor: "sky",
    fr: {
      name: "Camp d'Hébergement Asni",
      desc: "Grand camp de tentes temporaires équipées avec assainissement, électricité et unité de soins médicaux d'urgence.",
      survey: "Plan d'implantation topographique réalisé par nos équipes pour l'assainissement.",
      accessibility: "Entièrement praticable pour tous véhicules."
    },
    ar: {
      name: "مخيم إيواء أسني",
      desc: "مخيم إيواء مؤقت مجهز بالكامل بوحدات صحية، كهرباء ومستشفى ميداني عسكري.",
      survey: "مخطط طوبوغرافي أعدته فرقنا لضمان انسيابية شبكة الصرف الصحي.",
      accessibility: "مفتوح بالكامل أمام جميع أنواع المركبات."
    }
  },
  {
    id: "amizmiz-shelter",
    category: "shelter",
    lat: "31.214° N",
    lng: "8.250° W",
    elevation: "1000m",
    topOffset: "38%",
    leftOffset: "48%",
    statusFr: "Actif - 800+ Familles",
    statusAr: "نشط - أكثر من 800 أسرة",
    statusColor: "sky",
    fr: {
      name: "Camp Amizmiz Centre",
      desc: "Zone de relogement provisoire avec tentes modulaires et distribution continue de repas.",
      survey: "Mesures GPS RTK pour l'optimisation des structures temporaires.",
      accessibility: "Accès routier fluide."
    },
    ar: {
      name: "مخيم مركز أمزميز",
      desc: "منطقة إيواء مؤقتة تضم خياماً نمطية ومراكز لتوزيع وجبات الطعام اليومية.",
      survey: "قياسات دقيقة عبر نظام GPS RTK لتهيئة المساحات المخصصة للخيام.",
      accessibility: "وصول طرقي سالك ومستمر."
    }
  },
  {
    id: "tahannaout-hub",
    category: "supply",
    lat: "31.351° N",
    lng: "7.951° W",
    elevation: "950m",
    topOffset: "25%",
    leftOffset: "60%",
    statusFr: "Base Logistique Principale",
    statusAr: "قاعدة لوجستية رئيسية",
    statusColor: "emerald",
    fr: {
      name: "Plateforme de Distribution Tahannaout",
      desc: "Hub majeur de stockage pour la nourriture, l'eau, les tentes et le matériel d'ingénierie.",
      survey: "Centralisation des flux géospatiaux et de la flotte de drones ECARTTOP.",
      accessibility: "Excellent accès logistique."
    },
    ar: {
      name: "منصة التوزيع بتحناوت",
      desc: "مركز تخزين وتوزيع رئيسي للمواد الغذائية والمياه الصالحة للشرب والمعدات الهندسية.",
      survey: "مركزة البيانات الجغرافية وتوجيه أسطول درون ECARTTOP.",
      accessibility: "موقع لوجستي ممتاز وسهل الوصول."
    }
  },
  {
    id: "marrakech-medical",
    category: "supply",
    lat: "31.625° N",
    lng: "7.989° W",
    elevation: "466m",
    topOffset: "10%",
    leftOffset: "58%",
    statusFr: "Centre Médical & Coordination",
    statusAr: "مركز طبي وتنسيق",
    statusColor: "emerald",
    fr: {
      name: "CHU Mohammed VI & QG Coordination",
      desc: "Traitement des blessés graves évacués par hélicoptères et cellule nationale de crise.",
      survey: "Échange de données SIG avec les services de la protection civile en temps réel.",
      accessibility: "Axe urbain principal."
    },
    ar: {
      name: "المركز الاستشفائي محمد السادس وقاعدة التنسيق",
      desc: "استقبال المصابين الموجهين عبر المروحيات الطبية وتنسيق خلية الطوارئ الوطنية.",
      survey: "تبادل البيانات الخرائطية SIG في الوقت الحقيقي مع مصالح الوقاية المدنية.",
      accessibility: "محور حضري رئيسي."
    }
  }
];



export default function SeismeMarrakech() {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "rescue" | "tech">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // States for interactive map controls
  const [mapFilter, setMapFilter] = useState<"all" | "damage" | "shelter" | "supply">("all");
  const [selectedPointId, setSelectedPointId] = useState<string | null>("epicenter");
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [mapZoomMode, setMapZoomMode] = useState<"global" | "zone">("zone");
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);

  // Sync selected point with the active filter
  useEffect(() => {
    if (mapFilter !== "all") {
      const visiblePoints = mapPoints.filter(pt => pt.category === mapFilter);
      if (visiblePoints.length > 0) {
        const isStillVisible = visiblePoints.some(pt => pt.id === selectedPointId);
        if (!isStillVisible) {
          setSelectedPointId(visiblePoints[0].id);
        }
      } else {
        setSelectedPointId(null);
      }
    } else if (!selectedPointId) {
      setSelectedPointId("epicenter");
    }
  }, [mapFilter]);

  const filteredEvents = timelineEvents.filter(event => {
    if (filter === "all") return true;
    if (filter === "rescue") return event.category === "crisis" || event.category === "rescue";
    if (filter === "tech") return event.category === "tech" || event.category === "rebuild";
    return true;
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lang === 'fr' ? 'Séisme Marrakech - Carte Interactive' : 'زلزال مراكش - خريطة تفاعلية',
        text: lang === 'fr' 
          ? "Découvrez la carte interactive de l'impact du séisme de Marrakech par ECARTTOP."
          : "اكتشف الخريطة التفاعلية لآثار زلزال مراكش من إعداد إيكارطوب.",
        url: window.location.href,
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'fr' ? "Lien copié dans le presse-papiers !" : "تم نسخ الرابط إلى الحافظة!");
    }
  };

  return (
    <div className="pb-24">
      <SEO page="portfolio" />
      
      {/* Premium Hero Section */}
      <section className="bg-black text-white py-48 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15)_0%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-4 bg-sky-500/10 border border-sky-500/25 px-5 py-2 rounded-full mb-12 animate-pulse">
              <MapIcon className="text-sky-400" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">
                {lang === 'fr' ? "Projet Citoyen & Technologique" : "مشروع مواطن وتكنولوجي"}
              </span>
            </div>
            
            <h1 className="text-6xl md:text-[8rem] font-black mb-12 tracking-tighter uppercase italic leading-[0.85] text-white">
              {lang === 'fr' ? 'Séisme' : 'زلزال'} <br />
              <span className="text-sky-400 not-italic font-light">
                {lang === 'fr' ? 'Marrakech' : 'مراكش'}
              </span>
            </h1>
            
            <p className="text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
              {lang === 'fr' 
                ? "Une carte interactive réalisée par ECARTTOP – Nabil Boutrik pour documenter et visualiser l’impact du séisme ayant touché la région de Marrakech."
                : "خريطة تفاعلية من إعداد إيكارطوب – المهندس نبيل بوتريق لتوثيق وتصوير آثار الزلزال الذي ضرب منطقة مراكش والحوز."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Interactive Map Dashboard */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative">
        <ScrollReveal variant="fadeUp" className="space-y-16">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-10">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400 font-mono">
                {lang === 'fr' ? "CARTOGRAPHIE LIVE" : "خرائط حية ومباشرة"}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mt-2">
                {lang === 'fr' ? "Carte Interactive d'Impact" : "الخريطة التفاعلية للآثار"}
              </h2>
            </div>
            <div className="flex gap-4">
              <Button 
                onClick={handleShare}
                variant="outline" 
                className="border-white/10 text-white hover:bg-white/5 rounded-2xl px-6 py-5 text-[9px] font-black uppercase tracking-widest flex items-center gap-3"
              >
                <Share2 size={12} />
                {lang === 'fr' ? "Partager" : "مشاركة"}
              </Button>
              <a 
                href="https://www.google.com/maps/d/viewer?mid=1tXuamBvgoTRDbLKO9QpJFmQuGyscUVs" 
                target="_blank" 
                rel="noreferrer"
              >
                <Button className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl px-6 py-5 text-[9px] font-black uppercase tracking-widest flex items-center gap-3 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                  <ExternalLink size={12} />
                  {lang === 'fr' ? "Plein Écran Google" : "ملء الشاشة في جوجل"}
                </Button>
              </a>
            </div>
          </div>

          {/* MAP FILTER TOGGLE CONTROLS */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-zinc-900/40 p-6 rounded-[2rem] border border-white/5 backdrop-blur-sm">
            <div className={`flex flex-col gap-2 ${isRTL ? "text-right" : "text-left"}`}>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                {lang === 'fr' ? "Filtres Thématiques GIS" : "مرشحات الطبقات الجغرافية"}
              </h3>
              <p className="text-xs text-gray-500 font-light">
                {lang === 'fr' 
                  ? "Sélectionnez une catégorie pour filtrer la carte et voir les données de terrain." 
                  : "اختر فئة لتصفية المعطيات الجغرافية وعرض بيانات المسح الميداني."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
              {/* Category Buttons */}
              <button
                onClick={() => setMapFilter("all")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                  mapFilter === "all"
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    : "bg-zinc-950 border border-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <Layers size={12} />
                {lang === 'fr' ? "Tous" : "الكل"}
              </button>

              <button
                onClick={() => setMapFilter("damage")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                  mapFilter === "damage"
                    ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                    : "bg-zinc-950 border border-white/5 text-gray-400 hover:text-red-400"
                }`}
              >
                <Flame size={12} className={mapFilter === "damage" ? "text-white" : "text-red-500"} />
                {lang === 'fr' ? "Zones de Dégâts" : "مناطق الأضرار"}
              </button>

              <button
                onClick={() => setMapFilter("shelter")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                  mapFilter === "shelter"
                    ? "bg-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                    : "bg-zinc-950 border border-white/5 text-gray-400 hover:text-sky-400"
                }`}
              >
                <Shield size={12} className={mapFilter === "shelter" ? "text-white" : "text-sky-500"} />
                {lang === 'fr' ? "Hébergements" : "مراكز الإيواء"}
              </button>

              <button
                onClick={() => setMapFilter("supply")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                  mapFilter === "supply"
                    ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    : "bg-zinc-950 border border-white/5 text-gray-400 hover:text-emerald-400"
                }`}
              >
                <Truck size={12} className={mapFilter === "supply" ? "text-white" : "text-emerald-500"} />
                {lang === 'fr' ? "Logistique" : "القواعد اللوجستية"}
              </button>

              <div className="h-8 w-[1px] bg-white/10 hidden lg:block" />

              {/* ZOOM CONTROLLER */}
              <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/5 items-center">
                <button
                  onClick={() => setMapZoomMode("global")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                    mapZoomMode === "global"
                      ? "bg-sky-500 text-white shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                  title={lang === 'fr' ? "Vue globale de la région (Masque les repères)" : "عرض عام للمنطقة (يخفي المؤشرات)"}
                >
                  <ZoomOut size={12} />
                  <span>{lang === 'fr' ? "Globale" : "عام"}</span>
                </button>
                <button
                  onClick={() => setMapZoomMode("zone")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                    mapZoomMode === "zone"
                      ? "bg-sky-500 text-white shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                  title={lang === 'fr' ? "Zoomer dans la zone (Affiche les repères)" : "التركيز في المنطقة (يظهر المؤشرات)"}
                >
                  <ZoomIn size={12} />
                  <span>{lang === 'fr' ? "Zone" : "في المنطقة"}</span>
                </button>
              </div>

              {/* Toggle Overlays Button */}
              <button
                onClick={() => setShowOverlays(!showOverlays)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  showOverlays
                    ? "border-sky-500/30 bg-sky-500/10 text-sky-400"
                    : "border-white/5 bg-zinc-950 text-gray-500 hover:text-gray-300"
                }`}
                title={lang === 'fr' ? "Afficher/Masquer les balises interactives (Calque)" : "إظهار/إخفاء المؤشرات التفاعلية"}
              >
                {showOverlays ? <Eye size={12} /> : <EyeOff size={12} />}
                {lang === 'fr' ? "Calque GIS" : "الطبقة الجغرافية"}
                <span className={`text-[7px] px-1.5 py-0.5 rounded ml-1 font-mono font-bold ${showOverlays ? "bg-sky-400/20 text-sky-300" : "bg-white/5 text-gray-500"}`}>
                  {showOverlays ? "ON" : "OFF"}
                </span>
              </button>
            </div>
          </div>

          {/* TWO COLUMN GRID: MAP + GIS INFO PANE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
            
            {/* COLUMN 1: MAP EMBED WITH OVERLAYS (8 Cols) */}
            <div className="lg:col-span-8 relative flex flex-col justify-between">
              
              <div className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-[2.5rem] md:rounded-[3.5rem] p-1.5 md:p-2 bg-black/40 backdrop-blur-md border border-white/15 shadow-[0_0_100px_rgba(14,165,233,0.15)] overflow-hidden group h-full">
                {/* High-Tech HUD styling lines */}
                <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-sky-500/40 group-hover:border-sky-400 group-hover:w-8 group-hover:h-8 transition-all duration-700 pointer-events-none z-30" />
                <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-sky-500/40 group-hover:border-sky-400 group-hover:w-8 group-hover:h-8 transition-all duration-700 pointer-events-none z-30" />
                <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-sky-500/40 group-hover:border-sky-400 group-hover:w-8 group-hover:h-8 transition-all duration-700 pointer-events-none z-30" />
                <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-sky-500/40 group-hover:border-sky-400 group-hover:w-8 group-hover:h-8 transition-all duration-700 pointer-events-none z-30" />
                
                {/* Interactive absolute-positioned beacons (renders only if showOverlays is true and in zone view) */}
                <AnimatePresence>
                  {showOverlays && mapZoomMode === "zone" && mapPoints
                    .filter(pt => mapFilter === "all" || pt.category === mapFilter)
                    .map((pt) => {
                      const isActive = selectedPointId === pt.id;
                      const isHovered = hoveredPointId === pt.id;
                      const showTooltip = isActive || isHovered;

                      const isRed = pt.statusColor === "red";
                      const isGreen = pt.statusColor === "emerald";
                      const colorClass = isRed 
                        ? "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]" 
                        : isGreen 
                          ? "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]" 
                          : "bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.8)]";

                      const borderClass = isRed 
                        ? "border-red-500/50" 
                        : isGreen 
                          ? "border-emerald-500/50" 
                          : "border-sky-500/50";

                      // Position tooltip below if near the top edge (< 30% topOffset)
                      const topValue = parseInt(pt.topOffset);
                      const isTopSkewed = !isNaN(topValue) && topValue < 30;

                      return (
                        <motion.div
                          key={pt.id}
                          style={{ top: pt.topOffset, left: pt.leftOffset }}
                          className="absolute z-20"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Pulsing ring */}
                          <div className={`absolute -inset-4 rounded-full border animate-ping pointer-events-none ${borderClass}`} />
                          
                          {/* Inner dot with category icon - Custom motion.button for smooth springy animations */}
                          <motion.button
                            onClick={() => setSelectedPointId(pt.id)}
                            onMouseEnter={() => setHoveredPointId(pt.id)}
                            onMouseLeave={() => setHoveredPointId(null)}
                            whileHover={{ scale: 1.3, rotate: 8 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white/90 relative z-30 shadow-lg cursor-pointer ${colorClass} ${
                              isActive ? "ring-4 ring-sky-500/40 border-sky-300 scale-125" : ""
                            }`}
                            title={lang === 'fr' ? pt.fr.name : pt.ar.name}
                          >
                            {pt.category === "damage" && <Flame size={12} className="text-white" />}
                            {pt.category === "shelter" && <Shield size={12} className="text-white" />}
                            {pt.category === "supply" && <Truck size={12} className="text-white" />}
                          </motion.button>

                          {/* Futuristic Detailed Tooltip overlay on hover / active */}
                          <AnimatePresence>
                            {showTooltip && (
                              <motion.div
                                initial={{ opacity: 0, y: isTopSkewed ? 15 : -15, scale: 0.92 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: isTopSkewed ? 15 : -15, scale: 0.92 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className={`absolute z-50 w-72 md:w-80 bg-slate-950/95 backdrop-blur-md border border-white/15 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] pointer-events-none -translate-x-1/2 left-1/2 ${
                                  isTopSkewed ? "top-12" : "bottom-12"
                                }`}
                              >
                                {/* Glow reflection */}
                                <div className={`absolute top-0 inset-x-0 h-1.5 rounded-t-2xl opacity-40 ${isRed ? "bg-red-500" : isGreen ? "bg-emerald-500" : "bg-sky-500"}`} />

                                {/* Tooltip pointer arrow */}
                                <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-slate-950 border border-white/15 pointer-events-none ${
                                  isTopSkewed 
                                    ? "-top-1.5 border-b-0 border-r-0" 
                                    : "-bottom-1.5 border-t-0 border-l-0"
                                }`} />

                                {/* Tooltip Content */}
                                <div className={`space-y-3 ${isRTL ? "text-right rtl" : "text-left"}`}>
                                  {/* Title & Category icon */}
                                  <div className={`flex items-start justify-between gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <div className="space-y-0.5">
                                      <h4 className="text-sm font-black text-white leading-tight uppercase tracking-tight">
                                        {lang === 'fr' ? pt.fr.name : pt.ar.name}
                                      </h4>
                                      <div className={`flex items-center gap-1.5 text-[9px] font-mono font-bold text-sky-400 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <Globe size={10} />
                                        <span>{pt.lat} / {pt.lng}</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-400">{pt.elevation}</span>
                                      </div>
                                    </div>

                                    {/* Action pulse indicator badge */}
                                    <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full uppercase border whitespace-nowrap ${
                                      isRed 
                                        ? "text-red-400 bg-red-500/10 border-red-500/20" 
                                        : isGreen 
                                          ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
                                          : "text-sky-400 bg-sky-500/10 border-sky-500/20"
                                    }`}>
                                      {lang === 'fr' ? pt.statusFr : pt.statusAr}
                                    </span>
                                  </div>

                                  {/* Description */}
                                  <p className="text-[11px] text-gray-300 font-light leading-relaxed">
                                    {lang === 'fr' ? pt.fr.desc : pt.ar.desc}
                                  </p>

                                  {/* Technical Drone Surveys & Accessibility Section */}
                                  <div className="space-y-2 pt-2 border-t border-white/5 text-[10px] font-mono text-gray-400 leading-normal">
                                    <div className={`flex items-start gap-1.5 ${isRTL ? "flex-row-reverse" : ""}`}>
                                      <Compass className="text-sky-400 shrink-0 mt-0.5" size={11} />
                                      <div>
                                        <span className="text-[8px] font-bold text-gray-500 uppercase block">
                                          {lang === 'fr' ? "RELEVÉ TOPOGRAPHIQUE" : "الرفع الطوبوغرافي"}
                                        </span>
                                        <span className="text-gray-300 font-light">
                                          {lang === 'fr' ? pt.fr.survey : pt.ar.survey}
                                        </span>
                                      </div>
                                    </div>

                                    <div className={`flex items-start gap-1.5 ${isRTL ? "flex-row-reverse" : ""}`}>
                                      <Navigation className="text-emerald-400 shrink-0 mt-0.5" size={11} />
                                      <div>
                                        <span className="text-[8px] font-bold text-gray-500 uppercase block">
                                          {lang === 'fr' ? "ACCESSIBILITÉ TERRAIN" : "الوصول الميداني"}
                                        </span>
                                        <span className="text-gray-300 font-light">
                                          {lang === 'fr' ? pt.fr.accessibility : pt.ar.accessibility}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Interaction feedback cue */}
                                  {!isActive && (
                                    <div className="text-center text-[8px] font-mono text-sky-400/50 pt-1 animate-pulse border-t border-white/5">
                                      {lang === 'fr' ? "⚡ Cliquez pour verrouiller la télémétrie" : "⚡ انقر لتثبيت القياسات"}
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                </AnimatePresence>

                {/* Dynamic Glass Zoom Overlay when in Global mode */}
                {mapZoomMode === "global" && (
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-6 text-center transition-all duration-500">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-slate-950/95 border border-white/10 p-6 rounded-3xl max-w-sm shadow-[0_25px_50px_rgba(0,0,0,0.8)] space-y-4"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mx-auto text-sky-400">
                        <Crosshair className="animate-spin-slow" size={24} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-white uppercase tracking-wider">
                          {lang === 'fr' ? "Vue Globale de la Région" : "العرض العام للمنطقة"}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                          {lang === 'fr' 
                            ? "Les repères interactifs détaillés n'apparaissent que lorsque vous zoomez sur la zone d'impact pour garantir la précision de l'alignement." 
                            : "المؤشرات التفاعلية التفصيلية تظهر فقط عند التكبير في منطقة التأثير لضمان دقة المطابقة الجغرافية."}
                        </p>
                      </div>
                      <Button
                        onClick={() => setMapZoomMode("zone")}
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest py-4 shadow-[0_0_15px_rgba(14,165,233,0.3)] flex items-center justify-center gap-2"
                      >
                        <ZoomIn size={12} />
                        {lang === 'fr' ? "Zoomer sur la zone" : "تكبير في المنطقة"}
                      </Button>
                    </motion.div>
                  </div>
                )}

                <div className="relative h-full w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-950 ring-1 ring-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
                  <iframe 
                    id="seisme-marrakech-map"
                    src={mapZoomMode === "global" ? "https://www.google.com/maps/d/embed?mid=1tXuamBvgoTRDbLKO9QpJFmQuGyscUVs&ehbc=2E312F&ll=31.111,-8.411&z=9" : "https://www.google.com/maps/d/embed?mid=1tXuamBvgoTRDbLKO9QpJFmQuGyscUVs&ehbc=2E312F&ll=31.111,-8.411&z=11"}
                    className="w-full h-full border-none opacity-85 hover:opacity-100 transition-opacity duration-500"
                    title="Carte Interactive Séisme Marrakech"
                    allowFullScreen
                  />
                </div>
                
                {/* Corner telemetry info */}
                <div className="absolute bottom-12 right-12 z-20 pointer-events-none hidden md:flex flex-col items-end gap-1 font-mono text-[8px] text-white/40">
                  <span>GIS_COORD_SYSTEM: WGS84</span>
                  <span>ACTIVE_LAYER_FILTER: {mapFilter.toUpperCase()}</span>
                  <span className="text-sky-400 animate-pulse">● SIGNAL GIS DIRECT</span>
                </div>
              </div>
            </div>

            {/* COLUMN 2: TELEMETRY & FIELD OBSERVATIONS PANE (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
              
              {/* Active Selection Details Card */}
              <AnimatePresence mode="wait">
                {selectedPointId && (() => {
                  const pt = mapPoints.find(p => p.id === selectedPointId);
                  if (!pt) return null;
                  const isRed = pt.statusColor === "red";
                  const isGreen = pt.statusColor === "emerald";
                  const colorBadgeClass = isRed 
                    ? "text-red-400 bg-red-500/10 border-red-500/20" 
                    : isGreen 
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
                      : "text-sky-400 bg-sky-500/10 border-sky-500/20";

                  return (
                    <motion.div
                      key={pt.id}
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      transition={{ duration: 0.3 }}
                      className={`glass-card p-8 rounded-[2.5rem] border-white/5 bg-slate-950/40 relative overflow-hidden flex flex-col gap-6 h-full justify-between ${isRTL ? "text-right" : "text-left"}`}
                    >
                      {/* Technical Header */}
                      <div className={`flex justify-between items-center border-b border-white/5 pb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className="flex items-center gap-2">
                          <Compass className="text-sky-400 animate-spin" size={14} style={{ animationDuration: '6s' }} />
                          <span className="text-[10px] font-mono text-gray-500 block uppercase">GIS_METRIC_TELEMETRY</span>
                        </div>
                        <span className={`text-[9px] font-mono border px-3 py-1 rounded-full uppercase ${colorBadgeClass}`}>
                          {lang === 'fr' ? pt.statusFr : pt.statusAr}
                        </span>
                      </div>

                      {/* Title and Description */}
                      <div className="space-y-2">
                        <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                          {lang === 'fr' ? pt.fr.name : pt.ar.name}
                        </h4>
                        <p className="text-sm text-gray-400 font-light leading-relaxed">
                          {lang === 'fr' ? pt.fr.desc : pt.ar.desc}
                        </p>
                      </div>

                      {/* Technical Specs List */}
                      <div className="space-y-3 pt-3 border-t border-white/5 font-mono text-[11px]">
                        <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                          <span className="text-gray-500">{lang === 'fr' ? "Coordonnées" : "الإحداثيات"}</span>
                          <span className="text-white text-right">{pt.lat} / {pt.lng}</span>
                        </div>
                        <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                          <span className="text-gray-500">{lang === 'fr' ? "Altitude" : "الارتفاع"}</span>
                          <span className="text-white">{pt.elevation}</span>
                        </div>
                        <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                          <span className="text-gray-500">{lang === 'fr' ? "Praticabilité" : "حالة المسلك"}</span>
                          <span className="text-sky-400 text-right">{lang === 'fr' ? pt.fr.accessibility : pt.ar.accessibility}</span>
                        </div>
                      </div>

                      {/* Field Observation Report (Nabil Boutrik / ECARTTOP) */}
                      <div className="p-4 rounded-2xl bg-sky-500/5 border border-sky-500/10 space-y-1 mt-2">
                        <span className="text-[9px] font-mono text-sky-400 uppercase tracking-widest block font-bold">
                          {lang === 'fr' ? "Rapport d'Expertise ECARTTOP" : "تقرير معاينة إيكارطوب"}
                        </span>
                        <p className="text-xs text-sky-300 font-light leading-relaxed">
                          {lang === 'fr' ? pt.fr.survey : pt.ar.survey}
                        </p>
                      </div>

                      {/* Focus action button */}
                      <div className="pt-2">
                        <Button 
                          onClick={() => {
                            const mapElement = document.getElementById("seisme-marrakech-map");
                            if (mapElement) {
                              mapElement.scrollIntoView({ behavior: "smooth", block: "center" });
                            }
                          }}
                          className="w-full bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/25 rounded-2xl py-4 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300"
                        >
                          <Crosshair size={12} />
                          {lang === 'fr' ? "Focus sur la Carte" : "تركيز على الخريطة"}
                        </Button>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>

              {/* Quick interactive Selector List */}
              <div className="glass-card p-6 rounded-[2.5rem] border-white/5 bg-zinc-950/20 flex flex-col gap-4">
                <span className={`text-[10px] font-mono text-gray-500 block uppercase ${isRTL ? "text-right" : "text-left"}`}>
                  {lang === 'fr' ? "Repères de la couche active" : "مؤشرات الطبقة النشطة"}
                </span>

                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {mapPoints
                    .filter(pt => mapFilter === "all" || pt.category === mapFilter)
                    .map((pt) => {
                      const isActive = selectedPointId === pt.id;
                      const isRed = pt.statusColor === "red";
                      const isGreen = pt.statusColor === "emerald";
                      const colorDot = isRed 
                        ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" 
                        : isGreen 
                          ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                          : "bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]";

                      return (
                        <button
                          key={pt.id}
                          onClick={() => setSelectedPointId(pt.id)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-300 border ${
                            isRTL ? "flex-row-reverse" : ""
                          } ${
                            isActive 
                              ? "bg-white/5 border-sky-500/30 text-sky-400" 
                              : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <div className={`w-2.5 h-2.5 rounded-full ${colorDot}`} />
                            <span className="text-xs font-black uppercase tracking-wider truncate max-w-[120px] md:max-w-[140px]">
                              {lang === 'fr' ? pt.fr.name : pt.ar.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono opacity-50">{pt.elevation}</span>
                        </button>
                      );
                    })}
                </div>
              </div>

            </div>

          </div>

          {/* Quick Informational Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="glass-card p-10 rounded-[3rem] border-white/5 hover:border-sky-500/20 transition-all duration-500 flex flex-col gap-6">
              <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 border border-sky-500/20">
                <Locate size={20} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                {lang === 'fr' ? "Localiser les zones" : "تحديد المناطق المتضررة"}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {lang === 'fr'
                  ? "La carte met en évidence les épicentres, les failles sismiques cartographiées et les communes rurales les plus touchées afin de guider efficacement les secours."
                  : "تحدد الخريطة بدقة بؤرة الهزة الأرضية، والصدوع الجيولوجية المرسومة، والجماعات القروية الأكثر تضرراً من أجل توجيه جهود الإغاثة بكفاءة."}
              </p>
            </div>

            <div className="glass-card p-10 rounded-[3rem] border-white/5 hover:border-sky-500/20 transition-all duration-500 flex flex-col gap-6">
              <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 border border-sky-500/20">
                <Navigation size={20} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                {lang === 'fr' ? "Points Stratégiques" : "المواقع الاستراتيجية"}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {lang === 'fr'
                  ? "Identification des infrastructures clés, des points d'eau, des centres de santé de campagne et des voies d'accès praticables ou bloquées pour faciliter la logistique."
                  : "تحديد البنيات التحتية الأساسية ومقرات الإيواء، والمستشفيات الميدانية، والطرق المفتوحة أو المقطوعة لتسهيل العمليات اللوجستية."}
              </p>
            </div>

            <div className="glass-card p-10 rounded-[3rem] border-white/5 hover:border-sky-500/20 transition-all duration-500 flex flex-col gap-6">
              <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 border border-sky-500/20">
                <Info size={20} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                {lang === 'fr' ? "Ressource Pédagogique" : "مورد تعليمي وثائقي"}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {lang === 'fr'
                  ? "Un support d'information accessible à tous pour analyser l'ampleur des dégâts géologiques et structurels à l'aide de couches SIG consolidées."
                  : "وسيلة إعلامية وتوثيقية متاحة للجميع لتحليل حجم الأضرار الجيولوجية والهيكلية باستخدام طبقات جغرافية موحدة."}
              </p>
            </div>
          </div>

        </ScrollReveal>
      </section>

      {/* Scroll-Triggered Interactive Timeline Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative border-t border-white/5">
        <ScrollReveal variant="fadeUp" className="space-y-16">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-10">
            <div className={isRTL ? "text-right" : "text-left"}>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400 font-mono">
                {lang === 'fr' ? "CHRONOLOGIE DES ÉVÉNEMENTS" : "التسلسل الزمني للأحداث"}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mt-2">
                {lang === 'fr' ? "L'Évolution du Projet" : "تطور مسار المشروع"}
              </h2>
            </div>
            
            {/* Category Filter Tab buttons */}
            <div className="flex bg-zinc-900/80 border border-white/10 rounded-2xl p-1.5 gap-1 self-stretch md:self-auto">
              <button
                onClick={() => setFilter("all")}
                className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                  filter === "all"
                    ? "bg-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {lang === 'fr' ? "Tous" : "الكل"}
              </button>
              <button
                onClick={() => setFilter("rescue")}
                className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                  filter === "rescue"
                    ? "bg-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {lang === 'fr' ? "Secours & Urgence" : "الإنقاذ والإغاثة"}
              </button>
              <button
                onClick={() => setFilter("tech")}
                className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                  filter === "tech"
                    ? "bg-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {lang === 'fr' ? "Technique & SIG" : "التقنية والمسح"}
              </button>
            </div>
          </div>

          {/* Timeline Flow */}
          <div className="relative mt-20">
            {/* Main Center/Side Vertical Line */}
            <div className={`absolute top-0 bottom-0 w-[2px] bg-white/5 ${isRTL ? "right-8 md:right-1/2 md:translate-x-1/2" : "left-8 md:left-1/2 md:-translate-x-1/2"} pointer-events-none`} />
            
            {/* Glowing animated path overlay on vertical line */}
            <motion.div 
              className={`absolute top-0 w-[2px] bg-sky-500/30 ${isRTL ? "right-8 md:right-1/2 md:translate-x-1/2" : "left-8 md:left-1/2 md:-translate-x-1/2"} pointer-events-none origin-top`}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ bottom: 0 }}
            />

            {/* List of events */}
            <div className="space-y-16 relative">
              {filteredEvents.map((event, index) => {
                const isEven = index % 2 === 0;
                const EventIcon = event.icon;
                const isExpanded = expandedId === event.id;
                
                return (
                  <motion.div
                    key={event.id}
                    className={`flex flex-col md:flex-row relative ${
                      isRTL 
                        ? (isEven ? "md:flex-row-reverse" : "") 
                        : (isEven ? "md:flex-row" : "md:flex-row-reverse")
                    } gap-8 md:gap-0`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Left/Right content block */}
                    <div className={`w-full md:w-1/2 px-4 ${isRTL ? "md:px-12" : "md:px-12"} flex ${isRTL ? "justify-start md:justify-start" : "justify-start md:justify-end"} ${isRTL ? "pr-16 md:pr-12" : "pl-16 md:pl-12"}`}>
                      <div className={`w-full max-w-lg glass-card p-8 rounded-[2.5rem] border-white/5 hover:border-sky-500/20 transition-all duration-500 flex flex-col justify-between relative group ${
                        isExpanded ? "ring-1 ring-sky-500/30 bg-slate-950/80" : "bg-zinc-950/30"
                      } ${isRTL ? "text-right" : "text-left"}`}>
                        
                        {/* Event Header Info */}
                        <div className="flex flex-col gap-4">
                          <div className={`flex justify-between items-start gap-4 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                            <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-4 py-1.5 rounded-full uppercase font-black tracking-wider">
                              {lang === 'fr' ? event.badgeFr : event.badgeAr}
                            </span>
                            
                            <div className={`flex items-center gap-2 text-[11px] text-gray-500 font-mono ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                              <Clock size={12} className="text-gray-600" />
                              <span>{event.time}</span>
                            </div>
                          </div>

                          <h3 className="text-2xl font-black text-white tracking-tighter uppercase mt-2 group-hover:text-sky-300 transition-colors duration-300">
                            {lang === 'fr' ? event.titleFr : event.titleAr}
                          </h3>

                          <p className="text-gray-400 font-light leading-relaxed text-sm">
                            {lang === 'fr' ? event.descFr : event.descAr}
                          </p>
                        </div>

                        {/* Event Bottom Stats & Action Block */}
                        <div className={`mt-6 pt-6 border-t border-white/5 flex flex-wrap justify-between items-center gap-4 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                          <div className={`flex flex-col ${isRTL ? "items-end" : "items-start"}`}>
                            <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono">
                              {lang === 'fr' ? event.stats.labelFr : event.stats.labelAr}
                            </span>
                            <span className="text-xs font-black text-white">
                              {lang === 'fr' ? event.stats.valFr : event.stats.valAr}
                            </span>
                          </div>

                          <Button 
                            onClick={() => setExpandedId(isExpanded ? null : event.id)}
                            variant="ghost" 
                            className="text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 rounded-xl px-4 py-2 text-[9px] font-black uppercase tracking-widest flex items-center gap-2"
                          >
                            {isExpanded ? (
                              <>
                                {lang === 'fr' ? "Masquer les détails" : "إخفاء التفاصيل"}
                                <ChevronUp size={12} />
                              </>
                            ) : (
                              <>
                                {lang === 'fr' ? "Détails techniques" : "التفاصيل الفنية"}
                                <ChevronDown size={12} />
                              </>
                            )}
                          </Button>
                        </div>

                        {/* Collapsible Tech Detail Pane */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="mt-6 p-5 rounded-2xl bg-black/60 border border-sky-500/10 font-mono text-[11px] text-sky-300 space-y-3">
                                <div className={`flex justify-between items-center border-b border-sky-500/15 pb-2 text-[9px] text-gray-500 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                                  <span>CONSOLE_OUTPUT: DISASTER_SIG_METRICS</span>
                                  <span>STATUS: VERIFIED</span>
                                </div>
                                <p className={`leading-relaxed whitespace-pre-line ${isRTL ? "text-right" : "text-left"}`}>
                                  {lang === 'fr' ? event.techDetailFr : event.techDetailAr}
                                </p>
                                <div className={`pt-2 flex justify-between text-[8px] text-sky-500/50 border-t border-sky-500/10 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                                  <span>GEO_COORD: Al-Haouz Zone</span>
                                  <span>REF: ECARTTOP_CIVIC_DATA</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Middle Timeline Node Dot */}
                    <div className={`absolute ${isRTL ? "right-8 md:right-1/2 md:translate-x-1/2" : "left-8 md:left-1/2 md:-translate-x-1/2"} transform flex items-center justify-center z-20 top-4`}>
                      {/* Outer pulsing ring */}
                      <div className={`absolute w-12 h-12 rounded-full border border-sky-500/20 bg-sky-500/5 ${
                        isExpanded ? "scale-125 border-sky-400 animate-ping opacity-75" : "group-hover:scale-110"
                      } transition-all duration-500 pointer-events-none`} />
                      
                      {/* Main Node Button/Indicator */}
                      <button 
                        onClick={() => setExpandedId(isExpanded ? null : event.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${
                          isExpanded 
                            ? "bg-sky-500 border-sky-400 text-white shadow-[0_0_20px_rgba(14,165,233,0.5)]" 
                            : "bg-slate-950 border-white/10 text-sky-400 hover:border-sky-500 hover:text-white"
                        }`}
                        title={lang === 'fr' ? "En savoir plus" : "قراءة المزيد"}
                      >
                        <EventIcon size={16} />
                      </button>
                    </div>

                    {/* Left/Right empty placeholder / Date visual tag */}
                    <div className={`w-full md:w-1/2 px-4 md:px-12 flex items-center ${
                      isRTL
                        ? (isEven ? "md:justify-end" : "md:justify-start")
                        : (isEven ? "md:justify-start" : "md:justify-end")
                    } order-first md:order-none ${isRTL ? "pr-16 md:pr-12" : "pl-16 md:pl-12"}`}>
                      <div className={`flex flex-col ${
                        isRTL 
                          ? (isEven ? "md:items-start" : "md:items-end")
                          : (isEven ? "md:items-end" : "md:items-start")
                      } gap-1`}>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                          <Calendar size={12} className="text-sky-400" />
                          <span className="text-xs font-black text-white font-mono uppercase tracking-wider">
                            {event.date}
                          </span>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </div>

        </ScrollReveal>
      </section>

      {/* Context, Demarche & Technologique Content */}
      <section className="py-24 bg-zinc-950/40 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(14,165,233,0.03),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal variant="fadeUp" className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            <div className="space-y-10">
              <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2 rounded-full">
                <HeartHandshake className="text-sky-400" size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">
                  {lang === 'fr' ? 'Démarche Citoyenne' : 'مبادرة مواطنة وإنسانية'}
                </span>
              </div>
              
              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
                {lang === 'fr' ? 'Soutenir la' : 'دعم'} <br />
                <span className="text-sky-400 not-italic font-light">
                  {lang === 'fr' ? 'Reconstruction' : 'إعادة الإعمار'}
                </span>
              </h3>
              
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                {lang === 'fr'
                  ? "Ce projet s’inscrit dans une démarche citoyenne et technologique visant à sensibiliser, informer et soutenir les initiatives locales de reconstruction et de solidarité. Le cabinet ECARTTOP s'engage à mettre à disposition ses compétences géospatiales pour faciliter l'évaluation technique des bâtiments et la planification des infrastructures."
                  : "يندج هذا المشروع في إطار مسعى مواطن وتكنولوجي يهدف إلى التوعية، وتوفير المعلومات لدعم مبادرات إعادة الإعمار والتضامن المحلية. تلتزم إيكارطوب بوضع كفاءاتها الجغرافية رهن إشارة الشركاء لتسهيل التقييم الفني للمباني وتخطيط البنى التحتية."}
              </p>
              
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-2 shrink-0 shadow-[0_0_8px_#38bdf8]" />
                  <p className="text-sm text-gray-300 font-light">
                    {lang === 'fr' 
                      ? "Visualisation claire de la topographie montagneuse d'Al Haouz."
                      : "تمثيل واضح للطوبوغرافيا الجبلية الوعرة لمنطقة الحوز."}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-2 shrink-0 shadow-[0_0_8px_#38bdf8]" />
                  <p className="text-sm text-gray-300 font-light">
                    {lang === 'fr' 
                      ? "Centralisation des couches cartographiques issues d'imageries satellites et de relevés terrain."
                      : "تجميع طبقات الخرائط المستخرجة من صور الأقمار الصناعية والمسوح الميدانية."}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-2 shrink-0 shadow-[0_0_8px_#38bdf8]" />
                  <p className="text-sm text-gray-300 font-light">
                    {lang === 'fr' 
                      ? "Aide à la décision pour les associations locales et les urbanistes en charge du relogement."
                      : "أداة اتخاذ القرار للجمعيات المحلية والمهندسين المسؤولين عن إعادة الإيواء."}
                  </p>
                </div>
              </div>
            </div>

            {/* High Tech Engineering Data Showcase */}
            <div className="relative p-12 glass-card rounded-[4rem] border-white/5 bg-slate-950/60 overflow-hidden flex flex-col gap-10">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                <Globe size={240} />
              </div>
              
              <div className="flex items-center justify-between border-b border-white/5 pb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <Layers size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 block uppercase">DATA_INTEGRITY</span>
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      {lang === 'fr' ? "Rapport Géospatial" : "تقرير البيانات الجيومكانية"}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-sky-400 bg-sky-400/10 px-3 py-1 rounded-full uppercase">
                  {lang === 'fr' ? "Précision" : "الدقة الجغرافية"}
                </span>
              </div>

              <div className="space-y-6">
                <p className="text-sm text-gray-400 font-light">
                  {lang === 'fr'
                    ? "Grâce à notre expertise en topographie et en photogrammétrie par drone, nous modélisons les déformations de terrain et inspectons la stabilité structurelle des bâtiments touchés."
                    : "من خلال خبرتنا في الطوبوغرافيا والتصوير الجوي بالدرون، نقوم بنمذجة تشوهات التربة وفحص ثبات الهياكل للمباني المتضررة لضمان سلامتها قبل إعادة الإعمار."}
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                  <div className="space-y-2">
                    <span className="text-3xl font-black text-white">99%</span>
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest">
                      {lang === 'fr' ? "Fiabilité des Données" : "موثوقية البيانات"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-3xl font-black text-white">GIS</span>
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest">
                      {lang === 'fr' ? "Standard Spatial" : "المعايير الجغرافية"}
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => navigate('/contact')}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-2xl py-6 text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-300 mt-4"
              >
                {lang === 'fr' ? "Collaborer au Projet" : "التعاون في المشروع"}
              </Button>
            </div>

          </ScrollReveal>
        </div>
      </section>

      {/* Call to action reconstruction */}
      <section className="py-32 max-w-5xl mx-auto px-6 text-center">
        <ScrollReveal variant="scaleUp">
          <div className="p-16 md:p-24 glass-card rounded-[5rem] border-sky-500/20 relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px]" />
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-[0.9] mb-8">
              {lang === 'fr' ? 'Soutien & Expertise' : 'الدعم والخبرة الفنية'} <br />
              <span className="text-sky-400 not-italic font-light">
                {lang === 'fr' ? 'Topographique' : 'الطوبوغرافية'}
              </span>
            </h3>
            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-12">
              {lang === 'fr'
                ? "Vous êtes une association, un organisme public ou un ingénieur engagé dans la reconstruction ? Collaborons ensemble pour cartographier, inspecter et planifier en toute sécurité."
                : "هل أنت جمعية، منظمة عمومية، أو مهندس مشارك في جهود إعادة الإعمار؟ دعنا نتعاون معاً لرسم الخرائط، والتفتيش، والتخطيط بكل أمان ودقة."}
            </p>
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-sky-500 hover:bg-sky-600 text-white font-black uppercase tracking-[0.4em] rounded-3xl px-16 py-8 text-[10px] shadow-[0_0_35px_rgba(14,165,233,0.35)] hover:scale-105 transition-all duration-500"
            >
              {lang === 'fr' ? "Prendre Contact" : "اتصل بنا الآن"}
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
