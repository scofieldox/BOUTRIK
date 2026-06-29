import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Zap, 
  Heart,
  Award,
  ChevronRight,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { ScrollReveal } from "../components/ScrollReveal";
import geomaticsOfficeImg from "../assets/images/geomatics_office_1782352796730.jpg";
import surveyingTeamImg from "../assets/images/surveying_team_1782352810691.jpg";
import gnssSurveyFieldImg from "../assets/images/gnss_survey_field_1782352782520.jpg";
import facadeLaserScanMaleImg from "../assets/images/facade_laser_scan_male_1782354336834.jpg";

export default function Careers() {
  const { t, lang, isRTL } = useLanguage();

  return (
    <div className="pb-24">
      <SEO page="careers" />
      {/* Header */}
      <section className="bg-black text-white py-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-cover bg-center grayscale" style={{ backgroundImage: `url(${surveyingTeamImg})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-12">
              <Briefcase className="text-sky-400" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">{lang === 'fr' ? 'Carrières' : 'وظائف'}</span>
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black mb-12 tracking-tighter uppercase italic leading-[0.85]">
              {lang === 'fr' ? 'Rejoignez' : 'انضم إلى'} <br />
              <span className="text-sky-400 not-italic font-light">{lang === 'fr' ? 'L\'Élite' : 'النخبة'}</span>
            </h1>
            <p className="text-2xl text-gray-400 leading-relaxed font-light max-w-2xl">
              {t.careers.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-40 max-w-7xl mx-auto px-6">
        <ScrollReveal variant="fadeUp" className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-12">
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2 rounded-full">
              <Heart className="text-sky-400" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">{lang === 'fr' ? 'Notre Culture' : 'ثقافتنا'}</span>
            </div>
            <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
              {lang === 'fr' ? 'L\'Innovation au' : 'الابتكار في'} <br />
              <span className="text-sky-400 not-italic font-light">{lang === 'fr' ? 'Cœur' : 'القلب'}</span>
            </h3>
            <p className="text-gray-400 text-xl font-light leading-relaxed">
              {lang === 'fr' 
                ? "Chez Ecart Top, nous cultivons l'excellence à travers la formation continue et l'adoption des technologies les plus avancées du marché."
                : "في Ecart Top، نزرع التميز من خلال التدريب المستمر واعتماد أكثر التقنيات تقدماً في السوق."}
            </p>
            <div className="space-y-10">
              {[
                { title: lang === 'fr' ? 'Technologie de Pointe' : 'تكنولوجيا متطورة', icon: Zap, text: lang === 'fr' ? 'Accès aux derniers outils LiDAR et drones.' : 'الوصول إلى أحدث أدوات LiDAR والطائرات بدون طيار.' },
                { title: lang === 'fr' ? 'Croissance Continue' : 'نمو مستمر', icon: Award, text: lang === 'fr' ? 'Programmes de mentorat et certifications.' : 'برامج التوجيه والشهادات.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-8 group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 border border-white/5 group-hover:border-sky-400/30 shrink-0">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-3">{item.title}</h4>
                    <p className="text-gray-500 font-light text-lg leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-20 bg-sky-500/5 rounded-full blur-[120px]" />
            <div className="grid grid-cols-2 gap-8 relative">
              <div className="space-y-8">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="rounded-[4rem] overflow-hidden border border-white/5 aspect-square transition-all duration-700"
                >
                  <img src={geomaticsOfficeImg} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Culture 1" referrerPolicy="no-referrer" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="rounded-[4rem] overflow-hidden border border-white/5 aspect-[3/4] transition-all duration-700"
                >
                  <img src={surveyingTeamImg} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Culture 2" referrerPolicy="no-referrer" />
                </motion.div>
              </div>
              <div className="space-y-8 pt-24">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="rounded-[4rem] overflow-hidden border border-white/5 aspect-[3/4] transition-all duration-700"
                >
                  <img src={gnssSurveyFieldImg} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Culture 3" referrerPolicy="no-referrer" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="rounded-[4rem] overflow-hidden border border-white/5 aspect-square transition-all duration-700"
                >
                  <img src={facadeLaserScanMaleImg} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Culture 4" referrerPolicy="no-referrer" />
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Open Positions */}
      <section className="bg-black py-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(52,170,220,0.05),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal variant="fadeUp" className="text-center mb-32 space-y-6">
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2 rounded-full">
              <Target className="text-sky-400" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">{lang === 'fr' ? 'Opportunités' : 'فرص'}</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-tight">
              Postes <span className="text-sky-400 not-italic font-light">Ouverts</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div className="space-y-8 max-w-5xl mx-auto">
              {t.careers.positions.map((pos, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className="group glass-card p-12 rounded-[4rem] border-white/5 hover:border-sky-400/50 transition-all duration-700 flex flex-col md:flex-row items-center gap-12"
                >
                  <div className="flex-grow space-y-6 text-center md:text-left">
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                      <span className="bg-sky-500/10 text-sky-400 text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full border border-sky-500/20">
                        {pos.dept}
                      </span>
                      <span className="bg-white/5 text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full border border-white/10">
                        {pos.type}
                      </span>
                    </div>
                    <h4 className="text-4xl font-black text-white uppercase italic tracking-tighter group-hover:text-sky-400 transition-colors duration-500">
                      {pos.title}
                    </h4>
                    <div className="flex flex-wrap justify-center md:justify-start gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-sky-400" />
                        {pos.location}
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-sky-400" />
                        {pos.type}
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => window.location.href = '/contact'}
                    className="bg-white/5 hover:bg-sky-500 text-white font-black rounded-3xl px-16 py-10 text-[10px] uppercase tracking-[0.4em] transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-sky-500/30 border-none"
                  >
                    {lang === 'fr' ? 'Postuler' : 'قدم الآن'} 
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center ml-6 group-hover:bg-white group-hover:text-sky-500 transition-all duration-500">
                      <ChevronRight size={18} className={isRTL ? 'rotate-180' : ''} />
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <div className="mt-32 text-center">
            <p className="text-gray-400 font-light mb-12 uppercase tracking-[0.4em] text-xs">
              {lang === 'fr' ? 'Aucun poste ne vous correspond ?' : 'لا تجد وظيفة تناسبك ؟'}
            </p>
            <Button 
              onClick={() => window.location.href = '/contact'}
              variant="outline" 
              className="rounded-3xl border-white/10 text-white hover:bg-sky-500 hover:border-sky-500 px-20 py-10 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500"
            >
              {lang === 'fr' ? 'Candidature Spontanée' : 'طلب عام'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
