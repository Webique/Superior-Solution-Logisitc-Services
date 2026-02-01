import type { Locale } from "next-intl";

export interface PageProps {
    params: Promise<{ locale: Locale }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
}
