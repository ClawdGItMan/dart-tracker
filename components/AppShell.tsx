import { TabBar } from "@/components/TabBar";

/**
 * The gallery room itself: a single mobile-width white column, centered on
 * larger screens with the faintest hairline edges so it reads as a tall
 * white panel. Content scrolls; the tab bar is pinned to the bottom.
 *
 * Overlays (the Share sheet) render themselves as fixed, centered panels so
 * they can cover the tab bar — see ShareSheet.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-[100dvh] w-full max-w-app flex-col overflow-hidden border-x border-hairline bg-white">
      <div className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </div>
      <TabBar />
    </div>
  );
}
