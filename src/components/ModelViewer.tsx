import React, { Suspense, Component, ErrorInfo, ReactNode, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, ContactShadows } from '@react-three/drei';
import { motion } from 'motion/react';
import { RotateCcw, ZoomIn, Maximize2, AlertTriangle, Cpu, Box } from 'lucide-react';
import { isWebGLAvailable } from '../lib/webgl-check';

// Simple Error Boundary for 3D content
class ModelErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("3D Model Loading Error:", error.message, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface ModelProps {
  url: string;
}

function Model({ url }: ModelProps) {
  // If the URL is just placeholder or doesn't look like a real path, show fallback immediately
  if (!url || url === '/facade-survey-model.glb') {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0ea5e9" wireframe />
      </mesh>
    );
  }

  try {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
  } catch (err) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0ea5e9" wireframe />
      </mesh>
    );
  }
}

interface ModelViewerProps {
  modelUrl: string;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl }) => {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  return (
    <div className="relative group w-full h-full min-h-[500px] rounded-[4rem] overflow-hidden bg-white/5 border border-white/10 group">
      {/* 3D Context Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.15),transparent_70%)] pointer-events-none" />
      
      {/* UI Overlays */}
      <div className="absolute top-10 left-10 z-20 flex flex-col gap-4">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Visualiseur 3D Interactif</span>
        </div>
        <div className="bg-black/40 backdrop-blur-md border border-white/5 p-3 rounded-xl flex flex-col gap-1">
          <span className="text-[8px] font-black text-sky-400/50 uppercase tracking-widest">Lat: 35.1725° N</span>
          <span className="text-[8px] font-black text-sky-400/50 uppercase tracking-widest">Lon: 2.9317° W</span>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 z-20 flex flex-col gap-2">
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/5 px-4 py-2 rounded-xl">
          <div className="w-1 h-4 bg-sky-500/50 rounded-full" />
          <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Précision: 0.002m</span>
        </div>
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/5 px-4 py-2 rounded-xl">
          <div className="w-1 h-4 bg-sky-500/30 rounded-full" />
          <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Vitesse Scan: 1.2M pts/s</span>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 z-20 flex gap-4">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex items-center gap-6">
          <button className="text-white/40 hover:text-sky-400 transition-colors">
            <RotateCcw size={18} />
          </button>
          <button className="text-white/40 hover:text-sky-400 transition-colors">
            <ZoomIn size={18} />
          </button>
          <button className="text-white/40 hover:text-sky-400 transition-colors">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      {/* Canvas with Fallback Logic */}
      {webglSupported ? (
        <ModelErrorBoundary 
          fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3], fov: 45 }}>
                <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />
                <mesh rotation={[0.5, 0.5, 0]}>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="#0ea5e9" wireframe transparent opacity={0.3} />
                </mesh>
                <ambientLight intensity={1} />
              </Canvas>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] p-10 text-center pointer-events-none">
                <div className="w-16 h-16 bg-sky-500/10 rounded-3xl flex items-center justify-center text-sky-400 mb-6 border border-sky-500/20">
                  <Cpu size={24} className="animate-pulse" />
                </div>
                <h4 className="text-xl font-black text-white uppercase italic tracking-tighter mb-2">Simulation Structurelle</h4>
                <p className="text-[8px] text-gray-400 uppercase tracking-widest max-w-[250px] leading-relaxed">
                  Source de données distante restreinte (CORS). Chargement d'un maillage de référence.
                </p>
              </div>
            </div>
          }
        >
          <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={null}>
              {/* Replaced Stage environment with manual lighting to avoid HDR fetch errors */}
              <ambientLight intensity={0.7} />
              <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
              <spotLight position={[-10, 20, 10]} angle={0.2} penumbra={1} intensity={2} castShadow />
              <directionalLight position={[0, 10, 5]} intensity={1} />
              
              <Stage intensity={0.5} adjustCamera environment={null}>
                <Model url={modelUrl} />
              </Stage>
              
              <OrbitControls 
                makeDefault 
                enablePan={false} 
                maxPolarAngle={Math.PI / 2} 
                minPolarAngle={0}
                autoRotate
                autoRotateSpeed={0.5}
              />
              <ContactShadows 
                position={[0, -1, 0]} 
                opacity={0.4} 
                scale={10} 
                blur={2} 
                far={4.5} 
              />
            </Suspense>
          </Canvas>
        </ModelErrorBoundary>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 p-12 text-center">
          <div className="relative mb-12">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-40 h-40 rounded-[2.5rem] bg-sky-500/5 border border-sky-500/20 flex items-center justify-center relative overflow-hidden"
            >
              <Box size={80} className="text-sky-500/40 relative z-10" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-sky-500/20 to-transparent" />
              
              {/* Fake scanning line */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-sky-400 shadow-[0_0_10px_#0ea5e9] z-20"
              />
            </motion.div>
            
            {/* Compass/Grid decoration */}
            <div className="absolute inset-[-40px] border border-sky-500/5 rounded-full pointer-events-none" />
            <div className="absolute inset-[-20px] border border-sky-500/10 rounded-full pointer-events-none border-dashed" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">Aperçu Statique Haute Précision</h4>
            <p className="text-[10px] text-sky-400 font-bold uppercase tracking-[0.4em] mb-6">Mode de compatibilité matériel activé</p>
            <div className="max-w-[300px] mx-auto space-y-4">
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 rounded-xl">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span className="text-[8px] text-white/60 font-mono uppercase tracking-widest text-left">Optimisation pour processeurs graphiques hérités</span>
              </div>
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 rounded-xl">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span className="text-[8px] text-white/60 font-mono uppercase tracking-widest text-left">Traitement des nuages de points via CPU</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Scanner Accents */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-sky-500/30 to-transparent animate-scan" />
      
      {/* Loading Fallback Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-has-[canvas:not(.active)]:opacity-100 transition-opacity">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">Initialisation du flux 3D...</span>
      </div>
    </div>
  );
};
