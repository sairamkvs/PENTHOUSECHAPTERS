"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  
  // Oscillators for the ambient chord drone
  const oscsRef = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);
  
  // Track scroll for modulating filter cutoff
  const targetFilterFreq = useRef(180);
  const currentFilterFreq = useRef(180);

  // Initialize Audio Context on demand
  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Main Gain Node - start at 0
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0, ctx.currentTime);
      mainGain.connect(ctx.destination);
      mainGainRef.current = mainGain;

      // Biquad Lowpass Filter for warm ambient sound
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.Q.setValueAtTime(3, ctx.currentTime);
      filter.frequency.setValueAtTime(180, ctx.currentTime);
      filter.connect(mainGain);
      filterRef.current = filter;

      // Synth Drone Oscillators (A1=55Hz, A2=110Hz, E3=165Hz forming a fifth chord)
      const frequencies = [55, 110, 165];
      const oscTypes: OscillatorType[] = ["sine", "sawtooth", "triangle"];
      const gains = [0.35, 0.12, 0.2];

      frequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        osc.type = oscTypes[index];
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Detune for chorus effect
        if (index > 0) {
          osc.detune.setValueAtTime((index === 1 ? -10 : 10), ctx.currentTime);
        }

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(gains[index], ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        oscsRef.current.push(osc);
        
        osc.start();
      });

      // LFO to slowly modulate the filter cutoff (breathing effect)
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime);

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(30, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      lfoRef.current = lfo;

    } catch (e) {
      console.warn("Web Audio API not supported or blocked: ", e);
    }
  };

  // Play micro hover sound (soft lowpass tick)
  const playHoverSound = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || !isPlayingRef.current || ctx.state !== "running") return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(filter);
      filter.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {
      // Ignore audio sfx glitches
    }
  };

  // Play micro click sound (low bass pulse)
  const playClickSound = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || !isPlayingRef.current || ctx.state !== "running") return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(90, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch (e) {
      // Ignore audio sfx glitches
    }
  };

  // Trigger sound engine state toggle
  const toggleSound = async () => {
    initAudio();
    const ctx = audioCtxRef.current;
    const mainGain = mainGainRef.current;
    if (!ctx || !mainGain) return;

    if (isPlayingRef.current) {
      // Fade out volume
      mainGain.gain.cancelScheduledValues(ctx.currentTime);
      mainGain.gain.setValueAtTime(mainGain.gain.value, ctx.currentTime);
      mainGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      
      setTimeout(() => {
        if (ctx.state === "running" && !isPlayingRef.current) {
          ctx.suspend();
        }
      }, 450);

      isPlayingRef.current = false;
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent("cinematic-sound-state", { detail: { active: false } }));
    } else {
      // Resume context if suspended
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      // Fade in volume to 0.35
      const currentVal = Math.max(mainGain.gain.value, 0.0001);
      mainGain.gain.cancelScheduledValues(ctx.currentTime);
      mainGain.gain.setValueAtTime(currentVal, ctx.currentTime);
      mainGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.8);
      
      isPlayingRef.current = true;
      setIsPlaying(true);
      window.dispatchEvent(new CustomEvent("cinematic-sound-state", { detail: { active: true } }));
    }
  };

  useEffect(() => {
    // 1. Listen to toggle trigger
    const handleToggleRequest = () => {
      toggleSound();
    };

    window.addEventListener("toggle-cinematic-sound" as any, handleToggleRequest);

    // 2. Track scroll to modulate filter cutoff frequency
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const speed = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      const boost = Math.min(speed * 3.5, 450);
      targetFilterFreq.current = 180 + boost;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        targetFilterFreq.current = 180;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);

    // Smoothly animate filter frequency
    let animFrame: number;
    const updateFilterFreq = () => {
      if (filterRef.current && audioCtxRef.current) {
        currentFilterFreq.current += (targetFilterFreq.current - currentFilterFreq.current) * 0.08;
        try {
          filterRef.current.frequency.setValueAtTime(currentFilterFreq.current, audioCtxRef.current.currentTime);
        } catch(e) {}
      }
      animFrame = requestAnimationFrame(updateFilterFreq);
    };
    updateFilterFreq();

    // 3. Bind global micro sound triggers
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest("a") || target.closest("button") || target.closest("[data-cursor]")) {
        playClickSound();
      }
    };

    const handleGlobalMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest("a") || target.closest("button") || target.closest("[data-cursor]")) {
        const interactiveEl = target.closest("a, button, [data-cursor]");
        if (interactiveEl && (interactiveEl as any)._lastHovered !== true) {
          (interactiveEl as any)._lastHovered = true;
          playHoverSound();
          setTimeout(() => {
            if (interactiveEl) (interactiveEl as any)._lastHovered = false;
          }, 800);
        }
      }
    };

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("mouseover", handleGlobalMouseOver);

    return () => {
      window.removeEventListener("toggle-cinematic-sound" as any, handleToggleRequest);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animFrame);
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("mouseover", handleGlobalMouseOver);
      
      // Cleanup audio nodes only when component completely unmounts
      oscsRef.current.forEach(osc => {
        try { osc.stop(); } catch(e) {}
      });
      if (lfoRef.current) {
        try { lfoRef.current.stop(); } catch(e) {}
      }
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch(e) {}
      }
    };
  }, []);

  return null;
}
