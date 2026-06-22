import { cn } from "@/lib/cn";

/**
 * A static world map locked to the asset's exact 2000:857 aspect ratio, with
 * absolutely-positioned pins as children. Keeping this aspect is what keeps
 * the projection accurate — `object-fit: fill` plus the fixed ratio means a
 * pin at a given percentage always lands on the right country.
 *
 * Used by the accession locate step and the share-card mini-map. The map home
 * screen renders its own (panned, 150%) variant.
 */
export function WorldMapFrame({
  className,
  children,
  style,
}: {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: "2000 / 857", ...style }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/world-map.svg"
        alt=""
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        style={{ objectFit: "fill" }}
      />
      {children}
    </div>
  );
}
