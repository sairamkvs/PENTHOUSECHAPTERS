// "use client";

// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";

// export default function CustomCursor() {
//   const cursorRef = useRef<HTMLDivElement>(null);
//   const followerRef = useRef<HTMLDivElement>(null);
//   const [cursorType, setCursorType] = useState<string>("default");
//   //const [isVisible, setIsVisible] = useState(false);

//   const snappedElRef = useRef<HTMLElement | null>(null);

//   useEffect(() => {
//     // Disable on touch devices
//     const isTouchDevice =
//       "ontouchstart" in window ||
//       navigator.maxTouchPoints > 0 ||
//       window.matchMedia("(pointer: coarse)").matches;

//     if (isTouchDevice) return;

//     //setIsVisible(true);
//     document.documentElement.classList.add("custom-cursor-active");
//     document.body.classList.add("custom-cursor-active");

//     const cursor = cursorRef.current;
//     const follower = followerRef.current;

//     if (!cursor || !follower) return;

//     // Center coordinates origin
//     gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

//     // GSAP quickTo hooks for smooth 60fps tracking
//     const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.05, ease: "power3.out" });
//     const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.05, ease: "power3.out" });
//     const xToFollower = gsap.quickTo(follower, "x", { duration: 0.3, ease: "power3.out" });
//     const yToFollower = gsap.quickTo(follower, "y", { duration: 0.3, ease: "power3.out" });

//     let lastX = 0;
//     let lastY = 0;
//     let timer: NodeJS.Timeout;

//     const handleMouseMove = (e: MouseEvent) => {
//       const clientX = e.clientX;
//       const clientY = e.clientY;

//       const dx = clientX - lastX;
//       const dy = clientY - lastY;
//       const speed = Math.sqrt(dx * dx + dy * dy);

//       lastX = clientX;
//       lastY = clientY;

//       xToCursor(clientX);
//       yToCursor(clientY);

//       if (snappedElRef.current) {
//         const rect = snappedElRef.current.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;

//         xToFollower(centerX);
//         yToFollower(centerY);
//       } else {
//         xToFollower(clientX);
//         yToFollower(clientY);

//         // Motion angle tilt for dynamic feel
//         const angle = Math.atan2(dy, dx) * (180 / Math.PI);
//         const stretchScale = 1 + Math.min(speed * 0.005, 0.25);

//         gsap.to(cursor, {
//           rotation: speed > 2 ? angle * 0.12 : 0,
//           scale: speed > 2 ? stretchScale : 1,
//           duration: 0.15,
//           overwrite: "auto",
//         });

//         clearTimeout(timer);
//         timer = setTimeout(() => {
//           gsap.to(cursor, {
//             rotation: 0,
//             scale: 1,
//             duration: 0.3,
//             ease: "power2.out",
//             overwrite: "auto",
//           });
//         }, 80);
//       }
//     };

//     const handleMouseOver = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       if (!target) return;

//       const cursorTarget = target.closest("[data-cursor]") as HTMLElement;
//       const magneticTarget = target.closest("[data-magnetic]") as HTMLElement;

//       if (magneticTarget) {
//         setCursorType("hover");
//         snappedElRef.current = magneticTarget;

//         const rect = magneticTarget.getBoundingClientRect();

//         gsap.to(follower, {
//           width: rect.width + 16,
//           height: rect.height + 16,
//           borderRadius: "14px",
//           borderColor: "#E5A919",
//           backgroundColor: "rgba(229, 169, 25, 0.08)",
//           opacity: 1,
//           duration: 0.25,
//           ease: "power2.out",
//           overwrite: "auto",
//         });

//         gsap.to(cursor, {
//           scale: 1.4,
//           duration: 0.2,
//           ease: "back.out(1.7)",
//         });
//       } else if (cursorTarget) {
//         const val = cursorTarget.getAttribute("data-cursor") || "hover";
//         setCursorType(val);
//         snappedElRef.current = null;
//         restoreFollower(val);
//       } else if (
//         target.tagName === "A" ||
//         target.tagName === "BUTTON" ||
//         target.closest("a") ||
//         target.closest("button") ||
//         target.classList.contains("clickable")
//       ) {
//         setCursorType("hover");
//         snappedElRef.current = null;
//         restoreFollower("hover");
//       } else {
//         setCursorType("default");
//         snappedElRef.current = null;
//         restoreFollower("default");
//       }
//     };

