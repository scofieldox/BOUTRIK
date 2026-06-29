import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CursorTracker() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Set up Motion Values for performance (prevents React re-renders on mousemove)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the background ambient glow (slower, floating feel)
  const glowX = useSpring(mouseX, { stiffness: 50, damping: 28, mass: 0.6 });
  const glowY = useSpring(mouseY, { stiffness: 50, damping: 28, mass: 0.6 });

  // Tight springs for the high-precision laser-target pointer (snappy, accurate feel)
  const pointerX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const pointerY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    // Disable on devices with touch capabilities as primary input (no hover)
    const hasTouch = window.matchMedia("(pointer: coarse)").matches;
    if (hasTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Event delegation to detect hovering over interactive elements (buttons, links, inputs, clickables)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.closest(".cursor-pointer") !== null ||
        target.getAttribute("role") === "button";

      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Large Ambient Background Follow-Along Glow (behind everything) */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" // Contain inside viewport boundaries
        }}
      >
        <motion.div
          className="absolute rounded-full pointer-events-none mix-blend-screen"
          style={{
            x: glowX,
            y: glowY,
            translateX: "-50%",
            translateY: "-50%",
            width: isHovered ? "450px" : "380px",
            height: isHovered ? "450px" : "380px",
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, rgba(14, 165, 233, 0.02) 45%, rgba(0, 0, 0, 0) 70%)",
            filter: "blur(40px)",
            transition: "width 0.4s ease, height 0.4s ease"
          }}
        />
      </motion.div>

      {/* 2. Precision Survey/Geodetic Laser Target Pointer (above all content) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: pointerX,
          y: pointerY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      >
        {/* Core Laser Dot */}
        <motion.div
          className="absolute w-1.5 h-1.5 bg-sky-400 rounded-full"
          animate={{
            scale: isHovered ? 1.6 : 1,
            backgroundColor: isHovered ? "#38bdf8" : "#0ea5e9"
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Optical Survey Target Reticle (Thin outer ring) */}
        <motion.div
          className="absolute -inset-[10px] border border-sky-500/30 rounded-full flex items-center justify-center"
          animate={{
            scale: isHovered ? 1.4 : 1,
            borderColor: isHovered ? "rgba(56, 189, 248, 0.6)" : "rgba(14, 165, 233, 0.3)"
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Micro crosshair ticks for geodetic instruments look */}
          <div className="absolute w-1 h-[1px] bg-sky-400/50 left-0" />
          <div className="absolute w-1 h-[1px] bg-sky-400/50 right-0" />
          <div className="absolute w-[1px] h-1 bg-sky-400/50 top-0" />
          <div className="absolute w-[1px] h-1 bg-sky-400/50 bottom-0" />
        </motion.div>
      </motion.div>
    </>
  );
}
