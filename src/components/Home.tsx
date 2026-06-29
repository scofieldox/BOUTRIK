import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  Map as MapIcon, 
  Compass, 
  Database, 
  Plane, 
  CheckCircle2,
  Users,
  Globe,
  Award,
  ChevronRight,
  Layers,
  Target,
  Zap,
  Clock,
  Cpu,
  Volume2,
  VolumeX,
  Sparkles
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "./SEO";
import { useMarqueeSpeed } from "../hooks/useMarqueeSpeed";
import GlobalReachGlobe from "./GlobalReachGlobe";
import RegionalMap from "./RegionalMap";
import ProjectMetrics from "./ProjectMetrics";
import { AnimatedCounter } from "./AnimatedCounter";
import gnssSurveyFieldImg from "../assets/images/gnss_survey_field_1782352782520.jpg";

import { projects } from "../data/projects";

interface ServiceItem {
  title: string;
  desc: string;
  techDetails?: string;
}

interface TiltServiceCardProps {
  service: ServiceItem;
  idx: number;
  navigate: (path: string) => void;
  lang: string;
}

function TiltServiceCard({ service, idx, navigate, lang }: TiltServiceCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    const midX = x - box.width / 2;
    const midY = y - box.height / 2;
    
    // Smooth custom rotation angles (max 8 degrees tilt)
    const degX = -(midY / (box.height / 2)) * 8;
    const degY = (midX / (box.width / 2)) * 8;
    
    setRotateX(degX);
    setRotateY(degY);
    setSpotlightPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.02 : 1,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      transition={{
        default: { delay: idx * 0.15, duration: 1, ease: "easeOut" },
        rotateX: { type: "spring", stiffness: 150, damping: 20 },
        rotateY: { type: "spring", stiffness: 150, damping: 20 },
        scale: { duration: 0.4, ease: "easeOut" }
      }}
      onClick={() => navigate('/services')}
      className="group glass-card p-16 rounded-[5rem] relative overflow-hidden flex flex-col min-h-[550px] border border-white/5 hover:border-sky-400/30 transition-colors duration-700 cursor-pointer"
    >
      {/* Glare effect background */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-10"
          style={{
            background: `radial-gradient(circle 350px at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(14,165,233,0.12), transparent 80%)`
          }}
        />
      )}

      <div 
        className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-1000"
        style={{ transform: "translateZ(30px)" }}
      >
        <Compass size={180} className="text-white" />
      </div>
      
      <div 
        className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mb-16 group-hover:bg-sky-500 group-hover:text-white transition-all duration-700 border border-white/5 group-hover:border-sky-400/30"
        style={{ transform: "translateZ(40px)" }}
      >
        <Compass size={40} className="text-sky-400 group-hover:text-white transition-colors duration-700" />
      </div>
      
      <h4 
        className="text-4xl font-black mb-8 text-white group-hover:text-sky-400 transition-colors duration-700 uppercase italic tracking-tighter leading-tight"
        style={{ transform: "translateZ(55px)" }}
      >
        {service.title}
      </h4>
      
      <p 
        className="text-gray-400 text-lg leading-relaxed mb-8 font-light"
        style={{ transform: "translateZ(30px)" }}
      >
        {service.desc}
      </p>

      {/* Technical details reveal */}
      {service.techDetails && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isHovered ? "auto" : 0, 
            opacity: isHovered ? 1 : 0,
            marginBottom: isHovered ? 24 : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ transform: "translateZ(35px)" }}
          className="overflow-hidden"
        >
          <div className="p-5 rounded-2xl bg-sky-500/5 border border-sky-400/10 text-xs text-sky-200 font-mono leading-relaxed text-left" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 block mb-2">
              {lang === 'fr' ? 'Spécifications Techniques :' : 'المواصفات التقنية:'}
            </span>
            {service.techDetails}
          </div>
        </motion.div>
      )}
      
      <div style={{ transform: "translateZ(45px)" }} className="w-full mt-auto">
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            navigate('/services');
          }}
          variant="outline" 
          className="w-full rounded-3xl border-white/10 text-white hover:bg-sky-500 hover:border-sky-500 text-[10px] font-black uppercase tracking-[0.4em] py-10 transition-all duration-700"
        >
          {lang === 'fr' ? 'Détails du service' : 'تفاصيل الخدمة'}
        </Button>
      </div>
    </motion.div>
  );
}

interface TechItem {
  id: string;
  titleFr: string;
  titleAr: string;
  shortDescFr: string;
  shortDescAr: string;
  fullDescFr: string;
  fullDescAr: string;
  techSpecsFr: string[];
  techSpecsAr: string[];
  icon: React.ComponentType<any>;
  color: string;
}

