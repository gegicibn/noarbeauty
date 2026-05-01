"use client";
import { useEffect, useRef } from "react";

interface Landmark {
  x: number;  // 0-1 (normalizovano)
  y: number;
  z?: number;
}

interface Props {
  imageUrl: string;
  landmarks?: Landmark[];
  annotations?: {
    label: string;
    x: number;  // 0-1
    y: number;
    arrow?: { dx: number; dy: number };
  }[];
  width?: number;
  height?: number;
}

export default function LandmarkOverlay({ imageUrl, landmarks, annotations, width = 600, height = 700 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;

      // Iscrtaj sliku
      ctx.drawImage(img, 0, 0, width, height);

      // Iscrtaj landmark tačke
      if (landmarks && landmarks.length > 0) {
        // Mrežne tačke — sitne, poluprovidne
        ctx.fillStyle = "rgba(201, 169, 110, 0.4)";
        landmarks.forEach(({ x, y }) => {
          ctx.beginPath();
          ctx.arc(x * width, y * height, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // Ključne tačke — veće
        const KEY_INDICES = [10, 152, 234, 454, 4, 94, 33, 263, 61, 291, 17, 168];
        ctx.fillStyle = "rgba(201, 169, 110, 0.9)";
        KEY_INDICES.forEach((idx) => {
          const lm = landmarks[idx];
          if (!lm) return;
          ctx.beginPath();
          ctx.arc(lm.x * width, lm.y * height, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Iscrtaj anotacije (strelice + labele)
      if (annotations && annotations.length > 0) {
        annotations.forEach(({ label, x, y, arrow }) => {
          const px = x * width;
          const py = y * height;

          // Strelica
          if (arrow) {
            const tx = px + arrow.dx * 40;
            const ty = py + arrow.dy * 40;
            ctx.strokeStyle = "rgba(232, 201, 138, 0.8)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(tx, ty);
            ctx.stroke();

            // Vrh strelice
            const angle = Math.atan2(ty - py, tx - px);
            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(tx - 8 * Math.cos(angle - 0.4), ty - 8 * Math.sin(angle - 0.4));
            ctx.lineTo(tx - 8 * Math.cos(angle + 0.4), ty - 8 * Math.sin(angle + 0.4));
            ctx.closePath();
            ctx.fillStyle = "rgba(232, 201, 138, 0.8)";
            ctx.fill();

            // Label box
            const lx = tx + arrow.dx * 4;
            const ly = ty + arrow.dy * 4;
            ctx.font = "11px Inter, sans-serif";
            const textW = ctx.measureText(label).width;
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.roundRect?.(lx - 4, ly - 14, textW + 8, 18, 4);
            ctx.fill();
            ctx.fillStyle = "#e8c98a";
            ctx.fillText(label, lx, ly);
          }
        });
      }
    };
    img.src = imageUrl;
  }, [imageUrl, landmarks, annotations, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="rounded-xl w-full max-w-lg mx-auto block"
      style={{ maxHeight: height }}
    />
  );
}