//     const restoreFollower = (type: string) => {
//       const isInteractive = ["hover", "view", "play", "open", "discover", "drag"].includes(type);

//       gsap.to(follower, {
//         width: isInteractive ? 54 : 36,
//         height: isInteractive ? 54 : 36,
//         borderRadius: "50%",
//         borderColor: isInteractive ? "#E5A919" : "rgba(229, 169, 25, 0.3)",
//         backgroundColor: isInteractive ? "rgba(229, 169, 25, 0.08)" : "transparent",
//         opacity: isInteractive ? 1 : 0.6,
//         duration: 0.3,
//         ease: "power2.out",
//         overwrite: "auto",
//       });

//       gsap.to(cursor, {
//         scale: isInteractive ? 1.35 : 1,
//         duration: 0.25,
//         ease: "power2.out",
//         overwrite: "auto",
//       });
//     };

//     const handleMouseLeave = () => {
//       gsap.to([cursor, follower], { opacity: 0, duration: 0.2 });
//     };

//     const handleMouseEnter = () => {
//       gsap.to([cursor, follower], { opacity: 1, duration: 0.2 });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseover", handleMouseOver);
//     document.addEventListener("mouseleave", handleMouseLeave);
//     document.addEventListener("mouseenter", handleMouseEnter);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseover", handleMouseOver);
//       document.removeEventListener("mouseleave", handleMouseLeave);
//       document.removeEventListener("mouseenter", handleMouseEnter);
//       document.documentElement.classList.remove("custom-cursor-active");
//       document.body.classList.remove("custom-cursor-active");
//       clearTimeout(timer);
//     };
//   }, []);

//   //if (!isVisible) return null;

//   const isCustomBadge = ["view", "play", "open", "discover", "drag"].includes(cursorType);

//   return (
//     <div className="pointer-events-none fixed inset-0 z-[99999] hidden md:block select-none">
//       {/* Outer Lagging Aura Ring */}
//       <div
//         ref={followerRef}
//         className="fixed left-0 top-0 rounded-full border border-brand-gold/30 shadow-[0_0_15px_rgba(229,169,25,0.15)] transition-colors duration-300 pointer-events-none"
//       />

//       {/* Primary Triangle Cursor ▶ (PENTHOUSE P Logo Play Triangle) */}
//       <div
//         ref={cursorRef}
//         className="fixed left-0 top-0 flex flex-col items-center justify-center pointer-events-none"
//       >
//         <svg
//           width="26"
//           height="26"
//           viewBox="0 0 24 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="drop-shadow-[0_0_10px_rgba(229,169,25,0.65)] filter"
//         >
//           <defs>
//             <linearGradient id="penthousePlayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#FFF4BC" />
//               <stop offset="45%" stopColor="#E5A919" />
//               <stop offset="100%" stopColor="#9E6F05" />
//             </linearGradient>
//             <filter id="goldGlowCursor" x="-30%" y="-30%" width="160%" height="160%">
//               <feGaussianBlur stdDeviation="1.5" result="blur" />
//               <feComposite in="SourceGraphic" in2="blur" operator="over" />
//             </filter>
//           </defs>
//           <path
//             d="M7 4.5C6.17157 4.0221 5.5 4.40938 5.5 5.36442V18.6356C5.5 19.5906 6.17157 19.9779 7 19.5L18.4142 12.9216C19.2426 12.4437 19.2426 11.5563 18.4142 11.0784L7 4.5Z"
//             fill="url(#penthousePlayGrad)"
//             stroke="#FFE899"
//             strokeWidth="0.8"
//             filter="url(#goldGlowCursor)"
//           />
//         </svg>

//         {/* Dynamic Label Badge for interactive states */}
//         {isCustomBadge && !snappedElRef.current && (
//           <span className="mt-1 px-2 py-0.5 rounded-full bg-brand-black/90 border border-brand-gold/40 font-outfit text-[9px] font-bold tracking-[0.2em] text-brand-gold uppercase shadow-lg animate-[fadeInShort_0.2s_ease-out]">
//             {cursorType}
//           </span>
//         )}
//       </div>

