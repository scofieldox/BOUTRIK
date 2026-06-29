import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Satellite, 
  Compass, 
  MapPin, 
  Signal, 
  ShieldCheck, 
  Info, 
  Settings2, 
  HelpCircle,
  Activity,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sliders,
  Globe2
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface SatelliteData {
  id: string;
  constellation: "gps" | "glonass" | "galileo" | "beidou";
  azimuth: number; // 0 - 360 degrees
  elevation: number; // 0 - 90 degrees
  snr: number; // 10 - 50 dBHz
  active: boolean;
}

export const GnssSimulator: React.FC = () => {
  const { lang, isRTL } = useLanguage();
  const [constellations, setConstellations] = useState({
    gps: true,
    glonass: true,
    galileo: true,
    beidou: false
  });

  const [environment, setEnvironment] = useState<"open" | "canopy" | "canyon" | "mountain">("open");
  const [elevationMask, setElevationMask] = useState(10); // degrees
  const [satellites, setSatellites] = useState<SatelliteData[]>([]);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measureProgress, setMeasureProgress] = useState(0);
  const [measureHistory, setMeasureHistory] = useState<{ x: number; y: number }[]>([]);

  // Environments definitions
  const envDetails = {
    open: {
      title: lang === "fr" ? "Ciel Ouvert" : "سماء مكشوفة",
      desc: lang === "fr" ? "Pas d'obstacles, conditions optimales pour la haute précision." : "خالٍ من العوائق، ظروف مثالية للدقة العالية.",
      strength: 1.0,
      attenuation: 0
    },
    canopy: {
      title: lang === "fr" ? "Couvert Forestier" : "غطاء غابوي كثيف",
      desc: lang === "fr" ? "Feuillage atténuant le signal GNSS et créant du bruit." : "أوراق الشجر تضعف إشارات الأقمار وتحدث تشويشاً.",
      strength: 0.7,
      attenuation: 8
    },
    canyon: {
      title: lang === "fr" ? "Milieu Urbain Dense" : "وسط حضري ضيق",
      desc: lang === "fr" ? "Immeubles hauts bloquant les satellites bas et provoquant du multitrap." : "بنايات شاهقة تحجب الأقمار المنخفضة وتحدث ارتدادات.",
      strength: 0.5,
      attenuation: 15
    },
    mountain: {
      title: lang === "fr" ? "Vallée / Montagneux" : "وادي / تضاريس وعرة",
      desc: lang === "fr" ? "Moitié de l'horizon bloqué par le relief montagneux." : "نصف الأفق محجوب بسبب التضارises الجبلية.",
      strength: 0.45,
      attenuation: 12
    }
  };

  // Generate satellite constellation once on mount and update based on settings
  const generateSatellites = () => {
    const list: SatelliteData[] = [];
    const sys = ["gps", "glonass", "galileo", "beidou"] as const;
    
    sys.forEach((c) => {
      const count = c === "gps" ? 10 : c === "glonass" ? 8 : c === "galileo" ? 8 : 10;
      for (let i = 1; i <= count; i++) {
        list.push({
          id: `${c.toUpperCase()}-${i.toString().padStart(2, "0")}`,
          constellation: c,
          azimuth: Math.random() * 360,
          elevation: 5 + Math.random() * 85,
          snr: 30 + Math.random() * 18,
          active: true
        });
      }
    });
    setSatellites(list);
  };

  useEffect(() => {
    generateSatellites();
  }, []);

  // Recalculate satellite health when toggling settings or environment
  const activeSats = satellites.filter((sat) => {
    // 1. Check if constellation is active
    if (!constellations[sat.constellation]) return false;

    // 2. Check if below elevation mask
    if (sat.elevation < elevationMask) return false;

    // 3. Environment restrictions
    if (environment === "canyon") {
      // blocks low elevation satellites (below 35 degrees)
      if (sat.elevation < 35) return false;
      // Multipath attenuation
    } else if (environment === "mountain") {
      // blocks satellites in eastern azimuth (e.g., 90 to 240 deg)
      if (sat.azimuth > 90 && sat.azimuth < 240) return false;
    }

    return true;
  });

  const numSatsTracked = activeSats.length;

  // DOP calculations based on tracked satellites count
  const calculateDop = () => {
    if (numSatsTracked === 0) return { pdop: 99.9, hdop: 99.9, vdop: 99.9 };
    if (numSatsTracked < 4) {
      const scale = 4 / numSatsTracked;
      return { pdop: 12.5 * scale, hdop: 8.2 * scale, vdop: 9.3 * scale };
    }
    // Realistic simulation of Dilution of Precision
    const base = 4.5 / Math.sqrt(numSatsTracked);
    const envMultiplier = environment === "open" ? 1.0 : environment === "canopy" ? 1.3 : environment === "canyon" ? 2.5 : 1.8;
    return {
      pdop: parseFloat((base * envMultiplier).toFixed(1)),
      hdop: parseFloat((base * 0.6 * envMultiplier).toFixed(1)),
      vdop: parseFloat((base * 0.8 * envMultiplier).toFixed(1))
    };
  };

  const dop = calculateDop();

  // Determine RTK solution state
  const getRtkState = () => {
    if (numSatsTracked < 4 || dop.pdop > 8.0) {
      return {
        status: "NO_FIX",
        color: "text-red-500 bg-red-500/10 border-red-500/20",
        label: lang === "fr" ? "AUCUN SIGNAL" : "لا توجد إشارة",
        desc: lang === "fr" ? "Pas assez de satellites. Fixation impossible." : "عدد غير كافٍ من الأقمار. تعذر التحديد.",
        precisionH: "—",
        precisionV: "—"
      };
    }
    if (numSatsTracked >= 4 && numSatsTracked < 7 || dop.pdop > 4.5) {
      const h = (dop.hdop * 0.85).toFixed(1);
      const v = (dop.vdop * 1.45).toFixed(1);
      return {
        status: "SINGLE",
        color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        label: lang === "fr" ? "GPS SIMPLE (DGPS)" : "رصد أحادي (DGPS)",
        desc: lang === "fr" ? "Positionnement standard, adapté au SIG basse résolution." : "تحديد موقع اعتيادي، مناسب لنظم المعلومات الجغرافية فقط.",
        precisionH: `${h} m`,
        precisionV: `${v} m`
      };
    }
    if (numSatsTracked >= 7 && numSatsTracked < 11 || dop.pdop > 2.2) {
      const h = (dop.hdop * 8.5).toFixed(0);
      const v = (dop.vdop * 14.5).toFixed(0);
      return {
        status: "FLOAT",
        color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
        label: lang === "fr" ? "RTK FLOAT (FLOTTANT)" : "رصد مالي مرن (FLOAT)",
        desc: lang === "fr" ? "Ambiguïtés non résolues. Précision décimétrique." : "مستويات دقة عشرية غير ثابتة.",
        precisionH: `${h} cm`,
        precisionV: `${v} cm`
      };
    }
    // Optimal RTK Fixed
    const h = (dop.hdop * 3.5).toFixed(1);
    const v = (dop.vdop * 6.5).toFixed(1);
    return {
      status: "FIXED",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
      label: lang === "fr" ? "RTK FIXED (CENTIMÉTRIQUE)" : "رصد ثابت دقيق (FIXED)",
      desc: lang === "fr" ? "Ambiguïtés résolues. Précision optimale recommandée pour cadastre." : "أعلى دقة طوبوغرافية ممكنة (مستوى السنتيمتر).",
      precisionH: `${h} mm`,
      precisionV: `${v} mm`
    };
  };

  const rtk = getRtkState();

  // Run a simulated survey measurement
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMeasuring) {
      interval = setInterval(() => {
        setMeasureProgress((prev) => {
          if (prev >= 100) {
            setIsMeasuring(false);
            return 100;
          }
          // Generate simulated measurement noise points around center
          const dispersion = rtk.status === "FIXED" ? 2 : rtk.status === "FLOAT" ? 15 : rtk.status === "SINGLE" ? 45 : 120;
          const theta = Math.random() * Math.PI * 2;
          const r = Math.random() * dispersion;
          const x = 100 + Math.cos(theta) * r;
          const y = 100 + Math.sin(theta) * r;
          setMeasureHistory((h) => [...h, { x, y }]);
          return prev + 5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isMeasuring, rtk.status]);

  const handleStartMeasurement = () => {
    if (rtk.status === "NO_FIX") return;
    setMeasureHistory([]);
    setMeasureProgress(0);
    setIsMeasuring(true);
  };

  return (
    <div className="w-full">
      {/* Outer Card */}
      <div className="glass-card rounded-[4rem] border-sky-500/10 overflow-hidden relative bg-zinc-950/40 backdrop-blur-xl p-8 md:p-16">
        
        {/* Subtle decorative mesh background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute -top-40 left-1/3 w-[40rem] h-[40rem] bg-sky-500/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Header Block */}
        <div className={`mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/5 ${isRTL ? "lg:flex-row-reverse text-right" : "text-left"}`}>
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-black text-sky-400 uppercase tracking-[0.4em] block">
              {lang === "fr" ? "LABORATOIRE GÉOMATIQUE INTERACTIF" : "مختبر جيوماتيكي تفاعلي"}
            </span>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
              {lang === "fr" ? "Constellations & Précision RTK" : "محاكي أقمار ورصد الـ RTK"}
            </h3>
            <p className="text-sm text-gray-400 font-light max-w-xl">
              {lang === "fr"
                ? "Découvrez l'impact de l'environnement, des masques d'élévation et des constellations (GPS, Galileo) sur la précision de nos relevés de terrain."
                : "اكتشف تأثير التضاريس والغطاء النباتي ونوعية الأقمار الاصطناعية على مستويات الدقة الميدانية لمسح الحدود والخرائط."}
            </p>
          </div>

          {/* Real-time Indicator status */}
          <div className={`flex items-center gap-4 border border-white/5 bg-white/5 p-4 rounded-3xl ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
            <Globe2 className="text-sky-400 shrink-0" size={24} />
            <div>
              <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block">SYSTEM INTEGRITY</span>
              <span className="text-xs font-black text-white uppercase tracking-wider font-mono">
                {lang === "fr" ? "Leica Reference Station" : "محطة رصد مرجعية لايكا"}
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT COLUMN: VISUALIZERS (SKYPLOT & NOISE CHART) */}
          <div className="lg:col-span-4 space-y-8 flex flex-col items-center justify-center">
            
            {/* 1. SKYPLOT (Radar circular view of satellites) */}
            <div className="relative w-full max-w-[320px] aspect-square rounded-full border border-white/10 bg-black/40 flex items-center justify-center overflow-hidden">
              {/* Radar Circular rings */}
              <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-white/5" />
              <div className="absolute w-[55%] h-[55%] rounded-full border border-dashed border-white/5" />
              <div className="absolute w-[30%] h-[30%] rounded-full border border-dashed border-white/5" />
              {/* Crosshair lines */}
              <div className="absolute w-full h-[1px] bg-white/5" />
              <div className="absolute h-full w-[1px] bg-white/5" />
              
              {/* Compass Cardinal Points */}
              <span className="absolute top-2 text-[8px] font-mono font-black text-gray-600">N</span>
              <span className="absolute bottom-2 text-[8px] font-mono font-black text-gray-600">S</span>
              <span className="absolute right-2 text-[8px] font-mono font-black text-gray-600">E</span>
              <span className="absolute left-2 text-[8px] font-mono font-black text-gray-600">W</span>

              {/* Simulated Horizon Boundary Gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(14,165,233,0.02)_100%)]" />

              {/* Active/Inactive Satellites Plotting */}
              {satellites.map((sat) => {
                // Determine radial position based on Elevation (90 is center, 0 is outer edge)
                const radiusPercent = (90 - sat.elevation) / 90; // 0 (center) to 1 (edge)
                const maxRadius = 135; // px (half of 270)
                const r = radiusPercent * maxRadius;
                
                // Angle in radians (compensating offset to make Azimuth 0 at Top/North)
                const rad = ((sat.azimuth - 90) * Math.PI) / 180;
                const x = r * Math.cos(rad);
                const y = r * Math.sin(rad);

                const isTracked = activeSats.some((as) => as.id === sat.id);

                return (
                  <motion.div
                    key={sat.id}
                    className="absolute w-3.5 h-3.5 rounded-full flex items-center justify-center"
                    style={{ x, y }}
                    animate={{
                      scale: isTracked ? [1, 1.1, 1] : 1,
                      opacity: isTracked ? 1 : 0.15
                    }}
                    transition={{
                      repeat: isTracked ? Infinity : 0,
                      repeatDelay: 3 + Math.random() * 5,
                      duration: 1
                    }}
                  >
                    {/* Constellation Color Dot */}
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      sat.constellation === "gps" ? "bg-amber-400" :
                      sat.constellation === "glonass" ? "bg-emerald-400" :
                      sat.constellation === "galileo" ? "bg-sky-400" :
                      "bg-purple-400"
                    } shadow-[0_0_8px_currentColor]`} />
                    
                    {/* Tooltip hovering */}
                    <div className="opacity-0 hover:opacity-100 absolute bg-black/90 text-white text-[8px] font-mono px-2 py-1 rounded border border-white/10 -top-8 pointer-events-none whitespace-nowrap z-30 transition-opacity">
                      {sat.id} (El: {Math.round(sat.elevation)}°)
                    </div>
                  </motion.div>
                );
              })}

              {/* Skyplot Title */}
              <div className="absolute bottom-4 bg-zinc-900/80 border border-white/5 px-4 py-1.5 rounded-full backdrop-blur-md">
                <span className="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest block">
                  {lang === "fr" ? "Skyplot des Signaux" : "مخطط الأفق لرصد الإشارات"}
                </span>
              </div>
            </div>

            {/* Micro legend */}
            <div className="flex flex-wrap gap-4 items-center justify-center text-[8px] font-black tracking-widest font-mono text-gray-500 uppercase">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                <span>GPS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span>GLONASS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-sky-400 rounded-full" />
                <span>GALILEO</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span>BEIDOU</span>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: PARAMETERS AND CONFIGURATION */}
          <div className="lg:col-span-4 space-y-8">
            <div className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
              <span className="text-[10px] font-mono font-black text-sky-400 uppercase tracking-widest block">CONFIG</span>
              <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">
                {lang === "fr" ? "Paramètres d'Observation" : "إعدادات الرصد الطوبوغرافي"}
              </h4>
            </div>

            {/* Environments Picker */}
            <div className="space-y-4">
              <label className={`text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest block ${isRTL ? "text-right" : "text-left"}`}>
                {lang === "fr" ? "1. Environnement de Mesure" : "1. طبيعة البيئة وموقع الرصد"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(envDetails) as Array<keyof typeof envDetails>).map((key) => {
                  const selected = environment === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setEnvironment(key)}
                      className={`p-4 rounded-2xl border text-left flex flex-col gap-1 transition-all duration-300 ${
                        selected 
                          ? "bg-sky-500/10 border-sky-400 text-white" 
                          : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
                      } ${isRTL ? "text-right items-end" : "text-left items-start"}`}
                    >
                      <span className="text-xs font-black uppercase tracking-wider block">{envDetails[key].title}</span>
                      <span className="text-[8px] text-gray-500 leading-snug font-light block">{envDetails[key].desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Constellations checklist */}
            <div className="space-y-4">
              <label className={`text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest block ${isRTL ? "text-right" : "text-left"}`}>
                {lang === "fr" ? "2. Constellations Activées" : "2. كوكبة الأقمار المفعلة"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "gps", label: "GPS (USA)" },
                  { id: "glonass", label: "GLONASS (RU)" },
                  { id: "galileo", label: "GALILEO (EU)" },
                  { id: "beidou", label: "BEIDOU (CN)" }
                ].map((item) => {
                  const active = constellations[item.id as keyof typeof constellations];
                  return (
                    <button
                      key={item.id}
                      onClick={() => setConstellations(prev => ({ ...prev, [item.id]: !active }))}
                      className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-300 ${
                        active 
                          ? "bg-sky-500/10 border-sky-400 text-white" 
                          : "bg-white/5 border-white/5 text-gray-500 hover:border-white/10"
                      } ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-wider font-mono">{item.label}</span>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${active ? "border-sky-400 bg-sky-500" : "border-white/10 bg-black/40"}`}>
                        {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Elevation Cut-off Mask slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest">
                <span>{lang === "fr" ? "3. Masque d'Élévation" : "3. زاوية قطع الأفق (المسار)"}</span>
                <span className="text-sky-400">{elevationMask}°</span>
              </div>
              <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
                <input 
                  type="range" 
                  min="0" 
                  max="35" 
                  step="5"
                  value={elevationMask} 
                  onChange={(e) => setElevationMask(parseInt(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer h-1.5 bg-white/10 rounded-full appearance-none outline-none"
                />
                <span className="text-[8px] text-gray-500 font-light block leading-relaxed">
                  {lang === "fr" 
                    ? "Filtre les satellites bas sur l'horizon pour réduire le bruit atmosphérique." 
                    : "حجب الأقمار القريبة من الأفق لتقليل التشويش الجوي والمطابقة الضعيفة."}
                </span>
              </div>
            </div>

            {/* Regenerate sky button */}
            <button
              onClick={generateSatellites}
              className="flex items-center justify-center gap-2 text-[9px] font-mono font-black uppercase tracking-widest text-sky-400 hover:text-white transition-colors duration-300 w-full bg-white/5 border border-white/5 py-3 rounded-2xl"
            >
              <RefreshCw size={12} />
              {lang === "fr" ? "Régénérer Orbits Satellites" : "إعادة توليد مسارات الأقمار"}
            </button>
          </div>

          {/* RIGHT COLUMN: PRECISION METRICS & SURVEY TEST RIG */}
          <div className="lg:col-span-4">
            <div className="glass-card bg-white/[0.02] border-sky-500/20 p-10 rounded-[3rem] relative overflow-hidden space-y-8 shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-[50px] pointer-events-none" />

              <div className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                <span className="text-[9px] font-mono font-black text-sky-400 uppercase tracking-[0.3em] block">
                  {lang === "fr" ? "INSPECTION DU SIGNAL & CALCULS" : "فحص جودة الإشارة والحسابات"}
                </span>
                <h5 className="text-xl font-black text-white uppercase italic tracking-tighter">
                  {lang === "fr" ? "Résultats de Précision" : "مؤشرات الدقة الطوبوغرافية"}
                </h5>
              </div>

              {/* SOLUTION PILL */}
              <div className={`p-6 rounded-3xl border text-center ${rtk.color} transition-all duration-500`}>
                <span className="text-[10px] font-mono font-black uppercase tracking-widest block mb-2">
                  {lang === "fr" ? "État du Positionnement RTK" : "حالة رصد وتصحيح الـ RTK"}
                </span>
                <span className="text-2xl font-black tracking-tight block uppercase italic leading-none">{rtk.label}</span>
                <p className="text-[10px] font-light leading-relaxed mt-3 opacity-80">{rtk.desc}</p>
              </div>

              {/* DILUTION OF PRECISION & METRICS ACCORDION */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
                    {lang === "fr" ? "Satellites Utilisés" : "الأقمار المستخدمة"}
                  </span>
                  <span className="text-2xl font-black text-white font-mono">{numSatsTracked}</span>
                  <span className="text-[8px] text-gray-600 font-mono mt-0.5">Tracked ({activeSats.length})</span>
                </div>

                <div className="bg-black/30 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block mb-1">PDOP (Géométrie)</span>
                  <span className={`text-2xl font-black font-mono ${
                    dop.pdop < 2.0 ? "text-emerald-400" : dop.pdop < 4.0 ? "text-sky-400" : "text-red-400"
                  }`}>{dop.pdop}</span>
                  <span className="text-[8px] text-gray-600 font-mono mt-0.5">
                    {dop.pdop < 2.0 ? "Excellent" : dop.pdop < 4.0 ? "Moderate" : "Poor"}
                  </span>
                </div>
              </div>

              {/* ESTIMATED REAL-TIME ERROR METRICS */}
              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl space-y-4">
                <span className={`text-[10px] font-mono font-black text-sky-400 uppercase tracking-widest block ${isRTL ? "text-right" : "text-left"}`}>
                  {lang === "fr" ? "Marge d'Erreur Mesurée" : "هامش الخطأ المسجل"}
                </span>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-gray-500 uppercase tracking-wider block">{lang === "fr" ? "Horizontale" : "الأفقي"}</span>
                    <span className="text-lg font-black text-white font-mono">{rtk.precisionH}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-gray-500 uppercase tracking-wider block">{lang === "fr" ? "Verticale" : "العمودي"}</span>
                    <span className="text-lg font-black text-white font-mono">{rtk.precisionV}</span>
                  </div>
                </div>
              </div>

              {/* SIMULATED ACTIVE SURVEY TEST */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex justify-between items-center text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest">
                  <span>{lang === "fr" ? "Test de Mesure RTK" : "اختبار القياس الميداني التفاعلي"}</span>
                  {isMeasuring && <span className="text-sky-400 animate-pulse">{measureProgress}%</span>}
                </div>

                <div className="flex gap-4 items-center">
                  {/* Dynamic Measurement Sandbox Crosshair Graphics */}
                  <div className="w-24 h-24 bg-black/60 border border-white/10 rounded-2xl shrink-0 relative flex items-center justify-center overflow-hidden">
                    {/* Crosshair grids */}
                    <div className="absolute w-full h-[1px] bg-white/5" />
                    <div className="absolute h-full w-[1px] bg-white/5" />
                    <div className="absolute w-10 h-10 rounded-full border border-sky-500/20" />
                    <div className="absolute w-2 h-2 rounded-full border border-sky-500/50" />

                    {/* Plot history points representing scattering measurements noise */}
                    {measureHistory.map((pt, idx) => (
                      <div 
                        key={idx} 
                        className="absolute w-1 h-1 rounded-full bg-sky-400 shadow-[0_0_2px_#38bdf8]" 
                        style={{ left: `${pt.x / 2}%`, top: `${pt.y / 2}%` }}
                      />
                    ))}

                    {/* Centered measurement target circle */}
                    {isMeasuring && (
                      <motion.div 
                        className="absolute w-14 h-14 rounded-full border border-dashed border-sky-400/40"
                        animate={{ scale: [1, 0.4, 1], rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      />
                    )}
                  </div>

                  <div className="flex-grow space-y-3">
                    <button
                      onClick={handleStartMeasurement}
                      disabled={isMeasuring || rtk.status === "NO_FIX"}
                      className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl text-center border transition-all duration-300 ${
                        rtk.status === "NO_FIX" 
                          ? "bg-zinc-900 border-white/5 text-gray-600 cursor-not-allowed" 
                          : "bg-sky-500 border-sky-400 text-white hover:bg-sky-600 hover:scale-105"
                      }`}
                    >
                      {isMeasuring 
                        ? (lang === "fr" ? "MESURE EN COURS..." : "جاري القياس...") 
                        : (lang === "fr" ? "DÉMARRER MESURE" : "بدء قياس طوبوغرافي")}
                    </button>
                    <span className="text-[8px] text-gray-500 font-light block leading-relaxed">
                      {lang === "fr" 
                        ? "Simule l'accumulation statistique d'observations pour stabiliser la précision millimétrique." 
                        : "محاكاة التجميع الإحصائي لقراءات الأقمار لتأكيد مستويات الدقة المليمترية."}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
