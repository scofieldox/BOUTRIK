import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, User, BarChart3, Compass, Satellite, ChevronLeft, ChevronRight, ArrowRight, Clock, Cpu, Quote, Download } from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { projects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { ModelViewer } from '../components/ModelViewer';
import { SEO } from '../components/SEO';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, lang, isRTL } = useLanguage();
  const [activeView, setActiveView] = React.useState<'image' | '3d' | 'video'>('image');
  
  const project = projects.find(p => p.id.toString() === id);

  React.useEffect(() => {
    if (project) {
      if (project.videoUrl) {
        setActiveView('video');
      } else if (project.modelUrl) {
        setActiveView('3d');
      } else {
        setActiveView('image');
      }
    }
  }, [project]);

  React.useEffect(() => {
    if (id === 'seisme-marrakech') {
      navigate('/seisme-marrakech', { replace: true });
    }
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white p-6">
        <div className="text-center space-y-10">
          <div className="w-32 h-32 bg-white/5 rounded-[3rem] flex items-center justify-center mx-auto border border-white/10">
            <Compass className="text-sky-400" size={56} />
          </div>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">{lang === 'fr' ? 'Projet non trouvé' : 'المشروع غير موجود'}</h1>
          <p className="text-gray-400 max-w-md mx-auto text-lg font-light">{lang === 'fr' ? "Le projet que vous recherchez n'existe pas ou a été déplacé." : "المشروع الذي تبحث عنه غير موجود أو تم نقله."}</p>
          <Button 
            onClick={() => navigate('/portfolio')}
            variant="outline"
            className="rounded-2xl border-white/10 text-white hover:bg-sky-500 hover:border-sky-500 px-12 py-8 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            {isRTL ? <ChevronRight size={16} className="ml-3" /> : <ChevronLeft size={16} className="mr-3" />} {lang === 'fr' ? 'Retour au portfolio' : 'العودة إلى المعرض'}
          </Button>
        </div>
      </div>
    );
  }

  const projectData = lang === 'fr' ? project.fr : project.ar;

  const handleDownload = () => {
    // Direct "Save to Gallery" command implementation for the Owner
    const link = document.createElement('a');
    link.href = project.image;
    link.download = `${projectData.title.replace(/\s+/g, '_')}_Master_Map.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-48 pb-32 selection:bg-sky-500/30">
      <SEO page="projectDetail" projectTitle={projectData.title} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20">
          <motion.button 
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/portfolio')}
            className="text-sky-400 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-4 group hover:gap-8 transition-all duration-500"
          >
            <div className="w-12 h-12 rounded-full border border-sky-400/20 flex items-center justify-center group-hover:bg-sky-400 group-hover:text-white transition-all duration-500">
              {isRTL ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </div>
            {lang === 'fr' ? 'Retour au portfolio' : 'العودة إلى المعرض'}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <Button
              onClick={handleDownload}
              variant="outline"
              className="border-white/10 text-white hover:bg-sky-500 hover:border-sky-500 rounded-2xl px-8 py-6 text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-3"
            >
              <Download size={16} />
              {lang === 'fr' ? 'Télécharger les Données' : 'تحميل البيانات'}
            </Button>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            <div className="space-y-8">
              <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full">
                <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">
                  {projectData.category}
                </span>
              </div>
              <h1 className="text-7xl md:text-9xl font-black uppercase italic leading-[0.85] tracking-tighter">
                {projectData.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 !== 0 ? 'text-sky-400 not-italic font-light' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 py-16 border-y border-white/5">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sky-400">
                  <User size={16} />
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em]">{lang === 'fr' ? 'Client' : 'العميل'}</p>
                </div>
                <p className="text-xl font-black text-white uppercase italic tracking-tighter">{project.client}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sky-400">
                  <MapPin size={16} />
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em]">{lang === 'fr' ? 'Localisation' : 'الموقع'}</p>
                </div>
                <p className="text-xl font-black text-white uppercase italic tracking-tighter">{projectData.location}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sky-400">
                  <Calendar size={16} />
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em]">{lang === 'fr' ? 'Année' : 'السنة'}</p>
                </div>
                <p className="text-xl font-black text-white uppercase italic tracking-tighter">{project.date}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sky-400">
                  <Clock size={16} />
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em]">{lang === 'fr' ? 'Durée' : 'المدة'}</p>
                </div>
                <p className="text-xl font-black text-white uppercase italic tracking-tighter">{projectData.duration}</p>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-3xl font-black uppercase italic text-white tracking-tighter">{lang === 'fr' ? 'Description du Projet' : 'وصف المشروع'}</h3>
              <p className="text-gray-400 leading-relaxed text-xl font-light">
                {projectData.description}
              </p>
            </div>

            <div className="space-y-8">
              <h3 className="text-3xl font-black uppercase italic text-white flex items-center gap-6 tracking-tighter">
                <Cpu className="text-sky-400" size={32} />
                {lang === 'fr' ? 'Technologies Utilisées' : 'التقنيات المستخدمة'}
              </h3>
              <div className="flex flex-wrap gap-4">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-sky-400 hover:border-sky-400 transition-all cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.milestones && (
              <div className="space-y-12 pt-8">
                <h3 className="text-3xl font-black uppercase italic text-white flex items-center gap-6 tracking-tighter">
                  <Clock className="text-sky-400" size={32} />
                  {lang === 'fr' ? 'Chronologie du Projet' : 'الجدول الزمني للمشروع'}
                </h3>
                <div className="relative pl-12 space-y-12">
                  {/* Vertical Line */}
                  <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-2 bottom-2 w-px bg-gradient-to-b from-sky-500 via-sky-500/20 to-transparent`} />
                  
                  {project.milestones.map((milestone, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative"
                    >
                      {/* Dot */}
                      <div className={`absolute ${isRTL ? '-right-[53px]' : '-left-[53px]'} top-1.5 w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.5)] border-4 border-black box-content`} />
                      
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest leading-none">
                          {milestone.date}
                        </span>
                        <h4 className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-sky-300 transition-colors">
                          {lang === 'fr' ? milestone.fr : milestone.ar}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {projectData.testimonial && (
              <div className="space-y-12 py-16">
                <div className="relative">
                  <Quote className="absolute -top-12 -left-12 text-sky-500/20 w-32 h-32" />
                  <div className="relative z-10 glass-card p-12 rounded-[4rem] border-white/5 shadow-2xl">
                    <p className="text-2xl font-light italic text-gray-300 leading-relaxed mb-10">
                      "{projectData.testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-1 bg-sky-500" />
                      <div>
                        <p className="text-lg font-black text-white uppercase italic tracking-tighter leading-none mb-2">{projectData.testimonial.author}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{projectData.testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-12">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-black uppercase italic text-white flex items-center gap-6 tracking-tighter">
                  <BarChart3 className="text-sky-400" size={32} />
                  {lang === 'fr' ? 'Analyses & Résultats' : 'التحليلات والنتائج'}
                </h3>
              </div>

              {project.performanceData && (
                <div className="glass-card p-10 rounded-[3rem] border-white/5 h-[400px] relative group overflow-hidden bg-white/5">
                  <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-8 left-8 z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400/50">Performance Profile</span>
                  </div>
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={project.performanceData}>
                      <PolarGrid stroke="#ffffff10" />
                      <PolarAngleAxis 
                        dataKey="name" 
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                      />
                      <Radar
                        name="Performance"
                        dataKey="value"
                        stroke="#0ea5e9"
                        fill="#0ea5e9"
                        fillOpacity={0.3}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#000000', 
                          border: '1px solid #ffffff10',
                          borderRadius: '16px',
                          fontSize: '10px',
                          fontWeight: 'bold'
                        }}
                        itemStyle={{ color: '#0ea5e9', textTransform: 'uppercase' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                {(projectData.metrics.includes('|') ? projectData.metrics.split('|') : [projectData.metrics]).map((metric, index) => (
                  <div 
                    key={index}
                    className="glass-card p-8 rounded-[2.5rem] border-white/5 flex items-center gap-6 group hover:border-sky-400/30 transition-all duration-500 hover:bg-white/5"
                  >
                    <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 border border-sky-400/20 group-hover:border-sky-400/40">
                      {index % 2 === 0 ? <Satellite size={24} /> : <Compass size={24} />}
                    </div>
                    <span className="text-sm md:text-base font-black text-gray-200 uppercase tracking-widest leading-tight">
                      {metric.trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={() => navigate('/contact')}
              className="bg-sky-500 hover:bg-sky-600 text-white px-16 py-10 rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-500 shadow-2xl shadow-sky-500/40 hover:scale-105 border-none"
            >
              {lang === 'fr' ? 'Démarrer un projet similaire' : 'ابدأ مشروعاً مماثلاً'}
              <ArrowRight size={20} className={isRTL ? 'mr-4 rotate-180' : 'ml-4'} />
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="relative sticky top-48"
          >
            {/* View Switcher */}
            {(project.modelUrl || project.videoUrl) && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 flex bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl gap-1">
                <button 
                  onClick={() => setActiveView('image')}
                  className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeView === 'image' ? 'bg-sky-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                  {lang === 'fr' ? 'Image 2D' : 'صورة 2D'}
                </button>
                {project.videoUrl && (
                  <button 
                    onClick={() => setActiveView('video')}
                    className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeView === 'video' ? 'bg-sky-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  >
                    {lang === 'fr' ? 'Vidéo 3D' : 'فيديو ثلاثي الأبعاد'}
                  </button>
                )}
                {project.modelUrl && (
                  <button 
                    onClick={() => setActiveView('3d')}
                    className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeView === '3d' ? 'bg-sky-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  >
                    {lang === 'fr' ? 'Modèle 3D' : 'نموذج 3D'}
                  </button>
                )}
              </div>
            )}

            <div className="absolute -inset-20 bg-sky-500/5 rounded-full blur-[120px] opacity-50" />
            
            <AnimatePresence mode="wait">
              {activeView === 'image' ? (
                <motion.div 
                  key="image"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="rounded-[5rem] overflow-hidden shadow-2xl border border-white/10 relative z-10 group aspect-[4/5]"
                >
                  <img 
                    src={project.image} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 grayscale group-hover:grayscale-0" 
                    alt={projectData.title} 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-1000 group-hover:opacity-40" />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-16 left-16 w-20 h-20 border-t-2 border-l-2 border-sky-400/40 rounded-tl-[4rem] pointer-events-none transition-all duration-1000 group-hover:scale-110" />
                  <div className="absolute bottom-16 right-16 w-20 h-20 border-b-2 border-r-2 border-sky-400/40 rounded-br-[4rem] pointer-events-none transition-all duration-1000 group-hover:scale-110" />
                </motion.div>
              ) : activeView === 'video' ? (
                <motion.div 
                  key="video"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="rounded-[5rem] overflow-hidden shadow-2xl border border-white/10 relative z-10 bg-black aspect-[4/5] flex items-center justify-center"
                >
                  <video 
                    src={project.videoUrl} 
                    className="w-full h-full object-cover" 
                    controls 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  />
                  {/* Corner Accents */}
                  <div className="absolute top-16 left-16 w-20 h-20 border-t-2 border-l-2 border-sky-400/40 rounded-tl-[4rem] pointer-events-none" />
                  <div className="absolute bottom-16 right-16 w-20 h-20 border-b-2 border-r-2 border-sky-400/40 rounded-br-[4rem] pointer-events-none" />
                </motion.div>
              ) : (
                <motion.div
                  key="3d"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative z-10 h-full min-h-[600px]"
                >
                  <ModelViewer modelUrl={project.modelUrl!} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