//       <style jsx global>{`
//         @keyframes fadeInShort {
//           from { opacity: 0; transform: translateY(4px) scale(0.9); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }
//       `}</style>
//     </div>
//   );
// }

// media click cursor 

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";

// export default function CustomCursor() {
//   const cursorRef = useRef<HTMLDivElement>(null);
//   const followerRef = useRef<HTMLDivElement>(null);

//   const [cursorType, setCursorType] = useState<string>("default");
//   const [cursorIcon, setCursorIcon] = useState<"play" | "pause">("play");

//   const snappedElRef = useRef<HTMLElement | null>(null);
//   const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     // Disable on touch devices
//     const isTouchDevice =
//       "ontouchstart" in window ||
//       navigator.maxTouchPoints > 0 ||
//       window.matchMedia("(pointer: coarse)").matches;

//     if (isTouchDevice) return;

//     document.documentElement.classList.add("custom-cursor-active");
//     document.body.classList.add("custom-cursor-active");

//     const cursor = cursorRef.current;
//     const follower = followerRef.current;

//     if (!cursor || !follower) return;

//     // Center coordinates origin
//     gsap.set([cursor, follower], {
//       xPercent: -50,
//       yPercent: -50,
//     });

//     // Smooth cursor tracking
//     const xToCursor = gsap.quickTo(cursor, "x", {
//       duration: 0.05,
//       ease: "power3.out",
//     });

//     const yToCursor = gsap.quickTo(cursor, "y", {
//       duration: 0.05,
//       ease: "power3.out",
//     });

//     const xToFollower = gsap.quickTo(follower, "x", {
//       duration: 0.3,
//       ease: "power3.out",
//     });

//     const yToFollower = gsap.quickTo(follower, "y", {
//       duration: 0.3,
//       ease: "power3.out",
//     });

//     let lastX = 0;
//     let lastY = 0;
//     let timer: ReturnType<typeof setTimeout> | undefined;

//     // ----------------------------------------
//     // MOUSE MOVE
//     // ----------------------------------------

//     const handleMouseMove = (e: MouseEvent) => {
//       const clientX = e.clientX;
//       const clientY = e.clientY;

//       const dx = clientX - lastX;
//       const dy = clientY - lastY;
//       const speed = Math.sqrt(dx * dx + dy * dy);

//       lastX = clientX;
//       lastY = clientY;

//       xToCursor(clientX);
//       yToCursor(clientY);

//       if (snappedElRef.current) {
//         const rect = snappedElRef.current.getBoundingClientRect();

//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;

//         xToFollower(centerX);
//         yToFollower(centerY);
//       } else {
//         xToFollower(clientX);
//         yToFollower(clientY);

//         // Dynamic movement / tilt
//         const angle = Math.atan2(dy, dx) * (180 / Math.PI);

//         const stretchScale =
//           1 + Math.min(speed * 0.005, 0.25);

//         gsap.to(cursor, {
//           rotation: speed > 2 ? angle * 0.12 : 0,
//           scale: speed > 2 ? stretchScale : 1,
//           duration: 0.15,
//           overwrite: "auto",
//         });

//         if (timer) {
//           clearTimeout(timer);
//         }

//         timer = setTimeout(() => {
//           gsap.to(cursor, {
//             rotation: 0,
//             scale: 1,
//             duration: 0.3,
//             ease: "power2.out",
//             overwrite: "auto",
//           });
//         }, 80);
//       }
//     };

//     // ----------------------------------------
//     // RESTORE FOLLOWER
//     // ----------------------------------------

//     const restoreFollower = (type: string) => {
//       const isInteractive = [
//         "hover",
//         "view",
//         "play",
//         "open",
//         "discover",
//         "drag",
//       ].includes(type);

//       gsap.to(follower, {
//         width: isInteractive ? 54 : 36,
//         height: isInteractive ? 54 : 36,
//         borderRadius: "50%",
//         borderColor: isInteractive
//           ? "#E5A919"
//           : "rgba(229, 169, 25, 0.3)",
//         backgroundColor: isInteractive
//           ? "rgba(229, 169, 25, 0.08)"
//           : "transparent",
//         opacity: isInteractive ? 1 : 0.6,
//         duration: 0.3,
//         ease: "power2.out",
//         overwrite: "auto",
//       });

