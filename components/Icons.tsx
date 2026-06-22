/**
 * Every icon in the app, reproduced from the prototype as simple inline SVG
 * strokes. All use `currentColor` so they take the black / grey state of
 * whatever context they sit in. No filled icon system, no emoji.
 */

type IconProps = { className?: string };

export function TabMapIcon({ className }: IconProps) {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" className={className}>
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.4" />
      </g>
    </svg>
  );
}

export function TabGalleryIcon({ className }: IconProps) {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" className={className}>
      <g stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="4" width="7" height="7" />
        <rect x="13" y="4" width="7" height="7" />
        <rect x="4" y="13" width="7" height="7" />
        <rect x="13" y="13" width="7" height="7" />
      </g>
    </svg>
  );
}

export function TabAccessionIcon({ className }: IconProps) {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function TabIndexIcon({ className }: IconProps) {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg width="9" height="15" viewBox="0 0 9 15" fill="none" className={className}>
      <path d="M8 1L1.5 7.5L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShareIcon({ className }: IconProps) {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" className={className}>
      <path d="M7 1.2V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3.6 4.4L7 1l3.4 3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 7.6V14.6H12V7.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CameraIcon({ className }: IconProps) {
  return (
    <svg width="34" height="30" viewBox="0 0 34 30" fill="none" className={className}>
      <rect x="1" y="6" width="32" height="23" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 6l2.5-4h7L23 6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="17" cy="17" r="6.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg width="20" height="26" viewBox="0 0 20 26" fill="none" className={className}>
      <path d="M10 25C10 25 18 15.5 18 9A8 8 0 1 0 2 9c0 6.5 8 16 8 16Z" fill="currentColor" />
      <circle cx="10" cy="9" r="3" fill="#fff" />
    </svg>
  );
}

export function RotateIcon({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M13.5 4.2A6 6 0 1 0 14 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M13.8 1.6V4.6H10.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
