export const siteConfig = {
    name: "SSLS | Superior Solutions Logistic Services",
    shortName: "SSLS",
    description: "Your trusted supply chain partner in KSA and the GCC region. We deliver logistics, warehousing, and transportation solutions.",

    links: {
        instagram: "#",
        linkedin: "#",
        twitter: "#",
        facebook: "#",
        whatsapp: "https://wa.me/966539844155?text=Hello%20SSLS"
    },

    contact: {
        phone: "+966 53 984 4155",
        email: "Sales@ssls-co.com",
        whatsapp: "+966 53 984 4155",
        address: {
            city: "Al Khobar",
            region: "Eastern Region",
            country: "Kingdom of Saudi Arabia"
        }
    },

    url: process.env.NEXT_PUBLIC_SITE_URL || "https://ssls-co.com"
};

export type SiteConfig = typeof siteConfig;
