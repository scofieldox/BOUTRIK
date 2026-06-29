import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./ScrollReveal";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Search, 
  Newspaper, 
  ChevronRight, 
  Clock, 
  Tag, 
  X, 
  Send, 
  Sparkles, 
  ArrowLeft, 
  Share2, 
  Check, 
  CheckCircle,
  Filter,
  Plane,
  Map,
  Ruler,
  Layers
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "./SEO";
import { blogPosts, BlogPost } from "../data/blogPosts";
import engineeringTeamLayout from "../assets/images/engineering_team_layout_1782099016477.jpg";

export default function Blog() {
  const { t, lang, isRTL } = useLanguage();

  // Filter and Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Newsletter States
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Active Post Reader Overlay State
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // Share indicator
  const [copiedPostId, setCopiedPostId] = useState<number | null>(null);

  // Dynamic derivation of categories
  const categories = useMemo(() => {
    const list = new Set<string>();
    blogPosts.forEach(post => {
      list.add(post.category[lang as "fr" | "ar"]);
    });
    return Array.from(list);
  }, [lang]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    blogPosts.forEach(post => {
      const cat = post.category[lang as "fr" | "ar"];
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [lang]);

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const titleText = post.title[lang as "fr" | "ar"].toLowerCase();
      const excerptText = post.excerpt[lang as "fr" | "ar"].toLowerCase();
      const catText = post.category[lang as "fr" | "ar"].toLowerCase();
      const query = searchQuery.toLowerCase();

      // Category filter check
      const matchesCategory = selectedCategory 
        ? post.category[lang as "fr" | "ar"] === selectedCategory 
        : true;

      // Search query check
      const matchesSearch = query 
        ? titleText.includes(query) || excerptText.includes(query) || catText.includes(query)
        : true;

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, lang]);

  // Newsletter Submit handler
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;

    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setNewsletterSuccess(true);
      setNewsletterEmail("");
      
      // Reset success after 5 seconds
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }, 1200);
  };

  // Copy Post Link
  const handleShare = (post: BlogPost) => {
    const shareUrl = `${window.location.origin}/blog?id=${post.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedPostId(post.id);
      setTimeout(() => setCopiedPostId(null), 2000);
    });
  };

  return (
    <div className="pb-24">
      <SEO page="blog" />

      {/* Header section with deep visual parallax overlay */}
      <section className="bg-black text-white py-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-cover bg-center grayscale scale-105 transition-transform duration-[10s]" style={{ backgroundImage: `url(${engineeringTeamLayout})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-[#020617]" />
        
        {/* Abstract glowing lights */}
        <div className="absolute top-1/4 right-1/4 w-[40rem] h-[40rem] bg-sky-500/10 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-[30rem] h-[30rem] bg-sky-400/5 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`max-w-4xl ${isRTL ? "text-right" : "text-left"}`}
          >
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full mb-10">
              <Sparkles className="text-sky-400 animate-pulse" size={12} />
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-sky-400">
                {lang === 'fr' ? 'CONNAISSANCES & INNOVATION' : 'المعرفة والابتكار الطبوغرافي'}
              </span>
            </div>
            
            <h1 className="text-6xl md:text-[8rem] font-black mb-10 tracking-tighter uppercase italic leading-[0.9]">
              {lang === 'fr' ? 'Insights &' : 'رؤى و'} <br />
              <span className="text-sky-400 not-italic font-light">{lang === 'fr' ? 'Perspectives' : 'آفاق علمية'}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light max-w-2xl">
              {lang === 'fr' 
                ? "Découvrez l'analyse d'experts sur les jumeaux numériques, le LiDAR spatial, le cadastre officiel au Maroc et le développement territorial de l'Oriental." 
                : "اكتشف تحليلات الخبراء حول التوائم الرقمية، مسوحات الليدار، المساطر القانونية للتحفيظ العقاري بالمغرب والتنمية الترابية بالناظور."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Blog Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        {/* Sleek Category Filter Bar */}
        <div className="mb-16 border-b border-white/5 pb-12">
          <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 ${isRTL ? "md:flex-row-reverse text-right" : "text-left"}`}>
            <div>
              <span className="text-[10px] font-mono font-black text-sky-400 uppercase tracking-[0.3em] block mb-2">
                {lang === 'fr' ? 'FILTRAGE DES ACTUALITÉS' : 'تصفية المحتوى والمقالات'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">
                {lang === 'fr' ? 'Catégories d\'Expertise' : 'تخصصات الهندسة الطبوغرافية'}
              </h2>
            </div>
            <p className="text-sm text-gray-400 font-light max-w-md">
              {lang === 'fr' 
                ? 'Sélectionnez un domaine pour explorer nos analyses techniques, rapports de chantiers et décryptages légaux.' 
                : 'اختر تخصصاً علمياً لعرض المقالات والتحليلات التقنية والتقارير الميدانية الخاصة به.'}
            </p>
          </div>

          <div className={`flex flex-wrap gap-4 ${isRTL ? "justify-end" : "justify-start"}`}>
            {/* All Sectors Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-4 rounded-2xl text-[10px] font-mono font-black uppercase tracking-widest border transition-all duration-300 flex items-center gap-3 ${
                selectedCategory === null
                  ? "bg-sky-500 border-sky-400 text-white shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                  : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
              }`}
            >
              <Layers size={14} className={selectedCategory === null ? "text-white animate-pulse" : "text-gray-500"} />
              <span>{lang === 'fr' ? 'Tous les Secteurs' : 'جميع المجالات'}</span>
              <span className={`text-[9px] px-2 py-0.5 rounded-md font-sans ${
                selectedCategory === null ? "bg-white/20 text-white" : "bg-white/5 text-gray-500"
              }`}>
                {blogPosts.length}
              </span>
            </button>

            {/* Categorized buttons */}
            {categories.map((cat) => {
              // Get custom icon based on category name
              let IconComponent = Map;
              if (cat.toLowerCase().includes("drone") || cat.toLowerCase().includes("uav") || cat.includes("درون")) {
                IconComponent = Plane;
              } else if (cat.toLowerCase().includes("topography") || cat.toLowerCase().includes("topographie") || cat.includes("طبوغرا")) {
                IconComponent = Ruler;
              }

              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-4 rounded-2xl text-[10px] font-mono font-black uppercase tracking-widest border transition-all duration-300 flex items-center gap-3 ${
                    isSelected
                      ? "bg-sky-500 border-sky-400 text-white shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                      : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  <IconComponent size={14} className={isSelected ? "text-white" : "text-gray-500"} />
                  <span>{cat}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-md font-sans ${
                    isSelected ? "bg-white/20 text-white" : "bg-white/5 text-gray-500"
                  }`}>
                    {categoryCounts[cat] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <ScrollReveal variant="fadeUp" className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* LEFT COLUMN: ACTIVE POSTS GRID */}
          <div className="lg:w-2/3 space-y-16">
            
            {/* Active filters status bar */}
            {(selectedCategory || searchQuery) && (
              <div className={`p-6 bg-sky-500/5 border border-sky-400/20 rounded-3xl flex flex-wrap items-center justify-between gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <Filter size={14} className="text-sky-400" />
                  <span>
                    {lang === 'fr' 
                      ? `Filtré par : ${selectedCategory ? `Catégorie [${selectedCategory}]` : ""} ${searchQuery ? `Recherche [${searchQuery}]` : ""}` 
                      : `مصفى حسب : ${selectedCategory ? `الفئة [${selectedCategory}]` : ""} ${searchQuery ? `البحث [${searchQuery}]` : ""}`}
                  </span>
                  <span className="font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded text-[10px] text-sky-400">
                    {filteredPosts.length} {lang === 'fr' ? 'résultats' : 'نتائج'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery("");
                  }}
                  className="text-[10px] font-mono font-black text-sky-400 hover:text-white uppercase tracking-widest flex items-center gap-1 transition-colors"
                >
                  <X size={12} />
                  {lang === 'fr' ? 'RÉINITIALISER' : 'إلغاء التصفية'}
                </button>
              </div>
            )}

            {filteredPosts.length === 0 ? (
              <div className="text-center py-24 bg-white/[0.01] border border-white/5 rounded-[4rem] space-y-6">
                <Search size={40} className="text-gray-600 mx-auto" />
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                  {lang === 'fr' ? 'Aucun article trouvé' : 'لم نجد أي مقال'}
                </h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto px-6">
                  {lang === 'fr'
                    ? "Essayez de modifier vos mots-clés ou de sélectionner une autre catégorie dans le panneau de droite."
                    : "يرجى تغيير كلمات البحث أو اختيار فئة طبوغرافية أخرى من القائمة الجانبية للتصفية."}
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery("");
                  }}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-mono font-black py-4 px-8 rounded-full text-[10px] uppercase tracking-wider"
                >
                  {lang === 'fr' ? 'Afficher tous les articles' : 'عرض كافة المقالات'}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {filteredPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    className="group flex flex-col bg-zinc-950/20 border border-white/5 hover:border-sky-500/20 rounded-[3rem] p-6 transition-all duration-500"
                  >
                    {/* Thumbnail Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-gray-900 border border-white/5 mb-8">
                      <img 
                        src={post.image} 
                        alt={post.title[lang as "fr" | "ar"]} 
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute top-6 left-6">
                        <span className="bg-sky-500 text-white text-[9px] font-mono font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                          {post.category[lang as "fr" | "ar"]}
                        </span>
                      </div>

                      <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] font-mono text-white/80">
                        <Clock size={12} className="text-sky-400" />
                        <span>{post.readTime[lang as "fr" | "ar"]}</span>
                      </div>
                    </div>
                    
                    {/* Exquisite Metadata */}
                    <div className="space-y-4 flex-grow flex flex-col">
                      <div className={`flex items-center gap-6 text-[9px] font-mono font-black uppercase tracking-wider text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-sky-400" />
                          <span>{post.date[lang as "fr" | "ar"]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User size={12} className="text-sky-400" />
                          <span>{post.author[lang as "fr" | "ar"]}</span>
                        </div>
                      </div>
                      
                      <h3 className={`text-2xl font-black text-white group-hover:text-sky-400 transition-colors uppercase italic tracking-tighter leading-snug line-clamp-2 ${isRTL ? "text-right font-semibold" : "text-left"}`}>
                        {post.title[lang as "fr" | "ar"]}
                      </h3>
                      
                      <p className={`text-gray-400 font-light text-sm leading-relaxed flex-grow line-clamp-3 ${isRTL ? "text-right font-medium" : "text-left"}`}>
                        {post.excerpt[lang as "fr" | "ar"]}
                      </p>

                      {/* Tags Pillbox */}
                      <div className={`flex flex-wrap gap-1.5 pt-2 ${isRTL ? "justify-end" : "justify-start"}`}>
                        {post.tags[lang as "fr" | "ar"].slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[8px] font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 text-gray-500">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Read More button */}
                      <div className={`pt-6 border-t border-white/5 flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                        <button 
                          onClick={() => setActivePost(post)}
                          className="p-0 bg-transparent hover:bg-transparent text-sky-400 hover:text-white font-mono font-black uppercase tracking-[0.2em] text-[10px] group/btn flex items-center gap-4 transition-all"
                        >
                          {lang === 'fr' ? 'LIRE L\'ARTICLE' : 'قراءة المقال الكامِل'} 
                          <div className="w-9 h-9 rounded-full border border-sky-400/20 flex items-center justify-center group-hover/btn:bg-sky-400 group-hover/btn:text-white group-hover/btn:border-sky-400 transition-all duration-300">
                            <ChevronRight size={14} className={`transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                          </div>
                        </button>

                        <button
                          onClick={() => handleShare(post)}
                          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-sky-400 transition-all duration-300 relative"
                          title="Partager"
                        >
                          {copiedPostId === post.id ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                          <AnimatePresence>
                            {copiedPostId === post.id && (
                              <motion.span
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{ opacity: 1, y: -24, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute left-1/2 -translate-x-1/2 bg-emerald-500 text-black font-mono font-black text-[7px] px-2 py-0.5 rounded whitespace-nowrap"
                              >
                                {lang === 'fr' ? 'COPIÉ' : 'تم النسخ'}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: REFINED INTERACTIVE SIDEBAR */}
          <aside className="lg:w-1/3 space-y-12">
            
            {/* SEARCH PANEL */}
            <div className="glass-card p-10 rounded-[3rem] border-white/5 bg-zinc-950/20 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl" />
              <h4 className={`text-xl font-black text-white uppercase italic tracking-tighter mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                {lang === 'fr' ? 'Recherche Expert' : 'البحث المتقدم'}
              </h4>
              <div className="relative">
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'fr' ? 'Rechercher un mot-clé...' : 'ابحث عن كلمة مفتاحية...'} 
                  className={`bg-white/5 border-white/10 rounded-2xl h-14 px-6 text-sm text-white focus:border-sky-400 transition-all ${isRTL ? "text-right pl-12 pr-6" : "text-left pl-6 pr-12"}`} 
                />
                <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${isRTL ? "left-6" : "right-6"}`} size={18} />
              </div>
            </div>

            {/* CATEGORIES SELECTION PANEL */}
            <div className="glass-card p-10 rounded-[3rem] border-white/5 bg-zinc-950/20 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl" />
              <h4 className={`text-xl font-black text-white uppercase italic tracking-tighter mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                {lang === 'fr' ? 'Secteurs Clés' : 'مجالات التخصص'}
              </h4>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full flex justify-between items-center text-[10px] font-mono font-black uppercase tracking-widest py-3 border-b border-white/5 transition-colors ${
                      selectedCategory === null 
                        ? "text-sky-400" 
                        : "text-gray-400 hover:text-white"
                    } ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <span>{lang === 'fr' ? "Tous les Secteurs" : "كل مجالات التخصص"}</span>
                    <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">{blogPosts.length}</span>
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex justify-between items-center text-[10px] font-mono font-black uppercase tracking-widest py-3 border-b border-white/5 transition-colors ${
                        selectedCategory === cat 
                          ? "text-sky-400" 
                          : "text-gray-400 hover:text-white"
                      } ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <span>{cat}</span>
                      <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
                        {categoryCounts[cat] || 0}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* UPGRADED NEWSLETTER SUBSCRIPTION (with state transitions) */}
            <div className="glass-card p-10 rounded-[3rem] border-sky-500/20 bg-sky-500/5 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-sky-500/10 rounded-full blur-[60px]" />
              
              <AnimatePresence mode="wait">
                {!newsletterSuccess ? (
                  <motion.div
                    key="newsletter-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h4 className={`text-xl font-black text-white uppercase italic tracking-tighter ${isRTL ? "text-right" : "text-left"}`}>
                      Newsletter
                    </h4>
                    <p className={`text-gray-400 font-light text-sm leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                      {lang === 'fr' 
                        ? 'Abonnez-vous pour recevoir les synthèses de nos rapports géomatiques directement.' 
                        : 'اشترك للتوصل بآخر دراسات ومستجدات قطاع المساحة الطبوغرافية بجهة الشرق.'}
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                      <Input 
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="engineer@ecarttop.com" 
                        className={`bg-black/40 border-white/10 rounded-2xl h-14 px-6 text-sm text-white focus:border-sky-400 ${isRTL ? "text-right" : "text-left"}`} 
                      />
                      <Button 
                        type="submit"
                        disabled={isSubscribing}
                        className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/50 text-white font-mono font-black rounded-2xl h-14 uppercase tracking-[0.2em] text-[10px] border-none shadow-xl shadow-sky-500/15 flex items-center justify-center gap-2"
                      >
                        {isSubscribing ? (
                          <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        ) : (
                          <>
                            <Send size={12} />
                            <span>{lang === 'fr' ? "S'ABONNER" : "اشتراك"}</span>
                          </>
                        )}
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="newsletter-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-4"
                  >
                    <CheckCircle size={44} className="text-emerald-400 mx-auto animate-bounce" />
                    <h5 className="text-lg font-black text-white uppercase tracking-tight">
                      {lang === 'fr' ? 'INSCRIPTION RÉUSSIE !' : 'تم الاشتراك بنجاح!'}
                    </h5>
                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {lang === 'fr'
                        ? 'Merci de votre confiance. Vous recevrez nos bulletins d\'information.'
                        : 'شكراً لثقتكم. ستتوصلون بنشراتنا الإخبارية الدورية قريباً على بريدكم.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </aside>

        </ScrollReveal>
      </section>

      {/* FULL SCREEN SLIDE-OVER ARTICLE READER OVERLAY */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[150] backdrop-blur-2xl overflow-y-auto"
          >
            {/* Top Navigation Bar inside article reader */}
            <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
              <button
                onClick={() => setActivePost(null)}
                className="flex items-center gap-3 text-gray-400 hover:text-sky-400 transition-colors font-mono font-black text-[10px] uppercase tracking-widest"
              >
                <ArrowLeft size={16} />
                <span>{lang === 'fr' ? 'RETOUR AU BLOG' : 'العودة للمقالات'}</span>
              </button>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleShare(activePost)}
                  className="px-4 py-2 bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-2"
                >
                  {copiedPostId === activePost.id ? <Check size={12} className="text-emerald-400" /> : <Share2 size={12} />}
                  {copiedPostId === activePost.id 
                    ? (lang === 'fr' ? 'LIEN COPIÉ' : 'تم النسخ') 
                    : (lang === 'fr' ? 'PARTAGER' : 'مشاركة')}
                </button>
                
                <button
                  onClick={() => setActivePost(null)}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-gray-400 hover:text-white transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Article Content Layout */}
            <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-12">
              
              {/* Category tag */}
              <div className={`flex ${isRTL ? "justify-end" : "justify-start"}`}>
                <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px] font-mono font-black uppercase tracking-[0.2em] px-6 py-2.5 rounded-full">
                  {activePost.category[lang as "fr" | "ar"]}
                </span>
              </div>

              {/* Title heading */}
              <h1 className={`text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-tight ${isRTL ? "text-right font-semibold" : "text-left"}`}>
                {activePost.title[lang as "fr" | "ar"]}
              </h1>

              {/* Metadata strip */}
              <div className={`flex flex-wrap gap-6 text-[10px] font-mono text-gray-500 border-y border-white/5 py-6 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                <div className="flex items-center gap-2">
                  <User size={14} className="text-sky-400" />
                  <span className="text-white font-black">{activePost.author[lang as "fr" | "ar"]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-sky-400" />
                  <span>{activePost.date[lang as "fr" | "ar"]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-sky-400" />
                  <span>{activePost.readTime[lang as "fr" | "ar"]}</span>
                </div>
              </div>

              {/* Spectacular full-width hero image */}
              <div className="relative aspect-[16/9] w-full rounded-[3rem] overflow-hidden border border-white/10">
                <img 
                  src={activePost.image} 
                  alt={activePost.title[lang as "fr" | "ar"]} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* RICH ARTICLE BODY RENDERER */}
              <article className={`space-y-8 text-lg text-gray-300 font-light leading-relaxed ${isRTL ? "text-right font-medium" : "text-left"}`}>
                {activePost.content[lang as "fr" | "ar"].map((block, bIdx) => {
                  switch (block.type) {
                    case "heading":
                      return (
                        <h2 key={bIdx} className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tight pt-6">
                          {block.text}
                        </h2>
                      );

                    case "paragraph":
                      return (
                        <p key={bIdx} className="text-gray-300">
                          {block.text}
                        </p>
                      );

                    case "quote":
                      return (
                        <div key={bIdx} className={`p-8 bg-white/[0.02] border-sky-500 rounded-3xl relative ${isRTL ? "border-r-4 text-right" : "border-l-4 text-left"}`}>
                          <p className="text-xl italic font-normal text-white">
                            "{block.text}"
                          </p>
                          <span className="text-[9px] font-mono text-sky-400 uppercase tracking-widest block mt-4 font-black">
                            {lang === 'fr' ? 'PERSPECTIVE TOPOGRAPHIQUE' : 'رأي الخبير الطبوغرافي'}
                          </span>
                        </div>
                      );

                    case "bullet-list":
                      return (
                        <ul key={bIdx} className="space-y-3.5 pl-0">
                          {block.items?.map((item, iIdx) => (
                            <li key={iIdx} className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                              <div className="w-2 h-2 rounded-full bg-sky-400 mt-2.5 shrink-0" />
                              <span className="text-gray-300 text-base">{item}</span>
                            </li>
                          ))}
                        </ul>
                      );

                    case "table":
                      return (
                        <div key={bIdx} className="overflow-x-auto border border-white/5 rounded-2xl bg-zinc-950/40 my-8">
                          <table className="w-full text-sm font-mono text-left">
                            <thead className="bg-white/5 border-b border-white/5 text-[9px] font-black uppercase tracking-wider text-gray-400">
                              <tr>
                                {block.headers?.map((header, hIdx) => (
                                  <th key={hIdx} className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                              {block.rows?.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-white/[0.01]">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className={`p-4 font-light text-gray-300 ${isRTL ? "text-right" : "text-left"}`}>
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );

                    default:
                      return null;
                  }
                })}
              </article>

              {/* READER FOOTER AND NEWSLETTER WRAPPER */}
              <div className="pt-16 border-t border-white/5 space-y-12">
                <div className="flex justify-center">
                  <button
                    onClick={() => setActivePost(null)}
                    className="px-10 py-5 bg-sky-500 hover:bg-sky-600 text-white font-mono font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-sky-500/10 transition-all duration-300"
                  >
                    {lang === 'fr' ? 'Fermer la lecture' : 'إنهاء قراءة المقال'}
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
