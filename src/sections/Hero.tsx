"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Play } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { BRAND_TAGLINE, BRAND_MISSION } from "@/constants/data";
import { useMagnetic } from "@/hooks/useMagnetic";

interface HeroProps {
  isLoaded?: boolean;
}

export default function Hero({ isLoaded = false }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Magnetic refs for buttons
  const contactCtaRef = useMagnetic(0.3);
  const portfolioCtaRef = useMagnetic(0.3);

  // Motion values for spring mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Programmatically unmute background video once preloader finishes and mounts
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct browser unlock attempt
    video.muted = false;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback to muted autoplay if browser blocks audio
        video.muted = true;
        video.play();
      });
    }
  }, [isLoaded]);

  const springConfig = { damping: 40, stiffness: 200, mass: 1 };
  const gridX = useSpring(mouseX, springConfig);
  const gridY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Handle mouse movement for parallax grid
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Normalize values from -25px to 25px translation range
      const xOffset = ((clientX / width) - 0.5) * 50;
      const yOffset = ((clientY / height) - 0.5) * 50;

      mouseX.set(xOffset);
      mouseY.set(yOffset);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Entrance animation triggered when preloader finishes and page sets isLoaded
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.4 }); // Stagger starting slightly after preloader wipes out

      // 1. Reveal Tagline
      tl.fromTo(
        ".hero-tagline",
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      );

      // 2. Reveal Title (Slide up from mask containers)
      tl.fromTo(
        ".hero-title-line span",
        { y: "110%" },
        { y: "0%", duration: 1.2, ease: "power4.out", stagger: 0.15 },
        "-=0.5"
      );

      // 3. Reveal Subtitle / Mission
      tl.fromTo(
        ".hero-mission",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.6"
      );

      // 4. Reveal CTAs
      tl.fromTo(
        ".hero-cta-button",
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const handleScrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-black px-6 md:px-12 py-32"
    >
      {/* 1. Animated Gradient Mesh (Blur Spheres) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, -60, 0],
            y: [0, -100, 80, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-brand-gold/15 blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{
            x: [0, -90, 70, 0],
            y: [0, 80, -120, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/4 -right-1/4 h-[700px] w-[700px] rounded-full bg-purple-900/15 blur-[130px] mix-blend-screen"
        />
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, 70, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/3 h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[100px] mix-blend-screen"
        />
      </div>

      {/* Background Cinematic Video (Logo Reveal.mov) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {isLoaded && (
          <video
            ref={videoRef}
            src="/Logo Reveal.mov"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain md:object-cover opacity-80"
          />
        )}
        {/* Lighter overlay to ensure video is visible but text is readable */}
        <div className="absolute inset-0 bg-brand-black/25" />
      </div>

      {/* 2. Light Rays / Radial Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,#060606_80%)] pointer-events-none" />

      {/* 3. Parallax Grid Background */}
      <motion.div
        style={{ x: gridX, y: gridY }}
        className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40 pointer-events-none"
      />

      {/* 4. Noise texture overlay */}
      <div className="grain-overlay" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Tagline Badge */}
        <div className="hero-tagline opacity-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse-slow" />
          <span className="font-outfit text-[10px] md:text-xs font-bold tracking-[0.25em] text-white uppercase">
            {BRAND_TAGLINE}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="font-syne text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 uppercase leading-[1.05] select-none">
          <span className="hero-title-line block overflow-hidden py-1">
            <span className="inline-block translate-y-[110%]">Crafting Visual</span>
          </span>
          <span className="hero-title-line block overflow-hidden py-1 text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-400 to-amber-200">
            <span className="inline-block translate-y-[110%]">Stories That</span>
          </span>
          <span className="hero-title-line block overflow-hidden py-1">
            <span className="inline-block translate-y-[110%]">Grow Brands</span>
          </span>
        </h1>

        {/* Vertical spacer to clear center logo reveal video - made responsive for mobile */}
        <div className="h-16 sm:h-36 md:h-44 lg:h-56" />

        {/* Hero Mission Subtitle */}
        <p className="hero-mission opacity-0 font-inter text-xs sm:text-sm md:text-base lg:text-lg text-brand-muted max-w-2xl mb-6 sm:mb-10 lg:mb-12 leading-relaxed px-4">
          {BRAND_MISSION}
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-14 lg:mb-20 w-full px-6 max-w-md sm:max-w-none">
          <button
            ref={contactCtaRef}
            onClick={() => handleScrollTo("#contact")}
            className="hero-cta-button opacity-0 w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-brand-gold text-black font-outfit text-xs sm:text-sm font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-brand-gold/15 hover:shadow-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold cursor-none"
            data-magnetic
          >
            LET'S BUILD YOUR BRAND
          </button>

          <button
            ref={portfolioCtaRef}
            onClick={() => handleScrollTo("#portfolio")}
            className="hero-cta-button opacity-0 w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/20 bg-white/5 text-white font-outfit text-xs sm:text-sm font-semibold tracking-wider hover:bg-white hover:text-black transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white group cursor-none"
            data-magnetic
          >
            <Play className="h-3.5 w-3.5 fill-current group-hover:scale-110 transition-transform" />
            VIEW PORTFOLIO
          </button>
        </div>
      </div>

      {/* Scroll indicator positioned absolutely at the bottom center of the Hero section - hidden on mobile */}
      <button
        onClick={() => handleScrollTo("#about")}
        className="hero-tagline opacity-0 hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors focus:outline-none z-20"
        aria-label="Scroll to Content"
      >
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">DISCOVER</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </button>
    </section>
  );
}
