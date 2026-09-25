"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [activeWord, setActiveWord] = useState("VISION");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 0.8;
      video.play().catch(() => {
        // Fallback if browser blocks unmuted autoplay before interaction
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, []);

  useEffect(() => {
    // Lock page scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const words = ["VISION", "STORYTELLING", "CINEMATIC", "VISUAL"];
    
    const progressObj = { value: 0 };
    
    // Main ticker timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Stop audio when preloader curtain finishes
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.pause();
        }

        // Liquid Morphing curtain transition
        const curtainTl = gsap.timeline({
          onComplete: () => {
            // Restore scroll
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            onComplete();
          }
        });

        // Morph the SVG path to create an elastic drop/wipe reveal
        curtainTl.to("#preloader-svg-path", {
          attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 80 0 0 Z" },
          duration: 0.6,
          ease: "power2.in"
        }).to("#preloader-svg-path", {
          attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z" },
          duration: 0.6,
          ease: "power4.out"
        });

        // Fade out loading content
        curtainTl.to(".preloader-content", {
          opacity: 0,
          y: -50,
          duration: 0.4,
          ease: "power2.inOut"
        }, 0);
      }
    });

    tl.to(progressObj, {
      value: 100,
      duration: 2.8,
      ease: "power2.out",
      onUpdate: () => {
        const currentVal = Math.floor(progressObj.value);
        setProgress(currentVal);

        if (currentVal < 25) {
          setActiveWord(words[0]);
        } else if (currentVal < 50) {
          setActiveWord(words[1]);
        } else if (currentVal < 75) {
          setActiveWord(words[2]);
        } else {
          setActiveWord(words[3]);
        }
      }
    });

    // Staggered text fade in
    gsap.fromTo(
      ".preloader-animate",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div className="preloader-wrap fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto">
      
      {/* Liquid Morphing SVG Background Curtain */}
      <svg
        className="absolute inset-0 w-full h-full fill-brand-black pointer-events-none z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          id="preloader-svg-path"
          d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
          className="transition-colors duration-300"
        />
      </svg>

      {/* Background Video Player */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          src="/Logo Reveal.mov"
          autoPlay
          playsInline
          className="w-full h-full object-cover opacity-25"
        />
        {/* Semi-dark mask to keep loader readable */}
        <div className="absolute inset-0 bg-brand-black/60" />
      </div>

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,169,25,0.06)_0%,transparent_60%)] pointer-events-none z-1" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none z-1" />

      {/* Loader UI Panel */}
      <div className="preloader-content relative z-10 flex flex-col items-center select-none">
        {/* Animated Brand Logo */}
        <div className="mb-4 overflow-hidden h-14 flex items-center justify-center">
          <span className="text-4xl font-extrabold tracking-[0.25em] font-syne text-brand-gold preloader-animate">
            PENTHOUSE
          </span>
        </div>

        <div className="mb-8 overflow-hidden h-6 flex items-center justify-center">
          <span className="text-xs font-medium tracking-[0.5em] text-brand-muted/70 preloader-animate uppercase">
            CHAPTERS
          </span>
        </div>

        {/* Dynamic Concept Subtitle */}
        <div className="h-8 mb-4 flex items-center justify-center">
          <span className="text-sm tracking-[0.4em] font-light text-brand-muted/50 uppercase">
            {activeWord}
          </span>
        </div>

        {/* Thin Gold Progress Bar */}
        <div className="w-56 h-[1px] bg-brand-gray relative overflow-hidden mb-6">
          <div
            className="absolute left-0 top-0 h-full bg-brand-gold transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Counter */}
        <div className="font-mono text-xl font-light text-white/80">
          {progress.toString().padStart(3, "0")}
        </div>
      </div>
    </div>
  );
}