const techItems: TechItem[] = [
  {
    id: "GIS-01",
    titleFr: "Bases de Données & SIG",
    titleAr: "نظم المعلومات الجغرافية",
    shortDescFr: "Analyse spatiale multi-critères, modélisation territoriale complexe et architectures géospatiales d'entreprise.",
    shortDescAr: "التحليل المكاني متعدد المعايير، النمذجة الإجرائية والترابية، وتصميم وإدارة البنيات التحتية للبيانات الجغرافية.",
    fullDescFr: "Nos solutions SIG intègrent des couches d'informations géospatiales dynamiques, permettant une aide à la décision optimisée pour l'aménagement du territoire, l'urbanisme et la gestion des réseaux.",
    fullDescAr: "تدمج حلولنا لنظم المعلومات الجغرافية طبقات معلوماتية ديناميكية توفر دعماً مثالياً لاتخاذ القرار في تهيئة التراب الوطني، التخطيط الحضري وتدبير الشبكات المختلفة.",
    techSpecsFr: ["ArcGIS Enterprise", "Database PostgreSQL", "Esri CityEngine", "WebGIS Custom"],
    techSpecsAr: ["آرك جي آي إس", "قواعد بيانات بوستجرس", "سيتي إنجين", "منصات ويب جي آي إس"],
    icon: Layers,
    color: "#0ea5e9"
  },
  {
    id: "UAV-02",
    titleFr: "Photogrammétrie UAV",
    titleAr: "المسح الجوي وطائرات درون",
    shortDescFr: "Levés aériens à grande échelle, orthophotographies centimétriques de haute définition et modèles numériques de terrain (MNT).",
    shortDescAr: "المسوح الجوية واسعة النطاق، إنتاج الصور التقويمية فائقة الدقة ذات المقياس السنتيمتري، ونماذج التضاريس الرقمية.",
    fullDescFr: "Grâce à nos flottes de drones industriels RTK, nous générons des nuages de points denses et des modélisations 3D texturées adaptées aux carrières, infrastructures et suivis de chantiers complexes.",
    fullDescAr: "بفضل أسطولنا من طائرات الدرون الصناعية المزودة بأنظمة RTK، ننتج سحابات نقطية كثيفة ونماذج ثلاثية الأبعاد تفاعلية ملائمة للمقالع والمشاريع الكبرى.",
    techSpecsFr: ["DJI Matrice 300 RTK", "Pix4D / Agisoft", "GSD < 1.5 cm", "Nuages de points LiDAR"],
    techSpecsAr: ["ماتريس 300 RTK", "برمجيات بيكس 4 دي", "دقة أقل من 1.5سم", "سحابة نقط ليدار"],
    icon: Plane,
    color: "#10b981"
  },
  {
    id: "CAD-03",
    titleFr: "Ingénierie CAO / DAO",
    titleAr: "التصميم والرسم الهندسي",
    shortDescFr: "Élaboration de plans de masse précis, modélisations structurelles 3D et intégration parfaite avec les maquettes BIM.",
    shortDescAr: "إعداد التصاميم والمخططات الهندسية عالية الدقة، النمذجة الهيكلية ثلاثية الأبعاد والتكامل التام مع أنظمة BIM.",
    fullDescFr: "Nous concevons des livrables vectoriels structurés respectant scrupuleusement les chartes géomatiques les plus exigeantes pour les projets d'infrastructures et de lotissements.",
    fullDescAr: "نصمم مخرجات هندسية متجهة مهيكلة تلتزم بأعلى معايير الخرائطية الرقمية لتنفيذ مشاريع البنيات التحتية والتجزئات السكنية.",
    techSpecsFr: ["AutoCAD / Covadis", "Microstation Bentley", "Modélisation BIM 3D", "Dessins Vectoriels H-P"],
    techSpecsAr: ["أوتوكاد / كوفاديس", "بنتلي ميكروستيشن", "نمذجة ثلاثية BIM", "رسومات متجهة دقيقة"],
    icon: Cpu,
    color: "#a855f7"
  }
];

