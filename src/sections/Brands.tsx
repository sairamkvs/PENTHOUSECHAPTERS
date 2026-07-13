"use client";

import { BRANDS_DATA } from "@/constants/data";

export default function Brands() {
  // Double list to create a seamless looping marquee
  const doubleBrands = [...BRANDS_DATA, ...BRANDS_DATA, ...BRANDS_DATA];

  return (
    <section
      id="brands"
      className="relative w-full bg-brand-black py-16 md:py-24 border-t border-white/5 overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h4 className="font-outfit text-[10px] md:text-xs font-bold tracking-[0.25em] text-brand-muted/70 uppercase">
          BRANDS WE HAVE WORKED WITH
        </h4>
      </div>

      {/* Infinite loop marquee wrapper */}
      <div className="relative w-full overflow-hidden py-4 flex items-center select-none">
        
        {/* Left Side Shadow Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none" />
        
        {/* Right Side Shadow Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none" />

        {/* Moving track */}
        <div className="flex gap-16 md:gap-24 whitespace-nowrap animate-marquee shrink-0 w-max">
          {doubleBrands.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex items-center justify-center cursor-none group"
              data-cursor="hover"
            >
              <span className="font-syne text-xl sm:text-2xl md:text-4xl font-extrabold tracking-widest text-white/20 group-hover:text-brand-gold group-hover:scale-105 transition-all duration-300 uppercase">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
