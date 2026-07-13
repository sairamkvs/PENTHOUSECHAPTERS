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
      // 1. Scale vertical golden line based on timeline scroll progress
      if (progressRef.current && trackRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 45%",
              end: "bottom 45%",
              scrub: 0.5,
            },
          }
        );
      }

      // 2. Active highlights on individual steps & cards reveal
      const steps = gsap.utils.toArray(".timeline-node");
      steps.forEach((step: any, idx: number) => {
        gsap.fromTo(
          step.querySelector(".node-content"),
          { opacity: 0.2, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 70%",
              end: "top 40%",
              scrub: true,
              onEnter: () => {
                step.querySelector(".node-circle").classList.add("active-circle");
              },
              onLeaveBack: () => {
                step.querySelector(".node-circle").classList.remove("active-circle");
              }
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative w-full bg-brand-black px-6 md:px-12 py-24 md:py-36 border-t border-white/5 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        
        {/* Section Title */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-[1px] w-8 bg-brand-gold" />
          <h2 className="font-outfit text-xs font-bold tracking-[0.3em] text-brand-gold uppercase">
            OUR PROCESS
          </h2>
          <span className="h-[1px] w-8 bg-brand-gold" />
        </div>

        <h3 className="font-syne text-3xl md:text-5xl font-extrabold text-center text-white mb-20 uppercase tracking-wide">
          How We Bring Vision To Life
        </h3>

        {/* Timeline Container */}
        <div ref={trackRef} className="relative w-full">
          
          {/* Vertical Track Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-gray -translate-x-1/2 z-0" />
          
          {/* Vertical Progress Gold Line */}
          <div
            ref={progressRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-gold -translate-x-1/2 origin-top z-10"
            style={{ transform: "scaleY(0)" }}
          />

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-16 md:gap-24 relative z-20">
            {PROCESS_DATA.map((step, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.id}
                  className="timeline-node grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                >
                  
                  {/* Left Column (Desktop layout) */}
                  <div
                    className={cn(
                      "hidden md:block md:col-span-5 text-right node-content",
                      isEven ? "opacity-100" : "pointer-events-none opacity-0"
                    )}
                  >
                    {isEven && (
                      <div>
                        <span className="font-outfit text-4xl font-extrabold text-brand-gold/30 tracking-wider">
                          {step.number}
                        </span>
                        <h4 className="font-syne text-xl font-bold text-white uppercase mt-2 mb-3">
                          {step.title}
                        </h4>
                        <p className="font-inter text-sm text-brand-muted leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center Circle Column */}
                  <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                    <div
                      className={cn(
                        "node-circle h-9 w-9 rounded-full bg-brand-black border-2 border-brand-gray flex items-center justify-center font-outfit text-xs font-bold text-brand-muted transition-all duration-300 relative z-30 shadow-[0_0_10px_rgba(0,0,0,0.5)]",
                        "node-circle-active"
                      )}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Right Column (Desktop layout) */}
                  <div
                    className={cn(
                      "col-span-11 md:col-span-5 text-left node-content",
                      !isEven ? "opacity-100" : "md:pointer-events-none md:opacity-0"
                    )}
                  >
                    {/* Render content on mobile or on alternate sides for desktop */}
                    <div className="md:hidden">
                      <h4 className="font-syne text-xl font-bold text-white uppercase mb-2">
                        {step.title}
                      </h4>
                      <p className="font-inter text-sm text-brand-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    
                    {!isEven && (
                      <div className="hidden md:block">
                        <span className="font-outfit text-4xl font-extrabold text-brand-gold/30 tracking-wider">
                          {step.number}
                        </span>
                        <h4 className="font-syne text-xl font-bold text-white uppercase mt-2 mb-3">
                          {step.title}
                        </h4>
                        <p className="font-inter text-sm text-brand-muted leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .node-circle.active-circle {
          border-color: #E5A919 !important;
          background-color: #E5A919 !important;
          color: #060606 !important;
          box-shadow: 0 0 15px rgba(229, 169, 25, 0.4) !important;
        }
      `}</style>
    </section>
  );
}
