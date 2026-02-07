"use client";

import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import {
    Truck,
    Warehouse,
    Wrench,
    ShoppingBag
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
    }
};

const services = [
    {
        key: "logistics" as const,
        number: "01",
        icon: Truck,
        image: "/images/service-logistics.png",
        items: ["transport", "oceanFreight", "crossBorder", "domestic", "seaworthyPacking", "woodenBoxes", "metalContainers", "heavyEquipment", "customs", "supplyChain"]
    },
    {
        key: "warehouse" as const,
        number: "02",
        icon: Warehouse,
        image: "/images/service-warehouse.jpg",
        items: ["lease", "racking", "preservation", "complete"]
    },
    {
        key: "technical" as const,
        number: "03",
        icon: Wrench,
        image: "/images/service-technical.png",
        items: ["projectManagement", "civilWorks", "hvac", "manpower"]
    },
    {
        key: "trading" as const,
        number: "04",
        icon: ShoppingBag,
        image: "/images/service-trading.jpg",
        items: ["officeSupplies", "industrialProducts"]
    }
];

export default function Services() {
    const t = useTranslations("IndexPage.services");

    return (
        <>
            {/* Desktop - Sticky scroll */}
            <DesktopServices t={t} />
            {/* Mobile - Stacked */}
            <MobileServices t={t} />
        </>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DesktopServices({ t }: { t: any }) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section
            ref={containerRef}
            id="services"
            className="relative hidden h-[300vh] lg:block"
        >
            <div className="sticky top-0 flex h-screen">
                {/* Left side - Images */}
                <div className="relative h-full w-1/2 overflow-hidden">
                    {services.map((service, index) => (
                        <DesktopServiceImage
                            key={service.key}
                            service={service}
                            index={index}
                            progress={scrollYProgress}
                        />
                    ))}
                </div>

                {/* Right side - Text */}
                <div className="bg-muted flex flex-1 items-center">
                    <div className="w-full px-12 xl:px-20">
                        <span className="text-muted-foreground mb-6 inline-block text-sm font-medium uppercase tracking-widest">
                            {t("sectionLabel")}
                        </span>

                        <div className="relative min-h-[400px]">
                            {services.map((service, index) => (
                                <DesktopServiceText
                                    key={service.key}
                                    service={service}
                                    index={index}
                                    progress={scrollYProgress}
                                    t={t}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MobileServices({ t }: { t: any }) {
    return (
        <section id="services-mobile" className="lg:hidden">
            {services.map((service) => {
                const Icon = service.icon;
                return (
                    <m.div
                        key={service.key}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="flex flex-col"
                    >
                        {/* Image - Top */}
                        <div className="relative h-[30vh] sm:h-[40vh]">
                            <Image
                                src={service.image}
                                alt={t(`${service.key}.title`)}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
                        </div>

                        {/* Text - Bottom */}
                        <div className="bg-muted flex flex-1 items-center px-6 py-10">
                            <div>
                                <span className="text-muted-foreground mb-4 inline-block text-sm font-medium uppercase tracking-widest">
                                    {t("sectionLabel")}
                                </span>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-primary text-white">
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <span className="text-primary font-mono text-5xl font-bold">
                                        {service.number}
                                    </span>
                                </div>
                                <h3 className="text-secondary mb-3 text-2xl font-bold sm:text-3xl">
                                    {t(`${service.key}.title`)}
                                </h3>
                                <p className="text-muted-foreground max-w-md text-base leading-relaxed mb-4">
                                    {t(`${service.key}.description`)}
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {service.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center gap-2 text-sm text-muted-foreground"
                                        >
                                            <span className="h-1.5 w-1.5 bg-primary shrink-0" />
                                            {t(`${service.key}.items.${item}`)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </m.div>
                );
            })}
        </section>
    );
}

function DesktopServiceText({
    service,
    index,
    progress,
    t
}: {
    service: (typeof services)[0];
    index: number;
    progress: ReturnType<typeof useScroll>["scrollYProgress"];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t: any;
}) {
    const Icon = service.icon;
    const start = index * 0.25;
    const end = (index + 1) * 0.25;

    const opacity = useTransform(
        progress,
        [start, start + 0.06, end - 0.06, end],
        [index === 0 ? 1 : 0, 1, 1, index === 3 ? 1 : 0]
    );
    const y = useTransform(
        progress,
        [start, start + 0.06, end - 0.06, end],
        [index === 0 ? 0 : 60, 0, 0, index === 3 ? 0 : -60]
    );

    return (
        <m.div style={{ opacity, y }} className="absolute inset-0">
            <div className="flex items-center gap-4 mb-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-primary text-white">
                    <Icon className="h-7 w-7" />
                </div>
                <span className="text-primary font-mono text-7xl font-bold">
                    {service.number}
                </span>
            </div>
            <h3 className="text-secondary mb-4 text-4xl font-bold xl:text-5xl">
                {t(`${service.key}.title`)}
            </h3>
            <p className="text-muted-foreground max-w-lg text-lg leading-relaxed mb-6">
                {t(`${service.key}.description`)}
            </p>
            <ul className="grid grid-cols-2 gap-3">
                {service.items.map((item) => (
                    <li
                        key={item}
                        className="flex items-center gap-2 text-muted-foreground"
                    >
                        <span className="h-2 w-2 bg-primary shrink-0" />
                        {t(`${service.key}.items.${item}`)}
                    </li>
                ))}
            </ul>
        </m.div>
    );
}

function DesktopServiceImage({
    service,
    index,
    progress
}: {
    service: (typeof services)[0];
    index: number;
    progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const opacity = useTransform(progress, (p) => {
        if (index === 0) return p < 0.25 ? 1 : 0;
        if (index === 1) return p >= 0.25 && p < 0.5 ? 1 : 0;
        if (index === 2) return p >= 0.5 && p < 0.75 ? 1 : 0;
        return p >= 0.75 ? 1 : 0;
    });

    return (
        <m.div style={{ opacity }} className="absolute inset-0">
            <Image
                src={service.image}
                alt={service.key}
                fill
                className="object-cover"
                priority={index === 0}
            />
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(to right, rgba(10,25,41,0.3), transparent)"
                }}
            />
        </m.div>
    );
}
