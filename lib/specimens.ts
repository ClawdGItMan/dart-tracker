/**
 * The collection.
 *
 * This is a single-collector catalogue (the retired two-curator concept has
 * been removed per the design handoff). In production each specimen carries
 * its own photograph shot on pure white; the prototype reuses one stock photo
 * for every piece, which we mirror here via STOCK_PHOTO.
 */

export type Region = "EUROPE" | "ASIA" | "AMERICAS" | "AFRICA";
export type Season = "Spring" | "Summer" | "Autumn" | "Winter";

export interface Specimen {
  id: string;
  /** Catalogue number, e.g. "No. 042" — NOT a sequential count. */
  no: string;
  /** Box brand / wordmark — the large heading. */
  brand: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  year: number;
  season: Season;
  region: Region;
  /** The personal note — "The Memory". */
  memory: string;
  /** Restrained object notes — "Notes". */
  note: string;
  /** 1–5 condition rating, rendered as 5 dots filled up to `mark`. */
  mark: number;
  /** Per-specimen photograph (stock placeholder for now). */
  photo: string;
}

/** Single stock box photo reused for every specimen until real photography. */
export const STOCK_PHOTO = "/specimen-photo.jpeg";

export const SPECIMENS: Specimen[] = [
  {
    id: "lis", no: "No. 001", brand: "Português Suave", city: "Lisbon", country: "Portugal",
    lat: 38.72, lon: -9.14, year: 2023, season: "Autumn", region: "EUROPE",
    memory: "Found in a tabacaria off Rua Garrett, the afternoon it rained and then didn’t.",
    note: "Lithographed sleeve, two-color. Foil seal intact.", mark: 4, photo: STOCK_PHOTO,
  },
  {
    id: "tok", no: "No. 012", brand: "Hope Extra", city: "Tokyo", country: "Japan",
    lat: 35.68, lon: 139.69, year: 2022, season: "Winter", region: "ASIA",
    memory: "A vending machine in Golden Gai, two in the morning, the last coin.",
    note: "Hard pack, embossed crest. Cellophane pristine.", mark: 5, photo: STOCK_PHOTO,
  },
  {
    id: "hav", no: "No. 024", brand: "Populares", city: "Havana", country: "Cuba",
    lat: 23.11, lon: -82.37, year: 2021, season: "Spring", region: "AMERICAS",
    memory: "Traded for a postcard outside the Hotel Inglaterra.",
    note: "Soft pack, sun-faded. Hand-stamped lot number.", mark: 3, photo: STOCK_PHOTO,
  },
  {
    id: "mar", no: "No. 031", brand: "Favorites", city: "Marrakech", country: "Morocco",
    lat: 31.63, lon: -7.99, year: 2023, season: "Summer", region: "AFRICA",
    memory: "Bought in the souk; the seller insisted on tea first.",
    note: "Letterpress, ochre ground. Slight crush to one corner.", mark: 4, photo: STOCK_PHOTO,
  },
  {
    id: "ist", no: "No. 038", brand: "Maltepe", city: "Istanbul", country: "Turkey",
    lat: 41.01, lon: 28.98, year: 2024, season: "Spring", region: "EUROPE",
    memory: "A kiosk on the ferry to Kadıköy, gulls overhead.",
    note: "Engraved tax band. Crescent motif, deep blue.", mark: 4, photo: STOCK_PHOTO,
  },
  {
    id: "ba", no: "No. 042", brand: "Particulares 43", city: "Buenos Aires", country: "Argentina",
    lat: -34.6, lon: -58.38, year: 2023, season: "Autumn", region: "AMERICAS",
    memory: "San Telmo, Sunday market, the only one left on the table.",
    note: "Mid-century type, vermilion and cream. Mint condition.", mark: 5, photo: STOCK_PHOTO,
  },
  {
    id: "rey", no: "No. 045", brand: "Smátt", city: "Reykjavík", country: "Iceland",
    lat: 64.15, lon: -21.94, year: 2024, season: "Summer", region: "EUROPE",
    memory: "A petrol station at the edge of the lava field, midnight sun.",
    note: "Matte stock, minimal grid. No imagery.", mark: 4, photo: STOCK_PHOTO,
  },
  {
    id: "han", no: "No. 047", brand: "Thăng Long", city: "Hanoi", country: "Vietnam",
    lat: 21.03, lon: 105.85, year: 2025, season: "Winter", region: "ASIA",
    memory: "Old Quarter, handed over with both hands and a nod.",
    note: "Offset, jade green. Gold foil pagoda.", mark: 4, photo: STOCK_PHOTO,
  },
  {
    id: "vie", no: "No. 009", brand: "Memphis", city: "Vienna", country: "Austria",
    lat: 48.21, lon: 16.37, year: 2020, season: "Winter", region: "EUROPE",
    memory: "A trafik near the Naschmarkt, snow starting.",
    note: "Heavy board, debossed wordmark. Burgundy.", mark: 3, photo: STOCK_PHOTO,
  },
  {
    id: "cai", no: "No. 018", brand: "Cleopatra", city: "Cairo", country: "Egypt",
    lat: 30.04, lon: 31.24, year: 2022, season: "Autumn", region: "AFRICA",
    memory: "Khan el-Khalili, just after the call to prayer.",
    note: "Profile illustration, gold on black. Iconic.", mark: 5, photo: STOCK_PHOTO,
  },
  {
    id: "mex", no: "No. 027", brand: "Faros", city: "Mexico City", country: "Mexico",
    lat: 19.43, lon: -99.13, year: 2023, season: "Spring", region: "AMERICAS",
    memory: "A estanquillo in Roma Norte, jacaranda everywhere.",
    note: "Lighthouse mark, blue line. Worn at the spine.", mark: 4, photo: STOCK_PHOTO,
  },
  {
    id: "mum", no: "No. 033", brand: "Wills", city: "Mumbai", country: "India",
    lat: 19.08, lon: 72.88, year: 2024, season: "Summer", region: "ASIA",
    memory: "A paan stall in Colaba, monsoon air.",
    note: "Foil-lined, deep red. Crest in relief.", mark: 4, photo: STOCK_PHOTO,
  },
];

