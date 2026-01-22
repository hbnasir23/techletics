"use client"
import React, { useEffect, useRef } from 'react';

export default function Slider() {
  const sliderRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let position = 0;
    const speed = 2.0; // Adjust speed (lower = slower, smoother)

    const animate = () => {
      position -= speed;
      
      // Reset position when first set of items scrolls out
      if (Math.abs(position) >= slider.scrollWidth / 2) {
        position = 0;
      }
      
      slider.style.transform = `translateX(${position}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // const texts = ['28th 29th', 'January'];
  const texts = [
  'Event Dates:',
  '28th January, 2026 – Wednesday',
  '29th January, 2026 – Thursday',
  'Mark Your Calendars!',
];


  
  // Create multiple copies for seamless loop
  const items = Array(12).fill(texts).flat();

  return (
    <div className="w-full overflow-hidden bg-black relative h-24 md:h-32 flex items-center ">
      {/* Subtle grid overlay matching hero */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: `linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }} />
      
      {/* Cyan glow accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
      
      {/* Magenta glow accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-magenta-500/20 rounded-full blur-3xl" />
      
      <div
        ref={sliderRef}
        className="flex gap-8 md:gap-12 whitespace-nowrap will-change-transform relative z-10"
        style={{ width: 'max-content' }}
      >
        {items.map((text, index) => (
          <div
            key={index}
            className="inline-flex items-center justify-center px-4 md:px-8  py-2 md:py-4 text-xl md:text-5xl  font-bold"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent drop-shadow-lg"
                  style={{
                    WebkitTextStroke: '1px rgba(6,182,212,0.3)'
                  }}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}