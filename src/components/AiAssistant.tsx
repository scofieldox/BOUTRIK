import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Globe, X, Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function AiAssistant() {
  const { t, lang, isRTL } = useLanguage();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai', text: string }>>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  }, [chatMessages, isAiLoading]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput("");
    setIsAiLoading(true);

    try {
      const systemPrompt = lang === 'fr' 
        ? "Vous êtes l'assistant intelligent d'ECARTTOP et le Private Neural Architect du projet. Vous disposez de connaissances détaillées sur le projet phare : 'Modélisation procédurale 3D du village d'Armila (province de Driouch) dans un environnement SIG à l'aide d'ArcGIS et CityEngine'. Ce projet utilise la technologie CGA pour automatiser la reconstruction 3D réaliste de structures, routes, et végétations de Douar Armila à partir de relevés SIG de précision. Répondez de manière professionnelle et technique (Topographie, SIG, Scan 3D, CityEngine)."
        : "أنت المساعد الذكي لشركة ECARTTOP والمهندس العصبي الخاص. لديك معلومات مفصلة عن المشروع الرائد: 'النمذجة الإجرائية ثلاثية الأبعاد لقرية أرميلة (إقليم الدريوش) في بيئة نظم المعلومات الجغرافية (SIG) باستخدام ArcGIS و CityEngine'. يعتمد المشروع على قواعد CGA البرمجية للتوليد التلقائي والواقعي للمباني، الطرق، والمساحات الخضراء بدقة عالية. أجب بطريقة احترافية وتقنية (طبوغرافيا، نظم معلومات جغرافية، CityEngine).";

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: systemPrompt
        }
      });

      const aiResponse = response.text || (lang === 'fr' ? "Désolé, je ne peux pas répondre pour le moment." : "عذراً، لا يمكنني الرد حالياً.");
      setChatMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error("Gemini Error:", error instanceof Error ? error.message : String(error));
      setChatMessages(prev => [...prev, { role: 'ai', text: lang === 'fr' ? "Une erreur est survenue lors de la communication avec l'IA." : "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي." }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <>
      {/* AI ASSISTANT BUBBLE */}
      <div 
        className="fixed bottom-[30px] right-[30px] z-[100] w-[65px] h-[65px] bg-gradient-to-br from-sky-400 to-blue-700 rounded-full flex items-center justify-center cursor-pointer shadow-[0_10px_40px_rgba(52,170,220,0.5)] animate-pulse"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <User className="text-white" size={28} />
      </div>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-[110px] right-[30px] w-[320px] h-[450px] z-[101] flex flex-col rounded-[2rem] overflow-hidden glass-panel shadow-2xl border-sky-500/30 ${isRTL ? 'text-right' : 'text-left'}`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="bg-sky-500 p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Globe className="text-white" size={16} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">{t.ai.title}</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white/50 hover:text-white">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 p-6 space-y-4 overflow-y-auto text-[11px] scroll-smooth" ref={chatEndRef}>
              <div className={`bg-white/5 p-4 rounded-2xl border border-white/5 text-gray-300 ${isRTL ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                {t.ai.welcome}
              </div>
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl border border-white/5 ${
                    msg.role === 'user' 
                      ? 'bg-sky-500/20 text-white self-end rounded-tr-none ml-8' 
                      : 'bg-white/5 text-gray-300 self-start rounded-tl-none mr-8'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isAiLoading && (
                <div className={`bg-white/5 p-4 rounded-2xl border border-white/5 text-gray-300 animate-pulse ${isRTL ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                  ...
                </div>
              )}
            </div>
            <div className="p-4 bg-black/20 border-t border-white/10 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.ai.placeholder} 
                className="flex-1 bg-white/5 rounded-full px-4 py-2 text-[11px] outline-none text-white border border-white/10 focus:border-sky-400 transition" 
              />
              <button 
                onClick={handleSendMessage}
                disabled={isAiLoading}
                className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-400 transition disabled:opacity-50"
              >
                <Send size={16} className={isRTL ? 'rotate-180' : ''} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
