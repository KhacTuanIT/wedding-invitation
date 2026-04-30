/**
 * Returns the base path for static assets.
 * In production (GitHub Pages), assets are served from /wedding-invitation/
 * In development, they are served from root.
 */
export function getBasePath(): string {
  return process.env.NODE_ENV === "production" ? "/wedding-invitation" : "";
}

/**
 * Resolves an asset path with the correct base path prefix.
 */
export function assetPath(path: string): string {
  const base = getBasePath();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/**
 * Cinematic easing curves for framer-motion animations.
 */
export const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_ELEGANT: [number, number, number, number] = [0.4, 0, 0.2, 1];
