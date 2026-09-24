import type { Metadata } from "next";
import { Outfit, Syne, Inter } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import { ToastProvider } from "@/components/UI/Toast";
import "./globals.css";

// Google Fonts Setup
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

// Premium SEO Metadata
export const metadata: Metadata = {
  title: "PENTHOUSE CHAPTERS | Creative Content Agency & Cinematic Storytelling",
  description:
    "PENTHOUSE CHAPTERS is a premium creative agency crafting visual stories that grow brands. Specializing in commercial & corporate films, professional photography, aerial cinematography, and 360° virtual experiences.",
  keywords: [
    "penthouse chapters",
    "video production Bangalore",
    "commercial films",
    "brand storytelling",
    "aerial cinematography",
    "product photography",
    "360 virtual tours",
    "creative content agency",
    "corporate films",
    "post production",
  ],
  metadataBase: new URL("https://www.penthousechapters.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PENTHOUSE CHAPTERS | Cinematic Storytelling & Content Agency",
    description:
      "Crafting visual stories that grow brands. High-end commercials, corporate profiles, photography, and 360° virtual tours.",
    url: "https://www.penthousechapters.com",
    siteName: "PENTHOUSE CHAPTERS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PENTHOUSE CHAPTERS | Content Agency",
    description: "Bridging brands with people through strategic visual storytelling.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema JSON-LD structure
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PENTHOUSE CHAPTERS",
    "url": "https://www.penthousechapters.com",
    "logo": "https://www.penthousechapters.com/logo.png",
    "description":
      "PENTHOUSE CHAPTERS is a premium creative agency crafting visual stories that grow brands. Specializing in commercial & corporate films, photography, aerial cinematography, and 360° virtual experiences.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Studio 4A, Creative Hub, Sector 5",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "postalCode": "560001",
      "addressCountry": "India",
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-98765-43210",
      "contactType": "sales",
      "email": "hello@penthousechapters.com",
    },
    "sameAs": [
      "https://instagram.com/penthousechapters",
      "https://linkedin.com/company/penthousechapters",
    ],
  };

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${syne.variable} ${inter.variable} antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-brand-black text-white min-h-screen">
        <ToastProvider>
          <LenisProvider>{children}</LenisProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
