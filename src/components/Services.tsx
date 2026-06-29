import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./ScrollReveal";
import { 
  Compass, 
  Map as MapIcon, 
  Database, 
  Plane, 
  CheckCircle2,
  ChevronRight,
  Satellite,
  Layers,
  Scale
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "./SEO";
import FAQ from "./FAQ";
import { GnssSimulator } from "./GnssSimulator";
import geomaticsOfficeImg from "../assets/images/geomatics_office_1782352796730.jpg";

interface ServiceItemType {
  id: string;
  title: string;
  desc: string;
  features: string[];
  techDetails?: string;
}

interface ServiceCardProps {
  service: ServiceItemType;
  idx: number;
  navigate: (path: string) => void;
  lang: string;
  isRTL: boolean;
}

function TopographyIcon({ isHovered, size, className }: { isHovered: boolean; size: number; className: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Grid Lines background */}
      <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.15" />
      <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.15" />
      
      {/* Outer compass ticking ring */}
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1 3" opacity="0.3" />
      
      {/* Topographic elevation contours */}
      <motion.path 
        d="M 15 45 C 25 35, 45 35, 55 45 C 65 55, 75 55, 85 45" 
        stroke="currentColor" 
        strokeWidth="1" 
        opacity="0.3"
        animate={isHovered ? { d: "M 15 43 C 25 37, 45 33, 55 47 C 65 57, 75 53, 85 43" } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.path 
        d="M 20 55 C 30 45, 45 42, 55 52 C 65 62, 70 58, 80 48" 
        stroke="currentColor" 
        strokeWidth="1.25" 
        opacity="0.5"
        animate={isHovered ? { d: "M 20 53 C 30 47, 45 40, 55 54 C 65 64, 70 56, 80 46" } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.3 }}
      />
      <motion.path 
        d="M 28 62 C 35 55, 45 52, 52 59 C 59 66, 65 62, 72 54" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        opacity="0.75"
        animate={isHovered ? { d: "M 28 60 C 35 57, 45 50, 52 61 C 59 68, 65 60, 72 52" } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.6 }}
      />
      <motion.path 
        d="M 38 68 C 42 63, 48 62, 52 66 C 56 70, 60 68, 64 62" 
        stroke="currentColor" 
        strokeWidth="1.75" 
        opacity="1"
        animate={isHovered ? { d: "M 38 66 C 42 65, 48 60, 52 68 C 56 72, 60 66, 64 60" } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.9 }}
      />

      {/* Surveying Instrument optical target / Reticle crosshair */}
      <motion.g
        animate={isHovered ? { 
          x: [0, 8, -6, 2, 0], 
          y: [0, -4, 5, -3, 0] 
        } : { x: 0, y: 0 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="45" cy="50" r="8" stroke="currentColor" strokeWidth="1.5" />
        <line x1="45" y1="38" x2="45" y2="62" stroke="currentColor" strokeWidth="0.75" />
        <line x1="33" y1="50" x2="57" y2="50" stroke="currentColor" strokeWidth="0.75" />
        {/* Pulsing focal point */}
        <circle cx="45" cy="50" r="1.5" fill="currentColor" />
        <motion.circle 
          cx="45" 
          cy="50" 
          r="4" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }} 
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: "45px 50px" }}
        />
      </motion.g>

      {/* Benchmark point coordinates box label */}
      <motion.g
        animate={isHovered ? { opacity: [0.7, 1, 0.7] } : { opacity: 0.8 }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="58" y="16" width="30" height="12" rx="2" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="0.5" />
        <text x="61" y="24" fill="currentColor" fontSize="5" fontFamily="monospace" fontWeight="bold">H: 142.5m</text>
        <circle cx="58" cy="28" r="1" fill="currentColor" />
        <line x1="58" y1="28" x2="58" y2="22" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
      </motion.g>
    </svg>
  );
}

