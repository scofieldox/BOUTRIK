import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable } from '../lib/webgl-check';

const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglSupported(false);
      return;
    }

    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 45;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      console.error("WebGL not supported", e instanceof Error ? e.message : String(e));
      return;
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // MNT Terrain Point Cloud
    const tGeo = new THREE.PlaneGeometry(200, 200, 150, 150);
    const v = tGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < v.length; i += 3) {
      // Create a wave terrain similar to Marchica coastline
      v[i + 2] = Math.sin(v[i] * 0.05) * Math.cos(v[i + 1] * 0.05) * 8;
    }
    tGeo.computeVertexNormals();
    const tMat = new THREE.PointsMaterial({ size: 0.12, color: 0xA5F3FC, transparent: true, opacity: 0.25 });
    const terrain = new THREE.Points(tGeo, tMat);
    terrain.rotation.x = -Math.PI / 2.3;
    terrain.position.y = -15;
    scene.add(terrain);

    // Data Snow (Enhanced Fall)
    const sCount = 5000;
    const sGeo = new THREE.BufferGeometry();
    const sPos = new Float32Array(sCount * 3);
    const sVel = new Float32Array(sCount);
    const sDrift = new Float32Array(sCount);
    
    for (let i = 0; i < sCount; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 150;
      sPos[i * 3 + 1] = Math.random() * 100 - 50;
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 150;
      sVel[i] = 0.05 + Math.random() * 0.15;
      sDrift[i] = (Math.random() - 0.5) * 0.02;
    }
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    const snowflakes = new THREE.Points(sGeo, new THREE.PointsMaterial({ 
      size: 0.15, 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    }));
    scene.add(snowflakes);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    let isMounted = true;
    let time = 0;
    const animate = () => {
      if (!isMounted) return;
      requestAnimationFrame(animate);
      time += 0.01;
      
      terrain.rotation.z += 0.0003;
      
      const p = snowflakes.geometry.attributes.position;
      for (let i = 0; i < sCount; i++) {
        let x = p.getX(i);
        let y = p.getY(i);
        let z = p.getZ(i);
        
        y -= sVel[i];
        x += Math.sin(time + i) * 0.01 + sDrift[i];
        
        if (y < -50) {
          y = 50;
          x = (Math.random() - 0.5) * 150;
          z = (Math.random() - 0.5) * 150;
        }
        
        p.setXY(i, x, y);
      }
      p.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      
      if (renderer) {
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      
      tGeo.dispose();
      tMat.dispose();
      sGeo.dispose();
      scene.clear();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 z-[5] pointer-events-none bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] opacity-60">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      id="canvas-container"
      className="fixed inset-0 z-[5] pointer-events-none opacity-80"
    />
  );
};

export default ParticleBackground;
