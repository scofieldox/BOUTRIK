import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  AreaChart,
  Area,
  LineChart,
  Line
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';
import { 
  TrendingUp, 
  Layers, 
  Plane, 
  Map as MapIcon, 
  Activity, 
  Sparkles,
  Award
} from 'lucide-react';

interface MetricData {
  year: string;
  topography: number;
  uav: number;
  gis: number;
  total: number;
}

interface AreaCoverageData {
  year: string;
  sqKm: number;
  accuracyMm: number;
}

// Highly realistic and impressive geodetic & drone output stats
const annualProjectData: MetricData[] = [
  { year: '2021', topography: 14, uav: 6, gis: 8, total: 28 },
  { year: '2022', topography: 22, uav: 15, gis: 12, total: 49 },
  { year: '2023', topography: 35, uav: 28, gis: 18, total: 81 },
  { year: '2024', topography: 48, uav: 45, gis: 26, total: 119 },
  { year: '2025', topography: 62, uav: 72, gis: 38, total: 172 },
  { year: '2026', topography: 78, uav: 94, gis: 50, total: 222 }, // Projected / current running total
];

const coverageData: AreaCoverageData[] = [
  { year: '2021', sqKm: 120, accuracyMm: 15 },
  { year: '2022', sqKm: 340, accuracyMm: 10 },
  { year: '2023', sqKm: 780, accuracyMm: 5 },
  { year: '2024', sqKm: 1450, accuracyMm: 3 },
  { year: '2025', sqKm: 2800, accuracyMm: 2 },
  { year: '2026', sqKm: 4350, accuracyMm: 1 }, // Target precision/area coverage
];

