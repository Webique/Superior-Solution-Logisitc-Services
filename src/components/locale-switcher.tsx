"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation.public";
import { cn } from "@/lib/utils";

interface LocaleSwitcherProps {
    isTop?: boolean;
}

export default function LocaleSwitcher({ isTop = true }: LocaleSwitcherProps) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLocale = () => {
        const newLocale = locale === "en" ? "ar" : "en";
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <button
            onClick={toggleLocale}
            className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200",
                isTop
                    ? "border-border text-foreground hover:bg-muted"
                    : "border-white/30 text-white hover:bg-white/10"
            )}
            aria-label={locale === "en" ? "تغيير إلى العربية" : "Switch to English"}
        >
            <span className="text-sm font-medium">
                {locale === "en" ? "ع" : "EN"}
            </span>
        </button>
    );
}
