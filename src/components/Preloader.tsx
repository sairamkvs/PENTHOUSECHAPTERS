"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { Volume2, VolumeX } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [activeWord, setActiveWord] = useState("VISION");
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Lock page scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const words = ["VISION", "STORYTELLING", "CINEMATIC", "VISUAL"];
    
    const progressObj = { value: 0 };
    
    // Main ticker timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Curtain wipe slide-out
        const curtainTl = gsap.timeline({
          onComplete: () => {
            // Restore scroll
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            onComplete();
          }
        });

        // Wipe slide up using clipPath polygon transition
        curtainTl.to(".preloader-wrap", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut"
        });
      }
    });

    tl.to(progressObj, {
      value: 100,
      duration: 2.5,
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

  // Attempt unmuting
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className="preloader-wrap fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-black"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      {/* Background Video Player */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          src="/Logo Reveal.mov"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-40"
        />
        {/* Semi-dark mask to keep loader readable */}
        <div className="absolute inset-0 bg-brand-black/60" />
      </div>

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,169,25,0.06)_0%,transparent_60%)] pointer-events-none z-1" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none z-1" />

      {/* Sound Controller Button */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-brand-black/40 hover:bg-brand-black/75 text-white/90 hover:text-brand-gold transition-all font-outfit text-xs font-semibold tracking-wider cursor-none backdrop-blur-md"
        data-cursor="hover"
      >
        {isMuted ? (
          <>
            <VolumeX className="h-3.5 w-3.5" />
            SOUND ON
          </>
        ) : (
          <>
            <Volume2 className="h-3.5 w-3.5 animate-pulse" />
            SOUND OFF
          </>
        )}
      </button>

      {/* Loader UI Panel */}
      <div className="relative z-10 flex flex-col items-center select-none">
        {/* Animated Brand Logo */}
        <div className="mb-4 overflow-hidden h-14 flex items-center justify-center">
          <span className="text-4xl font-extrabold tracking-[0.25em] font-syne text-brand-gold preloader-animate">
            PIXMONK
          </span>
        </div>

        <div className="mb-8 overflow-hidden h-6 flex items-center justify-center">
          <span className="text-xs font-medium tracking-[0.5em] text-brand-muted/70 preloader-animate uppercase">
            PRODUCTIONS
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
