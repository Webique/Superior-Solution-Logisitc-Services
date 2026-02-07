"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { defaultLocale } from "@/i18n/config";

export default function RootPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace(`/${defaultLocale}`);
    }, [router]);

    return null;
}
