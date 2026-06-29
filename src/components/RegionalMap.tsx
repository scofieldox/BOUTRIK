import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Compass, 
  Cpu, 
  Activity, 
  Satellite, 
  Layers, 
  Eye, 
  Maximize2, 
  Search, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Navigation,
  Sparkles,
  Info,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { projects } from '../data/projects';
import moroccoGeologicalMapImg from '../mappmorocco.jpg';

interface MapPoint {
  id: string;
  projectId?: string;
  nameFr: string;
  nameAr: string;
  cityFr: string;
  cityAr: string;
  lat: number;
  lng: number;
  typeFr: string;
  typeAr: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'MONITORING';
  precision: string;
  equipment: string;
  category: 'Topography' | 'GIS' | 'UAV';
}

// Surveyed locations - defined outside component to easily reference for dynamic state initialization
const mapPoints: MapPoint[] = [
  {
    id: 'nador-med',
    projectId: 'infrastructure-nador',
    nameFr: 'Infrastructure Nador West Med Port',
    nameAr: 'مرفأ ميناء الناظور غرب المتوسط',
    cityFr: 'Nador',
    cityAr: 'الناظور',
    lat: 35.1681,
    lng: -2.9335,
    typeFr: 'Suivi Bathymétrique & Scanner Laser 3D',
    typeAr: 'المتابعة الأعماقية والمسح الليزري ثلاثي الأبعاد',
    status: 'COMPLETED',
    precision: '±2mm Planimétrique',
    equipment: 'Leica TS16, RTK GS18, Echo-sondeur Bathymétrique',
    category: 'Topography'
  },
  {
    id: 'armila-driouch',
    projectId: 'modelisation-armila',
    nameFr: "Modélisation Procédurale 3D d'Armila",
    nameAr: 'النمذجة الإجرائية ثلاثية الأبعاد لأرميلة',
    cityFr: 'Province de Driouch',
    cityAr: 'إقليم الدريوش',
    lat: 35.0931,
    lng: -3.4258,
    typeFr: 'Modélisation Procédurale CGA & SIG',
    typeAr: 'النمذجة الإجرائية والأنظمة الجغرافية',
    status: 'COMPLETED',
    precision: '100% Modèle SIG Intégral',
    equipment: 'ArcGIS Enterprise, Esri CityEngine, Drone Photogrammétrie',
    category: 'GIS'
  },
  {
    id: 'oujda-omrane',
    projectId: 'lotissement-al-omrane',
    nameFr: 'Lotissement Urbain Al Omrane',
    nameAr: 'تجزئة العمران السكنية',
    cityFr: 'Oujda',
    cityAr: 'وجدة',
    lat: 34.6853,
    lng: -1.9076,
    typeFr: 'Orthophotographie & Délimitation de Parcelles',
    typeAr: 'المسح الجوي وتحديد الرسوم العقارية',
    status: 'COMPLETED',
    precision: 'GSD 1.5cm (Haute Résolution)',
    equipment: 'DJI Matrice 300 RTK, Pix4D Mapper',
    category: 'UAV'
  },
  {
    id: 'casa-webgis',
    projectId: 'cartographie-casablanca',
    nameFr: 'Cartographie Interactive WebGIS de la Métropole',
    nameAr: 'خريطة الدار البيضاء الرقمية التفاعلية',
    cityFr: 'Casablanca',
    cityAr: 'الدار البيضاء',
    lat: 33.5731,
    lng: -7.5898,
    typeFr: 'Système d\'Information Géographique & Mobile Mapping',
    typeAr: 'تطوير المنصات الجغرافية والرفع المتحرك',
    status: 'MONITORING',
    precision: '±5cm Métropolitain',
    equipment: 'Mobile Mapping System, PostgreSQL, ArcGIS Web Suite',
    category: 'GIS'
  },
  {
    id: 'marrakech-seisme',
    projectId: 'seisme-marrakech',
    nameFr: 'Séisme Al Haouz - Cartographie Solidaire',
    nameAr: 'زلزال الحوز - رسم خرائط الأثر التضامنية',
    cityFr: 'Marrakech & Al Haouz',
    cityAr: 'مراكش والحوز',
    lat: 31.6295,
    lng: -7.9811,
    typeFr: 'Documentation d\'Impact & SIG Solidaire',
    typeAr: 'توثيق أثر الهزات الأرضية ومساندة الإعمار',
    status: 'MONITORING',
    precision: 'Précision Thématique',
    equipment: 'Données Satellitaires Multi-temporelles, Levés de Drone',
    category: 'GIS'
  },
  {
    id: 'tanger-port',
    projectId: 'plan-masse',
    nameFr: 'Auscultation & Levés de Façades Classées',
    nameAr: 'رصد الواجهات المعمارية العتيقة',
    cityFr: 'Tanger',
    cityAr: 'طنجة',
    lat: 35.7595,
    lng: -5.8340,
    typeFr: 'Laser Scanner Terrestre 3D & Façades',
    typeAr: 'المسح الليزري الأرضي ورصد التصدعات',
    status: 'COMPLETED',
    precision: '±1mm Géodésique',
    equipment: 'Faro Focus S350, Station Total Nikon',
    category: 'Topography'
  },
  {
    id: 'dakhla-southern',
    nameFr: 'Couverture Territoriale des Provinces du Sud',
    nameAr: 'التغطية الجغرافية بالأقاليم الجنوبية',
    cityFr: 'Dakhla',
    cityAr: 'الداخلة',
    lat: 23.6848,
    lng: -15.9579,
    typeFr: 'Levé Topographique & Implantation Réseau GNSS',
    typeAr: 'المسح الطبوغرافي وتثبيت نقط الجيوديسيا',
    status: 'IN_PROGRESS',
    precision: '±5mm Réseau Fixe',
    equipment: 'Trimble R12 GNSS, Stations Permanentes CORS',
    category: 'Topography'
  }
];

