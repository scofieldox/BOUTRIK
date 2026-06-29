import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, Maximize2, MapPin, Filter, Search, ChevronRight, 
  ArrowRight, Layers, Compass, Clock, Cpu, Box, Loader2, 
  ChevronDown, X, Check, ArrowUpDown, SortAsc, Play
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { DronePlanner } from "../components/DronePlanner";
import CartographyHub from "../components/CartographyHub";
import geomaticsOfficeImg from "../assets/images/geomatics_office_1782352796730.jpg";

export default function Portfolio() {
  const { t, lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  
  // Advanced Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showSort, setShowSort] = useState(false);
  
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  // Derive unique filter options
  const filterOptions = useMemo(() => {
    return {
      categories: [...new Set(projects.map(p => p.fr.category))].sort(),
      clients: [...new Set(projects.map(p => p.client))].sort(),
      techs: [...new Set(projects.flatMap(p => p.technologies))].sort()
    };
  }, []);
  
  const filteredProjects = projects.filter(project => {
    const projectData = lang === 'fr' ? project.fr : project.ar;
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(project.fr.category);
    const matchesClient = selectedClients.length === 0 || selectedClients.includes(project.client);
    const matchesTech = selectedTechs.length === 0 || selectedTechs.some(tech => project.technologies.includes(tech));
    
    const matchesSearch = 
      projectData.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      projectData.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesClient && matchesTech && matchesSearch;
  });

  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      const aData = lang === 'fr' ? a.fr : a.ar;
      const bData = lang === 'fr' ? b.fr : b.ar;

      switch (sortBy) {
        case "title":
          return aData.title.localeCompare(bData.title);
        case "client":
          return a.client.localeCompare(b.client);
        case "oldest":
          return (a.date || "").localeCompare(b.date || "");
        case "newest":
        default:
          return (b.date || "").localeCompare(a.date || "");
      }
    });
  }, [filteredProjects, sortBy, lang]);

  const displayedProjects = sortedProjects.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProjects.length;

  const toggleFilter = (list: string[], setList: (v: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
    setVisibleCount(4);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedClients([]);
    setSelectedTechs([]);
    setSearchQuery("");
    setVisibleCount(4);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 4);
      setIsLoading(false);
    }, 800);
  };

  const portfolioSeo = useMemo(() => {
    if (selectedCategories.length === 1) {
      const cat = selectedCategories[0];
      return {
        title: lang === 'fr' ? `Réalisations en ${cat} | ECARTTOP Nador` : `مشاريع في ${cat} | إيكارت توب الناظور`,
        desc: lang === 'fr' 
          ? `Découvrez nos derniers projets d'ingénierie et de topographie de haute précision axés sur : ${cat}.`
          : `تصفح أحدث مشاريع الهندسة والمساحة الدقيقة المتعلقة بـ: ${cat}.`
      };
    }
    if (selectedTechs.length === 1) {
      const tech = selectedTechs[0];
      return {
        title: lang === 'fr' ? `Projets avec Technologie ${tech} | ECARTTOP` : `مشاريع باستخدام تقنية ${tech} | إيكارت توب`,
        desc: lang === 'fr'
          ? `Découvrez nos expertises de terrain et jumeaux numériques réalisés avec la technologie ${tech}.`
          : `اكتشف حلولنا الميدانية والتوائم الرقمية المنجزة باستخدام تقنية ${tech}.`
      };
    }
    if (searchQuery.trim().length > 0) {
      return {
        title: lang === 'fr' ? `Recherche : "${searchQuery}" | ECARTTOP` : `بحث : "${searchQuery}" | إيكارت توب`,
        desc: lang === 'fr'
          ? `Résultats d'ingénierie topographique et cartographie pour le mot-clé : ${searchQuery}.`
          : `نتائج الهندسة الطبوغرافية والخرائطية للكلمة الدلالية: ${searchQuery}.`
      };
    }
    return {};
  }, [selectedCategories, selectedTechs, searchQuery, lang]);

  return (
    <div className="pb-24">
      <SEO 
        page="portfolio" 
        customTitle={portfolioSeo.title} 
        customDescription={portfolioSeo.desc} 
      />
      {/* Header */}
      <section className="bg-black text-white py-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-cover bg-center grayscale" style={{ backgroundImage: `url(${geomaticsOfficeImg})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-12">
              <Layers className="text-sky-400" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">{lang === 'fr' ? 'Réalisations' : 'إنجازات'}</span>
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black mb-12 tracking-tighter uppercase italic leading-[0.85]">
              {lang === 'fr' ? 'Projets' : 'مشاريع'} <br />
              <span className="text-sky-400 not-italic font-light">{lang === 'fr' ? 'Emblématiques' : 'رمزية'}</span>
            </h1>
            <p className="text-2xl text-gray-400 leading-relaxed font-light max-w-2xl">
              {t.portfolio.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search Controls */}
      <section className="py-12 bg-black border-y border-white/5 sticky top-20 z-40 backdrop-blur-xl bg-black/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 flex-grow">
                <Button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl px-6 py-4 flex items-center gap-3 transition-all ${showFilters ? 'border-sky-500 bg-sky-500/10' : ''}`}
                >
                  <Filter size={16} className={showFilters ? 'text-sky-400' : 'text-gray-400'} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {lang === 'fr' ? 'Filtres Avancés' : 'فلاتر متقدمة'}
                  </span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
                
                <div className="h-8 w-px bg-white/10 hidden lg:block mx-2" />

                {(selectedCategories.length > 0 || selectedClients.length > 0 || selectedTechs.length > 0) && (
                  <Button 
                    onClick={clearFilters}
                    variant="ghost" 
                    className="text-gray-500 hover:text-white text-[9px] font-black uppercase tracking-widest gap-2"
                  >
                    <X size={14} />
                    {lang === 'fr' ? 'Réinitialiser' : 'إعادة ضبط'}
                  </Button>
                )}

                <div className="h-8 w-px bg-white/10 hidden lg:block mx-2" />

                <div className="relative">
                  <Button 
                    onClick={() => setShowSort(!showSort)}
                    className={`bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl px-6 py-4 flex items-center gap-3 transition-all ${showSort ? 'border-sky-500 bg-sky-500/10' : ''}`}
                  >
                    <ArrowUpDown size={16} className={showSort ? 'text-sky-400' : 'text-gray-400'} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {lang === 'fr' ? 'Trier par' : 'ترتيب حسب'}
                    </span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${showSort ? 'rotate-180' : ''}`} />
                  </Button>

                  <AnimatePresence>
                    {showSort && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} min-w-[200px] bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 z-50 shadow-2xl`}
                      >
                        {[
                          { id: "newest", fr: "Plus récent", ar: "الأحدث" },
                          { id: "oldest", fr: "Plus ancien", ar: "الأقدم" },
                          { id: "title", fr: "Titre", ar: "العنوان" },
                          { id: "client", fr: "Client", ar: "العميل" }
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSortBy(option.id);
                              setShowSort(false);
                            }}
                            className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-between transition-colors ${
                              sortBy === option.id ? 'bg-sky-500 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            <span>{lang === 'fr' ? option.fr : option.ar}</span>
                            {sortBy === option.id && <Check size={14} />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text"
                  placeholder={lang === 'fr' ? "Rechercher un projet..." : "بحث عن مشروع..."}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(4);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-sky-400 transition-all text-white placeholder:text-gray-600"
                />
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-8 border-t border-white/5 mt-4">
                    {/* Categories Filter */}
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-sky-400 uppercase tracking-[0.4em] mb-4">
                        {lang === 'fr' ? 'Catégories' : 'الفئات'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.categories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border ${
                              selectedCategories.includes(cat)
                                ? "bg-sky-500 border-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                                : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20"
                            }`}
                          >
                            {selectedCategories.includes(cat) && <Check size={12} />}
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Clients Filter */}
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-sky-400 uppercase tracking-[0.4em] mb-4">
                        {lang === 'fr' ? 'Clients' : 'العملاء'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.clients.map(client => (
                          <button
                            key={client}
                            onClick={() => toggleFilter(selectedClients, setSelectedClients, client)}
                            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border ${
                              selectedClients.includes(client)
                                ? "bg-sky-500 border-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                                : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20"
                            }`}
                          >
                            {selectedClients.includes(client) && <Check size={12} />}
                            {client}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tech Filter */}
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-sky-400 uppercase tracking-[0.4em] mb-4">
                        {lang === 'fr' ? 'Technologies' : 'التقنيات'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.techs.map(tech => (
                          <button
                            key={tech}
                            onClick={() => toggleFilter(selectedTechs, setSelectedTechs, tech)}
                            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border ${
                              selectedTechs.includes(tech)
                                ? "bg-sky-500 border-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                                : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20"
                            }`}
                          >
                            {selectedTechs.includes(tech) && <Check size={12} />}
                            {tech}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-40 max-w-7xl mx-auto px-6">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, idx) => {
              const projectData = lang === 'fr' ? project.fr : project.ar;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className="group relative cursor-pointer"
                  onClick={() => navigate(`/portfolio/${project.id}`)}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] bg-gray-900 border border-white/5">
                    <img 
                      src={project.image} 
                      alt={projectData.title} 
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 grayscale group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-12 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex justify-between items-end">
                        <div className="space-y-4">
                          <span className="text-[10px] font-black text-sky-400 uppercase tracking-[0.4em] block">{projectData.category}</span>
                          <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">{projectData.title}</h3>
                          
                          <div className="flex flex-wrap items-center gap-3 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                            {project.videoUrl && (
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-sky-500/20 border border-sky-500/40 rounded-full animate-pulse shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                                <Play size={10} className="text-sky-400 fill-sky-400" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-sky-400">Vidéo 3D</span>
                              </div>
                            )}
                            {project.modelUrl && (
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-sky-500/20 border border-sky-500/40 rounded-full animate-pulse shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                                <Box size={12} className="text-sky-400" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-sky-400">3D</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full">
                              <Clock size={12} className="text-sky-400" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">{projectData.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                              <Cpu size={12} className="text-sky-400" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">
                                {project.technologies.slice(0, 2).join(' • ')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                            {lang === 'fr' ? 'Détails' : 'التفاصيل'}
                          </span>
                          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-sky-500 group-hover:border-sky-500 transition-all duration-500">
                            <ArrowRight size={24} className={isRTL ? 'rotate-180' : ''} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="mt-24 text-center">
            <Button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="bg-transparent hover:bg-white/5 text-white border border-white/10 hover:border-sky-500 px-16 py-8 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="mr-4 animate-spin text-sky-400" />
                  <span className="text-sky-400 uppercase">
                    {lang === 'fr' ? 'Chargement...' : 'جاري التحميل...'}
                  </span>
                </>
              ) : (
                <>
                  <span className="group-hover:text-sky-400 transition-colors uppercase">
                    {lang === 'fr' ? 'Charger plus de projets' : 'تحميل المزيد من المشاريع'}
                  </span>
                  <ChevronRight size={16} className={`ml-4 group-hover:translate-x-2 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                </>
              )}
            </Button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-32 space-y-6">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
              <Search className="text-gray-500" size={40} />
            </div>
            <p className="text-gray-500 font-light italic text-xl">
              {lang === 'fr' ? 'Aucun projet ne correspond à votre recherche.' : 'لا توجد مشاريع تطابق بحثك.'}
            </p>
          </div>
        )}
      </section>

      {/* Interactive Drone Flight & Point Cloud Simulator */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <DronePlanner />
      </section>

      {/* Casablanca Cartography WebGIS Interactive Hub */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <CartographyHub />
      </section>

      {/* Process Section */}
      <section className="bg-[#020617] py-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_100%,rgba(52,170,220,0.05),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-32">
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-tight">
              {lang === 'fr' ? 'Notre' : 'منهجنا'} <span className="text-sky-400 not-italic font-light">{lang === 'fr' ? 'Méthodologie' : 'في العمل'}</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { step: "01", title: lang === 'fr' ? "Analyse" : "تحليل", desc: lang === 'fr' ? "Étude approfondie du terrain et des contraintes techniques." : "دراسة متعمقة للميدان والقيود التقنية." },
              { step: "02", title: lang === 'fr' ? "Mesure" : "قياس", desc: lang === 'fr' ? "Acquisition de données haute fidélité via GNSS et LiDAR." : "اكتساب بيانات عالية الدقة عبر GNSS و LiDAR." },
              { step: "03", title: lang === 'fr' ? "Livrable" : "تسليم", desc: lang === 'fr' ? "Production de plans et modèles 3D certifiés conformes." : "إنتاج خطط ونماذج ثلاثية الأبعاد معتمدة ومطابقة." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="space-y-8"
              >
                <div className="text-8xl font-black text-white/5 tracking-tighter leading-none">{item.step}</div>
                <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter">{item.title}</h4>
                <p className="text-gray-500 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
