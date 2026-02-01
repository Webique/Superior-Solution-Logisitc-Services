"use client";

import { LazyMotion, domAnimation } from "motion/react";

interface RootProvidersProps {
    children: React.ReactNode;
    direction: "ltr" | "rtl";
}

export default function RootProviders({
    children,
    direction
}: RootProvidersProps) {
    return (
        <LazyMotion features={domAnimation} strict>
            <div dir={direction}>{children}</div>
        </LazyMotion>
    );
}
