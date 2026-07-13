import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * A hook that adds a premium magnetic hover effect to elements.
 * @param strength The intensity of the magnetic pull (0.1 to 0.8 recommended).
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<any>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      
      // Calculate cursor position relative to the center of the element
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = e.clientX - centerX;
      const y = e.clientY - centerY;

      // Animate the element translation towards the mouse
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      // Spring back to base position
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1.1, 0.4)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return ref;
}
