"use client";
import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
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
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;

      const t = `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`;

      if (orb1Ref.current) orb1Ref.current.style.transform = t;
      if (orb2Ref.current) orb2Ref.current.style.transform = t;

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
      <div
        ref={orb1Ref}
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 dark:opacity-25 blur-[120px] pointer-events-none will-change-transform"
        style={{
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
        }}
      />

      <div
        ref={orb2Ref}
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 dark:opacity-20 blur-[120px] pointer-events-none will-change-transform"
        style={{
          background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
