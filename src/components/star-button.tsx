import React from "react";
import { motion } from "framer-motion";
import { StarIcon } from "./star-icon";

interface StarButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const StarButton: React.FC<StarButtonProps> = ({ onClick, disabled = false }) => {
  const [isPressed, setIsPressed] = React.useState(false);
  
  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };
  
  const handleMouseUp = () => {
    if (!disabled) {
      setIsPressed(false);
      onClick();
    }
  };
  
  const handleTouchStart = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };
  
  const handleTouchEnd = () => {
    if (!disabled) {
      setIsPressed(false);
      onClick();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 5 }}
      whileTap={{ scale: 0.92, rotate: -5 }}
      animate={isPressed 
        ? { scale: 0.92, rotate: -5 } 
        : { 
            scale: [1, 1.03, 1],
            rotate: [0, 2, 0, -2, 0],
            transition: { 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
      }
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`relative cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'star-pulse'}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-48 h-48 md:w-64 md:h-64">
        <StarIcon className="w-full h-full neon-glow" />
        
        {/* Enhanced glow effect */}
        <div className="absolute inset-0 star-gradient opacity-40 blur-2xl -z-10 animate-pulse"></div>
        
        {/* Inner glow */}
        <div className="absolute inset-4 bg-white opacity-10 blur-md -z-5 rounded-full"></div>
        
        {/* Click ripple effect */}
        {isPressed && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.7 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 star-gradient rounded-full -z-10"
          ></motion.div>
        )}
      </div>
    </motion.div>
  );
};