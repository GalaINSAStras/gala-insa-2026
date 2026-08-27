export type TeaserSlide = {
  id: string;
  kind: "video" | "image";
  src: string;
  poster?: string;
  alt: string;
};

export const TEASER_SLIDES: TeaserSlide[] = [
  {
    id: "video",
    kind: "video",
    src: "/video_background.mp4",
    poster: "/fallback_background.webp",
    alt: "Ambiance du Gala 2026",
  },
];

export const GALA = {
  edition: 72,
  title: "Gala 2026",
  school: "INSA Strasbourg",
  date: "21 Novembre 2026",
  dateISO: "2026-11-21T19:00:00+01:00",
  venue: "L'Illiade, Illkirch-Graffenstaden",
  venueMapUrl: "https://maps.google.com/?q=L'Illiade+Illkirch",
} as const;
