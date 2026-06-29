import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, Phone, Mail, Linkedin, MapPin, Globe, ChevronUp, Home, Info, 
  Briefcase, Folder, FileText, GraduationCap, Map, Sparkles, Sun, Moon 
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import Breadcrumb from "./Breadcrumb";
import { Footer } from "./Footer";
import CursorTracker from "./CursorTracker";
import FloatingCompass from "./FloatingCompass";

const Logo = ({ className = "" }: { className?: string }) => {
  const { theme } = useTheme();
  return (
    <div className={`flex items-center gap-4 cursor-pointer ${className}`}>
      <div className="relative group">
        <div className={`absolute -inset-2 rounded-full blur-xl transition duration-500 ${
          theme === 'navy' 
            ? 'bg-sky-500/20 group-hover:bg-sky-500/40' 
            : 'bg-sky-500/10 group-hover:bg-sky-500/20'
        }`}></div>
        <img 
          src="https://i.ibb.co/b580ZYcB/1776223435784.png" 
          alt="Logo" 
          className={`h-12 w-auto relative hover:scale-110 transition duration-500 ${
            theme === 'navy' 
              ? 'mix-blend-screen invert hue-rotate-180 brightness-150' 
              : 'mix-blend-multiply contrast-125'
          }`}
        />
      </div>
    </div>
  );
};

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { lang, setLang, t, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [themeWipe, setThemeWipe] = useState<{ active: boolean; targetTheme: 'light' | 'navy' | null }>({
    active: false,
    targetTheme: null
  });

  const handleThemeToggleClick = () => {
    if (themeWipe.active) return;
    const target = theme === 'navy' ? 'light' : 'navy';
    setThemeWipe({ active: true, targetTheme: target });
    
    setTimeout(() => {
      toggleTheme();
    }, 450); // Peak of the screen-wide wipe
    
    setTimeout(() => {
      setThemeWipe({ active: false, targetTheme: null });
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollTop / docHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const navLinks = [
    { name: t.nav.home, href: "/", icon: Home, subFr: "Page d'accueil", subAr: "الصفحة الرئيسية" },
    { name: t.nav.about, href: "/about", icon: Info, subFr: "Notre parcours", subAr: "نبذة عنا ومؤهلاتنا" },
    { name: t.nav.services, href: "/services", icon: Folder, subFr: "Expertise technique", subAr: "خدمات الهندسة والمساحة" },
    { name: t.nav.portfolio, href: "/portfolio", icon: Briefcase, subFr: "Projets d'envergure", subAr: "معرض أعمالنا ومشاريعنا" },
    { name: t.nav.seisme, href: "/seisme-marrakech", icon: Map, subFr: "Carte interactive", subAr: "خريطة الزلزال التفاعلية" },
    { name: t.nav.studio, href: "/studio", icon: Sparkles, subFr: "Boutique d'affiches d'art", subAr: "شراء ملصقات جدارية فاخرة" },
    { name: t.nav.blog, href: "/blog", icon: FileText, subFr: "Actualités & Insights", subAr: "المدونة والمقالات العلمية" },
    { name: t.nav.careers, href: "/careers", icon: GraduationCap, subFr: "Rejoindre l'équipe", subAr: "فرص العمل والتدريب" },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'lang-ar text-right' : 'text-left'} ${
      theme === 'navy' 
        ? 'selection:bg-sky-500/30 selection:text-white' 
        : 'selection:bg-sky-500/15 selection:text-sky-900'
    }`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Interactive Cursor Tracking Glow & Laser Pointer */}
      <CursorTracker />

      {/* Slim Fixed Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] bg-transparent pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-sky-500 shadow-[0_1px_8px_rgba(56,189,248,0.5)] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Screen-wide premium wipe transition overlay */}
      <AnimatePresence>
        {themeWipe.active && (
          <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
            {/* First layer: Sky blue accent wipe */}
            <motion.div
              initial={{ x: isRTL ? "-130%" : "130%", skewX: -12 }}
              animate={{ x: "0%", skewX: -12 }}
              exit={{ x: isRTL ? "130%" : "-130%", skewX: -12 }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-y-0 w-[160vw] -left-[30vw] bg-sky-500 shadow-2xl"
            />
            {/* Second layer: The target theme background color */}
            <motion.div
              initial={{ x: isRTL ? "-130%" : "130%", skewX: -12 }}
              animate={{ x: "0%", skewX: -12 }}
              exit={{ x: isRTL ? "130%" : "-130%", skewX: -12 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className={`absolute inset-y-0 w-[160vw] -left-[30vw] shadow-2xl flex items-center justify-center ${
                themeWipe.targetTheme === 'navy' ? 'bg-[#020617]' : 'bg-[#f8fafc]'
              }`}
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.15 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="w-24 h-24 rounded-full border border-sky-400 flex items-center justify-center text-sky-400"
                >
                  {themeWipe.targetTheme === 'navy' ? <Sun size={32} /> : <Moon size={32} />}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Vertical Branding Rail */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-[60] hidden xl:flex flex-col items-center gap-12 pointer-events-none">
        <span className="text-[10px] font-black uppercase tracking-[1em] text-sky-400/30 vertical-text origin-center">
          NABIL BOUTRIK
        </span>
        <div className="w-[1px] h-32 bg-gradient-to-b from-sky-400/30 to-transparent" />
      </div>

      {/* Global Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'p-4' : 'p-6'}`}>
        <div className={`max-w-7xl mx-auto transition-all duration-500 ${scrolled ? 'glass-panel px-6 py-3 rounded-2xl shadow-2xl' : 'px-4 py-2'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6 cursor-pointer group" onClick={() => navigate('/')}>
              <Logo />
              <div className={`pl-6 hidden md:block transition-all duration-500 border-l ${
                theme === 'navy' ? 'border-white/10' : 'border-slate-200'
              } ${scrolled ? 'opacity-0 scale-90 w-0 overflow-hidden' : 'opacity-100 scale-100'} ${isRTL ? 'border-r border-l-0 pr-6 pl-0' : ''}`}>
                <h1 className={`font-black text-xl leading-tight uppercase tracking-tighter transition-colors ${
                  theme === 'navy' ? 'text-white group-hover:text-sky-400' : 'text-slate-900 group-hover:text-sky-600'
                }`}>
                  NABIL <span className="text-sky-400 transition-colors">BOUTRIK</span>
                </h1>
                <p className={`text-[8px] uppercase tracking-[0.15em] font-bold mt-1 transition-colors ${
                  theme === 'navy' ? 'text-gray-400' : 'text-slate-500'
                }`}>
                  {lang === 'fr' ? 'Ingénieur Géomètre-Topographe' : 'مهندس مساح طوبوغرافي'}
                </p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  to={link.href}
                  className={`text-[11px] uppercase tracking-[0.25em] font-black transition-all duration-300 ${
                    location.pathname === link.href 
                      ? 'text-sky-400' 
                      : (theme === 'navy' ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                  } relative group`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-[2px] bg-sky-400 transition-all duration-300 ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-6">
              {/* Language toggle button */}
              <button 
                onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')} 
                className={`text-[10px] font-black border w-10 h-10 rounded-xl transition-all flex items-center justify-center hover:border-sky-500/50 cursor-pointer ${
                  theme === 'navy' 
                    ? 'border-white/10 hover:bg-white/5 text-white' 
                    : 'border-slate-200 hover:bg-slate-100 text-slate-800'
                }`}
              >
                {lang === 'fr' ? 'AR' : 'FR'}
              </button>

              {/* Theme toggle button */}
              <button 
                onClick={handleThemeToggleClick} 
                className={`w-10 h-10 rounded-xl border transition-all flex items-center justify-center hover:border-sky-500/50 cursor-pointer overflow-hidden ${
                  theme === 'navy' 
                    ? 'border-white/10 hover:bg-white/5 text-sky-400' 
                    : 'border-slate-200 hover:bg-slate-100 text-sky-600'
                }`}
                title={lang === 'fr' ? "Changer le thème" : "تغيير المظهر"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex items-center justify-center"
                  >
                    {theme === 'navy' ? <Sun size={15} /> : <Moon size={15} />}
                  </motion.div>
                </AnimatePresence>
              </button>
              
              <div className="hidden xl:flex flex-col items-end">
                <span className={`text-[8px] uppercase tracking-widest font-black mb-1 transition-colors ${
                  theme === 'navy' ? 'text-gray-500' : 'text-slate-400'
                }`}>{lang === 'fr' ? 'Assistance' : 'للمساعدة'}</span>
                <a href={`tel:${t.contact.info.phone.replace(/\s/g, '')}`} className={`font-black text-xs hover:text-sky-400 transition-colors tracking-tighter transition-colors ${
                  theme === 'navy' ? 'text-white' : 'text-slate-800'
                }`}>
                  {t.contact.info.phone}
                </a>
              </div>

              <Button 
                onClick={() => navigate('/contact')} 
                className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-xl shadow-sky-500/20 border-none hidden sm:flex cursor-pointer"
              >
                {t.nav.contact}
              </Button>
              
              {/* Mobile Menu Toggle */}
              <button 
                className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 relative z-[110] cursor-pointer ${
                  isMenuOpen 
                    ? 'bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.5)] border border-sky-400 text-white' 
                    : (theme === 'navy' 
                        ? 'bg-white/5 hover:bg-white/10 border border-white/10 text-white' 
                        : 'bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800')
                }`} 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu with Premium Glass-morphism Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-[100] backdrop-blur-md lg:hidden ${
              theme === 'navy' ? 'bg-slate-950/40' : 'bg-slate-900/25'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: isRTL ? -350 : 350, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isRTL ? -350 : 350, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`absolute top-0 bottom-0 ${isRTL ? 'left-0 border-r' : 'right-0 border-l'} w-full max-w-[340px] p-6 flex flex-col justify-between z-50 transition-colors duration-500 ${
                theme === 'navy' 
                  ? 'bg-slate-950/85 text-white border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]' 
                  : 'bg-white/95 text-slate-900 border-slate-200 shadow-[0_0_40px_rgba(15,23,42,0.12)]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header inside the drawer */}
              <div className={`flex items-center justify-between pb-6 mt-16 border-b ${
                theme === 'navy' ? 'border-white/5' : 'border-slate-100'
              }`}>
                <div className={`flex items-center gap-3 w-full ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                  <Logo />
                  <div>
                    <span className={`font-black text-sm tracking-tight block uppercase transition-colors ${
                      theme === 'navy' ? 'text-white' : 'text-slate-950'
                    }`}>Nabil Boutrik</span>
                    <span className="text-[7px] text-sky-400 block tracking-widest font-mono uppercase">
                      {lang === 'fr' ? 'Ingénieur Géomètre-Topographe' : 'مهندس مساح طوبوغرافي'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Links with custom Icons */}
              <div className="flex-grow py-6 overflow-y-auto space-y-1.5 flex flex-col justify-center">
                {navLinks.map((link, idx) => {
                  const IconComponent = link.icon;
                  const isActive = location.pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link 
                        to={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                          isActive 
                            ? (theme === 'navy' 
                                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.05)]' 
                                : 'bg-sky-100 text-sky-700 border border-sky-200') 
                            : (theme === 'navy' 
                                ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent' 
                                : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-transparent')
                        }`}
                      >
                        <div className={`p-2 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? (theme === 'navy' ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-200/50 text-sky-700') 
                            : (theme === 'navy' 
                                ? 'bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-white/10' 
                                : 'bg-slate-100 text-slate-500 group-hover:text-slate-800 group-hover:bg-slate-200/60')
                        }`}>
                          <IconComponent size={18} />
                        </div>
                        <div className={`flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
                          <span className="text-xs font-black uppercase tracking-[0.2em]">{link.name}</span>
                          <span className={`text-[8px] font-mono mt-0.5 tracking-wider transition-colors ${
                            theme === 'navy' ? 'text-gray-500' : 'text-slate-400'
                          }`}>
                            {lang === 'fr' ? link.subFr : link.subAr}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer inside the drawer */}
              <div className={`pt-6 border-t space-y-4 ${
                theme === 'navy' ? 'border-white/5' : 'border-slate-100'
              }`}>
                <div className={`rounded-xl p-4 border space-y-3 ${
                  theme === 'navy' 
                    ? 'bg-white/5 border-white/5' 
                    : 'bg-slate-50 border-slate-200/60'
                }`}>
                  <div className={`flex items-center gap-3 transition-colors text-xs ${isRTL ? 'flex-row-reverse' : ''} ${
                    theme === 'navy' ? 'text-gray-400 hover:text-sky-400' : 'text-slate-600 hover:text-sky-600'
                  }`}>
                    <Phone size={14} className="text-sky-400 shrink-0" />
                    <a href={`tel:${t.contact.info.phone.replace(/\s/g, '')}`} className="font-bold font-mono tracking-tight text-[11px] block">
                      {t.contact.info.phone}
                    </a>
                  </div>
                  <div className={`flex items-center gap-3 transition-colors text-xs ${isRTL ? 'flex-row-reverse' : ''} ${
                    theme === 'navy' ? 'text-gray-400 hover:text-sky-400' : 'text-slate-600 hover:text-sky-600'
                  }`}>
                    <Mail size={14} className="text-sky-400 shrink-0" />
                    <a href={`mailto:${t.contact.info.email}`} className="font-bold text-[11px] block break-all">
                      {t.contact.info.email}
                    </a>
                  </div>
                </div>

                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-[8px] font-mono uppercase ${
                    theme === 'navy' ? 'text-gray-500' : 'text-slate-400'
                  }`}>© 2026 NABIL BOUTRIK</span>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      theme === 'navy' 
                        ? 'bg-white/5 text-gray-400 hover:bg-sky-500/10 hover:text-sky-400' 
                        : 'bg-slate-100 text-slate-500 hover:bg-sky-50 hover:text-sky-600'
                    }`}
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {location.pathname !== '/' && (
              <div className="absolute top-36 left-0 right-0 z-30 pointer-events-auto">
                <div className="max-w-7xl mx-auto px-6">
                  <Breadcrumb />
                </div>
              </div>
            )}
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`fixed left-6 md:left-8 bottom-6 md:bottom-8 z-[100] w-12 h-12 rounded-xl backdrop-blur-md transition-all duration-300 group flex items-center justify-center cursor-pointer ${
              theme === 'navy' 
                ? 'bg-slate-950/80 text-sky-400 border border-sky-500/20 hover:border-sky-400 hover:text-white hover:bg-slate-900' 
                : 'bg-white/80 text-sky-600 border border-slate-200 hover:border-sky-400 hover:text-sky-700 hover:bg-white shadow-md'
            }`}
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} className="transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Interactive Survey Compass */}
      <FloatingCompass />
    </div>
  );
}
