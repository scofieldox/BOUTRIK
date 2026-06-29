import { useState, useMemo } from "react";

interface UseMarqueeSpeedOptions {
  normalDuration?: number; // in seconds
  slowedDuration?: number; // in seconds
}

export function useMarqueeSpeed({
  normalDuration = 40,
  slowedDuration = 160,
}: UseMarqueeSpeedOptions = {}) {
  const [isHovered, setIsHovered] = useState(false);

  const style = useMemo(() => {
    const duration = isHovered ? slowedDuration : normalDuration;
    return {
      "--marquee-duration": `${duration}s`,
    } as React.CSSProperties;
  }, [isHovered, normalDuration, slowedDuration]);

  const marqueeProps = useMemo(() => {
    return {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    };
  }, []);

  return {
    isHovered,
    style,
    marqueeProps,
  };
}
