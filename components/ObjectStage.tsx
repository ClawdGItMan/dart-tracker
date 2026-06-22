"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { RotateIcon } from "@/components/Icons";

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/**
 * The OBJECT STAGE — a box photographed on pure white, mounted with the one
 * permitted drop shadow, and rotatable by horizontal drag (±40°, 0.45° per px).
 *
 * Phase 4: this frame is designed to later hold a 3D drag-to-rotate model in
 * place of the <img>. Keep the gesture and the "drag to rotate" affordance and
 * swap only the rotating element — the rest of the stage stays identical.
 *
 * Two layouts:
 *  - A: centered gallery mount, 188×236, generous air.
 *  - B: smaller (150×190) on a full-width plinth (a horizontal rule behind it).
 */
export function ObjectStage({
  photo,
  alt,
  variant,
}: {
  photo: string;
  alt: string;
  variant: "A" | "B";
}) {
  const [rot, setRot] = useState(0);
  const baseRot = useRef(0);
  const startX = useRef(0);

  const onPointerDown = (e: ReactPointerEvent) => {
    startX.current = e.clientX;
    baseRot.current = rot;
    const move = (ev: PointerEvent) => {
      setRot(clamp(baseRot.current + (ev.clientX - startX.current) * 0.45, -40, 40));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  if (variant === "B") {
    return (
      <div
        className="relative mt-[14px] cursor-grab pb-[26px] pt-[34px] active:cursor-grabbing"
        onPointerDown={onPointerDown}
        style={{ touchAction: "none" }}
      >
        {/* The plinth: a horizontal ink rule the object rests against. */}
        <div className="absolute inset-x-0 bottom-[42px] h-px bg-ink" />
        <div className="flex justify-center">
          <div
            className="shadow-photo-stage-b h-[190px] w-[150px]"
            style={{
              transform: `perspective(1000px) rotateY(${rot.toFixed(1)}deg)`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt={alt}
              draggable={false}
              className="pointer-events-none block h-full w-full select-none"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-[14px] right-[26px] flex items-center gap-[6px]">
          <RotateIcon className="h-[14px] w-[14px]" />
          <span className="text-[8px] font-semibold uppercase tracking-[0.16em]">
            Rotate
          </span>
        </div>
      </div>
    );
  }

  // Variant A — centered gallery mount.
  return (
    <div
      className="relative flex cursor-grab justify-center px-[26px] pb-[30px] pt-[40px] active:cursor-grabbing"
      onPointerDown={onPointerDown}
      style={{ touchAction: "none" }}
    >
      <div
        className="shadow-photo-stage h-[236px] w-[188px] transition-[filter] duration-200"
        style={{
          transform: `perspective(1100px) rotateY(${rot.toFixed(1)}deg)`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={alt}
          draggable={false}
          className="pointer-events-none block h-full w-full select-none"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="pointer-events-none absolute bottom-[34px] right-[30px] flex items-center gap-[7px]">
        <RotateIcon className="h-4 w-4" />
        <span className="text-[8.5px] font-semibold uppercase tracking-[0.16em]">
          Drag to Rotate
        </span>
      </div>
    </div>
  );
}