//       gsap.to(cursor, {
//         scale: isInteractive ? 1.35 : 1,
//         duration: 0.25,
//         ease: "power2.out",
//         overwrite: "auto",
//       });
//     };

//     // ----------------------------------------
//     // MOUSE OVER
//     // ----------------------------------------

//     const handleMouseOver = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;

//       if (!target) return;

//       const cursorTarget = target.closest(
//         "[data-cursor]"
//       ) as HTMLElement | null;

//       const magneticTarget = target.closest(
//         "[data-magnetic]"
//       ) as HTMLElement | null;

//       // Magnetic element
//       if (magneticTarget) {
//         setCursorType("hover");

//         snappedElRef.current = magneticTarget;

//         const rect = magneticTarget.getBoundingClientRect();

//         gsap.to(follower, {
//           width: rect.width + 16,
//           height: rect.height + 16,
//           borderRadius: "14px",
//           borderColor: "#E5A919",
//           backgroundColor:
//             "rgba(229, 169, 25, 0.08)",
//           opacity: 1,
//           duration: 0.25,
//           ease: "power2.out",
//           overwrite: "auto",
//         });

//         gsap.to(cursor, {
//           scale: 1.4,
//           duration: 0.2,
//           ease: "back.out(1.7)",
//         });
//       }

//       // data-cursor element
//       else if (cursorTarget) {
//         const val =
//           cursorTarget.getAttribute("data-cursor") ||
//           "hover";

//         setCursorType(val);

//         snappedElRef.current = null;

//         restoreFollower(val);
//       }

//       // Links / buttons
//       else if (
//         target.tagName === "A" ||
//         target.tagName === "BUTTON" ||
//         target.closest("a") ||
//         target.closest("button") ||
//         target.classList.contains("clickable")
//       ) {
//         setCursorType("hover");

//         snappedElRef.current = null;

//         restoreFollower("hover");
//       }

//       // Default
//       else {
//         setCursorType("default");

//         snappedElRef.current = null;

//         restoreFollower("default");
//       }
//     };

//     // ----------------------------------------
//     // CLICK FEEDBACK
//     // ----------------------------------------

//     const handleMouseDown = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;

//       if (!target) return;

//       /*
//         Pause feedback ONLY for media.

//         Your video/project element can use either:

//         data-media

//         OR

//         data-cursor="play"
//       */

//       // const mediaTarget =
//       //   target.closest("[data-media]") ||
//       //   target.closest("[data-cursor='play']");

//       // if (!mediaTarget) return;

//       // PLAY → PAUSE

//       setCursorIcon("pause");

//       // Prevent multiple timers when clicking quickly
//       if (pauseTimeoutRef.current) {
//         clearTimeout(pauseTimeoutRef.current);
//       }

//       // PAUSE → PLAY
//       pauseTimeoutRef.current = setTimeout(() => {
//         setCursorIcon("play");

//         pauseTimeoutRef.current = null;
//       }, 600);
//     };

//     // ----------------------------------------
//     // MOUSE LEAVE / ENTER
//     // ----------------------------------------

//     const handleMouseLeave = () => {
//       gsap.to([cursor, follower], {
//         opacity: 0,
//         duration: 0.2,
//       });
//     };

//     const handleMouseEnter = () => {
//       gsap.to([cursor, follower], {
//         opacity: 1,
//         duration: 0.2,
//       });
//     };

//     // ----------------------------------------
//     // EVENT LISTENERS
//     // ----------------------------------------

//     window.addEventListener(
//       "mousemove",
//       handleMouseMove
//     );

//     window.addEventListener(
//       "mouseover",
//       handleMouseOver
//     );

//     window.addEventListener(
//       "mousedown",
//       handleMouseDown
//     );

//     document.addEventListener(
//       "mouseleave",
//       handleMouseLeave
//     );

//     document.addEventListener(
//       "mouseenter",
//       handleMouseEnter
//     );

//     // ----------------------------------------
//     // CLEANUP
//     // ----------------------------------------

//     return () => {
//       window.removeEventListener(
//         "mousemove",
//         handleMouseMove
//       );

//       window.removeEventListener(
//         "mouseover",
//         handleMouseOver
//       );

//       window.removeEventListener(
//         "mousedown",
//         handleMouseDown
//       );

//       document.removeEventListener(
//         "mouseleave",
//         handleMouseLeave
//       );

