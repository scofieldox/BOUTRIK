import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  Ruler, 
  Layers, 
  Plane, 
  Hammer, 
  Mountain, 
  Trees, 
  Building, 
  Gauge, 
  Clock, 
  Cpu, 
  Coins, 
  CheckCircle2, 
  Info,
  ArrowRight,
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "@/components/ui/button";

interface CostEstimatorProps {
  onApplyEstimate: (estimateText: string, subject: string) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onApplyEstimate }) => {
  const { lang, isRTL } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step State
  const [serviceType, setServiceType] = useState("topo");
  const [landArea, setLandArea] = useState(2000); // square meters
  const [terrainComplexity, setTerrainComplexity] = useState("flat");
  const [urgency, setUrgency] = useState("standard");

  // Output Calculations
  const [estimatedCost, setEstimatedCost] = useState({ min: 0, max: 0 });
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [mobilizedTech, setMobilizedTech] = useState<string[]>([]);

  const services = [
    { 
      id: "topo", 
      title: lang === "fr" ? "Levés Topographiques" : "المسح الطوبوغرافي", 
      desc: lang === "fr" ? "Prise de mesures précises sur le terrain pour délimitation et plans." : "قياسات دقيقة للميدان والحدود والخرائط.",
      icon: Compass,
      baseRate: 1.5, // MAD per sqm
      baseFee: 3000 // MAD flat minimum
    },
    { 
      id: "foncier", 
      title: lang === "fr" ? "Droit Foncier & Cadastre" : "القانون العقاري والمسح العقاري", 
      desc: lang === "fr" ? "Mise en concordance, éclatement de titres, bornage et dossiers ANCFCC." : "المطابقة وتجزئة الرسوم العقارية وتحديد الحدود وملفات المحافظة العقارية.",
      icon: Ruler,
      baseRate: 2.0,
      baseFee: 4500
    },
    { 
      id: "sig", 
      title: lang === "fr" ? "SIG, Drone & LiDAR" : "نظم المعلومات وليدار والدرون", 
      desc: lang === "fr" ? "Modélisation 3D haute densité par drone et intégration SIG." : "النمذجة ثلاثية الأبعاد عالية الدقة بواسطة الدرون ونظم المعلومات الجغرافية.",
      icon: Plane,
      baseRate: 2.5,
      baseFee: 6000
    },
    { 
      id: "vrde", 
      title: lang === "fr" ? "VRD & Génie Civil" : "شبه الطرق والتطهير والهندسة المدنية", 
      desc: lang === "fr" ? "Implantation de réseaux, suivi d'orages, calcul de cubatures." : "تخطيط الشبكات ومتابعة الأوراش وحساب الأحجام والردم.",
      icon: Hammer,
      baseRate: 3.0,
      baseFee: 8000
    }
  ];

  const complexities = [
    { 
      id: "flat", 
      title: lang === "fr" ? "Plat / Urbain" : "مستوٍ / حضري", 
      desc: lang === "fr" ? "Accès facile, terrain dégagé, pas d'obstacles majeurs." : "سهل الوصول، أرض مكشوفة، لا توجد عوائق كبيرة.",
      multiplier: 1.0,
      icon: Layers
    },
    { 
      id: "hilly", 
      title: lang === "fr" ? "Vallonné / Végétation" : "متموج / غطاء نباتي", 
      desc: lang === "fr" ? "Pentes modérées ou présence d'arbres et buissons." : "منحدرات متوسطة أو وجود أشجار وشجيرات كثيفة.",
      multiplier: 1.3,
      icon: Trees
    },
    { 
      id: "mountainous", 
      title: lang === "fr" ? "Montagneux / Accidenté" : "جبلي / وعر للغاية", 
      desc: lang === "fr" ? "Fortes déclivités, falaises, ou environnement très dense." : "منحدرات حادة، جروف، أو بيئة وعرة جداً.",
      multiplier: 1.7,
      icon: Mountain
    }
  ];

  // Dynamic calculations based on state variables
  useEffect(() => {
    const selectedService = services.find(s => s.id === serviceType) || services[0];
    const selectedComplexity = complexities.find(c => c.id === terrainComplexity) || complexities[0];

    // Base Math
    let calculatedBase = selectedService.baseFee;
    let variableRate = selectedService.baseRate * landArea * selectedComplexity.multiplier;
    
    // Scale discount for larger areas to keep estimates realistic
    if (landArea > 5000) {
      variableRate = variableRate * 0.85;
    }
    if (landArea > 20000) {
      variableRate = variableRate * 0.7;
    }

    let totalEstimate = calculatedBase + variableRate;

    // Urgency modifier
    if (urgency === "express") {
      totalEstimate *= 1.35;
    }

    // Min-Max range
    const minCost = Math.round(totalEstimate * 0.9);
    const maxCost = Math.round(totalEstimate * 1.15);

    setEstimatedCost({ min: minCost, max: maxCost });

    // Duration computation
    let days = 2;
    if (landArea > 1000) days += 1;
    if (landArea > 5000) days += 2;
    if (landArea > 20000) days += 4;
    if (terrainComplexity === "hilly") days += 1;
    if (terrainComplexity === "mountainous") days += 2;
    if (urgency === "express") days = Math.max(2, Math.round(days * 0.6));

    const durationText = lang === "fr" 
      ? `${days} à ${days + 2} jours ouvrés` 
      : `${days} إلى ${days + 2} أيام عمل`;
    setEstimatedDuration(durationText);

    // Dynamic Mobilized tech description
    const tech = ["Récepteur GNSS RTK de haute précision (Centimétrique)"];
    if (serviceType === "topo" || serviceType === "foncier") {
      tech.push("Station Totale robotisée Leica TS16");
    }
    if (serviceType === "sig" || terrainComplexity === "mountainous") {
      tech.push("Drone professionnel LiDAR & Photogrammétrie DJI Matrice RTK");
    }
    if (serviceType === "vrde") {
      tech.push("Niveau optique de précision & scanners de réseaux");
    }
    setMobilizedTech(tech);

  }, [serviceType, landArea, terrainComplexity, urgency, lang]);

  const handleApply = () => {
    const selectedService = services.find(s => s.id === serviceType);
    const selectedComplexity = complexities.find(c => c.id === terrainComplexity);
    
    const subject = lang === "fr" 
      ? `Demande de Devis - ${selectedService?.title}` 
      : `طلب تقدير تكلفة - ${selectedService?.title}`;

    const estimateText = lang === "fr"
      ? `Bonjour, j'aimerais obtenir un devis formel basé sur l'estimation en ligne suivante :
- Service demandé : ${selectedService?.title}
- Superficie approximative : ${landArea} m²
- Complexité du terrain : ${selectedComplexity?.title}
- Degré d'urgence : ${urgency === "express" ? "Urgent (Express)" : "Standard"}
- Coût estimatif indicatif : ${estimatedCost.min.toLocaleString()} - ${estimatedCost.max.toLocaleString()} MAD
- Durée estimée de la mission : ${estimatedDuration}

Merci de me recontacter pour planifier une visite technique.`
      : `مرحباً، أود الحصول على عرض سعر رسمي بناءً على تقدير التكلفة الفوري التالي:
- الخدمة المطلوبة: ${selectedService?.title}
- المساحة التقريبية: ${landArea} متر مربع
- طبيعة العقار: ${selectedComplexity?.title}
- درجة الاستعجال: ${urgency === "express" ? "مستعجل (سريع)" : "عادي"}
- التكلفة التقريبية الاسترشادية: ${estimatedCost.min.toLocaleString()} - ${estimatedCost.max.toLocaleString()} درهم مغربي
- المدة المتوقعة للعمل: ${estimatedDuration}

يرجى التواصل معي لتنسيق الزيارة الميدانية.`;

    onApplyEstimate(estimateText, subject);
    
    // Smooth scroll down to the contact form container
    const formElement = document.querySelector("form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const getStepProgress = () => {
    return (currentStep / 3) * 100;
  };

  return (
    <div className="w-full">
      {/* Container Card */}
      <div className="glass-card rounded-[4rem] border-sky-500/10 overflow-hidden relative bg-zinc-950/40 backdrop-blur-xl p-8 md:p-16">
        
        {/* Subtle decorative mesh background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Header */}
        <div className={`mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/5 ${isRTL ? "md:flex-row-reverse text-right" : "text-left"}`}>
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-black text-sky-400 uppercase tracking-[0.4em] block">
              {lang === "fr" ? "ESTIMATEUR DE PROJET INSTANTANÉ" : "مستشار التكلفة الفوري للمشاريع"}
            </span>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
              {lang === "fr" ? "Configurez Votre Mission" : "قم بتهيئة عمليتك الطوبوغرافية"}
            </h3>
            <p className="text-sm text-gray-400 font-light max-w-xl">
              {lang === "fr"
                ? "Calculez une estimation budgétaire en temps réel pour vos levés topographiques, dossiers fonciers ou scans drone à Nador."
                : "احسب تقدير الميزانية الفوري لمشاريع المسح الطوبوغرافي، العقار، أو مسح الدرون بإقليم الناظور والجهة الشرقية."}
            </p>
          </div>
          
          {/* Progress Indicator */}
          <div className={`flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="text-right">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">{lang === "fr" ? "Étape" : "الخطوة"}</span>
              <span className="text-2xl font-black text-white font-mono">{currentStep} / 3</span>
            </div>
            <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-sky-500 shadow-[0_0_10px_#0ea5e9]"
                initial={{ width: "33%" }}
                animate={{ width: `${getStepProgress()}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Main Grid: Configurator on Left, Instant Results on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT SIDE: STEPPED INPUTS */}
          <div className="lg:col-span-7 space-y-12 min-h-[420px]">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: SERVICE TYPE */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -30 : 30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                    <span className="text-[10px] font-mono font-black text-sky-400 uppercase tracking-widest block">STEP 01</span>
                    <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                      {lang === "fr" ? "Quel est le type de service requis ?" : "ما هي نوعية الخدمة المطلوبة؟"}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {services.map((srv) => {
                      const Icon = srv.icon;
                      const selected = serviceType === srv.id;
                      return (
                        <button
                          key={srv.id}
                          onClick={() => setServiceType(srv.id)}
                          className={`p-8 rounded-[2.5rem] border text-left flex flex-col gap-6 transition-all duration-500 group relative ${
                            selected 
                              ? "bg-sky-500/10 border-sky-400 shadow-[0_0_30px_rgba(14,165,233,0.1)]" 
                              : "bg-white/5 border-white/5 hover:border-white/15"
                          } ${isRTL ? "text-right items-end" : "text-left items-start"}`}
                        >
                          <div className={`p-4 rounded-2xl border transition-all duration-500 ${
                            selected ? "bg-sky-500 text-white border-sky-400" : "bg-white/5 text-gray-400 border-white/5 group-hover:text-white"
                          }`}>
                            <Icon size={20} />
                          </div>
                          <div className="space-y-2">
                            <span className="text-lg font-black text-white block uppercase italic tracking-tighter leading-tight group-hover:text-sky-400 transition-colors">
                              {srv.title}
                            </span>
                            <p className="text-xs text-gray-400 font-light leading-relaxed">
                              {srv.desc}
                            </p>
                          </div>
                          
                          {/* Checked corner indicator */}
                          {selected && (
                            <div className={`absolute top-6 right-6 w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: LAND AREA SIZE */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -30 : 30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-12"
                >
                  <div className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                    <span className="text-[10px] font-mono font-black text-sky-400 uppercase tracking-widest block">STEP 02</span>
                    <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                      {lang === "fr" ? "Quelle est la superficie approximative ?" : "ما هي المساحة التقريبية للعقار؟"}
                    </h4>
                  </div>

                  {/* High Quality Slider and Custom Presets */}
                  <div className="space-y-8 bg-white/5 border border-white/5 p-8 md:p-12 rounded-[3rem]">
                    <div className="flex justify-between items-end">
                      <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">
                        {lang === "fr" ? "Superficie de l'assiette" : "مساحة الوعاء العقاري"}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white font-mono">{landArea.toLocaleString()}</span>
                        <span className="text-sm font-black text-sky-400 font-mono">M²</span>
                      </div>
                    </div>

                    <div className="relative pt-6">
                      <input 
                        type="range" 
                        min="100" 
                        max="50000" 
                        step="100"
                        value={landArea} 
                        onChange={(e) => setLandArea(parseInt(e.target.value))}
                        className="w-full accent-sky-500 cursor-pointer h-2 bg-white/10 rounded-full appearance-none outline-none focus:outline-none"
                      />
                      <div className="flex justify-between text-[10px] text-gray-600 font-mono mt-4">
                        <span>100 m²</span>
                        <span>10 000 m²</span>
                        <span>25 000 m²</span>
                        <span>50 000 m²</span>
                      </div>
                    </div>

                    {/* Presets Buttons */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      {[
                        { label: lang === "fr" ? "Maison / Villa" : "منزل / فيلا", value: 300 },
                        { label: lang === "fr" ? "Lotissement" : "تجزئة سكنية", value: 5000 },
                        { label: lang === "fr" ? "Grand Domaine" : "عقار زراعي كبير", value: 30000 }
                      ].map((preset) => (
                        <button
                          key={preset.value}
                          onClick={() => setLandArea(preset.value)}
                          className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                            landArea === preset.value 
                              ? "bg-sky-500 border-sky-400 text-white" 
                              : "bg-white/5 border-white/5 text-gray-400 hover:border-white/15 hover:text-white"
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: TERRAIN COMPLEXITY & URGENCY */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -30 : 30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-10"
                >
                  <div className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                    <span className="text-[10px] font-mono font-black text-sky-400 uppercase tracking-widest block">STEP 03</span>
                    <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                      {lang === "fr" ? "Quel est le relief & l'urgence ?" : "ما هي تضاريس الأرض ودرجة الاستعجال؟"}
                    </h4>
                  </div>

                  {/* Complexity Segmented Toggle */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-mono font-black text-sky-400 uppercase tracking-widest ml-2 block">
                      {lang === "fr" ? "Relief / Environnement" : "تضاريس الأرض والبيئة المحيطة"}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {complexities.map((comp) => {
                        const Icon = comp.icon;
                        const selected = terrainComplexity === comp.id;
                        return (
                          <button
                            key={comp.id}
                            onClick={() => setTerrainComplexity(comp.id)}
                            className={`p-6 rounded-3xl border flex flex-col gap-4 text-left transition-all duration-500 ${
                              selected 
                                ? "bg-sky-500/10 border-sky-400 text-white" 
                                : "bg-white/5 border-white/5 text-gray-400 hover:border-white/15"
                            } ${isRTL ? "text-right items-end" : "text-left items-start"}`}
                          >
                            <Icon size={18} className={selected ? "text-sky-400" : "text-gray-500"} />
                            <div className="space-y-1">
                              <span className="text-xs font-black uppercase tracking-wider block">{comp.title}</span>
                              <span className="text-[10px] text-gray-500 font-light leading-snug block">{comp.desc}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Urgency Level */}
                  <div className="space-y-4 pt-4">
                    <label className="text-[10px] font-mono font-black text-sky-400 uppercase tracking-widest ml-2 block">
                      {lang === "fr" ? "Délai de livraison souhaité" : "أجل تسليم المشروع المرغوب فيه"}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: "standard", title: lang === "fr" ? "Standard (Défaut)" : "عادي (افتراضي)", desc: lang === "fr" ? "Délai optimisé standard" : "الجدول الزمني الاعتيادي" },
                        { id: "express", title: lang === "fr" ? "Express (+35%)" : "مستعجل (+35%)", desc: lang === "fr" ? "Priorité absolue sur le terrain" : "أولوية قصوى للفريق الميداني" }
                      ].map((urg) => (
                        <button
                          key={urg.id}
                          onClick={() => setUrgency(urg.id)}
                          className={`p-6 rounded-3xl border flex flex-col text-left gap-2 transition-all duration-500 ${
                            urgency === urg.id 
                              ? "bg-sky-500/10 border-sky-400 text-white" 
                              : "bg-white/5 border-white/5 text-gray-400 hover:border-white/15"
                          } ${isRTL ? "text-right items-end" : "text-left items-start"}`}
                        >
                          <span className="text-xs font-black uppercase tracking-wider block">{urg.title}</span>
                          <span className="text-[10px] text-gray-500 font-light block">{urg.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stepper Navigation Buttons */}
            <div className={`flex items-center justify-between pt-10 border-t border-white/5 ${isRTL ? "flex-row-reverse" : ""}`}>
              {currentStep > 1 ? (
                <Button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  variant="outline"
                  className="rounded-2xl border-white/10 text-white hover:bg-white/5 px-8 py-5 text-[10px] font-black uppercase tracking-widest"
                >
                  <ArrowLeft size={14} className={isRTL ? "ml-2 rotate-180" : "mr-2"} /> {lang === "fr" ? "Précédent" : "السابق"}
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <Button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-sky-500/10"
                >
                  {lang === "fr" ? "Suivant" : "التالي"} <ArrowRight size={14} className={isRTL ? "mr-2 rotate-180" : "ml-2"} />
                </Button>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* RIGHT SIDE: INSTANT REAL-TIME CALCULATION SCREEN */}
          <div className="lg:col-span-5">
            <div className="glass-card bg-white/[0.02] border-sky-500/20 p-10 rounded-[3rem] relative overflow-hidden space-y-10 shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-[50px] pointer-events-none" />
              
              {/* Dynamic Simulated Terrain Elevation Graphic matching selected Reliefe! */}
              <div className="absolute top-8 right-8 w-20 h-10 pointer-events-none opacity-40">
                <svg viewBox="0 0 100 50" className="w-full h-full text-sky-400">
                  {terrainComplexity === "flat" && (
                    <path d="M 0 40 L 25 40 L 50 38 L 75 41 L 100 40 L 100 50 L 0 50 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
                  )}
                  {terrainComplexity === "hilly" && (
                    <path d="M 0 45 Q 25 15, 50 35 T 100 40 L 100 50 L 0 50 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
                  )}
                  {terrainComplexity === "mountainous" && (
                    <path d="M 0 45 L 30 10 L 60 35 L 80 5 L 100 40 L 100 50 L 0 50 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
                  )}
                </svg>
              </div>

              <div className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                <span className="text-[9px] font-mono font-black text-sky-400 uppercase tracking-[0.3em] block">
                  {lang === "fr" ? "RÉSUMÉ BUDGETAIRE ESTIMATIF" : "ملخص التقدير المالي"}
                </span>
                <h5 className="text-xl font-black text-white uppercase italic tracking-tighter">
                  {lang === "fr" ? "Indicateur Financier" : "المؤشر المالي للمشروع"}
                </h5>
              </div>

              {/* ESTIMATED RANGE */}
              <div className="bg-black/30 border border-white/5 p-8 rounded-3xl space-y-4 text-center">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                  {lang === "fr" ? "Budget Prévisionnel indicatif" : "الميزانية المتوقعة الاسترشادية"}
                </span>
                
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-3xl sm:text-5xl font-black text-white font-mono flex items-center justify-center gap-2 tracking-tighter">
                    <span className="text-sky-400">{estimatedCost.min.toLocaleString()}</span>
                    <span className="text-gray-600 text-2xl font-light">-</span>
                    <span>{estimatedCost.max.toLocaleString()}</span>
                  </div>
                  <span className="text-sm font-black text-sky-400 tracking-wider font-mono">MAD (DIRHAM)</span>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] text-gray-500">
                  <Info size={12} className="text-sky-500" />
                  <span>{lang === "fr" ? "TVA non incluse. Visite terrain requise." : "لا يشمل الضريبة. يتطلب زيارة ميدانية."}</span>
                </div>
              </div>

              {/* TIMELINE & MOBILIZATION METRICS */}
              <div className="space-y-6">
                {/* Duration */}
                <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                  <div className="p-3 bg-sky-500/10 rounded-2xl text-sky-400 border border-sky-500/20 shrink-0">
                    <Clock size={16} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">{lang === "fr" ? "Délai de Réalisation Estimé" : "مدة الإنجاز المتوقعة"}</span>
                    <p className="text-sm font-black text-white uppercase tracking-wider">{estimatedDuration}</p>
                  </div>
                </div>

                {/* Mobilized Tech */}
                <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                  <div className="p-3 bg-sky-500/10 rounded-2xl text-sky-400 border border-sky-500/20 shrink-0">
                    <Cpu size={16} />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">{lang === "fr" ? "Équipements Mobilisés" : "المعدات الطوبوغرافية المعبأة"}</span>
                    <ul className="space-y-2">
                      {mobilizedTech.map((techItem, idx) => (
                        <li key={idx} className={`flex items-center gap-2 text-xs text-gray-400 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                          <CheckCircle2 size={12} className="text-sky-400 shrink-0" />
                          <span className="font-light">{techItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <Button
                onClick={handleApply}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black rounded-2xl py-8 text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-sky-500/20 border-none transition-all duration-500 hover:scale-105"
              >
                {lang === "fr" ? "Appliquer l'estimation au message" : "تطبيق التقدير على الرسالة"}
              </Button>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};
