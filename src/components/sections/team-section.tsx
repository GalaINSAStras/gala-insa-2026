"use client";

import { useEffect, useState } from "react";
import { clientFetch, urlFor } from "@/lib/sanity/client";
import Image from "next/image";
import type { TeamMember } from "@/lib/sanity/types";

export function TeamSection() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    clientFetch<TeamMember[]>(
      `*[_type == "teamMember"] | order(displayOrder asc)`
    )
      .then((data) => {
        if (!cancelled) {
          setTeam(data ?? []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading)
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-xl border bg-muted"
          />
        ))}
      </div>
    );
  if (!team.length)
    return (
      <p className="text-muted-foreground italic">
        L'équipe sera bientôt dévoilée.
      </p>
    );

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {team.map((member) => (
        <div
          key={member._id}
          className="group flex flex-col items-center text-center"
        >
          {/* Avatar / placeholder */}
          <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border-2 border-gala-primary/20 bg-muted transition-transform group-hover:scale-105">
            {member.photo ? (
              <Image
                src={urlFor(member.photo).width(128).height(128).fit("crop").url()}
                alt={member.name}
                fill
                className="object-cover"
                sizes="128px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gala-primary to-gala-primary-dark">
                <span className="text-3xl font-bold text-white/80">
                  {member.name.charAt(0)}
                  {member.name.split(" ").pop()?.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <h3 className="font-heading text-lg font-bold text-foreground">
            {member.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-gala-gold">
            {member.role}
          </p>
          {member.bio && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
              {member.bio}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}