export default function RegionalMap() {
  const { lang, isRTL } = useLanguage();
  const { theme } = useTheme();
  const isNavy = theme === 'navy';

  // Selected map point state - centers automatically on the most recently added project marker on mount
  const [selectedPointId, setSelectedPointId] = useState<string>(() => {
    return mapPoints[mapPoints.length - 1]?.id || 'nador-med';
  });
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(true);
  
  // Map visualization mode toggle
  const [mapMode, setMapMode] = useState<'geological' | 'vector'>('geological');

  // Selected category filters
  const [selectedCategories, setSelectedCategories] = useState<('Topography' | 'GIS' | 'UAV')[]>(['Topography', 'GIS', 'UAV']);

  const toggleCategory = (category: 'Topography' | 'GIS' | 'UAV') => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        if (prev.length === 1) return prev; // Keep at least one category checked so map isn't blank
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  // Real-time mouse coordinate display
  const [hoverCoords, setHoverCoords] = useState<{ lat: number; lng: number } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Map bounding box parameters for Morocco projection mapping
  const latMin = 20.0;
  const latMax = 36.5;
  const lngMin = -17.5;
  const lngMax = -1.0;

  // Filtered map points based on category selection
  const filteredMapPoints = useMemo(() => {
    return mapPoints.filter(pt => selectedCategories.includes(pt.category));
  }, [mapPoints, selectedCategories]);

  // Adjust selected point if it is no longer visible under active filters
  const categoriesKey = selectedCategories.join(',');
  useEffect(() => {
    const isStillVisible = filteredMapPoints.some(pt => pt.id === selectedPointId);
    if (!isStillVisible && filteredMapPoints.length > 0) {
      setSelectedPointId(filteredMapPoints[0].id);
    }
  }, [categoriesKey, selectedPointId, filteredMapPoints]);

  // Conic projection constants for precise mapping onto the uploaded geological map sheet
  const lambda_0 = -9.0; // Central meridian
  const n = 0.75; // Cone constant
  const r_30 = 60.0; // Radius at 30°N
  const scale_r = 3.5; // Radius change per degree of latitude
  
  const r_22 = r_30 - (22.0 - 30.0) * scale_r; // 88.0
  const r_36 = r_30 - (36.0 - 30.0) * scale_r; // 39.0
  const theta_max = n * (-2.0 - lambda_0) * (Math.PI / 180); // angle for -2.0°W (offset +7.0)
  
  const x_max = r_22 * Math.sin(theta_max);
  const x_min = -x_max;
  
  const y_max = -r_36 * Math.cos(theta_max);
  const y_min = -r_22;

  // Map projection formula to convert lat, lng into x,y percentages based on the uploaded geological map grid
  const getXYPercent = (lat: number, lng: number) => {
    const r = r_30 - (lat - 30.0) * scale_r;
    const theta = n * (lng - lambda_0) * (Math.PI / 180);
    
    const x_raw = r * Math.sin(theta);
    const y_raw = -r * Math.cos(theta);
    
    // Map to the geological map's specific bounding box in image percentages
    // X-axis and Y-axis are scaled to cover 2% to 98% (providing a clean margin around the map canvas)
    // This perfectly aligns the vector network, coastal borders, and interactive pins on the background map sheet
    const x = 2.0 + ((x_raw - x_min) / (x_max - x_min)) * 96.0;
    const y = 2.0 + ((y_max - y_raw) / (y_max - y_min)) * 96.0;
    return { x, y };
  };

  // Convert old percentage coordinates [0-100] to new precise map coordinates for vector rendering
  const convertOldCoords = (ptsStr: string) => {
    return ptsStr.trim().split(/\s+/).map(p => {
      const [xPct, yPct] = p.split(',').map(Number);
      // Convert old percentage back to WGS84 Lat/Lng
      const lng = -17.5 + (xPct / 100) * 16.5;
      const lat = 36.5 - (yPct / 100) * 16.5;
      // Convert WGS84 to new precise image percentage mapping
      const { x, y } = getXYPercent(lat, lng);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ');
  };

  const selectedPoint = useMemo(() => {
    return filteredMapPoints.find(pt => pt.id === selectedPointId) || filteredMapPoints[0] || mapPoints[0];
  }, [selectedPointId, filteredMapPoints, mapPoints]);

  // Handle cursor tracking conversion
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    // Inverse Conic projection to get Lat, Lng back from image percentages
    const x_raw = x_min + ((xPercent - 33.5) / 63.0) * (x_max - x_min);
    const y_raw = y_max - ((yPercent - 3.5) / 93.0) * (y_max - y_min);

    const r = Math.sqrt(x_raw * x_raw + y_raw * y_raw);
    const theta = Math.atan2(x_raw, -y_raw);

    const lat = 30.0 - (r - r_30) / scale_r;
    const lng = lambda_0 + (theta * 180.0) / (n * Math.PI);

    // Constrain to valid map coordinate boundaries
    if (lat >= 20.0 && lat <= 38.0 && lng >= -18.0 && lng <= 0.0) {
      setHoverCoords({ lat, lng });
    } else {
      setHoverCoords(null);
    }
  };

  const handleMouseLeave = () => {
    setHoverCoords(null);
  };

  // Convert coordinate to DMS (Degrees, Minutes, Seconds) for surveyor aesthetics
  const formatDMS = (val: number, isLat: boolean) => {
    const absolute = Math.abs(val);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
    const direction = isLat 
      ? (val >= 0 ? 'N' : 'S') 
      : (val >= 0 ? 'E' : 'W');
    return `${degrees}°${minutes}'${seconds}" ${direction}`;
  };

  // Navigation handlers for active card
  const handlePrev = () => {
    if (filteredMapPoints.length === 0) return;
    const currentIndex = filteredMapPoints.findIndex(pt => pt.id === selectedPointId);
    const prevIndex = (currentIndex - 1 + filteredMapPoints.length) % filteredMapPoints.length;
    setSelectedPointId(filteredMapPoints[prevIndex].id);
  };

  const handleNext = () => {
    if (filteredMapPoints.length === 0) return;
    const currentIndex = filteredMapPoints.findIndex(pt => pt.id === selectedPointId);
    const nextIndex = (currentIndex + 1) % filteredMapPoints.length;
    setSelectedPointId(filteredMapPoints[nextIndex].id);
  };

  return (
    <div className={`glass-card p-8 md:p-14 rounded-[4rem] border transition-all duration-500 relative overflow-hidden ${
      isNavy ? 'border-white/5 bg-zinc-950/20 shadow-[0_30px_100px_rgba(0,0,0,0.8)]' : 'border-slate-200/50 bg-white/70 shadow-[0_30px_100px_rgba(15,23,42,0.05)]'
    }`}>
      
      {/* Dynamic Ambient Background Glows */}
      <div className={`absolute top-0 right-1/4 w-[30rem] h-[30rem] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ${
        isNavy ? 'bg-sky-500/[0.03]' : 'bg-sky-500/[0.05]'
      }`} />
      <div className={`absolute bottom-0 left-10 w-[20rem] h-[20rem] rounded-full blur-[120px] pointer-events-none transition-all duration-1000 ${
        isNavy ? 'bg-indigo-500/[0.02]' : 'bg-indigo-500/[0.03]'
      }`} />

      {/* Map Segment Header */}
      <div className={`flex flex-col xl:flex-row xl:items-end justify-between gap-10 mb-12 border-b pb-10 transition-colors duration-500 ${
        isNavy ? 'border-white/5' : 'border-slate-200'
      } ${isRTL ? 'xl:flex-row-reverse text-right' : 'text-left'}`}>
        <div className="space-y-4">
          <div className={`inline-flex items-center gap-3 border px-4 py-2 rounded-full transition-all duration-500 ${
            isNavy 
              ? 'bg-sky-500/10 border-sky-400/20 text-sky-400' 
              : 'bg-sky-500/5 border-sky-500/15 text-sky-600'
          }`}>
            <Satellite className={isNavy ? 'text-sky-400' : 'text-sky-500'} size={12} />
            <span className="text-[9px] font-mono font-black uppercase tracking-[0.25em]">
              {lang === 'fr' ? 'RAYONNEMENT ET CHANTIERS' : 'التغطية الميدانية والمشاريع'}
            </span>
          </div>

          <h3 className={`text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none transition-colors duration-500 ${
            isNavy ? 'text-white' : 'text-slate-900'
          }`}>
            {lang === 'fr' ? 'CARTOGRAPHIE DES' : 'مخطط التغطية'} <br />
            <span className={`${isNavy ? 'text-sky-400' : 'text-sky-500'} not-italic font-light`}>
              {lang === 'fr' ? 'RÉCENTES OPERATIONS' : 'الجغرافية للمشاريع'}
            </span>
          </h3>

          <p className={`text-sm font-light max-w-2xl leading-relaxed transition-colors duration-500 ${
            isNavy ? 'text-gray-400' : 'text-slate-600'
          }`}>
            {lang === 'fr' 
              ? 'Visualisez en temps réel notre couverture régionale et géodésique au Maroc. Explorez nos projets majeurs de topographie de haute précision, modélisations procédurales et infrastructures côtières.'
              : 'شاهد التغطية الجغرافية والجيوديسية الحية لمشاريعنا في المغرب. تفقد أدق عمليات المسح الطبوغرافي والنمذجة ثلاثية الأبعاد ومتابعة الأوراش الكبرى من الناظور إلى الداخلة.'}
          </p>
        </div>

        {/* Live GPS Constellations Status */}
        <div className={`flex items-center gap-4 border px-6 py-4 rounded-3xl font-mono self-start transition-all duration-500 ${
          isNavy ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200/70'
        }`}>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-left text-[10px]">
            <span className={`font-black block ${isNavy ? 'text-white' : 'text-slate-800'}`}>
              MOROCCO GRID SERVICE
            </span>
            <span className="text-emerald-500 text-[8px] uppercase tracking-wider font-bold">
              Lambert Conformal Conic Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map (Left) + Detailed Sidebar (Right) */}
      <div className={`flex flex-col lg:flex-row gap-12 items-stretch ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* MAP CONTAINER STAGE */}
        <div className="w-full lg:w-[58%] flex flex-col relative">
          
          <div 
            ref={mapContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`w-full aspect-[1125/1000] rounded-[2.5rem] border relative overflow-hidden transition-all duration-500 cursor-crosshair select-none ${
              isNavy 
                ? 'bg-[#030712] border-white/5 shadow-inner shadow-black/80' 
                : 'bg-slate-100/60 border-slate-200/80 shadow-inner shadow-slate-200/40'
            }`}
          >
            
            {/* Background 3D Geological Map Image */}
            <AnimatePresence>
              {mapMode === 'geological' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 pointer-events-none z-0"
                >
                  <img 
                    src={moroccoGeologicalMapImg} 
                    alt="Carte Géologique du Maroc" 
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      isNavy ? 'opacity-85 brightness-[0.7] contrast-[1.2] saturate-[1.15]' : 'opacity-90 brightness-[1.02] contrast-[1.05]'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle shading overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${
                    isNavy ? 'to-black/40' : 'to-slate-900/10'
                  }`} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* 1. Spatial Coordinate Grid Overlay (Curved Conic Vector Overlay) */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-10 transition-all duration-500"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Latitude Curved Grid Lines */}
              {[22, 24, 26, 28, 30, 32, 34, 36].map((latVal) => {
                const steps = [];
                for (let lngVal = -16.0; lngVal <= -2.0; lngVal += 0.5) {
                  const { x, y } = getXYPercent(latVal, lngVal);
                  steps.push(`${x.toFixed(2)},${y.toFixed(2)}`);
                }
                const d = `M ${steps.join(' L ')}`;
                return (
                  <path 
                    key={`lat-arc-${latVal}`}
                    d={d}
                    className="fill-none transition-all duration-500"
                    stroke={isNavy ? 'rgba(56, 189, 248, 0.12)' : 'rgba(14, 165, 233, 0.18)'}
                    strokeWidth="0.1"
                    strokeDasharray="1,1.5"
                  />
                );
              })}

              {/* Longitude Converging Grid Lines */}
              {[-16, -14, -12, -10, -8, -6, -4, -2].map((lngVal) => {
                const start = getXYPercent(22.0, lngVal);
                const end = getXYPercent(36.0, lngVal);
                return (
                  <line 
                    key={`lng-line-${lngVal}`}
                    x1={start.x} 
                    y1={start.y} 
                    x2={end.x} 
                    y2={end.y}
                    className="transition-all duration-500"
                    stroke={isNavy ? 'rgba(56, 189, 248, 0.12)' : 'rgba(14, 165, 233, 0.18)'}
                    strokeWidth="0.1"
                    strokeDasharray="1,1.5"
                  />
                );
              })}

              {/* Latitude Text Labels on the Right Grid Edge */}
              {[22, 24, 26, 28, 30, 32, 34, 36].map((latVal) => {
                const { x, y } = getXYPercent(latVal, -2.0);
                return (
                  <text
                    key={`lat-lbl-${latVal}`}
                    x={x + 0.8}
                    y={y + 0.5}
                    className={`font-mono text-[1.4px] select-none font-semibold ${isNavy ? 'fill-sky-400/40' : 'fill-sky-600/50'}`}
                    textAnchor="start"
                  >
                    {latVal}°N
                  </text>
                );
              })}

              {/* Longitude Text Labels on the Bottom Grid Edge */}
              {[-16, -14, -12, -10, -8, -6, -4, -2].map((lngVal) => {
                const { x, y } = getXYPercent(22.0, lngVal);
                return (
                  <text
                    key={`lng-lbl-${lngVal}`}
                    x={x}
                    y={y + 2.0}
                    className={`font-mono text-[1.4px] select-none font-semibold ${isNavy ? 'fill-sky-400/40' : 'fill-sky-600/50'}`}
                    textAnchor="middle"
                  >
                    {Math.abs(lngVal)}°W
                  </text>
                );
              })}
            </svg>

            {/* 2. Vector Outline of Morocco (High-Fidelity Survey Wireframe) */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-500 z-10"
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              {/* Main Morocco Polygon */}
              <polygon 
                points={convertOldCoords(`
                  70.9,4.2 
                  88.5,7.9 
                  92.7,8.5 
                  94.5,12.7 
                  98.8,26.7 
                  94.5,34.5 
                  90.9,41.2 
                  81.2,43.6 
                  78.2,46.7 
                  75.8,50.3 
                  53.9,50.3 
                  53.9,63.6 
                  33.3,63.6 
                  33.3,95.0 
                  2.9,95.0 
                  2.9,92.1 
                  9.3,77.7 
                  18.3,62.9 
                  26.1,56.7 
                  27.7,51.9 
                  44.4,43.2 
                  47.9,36.9 
                  46.9,30.2 
                  50.1,25.5 
                  60.1,17.8 
                  66.1,13.3 
                  68.5,7.9
                `)}
                className={`transition-all duration-500 ${
                  mapMode === 'geological'
                    ? (isNavy ? 'fill-transparent stroke-sky-400/20' : 'fill-transparent stroke-sky-500/25')
                    : (isNavy ? 'fill-sky-500/[0.03] stroke-sky-400/35' : 'fill-sky-500/[0.04] stroke-sky-500/45')
                }`}
                strokeWidth={mapMode === 'geological' ? '0.25' : '0.35'}
                strokeLinejoin="round"
              />

              {/* Auxiliary Border Reference Grid lines inside Morocco */}
              <polyline 
                points={convertOldCoords("33.3,63.6 33.3,95.0")}
                className={isNavy ? 'stroke-white/5' : 'stroke-slate-200'}
                strokeWidth="0.1"
                strokeDasharray="1,1"
              />
              <polyline 
                points={convertOldCoords("33.3,95.0 2.9,95.0")}
                className={isNavy ? 'stroke-white/5' : 'stroke-slate-200'}
                strokeWidth="0.1"
                strokeDasharray="1,1"
              />
            </svg>

            {/* 3. Interactive Geodetic Vector Paths (Fibers of GNSS corrections) */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {filteredMapPoints.map((pt, index) => {
                if (pt.id === 'casa-webgis') return null; // center point
                
                const casa = getXYPercent(33.5731, -7.5898);
                const target = getXYPercent(pt.lat, pt.lng);
                
                // Draw bezier arc path
                const midX = (casa.x + target.x) / 2;
                const midY = (casa.y + target.y) / 2 - 8; // lift the arc

                return (
                  <g key={`arc-${pt.id}`}>
                    {/* Background faint path */}
                    <motion.path 
                      d={`M ${casa.x} ${casa.y} Q ${midX} ${midY} ${target.x} ${target.y}`}
                      className={`fill-none transition-all duration-500 ${
                        isNavy ? 'stroke-sky-400/10' : 'stroke-sky-500/15'
                      }`}
                      strokeWidth="0.25"
                      strokeDasharray="1,2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: index * 0.12 + 0.4, ease: "easeOut" }}
                    />
                    
                    {/* Active pulsing RTK data particle traveling outwards */}
                    <motion.path 
                      d={`M ${casa.x} ${casa.y} Q ${midX} ${midY} ${target.x} ${target.y}`}
                      className={`fill-none ${
                        isNavy ? 'stroke-sky-400/45' : 'stroke-sky-500/55'
                      }`}
                      strokeWidth="0.45"
                      strokeDasharray="3 15"
                      initial={{ strokeDashoffset: 18 }}
                      animate={{ strokeDashoffset: -18 }}
                      transition={{ 
                        duration: 2.8, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: index * 0.15 + 0.5
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* 4. Interactive Geodetic Pins */}
            {filteredMapPoints.map((pt, index) => {
              const { x, y } = getXYPercent(pt.lat, pt.lng);
              const isSelected = pt.id === selectedPointId;

              return (
                <motion.div 
                  key={pt.id}
                  className="absolute cursor-pointer z-20 group/pin"
                  style={{ left: `${x}%`, top: `${y}%`, x: "-50%", y: "-50%" }}
                  onClick={() => {
                    setSelectedPointId(pt.id);
                    setIsOverlayOpen(true);
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 140,
                    damping: 12,
                    delay: index * 0.08 + 0.2
                  }}
                  whileHover={{ scale: 1.15 }}
                >
                  {/* Glowing Radar Pulse circles for selected point */}
                  {isSelected && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-sky-500/30 animate-ping" style={{ transform: 'scale(3.5)', animationDuration: '2s' }} />
                      <span className="absolute inset-0 rounded-full bg-sky-400/20 animate-ping" style={{ transform: 'scale(2)', animationDuration: '1.2s' }} />
                    </>
                  )}

                  {/* Anchor Point Dot */}
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 border ${
                    isSelected 
                      ? 'bg-sky-400 border-white scale-125 shadow-[0_0_15px_rgba(56,189,248,0.8)]' 
                      : 'bg-[#030712] border-sky-400/60 hover:scale-110 hover:border-white'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-zinc-950' : 'bg-sky-400'}`} />
                  </div>

                  {/* Floating Compact Tag */}
                  <div className={`absolute left-5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md font-mono text-[8px] font-black uppercase tracking-wider transition-all duration-300 border pointer-events-none whitespace-nowrap ${
                    isSelected
                      ? 'bg-sky-500 text-white border-sky-400 opacity-100 translate-x-0 shadow-lg'
                      : 'opacity-0 -translate-x-2 group-hover/pin:opacity-100 group-hover/pin:translate-x-0 bg-zinc-950 text-sky-400 border-sky-500/20'
                  }`}>
                    {lang === 'fr' ? pt.cityFr : pt.cityAr}
                  </div>
                </motion.div>
              );
            })}

            {/* Compass Rose Ornament Overlay */}
            <div className={`absolute bottom-5 right-5 pointer-events-none transition-all duration-500 ${
              isNavy ? 'text-white/10' : 'text-slate-900/[0.08]'
            }`}>
              <Compass size={64} className="animate-spin" style={{ animationDuration: '120s' }} />
            </div>

            {/* Map Scale Bar Legend */}
            <div className={`absolute bottom-5 left-5 px-3 py-1.5 rounded-xl border font-mono text-[7px] pointer-events-none flex flex-col gap-1 transition-all duration-500 ${
              isNavy ? 'bg-black/40 border-white/5 text-gray-400' : 'bg-white/80 border-slate-200 text-slate-500'
            }`}>
              <span className="font-bold uppercase tracking-wider">MAP SCALE</span>
              <div className="flex items-center gap-1.5">
                <div className="flex flex-col items-stretch">
                  <div className={`h-[3px] w-12 border-l border-r border-b relative ${isNavy ? 'border-sky-400/40' : 'border-sky-500/50'}`}>
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-[4px] w-[1px] ${isNavy ? 'bg-sky-400/40' : 'bg-sky-500/50'}`} />
                  </div>
                </div>
                <span>0 - 200 km</span>
              </div>
            </div>

            {/* Interactive live coordinates ticker */}
            <div className={`absolute top-4 right-4 px-4 py-2.5 rounded-2xl border font-mono text-[8px] transition-all duration-500 flex items-center gap-3 select-none ${
              isNavy ? 'bg-black/60 border-white/10 text-gray-400' : 'bg-white/90 border-slate-200/80 text-slate-600 shadow-md'
            }`}>
              <Cpu size={12} className={hoverCoords ? 'text-sky-400 animate-pulse' : 'text-gray-500'} />
              <div>
                <span className="block text-[6px] uppercase text-gray-500 font-bold">
                  {lang === 'fr' ? 'COORDONNEES DU CURSEUR (WGS84)' : 'إحداثيات مؤشر المسح'}
                </span>
                <span className={`block font-black transition-colors ${hoverCoords ? 'text-sky-400' : ''}`}>
                  {hoverCoords 
                    ? `LAT: ${formatDMS(hoverCoords.lat, true)} | LNG: ${formatDMS(hoverCoords.lng, false)}`
                    : 'CURSOR OVER MAP TO TRACE'}
                </span>
              </div>
            </div>

            {/* Top-Left Control Panel (Mode + Filters) */}
            <div className="absolute top-4 left-4 z-30 flex flex-col gap-2 pointer-events-auto">
              {/* Interactive Map Mode Controller */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl border bg-black/75 border-white/10 backdrop-blur-md">
                <button
                  onClick={() => setMapMode('geological')}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[8px] font-black uppercase tracking-wider transition-all duration-300 ${
                    mapMode === 'geological'
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {lang === 'fr' ? 'CARTE GÉOLOGIQUE 3D' : 'جيولوجية 3D'}
                </button>
                <button
                  onClick={() => setMapMode('vector')}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[8px] font-black uppercase tracking-wider transition-all duration-300 ${
                    mapMode === 'vector'
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {lang === 'fr' ? 'RÉSEAU VECTORIEL' : 'الشبكة الجيوديسية'}
                </button>
              </div>

              {/* Project Category Filter Controller */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl border bg-black/75 border-white/10 backdrop-blur-md">
                <span className="text-[7px] font-mono font-black text-gray-500 px-1.5 uppercase tracking-wider">
                  {lang === 'fr' ? 'PROJETS' : 'المشاريع'}
                </span>
                
                {/* Topography Filter Button */}
                <button
                  onClick={() => toggleCategory('Topography')}
                  className={`px-2 py-1 rounded-lg font-mono text-[8px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                    selectedCategories.includes('Topography')
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  title={lang === 'fr' ? 'Topographie' : 'طبوغرافيا'}
                >
                  <Compass size={10} />
                  <span>{lang === 'fr' ? 'TOPOGRAPHIE' : 'طبوغرافيا'}</span>
                </button>

                {/* GIS Filter Button */}
                <button
                  onClick={() => toggleCategory('GIS')}
                  className={`px-2 py-1 rounded-lg font-mono text-[8px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                    selectedCategories.includes('GIS')
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  title={lang === 'fr' ? 'SIG / GIS' : 'نظم المعلومات'}
                >
                  <Layers size={10} />
                  <span>{lang === 'fr' ? 'SIG' : 'نظم'}</span>
                </button>

                {/* UAV Filter Button */}
                <button
                  onClick={() => toggleCategory('UAV')}
                  className={`px-2 py-1 rounded-lg font-mono text-[8px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                    selectedCategories.includes('UAV')
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  title={lang === 'fr' ? 'Photogrammétrie UAV' : 'طائرات درون'}
                >
                  <Satellite size={10} />
                  <span>{lang === 'fr' ? 'UAV' : 'درون'}</span>
                </button>
              </div>
            </div>

            {/* 5. Slide-Over Project Detail Overlay Sidebar */}
            <AnimatePresence>
              {isOverlayOpen && (
                <motion.div
                  initial={{ x: isRTL ? '-100%' : '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: isRTL ? '-100%' : '100%', opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 180 }}
                  className={`absolute top-0 bottom-0 ${isRTL ? 'left-0 border-r' : 'right-0 border-l'} w-full sm:w-[320px] md:w-[360px] z-40 p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-500 ${
                    isNavy 
                      ? 'bg-zinc-950/90 border-white/10 text-white shadow-[0_0_50px_rgba(0,0,0,0.8)]' 
                      : 'bg-white/95 border-slate-200/80 text-slate-800 shadow-2xl shadow-slate-950/10'
                  }`}
                >
                  {/* Card Header */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[8px] font-mono font-black uppercase tracking-wider ${
                        selectedPoint.status === 'COMPLETED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'
                          : selectedPoint.status === 'IN_PROGRESS'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/15'
                            : 'bg-sky-500/10 text-sky-400 border border-sky-500/15'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        <span>
                          {selectedPoint.status === 'COMPLETED' 
                            ? (lang === 'fr' ? 'Rapport Archivé' : 'مكتمل ومسجل')
                            : selectedPoint.status === 'IN_PROGRESS'
                              ? (lang === 'fr' ? 'Opération en Cours' : 'جاري المسح')
                              : (lang === 'fr' ? 'Auscultation en Continu' : 'تحت الرصد المستمر')}
                        </span>
                      </div>

                      <button
                        onClick={() => setIsOverlayOpen(false)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isNavy
                            ? 'bg-white/5 border-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800'
                        }`}
                        title={lang === 'fr' ? 'Fermer' : 'إغلاق'}
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div>
                      <span className={`text-[8px] font-mono tracking-widest font-bold uppercase ${isNavy ? 'text-sky-400/80' : 'text-sky-600'}`}>
                        {lang === 'fr' ? selectedPoint.cityFr : selectedPoint.cityAr}
                      </span>
                      <h4 className="text-xl font-black uppercase italic tracking-tight leading-tight mt-1">
                        {lang === 'fr' ? selectedPoint.nameFr : selectedPoint.nameAr}
                      </h4>
                    </div>

                    {/* Geodetic Coordinates bento box inside overlay */}
                    <div className={`grid grid-cols-2 gap-2 p-3 rounded-xl border font-mono text-[9px] ${
                      isNavy ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-150'
                    }`}>
                      <div>
                        <span className="text-gray-500 block text-[7px] uppercase tracking-wider">LATITUDE (N)</span>
                        <span className="font-bold">{formatDMS(selectedPoint.lat, true)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[7px] uppercase tracking-wider">LONGITUDE (W)</span>
                        <span className="font-bold">{formatDMS(selectedPoint.lng, false)}</span>
                      </div>
                    </div>

                    {/* Nature of Intervention */}
                    <div className="space-y-1.5 pt-2">
                      <span className={`block font-bold text-[8px] font-mono uppercase tracking-wider ${isNavy ? 'text-sky-400/80' : 'text-sky-600'}`}>
                        {lang === 'fr' ? "NATURE DE L'INTERVENTION" : 'طبيعة التدخل التقني'}
                      </span>
                      <p className={`text-xs font-light leading-relaxed ${isNavy ? 'text-gray-300' : 'text-slate-600'}`}>
                        {lang === 'fr' ? selectedPoint.typeFr : selectedPoint.typeAr}
                      </p>
                    </div>

                    {/* Technical details list */}
                    <div className="space-y-3 pt-3 border-t border-dashed border-gray-500/10">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-gray-500 font-mono uppercase tracking-wider">{lang === 'fr' ? 'PRÉCISION TARGET' : 'الدقة الجيوديسية'}</span>
                        <span className="font-mono font-bold text-sky-400">{selectedPoint.precision}</span>
                      </div>
                      <div className="flex justify-between items-start text-[10px] gap-4">
                        <span className="text-gray-500 font-mono uppercase tracking-wider whitespace-nowrap">{lang === 'fr' ? 'ÉQUIPEMENT' : 'الأجهزة'}</span>
                        <span className={`font-mono text-right truncate max-w-[180px] ${isNavy ? 'text-gray-300' : 'text-slate-700'}`} title={selectedPoint.equipment}>
                          {selectedPoint.equipment}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Controls */}
                  <div className="space-y-4 pt-4 border-t border-dashed border-gray-500/10">
                    {/* Action button */}
                    {selectedPoint.projectId ? (
                      <a
                        href={`/portfolio/${selectedPoint.projectId}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-mono font-black uppercase tracking-wider text-white bg-sky-500 hover:bg-sky-400 transition-all shadow-md shadow-sky-500/15"
                      >
                        <span>{lang === 'fr' ? 'VOIR FICHE PROJET' : 'عرض تفاصيل المشروع'}</span>
                        <Navigation size={12} className={isRTL ? 'rotate-270' : 'rotate-90'} />
                      </a>
                    ) : (
                      <div className={`w-full text-center py-2 px-3 rounded-xl border text-[9px] font-mono uppercase tracking-wider ${
                        isNavy ? 'bg-white/[0.01] border-white/5 text-gray-500' : 'bg-slate-50 border-slate-200 text-slate-500'
                      }`}>
                        {lang === 'fr' ? 'Couverture Globale' : 'تغطية إقليمية شاملة'}
                      </div>
                    )}

                    {/* Pagination buttons */}
                    <div className="flex items-center justify-between text-[9px] font-mono text-gray-500">
                      <button 
                        onClick={handlePrev}
                        className={`p-1.5 rounded-lg border transition-all flex items-center gap-1 ${
                          isNavy 
                            ? 'bg-white/5 border-white/5 hover:bg-white/10 text-white' 
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm'
                        }`}
                      >
                        <ChevronLeft size={12} className={isRTL ? 'rotate-180' : ''} />
                        <span>{lang === 'fr' ? 'Précédent' : 'السابق'}</span>
                      </button>

                      <span className="font-bold">
                        {filteredMapPoints.findIndex(pt => pt.id === selectedPointId) + 1} / {filteredMapPoints.length}
                      </span>

                      <button 
                        onClick={handleNext}
                        className={`p-1.5 rounded-lg border transition-all flex items-center gap-1 ${
                          isNavy 
                            ? 'bg-white/5 border-white/5 hover:bg-white/10 text-white' 
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm'
                        }`}
                      >
                        <span>{lang === 'fr' ? 'Suivant' : 'التالي'}</span>
                        <ChevronRight size={12} className={isRTL ? 'rotate-180' : ''} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reopen Floating Tag (Visible only when overlay is closed) */}
            <AnimatePresence>
              {!isOverlayOpen && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  onClick={() => setIsOverlayOpen(true)}
                  className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} z-30 px-3.5 py-2 rounded-xl border font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all ${
                    isNavy 
                      ? 'bg-sky-500 border-sky-400 text-white hover:bg-sky-400' 
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-slate-900/5'
                  }`}
                >
                  <Info size={12} className="animate-pulse" />
                  <span>{lang === 'fr' ? 'Afficher les Détails' : 'عرض التفاصيل'}</span>
                </motion.button>
              )}
            </AnimatePresence>

          </div>

          <p className={`text-[10px] font-mono mt-4 uppercase tracking-widest text-center transition-colors duration-500 ${
            isNavy ? 'text-gray-500' : 'text-slate-400'
          }`}>
            {lang === 'fr' 
              ? 'Sélectionnez un point d\'ancrage pour charger le rapport topographique complet' 
              : 'انقر على إحدى نقط الرفع لعرض ملف المشروع والتقارير الميدانية'}
          </p>
        </div>

        {/* DETAILED PROJECT INFO SIDEBAR */}
        <div className="flex-1 flex flex-col justify-between items-stretch">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPoint.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className={`flex-1 flex flex-col justify-between border p-8 md:p-10 rounded-[2.5rem] transition-colors duration-500 ${
                isNavy ? 'bg-white/[0.01] border-white/5' : 'bg-slate-50/50 border-slate-200'
              } ${isRTL ? 'text-right' : 'text-left'}`}
            >
              
              {/* Header section with location and status */}
              <div className="space-y-4">
                <div className={`flex flex-col sm:flex-row justify-between items-start gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                  <div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[8px] font-mono font-black uppercase tracking-widest ${
                      selectedPoint.status === 'COMPLETED'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : selectedPoint.status === 'IN_PROGRESS'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                    }`}>
                      <Activity size={8} className="animate-pulse" />
                      <span>
                        {selectedPoint.status === 'COMPLETED' 
                          ? (lang === 'fr' ? 'Rapport Archivé' : 'مكتمل ومسجل')
                          : selectedPoint.status === 'IN_PROGRESS'
                            ? (lang === 'fr' ? 'Opération en Cours' : 'جاري المسح')
                            : (lang === 'fr' ? 'Auscultation en Continu' : 'تحت الرصد المستمر')}
                      </span>
                    </div>

                    <h4 className={`text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none mt-3 transition-colors duration-500 ${
                      isNavy ? 'text-white' : 'text-slate-800'
                    }`}>
                      {lang === 'fr' ? selectedPoint.nameFr : selectedPoint.nameAr}
                    </h4>
                  </div>

                  {/* Lat/Lng specs */}
                  <div className={`flex gap-4 font-mono text-[9px] ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    <div>
                      <span className="text-gray-500 block">LAT</span>
                      <span className={isNavy ? 'text-white font-bold' : 'text-slate-800 font-bold'}>{selectedPoint.lat.toFixed(4)}° N</span>
                    </div>
                    <div className={`w-[1px] h-6 self-center ${isNavy ? 'bg-white/10' : 'bg-slate-200'}`} />
                    <div>
                      <span className="text-gray-500 block">LNG</span>
                      <span className={isNavy ? 'text-white font-bold' : 'text-slate-800 font-bold'}>{Math.abs(selectedPoint.lng).toFixed(4)}° W</span>
                    </div>
                  </div>
                </div>

                <div className={`text-sm font-light leading-relaxed border-t pt-5 transition-colors duration-500 ${
                  isNavy ? 'border-white/5 text-gray-400' : 'border-slate-200 text-slate-600'
                }`}>
                  <span className={`block font-bold text-[9px] font-mono uppercase mb-2 ${isNavy ? 'text-sky-400' : 'text-sky-600'}`}>
                    {lang === 'fr' ? "Nature de l'intervention" : 'طبيعة التدخل التقني'}
                  </span>
                  {lang === 'fr' ? selectedPoint.typeFr : selectedPoint.typeAr}
                </div>
              </div>

              {/* Technical Specifications specs bento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                
                {/* Metric 1 */}
                <div className={`border p-4 rounded-2xl transition-all duration-500 ${
                  isNavy ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <span className="text-[8px] font-mono text-gray-500 block uppercase">
                    {lang === 'fr' ? 'PRÉCISION GÉODÉSIQUE' : 'الدقة الجيوديسية المستهدفة'}
                  </span>
                  <span className={`text-sm font-black block mt-1 ${isNavy ? 'text-white' : 'text-slate-800'}`}>
                    {selectedPoint.precision}
                  </span>
                </div>

                {/* Metric 2 */}
                <div className={`border p-4 rounded-2xl transition-all duration-500 ${
                  isNavy ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <span className="text-[8px] font-mono text-gray-500 block uppercase">
                    {lang === 'fr' ? 'ÉQUIPEMENT ET CAPTEURS' : 'الأجهزة والمستشعرات المستخدمة'}
                  </span>
                  <span className={`text-[10px] font-mono font-black block mt-1 truncate ${isNavy ? 'text-sky-400' : 'text-sky-600'}`} title={selectedPoint.equipment}>
                    {selectedPoint.equipment.split(',')[0]}
                  </span>
                </div>

              </div>

              {/* Footer controls for sidebar */}
              <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 pt-5 border-t transition-colors duration-500 ${
                isNavy ? 'border-white/5' : 'border-slate-200'
              } ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                
                {/* Left/Right controls */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrev}
                    className={`p-2 rounded-full border transition-all ${
                      isNavy 
                        ? 'bg-white/5 border-white/5 hover:bg-white/10 text-white' 
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm'
                    }`}
                  >
                    <ChevronLeft size={16} className={isRTL ? 'rotate-180' : ''} />
                  </button>
                  <span className="text-[10px] font-mono text-gray-500 px-1">
                    {mapPoints.findIndex(pt => pt.id === selectedPointId) + 1} / {mapPoints.length}
                  </span>
                  <button 
                    onClick={handleNext}
                    className={`p-2 rounded-full border transition-all ${
                      isNavy 
                        ? 'bg-white/5 border-white/5 hover:bg-white/10 text-white' 
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm'
                    }`}
                  >
                    <ChevronRight size={16} className={isRTL ? 'rotate-180' : ''} />
                  </button>
                </div>

                {/* Redirect button to portfolio page if mapped */}
                {selectedPoint.projectId ? (
                  <a
                    href={`/portfolio/${selectedPoint.projectId}`}
                    className={`inline-flex items-center gap-2 text-[9px] font-mono font-black uppercase tracking-widest transition-all ${
                      isNavy 
                        ? 'text-sky-400 hover:text-white' 
                        : 'text-sky-600 hover:text-sky-800'
                    }`}
                  >
                    <span>{lang === 'fr' ? 'Voir fiche projet' : 'عرض تفاصيل المشروع'}</span>
                    <Navigation size={10} className={isRTL ? 'rotate-270' : 'rotate-90'} />
                  </a>
                ) : (
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-wider">
                    {lang === 'fr' ? 'Couverture Globale' : 'تغطية إقليمية شاملة'}
                  </span>
                )}
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
