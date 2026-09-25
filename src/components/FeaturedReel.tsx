"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

interface FeaturedReelProps {
  onComplete: () => void;
}

export default function FeaturedReel({ onComplete }: FeaturedReelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Keep page scroll locked
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch((err) => console.log("Reel autoplay blocked: ", err));

      let hasPlayedAudioOnce = false;

      const handleSoundState = (e: any) => {
        if (!video) return;
        if (e.detail.active) {
          hasPlayedAudioOnce = false;
          video.muted = false;
          video.volume = 0.8;
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.muted = true;
        }
      };

      window.addEventListener("cinematic-sound-state", handleSoundState as any);

      const updateProgress = () => {
        if (video.duration) {
          setProgress((video.currentTime / video.duration) * 100);
          if (!video.muted && !hasPlayedAudioOnce && video.currentTime >= video.duration - 0.3) {
            hasPlayedAudioOnce = true;
            video.muted = true;
            window.dispatchEvent(new CustomEvent("cinematic-sound-state", { detail: { active: false } }));
          }
        }
      };

      video.addEventListener("timeupdate", updateProgress);

      // Auto-skip after 12 seconds or when video ends
      const autoSkipTimer = setTimeout(() => {
        handleSkip();
      }, 12000);

      video.addEventListener("ended", handleSkip);

      return () => {
        window.removeEventListener("cinematic-sound-state", handleSoundState as any);
        video.removeEventListener("timeupdate", updateProgress);
        video.removeEventListener("ended", handleSkip);
        clearTimeout(autoSkipTimer);
      };
    }
  }, []);

  const handleSkip = () => {
    const container = containerRef.current;
    if (!container) {
      onComplete();
      return;
    }

    // Animate transition reveal
    gsap.killTweensOf(container);
    gsap.timeline({
      onComplete: () => {
        // Unlock scroll
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        onComplete();
      }
    })
    .to(container, {
      opacity: 0,
      scale: 1.06,
      filter: "blur(20px)",
      duration: 1.0,
      ease: "power3.inOut"
    });
  };

  return (
    <div
      ref={containerRef}
      className="featured-reel-container fixed inset-0 z-[9998] bg-brand-black flex items-center justify-center pointer-events-auto overflow-hidden select-none"
    >
      {/* Background Cinematic Video Loop */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/Logo Reveal.mov"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover brightness-[0.75]"
        />
        {/* Soft vignette and cinematic color mask */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#060606_90%)] opacity-70" />
        <div className="absolute inset-0 bg-brand-black/10" />
      </div>

      {/* Cinematic Grid Scanline Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_4px] opacity-30 pointer-events-none z-1" />

      {/* Top Banner Tagline */}
      <div className="absolute top-8 left-8 right-8 z-10 flex justify-between items-center opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-ping" />
          <span className="font-outfit text-[10px] font-bold tracking-[0.4em] text-brand-gold uppercase">
            SELECTED SHOWCASE
          </span>
        </div>
        <span className="font-mono text-[10px] text-white/40 tracking-wider">
          EST. 2026
        </span>
      </div>

      {/* Bottom Progress Bar & Button Container */}
      <div className="absolute bottom-8 inset-x-8 z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
        
        {/* Progress Tracker bar */}
        <div className="flex items-center gap-4 w-full sm:max-w-xs">
          <span className="font-mono text-[10px] text-white/50">00:12</span>
          <div className="flex-1 h-[2px] bg-white/10 relative rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-brand-gold rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip Intro Glassmorphic CTA */}
        <button
          onClick={handleSkip}
          className="flex items-center gap-3 px-6 py-3 rounded-full border border-brand-gold/30 bg-brand-gold/5 hover:bg-brand-gold hover:text-black transition-all duration-500 font-outfit text-xs font-bold tracking-widest text-white cursor-none backdrop-blur-md group hover:border-brand-gold shadow-[0_0_20px_rgba(229,169,25,0.05)] hover:shadow-[0_0_20px_rgba(229,169,25,0.2)] focus:outline-none"
          data-cursor="hover"
        >
          SKIP INTRO
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Custom keyframe styles inline to guarantee compile safety */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
