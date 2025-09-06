import React from "react";

interface StarIconProps {
  className?: string;
}

export const StarIcon: React.FC<StarIconProps> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 512 512" 
      fill="currentColor" 
      className={className}
    >
      {/* Custom star path with more pronounced points for better neon effect */}
      <defs>
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00e1ff" />
          <stop offset="50%" stopColor="#bf00ff" />
          <stop offset="100%" stopColor="#ff00e6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Glow base */}
      <path 
        d="M256 12.5l70.7 143.3c1.4 2.8 4.1 4.8 7.2 5.3l158.1 23c7.9 1.2 11.1 10.8 5.4 16.4L374.2 321.2c-2.3 2.2-3.3 5.4-2.8 8.5l27 157.6c1.3 7.9-6.9 13.9-14 10.2L256 415.7l-128.4 67.5c-7.1 3.7-15.3-2.3-14-10.2l27-157.6c0.5-3.1-0.5-6.3-2.8-8.5L14.6 186.2c-5.7-5.6-2.5-15.2 5.4-16.4l158.1-23c3.1-0.5 5.8-2.4 7.2-5.3L256 12.5z" 
        fill="url(#starGradient)" 
        filter="url(#glow)"
      />
      
      {/* Main star */}
      <path 
        d="M256 12.5l70.7 143.3c1.4 2.8 4.1 4.8 7.2 5.3l158.1 23c7.9 1.2 11.1 10.8 5.4 16.4L374.2 321.2c-2.3 2.2-3.3 5.4-2.8 8.5l27 157.6c1.3 7.9-6.9 13.9-14 10.2L256 415.7l-128.4 67.5c-7.1 3.7-15.3-2.3-14-10.2l27-157.6c0.5-3.1-0.5-6.3-2.8-8.5L14.6 186.2c-5.7-5.6-2.5-15.2 5.4-16.4l158.1-23c3.1-0.5 5.8-2.4 7.2-5.3L256 12.5z" 
        fill="url(#starGradient)" 
      />
    </svg>
  );
};