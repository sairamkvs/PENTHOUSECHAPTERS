// "use client";

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { PROCESS_DATA } from "@/constants/data";
// import { cn } from "@/lib/utils";

// gsap.registerPlugin(ScrollTrigger);

// export default function Process() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const trackRef = useRef<HTMLDivElement>(null);
//   const progressRef = useRef<HTMLDivElement>(null);

//   // useEffect(() => {
//   //   const ctx = gsap.context(() => {
//   //     // 1. Scale vertical golden line based on timeline scroll progress
//   //     if (progressRef.current && trackRef.current) {
//   //       gsap.fromTo(
//   //         progressRef.current,
//   //         { scaleY: 0 },
//   //         {
//   //           scaleY: 1,
//   //           ease: "none",
//   //           scrollTrigger: {
//   //             trigger: trackRef.current,
//   //             start: "top 20%",
//   //             end: "bottom 40%",
//   //             scrub: 0.5,
//   //           },
//   //         }
//   //       );
//   //     }

//   //     // 2. Active highlights on individual steps & cards reveal
//   //     const steps = gsap.utils.toArray(".timeline-node");
//   //     steps.forEach((step: any, idx: number) => {
//   //       gsap.fromTo(
//   //         step.querySelector(".node-content"),
//   //         { opacity: 0.2, y: 30 },
//   //         {
//   //           opacity: 1,
//   //           y: 0,
//   //           duration: 0.8,
//   //           ease: "power2.out",
//   //           scrollTrigger: {
//   //             trigger: step,
//   //             start: "top 70%",
//   //             end: "top 40%",
//   //             scrub: true,
//   //             onEnter: () => {
//   //               step.querySelector(".node-circle").classList.add("active-circle");
//   //             },
//   //             onLeaveBack: () => {
//   //               step.querySelector(".node-circle").classList.remove("active-circle");
//   //             }
//   //           },
//   //         }
//   //       );
//   //     });
//   //   }, containerRef);

//   //   return () => ctx.revert();
//   // }, []);
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const track = trackRef.current;
//       const progress = progressRef.current;

//       if (!track || !progress) return;

//       const steps = gsap.utils.toArray<HTMLElement>(
//         ".timeline-node"
//       );

//       const circles = gsap.utils.toArray<HTMLElement>(
//         ".node-circle"
//       );

//       ScrollTrigger.create({
//         trigger: track,
//         start: "top 45%",
//         end: "bottom 45%",
//         scrub: 0.5,

//         onUpdate: (self) => {
//           // Move gold progress line
//           gsap.set(progress, {
//             scaleY: self.progress,
//           });

//           // Highlight nodes reached by the line
//           const linePosition =
//             track.offsetHeight * self.progress;

//           steps.forEach((step, index) => {
//             const circle = circles[index];

//             if (!circle) return;

//             const nodePosition =
//               step.offsetTop + step.offsetHeight / 2;

//             if (linePosition >= nodePosition) {
//               circle.classList.add("active-circle");
//             } else {
//               circle.classList.remove("active-circle");
//             }
//           });
//         },
//       });

//       // Content reveal
//       steps.forEach((step) => {
//         const content =
//           step.querySelector(".node-content");

//         if (!content) return;

//         gsap.fromTo(
//           content,
//           { opacity: 0.2, y: 30 },
//           {
//             opacity: 1,
//             y: 0,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: step,
//               start: "top 70%",
//               end: "top 40%",
//               scrub: true,
//             },
//           }
//         );
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       id="process"
//       className="relative w-full bg-brand-black px-6 md:px-12 py-24 md:py-36 border-t border-white/5 overflow-hidden"
//     >
//       {/* Background radial glow */}
//       <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-600/5 blur-[150px] pointer-events-none" />

//       <div className="max-w-4xl mx-auto">

//         {/* Section Title */}
//         <div className="flex items-center justify-center gap-3 mb-6">
//           <span className="h-[1px] w-8 bg-brand-gold" />
//           <h2 className="font-outfit text-xs font-bold tracking-[0.3em] text-brand-gold uppercase">
//             OUR PROCESS
//           </h2>
//           <span className="h-[1px] w-8 bg-brand-gold" />
//         </div>

