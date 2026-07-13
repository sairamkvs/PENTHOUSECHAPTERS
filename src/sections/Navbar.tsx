"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_NAME } from "@/constants/data";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Magnetic refs for buttons
  const soundButtonRef = useMagnetic(0.25);
  const ctaButtonRef = useMagnetic(0.25);
  const logoRef = useMagnetic(0.15);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSoundState = (e: any) => {
      setIsAudioActive(e.detail.active);
    };

    window.addEventListener("cinematic-sound-state", handleSoundState as any);
    return () => window.removeEventListener("cinematic-sound-state", handleSoundState as any);
  }, []);

  const toggleSound = () => {
    window.dispatchEvent(new CustomEvent("toggle-cinematic-sound"));
  };

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 px-6 py-4 md:px-12",
          isScrolled 
            ? "bg-brand-black/70 backdrop-blur-md border-b border-white/5 py-3 shadow-lg" 
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#hero" 
            ref={logoRef}
            className="flex flex-col focus:outline-none cursor-none"
            data-cursor="hover"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="font-syne text-xl md:text-2xl font-extrabold tracking-[0.2em] text-brand-gold">
              PIXMONK
            </span>
            <span className="text-[9px] font-medium tracking-[0.45em] text-brand-muted uppercase -mt-0.5">
              PRODUCTIONS
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-outfit text-sm font-medium tracking-widest text-white/70 hover:text-brand-gold uppercase transition-colors relative group py-2 focus:outline-none cursor-none"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA & Mobile trigger */}
          <div className="flex items-center gap-4">
            {/* Audio Toggle Widget */}
            <button
              onClick={toggleSound}
              ref={soundButtonRef}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:border-brand-gold/30 hover:bg-brand-gold/5 text-white/80 hover:text-brand-gold transition-all duration-300 font-outfit text-[10px] md:text-xs font-bold tracking-widest cursor-none backdrop-blur-md h-9"
              data-cursor="hover"
              title={isAudioActive ? "Mute Ambient Soundtrack" : "Unmute Ambient Soundtrack"}
            >
              {/* Animating Waveform Bars */}
              <div className="flex items-end gap-[3px] h-3 w-4 pb-[1px]">
                <span className={cn("w-[2px] bg-current rounded-full transition-all duration-300", isAudioActive ? "animate-[wave_1s_ease-in-out_infinite_alternate]" : "h-1")} style={{ animationDelay: "0.1s" }} />
                <span className={cn("w-[2px] bg-current rounded-full transition-all duration-300", isAudioActive ? "animate-[wave_0.8s_ease-in-out_infinite_alternate]" : "h-1.5")} style={{ animationDelay: "0.3s" }} />
                <span className={cn("w-[2px] bg-current rounded-full transition-all duration-300", isAudioActive ? "animate-[wave_1.2s_ease-in-out_infinite_alternate]" : "h-2")} style={{ animationDelay: "0.5s" }} />
                <span className={cn("w-[2px] bg-current rounded-full transition-all duration-300", isAudioActive ? "animate-[wave_0.9s_ease-in-out_infinite_alternate]" : "h-1")} style={{ animationDelay: "0.2s" }} />
              </div>
              <span className="hidden sm:inline text-[10px] tracking-widest">{isAudioActive ? "SOUND ON" : "SOUND OFF"}</span>
            </button>

            <a
              href="#contact"
              ref={ctaButtonRef}
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-white font-outfit text-xs font-semibold tracking-wider hover:bg-brand-gold hover:text-black transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold group h-9 cursor-none"
              data-cursor="hover"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#contact");
              }}
            >
              LET'S BUILD
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-brand-gold md:hidden focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-black flex flex-col justify-center px-8 py-20 md:hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-brand-gold/10 blur-[100px] pointer-events-none" />

            <nav className="flex flex-col gap-6 relative z-10">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="font-syne text-3xl font-bold tracking-wider text-left text-white hover:text-brand-gold focus:outline-none uppercase"
                  >
                    {link.label}
                  </button>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
                className="mt-8"
              >
                <button
                  onClick={() => handleLinkClick("#contact")}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-brand-gold text-brand-gold font-outfit text-sm font-semibold tracking-wider hover:bg-brand-gold hover:text-black transition-colors"
                >
                  LET'S BUILD YOUR BRAND
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
