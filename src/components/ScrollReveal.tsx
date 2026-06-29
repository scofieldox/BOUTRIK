import React from "react";
import { motion } from "motion/react";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: "fadeIn" | "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scaleUp" | "staggerContainer";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  staggerChildrenDelay?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  once = true,
  className = "",
  staggerChildrenDelay = 0.1,
}) => {
  const getVariants = () => {
    switch (variant) {
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case "fadeUp":
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        };
      case "fadeDown":
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        };
      case "fadeLeft":
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        };
      case "fadeRight":
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        };
      case "scaleUp":
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 },
        };
      case "staggerContainer":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerChildrenDelay,
              delayChildren: delay,
            },
          },
        };
      default:
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const isStagger = variant === "staggerContainer";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={getVariants()}
      transition={
        isStagger
          ? undefined
          : {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1], // Custom premium ease-out cubic/expo curve
            }
      }
      className={className}
    >
      {isStagger
        ? React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return (
                <motion.div
                  variants={itemVariants}
                  transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
                >
                  {child}
                </motion.div>
              );
            }
            return child;
          })
        : children}
    </motion.div>
  );
};