//         <h3 className="font-syne text-3xl md:text-5xl font-extrabold text-center text-white mb-20 uppercase tracking-wide">
//           How We Bring Vision To Life
//         </h3>

//         {/* Timeline Container */}
//         <div ref={trackRef} className="relative w-full">

//           {/* Vertical Track Line */}
//           <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-gray -translate-x-1/2 z-0" />

//           {/* Vertical Progress Gold Line */}
//           <div
//             ref={progressRef}
//             className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-gold -translate-x-1/2 origin-top z-10"
//             style={{ transform: "scaleY(0)" }}
//           />

//           {/* Timeline Nodes */}
//           <div className="flex flex-col gap-16 md:gap-24 relative z-20">
//             {PROCESS_DATA.map((step, idx) => {
//               const isEven = idx % 2 === 0;

//               return (
//                 <div
//                   key={step.id}
//                   className="timeline-node grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
//                 >

//                   {/* Left Column (Desktop layout) */}
//                   <div
//                     className={cn(
//                       "hidden md:block md:col-span-5 text-right node-content",
//                       isEven ? "opacity-100" : "pointer-events-none opacity-0"
//                     )}
//                   >
//                     {isEven && (
//                       <div>
//                         <span className="font-outfit text-4xl font-extrabold text-brand-gold/30 tracking-wider">
//                           {step.number}
//                         </span>
//                         <h4 className="font-syne text-xl font-bold text-white uppercase mt-2 mb-3">
//                           {step.title}
//                         </h4>
//                         <p className="font-inter text-sm text-brand-muted leading-relaxed">
//                           {step.description}
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   {/* Center Circle Column */}
//                   <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
//                     <div
//                       className={cn(
//                         "node-circle h-9 w-9 rounded-full bg-brand-black border-2 border-brand-gray flex items-center justify-center font-outfit text-xs font-bold text-brand-muted transition-colors duration-300 relative z-30 shadow-[0_0_10px_rgba(0,0,0,0.5)]",
//                         //"node-circle-active"
//                       )}
//                     >
//                       {step.number}
//                     </div>
//                   </div>

//                   {/* Right Column (Desktop layout) */}
//                   <div
//                     className={cn(
//                       "col-span-11 md:col-span-5 text-left node-content",
//                       !isEven ? "opacity-100" : "md:pointer-events-none md:opacity-0"
//                     )}
//                   >
//                     {/* Render content on mobile or on alternate sides for desktop */}
//                     <div className="md:hidden">
//                       <h4 className="font-syne text-xl font-bold text-white uppercase mb-2">
//                         {step.title}
//                       </h4>
//                       <p className="font-inter text-sm text-brand-muted leading-relaxed">
//                         {step.description}
//                       </p>
//                     </div>

