"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<string>("default");
  const [isVisible, setIsVisible] = useState(false);

  const snappedElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Only disable on mobile screens without mouse hover
    const isMobileTouchOnly =
      window.innerWidth < 768 &&
      window.matchMedia("(pointer: coarse) and (hover: none)").matches;

    if (isMobileTouchOnly) return;

    setIsVisible(true);
    document.documentElement.classList.add("custom-cursor-active");
    document.body.classList.add("custom-cursor-active");

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Center coordinates origin
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    // GSAP quickTo hooks for smooth 60fps tracking
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.05, ease: "power3.out" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.05, ease: "power3.out" });
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.3, ease: "power3.out" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.3, ease: "power3.out" });

    let lastX = 0;
    let lastY = 0;
    let timer: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      lastX = clientX;
      lastY = clientY;

      xToCursor(clientX);
      yToCursor(clientY);

      if (snappedElRef.current) {
        const rect = snappedElRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        xToFollower(centerX);
        yToFollower(centerY);
      } else {
        xToFollower(clientX);
        yToFollower(clientY);

        // Motion angle tilt for dynamic feel
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const stretchScale = 1 + Math.min(speed * 0.005, 0.25);

        gsap.to(cursor, {
          rotation: speed > 2 ? angle * 0.12 : 0,
          scale: speed > 2 ? stretchScale : 1,
          duration: 0.15,
          overwrite: "auto",
        });

        clearTimeout(timer);
        timer = setTimeout(() => {
          gsap.to(cursor, {
            rotation: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }, 80);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement;
      const magneticTarget = target.closest("[data-magnetic]") as HTMLElement;

      if (magneticTarget) {
        setCursorType("hover");
        snappedElRef.current = magneticTarget;

        const rect = magneticTarget.getBoundingClientRect();

        gsap.to(follower, {
          width: rect.width + 16,
          height: rect.height + 16,
          borderRadius: "14px",
          borderColor: "#E5A919",
          backgroundColor: "rgba(229, 169, 25, 0.08)",
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(cursor, {
          scale: 1.4,
          duration: 0.2,
          ease: "back.out(1.7)",
        });
      } else if (cursorTarget) {
        const val = cursorTarget.getAttribute("data-cursor") || "hover";
        setCursorType(val);
        snappedElRef.current = null;
        restoreFollower(val);
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("clickable")
      ) {
        setCursorType("hover");
        snappedElRef.current = null;
        restoreFollower("hover");
      } else {
        setCursorType("default");
        snappedElRef.current = null;
        restoreFollower("default");
      }
    };

    const restoreFollower = (type: string) => {
      const isInteractive = ["hover", "view", "play", "open", "discover", "drag"].includes(type);

      gsap.to(follower, {
        width: isInteractive ? 54 : 36,
        height: isInteractive ? 54 : 36,
        borderRadius: "50%",
        borderColor: isInteractive ? "#E5A919" : "rgba(229, 169, 25, 0.3)",
        backgroundColor: isInteractive ? "rgba(229, 169, 25, 0.08)" : "transparent",
        opacity: isInteractive ? 1 : 0.6,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(cursor, {
        scale: isInteractive ? 1.35 : 1,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.2 });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.classList.remove("custom-cursor-active");
      document.body.classList.remove("custom-cursor-active");
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  const isCustomBadge = ["view", "play", "open", "discover", "drag"].includes(cursorType);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] hidden md:block select-none">
      {/* Outer Lagging Aura Ring */}
      <div
        ref={followerRef}
        className="fixed left-0 top-0 rounded-full border border-brand-gold/30 shadow-[0_0_15px_rgba(229,169,25,0.15)] transition-colors duration-300 pointer-events-none"
      />

      {/* Primary Triangle Cursor ▶ (PENTHOUSE P Logo Play Triangle) */}
      <div
        ref={cursorRef}
        className="fixed left-0 top-0 flex flex-col items-center justify-center pointer-events-none"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_10px_rgba(229,169,25,0.65)] filter"
        >
          <defs>
            <linearGradient id="penthousePlayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4BC" />
              <stop offset="45%" stopColor="#E5A919" />
              <stop offset="100%" stopColor="#9E6F05" />
            </linearGradient>
            <filter id="goldGlowCursor" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path
            d="M7 4.5C6.17157 4.0221 5.5 4.40938 5.5 5.36442V18.6356C5.5 19.5906 6.17157 19.9779 7 19.5L18.4142 12.9216C19.2426 12.4437 19.2426 11.5563 18.4142 11.0784L7 4.5Z"
            fill="url(#penthousePlayGrad)"
            stroke="#FFE899"
            strokeWidth="0.8"
            filter="url(#goldGlowCursor)"
          />
        </svg>

        {/* Dynamic Label Badge for interactive states */}
        {isCustomBadge && !snappedElRef.current && (
          <span className="mt-1 px-2 py-0.5 rounded-full bg-brand-black/90 border border-brand-gold/40 font-outfit text-[9px] font-bold tracking-[0.2em] text-brand-gold uppercase shadow-lg animate-[fadeInShort_0.2s_ease-out]">
            {cursorType}
          </span>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeInShort {
          from { opacity: 0; transform: translateY(4px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
