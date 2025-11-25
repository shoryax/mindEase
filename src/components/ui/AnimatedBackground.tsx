"use client";
import { useEffect, useRef } from "react";

const InteractiveBackground = () => {
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let rafId: number;
    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.15;
      current.current.y += (target.current.y - current.current.y) * 0.15;

      const x = current.current.x;
      const y = current.current.y;

      // Absolutely correct centering
      const t = `translate(${x}px, ${y}px) translate(-50%, -50%)`;

      if (orb1Ref.current) {
        orb1Ref.current.style.transform = t;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = t;
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />

      <div
        ref={orb1Ref}
        className="absolute w-[500px] h-[500px] rounded-full opacity-40 blur-3xl pointer-events-none will-change-transform"
        style={{
          background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
        }}
      />

      <div
        ref={orb2Ref}
        className="absolute w-[400px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none will-change-transform"
        style={{
          background: `radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
