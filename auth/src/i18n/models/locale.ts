export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (l: any): l is Locale => locales.includes(l);

export const defaultLocale: Locale = "de";
