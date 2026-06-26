"use client";

/**
 * Composant client pour la carte interactive OpenStreetMap
 * Affiche l'emplacement de L'Illiade avec marqueurs
 */
export function MapSection({ lat, lng }: { lat: number; lng: number }) {
  const query = `${lat},${lng}`;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.015}%2C${lat - 0.015}%2C${lng + 0.015}%2C${lat + 0.015}&layer=mapnik&marker=${lat}%2C${lng}`;
  const directionsUrl = `https://www.openstreetmap.org/directions?from=&to=${lat}%2C${lng}#map=16/${lat}/${lng}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-border shadow-sm">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Carte de L'Illiade — Gala INSA Strasbourg 2026"
        />
      </div>
      <div className="flex gap-3">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
          </svg>
          Voir l'itinéraire
        </a>
      </div>
    </div>
  );
}