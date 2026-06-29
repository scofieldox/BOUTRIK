import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function FAQ() {
  const { lang, isRTL } = useLanguage();
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isNavy = theme === 'navy';

  const faqData = {
    fr: [
      {
        q: "Quelle est la différence de précision entre la topographie classique et les levés par drone ?",
        a: "La topographie par drone (avec capteurs RTK et LiDAR de haute précision) permet de cartographier instantanément de grandes superficies avec une précision centimétrique (2 à 5 cm). Pour des travaux de génie civil, de copropriété ou de bornage officiel ANCFCC nécessitant une précision absolue millimétrique, nos équipes déploient des stations totales robotisées complémentaires sur le terrain.",
        category: "UAV & DRONE"
      },
      {
        q: "Êtes-vous agréé par l'ANCFCC pour la réalisation de dossiers cadastraux immobiliers ?",
        a: "Oui absolument. Le cabinet ECARTTOP, sous la direction de M. Nabil Boutrik, ingénieur topographe agréé, est habilité par l'Ordre National des Ingénieurs Topographes (ONIGT) et agréé par la Conservation Foncière (ANCFCC) pour instruire officiellement tous vos dossiers d'immatriculation, de copropriété (mise en concordance, éclatement de titres, etc.) et de mise à jour cadastrale.",
        category: "FONCIER & CADASTRE"
      },
      {
        q: "En quoi consiste l'intégration de données au sein d'un SIG (Système d'Information Géographique) ?",
        a: "Un SIG est une base de données intelligente à référence spatiale. Nous convertissons, structurons et cataloguons vos couches de données physiques (routes, réseaux d'eau, parcelles, reliefs) en un système interactif d'aide à la décision. Ce jumeau numérique permet aux administrations et aux promoteurs de simuler et planifier au mieux leurs projets d'aménagement.",
        category: "SIG"
      },
      {
        q: "Quels sont les avantages des nuages de points LiDAR par rapport à la photogrammétrie classique ?",
        a: "Le LiDAR (Laser par drone) émet des impulsions lumineuses qui traversent la végétation dense pour capter le véritable relief du terrain naturel (MNT). La photogrammétrie classique reconstitue les surfaces à partir de clichés photographiques haute définition, idéale sur des sols nus ou des sites miniers ouverts. Nous exploitons les deux technologies selon les besoins géographiques.",
        category: "SATELLITE & LiDAR"
      },
      {
        q: "Comment puis-je obtenir un devis pour des travaux topographiques dans l'Oriental ?",
        a: "Très simplement, vous pouvez nous contacter directement via notre page de contact ou par téléphone. Un ingénieur agréé étudiera les spécificités géométriques et juridiques de votre parcelle ou projet d'infrastructure afin de vous formuler une proposition sur-mesure et transparente sous 48 heures.",
        category: "SUPPORT"
      }
    ],
    ar: [
      {
        q: "ما هو الفرق في الدقة بين الطبوغرافيا التقليدية والمسح باستخدام الطائرات بدون طيار (الدرون)؟",
        a: "يتيح المسح باستخدام الطائرات بدون طيار (المجهزة بمستشعرات RTK و LiDAR عالية الدقة) رسم خرائط لمساحات شاسعة فورياً وبدقة سنتيمترية تتراوح بين 2 و 5 سم. أما للأعمال الهندسية الدقيقة ومشاريع الملكية المشتركة أو تحديد الحدود الرسمي المعتمد من المحافظة العقارية والذي يتطلب دقة ملمترية، فإن فرقنا تستخدم محطات الرصد الكلية الآلية (Stations Totales) المتكاملة على الأرض لتوفير أدق القياسات الممكنة.",
        category: "المسح الجوي بالدرون"
      },
      {
        q: "هل مكتبكم معتمد من طرف الوكالة الوطنية للمحافظة العقارية (ANCFCC) لإعداد ملفات التحفيظ؟",
        a: "نعم بكل تأكيد. مكتب إيكارت توب، تحت إدارة السيد نبيل بوتريك، مهندس مساح طبوغرافي معتمد، مرخص له ومسجل بالهيئة الوطنية للمهندسين المساحين الطبوغرافيين (ONIGT) ومؤهل رسمياً من طرف المحافظة العقارية (ANCFCC) لإعداد وتسيير جميع ملفات التحفيظ العقاري، الملكية المشتركة (تطابق الملكية، تقسيم الرسوم العقارية) والتعديلات الفنية الطبوغرافية.",
        category: "المحافظة العقارية"
      },
      {
        q: "ما الذي يعنيه دمج البيانات في نظم المعلومات الجغرافية (SIG)؟",
        a: "نظام المعلومات الجغرافية هو قاعدة بيانات ذكية مرتبطة بالمجال الجغرافي. نقوم بتحويل وبناء وهيكلة طبقات البيانات الفيزيائية (الطرق، شبكات المياه، القطع الأرضية، التضاريس) في نظام تفاعلي يدعم اتخاذ القرارات وحوكمة المشاريع. يتيح هذا التوأم الرقمي للجماعات الترابية والمستثمرين محاكاة وتخطيط مشاريع التهيئة والتنمية بشكل مرن.",
        category: "نظم المعلومات الجغرافية"
      },
      {
        q: "ما هي مزايا سحابة النقاط LiDAR مقارنة بالتصوير الجوي الكلاسيكي (Photogrammétrie)؟",
        a: "تقنية LiDAR (مسح الليزر عبر الدرون) تبث نبضات ضوئية قادرة على اختراق الغطاء النباتي الكثيف لالتقاط التضاريس الحقيقية للأرض الطبيعية (MNT). بينما يعتمد التصوير الجوي الكلاسيكي على تركيب الصور عالية الدقة لإعادة بناء الأسطح، وهو ممتاز في المواقع المكشوفة والمقالع المفتوحة. نحن نختار التقنية الأنسب بناءً على تضاريس وطبيعة مشروعكم.",
        category: "تكنولوجيا الاستشعار"
      },
      {
        q: "كيف يمكنني الحصول على عرض سعر لمشروع طبوغرافي بالجهة الشرقية أو الناظور؟",
        a: "يمكنك التواصل معنا بسهولة عبر ملء استمارة الاتصال بالموقع أو الاتصال بنا هاتفياً. سيقوم مهندس معتمد بدراسة الجوانب التقنية والقانونية لعقاركم أو مشروع البنية التحتية الخاص بكم وتوفير عرض سعر مجاني وواضح في غضون 48 ساعة.",
        category: "الدعم الفني"
      }
    ]
  };

  const currentFaqs = faqData[lang] || faqData.fr;

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section 
      className={`py-40 relative overflow-hidden border-t transition-colors duration-500 ${
        isNavy ? 'bg-black/40 border-white/5' : 'bg-slate-50/50 border-slate-200/50'
      }`} 
      id="faq-section"
    >
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isNavy 
            ? 'bg-[radial-gradient(circle_at_30%_80%,rgba(52,170,220,0.02),transparent_60%)]' 
            : 'bg-[radial-gradient(circle_at_30%_80%,rgba(14,165,233,0.04),transparent_60%)]'
        }`} 
      />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Underlined Premium Section Label */}
        <div className="flex flex-col items-center text-center mb-24 space-y-4">
          <div 
            className={`inline-flex items-center gap-3 border px-5 py-2 rounded-full transition-all duration-500 ${
              isNavy 
                ? 'bg-white/5 border-white/10 text-sky-400' 
                : 'bg-sky-500/5 border-sky-500/10 text-sky-600'
            }`}
          >
            <HelpCircle className={isNavy ? "text-sky-400" : "text-sky-500"} size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">
              {lang === 'fr' ? 'Foire Aux Questions' : 'الأسئلة الشائعة'}
            </span>
          </div>
          <h2 
            className={`text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-tight transition-colors duration-500 ${
              isNavy ? 'text-white' : 'text-slate-900'
            }`}
          >
            {lang === 'fr' ? 'Questions' : 'أسئلة'}{' '}
            <span className={`${isNavy ? 'text-sky-400' : 'text-sky-500'} not-italic font-light`}>
              {lang === 'fr' ? 'Fréquentes' : 'متكررة'}
            </span>
          </h2>
          <p 
            className={`max-w-xl font-light text-lg transition-colors duration-500 ${
              isNavy ? 'text-gray-400' : 'text-slate-600'
            }`}
          >
            {lang === 'fr' 
              ? 'Retrouvez nos réponses d\'experts sur la géomatique, l\'ingénierie et la réglementation foncière au Maroc.'
              : 'اطلع على أهم الأجوبة التقنية والقانونية المتعلقة بالمسح الطبوغرافي والتحفيظ العقاري ونظم المعلومات الجغرافية.'}
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4" role="presentation">
          {currentFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`border rounded-[2rem] overflow-hidden transition-all duration-300 ${
                  isNavy
                    ? isOpen 
                      ? 'bg-zinc-950/80 border-sky-500/30 shadow-[0_0_25px_-5px_rgba(52,170,220,0.15)]' 
                      : 'bg-zinc-950/30 border-white/5 hover:border-white/10 hover:bg-zinc-950/60'
                    : isOpen
                      ? 'bg-white border-sky-500/25 shadow-[0_15px_40px_rgba(14,165,233,0.06)]'
                      : 'bg-white/80 border-slate-200/70 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {/* Header Toggle Button */}
                <button
                  type="button"
                  id={`faq-btn-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${idx}`}
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left flex items-start justify-between gap-6 p-8 md:p-10 cursor-pointer focus:outline-none"
                  style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                >
                  <div className="space-y-2 flex-grow text-left">
                    <span 
                      className={`text-[9px] font-black uppercase tracking-[0.2em] font-mono block transition-colors ${
                        isNavy ? 'text-sky-400/80' : 'text-sky-600'
                      }`}
                    >
                      {faq.category}
                    </span>
                    <h3 
                      className={`text-xl md:text-2xl font-black leading-snug tracking-tight transition-colors duration-500 ${
                        isRTL ? 'text-right' : 'text-left'
                      } ${
                        isNavy ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      {faq.q}
                    </h3>
                  </div>

                  <div 
                    className={`mt-2 p-2 rounded-full border flex-shrink-0 transition-all duration-300 ${
                      isRTL ? 'mr-4' : 'ml-4'
                    } ${
                      isNavy 
                        ? isOpen 
                          ? 'bg-sky-500/20 border-sky-400/30' 
                          : 'bg-white/5 border-white/5'
                        : isOpen
                          ? 'bg-sky-500/10 border-sky-500/25'
                          : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        isNavy ? 'text-sky-400' : 'text-sky-500'
                      } ${
                        isOpen ? 'rotate-180 [color:unset] text-sky-400' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Animated Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${idx}`}
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: 'auto', 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3, ease: 'easeOut' },
                          opacity: { duration: 0.2, delay: 0.1 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: 'easeIn' },
                          opacity: { duration: 0.1 }
                        }
                      }}
                    >
                      <div 
                        className={`px-8 pb-8 md:px-10 md:pb-10 border-t mt-1 pt-6 text-lg leading-relaxed font-light transition-colors ${
                          isNavy ? 'text-gray-400 border-white/5' : 'text-slate-600 border-slate-100'
                        }`} 
                        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                      >
                        <div className={`flex gap-4 ${isRTL ? 'text-right flex-row-reverse' : 'text-left flex-row'}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                            isNavy ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-500/10 text-emerald-600'
                          }`}>
                            <CheckCircle size={14} />
                          </div>
                          <p className="flex-grow">{faq.a}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
