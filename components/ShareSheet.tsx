"use client";

import { useRef, useState } from "react";
import {
  SPECIMENS,
  collectionStats,
  shareHandle,
  shareLink,
} from "@/lib/specimens";
import { projectPin } from "@/lib/projection";
import { WorldMapFrame } from "@/components/WorldMapFrame";
import { CloseIcon } from "@/components/Icons";

/**
 * Full-screen share overlay. Renders as a fixed, centered panel (same width as
 * the app column) so it sits above everything including the tab bar.
 * The centerpiece is a printable "wall-card" of the whole collection.
 */
export function ShareSheet({
  collectorName,
  onClose,
}: {
  collectorName: string;
  onClose: () => void;
}) {
  const stats = collectionStats();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const copy = () => {
    try {
      navigator.clipboard?.writeText(shareLink(collectorName));
    } catch {
      /* clipboard unavailable — the label flip still confirms the intent */
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1700);
  };

  return (
    <div className="fixed inset-0 z-[80] flex justify-center">
      <div className="animate-fadeup flex h-full w-full max-w-app flex-col bg-white pt-[54px]">
        {/* Header */}
        <div className="flex items-center justify-between px-[26px] pt-2">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.18em]">
            Share
          </span>
          <button onClick={onClose} aria-label="Close" className="-m-[6px] p-[6px] text-ink">
            <CloseIcon />
          </button>
        </div>
        <div className="mx-[26px] mt-[12px] h-px bg-ink" />

        {/* Scrollable card area */}
        <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-[26px] pb-4 pt-[30px]">
          <div className="w-full max-w-[320px] border border-ink px-6 pb-[22px] pt-[26px]">
            <div className="flex items-baseline justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted">
                The Collection Of
              </span>
              <span className="text-[9px] font-semibold tracking-[0.14em] text-muted">
                {shareHandle(collectorName)}
              </span>
            </div>
            <div className="mt-2 text-[30px] font-light leading-[1.04] tracking-[-0.025em]">
              {collectorName}
            </div>

            {/* Mini map of every pin */}
            <WorldMapFrame className="mt-[22px] border border-hairline">
              {SPECIMENS.map((s) => {
                const { left, top } = projectPin(s.lat, s.lon);
                return (
                  <span
                    key={s.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      left,
                      top,
                      width: 6,
                      height: 6,
                      background: "#000",
                      boxShadow: "0 0 0 2px #fff",
                    }}
                  />
                );
              })}
            </WorldMapFrame>

            {/* Stats */}
            <div className="mt-6 flex border-t border-ink pt-[18px]">
              {[
                { v: stats.total, l: "Specimens" },
                { v: stats.countries, l: "Countries" },
                { v: stats.regions, l: "Regions" },
              ].map((stat) => (
                <div key={stat.l} className="flex-1">
                  <div className="text-[30px] font-light leading-[0.9] tracking-[-0.03em]">
                    {stat.v}
                  </div>
                  <div className="mt-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-secondary">
                    {stat.l}
                  </div>
                </div>
              ))}
            </div>

            {/* Card footer */}
            <div className="mt-5 flex items-center justify-between">
              <span className="text-[8.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                Acquired {stats.yearSpan}
              </span>
              <span className="text-[8.5px] font-bold uppercase tracking-[0.2em]">
                The White Cube
              </span>
            </div>
          </div>
          <p className="mt-[18px] text-center text-[11px] font-normal tracking-[0.03em] text-muted">
            A printable wall-card of your collection.
          </p>
        </div>

        {/* Pinned actions */}
        <div className="flex gap-[10px] px-[26px] pb-[30px] pt-[14px]">
          <button
            onClick={copy}
            className="flex-1 border border-ink bg-white p-[15px] text-[10px] font-semibold uppercase tracking-[0.16em]"
          >
            {copied ? "Link Copied" : "Copy Link"}
          </button>
          <button className="flex-1 bg-ink p-[15px] text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
            Share Card
          </button>
        </div>
      </div>
    </div>
  );
}
