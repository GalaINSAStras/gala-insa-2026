"use client";

import { APIProvider, Map, Marker, useApiIsLoaded } from "@vis.gl/react-google-maps";
import { TOKENS } from "@/lib/design-tokens";
import { useState } from "react";

/**
 * Style JSON Google Maps personnalisé aux couleurs du Design System V2
 * Mapping des tokens :
 *   - Terres → Surface 1 (crème #FFFBF2)
 *   - Eau   → Surface 2 (bleu clair #E9F5FF)
 *   - Routes → Primary Light (#BACCE9) + labels Primary (#5E708E)
 *   - Végétation → Secondary Light (#D6EDCF)
 *   - POI non pertinents → masqués
 */
const GALA_MAP_STYLES: google.maps.MapTypeStyle[] = [
  // === Fond ===
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: TOKENS.surface[1] }],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry",
    stylers: [{ color: TOKENS.surface[1] }],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{ color: TOKENS.surface[1] }],
  },

  // === Eau ===
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: TOKENS.surface[2] }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: TOKENS.primary }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ visibility: "off" }],
  },

  // === Routes ===
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: TOKENS.primary }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: TOKENS.primary }],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: TOKENS.primary, lightness: -10 }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: TOKENS.primary }],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: TOKENS.primary, lightness: 8 }],
  },

  // === Végétation / Parcs ===
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: TOKENS.secondary }],
  },
  {
    featureType: "poi.park",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },

  // === Végétation naturelle ===
  {
    featureType: "landscape.natural.landcover",
    elementType: "geometry",
    stylers: [{ color: TOKENS.secondaryLight }],
  },

  // === POI ===
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.business",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.attraction",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.medical",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.school",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.sports_complex",
    stylers: [{ visibility: "off" }],
  },

  // === Transports ===
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit.station",
    stylers: [{ visibility: "off" }],
  },

  // === Administrative / Frontières ===
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: TOKENS.primaryLight, lightness: 15 }],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [{ color: TOKENS.text.secondary }],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.stroke",
    stylers: [{ visibility: "off" }],
  },

  // === Bâtiments ===
  {
    featureType: "administrative.neighborhood",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "off" }],
  },
];

/**
 * Marqueur SVG personnalisé — Pin ocre doré (#D9A956)
 * avec cercle intérieur bleu ardoise (#5E708E)
 */
const MARKER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48">
  <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z" fill="${TOKENS.accent}" stroke="${TOKENS.text.primary}" stroke-width="1.5"/>
  <circle cx="18" cy="18" r="7" fill="${TOKENS.primary}" stroke="${TOKENS.accentLight}" stroke-width="1.5"/>
</svg>`;

const MARKER_ICON = {
  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(MARKER_SVG)}`,
};

function GoogleMapCanvas({
  lat,
  lng,
  address,
}: {
  lat: number;
  lng: number;
  address: string;
}) {
  const apiIsLoaded = useApiIsLoaded();

  if (!apiIsLoaded) {
    return (
      <iframe
        title="Carte Google Maps de L'Illiade"
        src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <Map
      defaultZoom={16}
      defaultCenter={{ lat, lng }}
      gestureHandling="greedy"
      disableDefaultUI
      styles={GALA_MAP_STYLES}
      className="w-full h-full"
    >
      <Marker position={{ lat, lng }} icon={MARKER_ICON} title="L'Illiade" />
    </Map>
  );
}

/**
 * Composant client pour la carte interactive Google Maps
 * Affiche l'emplacement de L'Illiade avec style Design System V2.
 * Les boutons d'action (itinéraire, téléchargement plan) sont gérés
 * dans le parent page.tsx.
 */
export function MapSection({
  lat,
  lng,
  address,
}: {
  lat: number;
  lng: number;
  address: string;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [apiStatus, setApiStatus] = useState<"loading" | "loaded" | "error">(
    () => {
      if (!apiKey) {
        return "error";
      }
      return "loading";
    }
  );

  // Fallback si la clé API n'est pas configurée
  if (!apiKey || apiStatus === "error") {
    return (
      <div className="flex h-[300px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-[var(--or-moyen)]/40 bg-[var(--rose-poudre)]/20 md:h-[400px]">
        <div className="text-center max-w-xs">
          <svg className="mx-auto h-10 w-10 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
          </svg>
          <p className="mt-3 text-sm text-muted-foreground">
            La carte Google Maps n&rsquo;a pas pu être chargée.
          </p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Vérifiez la clé API, l&rsquo;activation de la Maps JavaScript API et les restrictions HTTP.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden border-2 border-[var(--or-moyen)]/40 shadow-[0_8px_28px_rgba(63,91,118,.08)]">
      <APIProvider
        apiKey={apiKey}
        onLoad={() => setApiStatus("loaded")}
        onError={() => setApiStatus("error")}
        language="fr"
        region="FR"
      >
        <GoogleMapCanvas lat={lat} lng={lng} address={address} />
      </APIProvider>
    </div>
  );
}
