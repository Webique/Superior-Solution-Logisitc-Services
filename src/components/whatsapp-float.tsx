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
            className="fixed bottom-6 end-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-110"
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
