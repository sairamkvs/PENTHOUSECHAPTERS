"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BIO_TEXT } from "@/constants/data";

gsap.registerPlugin(ScrollTrigger);

export default function Bio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLParagraphElement>(null);
  const textRef2 = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split paragraph function to wrap each word in an animatable span
      const splitIntoWords = (el: HTMLParagraphElement | null) => {
        if (!el) return;
        const text = el.textContent || "";
        const words = text.split(" ");
        el.innerHTML = words
          .map((word) => `<span class="inline-block text-white/10 mr-[0.25em] transition-colors duration-200">${word}</span>`)
          .join("");
      };

      splitIntoWords(textRef1.current);
      splitIntoWords(textRef2.current);

      // Animate paragraph 1 words to full white
      if (textRef1.current) {
        const words = textRef1.current.querySelectorAll("span");
        gsap.to(words, {
          color: "#ffffff",
          stagger: 0.1,
          scrollTrigger: {
            trigger: textRef1.current,
            start: "top 75%",
            end: "bottom 35%",
            scrub: 0.5,
          },
        });
      }

      // Animate paragraph 2 words to brand gold
      if (textRef2.current) {
        const words = textRef2.current.querySelectorAll("span");
        gsap.to(words, {
          color: "#E5A919",
          stagger: 0.1,
          scrollTrigger: {
            trigger: textRef2.current,
            start: "top 75%",
            end: "bottom 35%",
            scrub: 0.5,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full bg-brand-black px-6 md:px-12 py-24 md:py-36 border-t border-white/5 overflow-hidden"
    >
      {/* Dynamic Ambient Background Element */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-[1px] w-8 bg-brand-gold" />
          <h2 className="font-outfit text-xs font-bold tracking-[0.3em] text-brand-gold uppercase">
            ABOUT PENTHOUSE CHAPTERS
          </h2>
        </div>

        {/* Illuminated Bio copy */}
        <p
          ref={textRef1}
          className="font-syne text-xl sm:text-2xl md:text-4xl font-semibold leading-[1.35] text-white/10 mb-10 text-left"
        >
          {BIO_TEXT.paragraph1}
        </p>

        <p
          ref={textRef2}
          className="font-syne text-xl sm:text-2xl md:text-4xl font-semibold leading-[1.35] text-white/10 text-left"
        >
          {BIO_TEXT.paragraph2}
        </p>
      </div>
    </section>
  );
}
