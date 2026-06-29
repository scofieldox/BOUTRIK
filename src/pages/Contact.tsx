import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Linkedin, 
  Send,
  MessageSquare,
  Globe,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { ScrollReveal } from "../components/ScrollReveal";
import { CostEstimator } from "../components/CostEstimator";
import gnssSurveyFieldImg from "../assets/images/gnss_survey_field_1782352782520.jpg";
import gisAnalysisImg from "../assets/images/gis_analysis_1782352722617.jpg";

export default function Contact() {
  const { t, lang, isRTL } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Land Surveying");
  const [message, setMessage] = useState("");

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Moroccan/international phone format: at least 9 digits, allowing + and spaces
  const phoneRegex = /^(\+?[0-9\s-]{9,20})$/;

  const errors = {
    name: name.trim() === "" 
      ? (lang === 'fr' ? "Le nom complet est requis" : "الاسم الكامل مطلوب")
      : name.trim().length < 2
      ? (lang === 'fr' ? "Le nom doit contenir au moins 2 caractères" : "يجب أن يحتوي الاسم على حرفين على الأقل")
      : "",
    email: email.trim() === ""
      ? (lang === 'fr' ? "L'adresse e-mail est requise" : "البريد الإلكتروني مطلوب")
      : !emailRegex.test(email)
      ? (lang === 'fr' ? "Veuillez entrer une adresse e-mail valide" : "يرجى إدخال بريد إلكتروني صحيح")
      : "",
    phone: phone.trim() === ""
      ? (lang === 'fr' ? "Le numéro de téléphone est requis" : "رقم الهاتف مطلوب")
      : !phoneRegex.test(phone.trim())
      ? (lang === 'fr' ? "Veuillez entrer un numéro de téléphone valide (ex: +212600000000)" : "يرجى إدخال رقم هاتف صحيح (مثال: 212600000000+)")
      : "",
    message: message.trim() === ""
      ? (lang === 'fr' ? "Le message est requis" : "الرسالة مطلوبة")
      : message.trim().length < 10
      ? (lang === 'fr' ? "Le message doit contenir au moins 10 caractères" : "يجب أن تحتوي الرسالة على 10 أحرف على الأقل")
      : "",
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set all fields to touched to display any validation errors
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true
    });

    const hasErrors = Object.values(errors).some(error => error !== "");
    if (hasErrors) return;

    setIsSubmitting(true);
    // Simulate high-fidelity network sending delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setSubject("Land Surveying");
    setMessage("");
    setTouched({
      name: false,
      email: false,
      phone: false,
      message: false
    });
    setIsSuccess(false);
  };

  const handleApplyEstimate = (estimateText: string, calculatedSubject: string) => {
    setMessage(estimateText);
    setSubject(calculatedSubject);
    // Pre-validate applied message
    setTouched(prev => ({ ...prev, message: true }));
  };

  return (
    <div className="pb-24">
      <SEO page="contact" />
      {/* Header */}
      <section className="bg-black text-white py-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-cover bg-center grayscale" style={{ backgroundImage: `url(${gnssSurveyFieldImg})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-12">
              <MessageSquare className="text-sky-400" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">{lang === 'fr' ? 'Contactez-nous' : 'اتصل بنا'}</span>
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black mb-12 tracking-tighter uppercase italic leading-[0.85]">
              {lang === 'fr' ? 'Parlons de' : 'لنتحدث عن'} <br />
              <span className="text-sky-400 not-italic font-light">{lang === 'fr' ? 'Votre Projet' : 'مشروعك'}</span>
            </h1>
            <p className="text-2xl text-gray-400 leading-relaxed font-light max-w-2xl">
              {t.contact.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Cost Estimator */}
      <section className="pt-24 pb-12 max-w-7xl mx-auto px-6">
        <ScrollReveal variant="fadeUp">
          <CostEstimator onApplyEstimate={handleApplyEstimate} />
        </ScrollReveal>
      </section>

      <section className="py-40 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Contact Info */}
          <ScrollReveal variant="fadeUp" className="lg:col-span-1 space-y-20">
            <div className="space-y-12">
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">{lang === 'fr' ? 'Coordonnées' : 'معلومات الاتصال'}</h2>
              <ul className="space-y-12">
                {[
                  { icon: MapPin, title: lang === 'fr' ? 'Siège Social' : 'المقر الرئيسي', text: '172 bd Youssef Ibn Tachfine, immb. Ennasr 3ème étg. Nador - Maroc' },
                  { icon: Phone, title: lang === 'fr' ? 'Téléphone' : 'الهاتف', text: '+212 (0) 536 60 00 00' },
                  { icon: Mail, title: lang === 'fr' ? 'E-mail' : 'البريد الإلكتروني', text: 'contact@ecarttop.com' },
                  { icon: Clock, title: lang === 'fr' ? 'Horaires' : 'ساعات العمل', text: lang === 'fr' ? 'Lun - Ven: 8:00 - 18:00' : 'الإثنين - الجمعة: 8:00 - 18:00' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-8 group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 border border-white/5 group-hover:border-sky-400/30 shrink-0">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400 mb-3">{item.title}</h4>
                      <p className="text-gray-400 text-lg font-light leading-relaxed">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-12 rounded-[4rem] border-white/5 space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">{lang === 'fr' ? 'Suivez-nous' : 'تابعنا'}</h4>
              <div className="flex gap-6">
                {[Linkedin, Globe].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-sky-500 hover:text-white transition-all duration-500 border border-white/5 hover:border-sky-400/30">
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal variant="fadeUp" delay={0.2} className="lg:col-span-2">
            <div className="glass-card p-12 md:p-20 rounded-[5rem] border-sky-500/20 relative overflow-hidden min-h-[600px] flex flex-col justify-center">
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-sky-500/5 rounded-full blur-[100px]" />
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center py-8 flex flex-col items-center"
                  >
                    <div className="w-24 h-24 bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center text-emerald-400 mb-8 border border-emerald-400/25 relative shadow-lg shadow-emerald-500/10">
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle2 size={48} />
                      </motion.div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">
                      {lang === 'fr' ? 'Message Envoyé !' : 'تم إرسال الرسالة!'}
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-12">
                      {lang === 'fr' 
                        ? `Merci ${name}, votre message a été envoyé avec succès. Notre équipe vous répondra dans les plus brefs délais.`
                        : `نشكرك ${name}، تم إرسال رسالتك بنجاح. سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.`}
                    </p>
                    <Button 
                      onClick={handleReset}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-3xl px-12 py-8 text-xs uppercase tracking-[0.3em] shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 flex items-center gap-3 border-none cursor-pointer"
                    >
                      <RefreshCw size={16} />
                      {lang === 'fr' ? 'Envoyer un autre message' : 'إرسال رسالة أخرى'}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-5xl font-black text-white mb-16 uppercase italic tracking-tighter">{lang === 'fr' ? 'Envoyer un Message' : 'أرسل لنا رسالة'}</h2>
                    <form className="space-y-12" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                          <label className={`text-[10px] font-black text-sky-400 uppercase tracking-[0.4em] ${isRTL ? 'mr-4' : 'ml-4'}`}>{t.contact.form.name}</label>
                          <div className="relative">
                            <Input 
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                                if (touched.name) setTouched(prev => ({ ...prev, name: false }));
                              }}
                              onBlur={() => handleBlur('name')}
                              className={`bg-white/5 rounded-3xl h-16 transition-all text-white px-8 ${isRTL ? 'pl-14' : 'pr-14'} ${
                                touched.name 
                                  ? errors.name 
                                    ? "border-rose-500/40 bg-rose-500/5 focus:border-rose-500 focus:ring-rose-500/25" 
                                    : "border-emerald-500/40 bg-emerald-500/5 focus:border-emerald-500 focus:ring-emerald-500/25"
                                  : "border-white/10 focus:border-sky-400 focus:ring-sky-400/25"
                              }`} 
                            />
                            <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-6' : 'right-6'} pointer-events-none flex items-center`}>
                              {touched.name && errors.name && <AlertCircle className="text-rose-400" size={18} />}
                              {touched.name && !errors.name && <CheckCircle2 className="text-emerald-400" size={18} />}
                            </div>
                          </div>
                          <AnimatePresence>
                            {touched.name && errors.name && (
                              <motion.p
                                initial={{ opacity: 0, height: 0, y: -5 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className={`text-xs text-rose-400 font-medium ${isRTL ? 'mr-4' : 'ml-4'}`}
                              >
                                {errors.name}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="space-y-6">
                          <label className={`text-[10px] font-black text-sky-400 uppercase tracking-[0.4em] ${isRTL ? 'mr-4' : 'ml-4'}`}>{t.contact.form.email}</label>
                          <div className="relative">
                            <Input 
                              type="email" 
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (touched.email) setTouched(prev => ({ ...prev, email: false }));
                              }}
                              onBlur={() => handleBlur('email')}
                              className={`bg-white/5 rounded-3xl h-16 transition-all text-white px-8 ${isRTL ? 'pl-14' : 'pr-14'} ${
                                touched.email 
                                  ? errors.email 
                                    ? "border-rose-500/40 bg-rose-500/5 focus:border-rose-500 focus:ring-rose-500/25" 
                                    : "border-emerald-500/40 bg-emerald-500/5 focus:border-emerald-500 focus:ring-emerald-500/25"
                                  : "border-white/10 focus:border-sky-400 focus:ring-sky-400/25"
                              }`} 
                            />
                            <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-6' : 'right-6'} pointer-events-none flex items-center`}>
                              {touched.email && errors.email && <AlertCircle className="text-rose-400" size={18} />}
                              {touched.email && !errors.email && <CheckCircle2 className="text-emerald-400" size={18} />}
                            </div>
                          </div>
                          <AnimatePresence>
                            {touched.email && errors.email && (
                              <motion.p
                                initial={{ opacity: 0, height: 0, y: -5 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className={`text-xs text-rose-400 font-medium ${isRTL ? 'mr-4' : 'ml-4'}`}
                              >
                                {errors.email}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                          <label className={`text-[10px] font-black text-sky-400 uppercase tracking-[0.4em] ${isRTL ? 'mr-4' : 'ml-4'}`}>{lang === 'fr' ? 'Téléphone' : 'الهاتف'}</label>
                          <div className="relative">
                            <Input 
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value);
                                if (touched.phone) setTouched(prev => ({ ...prev, phone: false }));
                              }}
                              onBlur={() => handleBlur('phone')}
                              className={`bg-white/5 rounded-3xl h-16 transition-all text-white px-8 ${isRTL ? 'pl-14' : 'pr-14'} ${
                                touched.phone 
                                  ? errors.phone 
                                    ? "border-rose-500/40 bg-rose-500/5 focus:border-rose-500 focus:ring-rose-500/25" 
                                    : "border-emerald-500/40 bg-emerald-500/5 focus:border-emerald-500 focus:ring-emerald-500/25"
                                  : "border-white/10 focus:border-sky-400 focus:ring-sky-400/25"
                              }`} 
                            />
                            <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-6' : 'right-6'} pointer-events-none flex items-center`}>
                              {touched.phone && errors.phone && <AlertCircle className="text-rose-400" size={18} />}
                              {touched.phone && !errors.phone && <CheckCircle2 className="text-emerald-400" size={18} />}
                            </div>
                          </div>
                          <AnimatePresence>
                            {touched.phone && errors.phone && (
                              <motion.p
                                initial={{ opacity: 0, height: 0, y: -5 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className={`text-xs text-rose-400 font-medium ${isRTL ? 'mr-4' : 'ml-4'}`}
                              >
                                {errors.phone}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="space-y-6">
                          <label className={`text-[10px] font-black text-sky-400 uppercase tracking-[0.4em] ${isRTL ? 'mr-4' : 'ml-4'}`}>{t.contact.form.subject}</label>
                          <div className="relative">
                            <select 
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              className="w-full h-16 px-8 bg-white/5 border border-white/10 rounded-3xl focus:outline-none focus:border-sky-400 text-white text-sm appearance-none cursor-pointer"
                            >
                              <option className="bg-navy-deep" value="Land Surveying">Land Surveying</option>
                              <option className="bg-navy-deep" value="Civil Engineering">Civil Engineering</option>
                              <option className="bg-navy-deep" value="GIS Services">GIS Services</option>
                              <option className="bg-navy-deep" value="UAV Drone Survey">UAV Drone Survey</option>
                              {subject !== "Land Surveying" && subject !== "Civil Engineering" && subject !== "GIS Services" && subject !== "UAV Drone Survey" && (
                                <option className="bg-navy-deep" value={subject}>{subject}</option>
                              )}
                            </select>
                            <div className={`absolute ${isRTL ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 pointer-events-none text-gray-500`}>
                              <ChevronRight size={20} className="rotate-90" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <label className={`text-[10px] font-black text-sky-400 uppercase tracking-[0.4em] ${isRTL ? 'mr-4' : 'ml-4'}`}>{t.contact.form.message}</label>
                        <div className="relative">
                          <Textarea 
                            value={message}
                            onChange={(e) => {
                              setMessage(e.target.value);
                              if (touched.message) setTouched(prev => ({ ...prev, message: false }));
                            }}
                            onBlur={() => handleBlur('message')}
                            className={`bg-white/5 rounded-[3rem] min-h-[250px] transition-all text-white px-8 py-8 ${isRTL ? 'pl-14' : 'pr-14'} ${
                              touched.message 
                                ? errors.message 
                                  ? "border-rose-500/40 bg-rose-500/5 focus:border-rose-500 focus:ring-rose-500/25" 
                                  : "border-emerald-500/40 bg-emerald-500/5 focus:border-emerald-500 focus:ring-emerald-500/25"
                                : "border-white/10 focus:border-sky-400 focus:ring-sky-400/25"
                            }`} 
                          />
                          <div className={`absolute bottom-8 ${isRTL ? 'left-6' : 'right-6'} pointer-events-none flex items-center`}>
                            {touched.message && errors.message && <AlertCircle className="text-rose-400" size={18} />}
                            {touched.message && !errors.message && <CheckCircle2 className="text-emerald-400" size={18} />}
                          </div>
                        </div>
                        <AnimatePresence>
                          {touched.message && errors.message && (
                            <motion.p
                              initial={{ opacity: 0, height: 0, y: -5 }}
                              animate={{ opacity: 1, height: 'auto', y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -5 }}
                              transition={{ duration: 0.2 }}
                              className={`text-xs text-rose-400 font-medium ${isRTL ? 'mr-4' : 'ml-4'}`}
                            >
                              {errors.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/50 disabled:cursor-not-allowed text-white font-black rounded-3xl px-16 py-10 text-xs uppercase tracking-[0.4em] shadow-2xl shadow-sky-500/40 transition-all w-full md:w-auto hover:scale-105 border-none flex items-center justify-center gap-3 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            {lang === 'fr' ? 'Envoi...' : 'جاري الإرسال...'}
                            <Loader2 size={18} className="animate-spin" />
                          </>
                        ) : (
                          <>
                            {t.contact.form.send} 
                            <Send size={18} className={isRTL ? 'mr-4 rotate-180' : 'ml-4'} />
                          </>
                        )}
                      </Button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Map Section */}
      <ScrollReveal variant="scaleUp">
        <section className="h-[700px] relative overflow-hidden mx-6 rounded-[5rem] border border-white/5 bg-zinc-950">
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src="https://maps.google.com/maps?q=172%20Boulevard%20Youssef%20Ibn%20Tachfine,%20Nador,%20Morocco&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale opacity-75 transition-all duration-700 [filter:invert(0.9)_contrast(1.25)_brightness(0.75)] [.light_&]:[filter:none] [.light_&]:opacity-90"
            />
            {/* Ambient vignette overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/40 via-transparent to-black/40" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/40" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center lg:justify-start p-6 lg:p-16 pointer-events-none">
            <div className="glass-card p-12 md:p-16 rounded-[4rem] border-sky-500/20 text-center lg:text-left max-w-md relative z-10 pointer-events-auto shadow-2xl backdrop-blur-xl bg-black/45">
              <div className="w-20 h-20 bg-sky-500/10 rounded-3xl flex items-center justify-center text-sky-400 mx-auto lg:mx-0 mb-8 border border-sky-400/20">
                <MapPin size={40} />
              </div>
              <h4 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">{lang === 'fr' ? 'Visitez-nous' : 'تفضل بزيارتنا'}</h4>
              <p className="text-gray-300 text-lg font-light leading-relaxed mb-10">
                172 bd Youssef Ibn Tachfine, immb. Ennasr 3ème étg. Nador - Maroc
              </p>
              <a 
                href="https://maps.app.goo.gl/SVj9hG6LUi6kyBA77" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="rounded-2xl border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white w-full py-8 text-[10px] font-black uppercase tracking-widest transition-all duration-500 cursor-pointer">
                  {lang === 'fr' ? 'Itinéraire' : 'الحصول على الاتجاهات'}
                </Button>
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
