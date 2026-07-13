"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import Bio from "@/sections/Bio";
import Services from "@/sections/Services";
import Process from "@/sections/Process";
import Portfolio from "@/sections/Portfolio";
import Brands from "@/sections/Brands";
import Contact from "@/sections/Contact";

// Dynamic imports for browser-only elements to optimize Lighthouse scores
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });
const AudioEngine = dynamic(() => import("@/components/AudioEngine"), { ssr: false });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      {/* Dynamic Audio Engine */}
      <AudioEngine />

      {/* Dynamic Cursor tracking */}
      <CustomCursor />

      {/* GSAP Loading curtain */}
      {showPreloader && (
        <Preloader
          onComplete={() => {
            setIsLoaded(true);
            setShowPreloader(false);
          }}
        />
      )}

      {/* Main page content reveals after loader completes */}
      <div
        className="transition-opacity duration-1000 ease-out"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <Navbar />

        <main>
          {/* Hero Landing */}
          <Hero isLoaded={isLoaded} />

          {/* Core Vision Bio */}
          <Bio />

          {/* Interactive deliverables */}
          <Services />

          {/* 5-step numbered timeline */}
          <Process />

          {/* Case grid and Radix lightbox */}
          <Portfolio />

          {/* Infinite logo scrolling */}
          <Brands />

          {/* Floating inputs & email inquiry */}
          <Contact />
        </main>

        {/* Cinematic Premium Footer */}
        <footer className="w-full bg-brand-black border-t border-white/5 py-12 px-6 md:px-12 select-none">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="font-syne text-lg font-bold tracking-[0.2em] text-white">
                PIXMONK
              </span>
              <span className="text-[8px] font-medium tracking-[0.45em] text-brand-muted uppercase -mt-0.5">
                PRODUCTIONS
              </span>
            </div>

            <p className="font-outfit text-xs text-brand-muted/70 tracking-widest text-center">
              © {new Date().getFullYear()} PIXMONK PRODUCTIONS. ALL RIGHTS RESERVED.
            </p>

            <a
              href="#hero"
              className="font-outfit text-xs font-bold tracking-widest text-brand-gold hover:text-white uppercase transition-colors cursor-none"
              data-cursor="hover"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              BACK TO TOP ↑
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
