"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { nextSpecimenNo } from "@/lib/specimens";
import { WorldMapFrame } from "@/components/WorldMapFrame";
import { CameraIcon, MapPinIcon } from "@/components/Icons";
import { cn } from "@/lib/cn";

interface Draft {
  brand: string;
  city: string;
  country: string;
  date: string;
  memory: string;
  note: string;
  mark: number;
}

const EMPTY_DRAFT: Draft = {
  brand: "",
  city: "",
  country: "",
  date: "",
  memory: "",
  note: "",
  mark: 0,
};

const FIELD =
  "block w-full border-0 border-b border-ink bg-transparent py-[6px] text-[21px] font-light text-ink outline-none placeholder:text-muted";
const FIELD_LABEL =
  "text-[9.5px] font-semibold uppercase tracking-[0.16em] text-secondary";

export default function Accession() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const onBack = () => {
    if (step === 0) router.push("/");
    else setStep((s) => s - 1);
  };
  const onNext = () => {
    if (step < 4) setStep((s) => s + 1);
    else router.push("/gallery"); // commit → return to the gallery
  };

  const dash = (v: string) => (v ? v : "—");

  return (
    <div className="animate-fade flex h-full flex-col pt-[54px]">
      {/* Header */}
      <div className="flex items-center justify-between px-[26px] pt-2">
        <button
          onClick={onBack}
          className="py-[6px] text-[10px] font-semibold uppercase tracking-[0.16em] text-ink"
        >
          {step === 0 ? "Cancel" : "Back"}
        </button>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
          Accession · {String(step + 1).padStart(2, "0")} / 05
        </span>
      </div>

      {/* Progress segments */}
      <div className="flex gap-[6px] px-[26px] pt-[14px]">
        {[0, 1, 2, 3, 4].map((n) => (
          <span
            key={n}
            className="h-[2px] flex-1 transition-colors duration-200"
            style={{ background: n <= step ? "#000" : "#E6E6E6" }}
          />
        ))}
      </div>

      {/* Step body */}
      <div className="min-h-0 flex-1 overflow-y-auto px-[26px]">
        {step === 0 && (
          <div className="animate-fade-fast pt-[34px]">
            <div className="text-[32px] font-light leading-[1.05] tracking-[-0.025em]">
              Photograph
              <br />
              the object.
            </div>
            <p className="mt-[14px] text-[13px] font-normal leading-[1.5] text-secondary">
              On pure white, square to the lens. The object becomes the only
              color in the record.
            </p>
            <div className="mt-[30px] flex justify-center">
              <button className="flex h-[220px] w-[182px] flex-col items-center justify-center gap-[14px] border border-dashed border-[#b8b8b8] bg-white">
                <CameraIcon />
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.16em]">
                  Tap to Capture
                </span>
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-fast pt-[34px]">
            <div className="text-[32px] font-light leading-[1.05] tracking-[-0.025em]">
              Where was it
              <br />
              acquired?
            </div>
            <div className="mt-[26px]">
              <WorldMapFrame className="border border-ink">
                <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
                  <MapPinIcon />
                </span>
              </WorldMapFrame>
            </div>
            <button className="mt-[18px] w-full border border-ink bg-white p-[13px] text-[10px] font-semibold uppercase tracking-[0.16em]">
              Use Current Location
            </button>
            <p className="mt-[14px] text-center text-[11px] font-normal tracking-[0.04em] text-muted">
              or drag the pin to place it manually
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-fast pt-[34px]">
            <div className="text-[32px] font-light leading-[1.05] tracking-[-0.025em]">
              Identify
              <br />
              the specimen.
            </div>
            <div className="mt-[30px] flex flex-col gap-[26px]">
              <label className="block">
                <span className={FIELD_LABEL}>Brand</span>
                <input
                  value={draft.brand}
                  onChange={(e) => set("brand", e.target.value)}
                  placeholder="e.g. Particulares 43"
                  className={cn(FIELD, "mt-[9px]")}
                />
              </label>
              <label className="block">
                <span className={FIELD_LABEL}>City</span>
                <input
                  value={draft.city}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="e.g. Buenos Aires"
                  className={cn(FIELD, "mt-[9px]")}
                />
              </label>
              <label className="block">
                <span className={FIELD_LABEL}>Country</span>
                <input
                  value={draft.country}
                  onChange={(e) => set("country", e.target.value)}
                  placeholder="e.g. Argentina"
                  className={cn(FIELD, "mt-[9px]")}
                />
              </label>
              <label className="block">
                <span className={FIELD_LABEL}>Date Acquired</span>
                <input
                  value={draft.date}
                  onChange={(e) => set("date", e.target.value)}
                  placeholder="e.g. Autumn 2023"
                  className={cn(FIELD, "mt-[9px]")}
                />
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-fast pt-[34px]">
            <div className="text-[32px] font-light leading-[1.05] tracking-[-0.025em]">
              Record
              <br />
              the memory.
            </div>
            <div className="mt-[28px]">
              <span className={FIELD_LABEL}>The Memory</span>
              <textarea
                value={draft.memory}
                onChange={(e) => set("memory", e.target.value)}
                rows={3}
                placeholder="Where you found it, and why it stays with you."
                className="mt-[10px] block w-full resize-none border-0 border-b border-ink bg-transparent pb-[10px] pt-[4px] text-[16px] font-light leading-[1.5] text-ink outline-none placeholder:text-muted"
              />
            </div>
            <div className="mt-[26px]">
              <span className={FIELD_LABEL}>Notes</span>
              <input
                value={draft.note}
                onChange={(e) => set("note", e.target.value)}
                placeholder="Stock, print, condition."
                className="mt-[9px] block w-full border-0 border-b border-ink bg-transparent py-[6px] text-[16px] font-light text-ink outline-none placeholder:text-muted"
              />
            </div>
            <div className="mt-[26px] flex items-center justify-between">
              <span className={FIELD_LABEL}>Condition</span>
              <div className="flex gap-[9px]">
                {[1, 2, 3, 4, 5].map((n) => {
                  const filled = n <= draft.mark;
                  return (
                    <button
                      key={n}
                      onClick={() => set("mark", n)}
                      className="p-1"
                      aria-label={`Condition ${n} of 5`}
                    >
                      <span
                        className="block rounded-full"
                        style={{
                          width: 11,
                          height: 11,
                          background: filled ? "#000" : "#fff",
                          border: filled ? "1px solid #000" : "1px solid #C9C9C9",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-fast pt-[34px]">
            <div className="text-[32px] font-light leading-[1.05] tracking-[-0.025em]">
              Accession.
            </div>
            <p className="mb-[26px] mt-[14px] text-[13px] font-normal leading-[1.5] text-secondary">
              A new specimen will enter the collection as {nextSpecimenNo()}.
            </p>
            <div className="flex gap-4 border border-ink p-5">
              <div className="shadow-photo-review h-[110px] flex-[0_0_88px] bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/specimen-photo.jpeg"
                  alt="Specimen"
                  className="block h-full w-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
                  {nextSpecimenNo()}
                </span>
                <span className="mt-[5px] text-[21px] font-light leading-[1.05] tracking-[-0.02em]">
                  {draft.brand || "Untitled"}
                </span>
                <span className="mt-auto text-[9.5px] font-semibold uppercase tracking-[0.14em]">
                  {`${dash(draft.city)} · ${dash(draft.country)}`.toUpperCase()}
                </span>
                <span className="mt-[5px] text-[9.5px] font-medium uppercase tracking-[0.14em] text-secondary">
                  {dash(draft.date).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pinned action */}
      <div className="px-[26px] pb-[30px] pt-[18px]">
        <button
          onClick={onNext}
          className="w-full bg-ink p-[17px] text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
        >
          {step === 4 ? "Accession Specimen" : "Continue"}
        </button>
      </div>
    </div>
  );
}