function GisIcon({ isHovered, size, className }: { isHovered: boolean; size: number; className: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 3D Stacked Spatial Database Layers */}
      
      {/* LAYER 1: BASE MAP / ORTHOPHOTO LAYER (Bottom) */}
      <motion.g
        animate={isHovered ? { y: 2 } : { y: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Isometric sheet outline */}
        <polygon points="15,75 50,60 85,75 50,90" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" fill="currentColor" fillOpacity="0.02" />
        {/* Grid pattern lines inside bottom sheet */}
        <line x1="32.5" y1="67.5" x2="67.5" y2="82.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
        <line x1="32.5" y1="82.5" x2="67.5" y2="67.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
      </motion.g>

      {/* LAYER 2: VECTOR PARCELS / BOUNDARIES LAYER (Middle) */}
      <motion.g
        animate={isHovered ? { y: -2 } : { y: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Isometric middle sheet outline */}
        <polygon points="15,50 50,35 85,50 50,65" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="currentColor" fillOpacity="0.04" />
        {/* Cadastral Lot splits */}
        <path d="M 32.5 42.5 L 67.5 57.5 M 50 42.5 L 50 57.5 M 23 46.5 L 50 50 L 77 46.5" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.7" />
        
        {/* Interactive glowing parcel query */}
        <motion.polygon 
          points="32.5,42.5 50,35 67.5,42.5 50,50" 
          fill="currentColor" 
          fillOpacity="0.08" 
          animate={isHovered ? { fillOpacity: [0.05, 0.2, 0.05] } : { fillOpacity: 0.08 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.g>

      {/* LAYER 3: 3D BUILDINGS & ATTRIBUTES LAYER (Top) */}
      <motion.g
        animate={isHovered ? { y: -6 } : { y: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Isometric top sheet outline */}
        <polygon points="15,25 50,10 85,25 50,40" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.06" />
        
        {/* Extruded 3D Building Prism */}
        <g stroke="currentColor" strokeWidth="1.25">
          {/* Top Face */}
          <polygon points="45,18 55,14 65,18 55,22" fill="currentColor" fillOpacity="0.2" />
          {/* Left Face */}
          <polygon points="45,18 55,22 55,32 45,28" fill="currentColor" fillOpacity="0.1" />
          {/* Right Face */}
          <polygon points="55,22 65,18 65,28 55,32" fill="currentColor" fillOpacity="0.15" />
        </g>

        {/* Connected Network Node points */}
        <circle cx="30" cy="22" r="2" fill="currentColor" />
        <circle cx="70" cy="22" r="2" fill="currentColor" />
        <circle cx="50" cy="30" r="2" fill="currentColor" />
        <line x1="30" y1="22" x2="50" y2="30" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
        <line x1="70" y1="22" x2="50" y2="30" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />

        {/* Glowing query node */}
        <motion.circle 
          cx="30" cy="22" r="4" 
          stroke="currentColor" strokeWidth="0.5" 
          animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: "30px 22px" }}
        />
      </motion.g>

      {/* Vertical Data Flow Pipeline Connector */}
      <line x1="50" y1="25" x2="50" y2="75" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" opacity="0.3" />
      <motion.circle 
        cx="50" cy="25" r="2" fill="currentColor"
        animate={isHovered ? { cy: [25, 75] } : { cy: 25 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function UavIcon({ isHovered, size, className }: { isHovered: boolean; size: number; className: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* UAV Drone Frame Chassis */}
      <motion.g
        animate={isHovered ? { y: [0, -3, 3, 0] } : { y: 0 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Core fuselage */}
        <rect x="42" y="22" width="16" height="12" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="28" r="3.5" fill="currentColor" />
        
        {/* Rotor structural arms */}
        <line x1="30" y1="18" x2="70" y2="38" stroke="currentColor" strokeWidth="1.75" />
        <line x1="30" y1="38" x2="70" y2="18" stroke="currentColor" strokeWidth="1.75" />

        {/* Four Propeller Rotors */}
        {/* Rotor Top-Left */}
        <circle cx="30" cy="18" r="2.5" fill="currentColor" />
        <motion.ellipse 
          cx="30" cy="18" rx="10" ry="1.5" 
          stroke="currentColor" strokeWidth="0.75" 
          strokeOpacity="0.6"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "30px 18px" }}
        />

        {/* Rotor Top-Right */}
        <circle cx="70" cy="18" r="2.5" fill="currentColor" />
        <motion.ellipse 
          cx="70" cy="18" rx="10" ry="1.5" 
          stroke="currentColor" strokeWidth="0.75" 
          strokeOpacity="0.6"
          animate={{ rotate: -360 }}
          transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "70px 18px" }}
        />

        {/* Rotor Bottom-Left */}
        <circle cx="30" cy="38" r="2.5" fill="currentColor" />
        <motion.ellipse 
          cx="30" cy="38" rx="10" ry="1.5" 
          stroke="currentColor" strokeWidth="0.75" 
          strokeOpacity="0.6"
          animate={{ rotate: -360 }}
          transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "30px 38px" }}
        />

        {/* Rotor Bottom-Right */}
        <circle cx="70" cy="38" r="2.5" fill="currentColor" />
        <motion.ellipse 
          cx="70" cy="38" rx="10" ry="1.5" 
          stroke="currentColor" strokeWidth="0.75" 
          strokeOpacity="0.6"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "70px 38px" }}
        />

        {/* Laser scanner payload lens */}
        <path d="M 47 34 L 53 34 L 51 38 L 49 38 Z" fill="currentColor" />
        <circle cx="50" cy="39" r="1.5" fill="currentColor" />

        {/* Downward laser projection scanner cone */}
        <motion.g
          initial={{ opacity: 0.2 }}
          animate={isHovered ? { opacity: [0.2, 0.7, 0.2] } : { opacity: 0.3 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <polygon points="50,40 15,82 85,82" fill="url(#laser-scan-gradient-services)" opacity="0.15" />
          <line x1="50" y1="40" x2="15" y2="82" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="50" y1="40" x2="85" y2="82" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        </motion.g>
      </motion.g>

      {/* Target scanning terrain grid / LiDAR point cloud below */}
      <g opacity="0.75">
        <path d="M 15 82 Q 35 72, 50 82 T 85 82" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.4" />
        <path d="M 15 86 Q 35 78, 50 86 T 85 86" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.2" />
        {/* Individual LiDAR scanned coordinate points */}
        <circle cx="28" cy="78" r="1" fill="currentColor" />
        <circle cx="36" cy="81" r="1" fill="currentColor" />
        <circle cx="44" cy="77" r="1.25" fill="currentColor" />
        <circle cx="52" cy="83" r="1" fill="currentColor" />
        <circle cx="62" cy="79" r="1" fill="currentColor" />
        <circle cx="71" cy="82" r="1.25" fill="currentColor" />
      </g>

      <defs>
        <linearGradient id="laser-scan-gradient-services" x1="50" y1="40" x2="50" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ServiceIcon({ id, isHovered, size = 36, className = "" }: { id: string; isHovered: boolean; size?: number; className?: string }) {
  const iconColor = className.includes("text-") ? className : "text-sky-400";
  
  if (id === "topo") {
    return (
      <div className="relative flex items-center justify-center">
        {isHovered && size < 100 && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-sky-400 pointer-events-none"
          />
        )}
        <TopographyIcon isHovered={isHovered} size={size} className={iconColor} />
      </div>
    );
  }

  if (id === "foncier") {
    return (
      <div className="relative flex items-center justify-center">
        {isHovered && size < 100 && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-emerald-400 pointer-events-none"
          />
        )}
        <GisIcon isHovered={isHovered} size={size} className={className.includes("text-") ? className : "text-emerald-400"} />
      </div>
    );
  }

  if (id === "sig") {
    return (
      <div className="relative flex items-center justify-center">
        {isHovered && size < 100 && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-sky-400 pointer-events-none"
          />
        )}
        <UavIcon isHovered={isHovered} size={size} className={iconColor} />
      </div>
    );
  }

  // Fallback icon
  return <Compass size={size} className={`${iconColor} ${className}`} />;
}