// ---- Filters & ordering -------------------------------------------------

export const REGION_FILTERS = ["ALL", "EUROPE", "ASIA", "AMERICAS", "AFRICA"] as const;
export type RegionFilter = (typeof REGION_FILTERS)[number];

const REGION_ORDER: Region[] = ["EUROPE", "ASIA", "AMERICAS", "AFRICA"];

/** Irregular gallery-wall rhythm — frame heights cycle through this list. */
export const GALLERY_HEIGHTS = [232, 266, 210, 252, 224, 272, 214, 258, 228, 248, 218, 262];

// ---- Lookups & label helpers -------------------------------------------

export function getSpecimen(id: string): Specimen {
  return SPECIMENS.find((s) => s.id === id) ?? SPECIMENS[0];
}

/** "BUENOS AIRES · ARGENTINA" — the museum wall-text place line. */
export function placeCaps(s: Specimen): string {
  return `${s.city} · ${s.country}`.toUpperCase();
}

/** "AUTUMN 2023" — the museum wall-text date line. */
export function dateCaps(s: Specimen): string {
  return `${s.season} ${s.year}`.toUpperCase();
}

const pad2 = (n: number) => String(n).padStart(2, "0");

// ---- Derived collection stats ------------------------------------------

export interface RegionRow {
  name: Region;
  count: string;
}

export interface CollectionStats {
  total: string;
  countries: string;
  regions: string;
  yearSpan: string;
  regionRows: RegionRow[];
}

export function collectionStats(): CollectionStats {
  const total = SPECIMENS.length;
  const countries = new Set(SPECIMENS.map((s) => s.country)).size;
  const regionRows: RegionRow[] = REGION_ORDER.map((name) => ({
    name,
    count: pad2(SPECIMENS.filter((s) => s.region === name).length),
  }));
  const years = SPECIMENS.map((s) => s.year);
  const yearSpan = `${Math.min(...years)}–${Math.max(...years)}`;
  return {
    total: pad2(total),
    countries: pad2(countries),
    regions: pad2(regionRows.length),
    yearSpan,
    regionRows,
  };
}

/** Specimens sorted by catalogue number — the exhibition checklist. */
export function checklistOrder(): Specimen[] {
  return SPECIMENS.slice().sort((a, b) => a.no.localeCompare(b.no));
}

/** The next catalogue number a new accession would receive (e.g. "No. 048"). */
export function nextSpecimenNo(): string {
  return `No. ${String(SPECIMENS.length + 36).padStart(3, "0")}`;
}

// ---- Tweakable parameters (prototype props) -----------------------------

export const DEFAULTS = {
  collectorName: "M. Vesper",
  mapLabels: false,
  specimenLayout: "A" as "A" | "B",
  galleryColumns: 2 as 2 | 3,
};

/** "@m.vesper" — share handle derived from the collector name. */
export function shareHandle(name: string): string {
  return (
    "@" +
    name
      .toLowerCase()
      .replace(/[^a-z]+/g, ".")
      .replace(/^\.|\.$/g, "")
  );
}

/** "whitecube.app/c/m-vesper" — the shareable link slug. */
export function shareLink(name: string): string {
  return "whitecube.app/c/" + name.toLowerCase().replace(/[^a-z]+/g, "-");
}
