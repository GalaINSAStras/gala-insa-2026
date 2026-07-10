"use client";

import { Bus, TrainFront, Car } from "lucide-react";

/**
 * Bloc d'informations transports avec icônes Lucide.
 * Extrait en composant client pour utiliser lucide-react.
 */
export function TransportInfo() {
  return (
    <div className="flex flex-col justify-center">
      <h3 className="font-heading text-xl md:text-2xl font-semibold text-gala-primary">
        Transports
      </h3>
      <div className="mt-4 space-y-4 text-sm text-muted-foreground leading-relaxed">
        <div className="flex items-start gap-3">
          <Bus className="w-5 h-5 text-gala-primary shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <p className="font-medium text-foreground">En bus</p>
            <p>Ligne 67, direction Plobsheim Est, arrêt Cours de l'Illiade</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <TrainFront className="w-5 h-5 text-gala-primary shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <p className="font-medium text-foreground">En tram</p>
            <p>Ligne A, direction Illkirch Graffenstaden, arrêt Cours de l'Illiade</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Car className="w-5 h-5 text-gala-primary shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <p className="font-medium text-foreground">En voiture</p>
            <p>Depuis l'autoroute A35, sorties Illkirch Nord ou Vigie, Ostwald</p>
          </div>
        </div>
      </div>
    </div>
  );
}