import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Map as MapIcon, 
  Sliders, 
  Download, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Check, 
  Sparkles, 
  Printer, 
  Heart,
  Undo,
  Type,
  Square,
  Eye,
  Settings,
  HelpCircle,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Truck,
  Lock,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
  ShoppingCart
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "@/components/ui/button";

// Seed-based pseudo-random number generator for deterministic city mapping
class SeededRandom {
  private seed: number;
  constructor(seed: string) {
    this.seed = this.hashString(seed);
  }
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) || 123456789;
  }
  next(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }
  nextRange(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
}

interface CityPreset {
  id: string;
  nameFr: string;
  nameAr: string;
  subFr: string;
  subAr: string;
  coords: string;
  lat: number;
  lng: number;
  hasCoast: boolean;
  coastAngle: number; // in radians
  density: number;
}

const CITY_PRESETS: CityPreset[] = [
  {
    id: "casablanca",
    nameFr: "CASABLANCA",
    nameAr: "الدار البيضاء",
    subFr: "MOROCCO",
    subAr: "المغرب",
    coords: "33° 35' 23\" N | 7° 36' 13\" W",
    lat: 33.5898,
    lng: -7.6031,
    hasCoast: true,
    coastAngle: -0.6, // diagonal coastline
    density: 1.2
  },
  {
    id: "marrakech",
    nameFr: "MARRAKECH",
    nameAr: "مراكش",
    subFr: "MOROCCO",
    subAr: "المغرب",
    coords: "31° 37' 48\" N | 7° 58' 52\" W",
    lat: 31.6300,
    lng: -7.9811,
    hasCoast: false,
    coastAngle: 0,
    density: 1.0
  },
  {
    id: "nador",
    nameFr: "NADOR",
    nameAr: "الناظور",
    subFr: "MARCHICA LAGOON",
    subAr: "بحيرة مارتشيكا",
    coords: "35° 10' 12\" N | 2° 55' 48\" W",
    lat: 35.1700,
    lng: -2.9300,
    hasCoast: true,
    coastAngle: 0.3,
    density: 0.85
  },
  {
    id: "rabat",
    nameFr: "RABAT",
    nameAr: "الرباط",
    subFr: "CAPITAL CITY",
    subAr: "العاصمة الإدارية",
    coords: "34° 01' 15\" N | 6° 50' 12\" W",
    lat: 34.0209,
    lng: -6.8373,
    hasCoast: true,
    coastAngle: -0.4,
    density: 1.1
  },
  {
    id: "tanger",
    nameFr: "TANGER",
    nameAr: "طنجة",
    subFr: "STRAIT OF GIBRALTAR",
    subAr: "مضيق جبل طارق",
    coords: "35° 46' 48\" N | 5° 48' 00\" W",
    lat: 35.7800,
    lng: -5.8000,
    hasCoast: true,
    coastAngle: -0.85,
    density: 1.05
  },
  {
    id: "fez",
    nameFr: "FEZ",
    nameAr: "فاس",
    subFr: "IMPERIAL CITY",
    subAr: "العاصمة العلمية",
    coords: "34° 02' 00\" N | 5° 00' 00\" W",
    lat: 34.0333,
    lng: -5.0000,
    hasCoast: false,
    coastAngle: 0,
    density: 1.15
  },
  {
    id: "agadir",
    nameFr: "AGADIR",
    nameAr: "أكادير",
    subFr: "ATLANTIC BAY",
    subAr: "خليج الأطلسي",
    coords: "30° 25' 12\" N | 9° 35' 50\" W",
    lat: 30.4200,
    lng: -9.5975,
    hasCoast: true,
    coastAngle: 0.5,
    density: 0.9
  }
];

interface ThemeStyle {
  id: string;
  nameFr: string;
  nameAr: string;
  bg: string;
  roads: string;
  text: string;
  border: string;
}

const THEME_STYLES: ThemeStyle[] = [
  {
    id: "red-dark",
    nameFr: "Crimson Nocturne",
    nameAr: "الأحمر والأسود",
    bg: "#000000",
    roads: "#ef4444", // vibrant red
    text: "#ffffff",
    border: "#ffffff"
  },
  {
    id: "classic-light",
    nameFr: "Noir & Blanc Épuré",
    nameAr: "الأبيض والأسود",
    bg: "#ffffff",
    roads: "#18181b", // zinc-900
    text: "#18181b",
    border: "#18181b"
  },
  {
    id: "midnight-dark",
    nameFr: "Monochrome Absolu",
    nameAr: "أحادي اللون",
    bg: "#000000",
    roads: "#ffffff",
    text: "#ffffff",
    border: "#ffffff"
  },
  {
    id: "imperial-gold",
    nameFr: "Or Impérial",
    nameAr: "الذهبي الفاخر",
    bg: "#000000",
    roads: "#eab308", // rich amber/gold
    text: "#ffffff",
    border: "#ffffff"
  },
  {
    id: "emerald-cyber",
    nameFr: "Smaragde Lumineux",
    nameAr: "الزمردي المشع",
    bg: "#000000",
    roads: "#10b981", // emerald green
    text: "#ffffff",
    border: "#ffffff"
  }
];

export interface OriginalMap {
  id: string;
  cityId: string;
  cityNameFr: string;
  cityNameAr: string;
  subFr: string;
  subAr: string;
  coords: string;
  titleFr: string;
  titleAr: string;
  theme: ThemeStyle;
  descFr: string;
  descAr: string;
  badge: string;
  zoom: number;
  rotation: number;
  lineWeight: "fine" | "medium" | "bold";
  borderType: "double" | "single" | "none";
  gridStyle: "organic" | "radial" | "grid" | "hybrid";
  imageUrl?: string;
}

