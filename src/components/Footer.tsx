import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Linkedin, 
  Globe, 
  ChevronRight, 
  Award, 
  ShieldCheck, 
  Layers,
  ArrowUpRight
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export const Footer: React.FC = () => {
  const { lang, t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: t.nav.home, href: "/", desc: lang === "fr" ? "Page d'accueil" : "الصفحة الرئيسية" },
    { name: t.nav.about, href: "/about", desc: lang === "fr" ? "Notre cabinet & équipe" : "مكتبنا وفريقنا" },
    { name: t.nav.services, href: "/services", desc: lang === "fr" ? "Expertises géomatiques" : "الخبرات الجيوماتيكية" },
    { name: t.nav.portfolio, href: "/portfolio", desc: lang === "fr" ? "Nos réalisations" : "إنجازاتنا" },
    { name: t.nav.blog, href: "/blog", desc: lang === "fr" ? "Actualités & articles" : "الأخبار والمقالات" },
    { name: t.nav.careers, href: "/careers", desc: lang === "fr" ? "Rejoindre l'équipe" : "انضم للفريق" },
    { name: t.nav.contact, href: "/contact", desc: lang === "fr" ? "Demander un devis" : "طلب عرض سعر" },
  ];

  const servicesSitemap = [
    { name: lang === "fr" ? "Levés Topographiques" : "المسح الطوبوغرافي", hash: "/services#topo" },
    { name: lang === "fr" ? "Droit Foncier & Cadastre" : "القانون العقاري والمسح", hash: "/services#foncier" },
    { name: lang === "fr" ? "SIG & LiDAR" : "نظم المعلومات الجغرافية وليدار", hash: "/services#sig" },
    { name: lang === "fr" ? "Modélisation 3D / Drone" : "النمذجة ثلاثية الأبعاد والدرون", hash: "/services" },
    { name: lang === "fr" ? "Division & Copropriété" : "القسمة والملكية المشتركة", hash: "/services" },
  ];

  const industrySitemap = [
    { name: lang === "fr" ? "Infrastructures & Ports" : "البنية التحتية والموانئ", href: "/portfolio" },
    { name: lang === "fr" ? "Aménagement Urbain" : "التخطيط العمراني", href: "/portfolio" },
    { name: lang === "fr" ? "Suivi de Chantier" : "متابعة الأوراش", href: "/portfolio" },
    { name: lang === "fr" ? "Jumeaux Numériques" : "التوائم الرقمية", href: "/services" },
  ];

  return (
    <footer id="main-footer" className="mt-40 bg-zinc-950 border-t border-white/5 relative overflow-hidden text-gray-400">
      {/* Upper Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
      <div className="absolute -top-40 left-1/4 w-[35rem] h-[35rem] bg-sky-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 relative z-10">
        {/* Top Section: Brand Statement & Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-white/5">
          <div className="lg:col-span-6 space-y-8">
            <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/20 shadow-[0_0_20px_rgba(14,165,233,0.1)]">
                <Compass size={28} className="animate-spin-slow" />
              </div>
              <div className={isRTL ? "text-right" : "text-left"}>
                <span className="text-2xl font-black text-white tracking-tighter uppercase italic block">
                  {t.company}
                </span>
                <span className="text-[9px] font-black text-sky-400 uppercase tracking-[0.4em] block mt-0.5 font-mono">
                  {lang === "fr" ? "INGÉNIERIE GÉOMATIQUE" : "هندسة جيوماتيكية طوبوغرافية"}
                </span>
              </div>
            </div>
            
            <p className={`text-base font-light leading-relaxed max-w-xl ${isRTL ? "text-right" : "text-left"}`}>
              {lang === "fr" 
                ? "Cabinet agréé par l'Ordre National des Ingénieurs Géomètres-Topographes (ONIGT) et l'ANCFCC. Spécialisé dans les levés de haute précision, la sécurisation foncière, le LiDAR et la modélisation 3D à Nador et dans toute la région de l'Oriental."
                : "مكتب معتمد من الهيئة الوطنية للمهندسين المساحين الطوبوغرافيين والوكالة الوطنية للمحافظة العقارية. متخصص في المسوحات الطوبوغرافية عالية الدقة، التأمين العقاري، الليدار والنمذجة ثلاثية الأبعاد بالناظور والجهة الشرقية."}
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Accreditation Badges */}
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-start gap-4 hover:border-sky-500/30 transition-all duration-500">
              <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400">
                <Award size={20} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest font-mono block">ONIGT</span>
                <p className="text-xs text-white font-medium">
                  {lang === "fr" ? "Ingénieur Agréé ONIGT" : "مهندس معتمد لدى الهيئة"}
                </p>
                <p className="text-[10px] text-gray-500 font-light leading-relaxed">
                  {lang === "fr" ? "Ordre National du Maroc" : "الهيئة الوطنية للمهندسين المساحين"}
                </p>
              </div>
            </div>

            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-start gap-4 hover:border-sky-500/30 transition-all duration-500">
              <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400">
                <ShieldCheck size={20} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest font-mono block">ANCFCC</span>
                <p className="text-xs text-white font-medium">
                  {lang === "fr" ? "Dossiers Cadastrats" : "ملفات المحافظة العقارية"}
                </p>
                <p className="text-[10px] text-gray-500 font-light leading-relaxed">
                  {lang === "fr" ? "Partenaire officiel agréé" : "شريك رسمي معتمد"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Full Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 py-20 border-b border-white/5">
          {/* Column 1: Services Sitemap */}
          <div className="lg:col-span-3 space-y-8">
            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="w-1.5 h-6 bg-sky-500 rounded-full" />
              <h6 className="text-xs font-black text-white uppercase tracking-[0.3em] font-mono">
                {lang === "fr" ? "SERVICES GÉOMATIQUES" : "الخدمات الطوبوغرافية"}
              </h6>
            </div>
            <ul className="space-y-4">
              {servicesSitemap.map((srv, idx) => (
                <li key={idx} className={`flex items-center gap-2 group ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                  <ChevronRight size={12} className={`text-sky-400/40 group-hover:text-sky-400 transition-colors duration-300 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
                  <Link 
                    to={srv.hash} 
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 font-light block"
                  >
                    {srv.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Applications & Industries */}
          <div className="lg:col-span-3 space-y-8">
            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="w-1.5 h-6 bg-sky-500 rounded-full" />
              <h6 className="text-xs font-black text-white uppercase tracking-[0.3em] font-mono">
                {lang === "fr" ? "DOMAINES D'EXPERTISE" : "مجالات التخصص"}
              </h6>
            </div>
            <ul className="space-y-4">
              {industrySitemap.map((ind, idx) => (
                <li key={idx} className={`flex items-center gap-2 group ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                  <ChevronRight size={12} className={`text-sky-400/40 group-hover:text-sky-400 transition-colors duration-300 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
                  <Link 
                    to={ind.href} 
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 font-light block"
                  >
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Complete Sitemap */}
          <div className="lg:col-span-3 space-y-8">
            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="w-1.5 h-6 bg-sky-500 rounded-full" />
              <h6 className="text-xs font-black text-white uppercase tracking-[0.3em] font-mono">
                {lang === "fr" ? "SITEMAP DU SITE" : "خريطة الموقع كاملة"}
              </h6>
            </div>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href} className={`flex flex-col ${isRTL ? "items-end text-right" : "items-start text-left"}`}>
                  <Link 
                    to={link.href} 
                    onClick={handleScrollToTop}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 text-sky-400 transition-all duration-300 translate-y-1 group-hover:translate-y-0" />
                  </Link>
                  <span className="text-[9px] text-gray-600 font-mono tracking-wider mt-0.5">
                    {link.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Access */}
          <div className="lg:col-span-3 space-y-8">
            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="w-1.5 h-6 bg-sky-500 rounded-full" />
              <h6 className="text-xs font-black text-white uppercase tracking-[0.3em] font-mono">
                {lang === "fr" ? "CABINET DE NADOR" : "مكتب الناظور المعتمد"}
              </h6>
            </div>
            <div className={`space-y-6 ${isRTL ? "text-right" : "text-left"}`}>
              <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <MapPin className="text-sky-400 shrink-0 mt-1" size={18} />
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-sky-400 tracking-wider block font-mono">
                    {lang === "fr" ? "Adresse" : "العنوان"}
                  </span>
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    {t.contact.info.address}
                  </p>
                </div>
              </div>

              <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Phone className="text-sky-400 shrink-0 mt-1" size={18} />
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-sky-400 tracking-wider block font-mono">
                    {lang === "fr" ? "Téléphone direct" : "الهاتف المباشر"}
                  </span>
                  <a 
                    href={`tel:${t.contact.info.phone.replace(/\s/g, "")}`} 
                    className="text-lg font-black text-white tracking-tight hover:text-sky-400 transition-colors block font-mono"
                  >
                    {t.contact.info.phone}
                  </a>
                </div>
              </div>

              <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Mail className="text-sky-400 shrink-0 mt-1" size={18} />
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-sky-400 tracking-wider block font-mono">
                    {lang === "fr" ? "E-mail professionnel" : "البريد الإلكتروني المهني"}
                  </span>
                  <a 
                    href={`mailto:${t.contact.info.email}`} 
                    className="text-sm text-gray-300 hover:text-sky-400 transition-colors block font-mono font-medium"
                  >
                    {t.contact.info.email}
                  </a>
                </div>
              </div>

              <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Clock className="text-sky-400 shrink-0 mt-1" size={18} />
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-sky-400 tracking-wider block font-mono">
                    {lang === "fr" ? "Heures de travail" : "أوقات العمل"}
                  </span>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {lang === "fr" ? "Lun - Ven : 08:30 - 18:30" : "الإثنين - الجمعة : 08:30 - 18:30"}
                    <br />
                    {lang === "fr" ? "Sam : 08:30 - 13:00" : "السبت : 08:30 - 13:00"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className={`flex flex-col gap-2 ${isRTL ? "text-right md:items-end" : "text-left md:items-start"}`}>
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-black">
              © {new Date().getFullYear()} {t.company} NADOR | {lang === "fr" ? "PRÉCISION ABSOLUE" : "دقة مطلقة"}
            </p>
            <p className="text-[9px] text-gray-600 font-mono tracking-wide">
              {lang === "fr" 
                ? "Conçu pour la performance SEO de l'ingénierie cadastrale et géospatiale" 
                : "مصمم لتحسين أداء محركات البحث للهندسة المساحية والجيومكانية"}
            </p>
          </div>

          {/* Social Profiles & Language indicator */}
          <div className={`flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="flex gap-4">
              {[
                { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: Globe, href: "https://ecarttop.ma", label: "Site Web" },
                { Icon: Mail, href: `mailto:${t.contact.info.email}`, label: "E-mail" }
              ].map((soc, idx) => (
                <a 
                  key={idx} 
                  href={soc.href} 
                  target="_blank"
                  rel="noreferrer"
                  aria-label={soc.label}
                  className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 hover:text-sky-400 hover:bg-sky-500/10 transition-all duration-300 border border-white/5 hover:border-sky-500/20"
                >
                  <soc.Icon size={18} />
                </a>
              ))}
            </div>

            <div className="h-6 w-[1px] bg-white/10" />

            {/* Micro Links */}
            <div className="flex gap-6 text-[10px] font-black text-gray-600 uppercase tracking-widest font-mono">
              <a href="#" className="hover:text-sky-400 transition-colors">
                {lang === "fr" ? "Mentions Légales" : "القانونية"}
              </a>
              <a href="#" className="hover:text-sky-400 transition-colors">
                {lang === "fr" ? "Confidentialité" : "الخصوصية"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
