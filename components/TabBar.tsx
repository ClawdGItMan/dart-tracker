"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  TabMapIcon,
  TabGalleryIcon,
  TabAccessionIcon,
  TabIndexIcon,
} from "@/components/Icons";

type Tab = {
  key: string;
  name: string;
  href: string;
  Icon: (props: { className?: string }) => JSX.Element;
};

const TABS: Tab[] = [
  { key: "map", name: "Map", href: "/", Icon: TabMapIcon },
  { key: "gallery", name: "Gallery", href: "/gallery", Icon: TabGalleryIcon },
  { key: "accession", name: "Accession", href: "/add", Icon: TabAccessionIcon },
  { key: "overview", name: "Index", href: "/collection", Icon: TabIndexIcon },
];

/** Which tab the current route maps to (accession is a flow, never "active"). */
function activeKey(pathname: string): string {
  if (pathname === "/") return "map";
  if (pathname.startsWith("/gallery")) return "gallery";
  if (pathname.startsWith("/collection")) return "overview";
  return ""; // detail, add → nothing highlighted
}

export function TabBar() {
  const pathname = usePathname();

  // Hidden on the pushed Specimen Detail view and the Accession modal flow.
  if (pathname.startsWith("/specimen") || pathname.startsWith("/add")) {
    return null;
  }

  const active = activeKey(pathname);

  return (
    <nav className="flex flex-none border-t border-ink bg-white pb-6 pt-[11px]">
      {TABS.map(({ key, name, href, Icon }) => {
        const isActive = active === key;
        const color = isActive ? "text-ink" : "text-inactive";
        return (
          <Link
            key={key}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center gap-[7px] py-1",
              color
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="flex h-5 items-center justify-center">
              <Icon />
            </span>
            <span className="text-[8.5px] font-semibold uppercase tracking-[0.14em]">
              {name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
