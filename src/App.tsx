import React, { useState, useEffect, lazy, Suspense } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  useLocation
} from 'react-router-dom';
import { motion, AnimatePresence } from "motion/react";
import ParticleBackground from './components/ParticleBackground';
import AiAssistant from './components/AiAssistant';
import Layout from './components/Layout';
import { useTheme } from './context/ThemeContext';

// Lazy Loaded Pages
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./components/Blog'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const SeismeMarrakech = lazy(() => import('./pages/SeismeMarrakech'));
const CartoStudio = lazy(() => import('./pages/CartoStudio'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh] w-full">
    <div className="relative flex flex-col items-center gap-4">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-sky-500/20 opacity-75"></span>
        <div className="w-6 h-6 rounded-full border-t-2 border-r-2 border-sky-400 animate-spin" />
      </div>
      <p className="text-[9px] font-black tracking-[0.4em] text-white/30 uppercase">
        Loading Section
      </p>
    </div>
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className={`min-h-screen transition-colors duration-500 ${
        theme === 'navy' 
          ? 'bg-[#020617] bg-[radial-gradient(circle_at_center,rgba(15,23,42,1)_0%,rgba(2,6,23,1)_100%)] text-white' 
          : 'bg-[#f8fafc] bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(241,245,249,1)_100%)] text-slate-900'
      }`}>
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              key="loader"
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`fixed inset-0 z-[200] flex items-center justify-center transition-colors duration-500 ${
                theme === 'navy' ? 'bg-[#020617]' : 'bg-[#f8fafc]'
              }`}
            >
              <div className="relative flex flex-col items-center gap-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <h1 className={`text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none transition-colors ${
                    theme === 'navy' ? 'text-white' : 'text-slate-900'
                  }`}>
                    ECART<span className="text-sky-400">TOP</span>
                  </h1>
                  <p className={`text-[8px] font-black tracking-[0.6em] mt-4 uppercase transition-colors ${
                    theme === 'navy' ? 'text-white/40' : 'text-slate-900/40'
                  }`}>
                    INITIALIZING SYSTEM
                  </p>
                </motion.div>
                <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 bg-sky-400 shadow-[0_0_10px_#38bdf8]"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        <ParticleBackground />
        
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:id" element={<ProjectDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/seisme-marrakech" element={<SeismeMarrakech />} />
              <Route path="/studio" element={<CartoStudio />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </Suspense>

        <AiAssistant />
      </div>
    </Router>
  );
};

export default App;
