"use client";

import { Eye, Target } from "lucide-react";
import * as m from "motion/react-m";
import Image from "next/image";
import { useTranslations } from "next-intl";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
    }
};

export default function About() {
    const t = useTranslations("IndexPage.about");

    return (
        <section id="about" className="py-20 lg:py-32 bg-muted">
            <div className="layout">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image */}
                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="relative"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden shadow-elegant">
                            <Image
                                src="/images/about.png"
                                alt="SSLS Operations"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Floating accent */}
                        <div className="absolute -bottom-6 -end-6 w-32 h-32 bg-primary/10 -z-10" />
                    </m.div>

                    {/* Content */}
                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.15 } }
                        }}
                    >
                        <m.span
                            variants={fadeInUp}
                            className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4"
                        >
                            {t("sectionLabel")}
                        </m.span>
                        <m.h2
                            variants={fadeInUp}
                            className="text-3xl lg:text-4xl font-bold text-secondary mb-6"
                        >
                            {t("title")}
                        </m.h2>
                        <m.p
                            variants={fadeInUp}
                            className="text-muted-foreground leading-relaxed mb-4"
                        >
                            {t("description1")}
                        </m.p>
                        <m.p
                            variants={fadeInUp}
                            className="text-muted-foreground leading-relaxed mb-4"
                        >
                            {t("description2")}
                        </m.p>
                        <m.p
                            variants={fadeInUp}
                            className="text-muted-foreground leading-relaxed mb-8"
                        >
                            {t("description3")}
                        </m.p>

                        {/* Vision & Mission */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <m.div
                                variants={fadeInUp}
                                className="bg-background p-6 border-s-4 border-primary"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <Eye className="h-5 w-5 text-primary" />
                                    <h3 className="font-bold text-secondary">
                                        {t("vision.title")}
                                    </h3>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {t("vision.description")}
                                </p>
                            </m.div>
                            <m.div
                                variants={fadeInUp}
                                className="bg-background p-6 border-s-4 border-accent"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <Target className="h-5 w-5 text-accent" />
                                    <h3 className="font-bold text-secondary">
                                        {t("mission.title")}
                                    </h3>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {t("mission.description")}
                                </p>
                            </m.div>
                        </div>
                    </m.div>
                </div>
            </div>
        </section>
    );
}
