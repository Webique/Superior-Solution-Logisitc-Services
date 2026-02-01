import type { Locale } from "next-intl";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getLangDir } from "rtl-detect";

import RootProviders from "@/app/root-providers";
import Layout from "@/components/layout";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing.public";

export const dynamic = "force-static";

type Params = Promise<{ locale: Locale }>;

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: Params;
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "LocaleLayout" });

    return {
        title: {
            default: t("name"),
            template: `%s | ${t("short_name")}`
        },
        description: t("description"),
        applicationName: t("name"),
        keywords: t.raw("keywords"),
        openGraph: {
            type: "website",
            locale: locale === "ar" ? "ar_SA" : "en_US",
            url: siteConfig.url,
            title: {
                default: t("name"),
                template: `%s | ${t("short_name")}`
            },
            description: t("description"),
            siteName: t("name")
        },
        twitter: {
            card: "summary_large_image",
            title: {
                default: t("name"),
                template: `%s | ${t("short_name")}`
            },
            description: t("description")
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1
            }
        },
        icons: {
            icon: [{ url: "/favicon.ico" }],
            apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
        },
        metadataBase: new URL(siteConfig.url),
        formatDetection: {
            telephone: false
        }
    };
}

export default async function LocaleLayout({
    children,
    params
}: LocaleLayoutProps) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const direction = getLangDir(locale);

    // Set lang and dir attributes on the document
    return (
        <>
            <script
                dangerouslySetInnerHTML={{
                    __html: `document.documentElement.lang="${locale}";document.documentElement.dir="${direction}";`
                }}
            />
            <NextIntlClientProvider>
                <RootProviders direction={direction}>
                    <Layout>{children}</Layout>
                </RootProviders>
            </NextIntlClientProvider>
        </>
    );
}
