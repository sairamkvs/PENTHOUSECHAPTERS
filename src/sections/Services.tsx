"use client";

import { useEffect, useRef } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES_DATA } from "@/constants/data";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  // Mobile accordion state
  const [activeAccordion, setActiveAccordion] = useState<string | null>("commercial-films");
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run horizontal scroll pin on desktop screens
    if (typeof window === "undefined" || !window.matchMedia("(min-width: 1024px)").matches) return;

    const ctx = gsap.context(() => {
      const track = desktopTrackRef.current;
      const container = desktopContainerRef.current;
      if (!track || !container) return;

      // Pinned horizontal track animation
      const scrollWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      const horizontalScrollLength = scrollWidth - windowWidth;

      const horizontalTween = gsap.to(track, {
        x: -horizontalScrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${horizontalScrollLength}`,
          invalidateOnRefresh: true,
        },
      });

      // Parallax effect on horizontal service images (shifts relative to parent scroll)
      const images = gsap.utils.toArray(".service-horizontal-media-box");
      images.forEach((img: any) => {
        gsap.fromTo(
          img,
          { x: "-10%" },
          {
            x: "10%",
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".service-horizontal-panel"),
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      // Staggered letters or content reveals
      const textBlocks = gsap.utils.toArray(".service-horizontal-text");
      textBlocks.forEach((text: any) => {
        gsap.fromTo(
          text,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: text.closest(".service-horizontal-panel"),
              containerAnimation: horizontalTween,
              start: "left 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, desktopContainerRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  const getBgLightingClass = () => {
    if (hoveredServiceId === "commercial-films") return "top-[10%] left-[20%] bg-brand-gold/10";
    if (hoveredServiceId === "corporate-films") return "top-[40%] left-[30%] bg-amber-500/10";
    if (hoveredServiceId === "brand-films") return "top-[20%] left-[50%] bg-purple-900/10";
    if (hoveredServiceId === "product-films") return "top-[50%] left-[40%] bg-blue-900/10";
    if (hoveredServiceId === "social-media") return "top-[10%] left-[60%] bg-red-900/10";
    if (hoveredServiceId === "photography") return "top-[60%] left-[20%] bg-amber-600/10";
    if (hoveredServiceId === "immersive") return "top-[30%] left-[70%] bg-emerald-900/10";
    if (hoveredServiceId === "aerial") return "top-[20%] left-[40%] bg-teal-900/10";
    if (hoveredServiceId === "post") return "top-[50%] left-[80%] bg-brand-gold/10";
    return "top-1/4 right-0 bg-brand-gold/5";
  };

  return (
    <>
      {/* ========================================== */}
      {/* 1. DESKTOP LAYOUT (Horizontal Scroll Pin)  */}
      {/* ========================================== */}
      <section
        ref={desktopContainerRef}
        id="services-desktop"
        className="relative hidden lg:block h-screen bg-brand-black overflow-hidden select-none"
        data-cursor="scroll"
      >
        {/* Background ambient lighting */}
        <div className={cn("absolute h-[500px] w-[500px] rounded-full blur-[130px] pointer-events-none z-0 transition-all duration-1000 ease-out", getBgLightingClass())} />

        <div ref={desktopTrackRef} className="flex h-full w-max flex-row items-center relative z-10">
          
          {/* Panel 0: Title Panel */}
          <div className="service-horizontal-panel w-screen h-screen flex flex-col justify-center px-24 shrink-0 border-r border-white/5 bg-brand-black relative">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[1px] w-8 bg-brand-gold" />
                <h2 className="font-outfit text-xs font-bold tracking-[0.3em] text-brand-gold uppercase">
                  OUR SERVICES
                </h2>
              </div>
              
              <h3 className="font-syne text-5xl xl:text-6xl font-extrabold text-white mb-6 uppercase leading-tight">
                Cinematic Excellence For Every Medium
              </h3>
              
              <p className="font-inter text-base text-brand-muted leading-relaxed mb-8">
                We deliver high-end visuals and tailored marketing assets designed to capture interest, build trust, and drive engagement across digital platforms, broadcast channels, and spatial environments.
              </p>

              <div className="flex items-center gap-2 text-brand-gold/60 font-outfit text-xs font-bold tracking-widest uppercase">
                SCROLL DOWN TO EXPLORE
                <ArrowRight className="h-4 w-4 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Panels 1-9: Services Panels */}
          {SERVICES_DATA.map((service, idx) => {
            const isHovered = hoveredServiceId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredServiceId(service.id)}
                onMouseLeave={() => setHoveredServiceId(null)}
                className="service-horizontal-panel w-screen h-screen flex items-center justify-between px-24 shrink-0 border-r border-white/5 bg-brand-black"
              >
                <div className="grid grid-cols-12 gap-16 items-center w-full">
                  
                  {/* Left Side: Copy */}
                  <div className="col-span-5 service-horizontal-text">
                    <div className={cn(
                      "font-outfit text-5xl xl:text-6xl font-extrabold tracking-wider mb-4 transition-all duration-500",
                      isHovered ? "text-brand-gold drop-shadow-[0_0_15px_rgba(229,169,25,0.5)]" : "text-brand-gold/20"
                    )}>
                      {(idx + 1).toString().padStart(2, "0")}
                    </div>
                    
                    <h4 className={cn(
                      "font-syne text-3xl xl:text-4xl font-extrabold uppercase mb-6 tracking-wide transition-all duration-500",
                      isHovered ? "text-brand-gold translate-x-2" : "text-white"
                    )}>
                      {service.title}
                    </h4>
                  
                  <p className="font-inter text-sm xl:text-base text-brand-muted leading-relaxed mb-8 max-w-md whitespace-normal">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 max-w-md">
                    {service.details?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 font-outfit text-[10px] xl:text-xs font-semibold tracking-wider text-white whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Media Container (Parallax) */}
                <div className="col-span-7 h-[55vh] rounded-xl overflow-hidden border border-white/10 relative shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  <div className="service-horizontal-media-box absolute inset-x-[-15%] inset-y-0 w-[130%] h-full">
                    {service.mediaUrl?.endsWith(".mp4") ? (
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
                  {/* Subtle vignette frame overlay */}
                  <div className="absolute inset-0 border border-brand-gold/10 pointer-events-none rounded-xl" />
                </div>

              </div>
            </div>
          );
        })}

        </div>
      </section>

      {/* ========================================== */}
      {/* 2. MOBILE LAYOUT (Vertical Accordion List) */}
      {/* ========================================== */}
      <section
        id="services-mobile"
        className="relative block lg:hidden w-full bg-brand-black px-6 py-24 border-t border-white/5 overflow-hidden"
      >
        <div className="absolute top-1/4 right-0 h-[300px] w-[300px] rounded-full bg-brand-gold/5 blur-[100px] pointer-events-none" />

        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-6 bg-brand-gold" />
            <h2 className="font-outfit text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase">
              OUR SERVICES
            </h2>
          </div>
          
          <h3 className="font-syne text-2xl font-extrabold text-white mb-6 uppercase leading-tight">
            Cinematic Excellence For Every Medium
          </h3>
          
          <p className="font-inter text-xs text-brand-muted leading-relaxed mb-12">
            We deliver high-end visuals and tailored marketing assets designed to capture interest, build trust, and drive engagement across digital platforms.
          </p>

          <div className="flex flex-col gap-4">
            {SERVICES_DATA.map((service) => {
              const isExpanded = activeAccordion === service.id;
              
              return (
                <div
                  key={service.id}
                  className={cn(
                    "border-b border-white/10 pb-4 transition-all duration-300",
                    isExpanded ? "border-brand-gold/30" : "hover:border-white/20"
                  )}
                >
                  <button
                    onClick={() => toggleAccordion(service.id)}
                    className="w-full flex items-center justify-between text-left py-3 focus:outline-none group"
                  >
                    <span className="font-syne text-lg font-bold text-white group-hover:text-brand-gold transition-colors uppercase tracking-wide">
                      {service.title}
                    </span>
                    <div className="p-1.5 rounded-full border border-white/15 bg-white/5 text-white">
                      {isExpanded ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 flex flex-col gap-4">
                          <p className="font-inter text-xs text-brand-muted leading-relaxed">
                            {service.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-1.5">
                            {service.details?.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 font-outfit text-[9px] font-semibold tracking-wider text-white"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {service.mediaUrl && (
                            <div className="w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-brand-black shadow-lg">
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
      </section>
    </>
  );
}
