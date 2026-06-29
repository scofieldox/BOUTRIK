import { motion } from "motion/react";
import { 
  History, 
  Target, 
  ShieldCheck, 
  Lightbulb, 
  Users,
  Award,
  CheckCircle2,
  User,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { ScrollReveal } from "../components/ScrollReveal";
import geomaticsOfficeImg from "../assets/images/geomatics_office_1782352796730.jpg";
import surveyingTeamImg from "../assets/images/surveying_team_1782352810691.jpg";

export default function About() {
  const { t, lang, isRTL } = useLanguage();

  return (
    <div className="pb-24">
      <SEO page="about" />
      {/* Hero */}
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
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-12">
              <User className="text-sky-400" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">{t.about.profile}</span>
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black mb-12 tracking-tighter uppercase italic leading-[0.85]">
              {lang === 'fr' ? 'Ingénieur' : 'مهندس'} <br />
              <span className="text-sky-400 not-italic font-light">{t.about.title}</span>
            </h1>
            <p className="text-2xl text-gray-400 leading-relaxed font-light max-w-2xl">
              {t.about.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* History & Mission */}
      <section className="py-40 max-w-7xl mx-auto px-6 relative">
        {/* Subtle Watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none -z-10 opacity-[0.02]">
          <span className="text-[20rem] font-black uppercase italic tracking-tighter vertical-text text-white">
            ECARTTOP
          </span>
        </div>

        <ScrollReveal variant="fadeUp" className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
          <div className="space-y-12">
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2 rounded-full">
              <History className="text-sky-400" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">{lang === 'fr' ? 'Notre Histoire' : 'قصتنا'}</span>
            </div>
            <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
              {lang === 'fr' ? 'Une Décennie de' : 'عقد من'} <br />
              <span className="text-sky-400 not-italic font-light">{lang === 'fr' ? 'Précision' : 'الدقة'}</span>
            </h3>
            <div className="space-y-10 text-gray-400 text-xl font-light leading-relaxed">
              <p>
                {lang === 'fr' 
                  ? "Fondé sur des principes de rigueur technique et d'innovation technologique, notre cabinet s'est imposé comme une référence à Nador et dans toute la région de l'Oriental."
                  : "تأسس مكتبنا على مبادئ الصرامة التقنية والابتكار التكنولوجي، وفرض نفسه كمرجع في الناظور وفي جميع أنحاء الجهة الشرقية."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                {[
                  { text: lang === 'fr' ? 'Expertise Certifiée' : 'خبرة معتمدة', icon: Award },
                  { text: lang === 'fr' ? 'Technologie LiDAR' : 'تكنولوجيا LiDAR', icon: Lightbulb },
                  { text: lang === 'fr' ? 'Support 24/7' : 'دعم 24/7', icon: Users },
                  { text: lang === 'fr' ? 'Précision Millimétrique' : 'دقة مليمترية', icon: Target },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 border border-white/5 group-hover:border-sky-400/30">
                      <item.icon size={20} />
                    </div>
                    <span className="font-black text-white text-[10px] uppercase tracking-[0.2em]">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-20 bg-sky-500/5 rounded-full blur-[120px]" />
            <div className="grid grid-cols-2 gap-8 relative">
              <motion.div 
                whileHover={{ y: -20, rotate: -2 }}
                className="rounded-[4rem] overflow-hidden shadow-2xl border border-white/5 aspect-[3/4] transition-all duration-700"
              >
                <img src={geomaticsOfficeImg} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="About 1" referrerPolicy="no-referrer" />
              </motion.div>
              <motion.div 
                whileHover={{ y: -20, rotate: 2 }}
                className="rounded-[4rem] overflow-hidden shadow-2xl border border-white/5 aspect-[3/4] mt-24 transition-all duration-700"
              >
                <img src={surveyingTeamImg} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="About 2" referrerPolicy="no-referrer" />
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Technical Expertise / Skills Section */}
      <section className="py-40 bg-zinc-950/40 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(52,170,220,0.03),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal variant="fadeUp" className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-8">
                <Target className="text-sky-400" size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">
                  {lang === 'fr' ? 'Compétences de Pointe' : 'المهارات المتقدمة'}
                </span>
              </div>
              <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.9] mb-8">
                {lang === 'fr' ? 'Savoir-Faire' : 'خبراتنا'} <br />
                <span className="text-sky-400 not-italic font-light">
                  {lang === 'fr' ? 'Technique' : 'الفنية'}
                </span>
              </h3>
              <p className="text-xl text-gray-400 font-light leading-relaxed max-w-xl">
                {lang === 'fr' 
                  ? "Nous combinons une expertise technique rigoureuse à des technologies d'avant-garde pour fournir des mesures précises et fiables, adaptées aux exigences de chaque projet."
                  : "نحن نجمع بين الخبرة التقنية الصارمة والتكنولوجيا المتطورة لتقديم قياسات دقيقة وموثوقة تتناسب مع احتياجات كل مشروع."}
              </p>
            </div>

            <div className="space-y-10">
              {[
                { 
                  name: lang === 'fr' ? 'Topographie & Levés de Précision' : 'الطبوغرافيا والمسح الدقيق', 
                  percentage: 98,
                  desc: lang === 'fr' ? 'Précision millimétrique, Stations robotisées & GPS RTK' : 'دقة ملمترية، محطات رصد آلية و GPS RTK'
                },
                { 
                  name: lang === 'fr' ? 'Cartographie par Drone & Photogrammétrie' : 'رسم الخرائط بالدرون والتصوير الجوي', 
                  percentage: 92,
                  desc: lang === 'fr' ? 'Modélisation 3D, nuages de points LiDAR & orthophotos' : 'نمذجة ثلاثية الأبعاد، سحابة نقاط LiDAR وصور جوية مصححة'
                },
                { 
                  name: lang === 'fr' ? 'Systèmes d\'Information Géographique (SIG)' : 'نظم المعلومات الجغرافية (SIG)', 
                  percentage: 95,
                  desc: lang === 'fr' ? 'Analyse spatiale, modélisation de données & cartographie dynamique' : 'تحليل مكاني، نمذجة البيانات والخرائط التفاعلية'
                },
                { 
                  name: lang === 'fr' ? 'Foncier, Copropriété & Cadastre' : 'المجال العقاري، الملكية المشتركة والمسح العقاري', 
                  percentage: 90,
                  desc: lang === 'fr' ? 'Bornage, morcellement et dossiers techniques agréés ANCFCC' : 'تحديد الحدود، التقسيم والملفات التقنية المعتمدة من المحافظة العقارية'
                }
              ].map((skill, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[12px] font-black uppercase tracking-[0.2em] text-white">
                        {skill.name}
                      </span>
                      <span className="text-[10px] text-gray-500 block uppercase tracking-wider font-mono mt-1">
                        {skill.desc}
                      </span>
                    </div>
                    <span className="text-sky-400 font-mono font-bold text-sm">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-full relative"
                    >
                      <motion.div 
                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-white" 
                      />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-black py-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(52,170,220,0.05),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal variant="fadeUp" className="text-center mb-32 space-y-6">
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2 rounded-full">
              <ShieldCheck className="text-sky-400" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">{lang === 'fr' ? 'Nos Fondements' : 'أسسنا'}</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-tight">
              Nos <span className="text-sky-400 not-italic font-light">Valeurs</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.about.values.map((v, idx) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className="group glass-card p-12 rounded-[4rem] relative overflow-hidden flex flex-col min-h-[400px]"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-sky-400 mb-10 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 border border-white/5 group-hover:border-sky-400/30">
                    <Target size={32} />
                  </div>
                  <h4 className="text-3xl font-black mb-6 text-white group-hover:text-sky-400 transition-colors uppercase italic tracking-tighter">
                    {v.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed font-light uppercase tracking-[0.2em]">{v.text}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-48 max-w-5xl mx-auto px-6">
        <ScrollReveal variant="scaleUp">
          <div className="p-24 glass-card rounded-[5rem] border-sky-500/20 text-center relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-sky-500/10 rounded-full blur-[100px]" />
            <span className="text-[15rem] text-sky-500/10 font-serif absolute top-0 left-10 select-none">"</span>
            <p className="text-3xl md:text-5xl font-light text-white italic leading-relaxed relative z-10 tracking-tight">
              {t.about.quote}
            </p>
            <div className="mt-16 flex flex-col items-center gap-6">
              <div className="w-16 h-[2px] bg-sky-500" />
              <div className="space-y-2">
                <span className="text-[12px] font-black uppercase tracking-[0.5em] text-sky-400 block">Nabil Boutrik</span>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-500 block">Fondateur & Ingénieur Principal</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
