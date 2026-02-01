import type { PageProps } from "@/types";
import type { Locale } from "next-intl";

import { setRequestLocale } from "next-intl/server";
import { use } from "react";

import About from "./components/about";
import CTA from "./components/cta";
import Hero from "./components/hero";
import Services from "./components/services";
import Stats from "./components/stats";
import WhyChooseUs from "./components/why-choose-us";

export default function IndexPage({ params }: PageProps) {
    const { locale } = use(params);
    setRequestLocale(locale as Locale);

    return (
        <main id="main-content" role="main">
            <Hero />
            <About />
            <Services />
            <Stats />
            <WhyChooseUs />
            <CTA />
        </main>
    );
}