export const ORIGINAL_MAPS_GALLERY: OriginalMap[] = [
  {
    id: "casa-nocturne",
    cityId: "casablanca",
    cityNameFr: "CASABLANCA",
    cityNameAr: "الدار البيضاء",
    subFr: "MOROCCO",
    subAr: "المغرب",
    coords: "33° 35' 23\" N | 7° 36' 13\" W",
    titleFr: "Casablanca - Crimson Nocturne",
    titleAr: "الدار البيضاء - سحر الأحمر الداكن",
    theme: THEME_STYLES[0], // red-dark
    descFr: "Un contraste théâtral de rouge cramoisie sur fond noir mat.",
    descAr: "شوارع الدار البيضاء متوهجة بالأحمر اللامع على خلفية سوداء.",
    badge: "Best Seller",
    zoom: 1.2,
    rotation: 0,
    lineWeight: "fine",
    borderType: "double",
    gridStyle: "hybrid",
    imageUrl: "/casared.jpg"
  },
  {
    id: "casa-gold",
    cityId: "casablanca",
    cityNameFr: "CASABLANCA",
    cityNameAr: "الدار البيضاء",
    subFr: "MOROCCO",
    subAr: "المغرب",
    coords: "33° 35' 23\" N | 7° 36' 13\" W",
    titleFr: "Casablanca - Or Impérial",
    titleAr: "الدار البيضاء - خيوط الذهب",
    theme: THEME_STYLES[3], // imperial-gold
    descFr: "Une allure luxueuse de routes dorées rappelant le faste marocain.",
    descAr: "مظهر ملوكي يعتمد خطوطاً ذهبية فاخرة تعكس حيوية العاصمة الاقتصادية.",
    badge: "Premium",
    zoom: 1.3,
    rotation: 0,
    lineWeight: "fine",
    borderType: "double",
    gridStyle: "hybrid",
    imageUrl: "/CasaOrange.jpg"
  },
  {
    id: "casa-light",
    cityId: "casablanca",
    cityNameFr: "CASABLANCA",
    cityNameAr: "الدار البيضاء",
    subFr: "MOROCCO",
    subAr: "المغرب",
    coords: "33° 35' 23\" N | 7° 36' 13\" W",
    titleFr: "Casablanca - Noir & Blanc Épuré",
    titleAr: "الدار البيضاء - كلاسيك أبيض وأسود",
    theme: THEME_STYLES[1], // classic-light
    descFr: "Le minimalisme scandinave appliqué à la métropole marocaine.",
    descAr: "الأناقة والوضوح التام في شبكة طرق بيضاء ناصعة.",
    badge: "Classic",
    zoom: 1.2,
    rotation: 0,
    lineWeight: "fine",
    borderType: "double",
    gridStyle: "hybrid",
    imageUrl: "/Casablackwhit.jpg"
  },
  {
    id: "rabat-gold",
    cityId: "rabat",
    cityNameFr: "RABAT",
    cityNameAr: "الرباط",
    subFr: "CAPITAL CITY",
    subAr: "العاصمة الإدارية",
    coords: "34° 01' 15\" N | 6° 50' 12\" W",
    titleFr: "Rabat - Or Impérial",
    titleAr: "الرباط - الذهب الملكي",
    theme: THEME_STYLES[3], // imperial-gold
    descFr: "Les avenues majestueuses de la capitale enveloppées d'or pur.",
    descAr: "شوارع العاصمة الإدارية الراقية تتلألأ بالخيوط الذهبية الفاخرة.",
    badge: "Édition Limitée",
    zoom: 1.1,
    rotation: 15,
    lineWeight: "fine",
    borderType: "double",
    gridStyle: "hybrid",
    imageUrl: "/casa.jpg"
  },
  {
    id: "nador-emerald",
    cityId: "nador",
    cityNameFr: "NADOR",
    cityNameAr: "الناظور",
    subFr: "MARCHICA LAGOON",
    subAr: "بحيرة مارتشيكا",
    coords: "35° 10' 12\" N | 2° 55' 48\" W",
    titleFr: "Nador - Smaragde Lumineux",
    titleAr: "الناظور - الزمرد الأطلسي للمارتشيكا",
    theme: THEME_STYLES[4], // emerald-cyber
    descFr: "Le tracé lagunaire de Nador sublimé de vert émeraude bioluminescent.",
    descAr: "سحر بحيرة المارتشيكا بالناظور متوهجاً باللون الزمردي الخلاب.",
    badge: "Nouveau",
    zoom: 1.25,
    rotation: -15,
    lineWeight: "fine",
    borderType: "double",
    gridStyle: "hybrid",
    imageUrl: "/CasaGreen.jpg"
  },
  {
    id: "nador-light",
    cityId: "nador",
    cityNameFr: "NADOR",
    cityNameAr: "الناظور",
    subFr: "MOROCCO",
    subAr: "المغرب",
    coords: "35° 10' 12\" N | 2° 55' 48\" W",
    titleFr: "Nador - Noir & Blanc Épuré",
    titleAr: "الناظور - كلاسيك أبيض وأسود",
    theme: THEME_STYLES[1], // classic-light
    descFr: "Le tracé lagunaire de Nador en noir et blanc d'un minimalisme nordique.",
    descAr: "الأناقة والوضوح التام لشبكة شوارع الناظور وبحيرة المارتشيكا باللونين الأبيض والأسود.",
    badge: "Classic",
    zoom: 1.25,
    rotation: 0,
    lineWeight: "fine",
    borderType: "double",
    gridStyle: "hybrid",
    imageUrl: "/NadormAPP.jpg"
  }
];

export const convertToEUR = (mad: number): number => {
  return Math.round(mad / 10.8);
};

