"use client";

import { Mail, Menu, X } from "lucide-react";
import * as m from "motion/react-m";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getLangDir } from "rtl-detect";

import LocaleSwitcher from "@/components/locale-switcher";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { Link, usePathname } from "@/i18n/navigation.public";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", key: "home" },
    { href: "/#about", key: "about" },
    { href: "/#services", key: "services" },
    { href: "/#why-us", key: "whyUs" },
    { href: "/#contact", key: "contact" }
] as const;

export default function Header() {
    const t = useTranslations("Header");
    const locale = useLocale();
    const dir = getLangDir(locale);
    const isRTL = dir === "rtl";
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const normalizedPathname = pathname.replace(/\/$/, "").split("#")[0];
    const isHomePage = normalizedPathname === "" || normalizedPathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            if (isHomePage) {
                setIsScrolled(window.scrollY > 10);
            } else {
                setIsScrolled(true);
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHomePage]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <header
                className={cn(
                    "fixed end-0 start-0 top-0 z-50 transition-all duration-300",
                    isMobileMenuOpen
                        ? "bg-white"
                        : isScrolled || !isHomePage
                            ? "border-b bg-white/95 backdrop-blur-md"
                            : "bg-transparent"
                )}
            >
                <nav
                    className="layout flex items-center justify-between py-3 sm:py-4"
                    aria-label="Main navigation"
                >
                    {/* Logo */}
                    <Logo className="transition-all duration-300" />

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-1 lg:flex xl:gap-2">
                        {navLinks.map((link) => {
                            const isActive = normalizedPathname === link.href;
                            return (
                                <Link
                                    key={link.key}
                                    href={link.href}
                                    className={cn(
                                        "px-3 py-2 text-base font-medium transition-all duration-200",
                                        isActive
                                            ? isScrolled || !isHomePage
                                                ? "text-primary"
                                                : "text-white"
                                            : isScrolled || !isHomePage
                                                ? "text-foreground hover:text-primary"
                                                : "text-white/90 hover:text-white"
                                    )}
                                >
                                    {t(`nav.${link.key}`)}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden items-center gap-3 lg:flex">
                        <LocaleSwitcher isTop={isScrolled} />
                        <Button
                            size="lg"
                            variant="outline"
                            className={cn(
                                "gap-2 rounded-none border bg-transparent px-6 py-2.5 transition-all duration-300",
                                isScrolled || !isHomePage
                                    ? "border-primary text-primary hover:bg-primary hover:text-white"
                                    : "hover:text-secondary border-white text-white hover:bg-white"
                            )}
                            asChild
                        >
                            <Link href="/#contact">
                                <span>{t("cta")}</span>
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <LocaleSwitcher isTop={isScrolled} />

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={cn(
                                "relative z-50 flex h-10 w-10 items-center justify-center transition-colors",
                                isScrolled || isMobileMenuOpen || !isHomePage
                                    ? "text-secondary hover:bg-secondary/10"
                                    : "text-white hover:bg-white/10"
                            )}
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <m.div
                initial={false}
                animate={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    pointerEvents: isMobileMenuOpen ? "auto" : "none"
                }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <m.div
                initial={false}
                animate={{
                    x: isMobileMenuOpen ? "0%" : isRTL ? "100%" : "-100%"
                }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className={cn(
                    "fixed top-0 z-40 h-full w-[280px] max-w-[85vw] bg-white shadow-2xl lg:hidden",
                    isRTL ? "right-0" : "left-0"
                )}
                style={{ willChange: "transform" }}
                aria-label="Mobile navigation"
            >
                <div className="flex h-full flex-col pt-20">
                    {/* Mobile Nav Links */}
                    <nav className="flex-1 overflow-y-auto px-4 py-6">
                        <ul className="space-y-1">
                            {navLinks.map((link, index) => {
                                const isActive = normalizedPathname === link.href;
                                return (
                                    <m.li
                                        key={link.key}
                                        initial={false}
                                        animate={{
                                            opacity: isMobileMenuOpen ? 1 : 0,
                                            x: isMobileMenuOpen ? 0 : isRTL ? 20 : -20
                                        }}
                                        transition={{
                                            duration: 0.2,
                                            delay: isMobileMenuOpen ? index * 0.05 : 0
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "block px-4 py-3 text-base font-medium transition-colors",
                                                isActive
                                                    ? "text-primary"
                                                    : "text-foreground hover:text-primary"
                                            )}
                                        >
                                            {t(`nav.${link.key}`)}
                                        </Link>
                                    </m.li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Mobile Menu Footer - Contact CTA */}
                    <div className="border-t border-gray-100 p-4">
                        <Button
                            className="bg-primary hover:bg-primary/90 w-full gap-2 rounded-none text-white"
                            asChild
                        >
                            <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
                                <Mail className="h-4 w-4" aria-hidden="true" />
                                <span>{t("cta")}</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </m.div>
        </>
    );
}
