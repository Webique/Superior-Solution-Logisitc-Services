"use client";

import * as m from "motion/react-m";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
    }
};

interface CounterProps {
    end: number;
    suffix?: string;
    duration?: number;
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }: CounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const startTime = Date.now();
                    const animate = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        setCount(Math.floor(easeOutQuart * end));
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

const stats = [
    { key: "countries", value: 15, suffix: "+" },
    { key: "clients", value: 200, suffix: "+" },
    { key: "shipments", value: 5000, suffix: "+" },
    { key: "experience", value: 10, suffix: "+" }
];

export default function Stats() {
    const t = useTranslations("IndexPage.stats");

    return (
        <section className="py-16 md:py-20 lg:py-24 bg-secondary">
            <div className="layout">
                <m.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12"
                >
                    {stats.map((stat) => (
                        <m.div
                            key={stat.key}
                            variants={fadeInUp}
                            className="text-center"
                        >
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">
                                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-white/80 font-medium text-sm sm:text-base">
                                {t(`${stat.key}.label`)}
                            </div>
                            <div className="text-white/50 text-sm mt-1">
                                {t(`${stat.key}.description`)}
                            </div>
                        </m.div>
                    ))}
                </m.div>
            </div>
        </section>
    );
}
