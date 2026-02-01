"use client";

import * as m from "motion/react-m";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useVideoAutoplay } from "@/hooks/use-video-autoplay";
import { Link } from "@/i18n/navigation.public";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.5 }
    }
};

export default function Hero() {
    const t = useTranslations("IndexPage.hero");
    const [videoLoaded, setVideoLoaded] = useState(false);
    const { videoRef } = useVideoAutoplay();

    return (
        <section
            className="relative min-h-[700px] overflow-hidden sm:min-h-[600px] lg:min-h-screen"
            aria-labelledby="hero-title"
        >
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                {/* Fallback image shown until video loads */}
                <Image
                    src="/images/hero.png"
                    alt="Logistics operations"
                    fill
                    priority
                    className={`object-cover transition-opacity duration-500 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
                />
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={() => setVideoLoaded(true)}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
                {/* Gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to bottom, rgba(10,25,41,0.3) 0%, rgba(10,25,41,0.85) 100%)"
                    }}
                />
            </div>

            {/* Content */}
            <div className="layout relative z-10 flex min-h-[700px] items-center py-20 pt-24 sm:min-h-[600px] lg:min-h-screen">
                <m.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mx-auto max-w-4xl text-center"
                >
                    {/* Badge */}
                    <m.div variants={fadeInUp} className="mb-6">
                        <span className="inline-block bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm border border-primary/30">
                            {t("badge")}
                        </span>
                    </m.div>

                    {/* Main headline */}
                    <m.h1
                        id="hero-title"
                        variants={fadeInUp}
                        className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                        {t("title")}
                    </m.h1>

                    {/* Tagline */}
                    <m.p
                        variants={fadeInUp}
                        className="mb-6 text-2xl font-semibold text-primary sm:text-3xl"
                    >
                        {t("tagline")}
                    </m.p>

                    {/* Description */}
                    <m.p
                        variants={fadeInUp}
                        className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl"
                    >
                        {t("description")}
                    </m.p>

                    {/* CTA Buttons */}
                    <m.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            size="xl"
                            className="bg-primary hover:bg-primary/90 text-white rounded-none"
                        >
                            <Link href="/#services">{t("cta.primary")}</Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="xl"
                            className="rounded-none border-2 border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-secondary"
                        >
                            <Link href="/#contact">{t("cta.secondary")}</Link>
                        </Button>
                    </m.div>
                </m.div>
            </div>
        </section>
    );
}
