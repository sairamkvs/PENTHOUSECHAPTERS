"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "play">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
      
    if (isTouchDevice) return;

    setIsVisible(true);
    document.body.classList.add("custom-cursor-active");

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Center coordinates origin
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    // GSAP quickTo hooks for high performance 60fps tracking
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.08, ease: "power3.out" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.08, ease: "power3.out" });
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.35, ease: "power3.out" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement;
      
      if (cursorTarget) {
        const val = cursorTarget.getAttribute("data-cursor") as any;
        setCursorType(val || "hover");
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("clickable")
      ) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
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
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference hidden md:block">
      {/* Precision Core Dot */}
      <div
        ref={cursorRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-white transition-transform duration-300"
        style={{
          transform: cursorType !== "default" ? "scale(0)" : "scale(1)",
        }}
      />

      {/* Lagging Guide Ring */}
      <div
        ref={followerRef}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-white/50 transition-all duration-300"
        style={{
          width: cursorType === "default" ? "32px" : cursorType === "hover" ? "56px" : "80px",
          height: cursorType === "default" ? "32px" : cursorType === "hover" ? "56px" : "80px",
          backgroundColor:
            cursorType === "view" || cursorType === "play"
              ? "rgba(229, 169, 25, 0.95)"
              : "transparent",
          borderColor:
            cursorType === "view" || cursorType === "play"
              ? "#E5A919"
              : cursorType === "hover"
              ? "#E5A919"
              : "rgba(255, 255, 255, 0.5)",
          mixBlendMode: cursorType === "default" ? "difference" : "normal",
        }}
      >
        {(cursorType === "view" || cursorType === "play") && (
          <span className="font-outfit text-[10px] font-bold tracking-widest text-black uppercase select-none">
            {cursorType}
          </span>
        )}
      </div>
    </div>
  );
}
