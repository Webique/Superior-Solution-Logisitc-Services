"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import * as m from "motion/react-m";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
    }
};

export default function CTA() {
    const t = useTranslations("IndexPage.cta");

    return (
        <section id="contact" className="py-16 md:py-20 lg:py-32">
            <div className="layout">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
                    {/* CTA Content */}
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
                            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-6"
                        >
                            {t("title")}
                        </m.h2>
                        <m.p
                            variants={fadeInUp}
                            className="text-muted-foreground leading-relaxed mb-8"
                        >
                            {t("description")}
                        </m.p>

                        {/* Contact Info */}
                        <m.div
                            variants={fadeInUp}
                            className="space-y-4 mb-8"
                        >
                            <a
                                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                                className="flex items-center gap-4 text-foreground hover:text-primary transition-colors"
                            >
                                <div className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary shrink-0">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">{t("phone")}</div>
                                    <div className="font-semibold" dir="ltr">{siteConfig.contact.phone}</div>
                                </div>
                            </a>
                            <a
                                href={`mailto:${siteConfig.contact.email}`}
                                className="flex items-center gap-4 text-foreground hover:text-primary transition-colors"
                            >
                                <div className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary shrink-0">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">{t("email")}</div>
                                    <div className="font-semibold">{siteConfig.contact.email}</div>
                                </div>
                            </a>
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary shrink-0">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">{t("address")}</div>
                                    <div className="font-semibold">
                                        {siteConfig.contact.address.city}, {siteConfig.contact.address.region}
                                    </div>
                                </div>
                            </div>
                        </m.div>

                        <m.div variants={fadeInUp}>
                            <Button
                                size="xl"
                                className="bg-primary hover:bg-primary/90 rounded-none w-full sm:w-auto"
                                asChild
                            >
                                <a
                                    href={siteConfig.links.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t("ctaButton")}
                                </a>
                            </Button>
                        </m.div>
                    </m.div>

                    {/* Map or decorative element */}
                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="relative"
                    >
                        <div className="relative aspect-[16/9] sm:aspect-square lg:aspect-[4/5] overflow-hidden bg-muted">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57269.86684082!2d50.15!3d26.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49e6d8f7a64e4d%3A0x2a42e52e3d7a9c5a!2sAl%20Khobar%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="SSLS Location"
                                className="absolute inset-0"
                            />
                        </div>
                        {/* Decorative accent */}
                        <div className="absolute -top-6 -start-6 w-32 h-32 bg-primary/10 -z-10" />
                    </m.div>
                </div>
            </div>
        </section>
    );
}
