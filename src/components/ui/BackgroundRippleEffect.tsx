"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface RippleEffectProps {
  className?: string;
  rows?: number;
  cols?: number;
  cellSize?: string;
}

export function BackgroundRippleEffect({
  className,
  rows = 8,
  cols = 27,
  cellSize = "56px"
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<{ [key: string]: boolean }>({});

  const createRipple = useCallback((index: number) => {
    const key = `ripple-${index}-${Date.now()}`;
    setRipples(prev => ({ ...prev, [key]: true }));

    setTimeout(() => {
      setRipples(prev => {
        const newRipples = { ...prev };
        delete newRipples[key];
        return newRipples;
      });
    }, 600);
  }, []);

  // Create a grid of boxes
  const totalBoxes = rows * cols;
  const boxes = Array.from({ length: totalBoxes }, (_, i) => {
    const isRippling = Object.keys(ripples).some(key => key.includes(`ripple-${i}-`));

    return (
      <div
        key={i}
        className={cn(
          "border border-neutral-300/60 bg-neutral-100/40 transition-all duration-200 hover:bg-neutral-200/60 cursor-pointer",
          isRippling && "animate-[cell-ripple_600ms_ease-out] bg-blue-200/70"
        )}
        style={{
          width: cellSize,
          height: cellSize,
        }}
        onClick={() => createRipple(i)}
        onMouseEnter={() => {
          // Small chance of auto-ripple on hover
          if (Math.random() < 0.15) {
            createRipple(i);
          }
        }}
      />
    );
  });

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div
        className="grid gap-1 h-full w-full p-4 opacity-60 justify-center items-center"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize})`,
          gridTemplateRows: `repeat(${rows}, ${cellSize})`,
        }}
      >
        {boxes}
      </div>
    </div>
  );
}