//       document.removeEventListener(
//         "mouseenter",
//         handleMouseEnter
//       );

//       document.documentElement.classList.remove(
//         "custom-cursor-active"
//       );

//       document.body.classList.remove(
//         "custom-cursor-active"
//       );

//       if (timer) {
//         clearTimeout(timer);
//       }

//       if (pauseTimeoutRef.current) {
//         clearTimeout(
//           pauseTimeoutRef.current
//         );

//         pauseTimeoutRef.current = null;
//       }

//       gsap.killTweensOf(cursor);
//       gsap.killTweensOf(follower);
//     };
//   }, []);

//   const isCustomBadge = [
//     "view",
//     "play",
//     "open",
//     "discover",
//     "drag",
//   ].includes(cursorType);

//   return (
//     <div className="pointer-events-none fixed inset-0 z-[99999] hidden md:block select-none">

//       {/* ----------------------------------------
//           OUTER FOLLOWER RING
//       ----------------------------------------- */}

//       <div
//         ref={followerRef}
//         className="fixed left-0 top-0 rounded-full border border-brand-gold/30 shadow-[0_0_15px_rgba(229,169,25,0.15)] transition-colors duration-300 pointer-events-none"
//       />

//       {/* ----------------------------------------
//           PRIMARY PLAY / PAUSE CURSOR
//       ----------------------------------------- */}

//       <div
//         ref={cursorRef}
//         className="fixed left-0 top-0 flex flex-col items-center justify-center pointer-events-none"
//       >
//         <svg
//           width="26"
//           height="26"
//           viewBox="0 0 24 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="drop-shadow-[0_0_10px_rgba(229,169,25,0.65)] filter"
//         >

//           {/* ----------------------------------------
//               GRADIENT
//           ----------------------------------------- */}

//           <defs>
//             <linearGradient
//               id="penthousePlayGrad"
//               x1="0%"
//               y1="0%"
//               x2="100%"
//               y2="100%"
//             >
//               <stop
//                 offset="0%"
//                 stopColor="#FFF4BC"
//               />

//               <stop
//                 offset="45%"
//                 stopColor="#E5A919"
//               />

//               <stop
//                 offset="100%"
//                 stopColor="#9E6F05"
//               />
//             </linearGradient>

//             <filter
//               id="goldGlowCursor"
//               x="-30%"
//               y="-30%"
//               width="160%"
//               height="160%"
//             >
//               <feGaussianBlur
//                 stdDeviation="1.5"
//                 result="blur"
//               />

//               <feComposite
//                 in="SourceGraphic"
//                 in2="blur"
//                 operator="over"
//               />
//             </filter>
//           </defs>

//           {/* ----------------------------------------
//               PLAY ICON
//           ----------------------------------------- */}

//           {cursorIcon === "play" ? (
//             <path
//               d="M7 4.5C6.17157 4.0221 5.5 4.40938 5.5 5.36442V18.6356C5.5 19.5906 6.17157 19.9779 7 19.5L18.4142 12.9216C19.2426 12.4437 19.2426 11.5563 18.4142 11.0784L7 4.5Z"
//               fill="url(#penthousePlayGrad)"
//               stroke="#FFE899"
//               strokeWidth="0.8"
//               filter="url(#goldGlowCursor)"
//             />
//           ) : (

//             /* ----------------------------------------
//                PAUSE ICON
//             ----------------------------------------- */

//             <>
//               <rect
//                 x="5.5"
//                 y="4.5"
//                 width="4.5"
//                 height="15"
//                 rx="1"
//                 fill="url(#penthousePlayGrad)"
//                 stroke="#FFE899"
//                 strokeWidth="0.6"
//                 filter="url(#goldGlowCursor)"
//               />

//               <rect
//                 x="14"
//                 y="4.5"
//                 width="4.5"
//                 height="15"
//                 rx="1"
//                 fill="url(#penthousePlayGrad)"
//                 stroke="#FFE899"
//                 strokeWidth="0.6"
//                 filter="url(#goldGlowCursor)"
//               />
//             </>
//           )}
//         </svg>

//         {/* ----------------------------------------
//             DYNAMIC LABEL
//         ----------------------------------------- */}

