"use client";

import { useState } from "react";
import Link from "next/link";
import { getSpecimen, placeCaps, dateCaps, DEFAULTS } from "@/lib/specimens";
import { ObjectStage } from "@/components/ObjectStage";
import { MiniLocator } from "@/components/MiniLocator";
import { ConditionMark } from "@/components/ConditionMark";
import { ChevronLeftIcon } from "@/components/Icons";
import { cn } from "@/lib/cn";

export default function SpecimenDetail({ params }: { params: { id: string } }) {
  const s = getSpecimen(params.id);
  const [variant, setVariant] = useState<"A" | "B">(DEFAULTS.specimenLayout);

  return (
    <div className="animate-fadeup min-h-full pt-[54px]">
      {/* Header: back + layout toggle */}
      <div className="flex items-center justify-between px-[22px] pt-2">
        <Link href="/" className="flex items-center gap-[9px] py-[6px]">
          <ChevronLeftIcon />
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
            The Collection
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#bdbdbd]">
            Layout
          </span>
          <button
            onClick={() => setVariant("A")}
            className={cn(
              "text-[10px] font-bold tracking-[0.1em]",
              variant === "A" ? "text-ink" : "text-toggle-off"
            )}
          >
            A
          </button>
          <button
            onClick={() => setVariant("B")}
            className={cn(
              "text-[10px] font-bold tracking-[0.1em]",
              variant === "B" ? "text-ink" : "text-toggle-off"
            )}
          >
            B
          </button>
        </div>
      </div>

      {variant === "A" ? (
        // ---------- Variant A: centered gallery mount ----------
        <div className="animate-fade-fast pb-10">
          <ObjectStage photo={s.photo} alt={`${s.brand} — specimen photograph`} variant="A" />

          <div className="px-[26px]">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-secondary">
              {s.no}
            </span>
            <div className="mt-2 text-[39px] font-light leading-none tracking-[-0.025em]">
              {s.brand}
            </div>
          </div>

          <div className="flex items-start justify-between gap-4 px-[26px] pt-[22px]">
            <div className="flex flex-col gap-[7px]">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.14em]">
                {placeCaps(s)}
              </span>
              <span className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-secondary">
                {dateCaps(s)}
              </span>
            </div>
            <MiniLocator lat={s.lat} lon={s.lon} />
          </div>

          <div className="mx-[26px] mt-[26px] h-px bg-hairline" />

          <div className="px-[26px] pt-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
              The Memory
            </span>
            <p className="mt-3 text-pretty text-[16px] font-light leading-[1.55] text-body">
              {s.memory}
            </p>
          </div>

          <div className="mx-[26px] mt-[26px] h-px bg-hairline" />

          <div className="flex items-start justify-between gap-5 px-[26px] pt-6">
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                Notes
              </span>
              <p className="mt-3 text-[13px] font-normal leading-[1.5] text-body">
                {s.note}
              </p>
            </div>
            <div className="pt-6">
              <ConditionMark mark={s.mark} />
            </div>
          </div>
        </div>
      ) : (
        // ---------- Variant B: editorial wall-text ----------
        <div className="animate-fade-fast">
          <ObjectStage photo={s.photo} alt={`${s.brand} — specimen photograph`} variant="B" />

          <div className="px-[26px] pt-[22px]">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-secondary">
              {s.no}
            </span>
            <div className="mt-[6px] text-[30px] font-light leading-[1.05] tracking-[-0.02em]">
              {s.brand}
            </div>
          </div>

          <div className="mx-[26px] mt-6 border-t border-ink">
            <div className="flex items-baseline justify-between border-b border-hairline py-[14px]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
                Place
              </span>
              <span className="text-[11.5px] font-bold uppercase tracking-[0.12em]">
                {placeCaps(s)}
              </span>
            </div>
            <div className="flex items-baseline justify-between border-b border-hairline py-[14px]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
                Acquired
              </span>
              <span className="text-[11.5px] font-bold uppercase tracking-[0.12em]">
                {dateCaps(s)}
              </span>
            </div>
            <div className="flex items-center justify-between py-[14px]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
                Notes
              </span>
              <ConditionMark mark={s.mark} />
            </div>
          </div>

          <div className="px-[26px] pb-4 pt-[26px]">
            <p className="text-[13px] font-normal leading-[1.5] text-body">{s.note}</p>
          </div>

          <div className="px-[26px] pb-[44px]">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
              The Memory
            </span>
            <p className="mt-[14px] text-pretty text-[19px] font-light leading-[1.5] text-ink">
              {s.memory}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
