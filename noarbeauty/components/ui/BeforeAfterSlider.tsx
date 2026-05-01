"use client";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";

interface Props {
  before: string;
  after: string;
  className?: string;
}

export default function BeforeAfterSlider({ before, after, className = "" }: Props) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-[0.8rem] cursor-col-resize bg-[#b2c1c8] ${className}`}
      onMouseDown={(e) => { dragging.current = true; updatePos(e.clientX); }}
      onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={(e) => { dragging.current = true; updatePos(e.touches[0].clientX); }}
      onTouchMove={(e) => { e.preventDefault(); updatePos(e.touches[0].clientX); }}
      onTouchEnd={() => { dragging.current = false; }}
    >
      {/* After image (full width base) */}
      <Image src={after} alt="Posle" fill className="object-cover object-top" unoptimized draggable={false} />

      {/* Before image (clipped to left side) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image src={before} alt="Pre" fill className="object-cover object-top" unoptimized draggable={false} />
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest text-white bg-black/25 px-2 py-0.5 rounded pointer-events-none">
        Pre
      </span>
      <span className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-white bg-black/25 px-2 py-0.5 rounded pointer-events-none">
        Posle
      </span>

      {/* Divider line */}
      <div
        className="absolute inset-y-0 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 -translate-x-1/2 w-0.5 bg-white" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6 9H12M6 9L4 7M6 9L4 11M12 9L14 7M12 9L14 11" stroke="#233137" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
