import React from "react";

export function Logo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main Clapper Body */}
      <rect x="20" y="45" width="60" height="40" rx="4" fill="currentColor" fillOpacity="0.15" />
      <rect x="20" y="45" width="60" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
      
      {/* Top Clapper Bar (Hinged) */}
      <g transform="rotate(-10, 20, 45)">
        <rect x="20" y="32" width="60" height="10" rx="2" fill="currentColor" />
        {/* Stripes */}
        <path d="M25 32L35 42M40 32L50 42M55 32L65 42M70 32L80 42" stroke="white" strokeWidth="4" strokeOpacity="0.5" />
      </g>

      {/* Zipper Detail */}
      <path 
        d="M20 45H80M20 47H80" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeDasharray="2 2" 
        opacity="0.6" 
      />
      <rect x="16" y="42" width="8" height="6" rx="1" fill="currentColor" />
      <circle cx="14" cy="45" r="2" fill="currentColor" />

      {/* Play Button Triangle */}
      <path 
        d="M45 55L60 65L45 75V55Z" 
        fill="none" 
        stroke="var(--primary)" 
        strokeWidth="2.5" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}
