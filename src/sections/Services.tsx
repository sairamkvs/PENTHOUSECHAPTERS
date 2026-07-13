"use client";

import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { SERVICES_DATA } from "@/constants/data";
import { ServiceItem } from "@/types";
import { cn } from "@/lib/utils";

export default function Services() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>("commercial-films");
  const [hoveredService, setHoveredService] = useState<ServiceItem | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for smooth cursor-following media previews on desktop
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 250, damping: 30 });
  const springY = useSpring(y, { stiffness: 250, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleMouseEnter = (service: ServiceItem) => {
    // Only activate cursor preview on desktop (hover capable)
    if (window.matchMedia("(hover: hover)").matches) {
      setHoveredService(service);
    }
  };

  const handleMouseLeave = () => {
    setHoveredService(null);
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={containerRef}
      id="services"
      onMouseMove={handleMouseMove}
      className="relative w-full bg-brand-black px-6 md:px-12 py-24 md:py-36 border-t border-white/5 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none" />

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Sticky Left Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:h-fit">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-8 bg-brand-gold" />
            <h2 className="font-outfit text-xs font-bold tracking-[0.3em] text-brand-gold uppercase">
              OUR SERVICES
            </h2>
          </div>
          
          <h3 className="font-syne text-3xl md:text-5xl font-extrabold text-white mb-6 uppercase leading-tight">
            Cinematic Excellence For Every Medium
          </h3>
          
          <p className="font-inter text-sm md:text-base text-brand-muted leading-relaxed max-w-md">
            We deliver high-end visuals and tailored marketing assets designed to capture interest, build trust, and drive engagement across digital platforms, broadcast channels, and spatial environments.
          </p>
        </div>

        {/* Accordion List Right Column */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {SERVICES_DATA.map((service) => {
            const isExpanded = activeAccordion === service.id;
            
            return (
              <div
                key={service.id}
                onMouseEnter={() => handleMouseEnter(service)}
                onMouseLeave={handleMouseLeave}
                className={cn(
                  "border-b border-white/10 pb-6 transition-all duration-300",
                  isExpanded ? "border-brand-gold/30" : "hover:border-white/20"
                )}
              >
                {/* Header Link */}
                <button
                  onClick={() => toggleAccordion(service.id)}
                  className="w-full flex items-center justify-between text-left py-4 focus:outline-none group cursor-none"
                  data-cursor="hover"
                >
                  <span className="font-syne text-xl sm:text-2xl font-bold text-white group-hover:text-brand-gold transition-colors uppercase tracking-wide">
                    {service.title}
                  </span>
                  <div className="p-2 rounded-full border border-white/15 bg-white/5 group-hover:border-brand-gold group-hover:bg-brand-gold/10 text-white group-hover:text-brand-gold transition-colors">
                    {isExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                {/* Collapsible Details Body */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 flex flex-col md:flex-row gap-6 md:gap-12 items-start justify-between">
                        <div className="flex-1">
                          <p className="font-inter text-sm md:text-base text-brand-muted leading-relaxed mb-6">
                            {service.description}
                          </p>
                          
                          {/* Deliverable Tags */}
                          <div className="flex flex-wrap gap-2">
                            {service.details?.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 rounded-full border border-white/10 bg-white/5 font-outfit text-[10px] md:text-xs font-semibold tracking-wider text-white"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Inline Video Preview for Mobile */}
                        {service.mediaUrl && (
                          <div className="w-full md:hidden aspect-video rounded-lg overflow-hidden border border-white/10 bg-brand-black shadow-lg">
                            {service.mediaUrl.endsWith(".mp4") ? (
                              <video
                                src={service.mediaUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={service.mediaUrl}
                                alt={service.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Floating Follow Cursor Media Preview */}
      <AnimatePresence>
        {hoveredService && hoveredService.mediaUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            style={{
              x: springX,
              y: springY,
              left: -150, // offset half card width
              top: -240, // offset card height
            }}
            className="absolute pointer-events-none z-30 hidden lg:block w-[320px] aspect-[4/3] rounded-lg overflow-hidden border border-white/15 bg-brand-black shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
          >
            <div className="w-full h-full relative">
              {hoveredService.mediaUrl.endsWith(".mp4") ? (
                <video
                  src={hoveredService.mediaUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={hoveredService.mediaUrl}
                  alt={hoveredService.title}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Inner glowing edge */}
              <div className="absolute inset-0 border border-brand-gold/10 pointer-events-none rounded-lg" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
