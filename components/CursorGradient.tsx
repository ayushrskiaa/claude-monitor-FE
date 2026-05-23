'use client';

import { useEffect, useRef } from 'react';

export function CursorGradient() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gradientRef.current;
    if (!el) return;

    let rafId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);
      el.style.left = `${currentX}px`;
      el.style.top = `${currentY}px`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={gradientRef}
      aria-hidden="true"
      className="pointer-events-none fixed z-0"
      style={{
        width: 700,
        height: 700,
        marginLeft: -350,
        marginTop: -350,
        background: 'radial-gradient(circle, rgba(153,69,222,0.07) 0%, rgba(153,69,222,0.03) 35%, transparent 70%)',
        willChange: 'left, top',
      }}
    />
  );
}
