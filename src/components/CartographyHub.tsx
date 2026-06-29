import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Map as MapIcon, 
  Layers, 
  MapPin, 
  Compass, 
  Database, 
  Search, 
  Info, 
  Activity, 
  Maximize2, 
  Sliders, 
  CheckCircle,
  Eye, 
  RefreshCw,
  TrendingUp,
  Award,
  BookOpen
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "@/components/ui/button";
import gisDataAnalyticsImg from "../assets/images/gis_data_analytics_1782099045595.jpg";
import gisAnalysisImg from "../assets/images/gis_analysis_1782352722617.jpg";
import subdivisionMappingImg from "../assets/images/subdivision_mapping_1782352708876.jpg";

interface District {
  nameFr: string;
  nameAr: string;
  x: number; // percentage from left
  y: number; // percentage from top
  typeFr: string;
  typeAr: string;
  area: string;
  population: string;
}

export default function CartographyHub() {
  const { lang, isRTL } = useLanguage();
  
  // Interactive layer selection
  const [activeBase, setActiveBase] = useState<"gis" | "subdivision" | "analysis">("gis");
  const [showCadastre, setShowCadastre] = useState(true);
  const [showInfrastructure, setShowInfrastructure] = useState(false);
  const [showContours, setShowContours] = useState(true);
  
  // Interactive Search & Highlight
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedDistrict, setHighlightedDistrict] = useState<District | null>(null);
  
  // Hover & Coordinates tracking
  const [hoverCoord, setHoverCoord] = useState({ lat: 33.5731, lng: -7.5898, x: 0, y: 0 });
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"viewer" | "stats">("viewer");

  const districts: District[] = useMemo(() => [
    { nameFr: "Anfa", nameAr: "أنفا", x: 28, y: 40, typeFr: "Historique / Résidentiel", typeAr: "تاريخي / سكني", area: "14.2 km²", population: "95,000" },
    { nameFr: "Maârif", nameAr: "المعاريف", x: 42, y: 55, typeFr: "Commercial / Affaires", typeAr: "تجاري / أعمال", area: "12.4 km²", population: "180,000" },
    { nameFr: "Sidi Belyout", nameAr: "سيدي بليوط", x: 50, y: 30, typeFr: "Port / Centre financier", typeAr: "الميناء / المركز المالي", area: "10.8 km²", population: "210,000" },
    { nameFr: "Ain Diab", nameAr: "عين الذئاب", x: 15, y: 62, typeFr: "Touristique / Littoral", typeAr: "سياحي / ساحلي", area: "18.5 km²", population: "45,000" },
    { nameFr: "Roches Noires", nameAr: "الصخور السوداء", x: 75, y: 25, typeFr: "Industriel / Logistique", typeAr: "صناعي / لوجستي", area: "15.1 km²", population: "120,000" },
    { nameFr: "Gauthier", nameAr: "غوتييه", x: 38, y: 32, typeFr: "Résidentiel Premium", typeAr: "سكني راقي", area: "5.5 km²", population: "35,000" }
  ], []);

  // Filter districts by search
  const filteredDistricts = useMemo(() => {
    if (!searchQuery) return districts;
    return districts.filter(d => 
      d.nameFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nameAr.includes(searchQuery)
    );
  }, [searchQuery, districts]);

  // Handle map interaction
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const handleMapMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapContainerRef.current) return;
    const bounds = mapContainerRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    
    // Convert to percentage
    const xp = (x / bounds.width) * 100;
    const yp = (y / bounds.height) * 100;

    // Simulate Casablanca geographic coordinates centered around: lat 33.5731, lng -7.5898
    // Anfa/Maarif area mapping
    const lat = 33.5950 - (yp / 100) * 0.05;
    const lng = -7.6300 + (xp / 100) * 0.08;

    // Find if hovering near any district
    let foundDistrict = null;
    for (const d of districts) {
      const dist = Math.sqrt(Math.pow(d.x - xp, 2) + Math.pow(d.y - yp, 2));
      if (dist < 8) {
        foundDistrict = d;
        break;
      }
    }

    setHoverCoord({ lat, lng, x, y });
    setHoveredZone(foundDistrict ? (lang === "fr" ? foundDistrict.nameFr : foundDistrict.nameAr) : null);
  };

  // Select image based on active tab
  const baseMapImage = useMemo(() => {
    switch (activeBase) {
      case "analysis":
        return gisAnalysisImg;
      case "subdivision":
        return subdivisionMappingImg;
      case "gis":
      default:
        return gisDataAnalyticsImg;
    }
  }, [activeBase]);

  return (
    <div className="glass-card p-8 md:p-14 rounded-[4rem] border-white/5 bg-zinc-950/30 backdrop-blur-3xl relative overflow-hidden">
      
      {/* Decorative ambient lights */}
      <div className="absolute top-0 right-1/4 w-[30rem] h-[30rem] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-[20rem] h-[20rem] bg-sky-400/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Header Info Panel */}
      <div className={`flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12 border-b border-white/5 pb-10 ${isRTL ? "xl:flex-row-reverse text-right" : "text-left"}`}>
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 bg-sky-500/10 border border-sky-400/20 px-4 py-2 rounded-full">
            <MapIcon className="text-sky-400 animate-pulse" size={12} />
            <span className="text-[9px] font-mono font-black uppercase tracking-[0.25em] text-sky-400">
              {lang === 'fr' ? 'PLATEFORME SIG INTERACTIVE' : 'منصة المعلومات الجغرافية التفاعلية'}
            </span>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
            {lang === 'fr' ? 'HUB CARTOGRAPHIQUE' : 'مركز الخرائط التفاعلي'} <br />
            <span className="text-sky-400 not-italic font-light">{lang === 'fr' ? 'DE CASABLANCA' : 'للدار البيضاء'}</span>
          </h3>
          
          <p className="text-sm text-gray-400 font-light max-w-2xl leading-relaxed">
            {lang === 'fr' 
              ? "Explorez les données géospatiales de la métropole. Activez et désactivez les couches cadastrales, d'infrastructures et de nivellement pour comprendre la structure territoriale de Casablanca." 
              : "استكشف البيانات الجيومكانية لمدينة الدار البيضاء. تحكّم في طبقات المسح العقاري، شبكات البنية التحتية، وخطوط الارتفاع لفهم الهيكلة الترابية للعاصمة الاقتصادية."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 self-start xl:self-center bg-white/5 p-1.5 rounded-2xl border border-white/5">
          <button
            onClick={() => setActiveTab("viewer")}
            className={`px-6 py-3 rounded-xl text-[10px] font-mono font-black uppercase tracking-widest transition-all ${
              activeTab === "viewer" ? "bg-sky-500 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            {lang === "fr" ? "VISIONNEUSE SIG" : "مستعرض الخرائط"}
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-6 py-3 rounded-xl text-[10px] font-mono font-black uppercase tracking-widest transition-all ${
              activeTab === "stats" ? "bg-sky-500 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            {lang === "fr" ? "ANALYSES & STATS" : "التحليلات والإحصائيات"}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "viewer" ? (
          <motion.div
            key="viewer-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* LEFT COLUMN: CONTROL PANEL */}
            <div className="lg:w-1/3 space-y-8">
              
              {/* SEARCH & LOCATE */}
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 space-y-4">
                <h4 className={`text-xs font-mono font-black text-sky-400 uppercase tracking-widest ${isRTL ? "text-right" : "text-left"}`}>
                  {lang === "fr" ? "Localiser un quartier" : "تحديد موقع حي سكني"}
                </h4>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={lang === "fr" ? "Rechercher Maârif, Anfa..." : "ابحث عن المعاريف، أنفا..."}
                    className={`w-full bg-black/40 border border-white/10 rounded-2xl h-12 px-5 text-xs text-white focus:outline-none focus:border-sky-400 transition-colors ${
                      isRTL ? "text-right pl-10 pr-5" : "text-left pl-5 pr-10"
                    }`}
                  />
                  <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${isRTL ? "left-4" : "right-4"}`} size={16} />
                </div>

                {searchQuery && (
                  <div className="max-h-40 overflow-y-auto space-y-2 pt-2 scrollbar-thin">
                    {filteredDistricts.map((d) => (
                      <button
                        key={d.nameFr}
                        onClick={() => {
                          setHighlightedDistrict(d);
                          // clear search to highlight
                          setSearchQuery("");
                        }}
                        className={`w-full text-left p-3 rounded-xl bg-white/5 hover:bg-sky-500/10 hover:text-sky-400 text-[11px] flex justify-between items-center transition-colors ${
                          isRTL ? "flex-row-reverse text-right" : ""
                        }`}
                      >
                        <span className="font-semibold text-white">
                          {lang === "fr" ? d.nameFr : d.nameAr}
                        </span>
                        <span className="text-[9px] text-gray-500 uppercase font-mono">
                          {lang === "fr" ? d.typeFr : d.typeAr}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {highlightedDistrict && (
                  <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-mono text-sky-400 uppercase tracking-wider">Target Highlighted</p>
                      <h5 className="text-sm font-black text-white">
                        {lang === "fr" ? highlightedDistrict.nameFr : highlightedDistrict.nameAr}
                      </h5>
                    </div>
                    <button
                      onClick={() => setHighlightedDistrict(null)}
                      className="text-[9px] font-mono text-gray-400 hover:text-white uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded"
                    >
                      {lang === "fr" ? "EFFACER" : "إلغاء"}
                    </button>
                  </div>
                )}
              </div>

              {/* COUCHES (LAYERS SELECTOR) */}
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 space-y-6">
                <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                  <Layers size={16} className="text-sky-400" />
                  <h4 className="text-xs font-mono font-black text-white uppercase tracking-widest">
                    {lang === "fr" ? "Gestion des Couches" : "إدارة طبقات الخرائط"}
                  </h4>
                </div>

                <div className="space-y-4">
                  {/* Cadastre */}
                  <div className={`flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                      <CheckCircle size={14} className={showCadastre ? "text-sky-400 animate-pulse" : "text-gray-600"} />
                      <div>
                        <span className="text-xs font-black text-white uppercase tracking-wider block">
                          {lang === "fr" ? "Plans Cadastraux" : "التحديد العقاري"}
                        </span>
                        <span className="text-[9px] text-gray-500 block">
                          {lang === "fr" ? "Limites des parcelles foncières" : "حدود الرسوم والملكيات العقارية"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowCadastre(!showCadastre)}
                      className={`w-10 h-6 rounded-full transition-colors relative ${showCadastre ? "bg-sky-500" : "bg-white/10"}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                        showCadastre ? (isRTL ? "left-1 translate-x-0" : "right-1 translate-x-0") : (isRTL ? "right-1" : "left-1")
                      }`} />
                    </button>
                  </div>

                  {/* Infrastructure */}
                  <div className={`flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                      <Activity size={14} className={showInfrastructure ? "text-emerald-400" : "text-gray-600"} />
                      <div>
                        <span className="text-xs font-black text-white uppercase tracking-wider block">
                          {lang === "fr" ? "Réseau d'Infrastructures" : "شبكات البنية التحتية"}
                        </span>
                        <span className="text-[9px] text-gray-500 block">
                          {lang === "fr" ? "Réseaux électriques & routiers" : "شبكات الكهرباء، الماء والطرق"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowInfrastructure(!showInfrastructure)}
                      className={`w-10 h-6 rounded-full transition-colors relative ${showInfrastructure ? "bg-emerald-500" : "bg-white/10"}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                        showInfrastructure ? (isRTL ? "left-1 translate-x-0" : "right-1 translate-x-0") : (isRTL ? "right-1" : "left-1")
                      }`} />
                    </button>
                  </div>

                  {/* Topography Contours */}
                  <div className={`flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                      <Compass size={14} className={showContours ? "text-amber-400" : "text-gray-600"} />
                      <div>
                        <span className="text-xs font-black text-white uppercase tracking-wider block">
                          {lang === "fr" ? "Courbes de Niveau" : "خطوط الارتفاع الطبوغرافية"}
                        </span>
                        <span className="text-[9px] text-gray-500 block">
                          {lang === "fr" ? "Modèle numérique d'élévation" : "بيانات الارتفاعات والتضاريس"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowContours(!showContours)}
                      className={`w-10 h-6 rounded-full transition-colors relative ${showContours ? "bg-amber-500" : "bg-white/10"}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                        showContours ? (isRTL ? "left-1 translate-x-0" : "right-1 translate-x-0") : (isRTL ? "right-1" : "left-1")
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* BASEMAP SELECTOR */}
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 space-y-4">
                <h4 className={`text-xs font-mono font-black text-white uppercase tracking-widest ${isRTL ? "text-right" : "text-left"}`}>
                  {lang === "fr" ? "Sélectionner la Carte de Base" : "خريطة الأساس"}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "gis", fr: "Analytique", ar: "تحليلية" },
                    { id: "subdivision", fr: "Parcellaire", ar: "عقارية" },
                    { id: "analysis", fr: "LiDAR SIG", ar: "ليدار" }
                  ].map((mapType) => (
                    <button
                      key={mapType.id}
                      onClick={() => setActiveBase(mapType.id as any)}
                      className={`p-3 rounded-xl text-[9px] font-mono font-black uppercase tracking-widest border transition-all ${
                        activeBase === mapType.id
                          ? "bg-sky-500/20 border-sky-400 text-sky-400"
                          : "bg-black/30 border-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      {lang === "fr" ? mapType.fr : mapType.ar}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: INTERACTIVE MAP RENDERER */}
            <div className="lg:w-2/3 space-y-6">
              
              {/* INTERACTIVE MAP FRAME */}
              <div 
                ref={mapContainerRef}
                onMouseMove={handleMapMouseMove}
                className="relative aspect-[16/10] w-full rounded-[3rem] overflow-hidden bg-black border border-white/10 select-none group cursor-crosshair shadow-2xl"
              >
                {/* Background Base Image Map */}
                <img 
                  src={baseMapImage} 
                  alt="Casablanca Map" 
                  className="w-full h-full object-cover opacity-75 group-hover:scale-[1.01] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Vector Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

                {/* Simulated Cadastre Overlays */}
                {showCadastre && (
                  <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen bg-[linear-gradient(45deg,rgba(14,165,233,0.04)_25%,transparent_25%),linear-gradient(-45deg,rgba(14,165,233,0.04)_25%,transparent_25%)]" style={{ backgroundSize: "60px 60px" }}>
                    {/* Render subtle vectors for parcels */}
                    <svg className="absolute inset-0 w-full h-full text-sky-400/30" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50,100 L200,150 L350,120 L400,280 L250,320 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
                      <path d="M400,120 L550,160 L600,290 L450,250 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
                      <path d="M150,300 L300,380 L280,450 L120,400 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
                      <path d="M500,320 L700,350 L680,480 L480,420 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
                    </svg>
                  </div>
                )}

                {/* Simulated Infrastructure Network Overlay */}
                {showInfrastructure && (
                  <div className="absolute inset-0 pointer-events-none opacity-70">
                    <svg className="absolute inset-0 w-full h-full text-emerald-400" xmlns="http://www.w3.org/2000/svg">
                      {/* Power grid or transit line indicators */}
                      <path d="M 0,150 Q 200,100 400,220 T 800,180" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M 120,0 L 250,220 L 400,500" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
                      <path d="M 350,500 L 500,220 L 750,0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
                      {/* Pulsing joints */}
                      <circle cx="250" cy="220" r="4" fill="currentColor" className="animate-ping" />
                      <circle cx="500" cy="220" r="4" fill="currentColor" className="animate-ping" />
                    </svg>
                  </div>
                )}

                {/* Simulated Elevation Topo Contours */}
                {showContours && (
                  <div className="absolute inset-0 pointer-events-none opacity-50">
                    <svg className="absolute inset-0 w-full h-full text-amber-500/40" xmlns="http://www.w3.org/2000/svg">
                      {/* Contour elevation loops */}
                      <circle cx="350" cy="240" r="280" fill="none" stroke="currentColor" strokeWidth="1" />
                      <circle cx="350" cy="240" r="210" fill="none" stroke="currentColor" strokeWidth="1" />
                      <circle cx="350" cy="240" r="150" fill="none" stroke="currentColor" strokeWidth="1" />
                      <circle cx="350" cy="240" r="100" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="350" cy="240" r="50" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <text x="355" y="195" fill="currentColor" className="text-[7px] font-mono">110m</text>
                      <text x="355" y="145" fill="currentColor" className="text-[7px] font-mono">80m</text>
                    </svg>
                  </div>
                )}

                {/* District Marker Pins */}
                {districts.map((d) => {
                  const isHighlighted = highlightedDistrict?.nameFr === d.nameFr;
                  return (
                    <motion.div
                      key={d.nameFr}
                      style={{ left: `${d.x}%`, top: `${d.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
                      animate={{ scale: isHighlighted ? 1.2 : 1 }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setHighlightedDistrict(d);
                        }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                          isHighlighted 
                            ? "bg-sky-500 border-white shadow-[0_0_15px_#0ea5e9]" 
                            : "bg-black/80 border-sky-400/80 hover:bg-sky-500 hover:border-white"
                        }`}
                      >
                        <MapPin size={10} className="text-white" />
                      </button>
                      <div className="bg-black/80 border border-white/10 px-2 py-0.5 rounded mt-1 shadow-lg pointer-events-none">
                        <span className="text-[8px] font-black uppercase tracking-wider text-white">
                          {lang === "fr" ? d.nameFr : d.nameAr}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Highlight Circle overlay if target is selected */}
                {highlightedDistrict && (
                  <motion.div
                    style={{ left: `${highlightedDistrict.x}%`, top: `${highlightedDistrict.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-sky-400/50 rounded-full pointer-events-none flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.5, 0.2] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <div className="w-12 h-12 bg-sky-500/10 rounded-full" />
                  </motion.div>
                )}

                {/* HUD Overlay - Top Left Compass */}
                <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-3">
                  <Compass className="text-sky-400 animate-spin" style={{ animationDuration: '30s' }} size={24} />
                  <div>
                    <span className="text-[8px] font-mono text-gray-400 block uppercase">ORIENTATION</span>
                    <span className="text-[10px] font-mono font-black text-white block">N 12° 24' 15" E</span>
                  </div>
                </div>

                {/* HUD Overlay - Bottom Left Coord Feed */}
                <div className="absolute bottom-6 left-6 bg-black/75 backdrop-blur-md border border-white/10 p-5 rounded-2xl space-y-1 text-left font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    <span className="text-[8px] font-bold text-sky-400 uppercase tracking-widest">LIVE COORDINATES</span>
                  </div>
                  <span className="text-[11px] font-black text-white block">
                    LAT: {hoverCoord.lat.toFixed(5)}° N
                  </span>
                  <span className="text-[11px] font-black text-white block">
                    LNG: {hoverCoord.lng.toFixed(5)}° W
                  </span>
                  <span className="text-[9px] text-gray-500 block uppercase">
                    ZONE: {hoveredZone || (lang === "fr" ? "Océan / Hors-zone" : "خارج النطاق")}
                  </span>
                </div>

                {/* HUD Overlay - Bottom Right Quick Stats */}
                <div className="absolute bottom-6 right-6 bg-black/75 backdrop-blur-md border border-white/10 p-5 rounded-2xl text-right font-mono hidden sm:block">
                  <span className="text-[8px] font-bold text-gray-400 block uppercase">ELEVATION</span>
                  <span className="text-sm font-black text-amber-400 block">
                    {(25 + Math.sin(hoverCoord.lat * 1000) * 12).toFixed(1)} m
                  </span>
                  <span className="text-[8px] text-gray-500 block uppercase">MÉTHODE: LiDAR MOBILE</span>
                </div>
              </div>

              {/* CURRENTLY HOVERED DISTRICT DETAILS CARD */}
              <AnimatePresence mode="wait">
                {highlightedDistrict ? (
                  <motion.div
                    key={highlightedDistrict.nameFr}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className={`bg-sky-500/5 border border-sky-500/20 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${
                      isRTL ? "sm:flex-row-reverse text-right" : "text-left"
                    }`}
                  >
                    <div>
                      <span className="text-[9px] font-mono font-black text-sky-400 uppercase tracking-widest">
                        {lang === "fr" ? "STATISTIQUES DE DISTRICT : " : "بيانات المنطقة المحددة : "}
                        {highlightedDistrict.nameFr}
                      </span>
                      <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter mt-1">
                        {lang === "fr" ? highlightedDistrict.nameFr : highlightedDistrict.nameAr}
                      </h4>
                      <p className="text-xs text-gray-400 mt-2 font-light">
                        {lang === "fr" ? "Type Territorial : " : "التصنيف الترابي : "}
                        <strong className="text-white">{lang === "fr" ? highlightedDistrict.typeFr : highlightedDistrict.typeAr}</strong>
                      </p>
                    </div>

                    <div className={`flex gap-6 font-mono ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                      <div>
                        <span className="text-[8px] text-gray-500 block uppercase">{lang === "fr" ? "Superficie" : "المساحة"}</span>
                        <span className="text-sm font-black text-white">{highlightedDistrict.area}</span>
                      </div>
                      <div className="w-px h-8 bg-white/10 self-center" />
                      <div>
                        <span className="text-[8px] text-gray-500 block uppercase">{lang === "fr" ? "Population Est." : "السكان المقدر"}</span>
                        <span className="text-sm font-black text-white">{highlightedDistrict.population}</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className={`p-6 border border-white/5 bg-white/[0.01] rounded-3xl text-xs text-gray-500 font-light flex items-center gap-3 ${
                    isRTL ? "flex-row-reverse text-right" : "text-left"
                  }`}>
                    <Info size={14} className="text-sky-400" />
                    <span>
                      {lang === "fr"
                        ? "Cliquez sur l'un des repères géographiques ou utilisez la barre de recherche pour visualiser les caractéristiques d'un quartier de Casablanca."
                        : "اضغط على أحد المؤشرات الملونة أو ابحث عن حي للحصول على الإحصائيات الجغرافية الكاملة الخاصة به."}
                    </span>
                  </div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        ) : (
          <motion.div
            key="stats-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* STAT 1: INTEGRATION RATE */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6">
              <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400">
                <Database size={24} />
              </div>
              <h4 className={`text-xl font-black text-white uppercase italic tracking-tighter ${isRTL ? "text-right" : "text-left"}`}>
                {lang === "fr" ? "Intégrité des Données" : "سلامة البيانات"}
              </h4>
              <p className={`text-xs text-gray-400 font-light leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                {lang === "fr"
                  ? "Toutes nos couches géospatiales de Casablanca sont indexées sous base de données géospatiale PostgreSQL/PostGIS hautement optimisée."
                  : "جميع الطبقات البيانية للدار البيضاء تمت فهرفتها على قاعدة بيانات PostgreSQL/PostGIS لضمان التوافق المطلق."}
              </p>
              <div className="flex items-baseline gap-2 pt-4">
                <span className="text-4xl font-black text-white">99.8%</span>
                <span className="text-[9px] font-mono text-emerald-400 font-black uppercase">CONCORDANCE</span>
              </div>
            </div>

            {/* STAT 2: COUVERTURE TERRITORIALE */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400">
                <Maximize2 size={24} />
              </div>
              <h4 className={`text-xl font-black text-white uppercase italic tracking-tighter ${isRTL ? "text-right" : "text-left"}`}>
                {lang === "fr" ? "Couverture Métropole" : "التغطية الشاملة"}
              </h4>
              <p className={`text-xs text-gray-400 font-light leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                {lang === "fr"
                  ? "De Nouaceur au port de Casablanca, la plateforme offre un maillage géodésique complet assurant la cohérence géospatiale."
                  : "من النواصر إلى ميناء الدار البيضاء، توفر المنصة تغطية شاملة تدعم دقة عمليات المسح والتخطيط الحضري."}
              </p>
              <div className="flex items-baseline gap-2 pt-4">
                <span className="text-4xl font-black text-white">1,200+</span>
                <span className="text-[9px] font-mono text-amber-400 font-black uppercase">KM² MODÉLISÉS</span>
              </div>
            </div>

            {/* STAT 3: DÉCISIONNEL */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                <TrendingUp size={24} />
              </div>
              <h4 className={`text-xl font-black text-white uppercase italic tracking-tighter ${isRTL ? "text-right" : "text-left"}`}>
                {lang === "fr" ? "Aide à la Décision" : "دعم اتخاذ القرار"}
              </h4>
              <p className={`text-xs text-gray-400 font-light leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                {lang === "fr"
                  ? "Utilisation de rapports géomatiques avancés pour planifier les chantiers d'infrastructure clés de la métropole."
                  : "توظيف التقارير الجيومكانية عالية الدقة لتخطيط وتنزيل مشاريع البنية التحتية الكبرى للولاية."}
              </p>
              <div className="flex items-baseline gap-2 pt-4">
                <span className="text-4xl font-black text-white">50+</span>
                <span className="text-[9px] font-mono text-emerald-400 font-black uppercase">COUCHES DISPONIBLES</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
