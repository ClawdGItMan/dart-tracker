"use client";

import { useState } from "react";
import Link from "next/link";
import { collectionStats, checklistOrder, DEFAULTS } from "@/lib/specimens";
import { ShareIcon } from "@/components/Icons";
import { ShareSheet } from "@/components/ShareSheet";

export default function Collection() {
  const stats = collectionStats();
  const checklist = checklistOrder();
  const collectorName = DEFAULTS.collectorName;
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <>
      <div className="animate-fade min-h-full pt-[58px]">
        {/* Title row */}
        <div className="flex items-center justify-between px-[26px] pt-[14px]">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.16em]">
            The Collection
          </span>
          <button
            onClick={() => setShareOpen(true)}
            className="-m-1 flex items-center gap-2 p-1"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              Share
            </span>
            <ShareIcon />
          </button>
        </div>
        <div className="mx-[26px] mt-[12px] h-px bg-ink" />

        {/* Collector identity */}
        <div className="px-[26px] pt-[26px]">
          <span className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-muted">
            Private Collection
          </span>
          <div className="mt-[9px] text-[38px] font-light leading-none tracking-[-0.025em]">
            {collectorName}
          </div>
        </div>

        {/* Big stats */}
        <div className="flex px-[26px] pb-[6px] pt-[26px]">
          {[
            { v: stats.total, l: "Specimens" },
            { v: stats.countries, l: "Countries" },
            { v: stats.regions, l: "Regions" },
          ].map((stat) => (
            <div key={stat.l} className="flex-1">
              <div className="text-[54px] font-light leading-[0.9] tracking-[-0.03em]">
                {stat.v}
              </div>
              <div className="mt-[10px] text-[9px] font-semibold uppercase tracking-[0.16em] text-secondary">
                {stat.l}
              </div>
            </div>
          ))}
        </div>
        <div className="px-[26px] pt-[18px]">
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
            Acquired {stats.yearSpan}
          </span>
        </div>

        {/* Share callout */}
        <div className="px-[26px] pt-[28px]">
          <button
            onClick={() => setShareOpen(true)}
            className="flex w-full items-center justify-center gap-[11px] border border-ink bg-white p-[15px] transition-colors hover:bg-ink hover:text-white"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
              Share Your Collection
            </span>
          </button>
        </div>

        {/* By region */}
        <div className="mx-[26px] mt-[26px] h-px bg-hairline" />
        <div className="px-[26px] pt-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
            By Region
          </span>
          <div className="mt-[14px]">
            {stats.regionRows.map((r) => (
              <div
                key={r.name}
                className="flex items-baseline justify-between border-b border-hairline py-[11px]"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                  {r.name}
                </span>
                <span className="text-[13px] font-normal text-secondary">
                  {r.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Exhibition checklist */}
        <div className="px-[26px] pt-[30px]">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
            Exhibition Checklist
          </span>
        </div>
        <div className="mx-[26px] mb-9 mt-[14px] border-t border-ink">
          {checklist.map((s) => (
            <Link
              key={s.id}
              href={`/specimen/${s.id}`}
              className="flex w-full items-center gap-[13px] border-b border-hairline py-[13px] text-left"
            >
              <span className="flex-[0_0_50px] text-[10px] font-semibold uppercase tracking-[0.1em] text-secondary">
                {s.no}
              </span>
              <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[13.5px] font-medium tracking-[-0.01em]">
                {s.brand}
              </span>
              <span className="flex-none text-[9px] font-semibold uppercase tracking-[0.13em] text-muted">
                {s.country}
              </span>
              <span className="flex-none text-[10px] font-normal text-muted">
                {s.year}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {shareOpen && (
        <ShareSheet collectorName={collectorName} onClose={() => setShareOpen(false)} />
      )}
    </>
  );
}
