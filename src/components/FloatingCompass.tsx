import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Navigation, Info, ShieldAlert, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function FloatingCompass() {
  const { lang, isRTL } = useLanguage();
  const { theme } = useTheme();
  
  const [rotation, setRotation] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const compassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      
      const percent = scrollTop / docHeight;
      setScrollPercent(percent);
      // Let's rotate 2 full circles over the entire page height (720 degrees)
      setRotation(percent * 720);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!compassRef.current) return;
    const rect = compassRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center to add a nice 3D tilt effect on hover
    const dx = (e.clientX - centerX) / (rect.width / 2);
    const dy = (e.clientY - centerY) / (rect.height / 2);
    
    setMouseOffset({ x: dx * 10, y: dy * 10 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  // Nador, Morocco Base coordinates: 35.1744° N, 2.9264° W
  // We'll simulate walking or driving from North to South as we scroll
  const baseLat = 35.1744;
  const baseLng = -2.9264;
  
  const currentLat = (baseLat - scrollPercent * 0.05).toFixed(5);
  const currentLng = (baseLng + scrollPercent * 0.03).toFixed(5);
  const elevation = Math.round(42 + scrollPercent * 158); // Altitude in meters (42m to 200m)
  const bearing = Math.round(rotation % 360);

  const getBearingDirection = (deg: number) => {
    const d = lang === 'ar' 
      ? ["شمال", "شمال شرق", "شرق", "جنوب شرق", "جنوب", "جنوب غرب", "غرب", "شمال غرب"]
      : ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return d[index];
  };

  const currentLang = lang === 'ar' ? 'ar' : 'fr';

  const t = {
    bearing: {
      fr: "Azimut",
      ar: "السمت"
    },
    altitude: {
      fr: "Altitude (Topo)",
      ar: "الارتفاع (طوبو)"
    },
    coordinates: {
      fr: "Coordonnées WGS84",
      ar: "إحداثيات WGS84"
    },
    precision: {
      fr: "Résolution RTK",
      ar: "دقة RTK"
    },
    status: {
      fr: "Fixé (GPS/GNSS)",
      ar: "مثبت (GPS/GNSS)"
    },
    title: {
      fr: "Compas Géodésique",
      ar: "بوصلة جيوديسية"
    }
  };

  return (
    <div 
      className={`fixed bottom-24 md:bottom-28 z-[90] ${
        isRTL ? 'right-6 md:right-8' : 'left-6 md:left-8'
      }`}
    >
      <div className="relative flex items-center gap-4">
        
        {/* Expanded Telemetry HUD (Displays when hovered) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: isRTL ? -20 : 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className={`absolute top-1/2 -translate-y-1/2 p-6 rounded-[2rem] w-64 backdrop-blur-xl border flex flex-col gap-4 shadow-2xl ${
                isRTL 
                  ? 'right-16 md:right-20 text-right origin-right' 
                  : 'left-16 md:left-20 text-left origin-left'
              } ${
                theme === 'navy'
                  ? 'bg-slate-950/90 border-white/5 text-white'
                  : 'bg-white/95 border-slate-100 text-slate-900 shadow-slate-200/50'
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="font-heading font-black text-xs uppercase tracking-wider text-sky-400">
                  {t.title[currentLang]}
                </span>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[8px] font-mono font-bold text-emerald-400">FIX</span>
                </div>
              </div>

              {/* Coordinates Section */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-black uppercase text-gray-500 block">
                  {t.coordinates[currentLang]}
                </span>
                <div className="font-mono text-xs font-bold leading-tight">
                  <div>LAT: {currentLat}° N</div>
                  <div>LON: {Math.abs(parseFloat(currentLng))}° W</div>
                </div>
              </div>

              {/* Angle and Bearing Section */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-black uppercase text-gray-500 block">
                    {t.bearing[currentLang]}
                  </span>
                  <div className="font-mono text-sm font-black text-sky-400">
                    {bearing}° <span className="text-[10px] text-gray-400 font-bold">{getBearingDirection(bearing)}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-black uppercase text-gray-500 block">
                    {t.altitude[currentLang]}
                  </span>
                  <div className="font-mono text-sm font-black text-emerald-400">
                    {elevation}m
                  </div>
                </div>
              </div>

              {/* Survey details footer */}
              <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[9px] font-mono text-gray-400">
                <span>{t.precision[currentLang]}</span>
                <span className="font-bold text-sky-400">±2mm H / ±4mm V</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Circle Dial */}
        <motion.div
          ref={compassRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setIsHovered(true)}
          style={{
            rotateX: mouseOffset.y,
            rotateY: -mouseOffset.x,
            transformStyle: "preserve-3d"
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center cursor-pointer relative shadow-lg backdrop-blur-md transition-all duration-300 ${
            theme === 'navy'
              ? 'bg-slate-950/80 border-white/10 text-white hover:border-sky-500/50 hover:bg-slate-900/90'
              : 'bg-white/80 border-slate-200 text-slate-800 hover:border-sky-500 hover:bg-white shadow-md'
          }`}
        >
          {/* Degree ticks inside circle */}
          <div className="absolute inset-1 rounded-full border border-dashed border-white/5 pointer-events-none" />

          {/* Compass Dial Ring */}
          <motion.div
            style={{ rotate: rotation }}
            className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* The compass compass needle */}
            <div className="w-full h-full relative p-2.5">
              {/* North Arrow Pointer */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-sky-500" />
              {/* South Arrow Pointer */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[8px] border-t-emerald-500" />
              
              {/* Outer dial labels (N, E, S, W) */}
              <span className="absolute top-1 text-[8px] font-black font-mono left-1/2 -translate-x-1/2 opacity-60 text-sky-400">N</span>
              <span className="absolute bottom-1 text-[8px] font-black font-mono left-1/2 -translate-x-1/2 opacity-60 text-emerald-400">S</span>
              <span className="absolute right-1 text-[8px] font-black font-mono top-1/2 -translate-y-1/2 opacity-60">E</span>
              <span className="absolute left-1 text-[8px] font-black font-mono top-1/2 -translate-y-1/2 opacity-60">W</span>
            </div>
          </motion.div>

          {/* Center Stationary Crosshair representing geodetic survey prism */}
          <div className="w-2.5 h-2.5 rounded-full border border-sky-400 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-1 h-1 bg-sky-500 rounded-full" />
          </div>

          {/* Floating tiny active indicator */}
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-sky-500 rounded-full border border-black flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full animate-ping" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