export default function ProjectMetrics() {
  const { lang, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<'growth' | 'coverage'>('growth');
  const [hoveredData, setHoveredData] = useState<any>(null);

  // Content translations
  const content = {
    title: {
      fr: "Métriques de Performance & Croissance",
      ar: "مقاييس الأداء ومعدلات النمو"
    },
    subtitle: {
      fr: "Suivi technologique",
      ar: "التتبع التكنولوجي"
    },
    desc: {
      fr: "Analyse quantitative de nos réalisations géospatiales. Une croissance soutenue portée par l'intégration massive de l'ingénierie UAV et des technologies de précision.",
      ar: "تحليل كمي لإنجازاتنا الجيومكانية. نمو مستمر مدعوم بالاعتماد الواسع النطاق لمسح الدرون الجوي وتقنيات الرفع الهندسي فائقة الدقة."
    },
    tabGrowth: {
      fr: "Projets Complétés",
      ar: "المشاريع المنجزة"
    },
    tabCoverage: {
      fr: "Couverture & Précision",
      ar: "المساحة والدقة"
    },
    chartTopo: {
      fr: "Topographie Classique",
      ar: "طبوغرافيا كلاسيكية"
    },
    chartUav: {
      fr: "Photogrammétrie UAV",
      ar: "المسح الجوي (درون)"
    },
    chartGis: {
      fr: "Systèmes d'Information (SIG)",
      ar: "نظم المعلومات (SIG)"
    },
    chartTotal: {
      fr: "Volume Global de Projets",
      ar: "مجموع المشاريع"
    },
    metricTotalTitle: {
      fr: "Projets Livrés",
      ar: "مشاريع تم تسليمها"
    },
    metricAreaTitle: {
      fr: "Territoire Cartographié",
      ar: "المساحة الممسوحة"
    },
    metricPrecisionTitle: {
      fr: "Précision Géodésique",
      ar: "الدقة الجيوديسية"
    },
    metricTotalDesc: {
      fr: "Projets multi-secteurs finalisés",
      ar: "مشاريع متعددة القطاعات منتهية"
    },
    metricAreaDesc: {
      fr: "Kilomètres carrés couverts",
      ar: "كيلومتر مربع من التغطية"
    },
    metricPrecisionDesc: {
      fr: "Tolérance limite atteinte",
      ar: "هامش الخطأ الأدنى"
    },
    yAxisProjects: {
      fr: "Projets",
      ar: "مشاريع"
    },
    yAxisSqKm: {
      fr: "Secteur (Km²)",
      ar: "المساحة (كلم²)"
    },
    yAxisAccuracy: {
      fr: "Résolution (mm)",
      ar: "الدقة (ملم)"
    },
    trendLabel: {
      fr: "Évolution de l'efficacité opérationnelle",
      ar: "تطور الكفاءة التشغيلية"
    }
  };

  const currentLang = lang === 'ar' ? 'ar' : 'fr';

  return (
    <section className="py-32 bg-black relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-sky-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full">
              <TrendingUp className="text-sky-400 w-4 h-4 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">
                {content.subtitle[currentLang]}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
              {content.title[currentLang]}
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              {content.desc[currentLang]}
            </p>
          </div>

          {/* Interactive Navigation / Tabs */}
          <div className="flex bg-zinc-900/80 p-1.5 rounded-2xl border border-white/5 flex-shrink-0">
            <button
              onClick={() => setActiveTab('growth')}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'growth'
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {content.tabGrowth[currentLang]}
            </button>
            <button
              onClick={() => setActiveTab('coverage')}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'coverage'
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {content.tabCoverage[currentLang]}
            </button>
          </div>
        </div>

        {/* Dashboard Grid Grid */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Main Visualizer Container - takes 2 cols */}
          <div className="lg:col-span-2 glass-card p-8 md:p-12 rounded-[3.5rem] border border-white/5 bg-zinc-950/40 backdrop-blur-3xl relative overflow-hidden min-h-[500px]">
            <div className="absolute top-8 right-8 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping" />
              <span className="font-mono text-[9px] font-black tracking-widest text-gray-500 uppercase">
                {activeTab === 'growth' ? 'UAV / TOPO ANALYSIS' : 'GEODETIC RESOLUTION'}
              </span>
            </div>

            <div className="h-[400px] w-full mt-8">
              <AnimatePresence mode="wait">
                {activeTab === 'growth' ? (
                  <motion.div
                    key="growth-chart"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                      <BarChart
                        data={annualProjectData}
                        margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                        barGap={6}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis 
                          dataKey="year" 
                          stroke="#4b5563" 
                          tickLine={false}
                          tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }}
                        />
                        <YAxis 
                          stroke="#4b5563"
                          tickLine={false}
                          tick={{ fill: '#94a3b8', fontSize: 11 }}
                          label={{ 
                            value: content.yAxisProjects[currentLang], 
                            angle: -90, 
                            position: 'insideLeft',
                            style: { textAnchor: 'middle', fill: '#4b5563', fontSize: 10, fontWeight: 'bold', letterSpacing: '0.1em' }
                          }}
                        />
                        <Tooltip
                          cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                          contentStyle={{
                            backgroundColor: '#0a0a0a',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '20px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                            padding: '16px 20px',
                          }}
                          itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                          labelStyle={{ color: '#fff', fontWeight: 'black', marginBottom: '8px', fontFamily: 'monospace' }}
                        />
                        <Legend 
                          verticalAlign="top" 
                          height={40}
                          iconType="circle"
                          iconSize={8}
                          wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                        />
                        <Bar 
                          name={content.chartTopo[currentLang]} 
                          dataKey="topography" 
                          fill="#0ea5e9" 
                          radius={[6, 6, 0, 0]} 
                          maxBarSize={35}
                        />
                        <Bar 
                          name={content.chartUav[currentLang]} 
                          dataKey="uav" 
                          fill="#10b981" 
                          radius={[6, 6, 0, 0]} 
                          maxBarSize={35}
                        />
                        <Bar 
                          name={content.chartGis[currentLang]} 
                          dataKey="gis" 
                          fill="#a855f7" 
                          radius={[6, 6, 0, 0]} 
                          maxBarSize={35}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                ) : (
                  <motion.div
                    key="coverage-chart"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                      <AreaChart
                        data={coverageData}
                        margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorSqKm" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis 
                          dataKey="year" 
                          stroke="#4b5563"
                          tickLine={false}
                          tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }}
                        />
                        <YAxis 
                          yAxisId="left"
                          stroke="#0ea5e9"
                          tickLine={false}
                          tick={{ fill: '#0ea5e9', fontSize: 11 }}
                          label={{ 
                            value: content.yAxisSqKm[currentLang], 
                            angle: -90, 
                            position: 'insideLeft',
                            style: { textAnchor: 'middle', fill: '#0ea5e9', fontSize: 10, fontWeight: 'bold' }
                          }}
                        />
                        <YAxis 
                          yAxisId="right"
                          orientation="right"
                          stroke="#10b981"
                          tickLine={false}
                          tick={{ fill: '#10b981', fontSize: 11 }}
                          label={{ 
                            value: content.yAxisAccuracy[currentLang], 
                            angle: 90, 
                            position: 'insideRight',
                            style: { textAnchor: 'middle', fill: '#10b981', fontSize: 10, fontWeight: 'bold' }
                          }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0a0a0a',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '20px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                            padding: '16px 20px',
                          }}
                          itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                          labelStyle={{ color: '#fff', fontWeight: 'black', marginBottom: '8px', fontFamily: 'monospace' }}
                        />
                        <Legend 
                          verticalAlign="top" 
                          height={40}
                          iconType="circle"
                          iconSize={8}
                          wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                        />
                        <Area 
                          yAxisId="left"
                          type="monotone" 
                          name={content.metricAreaTitle[currentLang]} 
                          dataKey="sqKm" 
                          stroke="#0ea5e9" 
                          fillOpacity={1} 
                          strokeWidth={2.5}
                          fill="url(#colorSqKm)" 
                        />
                        <Area 
                          yAxisId="right"
                          type="monotone" 
                          name={`${content.metricPrecisionTitle[currentLang]} (mm)`} 
                          dataKey="accuracyMm" 
                          stroke="#10b981" 
                          fillOpacity={1} 
                          strokeWidth={2.5}
                          fill="url(#colorAccuracy)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Key Metrics Panels - takes 1 col */}
          <div className="space-y-8 h-full flex flex-col justify-between">
            
            {/* Project growth stat */}
            <ScrollReveal variant="fadeUp" delay={0.1} className="w-full">
              <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-zinc-950/40 backdrop-blur-3xl hover:border-sky-500/30 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl group-hover:bg-sky-500/10 transition-colors duration-500" />
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <Plane size={20} />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest block">
                      {content.metricTotalTitle[currentLang]}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white italic">+670</span>
                      <span className="text-xs text-emerald-400 font-bold font-mono">+31% YoY</span>
                    </div>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {content.metricTotalDesc[currentLang]}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Area coverage stat */}
            <ScrollReveal variant="fadeUp" delay={0.2} className="w-full">
              <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-zinc-950/40 backdrop-blur-3xl hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MapIcon size={20} />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest block">
                      {content.metricAreaTitle[currentLang]}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white italic">9,420 Km²</span>
                    </div>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {content.metricAreaDesc[currentLang]}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Precision index */}
            <ScrollReveal variant="fadeUp" delay={0.3} className="w-full">
              <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-zinc-950/40 backdrop-blur-3xl hover:border-purple-500/30 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors duration-500" />
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Award size={20} />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest block">
                      {content.metricPrecisionTitle[currentLang]}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white italic">±1.5mm</span>
                    </div>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {content.metricPrecisionDesc[currentLang]}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Operational Efficiency Note */}
            <div className="p-8 rounded-[2rem] border border-dashed border-white/5 bg-white/[0.01] flex items-center gap-4 text-xs text-gray-500">
              <Activity className="text-sky-500 animate-pulse flex-shrink-0 w-4 h-4" />
              <p className="leading-relaxed text-[11px] font-light italic">
                {content.trendLabel[currentLang]}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
