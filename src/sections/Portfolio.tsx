"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/data";
import { PortfolioItem } from "@/types";
import Lightbox from "@/components/Lightbox";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"films" | "photography">("films");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  // 3D Carousel State for Photography
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const wheelLock = useRef(false);
  const dragStart = useRef(0);
  const isDragging = useRef(false);

  // Group data by tab category media type
  const filmItems = PORTFOLIO_DATA.filter((item) => item.mediaType === "video");
  const photoItems = PORTFOLIO_DATA.filter((item) => item.mediaType === "image");

  // Track desktop screen limits
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Section title reveal staggered animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".works-title .reveal-char",
        { y: "110%", skewY: 5 },
        {
          y: "0%",
          skewY: 0,
          stagger: 0.02,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".works-title",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  // Carousel navigation handlers
  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % photoItems.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + photoItems.length) % photoItems.length);
  };

  // Keyboard navigation for carousel
  useEffect(() => {
    if (activeTab !== "photography") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, photoItems.length]);

  // Wheel slide triggers
  const handleWheel = (e: React.WheelEvent) => {
    if (activeTab !== "photography" || !isDesktop) return;
    if (wheelLock.current) return;

    if (Math.abs(e.deltaY) > 15) {
      wheelLock.current = true;
      if (e.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTimeout(() => {
        wheelLock.current = false;
      }, 650);
    }
  };

  // Drag physics tracking
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeTab !== "photography" || !isDesktop) return;
    dragStart.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const diff = e.clientX - dragStart.current;

    if (Math.abs(diff) > 75) {
      if (diff > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      isDragging.current = false;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleOpenLightbox = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsLightboxOpen(true);
  };

  const splitTextIntoChars = (text: string) => {
    return text.split("").map((char, idx) => (
      <span key={idx} className="inline-block overflow-hidden">
        <span className="inline-block reveal-char transform translate-y-[110%] select-none">
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      id="portfolio"
      className="relative w-full bg-brand-black py-24 border-t border-white/5 overflow-hidden select-none"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Dynamic header and Tabs selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-8 bg-brand-gold" />
              <h2 className="font-outfit text-xs font-bold tracking-[0.3em] text-brand-gold uppercase">
                SELECTED WORKS
              </h2>
            </div>
            <h3 className="works-title font-syne text-4xl lg:text-4xl font-extrabold text-white uppercase leading-none tracking-wide flex flex-wrap gap-x-[0.22em]">
              {activeTab === "films"
                ? splitTextIntoChars("Featured Films")
                : splitTextIntoChars("Photography")}
            </h3>
          </div>

          {/* Premium tabs switcher */}
          <div className="flex items-center gap-2 bg-brand-dark/60 p-1.5 rounded-full border border-white/10 max-w-max self-start md:self-auto">
            <button
              onClick={() => {
                setActiveTab("films");
                setCarouselIndex(0);
              }}
              className={cn(
                "px-6 py-2.5 rounded-full font-outfit text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-none",
                activeTab === "films"
                  ? "bg-brand-gold text-black shadow-lg shadow-brand-gold/10"
                  : "text-white/60 hover:text-white"
              )}
              data-magnetic
            >
              Featured Films
            </button>
            <button
              onClick={() => {
                setActiveTab("photography");
                setCarouselIndex(0);
              }}
              className={cn(
                "px-6 py-2.5 rounded-full font-outfit text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-none",
                activeTab === "photography"
                  ? "bg-brand-gold text-black shadow-lg shadow-brand-gold/10"
                  : "text-white/60 hover:text-white"
              )}
              data-magnetic
            >
              Photography
            </button>
          </div>
        </div>

        {/* Tab Content Orchestrator */}
        <AnimatePresence mode="wait">

          {/* TAB 1: FEATURED FILMS EXPERIENCE */}
          {activeTab === "films" && (
            <motion.div
              key="films-tab"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            >
              {filmItems.map((item, idx) => {
                const isHovered = hoveredVideoId === item.id;
                const paddedIndex = (idx + 1).toString().padStart(2, "0");

                return (
                  <div
                    key={item.id}
                    onClick={() => handleOpenLightbox(item)}
                    onMouseEnter={() => isDesktop && setHoveredVideoId(item.id)}
                    onMouseLeave={() => isDesktop && setHoveredVideoId(null)}
                    className="group relative bg-brand-dark/30 border border-white/5 rounded-2xl overflow-hidden cursor-none shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_50px_rgba(229,169,25,0.1)] transition-all duration-500 hover:border-brand-gold/30 aspect-video flex flex-col justify-end"
                    data-cursor="play"
                  >
                    {/* Media Container with Cinematic Scale */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <div
                        className={cn(
                          "w-full h-full transition-transform duration-750 ease-out",
                          isHovered ? "scale-[1.06]" : "scale-100"
                        )}
                      >
                        <video
                          src={item.mediaUrl}
                          ref={(el) => {
                            if (!isDesktop) return;
                            if (el) {
                              if (isHovered) {
                                el.play().catch(() => { });
                              } else {
                                el.pause();
                                el.currentTime = 0;
                              }
                            }
                          }}
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover brightness-[0.55] group-hover:brightness-[0.4] transition-all duration-500"
                        />
                      </div>
                    </div>

                    {/* Gradient Shadow Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-black/30 to-transparent pointer-events-none z-1" />

                    {/* Top Index Corner */}
                    <span className="absolute top-6 left-6 font-outfit text-4xl font-extrabold text-white/5 group-hover:text-brand-gold/15 transition-colors select-none tracking-tighter leading-none">
                      {paddedIndex}
                    </span>

                    {/* Metadata Overlay - Fades/Slides in on hover */}
                    <div
                      className={cn(
                        "relative z-10 p-6 md:p-8 flex flex-col gap-2 transition-all duration-500",
                        isDesktop
                          ? isHovered
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                          : "opacity-100 translate-y-0"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Play className="h-3 w-3 fill-brand-gold text-brand-gold animate-pulse" />
                        <span className="font-outfit text-[9px] font-bold tracking-[0.25em] text-brand-gold uppercase">
                          {item.categoryLabel}
                        </span>
                      </div>
                      <h4 className="font-syne text-lg md:text-xl font-extrabold text-white uppercase tracking-wide leading-tight">
                        {item.title}
                      </h4>
                      {item.client && (
                        <span className="font-inter text-xs text-brand-muted/75">
                          Client: {item.client}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* TAB 2: PHOTOGRAPHY EXPERIENCE (3D CAROUSEL) */}
          {activeTab === "photography" && (
            <motion.div
              key="photo-tab"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full min-h-[55vh] flex flex-col justify-center items-center py-8"
            >
              {/* Carousel Deck Container */}
              <div
                className="relative w-full max-w-5xl h-[45vh] flex items-center justify-center"
                style={{ perspective: "1000px" }}
              >
                {photoItems.map((item, idx) => {
                  const offset = idx - carouselIndex;
                  const isActive = offset === 0;
                  const isVisible = Math.abs(offset) <= 1;

                  // CSS 3D Rotations and Translations logic
                  let transformStyle = "scale(0.7) translateZ(-200px) rotateY(0deg) translateX(0px)";
                  let opacity = 0;
                  let zIndex = 0;

                  if (offset === 0) {
                    transformStyle = "scale(1) translateZ(0px) rotateY(0deg) translateX(0px)";
                    opacity = 1;
                    zIndex = 10;
                  } else if (offset === -1 || (carouselIndex === 0 && idx === photoItems.length - 1)) {
                    // Left element
                    transformStyle = "scale(0.84) translateZ(-110px) rotateY(20deg) translateX(-20%)";
                    opacity = 0.65;
                    zIndex = 5;
                  } else if (offset === 1 || (carouselIndex === photoItems.length - 1 && idx === 0)) {
                    // Right element
                    transformStyle = "scale(0.84) translateZ(-110px) rotateY(-20deg) translateX(20%)";
                    opacity = 0.65;
                    zIndex = 5;
                  }

                  return (
                    <div
                      key={item.id}
                      onClick={() => isActive ? handleOpenLightbox(item) : setCarouselIndex(idx)}
                      className={cn(
                        "absolute w-[70vw] md:w-[48vw] xl:w-[42vw] h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none",
                        isActive ? "cursor-none" : "cursor-pointer"
                      )}
                      style={{
                        transform: transformStyle,
                        opacity: isVisible ? opacity : 0,
                        zIndex: zIndex,
                        transformStyle: "preserve-3d",
                      }}
                      data-cursor={isActive ? "view" : "drag"}
                    >
                      <div className="absolute inset-0 w-full h-full relative">
                        <Image
                          src={item.mediaUrl}
                          alt={item.title}
                          fill
                          className={cn(
                            "object-cover brightness-[0.65] transition-all duration-700",
                            isActive ? "brightness-[0.75]" : "brightness-[0.4]"
                          )}
                          sizes="(max-width: 768px) 70vw, 40vw"
                          priority
                        />
                      </div>

                      {/* Ambient Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none z-1" />

                      {/* Title overlay for center active element */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.35, delay: 0.2 }}
                            className="absolute bottom-6 left-6 right-6 z-10 flex flex-col gap-1"
                          >
                            <span className="font-outfit text-[9px] font-bold tracking-[0.25em] text-brand-gold uppercase">
                              {item.categoryLabel}
                            </span>
                            <h4 className="font-syne text-lg md:text-xl font-extrabold text-white uppercase leading-none tracking-wide">
                              {item.title}
                            </h4>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Arrows & Indicator controls */}
              <div className="flex items-center gap-6 mt-12 z-20">
                <button
                  onClick={prevSlide}
                  className="p-3.5 rounded-full border border-white/10 bg-white/5 text-white hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all duration-300 cursor-none"
                  data-magnetic
                  aria-label="Previous Slide"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                {/* Horizontal Slider dot tags */}
                <div className="flex items-center gap-2">
                  {photoItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselIndex(idx)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500 cursor-none",
                        idx === carouselIndex ? "w-8 bg-brand-gold" : "w-2 bg-white/20"
                      )}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-3.5 rounded-full border border-white/10 bg-white/5 text-white hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all duration-300 cursor-none"
                  data-magnetic
                  aria-label="Next Slide"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Fullscreen Video/Image Details Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}
