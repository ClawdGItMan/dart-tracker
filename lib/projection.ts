/**
 * World-map projection.
 *
 * Calibrated to /public/world-map.svg — a near-equirectangular projection in a
 * 2000×857 viewBox. Given a city's longitude/latitude it returns CSS
 * percentages for an absolutely-positioned pin (with translate(-50%,-50%)).
 *
 * The SAME formula is reused everywhere a map appears: the map home, the
 * detail mini-locator, the accession locate step, and the share-card mini-map.
 * If the map asset's viewBox/projection ever changes, re-derive these constants.
 */
export function projectPin(
  lat: number,
  lon: number,
  precision = 2
): { left: string; top: string } {
  const xFraction = (5.408 * lon + 989.21) / 2000;
  const yFraction = (-6.502 * lat + 506.63) / 857;
  return {
    left: `${(xFraction * 100).toFixed(precision)}%`,
    top: `${(yFraction * 100).toFixed(precision)}%`,
  };
}

/** The map home renders the map at 150% width so it overflows and is pannable. */
export const MAP_SCALE = 1.5;
