import { StyledComponentsRegistry } from "./styled-components-registry";

/**
 * Studio Layout — propre, sans Header/Footer ni scripts superflus
 * Utilise StyledComponentsRegistry pour le SSR de styled-components
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
}
