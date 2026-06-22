import type { Specimen } from "@/lib/specimens";
import { placeCaps, dateCaps } from "@/lib/specimens";
import { CloseIcon } from "@/components/Icons";

/**
 * The raised specimen card on the map — slides up when a pin is tapped. The
 * box photo (left) is the only color on the whole screen; everything else is
 * the gallery's black-on-white.
 */
export function SpecimenCard({
  specimen,
  onOpen,
  onClose,
}: {
  specimen: Specimen;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div className="animate-sheetup absolute inset-x-0 bottom-0 z-40 px-[14px] pb-[14px]">
      <div className="relative flex items-stretch gap-4 border border-ink bg-white p-4">
        <button
          onClick={onOpen}
          className="flex-[0_0_96px]"
          aria-label={`View ${specimen.brand}`}
        >
          <div className="shadow-photo-card h-[120px] w-[96px] bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={specimen.photo}
              alt={specimen.brand}
              className="block h-full w-full"
              style={{ objectFit: "cover" }}
            />
          </div>
        </button>

        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
            {specimen.no}
          </span>
          <span className="mt-1 text-[23px] font-semibold leading-[1.04] tracking-[-0.02em]">
            {specimen.brand}
          </span>
          <span className="mt-auto text-[10px] font-semibold uppercase tracking-[0.14em]">
            {placeCaps(specimen)}
          </span>
          <span className="mt-[5px] text-[10px] font-medium uppercase tracking-[0.14em] text-secondary">
            {dateCaps(specimen)}
          </span>
          <button
            onClick={onOpen}
            className="mt-[13px] self-start bg-ink px-4 py-[9px] text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white"
          >
            View Specimen
          </button>
        </div>

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-2 top-2 p-2 text-ink"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
