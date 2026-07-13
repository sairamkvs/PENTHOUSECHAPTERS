"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/constants/data";
import { PortfolioItem } from "@/types";
import Lightbox from "@/components/Lightbox";
import { cn } from "@/lib/utils";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const FILTERS = [
  { label: "All Work", value: "all" },
  { label: "Films", value: "films" },
  { label: "Corporate", value: "corporate" },
  { label: "Photography", value: "photography" },
  { label: "360° Immersive", value: "immersive" },
  { label: "Aerial", value: "aerial" },
  { label: "Post Production", value: "post" }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Filter items
  const filteredItems = PORTFOLIO_DATA.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  // Track responsive screen state
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP Horizontal Scroll Setup
  useEffect(() => {
    // Only configure horizontal scroll on desktop and if we have filtered items
    if (!isDesktop || !containerRef.current || !trackRef.current) return;

    // Small delay to let DOM render completely and compute exact scroll widths
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const totalScrollWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalScrollWidth - viewportWidth;

      if (scrollDistance <= 0) return;

      // Pin the section and translate the track left
      const pinTrigger = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 0.8,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            invalidateOnRefresh: true,
            // Track progress for parallax styling
            onUpdate: (self) => {
              // Apply horizontal parallax mapping on background elements
              const parallaxEls = track.querySelectorAll(".parallax-media");
              parallaxEls.forEach((el: any) => {
                // Shift media in the opposite direction of scroll progress
                gsap.set(el, { x: (self.progress * 80) - 40 });
              });
            }
          }
        }
      );

      // Clean up on component toggle or filter updates
      return () => {
        pinTrigger.scrollTrigger?.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [isDesktop, activeFilter, filteredItems.length]);

  // Refresh ScrollTrigger whenever active items filter changes
  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  }, [activeFilter, isDesktop]);

  // 3D Card Tilt logic using GSAP
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((centerY - y) / centerY) * 8; // slight 3D rotation
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.3
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    
    // Reset video autoplay on mouse leave
    const video = card.querySelector("video");
    if (video) {
      try {
        video.currentTime = 0;
      } catch (e) {}
    }

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 0.5
    });
  };

  const handleOpenLightbox = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsLightboxOpen(true);
  };

  return (
    <div ref={containerRef} id="portfolio" className="relative w-full bg-brand-black overflow-hidden select-none">
      
      {/* 1. DESKTOP IMPLEMENTATION (Horizontal Scroll Track) */}
      {isDesktop ? (
        <div className="min-h-screen w-full flex flex-col justify-center py-20 px-12 relative">
          
          {/* Section Header elements absolute-to-track layout */}
          <div className="max-w-7xl w-full mx-auto flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[1px] w-8 bg-brand-gold" />
                <h2 className="font-outfit text-xs font-bold tracking-[0.3em] text-brand-gold uppercase">
                  OUR PORTFOLIO
                </h2>
              </div>
              <h3 className="font-syne text-4xl lg:text-5xl font-extrabold text-white uppercase leading-tight">
                Selected Projects
              </h3>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 max-w-[60%]">
              {FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={cn(
                    "px-4 py-2 rounded-full font-outfit text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border focus:outline-none cursor-none",
                    activeFilter === filter.value
                      ? "bg-brand-gold border-brand-gold text-black shadow-md shadow-brand-gold/10"
                      : "border-white/10 hover:border-white/30 text-white/80"
                  )}
                  data-cursor="hover"
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal Track Wrapper */}
          <div className="relative w-full h-[62vh]">
            <div 
              ref={trackRef} 
              className="absolute left-0 top-0 flex gap-8 whitespace-nowrap px-12 h-full items-center shrink-0 w-max"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => {
                  const isVideo = item.mediaType === "video";
                  const paddedIndex = (index + 1).toString().padStart(2, "0");

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleOpenLightbox(item)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      className={cn(
                        "group relative bg-brand-dark/40 border border-white/5 rounded-2xl overflow-hidden cursor-none shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(229,169,25,0.1)] transition-all duration-500 hover:border-brand-gold/30 flex flex-col justify-end p-8 select-none",
                        item.aspectRatio === "portrait" ? "w-[30vw] h-[58vh]" : "w-[44vw] h-[58vh]"
                      )}
                      style={{ transformStyle: "preserve-3d" }}
                      data-cursor={isVideo ? "play" : "view"}
                    >
                      {/* Media container with parallax spacing */}
                      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                        <div className="parallax-media absolute -inset-x-12 inset-y-0 w-[calc(100%+96px)] h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                          {isVideo ? (
                            <video
                              src={item.mediaUrl}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover brightness-[0.55] group-hover:brightness-[0.4]"
                            />
                          ) : (
                            <Image
                              src={item.mediaUrl}
                              alt={item.title}
                              fill
                              className="object-cover brightness-[0.55] group-hover:brightness-[0.4]"
                              sizes="40vw"
                              priority
                            />
                          )}
                        </div>
                      </div>

                      {/* Top Corner Index */}
                      <span 
                        className="absolute top-8 left-8 font-outfit text-5xl font-extrabold text-white/10 group-hover:text-brand-gold/25 transition-colors select-none tracking-tighter"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        {paddedIndex}
                      </span>

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent pointer-events-none z-10" />

                      {/* Title Info */}
                      <div 
                        className="relative z-20 pointer-events-none select-none"
                        style={{ transform: "translateZ(40px)" }}
                      >
                        <span className="font-outfit text-[10px] font-bold tracking-[0.2em] text-brand-gold uppercase block mb-1.5">
                          {item.categoryLabel}
                        </span>
                        <h4 className="font-syne text-xl lg:text-2xl font-bold text-white uppercase group-hover:text-brand-gold transition-colors leading-tight whitespace-normal max-w-lg">
                          {item.title}
                        </h4>
                        <p className="font-inter text-xs text-brand-muted max-w-sm mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        /* 2. MOBILE IMPLEMENTATION (Responsive Stacked Grid) */
        <div className="w-full px-6 py-20 border-t border-white/5">
          <div className="flex flex-col gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[1px] w-8 bg-brand-gold" />
                <h2 className="font-outfit text-xs font-bold tracking-[0.3em] text-brand-gold uppercase">
                  OUR PORTFOLIO
                </h2>
              </div>
              <h3 className="font-syne text-3xl font-extrabold text-white uppercase leading-tight">
                Selected Projects
              </h3>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5 w-full">
              {FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={cn(
                    "px-3 py-1.5 rounded-full font-outfit text-[9px] font-bold uppercase tracking-wider transition-all duration-300 border focus:outline-none",
                    activeFilter === filter.value
                      ? "bg-brand-gold border-brand-gold text-black"
                      : "border-white/10 text-white/80"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Simple stacked list grid */}
          <div className="flex flex-col gap-6 w-full">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const isVideo = item.mediaType === "video";
                
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => handleOpenLightbox(item)}
                    className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/5 flex flex-col justify-end p-5 shadow-lg active:scale-[0.98] transition-transform duration-200"
                  >
                    <div className="absolute inset-0 z-0">
                      {isVideo ? (
                        <video
                          src={item.mediaUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover brightness-[0.55]"
                        />
                      ) : (
                        <Image
                          src={item.mediaUrl}
                          alt={item.title}
                          fill
                          className="object-cover brightness-[0.55]"
                          sizes="100vw"
                        />
                      )}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />

                    <div className="relative z-20 pointer-events-none">
                      <span className="font-outfit text-[9px] font-bold tracking-widest text-brand-gold uppercase block mb-1">
                        {item.categoryLabel}
                      </span>
                      <h4 className="font-syne text-base font-bold text-white uppercase leading-tight">
                        {item.title}
                      </h4>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Fullscreen Video/Image Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        mediaType={selectedItem?.mediaType || "image"}
        mediaUrl={selectedItem?.mediaUrl || ""}
        title={selectedItem?.title || ""}
      />
    </div>
  );
}
