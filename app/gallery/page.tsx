import Link from "next/link";
import {
  SPECIMENS,
  GALLERY_HEIGHTS,
  collectionStats,
  DEFAULTS,
} from "@/lib/specimens";

export default function GalleryWall() {
  const stats = collectionStats();

  return (
    <div className="animate-fade min-h-full pt-[58px]">
      {/* Title row */}
      <div className="flex items-baseline justify-between px-[26px] pt-[14px]">
        <span className="text-[10.5px] font-bold uppercase tracking-[0.16em]">
          Gallery Wall
        </span>
        <span className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-secondary">
          {stats.total} Works
        </span>
      </div>
      <div className="mx-[26px] mt-[12px] h-px bg-ink" />

      {/* Masonry of works — CSS columns give the irregular gallery rhythm */}
      <div
        className="px-[22px] pb-9 pt-6"
        style={{ columnCount: DEFAULTS.galleryColumns, columnGap: 22 }}
      >
        {SPECIMENS.map((s, i) => (
          <Link
            key={s.id}
            href={`/specimen/${s.id}`}
            className="mb-[30px] inline-block w-full break-inside-avoid text-left"
          >
            <div
              className="shadow-photo-gallery w-full bg-white"
              style={{ height: GALLERY_HEIGHTS[i % GALLERY_HEIGHTS.length] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.photo}
                alt={s.brand}
                className="block h-full w-full"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="mt-[13px] text-[13px] font-medium leading-[1.2] tracking-[-0.01em]">
              {s.brand}
            </div>
            <div className="mt-[6px] text-[9px] font-semibold uppercase tracking-[0.14em] text-secondary">
              {s.country}
            </div>
            <div className="mt-[3px] text-[9px] font-medium uppercase tracking-[0.14em] text-muted">
              {s.no} · {s.year}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
