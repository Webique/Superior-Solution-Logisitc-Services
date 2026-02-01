import Image from "next/image";

import { Link } from "@/i18n/navigation.public";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

export default function Logo({ className }: LogoProps) {
    return (
        <Link href="/" className={cn("flex items-center gap-2", className)}>
            <Image
                src="/logo.png"
                alt="SSLS Logo"
                width={120}
                height={40}
                priority
                className="h-10 w-auto"
            />
        </Link>
    );
}
