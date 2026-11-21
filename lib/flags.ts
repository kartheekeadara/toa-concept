/**
 * PRESENTATION=true hides every {{PLACEHOLDER}} chip, the "Concept mockup" labels,
 * board prices/serves, and the "Just arrived" section. Set it when starting the server:
 *   npm run present   (PRESENTATION=true, port 3101)
 * Inlined at build time via next.config.ts `env`, so it works in client components too.
 */
export const PRESENTATION = process.env.PRESENTATION === "true";

/** True for an unconfirmed value written as {{SOMETHING}}. */
export const isPlaceholder = (v: string) => /^\{\{.+\}\}$/.test(v.trim());
