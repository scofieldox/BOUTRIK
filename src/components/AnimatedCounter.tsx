import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ value, duration = 2, suffix = "", className = "" }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  
  // Triggers once the element scrolls into view with a small offset for better visibility
  const isInView = useInView(elementRef, { once: true, margin: "-50px 0px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
