import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  MapPin, 
  Compass, 
  Cpu, 
  Satellite, 
  Radio, 
  Activity, 
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  ExternalLink
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "@/components/ui/button";

interface LocationPin {
  id: string;
  nameFr: string;
  nameAr: string;
  lat: number;
  lng: number;
  typeFr: string;
  typeAr: string;
  descFr: string;
  descAr: string;
  status: "PRIMARY_HUB" | "ACTIVE_PROJECT" | "PARTNER_NODE";
  details: {
    elevation: string;
    precision: string;
    tech: string;
  };
}

export default function GlobalReachGlobe() {
  const { lang, isRTL } = useLanguage();
  
  // List of geo-locations (HQ, projects, international collaborators)
  const locations: LocationPin[] = useMemo(() => [
    {
      id: "casablanca",
      nameFr: "Casablanca (HQ)",
      nameAr: "الدار البيضاء (المقر)",
      lat: 33.5731,
      lng: -7.5898,
      typeFr: "Siège Opérationnel & Hub SIG",
      typeAr: "المقر العملياتي ومركز نظم المعلومات الجغرافية",
      descFr: "Centre principal de coordination géodésique, traitement de données LiDAR mobiles et hébergement des plateformes WebGIS.",
      descAr: "المركز الرئيسي للتنسيق الجيوديسي، معالجة بيانات ليدار المحمولة واستضافة منصات الويب الجغرافية.",
      status: "PRIMARY_HUB",
      details: {
        elevation: "24m",
        precision: "±0.1mm (RTK Network)",
        tech: "GNSS Cors, WebGIS Server, PostGIS"
      }
    },
    {
      id: "nador",
      nameFr: "Nador West Med",
      nameAr: "الناظور غرب المتوسط",
      lat: 35.1681,
      lng: -2.9335,
      typeFr: "Supervision Topographique Portuaire",
      typeAr: "الإشراف الطبوغرافي على الميناء",
      descFr: "Suivi bathymétrique et modélisation 3D haute précision du bassin portuaire et des infrastructures d'accès de Nador West Med.",
      descAr: "المتابعة الأعماقية والنمذجة ثلاثية الأبعاد عالية الدقة للحوض المينائي والبنى التحتية التابعة لميناء الناظور غرب المتوسط.",
      status: "ACTIVE_PROJECT",
      details: {
        elevation: "2m",
        precision: "±1.5mm (LiDAR Static)",
        tech: "Bathymetry Sonar, Terrestrial Laser Scanner"
      }
    },
    {
      id: "oujda",
      nameFr: "Oujda Regional",
      nameAr: "وجدة الإقليمي",
      lat: 34.6853,
      lng: -1.9076,
      typeFr: "Aménagement & Réseaux SIG",
      typeAr: "التخطيط وشبكات المعلومات الجغرافية",
      descFr: "Digitalisation intégrale des réseaux de distribution et création du Système d'Information Géographique (SIG) régional.",
      descAr: "الرقمنة الكاملة لشبكات التوزيع وإنشاء نظام المعلومات الجغرافي الإقليمي لمنطقة الشرق.",
      status: "ACTIVE_PROJECT",
      details: {
        elevation: "450m",
        precision: "±10mm (UAV Orthophoto)",
        tech: "Drone VTOL, ArcGIS Enterprise"
      }
    },
    {
      id: "tangier",
      nameFr: "Port de Tanger Med",
      nameAr: "ميناء طنجة المتوسط",
      lat: 35.7595,
      lng: -5.8340,
      typeFr: "Auscultation d'Ouvrages",
      typeAr: "رصد ومراقبة المنشآت الفنية",
      descFr: "Surveillance millimétrique de la stabilité des digues et infrastructures portuaires par capteurs GNSS haute fréquence.",
      descAr: "المراقبة المليمترية لاستقرار السدود والبنية التحتية المينائية بواسطة أجهزة استشعار جيوديسية عالية التردد.",
      status: "ACTIVE_PROJECT",
      details: {
        elevation: "5m",
        precision: "±0.5mm (Continuous Monitoring)",
        tech: "Holographic Sensors, GNSS Static Tracker"
      }
    },
    {
      id: "paris",
      nameFr: "Paris Geodetic Lab",
      nameAr: "مختبر باريس الجيوديسي",
      lat: 48.8566,
      lng: 2.3522,
      typeFr: "Liaison Technologique & R&D",
      typeAr: "الربط التكنولوجي والبحث والتطوير",
      descFr: "Collaboration avec les instituts européens pour le calibrage de capteurs LiDAR et d'instruments optiques de haute précision.",
      descAr: "التعاون مع المعاهد الأوروبية لمعايرة مستشعرات ليدار والأجهزة البصرية عالية الدقة.",
      status: "PARTNER_NODE",
      details: {
        elevation: "35m",
        precision: "Calibration Standard",
        tech: "Laser Interferometry, Optical Bench"
      }
    },
    {
      id: "munich",
      nameFr: "Munich LiDAR Labs",
      nameAr: "مختبرات ليدار ميونخ",
      lat: 48.1351,
      lng: 11.5820,
      typeFr: "Traitement de Données Cloud",
      typeAr: "معالجة بيانات السحابة",
      descFr: "Calcul haute performance pour la classification automatique de nuages de points par intelligence artificielle géospatiale.",
      descAr: "الحوسبة عالية الأداء للتصنيف التلقائي لسحب النقاط ثلاثية الأبعاد باستخدام الذكاء الاصطناعي الجيومكاني.",
      status: "PARTNER_NODE",
      details: {
        elevation: "519m",
        precision: "Sub-centimetric classification",
        tech: "Deep Learning Cloud Engine, Vector Servers"
      }
    },
    {
      id: "newyork",
      nameFr: "New York Space-GIS",
      nameAr: "نيويورك لعلوم الفضاء والخرائط",
      lat: 40.7128,
      lng: -74.0060,
      typeFr: "Imagerie Satellite HD",
      typeAr: "صور الأقمار الصناعية عالية الدقة",
      descFr: "Acquisition directe et traitement d'imagerie radar et multispectrale pour l'aménagement urbain et l'analyse environnementale.",
      descAr: "الاستلام المباشر ومعالجة صور الرادار والصور متعددة الأطياف للتخطيط الحضري والتحليل البيئي.",
      status: "PARTNER_NODE",
      details: {
        elevation: "10m",
        precision: "30cm GSD Resolution",
        tech: "SAR Radar, Multispectral Imagery"
      }
    },
    {
      id: "tokyo",
      nameFr: "Tokyo Precision Systems",
      nameAr: "أنظمة الدقة طوكيو",
      lat: 35.6762,
      lng: 139.6503,
      typeFr: "Recherche Instrumentale",
      typeAr: "أبحاث الأجهزة الجيوديسية",
      descFr: "Co-développement de capteurs optiques et de stations totales robotisées de dernière génération adaptées au climat marocain.",
      descAr: "المشاركة في تطوير المستشعرات البصرية والمحطات الشاملة الروبوتية من الجيل الأحدث المتوافقة مع المناخ المغربي.",
      status: "PARTNER_NODE",
      details: {
        elevation: "40m",
        precision: "0.5\" Angular Accuracy",
        tech: "Robotic Total Stations, Inertial Units"
      }
    }
  ], []);

  // Selected station
  const [selectedId, setSelectedId] = useState<string>("casablanca");
  const selectedLocation = useMemo(() => 
    locations.find(loc => loc.id === selectedId) || locations[0],
    [selectedId, locations]
  );

  // Canvas & Physics references
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Rotation angles (radians)
  const rotationRef = useRef({ lambda: 0.1, phi: 0.5 }); // current
  const targetRotationRef = useRef({ lambda: 0.1, phi: 0.5 }); // target
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);
  const animationFrameRef = useRef<number | null>(null);

  // Fly-to animation triggers when selecting a location
  const centerOnLocation = (lat: number, lng: number) => {
    // Convert lat/lng to target projection angles (negate lng because globe rotates opposite)
    const targetLambda = -lng * (Math.PI / 180);
    const targetPhi = lat * (Math.PI / 180);
    
    targetRotationRef.current = { lambda: targetLambda, phi: targetPhi };
    autoRotateRef.current = false;

    // Reset auto-rotate after 12 seconds of inactivity
    setTimeout(() => {
      if (
        Math.abs(rotationRef.current.lambda - targetLambda) < 0.05 && 
        !isDraggingRef.current
      ) {
        autoRotateRef.current = true;
      }
    }, 12000);
  };

  // Trigger fly-to on mounting or changing selection
  useEffect(() => {
    centerOnLocation(selectedLocation.lat, selectedLocation.lng);
  }, [selectedLocation]);

  // Dot Matrix landmass definition
  const landPoints = useMemo(() => {
    const points: { lat: number; lng: number }[] = [];
    const landmasses = [
      { lat: 50, lng: 30, radLat: 35, radLng: 65 },    // Eurasia
      { lat: 48, lng: 5, radLat: 15, radLng: 20 },     // Europe
      { lat: 22, lng: 18, radLat: 18, radLng: 25 },    // North Africa
      { lat: -12, lng: 22, radLat: 22, radLng: 18 },   // Sub-Saharan Africa
      { lat: 45, lng: -95, radLat: 28, radLng: 45 },   // North America
      { lat: -15, lng: -55, radLat: 28, radLng: 22 },  // South America
      { lat: -25, lng: 135, radLat: 16, radLng: 20 },  // Australia
      { lat: 72, lng: -40, radLat: 10, radLng: 15 },   // Greenland
      { lat: 25, lng: 55, radLat: 12, radLng: 18 }     // Middle East
    ];

    // Generate points uniformly on sphere
    const step = 4.5; // step size in degrees for density
    for (let lat = -80; lat <= 80; lat += step) {
      // Scale step in longitude to maintain constant area spacing near poles
      const r = Math.cos(lat * (Math.PI / 180));
      const lngStep = step / (r > 0.1 ? r : 0.1);
      
      for (let lng = -180; lng <= 180; lng += lngStep) {
        // Check if point lands inside any approximated landmass
        const isLand = landmasses.some(lm => {
          // Compute angular distance or simplified elliptical bounding box
          let dLng = lng - lm.lng;
          if (dLng > 180) dLng -= 360;
          if (dLng < -180) dLng += 360;
          
          const dLatNorm = (lat - lm.lat) / lm.radLat;
          const dLngNorm = dLng / lm.radLng;
          
          return (dLatNorm * dLatNorm + dLngNorm * dLngNorm) <= 1.0;
        });

        if (isLand) {
          points.push({ lat, lng });
        }
      }
    }
    return points;
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    let radius = Math.min(width, height) * 0.42;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        canvas.width = w * window.devicePixelRatio;
        canvas.height = h * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        width = w;
        height = h;
        radius = Math.min(w, h) * 0.41;
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    let pulseFrame = 0;

    const render = () => {
      pulseFrame += 1;
      ctx.clearRect(0, 0, width, height);

      // Centered coordinate references
      const cx = width / 2;
      const cy = height / 2;

      // Handle rotational physics / interpolation
      if (autoRotateRef.current && !isDraggingRef.current) {
        // Slow constant drift
        targetRotationRef.current.lambda += 0.0012;
      }

      // Smooth interpolation (Lerp)
      const lerpSpeed = 0.06;
      rotationRef.current.lambda += (targetRotationRef.current.lambda - rotationRef.current.lambda) * lerpSpeed;
      rotationRef.current.phi += (targetRotationRef.current.phi - rotationRef.current.phi) * lerpSpeed;

      const lambda0 = rotationRef.current.lambda;
      const phi0 = rotationRef.current.phi;

      // 1. Draw Space Stars & Space Atmosphere (Ambient Backdrop)
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(10, 25, 45, 0.2)";
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric Ring
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.95, cx, cy, radius * 1.1);
      glowGrad.addColorStop(0, "rgba(14, 165, 233, 0.15)");
      glowGrad.addColorStop(0.5, "rgba(14, 165, 233, 0.05)");
      glowGrad.addColorStop(1, "rgba(14, 165, 233, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.12, 0, Math.PI * 2);
      ctx.fill();

      // Core sphere shadow base (gives deep 3D shading)
      const sphereGrad = ctx.createRadialGradient(cx - radius * 0.2, cy - radius * 0.2, radius * 0.1, cx, cy, radius);
      sphereGrad.addColorStop(0, "#081528");
      sphereGrad.addColorStop(0.7, "#020712");
      sphereGrad.addColorStop(1, "#000003");
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Orthographic Projection math helper
      const project = (lat: number, lng: number) => {
        const theta = lat * (Math.PI / 180);
        const lambda = lng * (Math.PI / 180);
        
        const deltaLambda = lambda - lambda0;
        
        // Projected coordinates
        const x = radius * Math.cos(theta) * Math.sin(deltaLambda);
        const y = -radius * (Math.cos(phi0) * Math.sin(theta) - Math.sin(phi0) * Math.cos(theta) * Math.cos(deltaLambda));
        
        // Visibility check (is it on the front hemisphere?)
        const cosC = Math.sin(phi0) * Math.sin(theta) + Math.cos(phi0) * Math.cos(theta) * Math.cos(deltaLambda);
        const visible = cosC >= 0;

        return { x: cx + x, y: cy + y, visible, zDepth: cosC };
      };

      // 2. Draw Back-facing Grid parallels & meridians
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(14, 165, 233, 0.04)";
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        for (let lng = -180; lng <= 180; lng += 10) {
          const pt = project(lat, lng);
          if (!pt.visible) {
            if (lng === -180) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
      }
      for (let lng = -180; lng < 180; lng += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 10) {
          const pt = project(lat, lng);
          if (!pt.visible) {
            if (lat === -90) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
      }

      // 3. Draw Back-facing Landmass Dot Matrix
      ctx.fillStyle = "rgba(14, 165, 233, 0.06)";
      landPoints.forEach(pt => {
        const projection = project(pt.lat, pt.lng);
        if (!projection.visible) {
          // Dimmed mini dots behind
          ctx.fillRect(projection.x - 0.5, projection.y - 0.5, 1, 1);
        }
      });

      // 4. Draw Front-facing Grid (Meridians & Parallels)
      ctx.strokeStyle = "rgba(14, 165, 233, 0.12)";
      ctx.lineWidth = 0.6;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let drawing = false;
        for (let lng = -180; lng <= 180; lng += 5) {
          const pt = project(lat, lng);
          if (pt.visible) {
            if (!drawing) {
              ctx.moveTo(pt.x, pt.y);
              drawing = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            drawing = false;
          }
        }
        ctx.stroke();
      }
      for (let lng = -180; lng < 180; lng += 30) {
        ctx.beginPath();
        let drawing = false;
        for (let lat = -90; lat <= 90; lat += 5) {
          const pt = project(lat, lng);
          if (pt.visible) {
            if (!drawing) {
              ctx.moveTo(pt.x, pt.y);
              drawing = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            drawing = false;
          }
        }
        ctx.stroke();
      }

      // Sphere Edge Rim Highlight (Neon blue outline)
      ctx.strokeStyle = "rgba(14, 165, 233, 0.25)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // 5. Draw Front-facing Landmass Dot Matrix
      landPoints.forEach(pt => {
        const projection = project(pt.lat, pt.lng);
        if (projection.visible) {
          // Scale size and alpha based on z-depth for 3D realism
          const size = 1.5 + projection.zDepth * 1.2;
          const alpha = 0.15 + projection.zDepth * 0.45;
          ctx.fillStyle = `rgba(14, 165, 233, ${alpha})`;
          ctx.beginPath();
          ctx.arc(projection.x, projection.y, size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 6. Draw Geodetic Network Connections (Sleek light-beam arcs from Casablanca to global points)
      const hq = locations[0]; // Casablanca is index 0
      const hqProj = project(hq.lat, hq.lng);

      locations.forEach(loc => {
        if (loc.id === hq.id) return;
        const targetProj = project(loc.lat, loc.lng);

        // Render connection arc if either the HQ or target is somewhat on the front hemisphere
        if (hqProj.visible || targetProj.visible) {
          // Compute mid-point and raise it up in screen space to create 3D bending effect
          const midX = (hqProj.x + targetProj.x) / 2;
          const midY = (hqProj.y + targetProj.y) / 2;
          
          // Compute distance and offset perpendicular to the line
          const dx = targetProj.x - hqProj.x;
          const dy = targetProj.y - hqProj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Raise control point vertically and offset based on 3D depth
          const depthFactor = (hqProj.zDepth + targetProj.zDepth) / 2;
          const offsetSize = dist * 0.22 * Math.max(0.2, depthFactor);
          const ctrlX = midX - (dy / dist) * offsetSize;
          const ctrlY = midY + (dx / dist) * offsetSize - offsetSize * 0.1;

          // Connection arc path
          ctx.lineWidth = 0.8;
          ctx.strokeStyle = `rgba(14, 165, 233, ${0.08 * depthFactor})`;
          ctx.beginPath();
          ctx.moveTo(hqProj.x, hqProj.y);
          ctx.quadraticCurveTo(ctrlX, ctrlY, targetProj.x, targetProj.y);
          ctx.stroke();

          // Pulsing signal sliding along the arc
          if (depthFactor > 0.15) {
            const t = (pulseFrame % 140) / 140; // sliding factor
            // Quadratic Bezier interpolation formula: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
            const beamX = Math.pow(1 - t, 2) * hqProj.x + 2 * (1 - t) * t * ctrlX + Math.pow(t, 2) * targetProj.x;
            const beamY = Math.pow(1 - t, 2) * hqProj.y + 2 * (1 - t) * t * ctrlY + Math.pow(t, 2) * targetProj.y;

            ctx.fillStyle = `rgba(56, 189, 248, ${0.8 * depthFactor})`;
            ctx.shadowBlur = 4;
            ctx.shadowColor = "#38bdf8";
            ctx.beginPath();
            ctx.arc(beamX, beamY, 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }
      });

      // 7. Draw Location Pins on Globe Surface
      locations.forEach(loc => {
        const pt = project(loc.lat, loc.lng);
        const isSelected = loc.id === selectedId;

        if (pt.visible) {
          const depth = pt.zDepth;
          
          // Draw pulsing outer rings for active selection
          if (isSelected) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = "#0ea5e9";
            
            // Multiple glowing radar rings
            const maxRings = 2;
            for (let i = 0; i < maxRings; i++) {
              const ringPulse = ((pulseFrame + i * 25) % 50) / 50;
              const ringRadius = 5 + ringPulse * 16;
              const ringAlpha = (1 - ringPulse) * 0.7;

              ctx.strokeStyle = `rgba(14, 165, 233, ${ringAlpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, ringRadius, 0, Math.PI * 2);
              ctx.stroke();
            }
          }

          // Node core dot
          let dotColor = "rgba(56, 189, 248, "; // Default cyan
          if (loc.status === "PRIMARY_HUB") dotColor = "rgba(255, 255, 255, "; // white for HQ
          if (loc.status === "ACTIVE_PROJECT") dotColor = "rgba(14, 165, 233, "; // Blue

          ctx.fillStyle = dotColor + (isSelected ? "1.0)" : `${0.3 + depth * 0.7})`);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isSelected ? 4.5 : 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowBlur = 0; // reset shadow

          // Subtle label on hover/select or for HQ
          if (isSelected || loc.status === "PRIMARY_HUB") {
            ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
            ctx.font = "bold 8px monospace";
            ctx.textAlign = "center";
            const textYOffset = isSelected ? -10 : 8;
            ctx.fillText(
              lang === "fr" ? loc.nameFr : loc.nameAr,
              pt.x,
              pt.y + textYOffset
            );
          }
        } else {
          // Dimmed ghost dot on backside
          ctx.fillStyle = "rgba(14, 165, 233, 0.15)";
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Request next frame
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      resizeObserver.disconnect();
    };
  }, [landPoints, selectedId, locations, lang]);

  // Drag interaction handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    autoRotateRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    // Convert mouse pixels to projection rotation offset
    const scaleFactor = 0.005;
    targetRotationRef.current.lambda += dx * scaleFactor;
    targetRotationRef.current.phi = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, targetRotationRef.current.phi - dy * scaleFactor));

    // Update drag start
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      autoRotateRef.current = false;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;

    const scaleFactor = 0.008;
    targetRotationRef.current.lambda += dx * scaleFactor;
    targetRotationRef.current.phi = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, targetRotationRef.current.phi - dy * scaleFactor));

    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="glass-card p-8 md:p-14 rounded-[4rem] border-white/5 bg-zinc-950/20 backdrop-blur-3xl relative overflow-hidden">
      
      {/* Visual background atmospheric effects */}
      <div className="absolute top-0 left-1/3 w-[35rem] h-[35rem] bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[25rem] h-[25rem] bg-sky-400/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Header Info Banner */}
      <div className={`flex flex-col xl:flex-row xl:items-end justify-between gap-10 mb-12 border-b border-white/5 pb-10 ${
        isRTL ? "xl:flex-row-reverse text-right" : "text-left"
      }`}>
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 bg-sky-500/10 border border-sky-400/20 px-4 py-2 rounded-full">
            <Globe className="text-sky-400 animate-pulse" size={12} />
            <span className="text-[9px] font-mono font-black uppercase tracking-[0.25em] text-sky-400">
              {lang === "fr" ? "PRÉSENCE GLOBALE & GÉODÉSIE" : "التواجد العالمي والشبكة الجيوديسية"}
            </span>
          </div>

          <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
            {lang === "fr" ? "RAYONNEMENT ET SIG" : "التغطية الجيومكانية"} <br />
            <span className="text-sky-400 not-italic font-light">
              {lang === "fr" ? "TERRITORIAL" : "والتوسع التكنولوجي"}
            </span>
          </h3>

          <p className="text-sm text-gray-400 font-light max-w-2xl leading-relaxed">
            {lang === "fr" 
              ? "ECARTTOP combine un ancrage solide au Maroc avec des collaborations géospatiales internationales de pointe. Découvrez nos stations GNSS permanentes, chantiers d'envergure et laboratoires partenaires."
              : "تجمع إيكار توب بين الحضور الترابي القوي في المغرب والتعاون التكنولوجي الدولي المتطور. تصفّح شبكتنا الجيوديسية ومشاريعنا الكبرى ومختبرات شركائنا حول العالم."}
          </p>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/5 px-6 py-4 rounded-3xl font-mono self-start">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <div className="text-left text-[10px]">
            <span className="text-white font-black block">GNSS CONSTELLATIONS</span>
            <span className="text-emerald-400 text-[8px] uppercase tracking-wider font-bold">GPS + GLONASS + GALILEO ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Split Interactive Layout */}
      <div className={`flex flex-col lg:flex-row gap-12 items-center ${isRTL ? "lg:flex-row-reverse" : ""}`}>
        
        {/* LEFT COLUMN: 3D GLOBE CANVAS AND INSTRUCTIONS */}
        <div className="w-full lg:w-1/2 flex flex-col items-center relative group">
          
          {/* Scientific Telemetry Frame around Globe */}
          <div 
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full aspect-square max-w-[460px] relative rounded-full cursor-grab active:cursor-grabbing select-none"
          >
            {/* Real HTML5 Projected Canvas */}
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Compass HUD Overlay */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-2.5 rounded-2xl flex items-center gap-3">
              <Compass className="text-sky-400 animate-spin" style={{ animationDuration: "25s" }} size={16} />
              <div className="text-left font-mono text-[8px]">
                <span className="text-gray-400 block uppercase">ORTHO GRID</span>
                <span className="text-white font-black block">PROJ_WGS84</span>
              </div>
            </div>

            {/* Rotation Controller HUD Overlay */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-[7px] font-mono text-gray-400 uppercase tracking-widest">
                {lang === "fr" ? "GLISSER POUR ORIENTER" : "اسحب للتدوير التفاعلي"}
              </span>
            </div>
          </div>

          {/* Quick instructions */}
          <p className="text-[10px] font-mono text-gray-500 mt-4 uppercase tracking-widest text-center">
            {lang === "fr" 
              ? "Utilisez la souris pour faire pivoter le globe en 3D libre" 
              : "اضغط واسحب لتغيير زاوية المشاهدة على الكرة الأرضية"}
          </p>

          {/* List of stations quick bubbles */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-8 max-w-md">
            {locations.map((loc) => {
              const isActive = loc.id === selectedId;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedId(loc.id)}
                  className={`px-3 py-1.5 rounded-xl text-[9px] font-mono font-black uppercase tracking-wider border transition-all ${
                    isActive 
                      ? "bg-sky-500 text-white border-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.35)]"
                      : "bg-white/5 text-gray-400 border-white/5 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {lang === "fr" ? loc.nameFr.replace(" (HQ)", "").replace(" Geodetic Lab", "") : loc.nameAr.replace(" (المقر)", "")}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL PANEL FOR SELECTED STATION */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between self-stretch">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLocation.id}
              initial={{ opacity: 0, x: isRTL ? -25 : 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 25 : -25 }}
              transition={{ duration: 0.4 }}
              className={`flex-1 flex flex-col justify-between space-y-8 bg-white/[0.01] border border-white/5 p-8 md:p-10 rounded-[3rem] ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              
              {/* Station Badge Header */}
              <div className={`flex flex-col sm:flex-row justify-between items-start gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                <div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-[8px] font-mono font-black uppercase tracking-widest ${
                    selectedLocation.status === "PRIMARY_HUB" 
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : selectedLocation.status === "ACTIVE_PROJECT"
                        ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                        : "bg-sky-400/5 text-sky-300 border border-sky-400/10"
                  }`}>
                    {selectedLocation.status === "PRIMARY_HUB" ? (
                      <>
                        <Radio size={8} className="animate-pulse" />
                        <span>{lang === "fr" ? "CENTRE OPÉRATIONNEL GLOBAL" : "المركز العملياتي الرئيسي"}</span>
                      </>
                    ) : selectedLocation.status === "ACTIVE_PROJECT" ? (
                      <>
                        <Activity size={8} className="animate-pulse" />
                        <span>{lang === "fr" ? "CHANTIER ET SIG ACTIF" : "مشروع وطني قيد الإنجاز"}</span>
                      </>
                    ) : (
                      <>
                        <Satellite size={8} />
                        <span>{lang === "fr" ? "LABORATOIRE RECHERCHE COOP" : "مختبر شراكة علمية"}</span>
                      </>
                    )}
                  </div>

                  <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-tight">
                    {lang === "fr" ? selectedLocation.nameFr : selectedLocation.nameAr}
                  </h4>
                  <span className="text-[10px] font-mono text-sky-400 block mt-1 font-semibold">
                    {lang === "fr" ? selectedLocation.typeFr : selectedLocation.typeAr}
                  </span>
                </div>

                <div className={`flex gap-6 font-mono text-left ${isRTL ? "text-right flex-row-reverse" : ""}`}>
                  <div>
                    <span className="text-[7px] text-gray-500 block uppercase">{lang === "fr" ? "Latitude" : "خط العرض"}</span>
                    <span className="text-xs font-black text-white">{selectedLocation.lat.toFixed(4)}° N</span>
                  </div>
                  <div className="w-px h-6 bg-white/10 self-center" />
                  <div>
                    <span className="text-[7px] text-gray-500 block uppercase">{lang === "fr" ? "Longitude" : "خط الطول"}</span>
                    <span className="text-xs font-black text-white">{selectedLocation.lng.toFixed(4)}° W</span>
                  </div>
                </div>
              </div>

              {/* Station Description */}
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                {lang === "fr" ? selectedLocation.descFr : selectedLocation.descAr}
              </p>

              {/* Advanced Geodetic Technical Metadata (Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/5">
                
                {/* Metric 1 */}
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                  <span className="text-[8px] font-mono text-gray-500 block uppercase">
                    {lang === "fr" ? "ALTITUDE DÉC." : "الارتفاع المسجل"}
                  </span>
                  <span className="text-xs font-black text-white block mt-1">
                    {selectedLocation.details.elevation}
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                  <span className="text-[8px] font-mono text-gray-500 block uppercase">
                    {lang === "fr" ? "PRÉCISION CIBLÉE" : "دقة الرصد المخطط"}
                  </span>
                  <span className="text-xs font-black text-sky-400 block mt-1">
                    {selectedLocation.details.precision}
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                  <span className="text-[8px] font-mono text-gray-500 block uppercase">
                    {lang === "fr" ? "SYSTÈME ET VECTEURS" : "الأجهزة والتكنولوجيا"}
                  </span>
                  <span className="text-[9px] font-mono font-black text-gray-300 block mt-1 truncate" title={selectedLocation.details.tech}>
                    {selectedLocation.details.tech.split(",")[0]}
                  </span>
                </div>

              </div>

              {/* Bottom Quick Facts Indicator */}
              <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-[10px] font-mono text-gray-500 border-t border-white/5 ${
                isRTL ? "sm:flex-row-reverse" : ""
              }`}>
                <div className="flex items-center gap-2">
                  <Cpu size={12} className="text-sky-400" />
                  <span>
                    {lang === "fr" ? "INTÉGRATION : LIEN SATELLITAIRE CONTINU" : "حالة الاتصال : ربط فضائي متواصل بنسبة 100%"}
                  </span>
                </div>
                
                <span className="text-[9px] font-bold text-sky-400 uppercase tracking-widest">
                  {lang === "fr" ? "STATUT : FONCTIONNEL" : "الوضعية : نشط ويقيس"}
                </span>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
