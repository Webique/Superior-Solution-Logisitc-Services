"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";

export default function WhatsAppFloat() {
    const t = useTranslations("WhatsApp");

    return (
        <a
            href={siteConfig.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 end-4 sm:bottom-6 sm:end-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-110"
            aria-label={t("tooltip")}
        >
            <Image
                src="/images/whatsapp-logo.svg"
                alt="WhatsApp"
                width={32}
                height={32}
            />
        </a>
    );
}
