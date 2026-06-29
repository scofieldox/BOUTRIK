import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plane, 
  Sliders, 
  Play, 
  Pause, 
  RefreshCw, 
  Cpu, 
  Layers, 
  Database, 
  HardDrive, 
  Map, 
  Satellite, 
  Ruler, 
  CheckCircle, 
  Info,
  ChevronRight,
  Sun,
  Eye,
  Activity,
  Maximize2
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "@/components/ui/button";

interface Point3D {
  x: number;
  y: number;
  z: number; // Elevation
  color: string;
  scanned: boolean;
}

export const DronePlanner: React.FC = () => {
  const { lang, isRTL } = useLanguage();
  
  // Drone Parameters
  const [altitude, setAltitude] = useState(80); // meters
  const [overlap, setOverlap] = useState(75); // percentage
  const [sensorType, setSensorType] = useState<"lidar" | "rgb">("lidar");
  const [sitePreset, setSitePreset] = useState<"marchica" | "urban" | "quarry">("marchica");
  
  // Simulation State
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dronePos, setDronePos] = useState({ x: 0, y: 0 });
  const [scannedCount, setScannedCount] = useState(0);
  const [viewMode, setViewMode] = useState<"heatmap" | "solid">("heatmap");

  // Grid / Point Cloud State
  const [points, setPoints] = useState<Point3D[]>([]);
  const animationRef = useRef<number | null>(null);

  // Constants based on site presets
  const presets = {
    marchica: {
      title: lang === "fr" ? "Lagune de Marchica" : "بحيرة مارتشيكا",
      desc: lang === "fr" ? "Zone côtière peu profonde, levés bathymétriques et terrestres combinés." : "منطقة ساحلية قليلة العمق، دمج المسح البري والبحري.",
      baseElevation: (x: number, y: number) => {
        // Coastal dunes & water channel
        return 5 + Math.sin(x / 5) * 3 + Math.cos(y / 5) * 2;
      }
    },
    urban: {
      title: lang === "fr" ? "Centre-Ville de Nador" : "وسط مدينة الناظور",
      desc: lang === "fr" ? "Haute densité de bâtiments, modélisation de façades et toitures." : "كثافة عالية من المباني، نمذجة الواجهات والأسطح.",
      baseElevation: (x: number, y: number) => {
        // Sharp building blocks
        const isBlock = (Math.floor(x / 4) + Math.floor(y / 4)) % 2 === 0;
        return isBlock ? 18 : 2;
      }
    },
    quarry: {
      title: lang === "fr" ? "Carrière de Selouane" : "مقالع سلوان",
      desc: lang === "fr" ? "Excavation profonde, calculs de cubatures et de volumes précis." : "حفر عميقة ومدرجات، حساب دقيق للأحجام والردم.",
      baseElevation: (x: number, y: number) => {
        // Deep pit steps
        const distToCenter = Math.sqrt(Math.pow(x - 10, 2) + Math.pow(y - 10, 2));
        return Math.max(1, 25 - distToCenter * 2.2);
      }
    }
  };

  // Generate initial point cloud grid (20x20 points for smooth browser rendering)
  const generatePoints = () => {
    const list: Point3D[] = [];
    const size = 20;
    const currentPreset = presets[sitePreset];

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const z = currentPreset.baseElevation(x, y);
        // Dynamic heatmap coloring based on elevation
        const hue = 195 + (z / 30) * 120; // range from sky blue to green/yellow
        const color = `hsla(${hue}, 90%, 50%, 0.85)`;

        list.push({
          x,
          y,
          z,
          color,
          scanned: false
        });
      }
    }
    setPoints(list);
    setProgress(0);
    setScannedCount(0);
    setDronePos({ x: 0, y: 0 });
    setIsPlaying(false);
  };

  useEffect(() => {
    generatePoints();
  }, [sitePreset, lang]);

  // Handle Play/Pause flight simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const nextVal = prev + 1.2;
          if (nextVal >= 100) {
            setIsPlaying(false);
            return 100;
          }

          // Compute drone flight path (Zig-zag sweeping across the grid)
          // 20 steps of X, and we sweep Y back and forth
          const pathProgress = (nextVal / 100) * 12; // 12 passes
          const xIndex = Math.min(19, Math.floor(pathProgress * 1.66));
          const direction = Math.floor(pathProgress) % 2 === 0;
          const yIndex = direction 
            ? Math.floor((pathProgress % 1) * 20) 
            : Math.floor((1 - (pathProgress % 1)) * 20);

          setDronePos({ x: xIndex, y: yIndex });

          // Update scanned status for points near the drone (simulation of LiDAR footprint)
          setPoints((prevPoints) => {
            let updated = false;
            const radius = sensorType === "lidar" ? 3 : 2; // LiDAR has wider/active swath
            
            const nextPoints = prevPoints.map((pt) => {
              const distance = Math.sqrt(Math.pow(pt.x - xIndex, 2) + Math.pow(pt.y - yIndex, 2));
              if (distance <= radius && !pt.scanned) {
                updated = true;
                return { ...pt, scanned: true };
              }
              return pt;
            });

            if (updated) {
              const totalScanned = nextPoints.filter((p) => p.scanned).length;
              setScannedCount(totalScanned);
            }

            return nextPoints;
          });

          return nextVal;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, sensorType]);

  // Derived output metrics
  const gsd = ((altitude * 1.2) / 100).toFixed(1); // Ground Sampling Distance in cm/px
  const density = sensorType === "lidar" 
    ? Math.round((1200 / altitude) * (overlap / 70)) 
    : Math.round((450 / altitude) * (overlap / 70)); // pts/m2

  const estFileSize = ((overlap * overlap * 120) / altitude).toFixed(0); // MB
  const estProcessTime = sensorType === "lidar" 
    ? ((overlap * 1.8) / 10).toFixed(1) 
    : ((overlap * 3.5) / 10).toFixed(1); // hours

  const handleReset = () => {
    generatePoints();
  };

  return (
    <div className="w-full">
      <div className="glass-card rounded-[4rem] border-sky-500/10 overflow-hidden relative bg-zinc-950/40 backdrop-blur-xl p-8 md:p-16">
        
        {/* Subtle mesh background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute -top-40 right-1/4 w-[50rem] h-[50rem] bg-sky-500/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Top Header */}
        <div className={`mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/5 ${isRTL ? "lg:flex-row-reverse text-right" : "text-left"}`}>
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-black text-sky-400 uppercase tracking-[0.4em] block">
              {lang === "fr" ? "SIMULATEUR DE RECONSTRUCTION NUMÉRIQUE" : "محاكي المسح الجوي والتوائم الرقمية"}
            </span>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
              {lang === "fr" ? "Planification de Vol LiDAR & Drone" : "مخطط طيران الدرون ونقاط الليدار"}
            </h3>
            <p className="text-sm text-gray-400 font-light max-w-xl">
              {lang === "fr"
                ? "Simulez une mission de numérisation 3D par drone. Configurez l'altitude de vol et le chevauchement pour voir la génération de nuages de points LiDAR."
                : "قم بمحاكاة مهمة مسح ثلاثي الأبعاد بالدرون. اضبط ارتفاع الطيران ونسبة التداخل لمشاهدة توليد سحب النقاط ثلاثية الأبعاد بدقة سنتيمترية."}
            </p>
          </div>

          {/* Preset Buttons Toggle */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(presets) as Array<keyof typeof presets>).map((pKey) => (
              <button
                key={pKey}
                onClick={() => setSitePreset(pKey)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                  sitePreset === pKey 
                    ? "bg-sky-500 border-sky-400 text-white shadow-[0_0_15px_rgba(14,165,233,0.2)]" 
                    : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                }`}
              >
                {presets[pKey].title}
              </button>
            ))}
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: INTERACTIVE FLIGHT FLIGHT-PATH PLANNER CONFIGURATIONS */}
          <div className="lg:col-span-4 space-y-8">
            <div className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
              <span className="text-[10px] font-mono font-black text-sky-400 uppercase tracking-widest block">CONTROL PANEL</span>
              <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">
                {lang === "fr" ? "Paramètres de Mission" : "إعدادات وهندسة الرحلة"}
              </h4>
            </div>

            {/* Sensor Type toggle */}
            <div className="space-y-3">
              <label className={`text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest block ${isRTL ? "text-right" : "text-left"}`}>
                {lang === "fr" ? "Type de Capteur Embarqué" : "نوع المستشعر المحمول جوّاً"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSensorType("lidar")}
                  className={`p-4 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all duration-300 ${
                    sensorType === "lidar" 
                      ? "bg-sky-500/10 border-sky-400 text-white" 
                      : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
                  }`}
                >
                  <Cpu size={18} className={sensorType === "lidar" ? "text-sky-400" : "text-gray-500"} />
                  <span className="text-[10px] font-black uppercase tracking-wider font-mono">LiDAR (Laser Actif)</span>
                </button>
                <button
                  onClick={() => setSensorType("rgb")}
                  className={`p-4 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all duration-300 ${
                    sensorType === "rgb" 
                      ? "bg-sky-500/10 border-sky-400 text-white" 
                      : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
                  }`}
                >
                  <Sun size={18} className={sensorType === "rgb" ? "text-sky-400" : "text-gray-500"} />
                  <span className="text-[10px] font-black uppercase tracking-wider font-mono">RGB Photogrammétrie</span>
                </button>
              </div>
            </div>

            {/* Altitude Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest">
                <span>{lang === "fr" ? "Altitude de Vol (AGL)" : "ارتفاع الطيران (فوق الأرض)"}</span>
                <span className="text-sky-400">{altitude} m</span>
              </div>
              <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
                <input 
                  type="range" 
                  min="40" 
                  max="150" 
                  step="10"
                  value={altitude} 
                  onChange={(e) => setAltitude(parseInt(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer h-1.5 bg-white/10 rounded-full appearance-none outline-none"
                />
                <div className="flex justify-between text-[8px] text-gray-600 font-mono">
                  <span>40m (Haute rés.)</span>
                  <span>150m (Grande zone)</span>
                </div>
              </div>
            </div>

            {/* Overlap Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest">
                <span>{lang === "fr" ? "Recouvrement Latéral & Longitudinal" : "نسبة التداخل الطولي والجانبي"}</span>
                <span className="text-sky-400">{overlap}%</span>
              </div>
              <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
                <input 
                  type="range" 
                  min="55" 
                  max="85" 
                  step="5"
                  value={overlap} 
                  onChange={(e) => setOverlap(parseInt(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer h-1.5 bg-white/10 rounded-full appearance-none outline-none"
                />
                <div className="flex justify-between text-[8px] text-gray-600 font-mono">
                  <span>55% (Rapide)</span>
                  <span>85% (3D Haute Précision)</span>
                </div>
              </div>
            </div>

            {/* Simulator action buttons */}
            <div className="pt-6 border-t border-white/5 flex gap-4">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-grow bg-sky-500 hover:bg-sky-600 text-white font-black rounded-2xl py-6 text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-sky-500/10 flex items-center justify-center gap-2 border-none"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                {isPlaying 
                  ? (lang === "fr" ? "PAUSE LE VOL" : "إيقاف الطيران") 
                  : (lang === "fr" ? "LANCER LE SCAN" : "بدء المسح الجوي")}
              </Button>
              <button
                onClick={handleReset}
                className="p-4 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 hover:border-white/15 rounded-2xl transition-all duration-300"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>

          {/* MIDDLE: THE ISOMETRIC 3D SCANNING STAGE */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* View Mode toggle (Heatmap or solid) */}
            <div className="w-full flex justify-end gap-2 mb-4">
              <button
                onClick={() => setViewMode("heatmap")}
                className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all ${
                  viewMode === "heatmap" ? "bg-sky-500/10 border-sky-400 text-sky-400" : "bg-white/5 border-white/5 text-gray-500 hover:text-white"
                }`}
              >
                {lang === "fr" ? "Altitudes" : "تلوين تضاريسي"}
              </button>
              <button
                onClick={() => setViewMode("solid")}
                className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all ${
                  viewMode === "solid" ? "bg-sky-500/10 border-sky-400 text-sky-400" : "bg-white/5 border-white/5 text-gray-500 hover:text-white"
                }`}
              >
                {lang === "fr" ? "Faisceau LiDAR" : "حزمة المسح"}
              </button>
            </div>

            {/* Isometric sandbox stage */}
            <div className="relative w-full aspect-square max-w-[360px] bg-black/60 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex items-center justify-center">
              
              {/* High-tech overlay grids */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(14,165,233,0.02)_100%)]" />
              
              <div className="absolute top-4 left-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                  {lang === "fr" ? `SCANNER: ${(scannedCount / 4).toFixed(0)}% SYNCHRONISÉ` : `نسبة المسح: ${(scannedCount / 4).toFixed(0)}%`}
                </span>
              </div>

              {/* ISOMETRIC TRANSLATION CONTAINER */}
              <div 
                className="relative w-[320px] h-[320px] transition-transform duration-500"
                style={{
                  transform: "rotateX(60deg) rotateZ(-45deg)",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Simulated Elevation Grid Points */}
                <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 gap-0">
                  {points.map((pt, idx) => {
                    // Compute altitude Z scaling for isometric height displacement
                    const isScanningRightNow = Math.abs(pt.x - dronePos.x) <= (sensorType === "lidar" ? 2.5 : 1.5) && Math.abs(pt.y - dronePos.y) <= (sensorType === "lidar" ? 2.5 : 1.5);
                    const zOffset = pt.scanned ? pt.z * 1.5 : 0;
                    
                    return (
                      <div
                        key={idx}
                        className="absolute w-2 h-2 rounded-full transition-all duration-500 flex items-center justify-center"
                        style={{
                          left: `${(pt.x / 20) * 100}%`,
                          top: `${(pt.y / 20) * 100}%`,
                          transform: `translateZ(${zOffset}px)`,
                          transformStyle: "preserve-3d"
                        }}
                      >
                        {/* Point Element */}
                        <div 
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            isScanningRightNow 
                              ? "bg-sky-400 scale-150 shadow-[0_0_8px_#0ea5e9]" 
                              : pt.scanned 
                                ? viewMode === "heatmap" ? "" : "bg-gray-500" 
                                : "bg-white/10"
                          }`}
                          style={{
                            backgroundColor: pt.scanned && viewMode === "heatmap" ? pt.color : undefined,
                            boxShadow: pt.scanned && viewMode === "heatmap" ? `0 0 4px ${pt.color}` : undefined
                          }}
                        />

                        {/* Active LiDAR Laser Sweeper Ray Lines */}
                        {isScanningRightNow && isPlaying && (
                          <div 
                            className="absolute bg-gradient-to-t from-sky-400 to-transparent w-[1px] pointer-events-none"
                            style={{
                              height: `${altitude * 0.8}px`,
                              transform: `translateZ(-${altitude * 0.4}px)`,
                              opacity: 0.15
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* THE DRONE GRAPHIC FLYING IN 3D STAGE */}
                <motion.div
                  className="absolute w-10 h-10 flex items-center justify-center"
                  animate={{
                    left: `${(dronePos.x / 20) * 100}%`,
                    top: `${(dronePos.y / 20) * 100}%`
                  }}
                  transition={{
                    type: "tween",
                    ease: "linear",
                    duration: 0.05
                  }}
                  style={{
                    transform: `translateZ(${altitude * 0.9}px)`,
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Drone SVG */}
                  <div className="relative text-sky-400 flex items-center justify-center">
                    <Plane size={24} className="rotate-45 drop-shadow-[0_0_10px_#0ea5e9]" />
                    
                    {/* Sweeping Cone laser beam */}
                    <div 
                      className="absolute rounded-full pointer-events-none border border-sky-400/30 bg-gradient-to-b from-sky-500/10 to-transparent"
                      style={{
                        width: sensorType === "lidar" ? "70px" : "45px",
                        height: sensorType === "lidar" ? "70px" : "45px",
                        transform: `translateZ(-${altitude * 0.8}px)`,
                        borderRadius: "50%",
                        opacity: isPlaying ? 0.2 : 0
                      }}
                    />

                    {/* Blade spin animation indicator */}
                    <motion.div 
                      className="absolute -inset-1 border border-dashed border-sky-500/50 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}
                    />
                  </div>
                </motion.div>

              </div>

              {/* Real-time scanning feedback banner */}
              <div className="absolute bottom-6 left-6 right-6 bg-zinc-900/90 border border-white/5 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between text-[10px] font-mono">
                <div className="flex items-center gap-2">
                  <Activity size={12} className="text-sky-400 animate-pulse" />
                  <span className="text-gray-400 font-light">Status:</span>
                  <span className="text-white uppercase font-black">
                    {isPlaying 
                      ? (lang === "fr" ? "Numérisation..." : "جاري الرفع...") 
                      : progress >= 100 
                        ? (lang === "fr" ? "Terminé" : "تم المسح") 
                        : (lang === "fr" ? "Prêt" : "جاهز للبدء")}
                  </span>
                </div>
                <div className="text-sky-400 font-black">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: RESOLUTION & ACCURACY METRICS SCREEN */}
          <div className="lg:col-span-4">
            <div className="glass-card bg-white/[0.02] border-sky-500/20 p-10 rounded-[3rem] relative overflow-hidden space-y-8 shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-[50px] pointer-events-none" />

              <div className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                <span className="text-[9px] font-mono font-black text-sky-400 uppercase tracking-[0.3em] block">
                  {lang === "fr" ? "METRIQUES DE RECONSTRUCTION" : "مخرجات دقة النمذجة الرقمية"}
                </span>
                <h5 className="text-xl font-black text-white uppercase italic tracking-tighter">
                  {lang === "fr" ? "Qualité Spatiale" : "جودة البيانات الجيومجالية"}
                </h5>
              </div>

              {/* ESTIMATED GROUND RESOLUTION (GSD) PILL */}
              <div className="bg-black/30 border border-white/5 p-6 rounded-3xl flex flex-col gap-1 items-center justify-center text-center">
                <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block mb-2">
                  {lang === "fr" ? "Résolution Terrestre (GSD)" : "حجم عينة الأرض (GSD)"}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white font-mono">{gsd}</span>
                  <span className="text-sm font-black text-sky-400 uppercase tracking-wider font-mono">cm / pixel</span>
                </div>
                <p className="text-[9px] font-light text-gray-400 mt-2">
                  {lang === "fr" 
                    ? "Taille minimale détectable au sol pour orthophoto." 
                    : "حجم البكسل الميداني الأصغر القابل للتحديد في الخريطة."}
                </p>
              </div>

              {/* SYSTEM DENSITY AND SIZE SPECS */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
                    {lang === "fr" ? "Densité Nuage" : "كثافة النقاط"}
                  </span>
                  <span className="text-lg font-black text-white font-mono">{density} pts/m²</span>
                  <span className="text-[8px] text-gray-600 font-mono mt-0.5">LiDAR density</span>
                </div>

                <div className="bg-black/30 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
                    {lang === "fr" ? "Taille Est. Fichier" : "حجم الملف المتوقع"}
                  </span>
                  <span className="text-lg font-black text-white font-mono">{estFileSize} MB</span>
                  <span className="text-[8px] text-gray-600 font-mono mt-0.5">LAS / LAZ point cloud</span>
                </div>
              </div>

              {/* TIMELINE SPECS AND COMPUTER LOAD */}
              <div className="space-y-4">
                <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                  <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400 border border-sky-500/20 shrink-0">
                    <Database size={14} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">{lang === "fr" ? "Temps de Calcul Recommandé" : "زمن معالجة البيانات وتصحيحها"}</span>
                    <p className="text-xs font-black text-white font-mono uppercase">{estProcessTime} hours on Leica Infinity</p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                  <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400 border border-sky-500/20 shrink-0">
                    <CheckCircle size={14} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">{lang === "fr" ? "Livrable Livré Certifié" : "صيغة الملفات المسلمة للعميل"}</span>
                    <ul className="text-[10px] text-gray-400 font-light flex flex-wrap gap-1.5 pt-1">
                      {["LAS", "XYZ", "DXF AutoCAD", "TIF DEM"].map((ext) => (
                        <li key={ext} className="px-2 py-0.5 bg-white/5 rounded border border-white/5 text-[8px] font-mono font-black text-gray-300">
                          .{ext}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* SUMMARY INFO SECTION */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3 text-[10px] text-gray-500 leading-normal">
                <Info size={14} className="text-sky-500 shrink-0" />
                <span>
                  {lang === "fr"
                    ? "Les vols à Nador sont soumis aux autorisations de la DGA / ANRT. Nos drones sont homologués."
                    : "عمليات الطيران الجوي بإقليم الناظور والشرق تخضع للتراخيص المخزنية والأمنية المعمول بها."}
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
