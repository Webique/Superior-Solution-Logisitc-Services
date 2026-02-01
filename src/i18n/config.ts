export const locales: readonly string[] = ["en", "ar"] as const;

export const defaultLocale = "en" as const;

export const host = process.env.NEXT_PUBLIC_SITE_URL || "https://ssls-co.com";
