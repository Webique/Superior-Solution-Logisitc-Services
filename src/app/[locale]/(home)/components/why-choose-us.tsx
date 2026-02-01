"use client";

import {
    Globe,
    Shield,
    Clock,
    Users,
    Zap,
    Award
} from "lucide-react";
import * as m from "motion/react-m";
import { useTranslations } from "next-intl";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
    }
};

const features = [
    { key: "global", icon: Globe },
    { key: "reliable", icon: Shield },
    { key: "fast", icon: Clock },
    { key: "partnership", icon: Users },
    { key: "solutions", icon: Zap },
    { key: "quality", icon: Award }
];

export default function WhyChooseUs() {
    const t = useTranslations("IndexPage.whyChooseUs");

    return (
        <section id="why-us" className="py-20 lg:py-32 bg-muted">
            <div className="layout">
                {/* Header */}
                <m.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="text-center mb-16"
                >
                    <m.span
                        variants={fadeInUp}
                        className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4"
                    >
                        {t("sectionLabel")}
                    </m.span>
                    <m.h2
                        variants={fadeInUp}
                        className="text-3xl lg:text-4xl font-bold text-secondary mb-4"
                    >
                        {t("title")}
                    </m.h2>
                    <m.p
                        variants={fadeInUp}
                        className="text-muted-foreground max-w-2xl mx-auto"
                    >
                        {t("subtitle")}
                    </m.p>
                </m.div>

                {/* Features Grid */}
                <m.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <m.div
                                key={feature.key}
                                variants={fadeInUp}
                                className="group bg-card p-6 transition-all hover:shadow-elegant"
                            >
                                <div className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary mb-4 transition-colors group-hover:bg-primary group-hover:text-white">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-secondary mb-2">
                                    {t(`${feature.key}.title`)}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {t(`${feature.key}.description`)}
                                </p>
                            </m.div>
                        );
                    })}
                </m.div>
            </div>
        </section>
    );
}