//                     {!isEven && (
//                       <div className="hidden md:block">
//                         <span className="font-outfit text-4xl font-extrabold text-brand-gold/30 tracking-wider">
//                           {step.number}
//                         </span>
//                         <h4 className="font-syne text-xl font-bold text-white uppercase mt-2 mb-3">
//                           {step.title}
//                         </h4>
//                         <p className="font-inter text-sm text-brand-muted leading-relaxed">
//                           {step.description}
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .node-circle.active-circle {
//           border-color: #E5A919 !important;
//           background-color: #E5A919 !important;
//           color: #060606 !important;
//           box-shadow: 0 0 12px rgba(229, 169, 25, 0.45),
//                       0 0 28px rgba(229, 169, 25, 0.2);
//         }
//       `}</style>
//     </section>
//   );
// }


//new implmentation for process working but big 
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_DATA } from "@/constants/data";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const progress = progressRef.current;

      if (!track || !progress) return;

      const nodes = gsap.utils.toArray<HTMLElement>(
        ".timeline-node"
      );

      // ----------------------------------------
      // INITIAL STATE
      // ----------------------------------------

      gsap.set(progress, {
        scaleY: 0,
      });

      // ----------------------------------------
      // MAIN SCROLL TIMELINE
      // ----------------------------------------

      ScrollTrigger.create({
        trigger: track,
        start: "top 50%",
        end: "bottom 50%",
        scrub: 0.5,

        onUpdate: (self) => {
          // --------------------------------------
          // GOLD LINE
          // --------------------------------------

          gsap.set(progress, {
            scaleY: self.progress,
          });

          // --------------------------------------
          // TRACK POSITION
          // --------------------------------------

          const trackRect =
            track.getBoundingClientRect();

          const linePosition =
            track.offsetHeight * self.progress;

          // --------------------------------------
          // CHECK EVERY STEP
          // --------------------------------------

          nodes.forEach((node) => {
            const circle =
              node.querySelector(
                ".node-circle"
              ) as HTMLElement | null;

            const numbers =
              node.querySelectorAll(
                ".step-number"
              );

            if (!circle) return;

            const circleRect =
              circle.getBoundingClientRect();

            // Circle center relative to track
            const circlePosition =
              circleRect.top -
              trackRect.top +
              circleRect.height / 2;

            const isActive =
              linePosition >= circlePosition;

            // ------------------------------------
            // ACTIVE
            // ------------------------------------

            if (isActive) {
              circle.classList.add(
                "active-circle"
              );

              numbers.forEach((number) => {
                number.classList.add(
                  "active-number"
                );
              });
            }

            // ------------------------------------
            // INACTIVE WHEN SCROLLING BACK
            // ------------------------------------

            else {
              circle.classList.remove(
                "active-circle"
              );

              numbers.forEach((number) => {
                number.classList.remove(
                  "active-number"
                );
              });
            }
          });
        },
      });

      // ----------------------------------------
      // CONTENT REVEAL
      // ----------------------------------------

      nodes.forEach((node) => {
        const content =
          node.querySelectorAll(
            ".node-content"
          );

        content.forEach((element) => {
          gsap.fromTo(
            element,
            {
              opacity: 0.2,
              y: 25,
            },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",

              scrollTrigger: {
                trigger: node,
                start: "top 75%",
                end: "top 45%",
                scrub: true,
              },
            }
          );
        });
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="process"
      className="
        relative
        w-full
        bg-brand-black
        px-5
        sm:px-6
        md:px-12
        py-24
        md:py-36
        border-t
        border-white/5
        overflow-hidden
      "
    >
      {/* Background glow */}

      <div
        className="
          absolute
          top-1/2
          left-1/4
          -translate-y-1/2
          h-[400px]
          w-[400px]
          md:h-[500px]
          md:w-[500px]
          rounded-full
          bg-amber-600/5
          blur-[130px]
          md:blur-[150px]
          pointer-events-none
        "
      />

      <div className="relative max-w-5xl mx-auto">

        {/* --------------------------------------
            SECTION LABEL
        --------------------------------------- */}

        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-7 bg-brand-gold" />

          <h2
            className="
              font-outfit
              text-[10px]
              md:text-xs
              font-bold
              tracking-[0.3em]
              text-brand-gold
              uppercase
            "
          >
            OUR PROCESS
          </h2>

          <span className="h-px w-7 bg-brand-gold" />
        </div>

        {/* --------------------------------------
            TITLE
        --------------------------------------- */}

        <h3
          className="
            font-syne
            text-2xl
            sm:text-3xl
            md:text-5xl
            font-extrabold
            text-center
            text-white
            mb-16
            md:mb-24
            uppercase
            tracking-wide
            leading-tight
          "
        >
          How We Bring Vision To Life
        </h3>

        {/* --------------------------------------
            TIMELINE
        --------------------------------------- */}

        <div
          ref={trackRef}
          className="relative w-full"
        >

          {/* BASE LINE */}

          <div
            className="
              absolute
              left-[18px]
              md:left-1/2
              top-0
              bottom-0
              w-[2px]
              bg-brand-gray
              -translate-x-1/2
              z-0
            "
          />

          {/* GOLD PROGRESS LINE */}

          <div
            ref={progressRef}
            className="
              absolute
              left-[18px]
              md:left-1/2
              top-0
              bottom-0
              w-[2px]
              bg-brand-gold
              -translate-x-1/2
              origin-top
              z-10
              shadow-[0_0_10px_rgba(229,169,25,0.45)]
            "
            style={{
              transform:
                "translateX(-50%) scaleY(0)",
            }}
          />

          {/* STEPS */}

          <div
            className="
              relative
              z-20
              flex
              flex-col
              gap-20
              md:gap-28
            "
          >
            {PROCESS_DATA.map(
              (step, index) => {
                const isEven =
                  index % 2 === 0;

                return (
                  <div
                    key={step.id}
                    className="
                      timeline-node
                      grid
                      grid-cols-[36px_1fr]
                      md:grid-cols-12
                      gap-5
                      md:gap-8
                      items-center
                      min-h-[110px]
                    "
                  >

                    {/* ==================================
                        DESKTOP LEFT
                    ================================== */}

                    <div
                      className={cn(
                        `
                          hidden
                          md:block
                          md:col-span-5
                          node-content
                        `,
                        isEven
                          ? "text-right"
                          : "opacity-0 pointer-events-none"
                      )}
                    >
                      {isEven && (
                        <div>
                          <span
                            className="
                              step-number
                              font-outfit
                              text-4xl
                              font-extrabold
                              text-brand-gold/30
                              tracking-wider
                            "
                          >
                            {step.number}
                          </span>

                          <h4
                            className="
                              font-syne
                              text-xl
                              font-bold
                              text-white
                              uppercase
                              mt-2
                              mb-3
                            "
                          >
                            {step.title}
                          </h4>

                          <p
                            className="
                              font-inter
                              text-sm
                              text-brand-muted
                              leading-relaxed
                            "
                          >
                            {step.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* ==================================
                        CENTER NODE
                    ================================== */}

                    <div
                      className="
                        col-span-1
                        md:col-span-2
                        flex
                        justify-center
                        items-center
                      "
                    >
                      <div
                        className="
                          node-circle
                          h-9
                          w-9
                          md:h-10
                          md:w-10
                          rounded-full
                          bg-brand-black
                          border-2
                          border-brand-gray
                          flex
                          items-center
                          justify-center
                          font-outfit
                          text-[10px]
                          md:text-xs
                          font-bold
                          text-brand-muted
                          relative
                          z-30
                          shadow-[0_0_10px_rgba(0,0,0,0.5)]
                          transition-all
                          duration-300
                        "
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* ==================================
                        RIGHT CONTENT
                    ================================== */}

                    <div
                      className={cn(
                        `
                          col-span-1
                          md:col-span-5
                          node-content
                          text-left
                        `,
                        isEven
                          ? "md:opacity-0 md:pointer-events-none"
                          : ""
                      )}
                    >

                      {/* MOBILE */}

                      <div className="md:hidden">
                        <span
                          className="
                            step-number
                            block
                            font-outfit
                            text-3xl
                            font-extrabold
                            text-brand-gold/30
                            tracking-wider
                            mb-1
                          "
                        >
                          {step.number}
                        </span>

                        <h4
                          className="
                            font-syne
                            text-lg
                            sm:text-xl
                            font-bold
                            text-white
                            uppercase
                            mb-2
                            leading-tight
                          "
                        >
                          {step.title}
                        </h4>

                        <p
                          className="
                            font-inter
                            text-xs
                            sm:text-sm
                            text-brand-muted
                            leading-relaxed
                            max-w-[95%]
                          "
                        >
                          {step.description}
                        </p>
                      </div>

                      {/* DESKTOP RIGHT */}

                      {!isEven && (
                        <div className="hidden md:block">
                          <span
                            className="
                              step-number
                              font-outfit
                              text-4xl
                              font-extrabold
                              text-brand-gold/30
                              tracking-wider
                            "
                          >
                            {step.number}
                          </span>

                          <h4
                            className="
                              font-syne
                              text-xl
                              font-bold
                              text-white
                              uppercase
                              mt-2
                              mb-3
                            "
                          >
                            {step.title}
                          </h4>

                          <p
                            className="
                              font-inter
                              text-sm
                              text-brand-muted
                              leading-relaxed
                            "
                          >
                            {step.description}
                          </p>
                        </div>
                      )}

                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}