function TechGlassCard({ tech, idx, lang, isRTL }: { tech: TechItem; idx: number; lang: string; isRTL: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = tech.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: idx * 0.15, duration: 0.8, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-[3rem] p-8 md:p-10 border border-white/5 bg-zinc-950/40 backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:border-sky-500/30 hover:shadow-[0_0_35px_rgba(14,165,233,0.06)] flex flex-col justify-between min-h-[380px] group cursor-pointer"
    >
      {/* Card Glow Background */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle 250px at 50% 0%, ${tech.color}15, transparent 80%)`,
          opacity: isHovered ? 1 : 0
        }}
      />

      <div className="space-y-6 relative z-10">
        {/* Tech Icon Header */}
        <div className="flex items-center justify-between">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 transition-all duration-500"
            style={{ 
              backgroundColor: isHovered ? `${tech.color}15` : 'rgba(255,255,255,0.02)',
              borderColor: isHovered ? `${tech.color}40` : 'rgba(255,255,255,0.05)'
            }}
          >
            <Icon 
              size={28} 
              style={{ color: isHovered ? tech.color : '#94a3b8' }} 
              className="transition-colors duration-500" 
            />
          </div>
          <span className="font-mono text-[9px] font-black tracking-widest text-gray-600 uppercase">
            {tech.id}
          </span>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h3 className="text-2xl font-black text-white uppercase italic tracking-tight group-hover:text-sky-400 transition-colors duration-500">
            {lang === 'fr' ? tech.titleFr : tech.titleAr}
          </h3>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            {lang === 'fr' ? tech.shortDescFr : tech.shortDescAr}
          </p>
        </div>

        {/* Expandable Technical Description Panel */}
        <motion.div
          initial={{ height: 0, opacity: 0, marginTop: 0 }}
          animate={{ 
            height: isHovered ? "auto" : 0, 
            opacity: isHovered ? 1 : 0,
            marginTop: isHovered ? 20 : 0
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden border-t border-white/5 pt-4 space-y-4"
        >
          <p className="text-xs text-gray-400 leading-relaxed font-light italic text-left" dir={isRTL ? 'rtl' : 'ltr'}>
            {lang === 'fr' ? tech.fullDescFr : tech.fullDescAr}
          </p>
          
          <div className="space-y-2 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
            <span className="text-[8px] font-mono font-black text-sky-400 uppercase tracking-widest block">
              {lang === 'fr' ? 'SPÉCIFICATIONS TECHNIQUES' : 'المواصفات التقنية'}
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {(lang === 'fr' ? tech.techSpecsFr : tech.techSpecsAr).map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                  <span className="text-[10px] font-mono text-gray-500 truncate">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Learn More Indicator at bottom */}
      <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4 relative z-10">
        <span className="text-[8px] font-mono font-black text-gray-500 tracking-wider">
          {isHovered 
            ? (lang === 'fr' ? 'SPÉCIFICATION ACTIVE' : 'المواصفات مفعلة') 
            : (lang === 'fr' ? 'SURVOLER POUR LES DÉTAILS' : 'مرر الفأرة للتفاصيل')}
        </span>
        <motion.div
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-400 group-hover:text-sky-400"
        >
          <ChevronRight size={14} className={isRTL ? 'rotate-180' : ''} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { t, lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { style: marqueeStyle, marqueeProps } = useMarqueeSpeed({ normalDuration: 40, slowedDuration: 160 });
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [videoError, setVideoError] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [showSecondVideo, setShowSecondVideo] = useState(false);
  const [activeSecondVideoIndex, setActiveSecondVideoIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const secondVideoSrcs = [
    "/Gis.mp4",
    "/3D-CIM1.mp4",
    "/3D-CIM2.mp4",
    "/3D-CIM3.mp4"
  ];

  const slideshowProjects = projects.filter(p => 
    p.id === "infrastructure-nador" || 
    p.id === "lotissement-al-omrane" || 
    p.id === "analyse-sig-regionale"
  );

  const playVideo = async () => {
    if (!videoRef.current) return;
    try {
      videoRef.current.muted = true;
      await videoRef.current.play();
    } catch (error) {
      // Only log if it's not an interruption error which is harmless during fallback
      const message = error instanceof Error ? error.message : String(error);
      if (!message.includes("interrupted")) {
        console.error("Autoplay failed:", message);
      }
    }
  };

  useEffect(() => {
    if (!showSecondVideo && !showSlideshow) {
      playVideo();
    }
  }, [showSecondVideo, showSlideshow, videoError]); // Re-try if we switch back or to fallback

  useEffect(() => {
    if (!showSlideshow) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex(prev => {
        if (prev === slideshowProjects.length - 1) {
          setActiveSecondVideoIndex(0);
          setShowSecondVideo(true);
          setShowSlideshow(false);
          return 0;
        }
        return prev + 1;
      });
    }, 4000); // Auto-rotate slideshow every 4 seconds
    return () => clearInterval(interval);
  }, [showSlideshow, slideshowProjects.length]);

  useEffect(() => {
    if (videoError && !showSlideshow) {
      // Fallback timer: if video fails to load, show standard screen for 10s then transition to slideshow
      const timer = setTimeout(() => {
        setShowSlideshow(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [videoError, showSlideshow]);

  const handleVideoEnded = () => {
    if (playCount < 1) {
      const nextPlayCount = playCount + 1;
      setPlayCount(nextPlayCount);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(err => {
          console.warn("Video replay failed:", err);
        });
      }
    } else {
      setShowSlideshow(true);
    }
  };

  const handleSecondVideoEnded = () => {
    if (activeSecondVideoIndex < secondVideoSrcs.length - 1) {
      setActiveSecondVideoIndex(prev => prev + 1);
    } else {
      setShowSecondVideo(false);
      setShowSlideshow(false);
      setPlayCount(0);
      setCurrentSlideIndex(0);
      setActiveSecondVideoIndex(0);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
    secondVideoRefs.current.forEach(video => {
      if (video) {
        video.muted = nextMuted;
      }
    });
  };

  useEffect(() => {
    if (showSecondVideo) {
      secondVideoRefs.current.forEach((video, idx) => {
        if (video) {
          video.muted = isMuted;
          if (idx === activeSecondVideoIndex) {
            video.play().catch(err => {
              console.warn(`Second video index ${idx} play failed:`, err);
            });
          } else {
            video.pause();
            video.currentTime = 0;
          }
        }
      });
    }
  }, [showSecondVideo, activeSecondVideoIndex, isMuted]);

  const stats = [
    { label: t.home.stats.projects, value: 500, suffix: "+", icon: CheckCircle2 },
    { label: t.home.stats.droneHours, value: 1200, suffix: "+", icon: Plane },
    { label: t.home.stats.clients, value: 150, suffix: "+", icon: Users },
    { label: t.home.stats.precision, value: 100, suffix: "%", icon: Globe },
  ];

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="overflow-hidden">
      <SEO page="home" />
      {/* Hero Section - Futuristic TV Screen with Snow/MNT Environment */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black p-4 md:p-8 lg:p-12 py-24 md:py-32 xl:py-40">
        {/* Full Screen Background Video (The "Environment") */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-30 grayscale brightness-50"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-blue-grid-background-23039-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_80%)]" />
        </div>

        <div className="relative z-10 w-full max-w-[1700px] flex flex-col items-center justify-center px-6">
          {/* Main Hero Header - Restored and Positioned Properly with Staggered Entrance */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 45 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.15,
                  delayChildren: 0.2,
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="text-center z-20 mb-6 md:mb-10 xl:mb-12 pointer-events-none"
          >
            <h1 className="text-4xl md:text-7xl lg:text-[8rem] xl:text-[9.5rem] font-black tracking-tighter uppercase italic leading-[0.8] drop-shadow-[0_0_50px_rgba(14,165,233,0.3)]">
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0,
                    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
                  }
                }}
                className="text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.4)] inline-block"
              >
                ECART
              </motion.span>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0,
                    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
                  }
                }}
                className="text-sky-400 drop-shadow-[0_0_50px_rgba(14,165,233,0.6)] inline-block ml-2 md:ml-4"
              >
                TOP
              </motion.span>
              <br />
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
                  }
                }}
                className="text-[10px] md:text-sm not-italic font-black tracking-[0.8em] block mt-8 text-white/40 uppercase"
              >
                {lang === 'fr' ? 'INGÉNIERIE • SIG • TOPOGRAPHIE' : 'هندسة • نظم المعلومات الجغرافية • الطوبوغرافيا'}
              </motion.span>
            </h1>
          </motion.div>

          {/* Main Display Screen */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
            className="relative z-10 w-full max-w-[85vw] md:max-w-[65vw] lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl aspect-video mx-auto rounded-[1.5rem] md:rounded-[2.2rem] p-1 md:p-1.5 bg-black/40 backdrop-blur-md border border-white/15 shadow-[0_0_150px_-20px_rgba(14,165,233,0.35)] group overflow-hidden"
          >
            {/* TV Screen Reflection/Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 to-transparent pointer-events-none z-40" />
            
            <div className="relative h-full w-full rounded-[1.3rem] md:rounded-[2.0rem] overflow-hidden bg-black/80 ring-1 ring-white/10 shadow-[inset_0_0_50px_rgba(0,0,0,1)]">
              {/* Internal Screen Content */}
              <div className="absolute inset-0 opacity-20 z-10 mix-blend-overlay pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px]" />
              </div>

              {/* Hero Information - Video Branding */}
              <div className="relative z-30 h-full w-full flex flex-col items-center justify-center p-0 overflow-hidden group/video bg-black">
                {/* Debug identifier to confirm element is rendered */}
                <div className="absolute top-4 right-4 z-50 flex items-center gap-2 pointer-events-none uppercase tracking-[0.4em]">
                  <motion.div 
                    animate={{ opacity: [0.4, 1, 0.4] }} 
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_#0ea5e9]"
                  />
                  <span className="text-[8px] font-mono text-white/40">
                    System Live
                  </span>
                </div>
                
                {showSecondVideo ? (
                  <div className="absolute inset-0 w-full h-full z-10 bg-black">
                    {secondVideoSrcs.map((src, idx) => (
                      <video 
                        key={idx}
                        ref={el => { secondVideoRefs.current[idx] = el; }}
                        preload="auto"
                        muted={isMuted}
                        playsInline 
                        onEnded={handleSecondVideoEnded}
                        onError={() => {
                          if (idx === activeSecondVideoIndex) {
                            console.warn(`Second video index ${idx} failed to load, moving next`);
                            handleSecondVideoEnded();
                          }
                        }}
                        className={`absolute inset-0 w-full h-full object-cover scale-100 transition-opacity duration-300 brightness-110 contrast-[1.15] saturate-[1.05] shadow-[0_0_100px_rgba(14,165,233,0.3)] ${
                          idx === activeSecondVideoIndex ? "opacity-100 z-20 pointer-events-auto" : "opacity-0 z-10 pointer-events-none"
                        }`}
                      >
                        <source src={src} type="video/mp4" />
                      </video>
                    ))}
                  </div>
                ) : showSlideshow ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative w-full h-full z-10 flex items-center justify-center bg-black overflow-hidden cursor-pointer group/slide"
                    onClick={() => navigate(`/portfolio/${slideshowProjects[currentSlideIndex].id}`)}
                  >
                    {/* Scanning Line Effect */}
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-px bg-sky-500/20 z-40 shadow-[0_0_10px_#0ea5e9] pointer-events-none"
                    />
                    
                    {/* Slideshow image with sleek transition */}
                    {slideshowProjects.map((img, idx) => (
                      idx === currentSlideIndex && (
                        <motion.div
                          key={img.image}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          className="absolute inset-0"
                        >
                          <img 
                            src={img.image} 
                            alt={lang === 'fr' ? img.fr.title : img.ar.title} 
                            className="w-full h-full object-cover brightness-90 contrast-[1.05] saturate-[1.1]"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-20" />
                        </motion.div>
                      )
                    ))}
                    
                    {/* Slide Information Overlay */}
                    <div className="absolute bottom-8 left-8 right-8 z-30 flex flex-col pointer-events-none">
                      <motion.p 
                        key={`cat-${currentSlideIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[9px] font-black text-sky-400 uppercase tracking-[0.4em] mb-2"
                      >
                        {lang === 'fr' ? slideshowProjects[currentSlideIndex].fr.category : slideshowProjects[currentSlideIndex].ar.category}
                      </motion.p>
                      <motion.h4 
                        key={`title-${currentSlideIndex}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl xl:text-3xl font-black text-white uppercase italic tracking-tighter leading-tight"
                      >
                        {lang === 'fr' ? slideshowProjects[currentSlideIndex].fr.title : slideshowProjects[currentSlideIndex].ar.title}
                      </motion.h4>
                      <span className="text-[8px] font-mono text-white/40 mt-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                        {lang === 'fr' ? 'PROJET RÉCENT • CLIQUEZ POUR EN SAVOIR PLUS' : 'مشروع حديث • انقر لمعرفة المزيد'}
                      </span>
                    </div>

                    {/* Progress indicators */}
                    <div className="absolute top-8 left-8 z-30 flex gap-1.5">
                      {slideshowProjects.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`h-1 rounded-full transition-all duration-500 ${idx === currentSlideIndex ? 'w-6 bg-sky-500 shadow-[0_0_8px_#0ea5e9]' : 'w-2 bg-white/20'}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : !videoError ? (
                  <video 
                    ref={videoRef}
                    autoPlay 
                    muted
                    playsInline 
                    className="w-full h-full object-cover scale-100 relative z-10 brightness-110 contrast-[1.15] saturate-[1.05] shadow-[0_0_100px_rgba(14,165,233,0.3)] transition-all duration-1000"
                    onCanPlayThrough={() => setVideoError(false)}
                    onError={() => {
                      console.warn("Main video failed to load, switching to emergency fallback UI.");
                      setVideoError(true);
                    }}
                    onEnded={handleVideoEnded}
                  >
                    <source src="/logo-animation.mp4" type="video/mp4" />
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-blue-grid-background-23039-large.mp4" type="video/mp4" />
                  </video>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center w-full h-full z-30 bg-black/90 p-12 overflow-hidden relative"
                  >
                    {/* Digital Grid Background for Fallback */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                    
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 1, 0, -1, 0]
                      }}
                      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                      className="relative"
                    >
                      <div className="w-48 h-48 rounded-full border-2 border-sky-500/20 flex items-center justify-center relative">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-[-20px] border-b-2 border-sky-500/40 rounded-full"
                        />
                        <Target className="text-white drop-shadow-[0_0_20px_rgba(14,165,233,0.8)]" size={80} />
                      </div>
                    </motion.div>
                    
                    <div className="text-center mt-12 relative z-10">
                      <h2 className="text-7xl md:text-8xl font-black text-white italic tracking-tighter leading-none mb-4">
                        <span className="text-sky-400">ECART</span>TOP
                      </h2>
                      <div className="flex items-center justify-center gap-4 overflow-hidden h-6">
                        <motion.p 
                          animate={{ y: [20, 0, 0, -20] }}
                          transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
                          className="text-xs text-sky-500 font-bold tracking-[0.8em] uppercase"
                        >
                          {lang === 'fr' ? 'RECONSTRUCTION DIGITALE' : 'إعادة بناء رقمية'}
                        </motion.p>
                      </div>
                    </div>

                    {/* Scanning Line Effect */}
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-px bg-sky-500/40 z-40 shadow-[0_0_15px_#0ea5e9]"
                    />
                  </motion.div>
                )}
                <div className="absolute inset-0 bg-sky-500/[0.02] mix-blend-overlay pointer-events-none z-20" />

                {/* Mute/Unmute Control */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-8 left-8 z-50 p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-sky-500 hover:border-sky-500 transition-all duration-300 opacity-0 group-hover/video:opacity-100"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>

              {/* Data Telemetry Visuals */}
              <div className="absolute top-12 left-12 z-40 hidden lg:block opacity-30">
                <div className="font-mono text-[8px] text-sky-400 space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div animate={{ x: [-80, 80] }} transition={{ repeat: Infinity, duration: 3 }} className="w-10 h-full bg-sky-500" />
                    </div>
                    <span>SIGNAL: STABLE</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 2 }} className="w-full h-full bg-sky-400" />
                    </div>
                    <span>CALIBRATION: 0.003mm</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-12 right-12 z-40 hidden lg:block opacity-30">
                <div className="flex flex-col items-end gap-1 font-mono text-[8px] text-white/50">
                  <span>MNT_SCAN_092</span>
                  <span className="text-sky-400">READY</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons - Outside of TV Screen */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8 md:mt-12 xl:mt-16 z-20"
          >
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-sky-500 hover:bg-sky-600 text-white font-black uppercase tracking-[0.4em] rounded-2xl px-12 py-8 text-[9px] shadow-[0_0_30px_rgba(14,165,233,0.3)] transition-all duration-500"
            >
              {t.home.hero.cta}
            </Button>
            <Button 
              onClick={() => navigate('/services')}
              variant="outline" 
              className="border-white/10 text-white hover:bg-white/5 rounded-2xl px-12 py-8 text-[9px] font-black uppercase tracking-[0.4em] transition-all duration-500 backdrop-blur-md"
            >
              {lang === 'fr' ? 'NOS SERVICES' : 'خدماتنا'}
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 hidden md:block"
        >
          <div className="w-6 h-10 border border-white/5 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-sky-500 rounded-full shadow-[0_0_10px_#0ea5e9]" />
          </div>
        </motion.div>
      </section>

      {/* Partners Marquee Section (Social Proof) */}
      <ScrollReveal variant="fadeUp" threshold={0.05}>
        <section className="bg-black py-20 relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px)] bg-[size:100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal variant="fadeUp" className="text-center mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">
              {lang === 'fr' ? 'Soutien Technique & Technologique' : 'الدعم التقني والتكنولوجي'}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-4 uppercase italic tracking-tighter">
              {lang === 'fr' ? 'Partenaires & Écosystème' : 'الشركاء والأنظمة الهندسية'}
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.15}>
            <div className="relative w-full overflow-hidden select-none py-4 [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]">
              <div 
                className="animate-marquee flex gap-12"
                style={marqueeStyle}
                {...marqueeProps}
              >
              {[
                {
                  id: "ancfcc",
                  nameFr: "ANCFCC CADASTRE",
                  nameAr: "الوكالة الوطنية للمحافظة العقارية",
                  descFr: "Conservation Foncière",
                  descAr: "التحفيظ العقاري والخرائطية",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L6 14V34L24 44L42 34V14L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M24 12V36" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
                      <path d="M12 24H36" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
                      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2.5"/>
                    </svg>
                  )
                },
                {
                  id: "equipment",
                  nameFr: "MINISTÈRE DE L'ÉQUIPEMENT",
                  nameAr: "وزارة التجهيز والماء",
                  descFr: "Infrastructures Publiques",
                  descAr: "البنية التحتية والماء",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 40H44" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                      <path d="M10 40V24C10 18 16 12 24 12C32 12 38 18 38 24V40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M24 4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="24" cy="24" r="3" fill="currentColor"/>
                    </svg>
                  )
                },
                {
                  id: "oncf",
                  nameFr: "ONCF INFRASTRUCTURE",
                  nameAr: "المكتب الوطني للسكك الحديدية",
                  descFr: "Réseaux Ferroviaires",
                  descAr: "الشبكة الحديدية واللوجستيك",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 8H40V14H8V8Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
                      <path d="M12 14L8 40H40L36 14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      <path d="M18 20H30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M16 28H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M14 36H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )
                },
                {
                  id: "ocp",
                  nameFr: "OCP GROUP",
                  nameAr: "مجموعة المكتب الشريف للفوسفاط",
                  descFr: "Géologie & Topographie",
                  descAr: "المناجم والمسح الطبوغرافي",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L41.32 14V34L24 44L6.68 34V14L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
                      <path d="M24 12L34.39 18V30L24 36L13.61 30V18L24 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      <circle cx="24" cy="24" r="4" fill="currentColor"/>
                    </svg>
                  )
                },
                {
                  id: "esri",
                  nameFr: "ESRI PARTNER",
                  nameAr: "شريك إزري لنظم المعلومات",
                  descFr: "SIG & CityEngine",
                  descAr: "نظم المعلومات والنمذجة ثلاثية الأبعاد",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5"/>
                      <path d="M6 24H42" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M24 6C29 11 31 17 31 24C31 31 29 37 24 42C19 37 17 31 17 24C17 17 19 11 24 6Z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  )
                },
                {
                  id: "trimble",
                  nameFr: "TRIMBLE GEOSPATIAL",
                  nameAr: "تريمبل للأنظمة الجيومكانية",
                  descFr: "GNSS & Satellites",
                  descAr: "نظام تحديد المواقع العالمي الدقيق",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L42 36H6L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="24" cy="22" r="5" stroke="currentColor" strokeWidth="2"/>
                      <path d="M24 27V36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )
                },
                {
                  id: "leica",
                  nameFr: "LEICA GEOSYSTEMS",
                  nameAr: "لايكا للأجهزة الجيوديسية",
                  descFr: "LiDAR & Scanner 3D",
                  descAr: "المسح الضوئي ثلاثي الأبعاد والليدار",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2.5"/>
                      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="24" cy="24" r="2" fill="currentColor"/>
                      <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M36 36L32 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )
                },
                {
                  id: "autodesk",
                  nameFr: "AUTODESK PARTNER",
                  nameAr: "شريك أوتوديسك للهندسة",
                  descFr: "BIM & Civil 3D",
                  descAr: "نمذجة معلومات البناء والتصميم الهندسي",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 38V10L24 24L38 10V38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 38H38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  )
                }
              ].concat([
                {
                  id: "ancfcc",
                  nameFr: "ANCFCC CADASTRE",
                  nameAr: "الوكالة الوطنية للمحافظة العقارية",
                  descFr: "Conservation Foncière",
                  descAr: "التحفيظ العقاري والخرائطية",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L6 14V34L24 44L42 34V14L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M24 12V36" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
                      <path d="M12 24H36" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
                      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2.5"/>
                    </svg>
                  )
                },
                {
                  id: "equipment",
                  nameFr: "MINISTÈRE DE L'ÉQUIPEMENT",
                  nameAr: "وزارة التجهيز والماء",
                  descFr: "Infrastructures Publiques",
                  descAr: "البنية التحتية والماء",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 40H44" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                      <path d="M10 40V24C10 18 16 12 24 12C32 12 38 18 38 24V40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M24 4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="24" cy="24" r="3" fill="currentColor"/>
                    </svg>
                  )
                },
                {
                  id: "oncf",
                  nameFr: "ONCF INFRASTRUCTURE",
                  nameAr: "المكتب الوطني للسكك الحديدية",
                  descFr: "Réseaux Ferroviaires",
                  descAr: "الشبكة الحديدية واللوجستيك",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 8H40V14H8V8Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
                      <path d="M12 14L8 40H40L36 14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      <path d="M18 20H30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M16 28H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M14 36H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )
                },
                {
                  id: "ocp",
                  nameFr: "OCP GROUP",
                  nameAr: "مجموعة المكتب الشريف للفوسفاط",
                  descFr: "Géologie & Topographie",
                  descAr: "المناجم والمسح الطبوغرافي",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L41.32 14V34L24 44L6.68 34V14L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M24 12L34.39 18V30L24 36L13.61 30V18L24 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      <circle cx="24" cy="24" r="4" fill="currentColor"/>
                    </svg>
                  )
                },
                {
                  id: "esri",
                  nameFr: "ESRI PARTNER",
                  nameAr: "شريك إزري لنظم المعلومات",
                  descFr: "SIG & CityEngine",
                  descAr: "نظم المعلومات والنمذجة ثلاثية الأبعاد",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5"/>
                      <path d="M6 24H42" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M24 6C29 11 31 17 31 24C31 31 29 37 24 42C19 37 17 31 17 24C17 17 19 11 24 6Z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  )
                },
                {
                  id: "trimble",
                  nameFr: "TRIMBLE GEOSPATIAL",
                  nameAr: "تريمبل للأنظمة الجيومكانية",
                  descFr: "GNSS & Satellites",
                  descAr: "نظام تحديد المواقع العالمي الدقيق",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L42 36H6L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="24" cy="22" r="5" stroke="currentColor" strokeWidth="2"/>
                      <path d="M24 27V36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )
                },
                {
                  id: "leica",
                  nameFr: "LEICA GEOSYSTEMS",
                  nameAr: "لايكا للأجهزة الجيوديسية",
                  descFr: "LiDAR & Scanner 3D",
                  descAr: "المسح الضوئي ثلاثي الأبعاد والليدار",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2.5"/>
                      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="24" cy="24" r="2" fill="currentColor"/>
                      <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M36 36L32 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )
                },
                {
                  id: "autodesk",
                  nameFr: "AUTODESK PARTNER",
                  nameAr: "شريك أوتوديسك للهندسة",
                  descFr: "BIM & Civil 3D",
                  descAr: "نمذجة معلومات البناء والتصميم الهندسي",
                  icon: (
                    <svg className="w-12 h-12 text-current" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 38V10L24 24L38 10V38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 38H38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  )
                }
              ]).map((partner, idx) => (
                <div 
                  key={`${partner.id}-${idx}`}
                  className="flex items-center gap-6 bg-zinc-950/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 min-w-[340px] transition-all duration-500 hover:border-sky-400/30 hover:bg-zinc-900/40 group cursor-pointer"
                >
                  <div className="text-gray-500 group-hover:text-sky-400 transition-colors duration-500 flex-shrink-0 grayscale group-hover:grayscale-0">
                    {partner.icon}
                  </div>
                  <div className="flex flex-col justify-center text-left min-w-0">
                    <span className="text-[11px] font-black tracking-widest text-gray-400 group-hover:text-white transition-colors duration-500 uppercase truncate">
                      {lang === 'fr' ? partner.nameFr : partner.nameAr}
                    </span>
                    <span className="text-[9px] text-gray-500 group-hover:text-sky-400/70 transition-colors duration-500 uppercase font-mono mt-1 truncate">
                      {lang === 'fr' ? partner.descFr : partner.descAr}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </ScrollReveal>

      {/* Stats Section */}
      <ScrollReveal variant="fadeUp" threshold={0.05}>
        <section className="bg-black py-40 relative overflow-hidden border-y border-white/5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(52,170,220,0.03),transparent_70%)]" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal variant="staggerContainer" className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-32">
            {stats.map((stat) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="relative group text-center lg:text-left"
                >
                  <div className="flex flex-col items-center lg:items-start">
                    {/* Background indicator */}
                    <div className="text-7xl md:text-[10rem] font-black mb-6 tracking-tighter text-white/5 group-hover:text-sky-400/10 transition-all duration-700 leading-none absolute -top-12 -left-4 select-none">
                      {stat.value}
                    </div>
                    
                    {/* Stat Icon */}
                    <div className="mb-6 p-3 bg-white/5 rounded-2xl border border-white/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 relative z-10">
                      <StatIcon size={20} />
                    </div>

                    {/* Animated Scroll-Triggered Counter */}
                    <div className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white group-hover:text-sky-400 transition-all duration-500 relative z-10">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    
                    <div className="h-[2px] w-12 bg-sky-500 mb-8 group-hover:w-24 transition-all duration-700" />
                    
                    <div className="text-[10px] text-gray-500 uppercase tracking-[0.5em] font-black leading-relaxed max-w-[180px] relative z-10">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>
    </ScrollReveal>

      {/* Services Section */}
      <ScrollReveal variant="fadeUp" threshold={0.05}>
        <section className="py-48 bg-black relative overflow-hidden">
          <div className="absolute -top-48 -right-48 w-[40rem] h-[40rem] bg-sky-500/5 rounded-full blur-[150px]" />
          <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="flex flex-col lg:flex-row justify-between items-end mb-40 gap-20">
            <div className="max-w-4xl space-y-10">
              <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full">
                <Compass className="text-sky-400" size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">{lang === 'fr' ? 'Expertise Technique' : 'خبرة تقنية'}</span>
              </div>
              <h2 className="text-7xl md:text-[10rem] font-black text-white tracking-tighter uppercase italic leading-[0.85]">
                {lang === 'fr' ? 'Solutions de' : 'حلول'} <br />
                <span className="text-sky-400 not-italic font-light">{lang === 'fr' ? 'Haute Précision' : 'عالية الدقة'}</span>
              </h2>
              <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-3xl">
                {t.services.desc}
              </p>
            </div>
            <Button 
              onClick={() => navigate('/services')}
              variant="link" 
              className="text-white font-black p-0 h-auto text-[10px] uppercase tracking-[0.4em] group flex items-center gap-8 hover:no-underline"
            >
              <span className="group-hover:text-sky-400 transition-colors duration-500">{lang === 'fr' ? 'Explorer nos services' : 'استكشف خدماتنا'}</span>
              <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-sky-500 group-hover:border-sky-500 group-hover:text-white transition-all duration-700">
                <ArrowRight size={28} className={isRTL ? 'rotate-180' : ''} />
              </div>
            </Button>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div className="grid md:grid-cols-3 gap-12">
              {t.services.items.slice(0, 3).map((service, idx) => (
                <TiltServiceCard 
                  key={service.title} 
                  service={service} 
                  idx={idx} 
                  navigate={navigate} 
                  lang={lang} 
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </ScrollReveal>

    {/* Interactive Technologies Showcase Section */}
    <ScrollReveal variant="fadeUp" threshold={0.05}>
      <section className="py-32 bg-black relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-0 w-[30rem] h-[30rem] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">
              {lang === 'fr' ? 'Innovations & Technologies' : 'الابتكار والتقنيات'}
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter mt-4">
              {lang === 'fr' ? 'Nos Piliers Technologiques' : 'ركائزنا التكنولوجية'}
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              {lang === 'fr'
                ? 'Découvrez les technologies de pointe au cœur de notre ingénierie de précision, garantissant une exactitude centimétrique.'
                : 'اكتشف التقنيات المتطورة في قلب هندستنا الدقيقة، مما يضمن دقة سنتيمترية متناهية.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {techItems.map((tech, idx) => (
              <TechGlassCard key={tech.id} tech={tech} idx={idx} lang={lang} isRTL={isRTL} />
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>

      {/* Regional Survey Coverage Map Section */}
      <ScrollReveal variant="fadeUp" threshold={0.05}>
        <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <RegionalMap />
          </div>
        </section>
      </ScrollReveal>

      {/* Interactive Growth & Metrics Dashboard */}
      <ScrollReveal variant="fadeUp" threshold={0.05}>
        <ProjectMetrics />
      </ScrollReveal>

      {/* Global Reach & Geodetic Network 3D Globe Section */}
      <ScrollReveal variant="fadeUp" threshold={0.05}>
        <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <GlobalReachGlobe />
          </div>
        </section>
      </ScrollReveal>

      {/* Interactive Cartography Studio Section */}
      <ScrollReveal variant="fadeUp" threshold={0.05}>
        <section className="py-24 bg-black relative overflow-hidden border-t border-b border-white/5">
          <div className="absolute top-0 right-1/4 w-[25rem] h-[25rem] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6">
            <div className="glass-card p-12 md:p-24 rounded-[4rem] border-white/5 bg-zinc-950/40 backdrop-blur-3xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left promo details */}
            <div className="flex-1 space-y-8 text-left">
              <div className="inline-flex items-center gap-3 bg-sky-500/10 border border-sky-400/20 px-4 py-2 rounded-full">
                <Sparkles className="text-sky-400 animate-pulse" size={12} />
                <span className="text-[9px] font-mono font-black uppercase tracking-[0.25em] text-sky-400">
                  {lang === 'fr' ? 'STUDIO D\'ART INTERACTIF' : 'استوديو خرائط المغرب التفاعلي'}
                </span>
              </div>
              
              <h3 className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
                {lang === 'fr' ? 'CONCEVEZ VOTRE' : 'صمم لوحتك'} <br />
                <span className="text-sky-400 not-italic font-light">{lang === 'fr' ? 'AFFICHE DE VILLE' : 'الجدارية الخاصة'}</span>
              </h3>
              
              <p className="text-base text-gray-400 font-light leading-relaxed max-w-xl">
                {lang === 'fr' 
                  ? "Explorez notre studio de création d'art cartographique. Choisissez parmi Casablanca, Marrakech, Nador ou d'autres cités marocaines, personnalisez les tracés routiers, appliquez des thèmes de couleurs précieux, et téléchargez votre affiche en ultra-haute définition."
                  : "اكتشف أول استوديو لتصميم لوحات الخرائط الجدارية الراقية لمدن المغرب. اختر الدار البيضاء، مراكش، الناظور وغيرها، نسّق الألوان، زوايا التكبير والحدود وقم بتحميل لوحتك فوراً بدقة طباعة فائقة."}
              </p>

              <Button
                onClick={() => navigate('/studio')}
                className="bg-sky-500 hover:bg-sky-600 text-white font-black uppercase tracking-[0.3em] rounded-3xl px-12 py-8 text-[10px] shadow-lg shadow-sky-500/20 transition-all duration-500 hover:scale-105"
              >
                {lang === 'fr' ? 'Lancer le Studio d\'Art' : 'دخول استوديو التصميم'}
              </Button>
            </div>

            {/* Right overlapping visual layout */}
            <div className="flex-1 relative w-full max-w-sm flex items-center justify-center">
              {/* Stacked posters effect with slight tilting/staggering */}
              <div className="relative w-64 aspect-[2/3] bg-zinc-900 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transform hover:-translate-y-4 hover:rotate-2 transition-all duration-700">
                <img 
                  src="/casared.jpg" 
                  alt="Casablanca Crimson Nocturne Map" 
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="absolute -left-12 top-8 w-52 aspect-[2/3] bg-white rounded-2xl border border-black/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] overflow-hidden transform -rotate-6 transition-all duration-700 pointer-events-none hidden sm:block">
                <img 
                  src="/Casablackwhit.jpg" 
                  alt="Casablanca Classic Light Map" 
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>

      {/* Featured Projects Section */}
      <ScrollReveal variant="fadeUp" threshold={0.05}>
        <section className="py-48 bg-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
            <div className="max-w-4xl space-y-8">
              <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full">
                <Layers className="text-sky-400" size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">{lang === 'fr' ? 'Portfolio' : 'المعرض'}</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-tight">
                {lang === 'fr' ? 'Nos Projets' : 'مشاريعنا'} <br />
                <span className="text-sky-400 not-italic font-light">{lang === 'fr' ? 'Récents' : 'الأخيرة'}</span>
              </h2>
            </div>
            <Button 
              onClick={() => navigate('/portfolio')}
              className="bg-transparent hover:bg-white/5 text-white border border-white/10 hover:border-sky-500 px-12 py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500"
            >
              {lang === 'fr' ? 'Voir tous les projets' : 'عرض جميع المشاريع'}
            </Button>
          </ScrollReveal>

          <ScrollReveal variant="staggerContainer" className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProjects.map((project) => {
              const projectData = lang === 'fr' ? project.fr : project.ar;
              return (
                <div
                  key={project.id}
                  className="group relative cursor-pointer animate-none"
                  onClick={() => navigate(`/portfolio/${project.id}`)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-white/5 group-hover:border-sky-500/30 group-hover:shadow-[0_0_50px_rgba(14,165,233,0.15)] transition-all duration-700">
                    <img 
                      src={project.image} 
                      alt={projectData.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                    
                    {/* High-Precision Sci-Fi Tech Corner Indicators */}
                    <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-sky-400/0 group-hover:border-sky-400/70 group-hover:w-6 group-hover:h-6 transition-all duration-700 pointer-events-none" />
                    <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-sky-400/0 group-hover:border-sky-400/70 group-hover:w-6 group-hover:h-6 transition-all duration-700 pointer-events-none" />
                    <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-sky-400/0 group-hover:border-sky-400/70 group-hover:w-6 group-hover:h-6 transition-all duration-700 pointer-events-none" />
                    <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-sky-400/0 group-hover:border-sky-400/70 group-hover:w-6 group-hover:h-6 transition-all duration-700 pointer-events-none" />
                    
                    {/* Subtle Holographic Grid Line on Hover */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="absolute bottom-0 left-0 w-full p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-[9px] font-black text-sky-400 uppercase tracking-[0.4em] mb-4">{projectData.category}</p>
                      <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-tight">{projectData.title}</h4>
                      
                      <div className="flex flex-wrap items-center gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full">
                          <Clock size={10} className="text-sky-400" />
                          <span className="text-[8px] font-black uppercase tracking-widest text-gray-300">{projectData.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                          <Cpu size={10} className="text-sky-400" />
                          <span className="text-[8px] font-black uppercase tracking-widest text-gray-300">
                            {project.technologies.slice(0, 1).join('')}
                          </span>
                        </div>
                      </div>

                      <div className="mt-8 pt-8 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-between">
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{project.client}</span>
                        <ArrowRight size={20} className={`text-sky-400 ${isRTL ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>
    </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal variant="scaleUp" threshold={0.05} duration={1.2}>
        <section className="relative py-64 bg-black overflow-hidden">
          {/* Massive Background Branding */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
            <h2 className="text-[15rem] md:text-[25rem] font-black text-white/[0.03] uppercase italic tracking-tighter leading-none whitespace-nowrap">
              ECARTTOP
            </h2>
          </div>

          <div className="absolute inset-0">
            <img 
              src={gnssSurveyFieldImg} 
              alt="Surveying Background" 
              className="w-full h-full object-cover opacity-20 grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,170,220,0.05),transparent_70%)]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <div className="space-y-20">
              <h2 className="text-7xl md:text-[12rem] font-black text-white tracking-tighter uppercase italic leading-[0.8]">
                {lang === 'fr' ? 'Construisons' : 'لنبنِ'} <br />
                <span className="text-sky-400 not-italic font-light">{lang === 'fr' ? 'Demain Ensemble' : 'الغد معاً'}</span>
              </h2>
              
              <p className="text-3xl text-gray-400 max-w-4xl mx-auto font-light leading-relaxed tracking-tight">
                {lang === 'fr' 
                  ? "De la délimitation foncière aux grands projets d'infrastructure, notre précision est votre plus grand atout." 
                  : "من تحديد الأراضي إلى مشاريع البنية التحتية الكبرى، دقتنا هي أكبر أصولكم."}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-12">
                <Button 
                  onClick={() => navigate('/contact')}
                  size="lg" 
                  className="bg-sky-500 hover:bg-sky-600 text-white font-black uppercase tracking-[0.4em] rounded-3xl px-24 py-12 text-[10px] shadow-[0_0_50px_rgba(14,165,233,0.3)] border-none hover:scale-105 transition-all duration-700"
                >
                  {lang === 'fr' ? 'Lancer un projet' : 'ابدأ مشروعاً'}
                </Button>
                <Button 
                  onClick={() => navigate('/portfolio')}
                  variant="outline" 
                  size="lg" 
                  className="border-white/10 text-white hover:bg-white/5 rounded-3xl px-24 py-12 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-700 backdrop-blur-sm"
                >
                  {lang === 'fr' ? 'Nos Réalisations' : 'إنجازاتنا'}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
