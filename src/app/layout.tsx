import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/context/AppProviders";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { MobileNav } from "@/components/common/MobileNav";
import { CartDrawer } from "@/components/common/CartDrawer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#12110E",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://siyajewels.com"),
  title: {
    default: "Siya Jewels | Luxury Fine Gold & Solitaire Diamond Jewellery",
    template: "%s | Siya Jewels Luxury Jewellery",
  },
  description:
    "Discover bespoke BIS 916 Hallmarked Gold, IGI Certified Solitaires, Polki Chokers, and Regal Bridal Jewellery handcrafted with eternal brilliance by Siya Jewels.",
  keywords: [
    "Siya Jewels",
    "Gold Jewellery",
    "Diamond Solitaires",
    "Polki Bridal Set",
    "22K Gold Bangles",
    "Kundan Choker",
    "BIS Hallmark Gold",
    "Luxury Jewellery India",
    "Solitaire Engagement Rings",
    "Diamond Necklaces",
  ],
  authors: [{ name: "Siya Jewels Atelier" }],
  creator: "Siya Jewels",
  publisher: "Siya Jewels Private Limited",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://siyajewels.com",
    siteName: "Siya Jewels",
    title: "Siya Jewels | Luxury Fine Gold & Solitaire Diamond Jewellery",
    description: "Discover bespoke BIS 916 Hallmarked Gold & IGI Certified Solitaires.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Siya Jewels Fine Jewellery Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siya Jewels | Luxury Fine Gold & Diamond Jewellery",
    description: "Bespoke BIS Hallmarked Gold & Certified Diamonds.",
    images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200"],
  },
  alternates: {
    canonical: "https://siyajewels.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FFFFFF] text-neutral-900 antialiased selection:bg-amber-100 selection:text-amber-900">
        <AppProviders>
          <Header />
          <CartDrawer />
          <main className="flex-1 pb-16 lg:pb-0">{children}</main>
          <MobileNav />
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
