import { projectPin } from "@/lib/projection";
import { WorldMapFrame } from "@/components/WorldMapFrame";

/**
 * The tiny 84×36 map locator on the Specimen Detail (variant A): the world
 * map with a single black dot at this specimen's coordinates. The 84px width
 * + locked aspect resolves to ~36px tall.
 */
export function MiniLocator({ lat, lon }: { lat: number; lon: number }) {
  const { left, top } = projectPin(lat, lon, 1);
  return (
    <div className="w-[84px] flex-none border border-ink">
      <WorldMapFrame>
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left,
            top,
            width: 7,
            height: 7,
            background: "#000",
            boxShadow: "0 0 0 3px rgba(255,255,255,.9)",
          }}
        />
      </WorldMapFrame>
    </div>
  );
}