function ServiceCard({ service, idx, navigate, lang, isRTL }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.03,
        y: -8,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
      }}
      className="group glass-card p-12 rounded-[4rem] relative overflow-hidden flex flex-col min-h-[580px] border border-white/5 hover:border-sky-500/30 transition-colors duration-500"
    >
      <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
        <ServiceIcon id={service.id} isHovered={isHovered} size={140} className="text-white" />
      </div>
      
      <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-12 group-hover:bg-sky-500/20 transition-all duration-500 border border-white/5 group-hover:border-sky-400/30">
        <ServiceIcon id={service.id} isHovered={isHovered} size={36} />
      </div>
      
      <h4 className="text-3xl font-black mb-6 text-white group-hover:text-sky-400 transition-colors uppercase italic tracking-tighter">
        {service.title}
      </h4>
      
      <p className="text-gray-400 leading-relaxed mb-6 font-light">
        {service.desc}
      </p>

      {/* Technical Detail Text revealed on hover */}
      {service.techDetails && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isHovered ? "auto" : 0, 
            opacity: isHovered ? 1 : 0,
            marginBottom: isHovered ? 24 : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="p-5 rounded-2xl bg-sky-500/5 border border-sky-400/10 text-xs text-sky-200 font-mono leading-relaxed" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 block mb-2">
              {lang === 'fr' ? 'Spécifications Techniques :' : 'المواصفات التقنية:'}
            </span>
            {service.techDetails}
          </div>
        </motion.div>
      )}
      
      <ul className="space-y-4 mb-12 mt-auto">
        {service.features?.map((feat, fIdx) => (
          <li key={fIdx} className="flex items-center gap-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
            <div className="w-5 h-5 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400">
              <CheckCircle2 size={12} />
            </div>
            <span>{feat}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        onClick={() => navigate('/contact')}
        variant="outline" 
        className="w-full rounded-2xl border-white/10 text-white hover:bg-sky-500 hover:border-sky-500 text-[10px] font-black uppercase tracking-widest py-8 transition-all duration-500 flex items-center justify-center gap-3"
      >
        {lang === 'fr' ? 'Demander un devis' : 'طلب عرض سعر'} 
        <ChevronRight size={16} className={isRTL ? 'rotate-180' : ''} />
      </Button>
    </motion.div>
  );
}

export default function Services() {
  const { t, lang, isRTL } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="pb-24">
      <SEO page="services" />
      {/* Header */}
      <section className="bg-black text-white py-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-cover bg-center grayscale" style={{ backgroundImage: `url(${geomaticsOfficeImg})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2 rounded-full">
                <Satellite className="text-sky-400" size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">{lang === 'fr' ? 'Expertises Techniques' : 'خبرات تقنية'}</span>
              </div>
              <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">
                  {lang === 'fr' ? 'Disponibilité : Projets Ouverts' : 'المشاريع: متاحة حالياً'}
                </span>
              </div>
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black mb-12 tracking-tighter uppercase italic leading-[0.85]">
              {lang === 'fr' ? 'Solutions' : 'حلول'} <br />
              <span className="text-sky-400 not-italic font-light">{lang === 'fr' ? 'Géospatiales' : 'جيومكانية'}</span>
            </h1>
            <p className="text-2xl text-gray-400 leading-relaxed font-light max-w-2xl">
              {t.services.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-40 max-w-7xl mx-auto px-6">
        <ScrollReveal variant="staggerContainer" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((service, idx) => (
            <ServiceCard 
              key={service.title}
              service={service}
              idx={idx}
              navigate={navigate}
              lang={lang}
              isRTL={isRTL}
            />
          ))}
        </ScrollReveal>
      </section>

      {/* Interactive GNSS/RTK Precision Lab */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <ScrollReveal variant="fadeUp">
          <GnssSimulator />
        </ScrollReveal>
      </section>

      {/* Comparison Section */}
      <section className="bg-black py-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(52,170,220,0.05),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal variant="fadeUp" className="text-center mb-32 space-y-6">
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2 rounded-full">
              <Layers className="text-sky-400" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">{lang === 'fr' ? 'Innovation' : 'ابتكار'}</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-tight">
              {lang === 'fr' ? 'Précision' : 'دقة'} <span className="text-sky-400 not-italic font-light">{lang === 'fr' ? 'Technologique' : 'تكنولوجية'}</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-16 rounded-[4rem] border-white/5 space-y-10"
              >
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-sky-500/10 rounded-3xl flex items-center justify-center text-sky-400 border border-sky-400/20">
                    <Satellite size={40} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter">{lang === 'fr' ? 'SIG Avancé' : 'SIG متقدم'}</h4>
                    <p className="text-sky-400 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Intelligence Spatiale</p>
                  </div>
                </div>
                <p className="text-gray-400 text-lg font-light leading-relaxed">
                  {lang === 'fr' 
                    ? "Nos systèmes d'information géographique permettent une gestion dynamique et intelligente de vos données territoriales pour une aide à la décision optimale."
                    : "تسمح نظم المعلومات الجغرافية لدينا بإدارة ديناميكية وذكية لبياناتكم الترابية للمساعدة في اتخاذ القرار الأمثل."}
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-16 rounded-[4rem] border-white/5 space-y-10"
              >
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-sky-500/10 rounded-3xl flex items-center justify-center text-sky-400 border border-sky-400/20">
                    <Layers size={40} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter">{lang === 'fr' ? 'Modélisation 3D' : 'نمذجة ثلاثية الأبعاد'}</h4>
                    <p className="text-sky-400 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Digital Twin</p>
                  </div>
                </div>
                <p className="text-gray-400 text-lg font-light leading-relaxed">
                  {lang === 'fr' 
                    ? "Création de jumeaux numériques de haute précision via LiDAR et photogrammétrie pour une visualisation immersive de vos projets."
                    : "إنشاء توائم رقمية عالية الدقة عبر LiDAR والتصوير المساحي لتصور غامر لمشاريعكم."}
                </p>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <FAQ />
    </div>
  );
}