export default function CartoStudio() {
  const { lang, isRTL } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Core Poster Design State
  const [selectedPoster, setSelectedPoster] = useState<OriginalMap>(ORIGINAL_MAPS_GALLERY[0]);
  const [selectedCity, setSelectedCity] = useState<CityPreset>(CITY_PRESETS[0]);
  const [selectedTheme, setSelectedTheme] = useState<ThemeStyle>(THEME_STYLES[0]);
  
  // Custom Typography & Text Values
  const [customCityName, setCustomCityName] = useState<string>(ORIGINAL_MAPS_GALLERY[0].cityNameFr);
  const [customCountryName, setCustomCountryName] = useState<string>(ORIGINAL_MAPS_GALLERY[0].subFr);
  const [customCoords, setCustomCoords] = useState<string>(ORIGINAL_MAPS_GALLERY[0].coords);
  const [arabicTextActive, setArabicTextActive] = useState<boolean>(false);

  // Visual Controls
  const [zoomLevel, setZoomLevel] = useState<number>(1.2);
  const [rotation, setRotation] = useState<number>(0);
  const [borderType, setBorderType] = useState<"double" | "single" | "none">("double");
  const [lineWeight, setLineWeight] = useState<"fine" | "medium" | "bold">("fine");
  const [gridStyle, setGridStyle] = useState<"organic" | "radial" | "grid" | "hybrid">("hybrid");
  const [grainEffect, setGrainEffect] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"city" | "theme" | "labels" | "layout">("city");
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);

  // Preloaded real poster image (if any)
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [loadedImageUrl, setLoadedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPoster.imageUrl) {
      const img = new Image();
      img.src = selectedPoster.imageUrl;
      img.onload = () => {
        setLoadedImage(img);
        setLoadedImageUrl(selectedPoster.imageUrl || null);
      };
      img.onerror = () => {
        setLoadedImage(null);
        setLoadedImageUrl(null);
      };
    } else {
      setLoadedImage(null);
      setLoadedImageUrl(null);
    }
  }, [selectedPoster]);

  // Sync design settings and text values when selected poster or site language changes
  useEffect(() => {
    const cityPreset = CITY_PRESETS.find(c => c.id === selectedPoster.cityId) || CITY_PRESETS[0];
    setSelectedCity(cityPreset);
    setSelectedTheme(selectedPoster.theme);
    setZoomLevel(selectedPoster.zoom);
    setRotation(selectedPoster.rotation);
    setBorderType(selectedPoster.borderType);
    setLineWeight(selectedPoster.lineWeight);
    setGridStyle(selectedPoster.gridStyle);
    
    const isAr = lang === "ar";
    setArabicTextActive(isAr);
    if (isAr) {
      setCustomCityName(selectedPoster.cityNameAr);
      setCustomCountryName(selectedPoster.subAr);
    } else {
      setCustomCityName(selectedPoster.cityNameFr);
      setCustomCountryName(selectedPoster.subFr);
    }
    setCustomCoords(selectedPoster.coords);
  }, [selectedPoster, lang]);

  // High Resolution Poster Drawer
  const drawPoster = (ctx: CanvasRenderingContext2D, width: number, height: number, scale: number = 1) => {
    // If the image is loaded and matches the selected signature poster, draw it directly!
    if (loadedImage && selectedPoster.imageUrl) {
      ctx.drawImage(loadedImage, 0, 0, width, height);
      return;
    }

    const bgCol = selectedTheme.bg;
    const roadCol = selectedTheme.roads;
    const textCol = selectedTheme.text;
    const borderCol = selectedTheme.border;

    // 1. Clear background
    ctx.fillStyle = bgCol;
    ctx.fillRect(0, 0, width, height);

    // Create seeded random with seed linked to selected city & layout style
    const rng = new SeededRandom(selectedCity.id + gridStyle);

    // Save state for map drawings with clipping mask to avoid drawing outside the poster frame/border
    ctx.save();

    // Map drawing area bounds (leaving room for labels and borders at the bottom)
    const mapMargin = 40 * scale;
    const mapWidth = width - mapMargin * 2;
    // Map takes up 80% of poster height, leaving 20% for labels at the bottom
    const mapHeight = height * 0.76;

    // Define border path
    const borderPadding = 18 * scale;
    const outerBorderLeft = borderPadding;
    const outerBorderTop = borderPadding;
    const outerBorderWidth = width - borderPadding * 2;
    const outerBorderHeight = height - borderPadding * 2;

    // Clip map to the poster borders
    ctx.beginPath();
    ctx.rect(outerBorderLeft, outerBorderTop, outerBorderWidth, outerBorderHeight);
    ctx.clip();

    // Let's translate coordinates to center of map area
    const centerX = width / 2;
    const centerY = mapHeight / 2 + mapMargin;

    // Apply scaling/rotation adjustments
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoomLevel, zoomLevel);

    // Generate and render street map!
    // Since we want thousands of gorgeous fine streets, we render coastlines, major highways, grid blocks, and local streets.
    
    // --- Natural Coastline drawing (if coastal) ---
    if (selectedCity.hasCoast) {
      ctx.fillStyle = bgCol === "#ffffff" ? "#f1f5f9" : "#0f172a"; // lighter/darker ocean backdrop
      ctx.beginPath();
      
      const angle = selectedCity.coastAngle;
      const coastDist = 180 * scale;
      
      // Draw a wavy coastline crossing diagonally
      ctx.moveTo(-width * 1.5, Math.sin(angle) * coastDist);
      for (let x = -width * 1.5; x < width * 1.5; x += 20 * scale) {
        const wavyY = Math.sin(x / (150 * scale)) * (25 * scale) + Math.cos(x / (80 * scale)) * (10 * scale);
        // Rotate coordinate
        const rx = x * Math.cos(angle) - wavyY * Math.sin(angle);
        const ry = x * Math.sin(angle) + wavyY * Math.cos(angle) - coastDist;
        ctx.lineTo(rx, ry);
      }
      
      ctx.lineTo(width * 1.5, -height * 1.5);
      ctx.lineTo(-width * 1.5, -height * 1.5);
      ctx.closePath();
      ctx.fill();

      // Coastline beach stroke
      ctx.strokeStyle = roadCol + "55"; // semi-transparent coast accent
      ctx.lineWidth = 1.5 * scale;
      ctx.stroke();
    }

    // Determine line weights based on scale & preset selection
    let highwayWidth = 2.4 * scale;
    let mainRoadWidth = 1.2 * scale;
    let localRoadWidth = 0.5 * scale;

    if (lineWeight === "medium") {
      highwayWidth *= 1.5;
      mainRoadWidth *= 1.5;
      localRoadWidth *= 1.5;
    } else if (lineWeight === "bold") {
      highwayWidth *= 2.2;
      mainRoadWidth *= 2.2;
      localRoadWidth *= 2.2;
    }

    // --- Generate Major Arteries (Highways) ---
    const highwayCount = 14;
    const highwayPoints: { x: number; y: number }[] = [];
    ctx.strokeStyle = roadCol;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Set highway stroke style
    ctx.strokeStyle = roadCol;

    // Draw main beltway / circular ring road
    if (gridStyle === "radial" || gridStyle === "hybrid") {
      ctx.lineWidth = highwayWidth;
      ctx.beginPath();
      ctx.arc(0, 0, 160 * scale, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 320 * scale, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Radial main highways stretching outwards from center
    ctx.lineWidth = highwayWidth;
    for (let i = 0; i < highwayCount; i++) {
      const theta = (i / highwayCount) * Math.PI * 2 + rng.nextRange(-0.1, 0.1);
      
      // If coastal, don't draw highways deep into the water
      if (selectedCity.hasCoast && Math.sin(theta - selectedCity.coastAngle) < -0.2) {
        continue;
      }

      ctx.beginPath();
      ctx.moveTo(0, 0);

      let px = 0;
      let py = 0;
      const steps = 6;
      const stepLength = 120 * scale;

      for (let s = 1; s <= steps; s++) {
        // Bend the highways organically
        const bend = rng.nextRange(-15 * scale, 15 * scale);
        const nextX = Math.cos(theta) * s * stepLength + Math.sin(theta) * bend;
        const nextY = Math.sin(theta) * s * stepLength - Math.cos(theta) * bend;
        
        ctx.lineTo(nextX, nextY);
        px = nextX;
        py = nextY;
        
        if (s % 2 === 0) {
          highwayPoints.push({ x: px, y: py });
        }
      }
      ctx.stroke();
    }

    // --- Generate Secondary Roads ---
    ctx.lineWidth = mainRoadWidth;
    ctx.strokeStyle = roadCol + "dd"; // slightly transparent

    // Grid-based blocks or nested rings
    const blockCenters: { x: number; y: number; r: number; style: string }[] = [];
    const numBlocks = 35;
    for (let i = 0; i < numBlocks; i++) {
      const dist = rng.nextRange(60 * scale, 480 * scale);
      const angle = rng.nextRange(0, Math.PI * 2);
      
      if (selectedCity.hasCoast && Math.sin(angle - selectedCity.coastAngle) < -0.15) {
        continue; // skip ocean
      }

      const bx = Math.cos(angle) * dist;
      const by = Math.sin(angle) * dist;
      blockCenters.push({
        x: bx,
        y: by,
        r: rng.nextRange(40 * scale, 90 * scale),
        style: rng.next() > 0.5 ? "grid" : "organic"
      });
    }

    // Draw secondary roads linking block centers and highways
    ctx.beginPath();
    for (let i = 0; i < blockCenters.length; i++) {
      const b1 = blockCenters[i];
      // Connect to nearest block center
      let nearest = null;
      let minDist = Infinity;
      for (let j = 0; j < blockCenters.length; j++) {
        if (i === j) continue;
        const b2 = blockCenters[j];
        const d = Math.hypot(b1.x - b2.x, b1.y - b2.y);
        if (d < minDist) {
          minDist = d;
          nearest = b2;
        }
      }
      if (nearest && minDist < 200 * scale) {
        ctx.moveTo(b1.x, b1.y);
        ctx.quadraticCurveTo(
          (b1.x + nearest.x) / 2 + rng.nextRange(-15 * scale, 15 * scale),
          (b1.y + nearest.y) / 2 + rng.nextRange(-15 * scale, 15 * scale),
          nearest.x, nearest.y
        );
      }
    }
    ctx.stroke();

    // --- Draw Thousands of Tiny Local Streets (Fine Details) ---
    ctx.lineWidth = localRoadWidth;
    ctx.strokeStyle = roadCol + "aa"; // transparent fine lines for high-density layout

    blockCenters.forEach((block) => {
      ctx.save();
      ctx.translate(block.x, block.y);

      // Rotate local grids differently for realistic municipal planning
      const localRotation = rng.nextRange(0, Math.PI * 2);
      ctx.rotate(localRotation);

      const radius = block.r;
      const layoutType = gridStyle === "grid" ? "grid" : gridStyle === "organic" ? "organic" : block.style;

      if (layoutType === "grid") {
        // Draw straight rectangular grid blocks
        const spacing = rng.nextRange(16 * scale, 26 * scale);
        ctx.beginPath();
        for (let x = -radius; x <= radius; x += spacing) {
          // Circular boundary check
          const h = Math.sqrt(Math.max(0, radius * radius - x * x));
          ctx.moveTo(x, -h);
          ctx.lineTo(x, h);
        }
        for (let y = -radius; y <= radius; y += spacing) {
          const w = Math.sqrt(Math.max(0, radius * radius - y * y));
          ctx.moveTo(-w, y);
          ctx.lineTo(w, y);
        }
        ctx.stroke();
      } else {
        // Draw winding organic lanes / old medina alleys
        ctx.beginPath();
        const numLanes = Math.floor(rng.nextRange(8, 15));
        for (let l = 0; l < numLanes; l++) {
          const startAngle = rng.nextRange(0, Math.PI * 2);
          let px = Math.cos(startAngle) * radius * rng.nextRange(0, 0.4);
          let py = Math.sin(startAngle) * radius * rng.nextRange(0, 0.4);
          
          ctx.moveTo(px, py);
          let laneAngle = startAngle + rng.nextRange(-Math.PI/4, Math.PI/4);
          
          const segs = 5;
          const segLen = radius / 4;
          for (let s = 0; s < segs; s++) {
            laneAngle += rng.nextRange(-0.4, 0.4);
            const nx = px + Math.cos(laneAngle) * segLen;
            const ny = py + Math.sin(laneAngle) * segLen;
            
            // Stay within block boundary
            if (Math.hypot(nx, ny) < radius) {
              ctx.lineTo(nx, ny);
              px = nx;
              py = ny;
            } else {
              break;
            }
          }
        }
        ctx.stroke();
      }
      ctx.restore();
    });

    // Restore scaling/rotation transformations
    ctx.restore();

    // Restore borders mask clipping
    ctx.restore();

    // 2. DRAW FRAME AND BORDERS
    ctx.strokeStyle = borderCol;
    
    if (borderType === "double") {
      // Outer Frame
      ctx.lineWidth = 4 * scale;
      ctx.strokeRect(outerBorderLeft, outerBorderTop, outerBorderWidth, outerBorderHeight);

      // Inner thin frame
      const innerGap = 8 * scale;
      ctx.lineWidth = 1 * scale;
      ctx.strokeRect(
        outerBorderLeft + innerGap, 
        outerBorderTop + innerGap, 
        outerBorderWidth - innerGap * 2, 
        outerBorderHeight - innerGap * 2
      );
    } else if (borderType === "single") {
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeRect(outerBorderLeft, outerBorderTop, outerBorderWidth, outerBorderHeight);
    }

    // 3. POSTER LABELS (Drawn at the bottom center of the poster)
    ctx.fillStyle = textCol;
    ctx.textAlign = "center";

    // Text block coordinates
    const labelY = height - 130 * scale;

    // City Name
    ctx.font = `black ${32 * scale}px "Space Grotesk", "Inter", sans-serif`;
    ctx.letterSpacing = `${8 * scale}px`;
    ctx.fillText(customCityName.toUpperCase(), width / 2, labelY);

    // Divider line
    const dividerWidth = 140 * scale;
    ctx.strokeStyle = textCol;
    ctx.lineWidth = 1.5 * scale;
    ctx.beginPath();
    ctx.moveTo(width / 2 - dividerWidth / 2, labelY + 14 * scale);
    ctx.lineTo(width / 2 + dividerWidth / 2, labelY + 14 * scale);
    ctx.stroke();

    // Subtitle (Country/Region)
    ctx.font = `500 ${13 * scale}px "Space Grotesk", sans-serif`;
    ctx.letterSpacing = `${5 * scale}px`;
    ctx.fillText(customCountryName.toUpperCase(), width / 2, labelY + 34 * scale);

    // Coordinates (Fine print)
    ctx.font = `400 ${9 * scale}px "JetBrains Mono", monospace`;
    ctx.letterSpacing = `${1.5 * scale}px`;
    ctx.fillText(customCoords.toUpperCase(), width / 2, labelY + 54 * scale);

    // Subtle grain overlay for authentic screenprint texture
    if (grainEffect) {
      ctx.save();
      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = bgCol === "#ffffff" ? 0.08 : 0.15;
      
      const grainSize = 1;
      for (let x = 0; x < width; x += grainSize * 2) {
        for (let y = 0; y < height; y += grainSize * 2) {
          if (Math.random() > 0.5) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(x, y, grainSize, grainSize);
          } else {
            ctx.fillStyle = "#000000";
            ctx.fillRect(x, y, grainSize, grainSize);
          }
        }
      }
      ctx.restore();
    }
  };

  // Redraw poster on state change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set interactive canvas visual resolution
    const width = 600;
    const height = 900;
    canvas.width = width;
    canvas.height = height;

    drawPoster(ctx, width, height, 1);
  }, [
    selectedCity, 
    selectedTheme, 
    customCityName, 
    customCountryName, 
    customCoords, 
    zoomLevel, 
    rotation, 
    borderType, 
    lineWeight, 
    gridStyle,
    grainEffect,
    loadedImage,
    selectedPoster
  ]);

  // Export Poster Image at 4K High Definition Resolution (perfect for actual printing!)
  const handleExportPoster = () => {
    const tempCanvas = document.createElement("canvas");
    // High-res print resolution (2000 x 3000px)
    const exportWidth = 2000;
    const exportHeight = 3000;
    tempCanvas.width = exportWidth;
    tempCanvas.height = exportHeight;

    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    // Draw at high-res scale factor
    drawPoster(tempCtx, exportWidth, exportHeight, exportWidth / 600);

    // Trigger JPEG file download
    const dataUrl = tempCanvas.toDataURL("image/jpeg", 0.95);
    const link = document.createElement("a");
    link.download = `ECARTTOP_Poster_${customCityName.replace(/\s+/g, "_")}.jpg`;
    link.href = dataUrl;
    link.click();
  };

  // Preset quick themes selector
  const handleSelectCityPreset = (city: CityPreset) => {
    setSelectedCity(city);
  };

  // --- Cart & Storefront Integration ---
  interface CartItem {
    id: string;
    cityName: string;
    cityPresetId: string;
    themeId: string;
    themeNameFr: string;
    themeNameAr: string;
    size: string;
    frame: string;
    paper: string;
    customTexts: { city: string; country: string; coords: string; isArabic: boolean };
    zoom: number;
    rotation: number;
    border: string;
    lineWeight: string;
    gridStyle: string;
    price: number;
    quantity: number;
  }

  const [selectedSize, setSelectedSize] = useState<string>("A2");
  const [selectedFrame, setSelectedFrame] = useState<string>("none");
  const [selectedPaper, setSelectedPaper] = useState<string>("matte");
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("ecarttop_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<"shop" | "checkout" | "success">("shop");
  
  // Checkout Form Details
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    city: "Casablanca",
    address: "",
    shippingMethod: "home" // "home" (+40 MAD) or "pickup" (Free)
  });
  const [lastOrderRef, setLastOrderRef] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("ecarttop_cart", JSON.stringify(cart));
  }, [cart]);

  // Size details for display
  const SIZES = [
    { id: "A4", label: "A4 (21 x 29.7 cm)", price: 149, descFr: "Idéal pour étagères et petits espaces", descAr: "مثالي للمكاتب والمساحات الصغيرة" },
    { id: "A3", label: "A3 (29.7 x 42 cm)", price: 249, descFr: "Format classique polyvalent", descAr: "حجم كلاسيكي متعدد الاستخدامات" },
    { id: "A2", label: "A2 (42 x 59.4 cm)", price: 349, descFr: "Excellent équilibre visuel", descAr: "توازن بصري ممتاز للجدران" },
    { id: "A1", label: "A1 (59.4 x 84.1 cm)", price: 499, descFr: "Tirage d'art majestueux", descAr: "لوحة جدارية فخمة وكبيرة" },
    { id: "50x70", label: "50 x 70 cm", price: 449, descFr: "Format galerie standard", descAr: "مقاس صالات العرض القياسي" },
    { id: "70x100", label: "70 x 100 cm", price: 599, descFr: "Format géant d'exposition", descAr: "حجم عملاق للمعارض والمكاتب الكبرى" }
  ];

  const FRAMES = [
    { id: "none", labelFr: "Pas de Cadre (Affiche seule)", labelAr: "بدون إطار (ملصق فقط)", priceDesc: "Inclus" },
    { id: "black-wood", labelFr: "Cadre Bois Noir Minimal", labelAr: "إطار خشب أسود بسيط", priceDesc: "+150 à +350 MAD" },
    { id: "oak-wood", labelFr: "Cadre Bois Chêne Élégant", labelAr: "إطار خشب بلوط راقي", priceDesc: "+180 à +390 MAD" },
    { id: "white-wood", labelFr: "Cadre Bois Blanc Moderne", labelAr: "إطار خشب أبيض حديث", priceDesc: "+150 à +350 MAD" }
  ];

  const PAPERS = [
    { id: "matte", labelFr: "Papier Mat Archive 250g", labelAr: "ورق مطفأ سميك 250 غرام", priceFr: "Gratuit", priceAr: "مشمول" },
    { id: "fine-art", labelFr: "Papier Fine Art Texturé 310g (+50 MAD)", labelAr: "ورق فني ذو ملمس 310 غرام (+50 د.م)", priceFr: "+50 MAD", priceAr: "+50 د.م" },
    { id: "satin", labelFr: "Papier Satiné Premium 200g", labelAr: "ورق ساتان ناعم 200 غرام", priceFr: "Gratuit", priceAr: "مشمول" }
  ];

  // Price Calculation Engine
  const calculatePrice = (sizeId: string, frameId: string, paperId: string): number => {
    const sizeObj = SIZES.find(s => s.id === sizeId);
    let total = sizeObj ? sizeObj.price : 349;

    // Frame price calculation based on size category
    if (frameId !== "none") {
      const isSmall = sizeId === "A4" || sizeId === "A3";
      const isMedium = sizeId === "A2" || sizeId === "50x70";
      
      let baseFramePrice = 250;
      if (frameId === "oak-wood") {
        baseFramePrice = isSmall ? 180 : isMedium ? 290 : 390;
      } else { // black or white
        baseFramePrice = isSmall ? 150 : isMedium ? 250 : 350;
      }
      total += baseFramePrice;
    }

    // Paper premium
    if (paperId === "fine-art") {
      total += 50;
    }

    return total;
  };

  const currentPrice = calculatePrice(selectedSize, selectedFrame, selectedPaper);

  const handleAddToCart = () => {
    const item: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      cityName: customCityName,
      cityPresetId: selectedCity.id,
      themeId: selectedTheme.id,
      themeNameFr: selectedTheme.nameFr,
      themeNameAr: selectedTheme.nameAr,
      size: selectedSize,
      frame: selectedFrame,
      paper: selectedPaper,
      customTexts: {
        city: customCityName,
        country: customCountryName,
        coords: customCoords,
        isArabic: arabicTextActive
      },
      zoom: zoomLevel,
      rotation: rotation,
      border: borderType,
      lineWeight: lineWeight,
      gridStyle: gridStyle,
      price: currentPrice,
      quantity: 1
    };

    setCart(prev => {
      const duplicateIndex = prev.findIndex(i => 
        i.cityPresetId === item.cityPresetId && 
        i.themeId === item.themeId && 
        i.size === item.size && 
        i.frame === item.frame && 
        i.paper === item.paper &&
        i.customTexts.city === item.customTexts.city &&
        i.customTexts.isArabic === item.customTexts.isArabic
      );

      if (duplicateIndex > -1) {
        const updated = [...prev];
        updated[duplicateIndex].quantity += 1;
        return updated;
      }
      return [...prev, item];
    });

    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert(lang === "fr" ? "Veuillez remplir tous les champs requis !" : "يرجى ملء جميع الحقول المطلوبة لتأكيد الطلب !");
      return;
    }

    const ref = `ECART-${Math.floor(100000 + Math.random() * 900000)}`;
    setLastOrderRef(ref);

    const subtotal = cart.length > 0 ? cart.reduce((acc, i) => acc + (i.price * i.quantity), 0) : currentPrice;
    const shipping = customerInfo.shippingMethod === "home" ? 40 : 0;
    const total = subtotal + shipping;

    const orderObj = {
      reference: ref,
      date: new Date().toLocaleDateString(),
      items: cart.length > 0 ? cart : [{
        id: "single-item",
        cityName: customCityName,
        size: selectedSize,
        frame: selectedFrame,
        paper: selectedPaper,
        price: currentPrice,
        quantity: 1
      }],
      shipping: customerInfo,
      total: total,
      status: "Confirmé - En cours d'impression"
    };

    // Save order in history
    const history = JSON.parse(localStorage.getItem("ecarttop_orders") || "[]");
    localStorage.setItem("ecarttop_orders", JSON.stringify([orderObj, ...history]));

    // Empty cart
    setCart([]);
    setCheckoutStep("success");
  };

  // Build WhatsApp share link for confirmation in Morocco
  const getWhatsAppLink = () => {
    const text = `Bonjour Cabinet ECARTTOP,%0A%0AJe souhaite confirmer ma commande d'art cartographique !%0A%0A*Référence:* ${lastOrderRef}%0A*Nom:* ${customerInfo.name}%0A*Téléphone:* ${customerInfo.phone}%0A*Ville:* ${customerInfo.city}%0A*Adresse:* ${customerInfo.address}%0A*Mode:* ${customerInfo.shippingMethod === "home" ? "Livraison à Domicile (+40 MAD)" : "Retrait en Agence (Gratuit)"}%0A%0AMerci !`;
    return `https://wa.me/212661000000?text=${text}`;
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 md:px-8 relative overflow-hidden bg-[#020617] text-white">
      {/* Decorative ambient blurred spots */}
      <div className="absolute top-1/4 left-1/10 w-[35rem] h-[35rem] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[25rem] h-[25rem] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HEADER PANEL & VIEW SWITCHER */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8 relative z-10">
          <div className={`space-y-2 text-left w-full md:w-auto`}>
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-400/20 px-3 py-1.5 rounded-full">
              <Sparkles className="text-sky-400 animate-pulse" size={12} />
              <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-sky-400">
                {lang === "fr" ? "CartoStore par ECARTTOP" : "متجر الخرائط من إيكارطوب"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
              {lang === "fr" ? "GALERIE d'ART" : "معرض اللوحات"} <br />
              <span className="text-sky-400 not-italic font-light">
                {lang === "fr" ? "CARTOGRAPHIQUE" : "الخرائطية الفاخرة"}
              </span>
            </h2>
            <p className="text-xs text-gray-400 font-light max-w-xl">
              {lang === "fr"
                ? "Découvrez notre collection d'affiches d'art de Casablanca et d'autres cités marocaines. Commandez un tirage haute définition imprimé et encadré par nos experts."
                : "اكتشف مجموعتنا الراقية من اللوحات الجدارية لمدينة الدار البيضاء وباقي المدن المغربية. اطلب طباعة وتأطير لوحتك المخصصة فوراً بجودة ممتازة."}
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white border border-white/10 rounded-full p-3.5 relative shadow-lg transition-transform hover:scale-105 flex items-center justify-center"
            >
              <ShoppingCart size={18} className="text-sky-400" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-mono font-black w-5.5 h-5.5 rounded-full flex items-center justify-center animate-bounce border-2 border-slate-900">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* WORKSPACE & STOREFRONT */}
        {checkoutStep === "success" ? (
          /* SUCCESS SCREEN */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card max-w-2xl mx-auto p-10 md:p-16 rounded-[3rem] border-white/5 bg-zinc-950/40 text-center space-y-8 backdrop-blur-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-teal-500" />
            <div className="mx-auto bg-emerald-500/10 border border-emerald-500/20 w-20 h-20 rounded-full flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={40} className="animate-pulse" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-black block">
                {lang === "fr" ? "COMMANDE ENREGISTRÉE AVEC SUCCÈS" : "تم تسجيل طلبك بنجاح تام"}
              </span>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                {lang === "fr" ? "MERCI POUR VOTRE CONFIANCE !" : "شكراً جزيلاً لثقتكم بمكتبنا !"}
              </h3>
              <p className="text-xs text-gray-500 font-mono">
                {lang === "fr" ? "RÉFÉRENCE DE COMMANDE :" : "رقم مرجع الطلب :"} <span className="text-sky-400 font-black">{lastOrderRef}</span>
              </p>
            </div>

            <p className="text-sm text-gray-400 font-light max-w-lg mx-auto leading-relaxed">
              {lang === "fr"
                ? "Nos ingénieurs et maîtres imprimeurs à Nador préparent votre tirage d'art. Nous venons de vous envoyer un récapitulatif. Afin d'accélérer l'expédition, veuillez confirmer votre commande en un clic sur WhatsApp."
                : "يقوم مهندسو ومصممو مكتب إيكارطوب بالناظور بتجهيز لوحتكم الفنية المطبوعة بعناية فائقة. لتسريع عملية الشحن والتأطير، يرجى تأكيد طلبكم مباشرة بضغطة زر عبر الواتساب."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl px-8 py-5 font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <MessageSquare size={16} />
                {lang === "fr" ? "CONFIRMER VIA WHATSAPP" : "تأكيد فوري عبر الواتساب"}
              </a>
              <Button
                onClick={() => setCheckoutStep("shop")}
                className="bg-white/5 hover:bg-white/10 text-white rounded-2xl px-8 py-5 font-mono text-xs font-black uppercase tracking-wider border border-white/5"
              >
                {lang === "fr" ? "RETOURNER À LA BOUTIQUE" : "العودة للمتجر ورؤية المزيد"}
              </Button>
            </div>
          </motion.div>
        ) : checkoutStep === "checkout" ? (
          /* CHECKOUT STEP */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* CHECKOUT FORM */}
            <div className="lg:col-span-7 bg-slate-950/40 border border-white/5 rounded-[2.5rem] p-8 md:p-12 space-y-8 backdrop-blur-2xl">
              <div className="space-y-2">
                <button
                  onClick={() => setCheckoutStep("shop")}
                  className="text-xs font-mono font-bold text-gray-500 hover:text-white flex items-center gap-1.5 transition-colors uppercase tracking-wider"
                >
                  <ArrowLeft size={14} />
                  {lang === "fr" ? "Retour au panier" : "العودة للتسوق"}
                </button>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">
                  {lang === "fr" ? "LIVRAISON & CONFIRMATION" : "معلومات الشحن والتسليم"}
                </h3>
                <p className="text-xs text-gray-400 font-light">
                  {lang === "fr"
                    ? "Complétez vos coordonnées pour recevoir votre affiche d'art au Maroc."
                    : "يرجى كتابة معلوماتكم بدقة لتوصيل اللوحة الجدارية إليكم أينما كنتم بالمغرب."}
                </p>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block">
                      {lang === "fr" ? "Nom Complet *" : "الاسم الكامل *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nabil Boutrik"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl h-12 px-5 text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block">
                        {lang === "fr" ? "Téléphone / WhatsApp *" : "رقم الهاتف والواتساب *"}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="06 61 XX XX XX"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl h-12 px-5 text-sm text-white focus:outline-none focus:border-sky-400 transition-colors font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block">
                        {lang === "fr" ? "Ville de Destination *" : "مدينة الشحن والوجهة *"}
                      </label>
                      <select
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl h-12 px-5 text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                      >
                        {["Casablanca", "Nador", "Marrakech", "Rabat", "Tanger", "Fez", "Oujda", "Berkane", "Agadir", "Meknès", "Kénitra", "Laâyoune"].map(c => (
                          <option key={c} value={c} className="bg-slate-900">{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block">
                      {lang === "fr" ? "Adresse Physique Complète *" : "العنوان السكني الكامل لتوصيل اللوحة *"}
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Avenue Hassan II, Quartier de la Gare..."
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-sky-400 transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block">
                      {lang === "fr" ? "Mode d'expédition" : "طريقة التسليم والشحن"}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setCustomerInfo(prev => ({ ...prev, shippingMethod: "home" }))}
                        className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          customerInfo.shippingMethod === "home"
                            ? "bg-sky-500/10 border-sky-400 text-sky-400"
                            : "bg-black/30 border-white/5 text-gray-400 hover:border-white/10"
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="text-xs font-black uppercase tracking-wider text-white">
                            {lang === "fr" ? "Livraison à domicile" : "توصيل للمنزل"}
                          </span>
                          <span className="text-[10px] text-gray-500 block">
                            {lang === "fr" ? "Aramex / Amana (24-48h)" : "أرامكس / أمانة (خلال يومين)"}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-sky-400">+40 MAD</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCustomerInfo(prev => ({ ...prev, shippingMethod: "pickup" }))}
                        className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          customerInfo.shippingMethod === "pickup"
                            ? "bg-sky-500/10 border-sky-400 text-sky-400"
                            : "bg-black/30 border-white/5 text-gray-400 hover:border-white/10"
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="text-xs font-black uppercase tracking-wider text-white">
                            {lang === "fr" ? "Retrait en Cabinet" : "استلام من مكتبنا"}
                          </span>
                          <span className="text-[10px] text-gray-500 block">
                            {lang === "fr" ? "À Nador ou Casablanca" : "في الناظور أو الدار البيضاء"}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400">GRATUIT</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4 justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Lock size={14} className="text-sky-500" />
                    <span className="text-[10px] font-mono uppercase tracking-wider">
                      {lang === "fr" ? "Paiement 100% Sécurisé à la Livraison" : "الدفع عند الاستلام آمن 100%"}
                    </span>
                  </div>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white rounded-2xl px-10 py-6 font-mono text-[10px] font-black uppercase tracking-widest shadow-lg shadow-sky-500/20"
                  >
                    {lang === "fr" ? "CONFIRMER ET COMMANDER" : "تأكيد وإرسال الطلب الآن"}
                  </Button>
                </div>
              </form>
            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:col-span-5 bg-slate-950/20 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
              <h4 className="text-lg font-black uppercase tracking-wider text-white border-b border-white/5 pb-4">
                {lang === "fr" ? "Récapitulatif de Commande" : "تفاصيل السلة والطلب"}
              </h4>

              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                {cart.length > 0 ? (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-3 bg-black/20 rounded-xl border border-white/5">
                      <div className="flex-grow space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs font-black uppercase tracking-widest text-white">AFFICHE {item.cityName}</span>
                          <span className="text-xs font-mono font-bold text-sky-400">{item.price * item.quantity} MAD</span>
                        </div>
                        <div className="text-[9px] font-mono text-gray-500 space-y-0.5">
                          <div>STYLE: <span className="text-gray-300">{lang === "fr" ? item.themeNameFr : item.themeNameAr}</span></div>
                          <div>FORMAT: <span className="text-gray-300">{item.size}</span></div>
                          <div>CADRE: <span className="text-gray-300">{item.frame !== "none" ? item.frame : "Sans"}</span></div>
                          <div>QTY: <span className="text-gray-300 font-bold">{item.quantity}</span></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex gap-4 p-3 bg-black/20 rounded-xl border border-white/5">
                    <div className="flex-grow space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs font-black uppercase tracking-widest text-white">AFFICHE {customCityName}</span>
                        <span className="text-xs font-mono font-bold text-sky-400">{currentPrice} MAD</span>
                      </div>
                      <div className="text-[9px] font-mono text-gray-500 space-y-0.5">
                        <div>STYLE: <span className="text-gray-300">{lang === "fr" ? selectedTheme.nameFr : selectedTheme.nameAr}</span></div>
                        <div>FORMAT: <span className="text-gray-300">{selectedSize}</span></div>
                        <div>CADRE: <span className="text-gray-300">{selectedFrame !== "none" ? selectedFrame : "Sans"}</span></div>
                        <div>QTY: <span className="text-gray-300 font-bold">1</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Price calculations */}
              <div className="space-y-3 pt-4 border-t border-white/5 text-xs font-mono">
                <div className="flex justify-between text-gray-500">
                  <span>{lang === "fr" ? "SOUS-TOTAL" : "المجموع الجزئي"}</span>
                  <span className="text-white font-bold">{cart.length > 0 ? cart.reduce((acc, i) => acc + (i.price * i.quantity), 0) : currentPrice} MAD</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>{lang === "fr" ? "FRAIS DE LIVRAISON" : "مصاريف التوصيل"}</span>
                  <span className={`font-bold ${customerInfo.shippingMethod === "pickup" ? "text-emerald-400" : "text-white"}`}>
                    {customerInfo.shippingMethod === "pickup" ? "0 MAD" : "40 MAD"}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black border-t border-white/5 pt-3">
                  <span className="text-sky-400">{lang === "fr" ? "TOTAL À PAYER" : "المجموع الكلي المطلوب"}</span>
                  <div className="text-right">
                    <div className="text-white">{cart.length > 0 ? cart.reduce((acc, i) => acc + (i.price * i.quantity), 0) + (customerInfo.shippingMethod === "home" ? 40 : 0) : currentPrice + (customerInfo.shippingMethod === "home" ? 40 : 0)} MAD</div>
                    <div className="text-[10px] text-gray-500 font-light mt-0.5">~{convertToEUR(cart.length > 0 ? cart.reduce((acc, i) => acc + (i.price * i.quantity), 0) + (customerInfo.shippingMethod === "home" ? 40 : 0) : currentPrice + (customerInfo.shippingMethod === "home" ? 40 : 0))} EUR</div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-start gap-3">
                <Truck className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-wider block">
                    {lang === "fr" ? "CASH ON DELIVERY (COD)" : "الدفع عند الاستلام"}
                  </span>
                  <p className="text-[10px] text-gray-400 font-light leading-relaxed">
                    {lang === "fr"
                      ? "Vous payez en espèces à l'agent de livraison seulement après avoir reçu et inspecté vos superbes affiches encadrées."
                      : "لن تدفع أي سنت حتى تصلك لوحاتك الفنية المغلفة وتتحقق من جودة الطباعة والتأطير بنفسك."}
                  </p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* MAIN STOREFRONT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* LEFT CONTROL SUITE (5/12 width) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* SECTION 1: SIGNATURE MOROCCAN CITIES CATALOGUE */}
              <div className="space-y-6">
                <div className="bg-slate-950/40 border border-white/5 rounded-[2.5rem] p-6 md:p-8 space-y-6 backdrop-blur-2xl">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 bg-sky-500/10 border border-sky-400/20 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                      <span className="text-[8px] font-mono font-black text-sky-400 uppercase tracking-widest">
                        {lang === "fr" ? "Œuvres Originales d'Art Cartographique" : "لوحات فنية جدارية أصلية"}
                      </span>
                    </div>
                    <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                      {lang === "fr" ? "Nos Éditions de Villes" : "إصدارات المدن المغربية"}
                    </h4>
                    <p className="text-xs text-gray-500 font-light">
                      {lang === "fr"
                        ? "Sélectionnez un poster de notre collection pour l'afficher en haute résolution dans le cadre d'exposition."
                        : "اختر أحد الملصقات الفنية لمدننا لعرض تخطيطها الجغرافي الراقي فوراً وبدقة متناهية."}
                    </p>
                  </div>

                  {/* Gallery Cards */}
                  <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
                    {ORIGINAL_MAPS_GALLERY.map((p) => {
                      const isActive = selectedPoster.id === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => setSelectedPoster(p)}
                          className={`w-full p-4 rounded-2xl border text-left flex gap-4 transition-all relative overflow-hidden group ${
                            isActive 
                              ? "bg-sky-500/10 border-sky-400/80 shadow-lg shadow-sky-500/5 scale-[0.99]" 
                              : "bg-black/30 border-white/5 hover:border-white/10 hover:bg-black/45"
                          }`}
                        >
                          {/* Color preview chip */}
                          <div className="w-12 h-16 rounded-xl border border-white/10 overflow-hidden flex shrink-0 shadow-inner">
                            <div className="w-1/2 h-full" style={{ backgroundColor: p.theme.bg }} />
                            <div className="w-1/2 h-full animate-pulse" style={{ backgroundColor: p.theme.roads }} />
                          </div>

                          <div className="flex-grow space-y-1 relative z-10">
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-xs font-black uppercase tracking-wider text-white block">
                                {lang === "fr" ? p.titleFr : p.titleAr}
                              </span>
                              <span className="text-[8px] font-mono font-black uppercase tracking-widest bg-sky-500/10 border border-sky-400/20 px-2 py-0.5 rounded text-sky-400 shrink-0">
                                {p.badge}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-light leading-snug">
                              {lang === "fr" ? p.descFr : p.descAr}
                            </p>
                            <span className="text-[8px] font-mono text-gray-600 tracking-widest block">
                              {p.coords}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CHOOSE SIZES, FRAMING & PAPER FOR ORDER */}
                <div className="bg-slate-950/40 border border-white/5 rounded-[2.5rem] p-6 md:p-8 space-y-6 backdrop-blur-2xl">
                  <h4 className="text-sm font-black uppercase text-sky-400 tracking-wider">
                    {lang === "fr" ? "Options d'Impression Premium" : "خيارات التنسيق والطباعة الفاخرة"}
                  </h4>

                  {/* Size selector */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block">
                      {lang === "fr" ? "1. Dimensions du poster" : "1. مقاس اللوحة الفنية"}
                    </span>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl h-12 px-5 text-xs text-white focus:outline-none focus:border-sky-400"
                    >
                      {SIZES.map(s => (
                        <option key={s.id} value={s.id} className="bg-slate-900">
                          {s.label} — {s.price} MAD (~{convertToEUR(s.price)} €)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Framing options */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block">
                      {lang === "fr" ? "2. Type d'Encadrement en bois" : "2. نوع وتأطير إطار الخشب"}
                    </span>
                    <select
                      value={selectedFrame}
                      onChange={(e) => setSelectedFrame(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl h-12 px-5 text-xs text-white focus:outline-none focus:border-sky-400"
                    >
                      {FRAMES.map(f => (
                        <option key={f.id} value={f.id} className="bg-slate-900">
                          {lang === "fr" ? f.labelFr : f.labelAr} ({f.priceDesc})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Paper choice */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block">
                      {lang === "fr" ? "3. Type de Papier d'art" : "3. نوعية ورق الطباعة الفنية"}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PAPERS.map(p => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedPaper(p.id)}
                          className={`p-3.5 rounded-xl border text-left flex justify-between items-center transition-all ${
                            selectedPaper === p.id
                              ? "bg-sky-500/10 border-sky-400 text-sky-400"
                              : "bg-black/30 border-white/5 text-gray-400 hover:border-white/10"
                          }`}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                            {lang === "fr" ? p.labelFr : p.labelAr}
                          </span>
                          <Check size={12} className={selectedPaper === p.id ? "text-sky-400" : "opacity-0"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* LIVE PRICING BLOCK */}
                  <div className="bg-black/30 border border-white/5 p-5 rounded-2xl flex items-center justify-between text-left relative z-10">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">
                        {lang === "fr" ? "PRIX TOTAL ESTIMÉ" : "السعر الإجمالي للوحة"}
                      </span>
                      <div className="text-2xl font-black text-white">
                        {currentPrice} MAD
                        <span className="text-[11px] font-mono font-light text-gray-400 ml-2">~ {convertToEUR(currentPrice)} EUR</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 shrink-0">
                      <Button
                        onClick={handleExportPoster}
                        className="bg-white/5 hover:bg-white/10 text-white rounded-xl p-3 border border-white/10 flex items-center justify-center transition-transform hover:scale-105"
                        title={lang === "fr" ? "Exporter en HD" : "تصدير اللوحة بدقة عالية"}
                      >
                        <Download size={14} />
                      </Button>
                      <Button
                        onClick={handleAddToCart}
                        className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl py-3 px-5 font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-2 transition-transform hover:scale-105"
                      >
                        <ShoppingBag size={14} />
                        {lang === "fr" ? "AJOUTER" : "إضافة للسلة"}
                      </Button>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: INTERACTIVE POSTER PREVIEW */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              
              {/* DISPLAY RENDER CONTAINER */}
              <div className="relative w-full max-w-[420px] bg-slate-950 p-4 md:p-6 rounded-[2.5rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />
                
                {/* 3D-like poster depth frame shadow */}
                <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-[#000] border border-white/5 shadow-inner">
                  <canvas 
                    ref={canvasRef} 
                    className="w-full h-full object-contain transition-transform duration-500"
                  />
                </div>

                {/* Info Overlay badges on poster */}
                <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                    {lang === "fr" ? "APERÇU DE TIRAGE" : "معاينة الطباعة"}
                  </span>
                </div>

                <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5 pointer-events-none shadow-lg">
                  <span className="text-[8px] font-mono text-gray-400 uppercase tracking-wider">
                    {selectedSize} | {selectedFrame === "none" ? "Affiche Seule" : "Cadre Bois"}
                  </span>
                </div>
              </div>

              {/* BRAND DISCLOSURE / SUBTITLE */}
              <div className={`mt-6 text-center max-w-md space-y-2 text-gray-500`}>
                <div className="flex items-center justify-center gap-2 text-sky-400/80">
                  <Heart size={12} fill="currentColor" />
                  <span className="text-[9px] font-mono font-black uppercase tracking-wider">
                    {lang === "fr" ? "FINITION ET EXPÉDITION PROFESSIONNELLE" : "شحن وتأطير عالي الدقة"}
                  </span>
                </div>
                <p className="text-[10px] font-light leading-relaxed">
                  {lang === "fr"
                    ? "Toutes nos affiches d'art de Casablanca et d'autres cités sont tracées à l'aide de données vectorielles de précision par le cabinet ECARTTOP, puis imprimées sur papier d'art à Nador."
                    : "يتم تخطيط شوارع الدار البيضاء وكافة المدن المغربية بالاعتماد على بيانات طوبوغرافية وجيومكانية حقيقية عالية الدقة، لإنتاج تحفة فنية ممتازة تليق بمنازلكم ومكاتبكم."}
                </p>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* PERSISTENT SHOPPING CART PANEL */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[150] relative overflow-hidden">
            {/* Backdrop shadow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Cart slider container */}
            <div className="absolute inset-y-0 right-0 max-w-md w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="w-screen max-w-md bg-slate-900 border-l border-white/10 flex flex-col shadow-2xl relative"
              >
                {/* Header of cart */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="text-sky-400" size={18} />
                    <h3 className="text-lg font-black uppercase tracking-wider text-white">
                      {lang === "fr" ? "VOTRE PANIER" : "سلة مشترياتك"}
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-400 hover:text-white p-2 font-mono text-xs uppercase"
                  >
                    [ {lang === "fr" ? "Fermer" : "إغلاق"} ]
                  </button>
                </div>

                {/* Items in cart */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div key={item.id} className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-3 relative">
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="absolute top-4 right-4 text-gray-500 hover:text-red-400 p-1"
                          title="Supprimer"
                        >
                          <Trash2 size={14} />
                        </button>

                        <div className="space-y-1">
                          <span className="text-xs font-black uppercase tracking-widest text-sky-400 block">
                            AFFICHE {item.cityName}
                          </span>
                          <div className="text-[10px] font-mono text-gray-400 space-y-0.5">
                            <div>STYLE: <span className="text-white">{item.themeNameFr}</span></div>
                            <div>FORMAT: <span className="text-white">{item.size}</span></div>
                            <div>CADRE: <span className="text-white">{item.frame !== "none" ? item.frame : "Sans"}</span></div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-white/5">
                          {/* Quantity control */}
                          <div className="flex items-center bg-black/40 border border-white/10 rounded-lg overflow-hidden h-8">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              className="px-2.5 text-gray-400 hover:text-white hover:bg-white/5 h-full flex items-center justify-center"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="px-3 text-xs font-mono font-bold text-white">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="px-2.5 text-gray-400 hover:text-white hover:bg-white/5 h-full flex items-center justify-center"
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-mono font-black text-white">{item.price * item.quantity} MAD</span>
                            <span className="text-[9px] font-mono text-gray-500 block">~{convertToEUR(item.price * item.quantity)} EUR</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                      <ShoppingBag size={48} className="text-gray-700 animate-pulse" />
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-gray-400">
                          {lang === "fr" ? "Votre panier est vide" : "سلة التسوق فارغة حالياً"}
                        </p>
                        <p className="text-xs text-gray-600 max-w-xs font-light">
                          {lang === "fr"
                            ? "Ajoutez l'un de nos modèles de Casablanca prêts à livrer ou concevez-en un !"
                            : "اختر أحد اللوحات الجاهزة من الدار البيضاء لإضافتها للسلة وتأكيد الطلب."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer of cart with price calculations */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-white/10 bg-slate-950 space-y-4 relative z-10">
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-gray-500">
                        <span>{lang === "fr" ? "SOUS-TOTAL" : "المجموع"}</span>
                        <span className="text-white font-bold">{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)} MAD</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>{lang === "fr" ? "LIVRAISON ESTIMÉE" : "الشحن المتوقع"}</span>
                        <span className="text-emerald-400 font-bold">{lang === "fr" ? "Selon adresse" : "حسب العنوان"}</span>
                      </div>
                      <div className="flex justify-between text-base font-black text-white border-t border-white/5 pt-2">
                        <span>TOTAL</span>
                        <span>{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)} MAD</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        setIsCartOpen(false);
                        setCheckoutStep("checkout");
                      }}
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-2xl py-6 font-mono text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <CreditCard size={14} />
                      {lang === "fr" ? "PASSER LA COMMANDE" : "إتمام الشراء والدفع عند الاستلام"}
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
