"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "play">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);
  
  const snappedElRef = useRef<HTMLElement | null>(null);

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

    let lastX = 0;
    let lastY = 0;
    let timer: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      // Calculate velocity for stretching effect
      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      
      lastX = clientX;
      lastY = clientY;

      xToCursor(clientX);
      yToCursor(clientY);

      // Determine snap coordinates or normal follow
      if (snappedElRef.current) {
        const rect = snappedElRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        xToFollower(centerX);
        yToFollower(centerY);
      } else {
        xToFollower(clientX);
        yToFollower(clientY);

        // Apply velocity stretch: scale in direction of motion, squeeze perpendicular
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const stretchScale = 1 + Math.min(speed * 0.007, 0.35);
        const squeezeScale = 1 - Math.min(speed * 0.005, 0.25);

        gsap.to(follower, {
          scaleX: stretchScale,
          scaleY: squeezeScale,
          rotation: angle,
          duration: 0.15,
          overwrite: "auto",
        });

        // Spring back to base circle when mouse stops
        clearTimeout(timer);
        timer = setTimeout(() => {
          gsap.to(follower, {
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
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
        
        // Morph outer ring to perfectly frame the magnetic element
        gsap.to(follower, {
          width: rect.width + 16,
          height: rect.height + 16,
          borderRadius: "12px", // rounded corner bounding box
          borderColor: "#E5A919",
          backgroundColor: "rgba(229, 169, 25, 0.06)",
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto"
        });
      } else if (cursorTarget) {
        const val = cursorTarget.getAttribute("data-cursor") as any;
        setCursorType(val || "hover");
        snappedElRef.current = null;
        restoreCircleShape(val || "hover");
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("clickable")
      ) {
        setCursorType("hover");
        snappedElRef.current = null;
        restoreCircleShape("hover");
      } else {
        setCursorType("default");
        snappedElRef.current = null;
        restoreCircleShape("default");
      }
    };

    const restoreCircleShape = (type: string) => {
      // Revert from magnetic frame to standard circular cursor dimensions
      gsap.to(follower, {
        width: type === "default" ? 32 : type === "hover" ? 56 : 80,
        height: type === "default" ? 32 : type === "hover" ? 56 : 80,
        borderRadius: "50%",
        borderColor:
          type === "view" || type === "play"
            ? "#E5A919"
            : type === "hover"
            ? "#E5A919"
            : "rgba(229, 169, 25, 0.3)",
        backgroundColor:
          type === "view" || type === "play"
            ? "rgba(229, 169, 25, 0.15)"
            : "transparent",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
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
      document.body.classList.remove("custom-cursor-active");
      clearTimeout(timer);
    };
  }, [cursorType]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Precision Core Dot (Vibrant Gold/Yellow with Glow) */}
      <div
        ref={cursorRef}
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-brand-gold shadow-[0_0_8px_rgba(229,169,25,0.6)] transition-transform duration-300"
        style={{
          transform: snappedElRef.current ? "scale(0)" : "scale(1)",
        }}
      />

      {/* Lagging Guide Ring (Vibrant Gold/Yellow outline) */}
      <div
        ref={followerRef}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-brand-gold/30 shadow-[0_0_12px_rgba(229,169,25,0.1)] transition-all duration-300"
      >
        {(cursorType === "view" || cursorType === "play") && !snappedElRef.current && (
          <span className="font-outfit text-[10px] font-bold tracking-widest text-brand-gold uppercase select-none">
            {cursorType}
          </span>
        )}
      </div>
    </div>
  );
}
