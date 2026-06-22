"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useRouter } from "next/navigation";
import {
  SPECIMENS,
  REGION_FILTERS,
  type RegionFilter,
  getSpecimen,
  collectionStats,
} from "@/lib/specimens";
import { projectPin, MAP_SCALE } from "@/lib/projection";
import { SpecimenCard } from "@/components/SpecimenCard";
import { cn } from "@/lib/cn";

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export default function MapHome() {
  const router = useRouter();
  const stats = collectionStats();

  const [region, setRegion] = useState<RegionFilter>("ALL");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [panX, setPanX] = useState(0);

  const panBase = useRef(0);
  const panStartX = useRef(0);

  const onPanDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const area = e.currentTarget;
    const W = area.clientWidth;
    const maxPan = Math.max(0, (W * MAP_SCALE - W) / 2);
    panStartX.current = e.clientX;
    panBase.current = panX;
    const move = (ev: PointerEvent) => {
      setPanX(clamp(panBase.current + (ev.clientX - panStartX.current), -maxPan, maxPan));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const filtered = SPECIMENS.filter((s) => region === "ALL" || s.region === region);
  const selected = selectedId ? getSpecimen(selectedId) : null;

  return (
    <div className="animate-fade flex h-full flex-col pt-[58px]">
      {/* Title row */}
      <div className="flex items-baseline justify-between px-[26px] pt-[14px]">
        <span className="text-[10.5px] font-bold uppercase tracking-[0.16em]">
          The Collection
        </span>
        <span className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-secondary">
          {stats.total} Specimens
        </span>
      </div>
      <div className="mx-[26px] mt-[12px] h-px bg-ink" />

      {/* Region filter */}
      <div className="no-scrollbar flex gap-5 overflow-x-auto px-[26px] pb-1 pt-[13px]">
        {REGION_FILTERS.map((r) => {
          const active = region === r;
          return (
            <button
              key={r}
              onClick={() => {
                setRegion(r);
                setSelectedId(null);
              }}
              className={cn(
                "whitespace-nowrap border-b pb-[3px] text-[10.5px] font-semibold uppercase tracking-[0.14em]",
                active ? "border-ink text-ink" : "border-transparent text-muted"
              )}
            >
              {r}
            </button>
          );
        })}
      </div>

      {/* Map region — full-bleed, drag to pan */}
      <div
        className="relative mt-[14px] flex-1 cursor-grab overflow-hidden active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPanDown}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: `${MAP_SCALE * 100}%`,
            aspectRatio: "2000 / 857",
            transform: `translate(calc(-50% + ${panX}px), -50%)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/world-map.svg"
            alt="World map"
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none"
            style={{ objectFit: "fill" }}
          />

          {filtered.map((s, i) => {
            const { left, top } = projectPin(s.lat, s.lon);
            const isSel = selectedId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedId(isSel ? null : s.id)}
                aria-label={`${s.brand}, ${s.city}`}
                className="animate-pindrop absolute h-[34px] w-[34px]"
                style={{
                  left,
                  top,
                  transform: "translate(-50%,-50%)",
                  zIndex: isSel ? 30 : 10,
                  animationDelay: `${(i * 0.045).toFixed(2)}s`,
                }}
              >
                <span
                  className="absolute left-1/2 top-1/2 rounded-full transition-all duration-200"
                  style={{
                    transform: "translate(-50%,-50%)",
                    width: isSel ? 16 : 9,
                    height: isSel ? 16 : 9,
                    background: "#000",
                    // 2px white border separates the pin from the map lines
                    // (matches the prototype's single, uniform pin style).
                    border: "2px solid #fff",
                    boxShadow: isSel ? "0 0 0 6px rgba(0,0,0,.08)" : "none",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer hint */}
      <div className="flex justify-center px-[26px] pb-[22px] pt-[14px]">
        <span className="text-[9.5px] font-medium uppercase tracking-[0.18em] text-muted">
          Drag to pan · Tap a pin
        </span>
      </div>

      {/* Raised specimen card */}
      {selected && (
        <SpecimenCard
          specimen={selected}
          onOpen={() => router.push(`/specimen/${selected.id}`)}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
