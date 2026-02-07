"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation.public";

export default function Footer() {
    const t = useTranslations("Footer");
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-secondary text-white">
            <div className="layout py-10 sm:py-16">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="lg:col-span-2 text-center sm:text-start">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            SSLS
                        </h3>
                        <p className="text-white/70 max-w-md mb-6">
                            {t("description")}
                        </p>
                        <div className="flex gap-4 justify-center sm:justify-start">
                            <a
                                href={siteConfig.links.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary"
                                aria-label="WhatsApp"
                            >
                                <Phone className="h-5 w-5" />
                            </a>
                            <a
                                href={`mailto:${siteConfig.contact.email}`}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary"
                                aria-label="Email"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                            {t("quickLinks")}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/#about" className="text-white/70 hover:text-primary transition-colors">
                                    {t("links.about")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/#services" className="text-white/70 hover:text-primary transition-colors">
                                    {t("links.services")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/#why-us" className="text-white/70 hover:text-primary transition-colors">
                                    {t("links.whyUs")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/#contact" className="text-white/70 hover:text-primary transition-colors">
                                    {t("links.contact")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                            {t("contactUs")}
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                <a
                                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                                    className="text-white/70 hover:text-white transition-colors"
                                    dir="ltr"
                                >
                                    {siteConfig.contact.phone}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                <a
                                    href={`mailto:${siteConfig.contact.email}`}
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    {siteConfig.contact.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                <span className="text-white/70">
                                    {siteConfig.contact.address.city}, {siteConfig.contact.address.region}
                                    <br />
                                    {siteConfig.contact.address.country}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                    <p className="text-white/50 text-xs sm:text-sm">
                        © {currentYear} SSLS. {t("rights")}
                    </p>
                    <p className="text-white/50 text-xs sm:text-sm">
                        {t("tagline")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