//         {isCustomBadge &&
//           !snappedElRef.current && (
//             <span className="mt-1 px-2 py-0.5 rounded-full bg-brand-black/90 border border-brand-gold/40 font-outfit text-[9px] font-bold tracking-[0.2em] text-brand-gold uppercase shadow-lg animate-[fadeInShort_0.2s_ease-out]">
//               {cursorType}
//             </span>
//           )}
//       </div>

//       {/* ----------------------------------------
//           LABEL ANIMATION
//       ----------------------------------------- */}

//       <style jsx global>{`
//         @keyframes fadeInShort {
//           from {
//             opacity: 0;
//             transform: translateY(4px) scale(0.9);
//           }

//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


// Cursor pause play for every click

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const [cursorType, setCursorType] = useState<string>("default");
  const [cursorIcon, setCursorIcon] = useState<"play" | "pause">("play");

  const snappedElRef = useRef<HTMLElement | null>(null);
  const pauseTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // ----------------------------------------
    // DISABLE ON TOUCH DEVICES
    // ----------------------------------------

    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) return;

    document.documentElement.classList.add(
      "custom-cursor-active"
    );

    document.body.classList.add(
      "custom-cursor-active"
    );

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // ----------------------------------------
    // INITIAL POSITION
    // ----------------------------------------

    gsap.set([cursor, follower], {
      xPercent: -50,
      yPercent: -50,
    });

    // ----------------------------------------
    // SMOOTH CURSOR MOVEMENT
    // ----------------------------------------

    const xToCursor = gsap.quickTo(cursor, "x", {
      duration: 0.05,
      ease: "power3.out",
    });

    const yToCursor = gsap.quickTo(cursor, "y", {
      duration: 0.05,
      ease: "power3.out",
    });

    const xToFollower = gsap.quickTo(follower, "x", {
      duration: 0.3,
      ease: "power3.out",
    });

    const yToFollower = gsap.quickTo(follower, "y", {
      duration: 0.3,
      ease: "power3.out",
    });

    let lastX = 0;
    let lastY = 0;
    let movementTimer:
      | ReturnType<typeof setTimeout>
      | undefined;

    // ----------------------------------------
    // MOUSE MOVE
    // ----------------------------------------

    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      const dx = clientX - lastX;
      const dy = clientY - lastY;

      const speed = Math.sqrt(
        dx * dx + dy * dy
      );

      lastX = clientX;
      lastY = clientY;

      xToCursor(clientX);
      yToCursor(clientY);

      // --------------------------------------
      // MAGNETIC FOLLOWER
      // --------------------------------------

      if (snappedElRef.current) {
        const rect =
          snappedElRef.current.getBoundingClientRect();

        const centerX =
          rect.left + rect.width / 2;

        const centerY =
          rect.top + rect.height / 2;

        xToFollower(centerX);
        yToFollower(centerY);
      } else {
        xToFollower(clientX);
        yToFollower(clientY);

        // ------------------------------------
        // CURSOR TILT / STRETCH
        // ------------------------------------

        const angle =
          Math.atan2(dy, dx) *
          (180 / Math.PI);

        const stretchScale =
          1 + Math.min(
            speed * 0.005,
            0.25
          );

        gsap.to(cursor, {
          rotation:
            speed > 2
              ? angle * 0.12
              : 0,

          scale:
            speed > 2
              ? stretchScale
              : 1,

          duration: 0.15,
          ease: "power3.out",
          overwrite: "auto",
        });

        if (movementTimer) {
          clearTimeout(movementTimer);
        }

        movementTimer = setTimeout(() => {
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

    // ----------------------------------------
    // RESTORE FOLLOWER
    // ----------------------------------------

    const restoreFollower = (
      type: string
    ) => {
      const isInteractive = [
        "hover",
        "view",
        "play",
        "open",
        "discover",
        "drag",
      ].includes(type);

      gsap.to(follower, {
        width: isInteractive ? 54 : 36,
        height: isInteractive ? 54 : 36,

        borderRadius: "50%",

        borderColor: isInteractive
          ? "#E5A919"
          : "rgba(229, 169, 25, 0.3)",

        backgroundColor: isInteractive
          ? "rgba(229, 169, 25, 0.08)"
          : "transparent",

        opacity: isInteractive
          ? 1
          : 0.6,

        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(cursor, {
        scale: isInteractive
          ? 1.35
          : 1,

        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    // ----------------------------------------
    // MOUSE OVER
    // ----------------------------------------

    const handleMouseOver = (
      e: MouseEvent
    ) => {
      const target =
        e.target as HTMLElement;

      if (!target) return;

      // --------------------------------------
      // CURSOR TARGET
      // --------------------------------------

      const cursorTarget =
        target.closest(
          "[data-cursor]"
        ) as HTMLElement | null;

      // --------------------------------------
      // MAGNETIC TARGET
      // --------------------------------------

      const magneticTarget =
        target.closest(
          "[data-magnetic]"
        ) as HTMLElement | null;

      // --------------------------------------
      // MAGNETIC ELEMENT
      // --------------------------------------

      if (magneticTarget) {
        setCursorType("hover");

        snappedElRef.current =
          magneticTarget;

        const rect =
          magneticTarget.getBoundingClientRect();

        gsap.to(follower, {
          width: rect.width + 16,
          height: rect.height + 16,

          borderRadius: "14px",
          borderColor: "#E5A919",

          backgroundColor:
            "rgba(229, 169, 25, 0.08)",

          opacity: 1,

          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(cursor, {
          scale: 1.4,
          duration: 0.2,
          ease: "back.out(1.7)",
          overwrite: "auto",
        });

        return;
      }

      // --------------------------------------
      // DATA CURSOR ELEMENT
      // --------------------------------------

      if (cursorTarget) {
        const value =
          cursorTarget.getAttribute(
            "data-cursor"
          ) || "hover";

        setCursorType(value);

        snappedElRef.current = null;

        restoreFollower(value);

        return;
      }

      // --------------------------------------
      // LINKS / BUTTONS
      // --------------------------------------

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains(
          "clickable"
        )
      ) {
        setCursorType("hover");

        snappedElRef.current = null;

        restoreFollower("hover");

        return;
      }

      // --------------------------------------
      // DEFAULT
      // --------------------------------------

      setCursorType("default");

      snappedElRef.current = null;

      restoreFollower("default");
    };

    // ----------------------------------------
    // CLICK FEEDBACK
    // ----------------------------------------

    const handleMouseDown = (
      e: MouseEvent
    ) => {
      const target =
        e.target as HTMLElement;

      if (!target) return;

      // --------------------------------------
      // ONLY MEDIA CLICKS
      // --------------------------------------

      // const mediaTarget =
      //   target.closest(
      //     "[data-media]"
      //   ) ||
      //   target.closest(
      //     "[data-cursor='play']"
      //   );
      const mediaTarget = target;

      if (!mediaTarget) return;

      // Ignore normal clicks
      if (!mediaTarget) return;

      // --------------------------------------
      // CLEAR OLD TIMER
      // --------------------------------------

      if (pauseTimeoutRef.current) {
        clearTimeout(
          pauseTimeoutRef.current
        );

        pauseTimeoutRef.current = null;
      }

      // --------------------------------------
      // PLAY → PAUSE
      // --------------------------------------

      setCursorIcon("pause");

      // --------------------------------------
      // PAUSE → PLAY
      // --------------------------------------

      pauseTimeoutRef.current =
        setTimeout(() => {
          setCursorIcon("play");

          pauseTimeoutRef.current =
            null;
        }, 300);
    };

    // ----------------------------------------
    // MOUSE LEAVE
    // ----------------------------------------

    const handleMouseLeave = () => {
      gsap.to(
        [cursor, follower],
        {
          opacity: 0,
          duration: 0.2,
        }
      );
    };

    // ----------------------------------------
    // MOUSE ENTER
    // ----------------------------------------

    const handleMouseEnter = () => {
      gsap.to(
        [cursor, follower],
        {
          opacity: 1,
          duration: 0.2,
        }
      );
    };

    // ----------------------------------------
    // EVENT LISTENERS
    // ----------------------------------------

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseover",
      handleMouseOver
    );

    window.addEventListener(
      "mousedown",
      handleMouseDown
    );

    document.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    document.addEventListener(
      "mouseenter",
      handleMouseEnter
    );

    // ----------------------------------------
    // CLEANUP
    // ----------------------------------------

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseover",
        handleMouseOver
      );

      window.removeEventListener(
        "mousedown",
        handleMouseDown
      );

      document.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      document.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );

      document.documentElement.classList.remove(
        "custom-cursor-active"
      );

      document.body.classList.remove(
        "custom-cursor-active"
      );

      if (movementTimer) {
        clearTimeout(
          movementTimer
        );
      }

      if (pauseTimeoutRef.current) {
        clearTimeout(
          pauseTimeoutRef.current
        );

        pauseTimeoutRef.current = null;
      }

      gsap.killTweensOf(cursor);
      gsap.killTweensOf(follower);
    };
  }, []);

  // ----------------------------------------
  // CUSTOM LABEL TYPES
  // ----------------------------------------

  const isCustomBadge = [
    "view",
    "play",
    "open",
    "discover",
    "drag",
  ].includes(cursorType);

  // ----------------------------------------
  // RENDER
  // ----------------------------------------

  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-[99999]
        hidden
        md:block
        select-none
      "
    >

      {/* ======================================
          OUTER FOLLOWER
      ======================================= */}

      <div
        ref={followerRef}
        className="
          fixed
          left-0
          top-0
          rounded-full
          border
          border-brand-gold/30
          shadow-[0_0_15px_rgba(229,169,25,0.15)]
          transition-colors
          duration-300
          pointer-events-none
        "
      />

      {/* ======================================
          MAIN CURSOR
      ======================================= */}

      <div
        ref={cursorRef}
        className="
          fixed
          left-0
          top-0
          flex
          flex-col
          items-center
          justify-center
          pointer-events-none
        "
      >

        {/* ====================================
            ICON
        ===================================== */}

        <div
          style={{
            transition:
              "transform 180ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease",
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="
              drop-shadow-[0_0_10px_rgba(229,169,25,0.65)]
              filter
            "
          >

            {/* ==================================
                GOLD GRADIENT
            =================================== */}

            <defs>
              <linearGradient
                id="penthousePlayGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#FFF4BC"
                />

                <stop
                  offset="45%"
                  stopColor="#E5A919"
                />

                <stop
                  offset="100%"
                  stopColor="#9E6F05"
                />
              </linearGradient>

              <filter
                id="goldGlowCursor"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feGaussianBlur
                  stdDeviation="1.5"
                  result="blur"
                />

                <feComposite
                  in="SourceGraphic"
                  in2="blur"
                  operator="over"
                />
              </filter>
            </defs>

            {/* ==================================
                PLAY
            =================================== */}

            {cursorIcon === "play" && (
              <path
                d="
                  M7 4.5
                  C6.17157 4.0221
                  5.5 4.40938
                  5.5 5.36442
                  V18.6356
                  C5.5 19.5906
                  6.17157 19.9779
                  7 19.5
                  L18.4142 12.9216
                  C19.2426 12.4437
                  19.2426 11.5563
                  18.4142 11.0784
                  L7 4.5Z
                "
                fill="url(#penthousePlayGrad)"
                stroke="#FFE899"
                strokeWidth="0.8"
                filter="url(#goldGlowCursor)"
              />
            )}

            {/* ==================================
                PAUSE
            =================================== */}

            {cursorIcon === "pause" && (
              <>
                <rect
                  x="5.5"
                  y="4.5"
                  width="4.5"
                  height="15"
                  rx="1"
                  fill="url(#penthousePlayGrad)"
                  stroke="#FFE899"
                  strokeWidth="0.6"
                  filter="url(#goldGlowCursor)"
                />

                <rect
                  x="14"
                  y="4.5"
                  width="4.5"
                  height="15"
                  rx="1"
                  fill="url(#penthousePlayGrad)"
                  stroke="#FFE899"
                  strokeWidth="0.6"
                  filter="url(#goldGlowCursor)"
                />
              </>
            )}
          </svg>
        </div>

        {/* ====================================
            DYNAMIC LABEL
        ===================================== */}

        {isCustomBadge &&
          !snappedElRef.current && (
            <span
              className="
                mt-1
                px-2
                py-0.5
                rounded-full
                bg-brand-black/90
                border
                border-brand-gold/40
                font-outfit
                text-[9px]
                font-bold
                tracking-[0.2em]
                text-brand-gold
                uppercase
                shadow-lg
              "
            >
              {cursorType}
            </span>
          )}
      </div>
    </div>
  );
}