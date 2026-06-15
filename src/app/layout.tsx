import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Footer } from "@/components/footer";
import { SiteNav } from "@/components/site-nav";
import { SmoothScroll } from "@/components/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://watchwise.in"),
  title: {
    default: "Watchwise India | Luxury Watch Guides, Finder and Consultation",
    template: "%s | Watchwise India",
  },
  description:
    "A premium Indian watch ecosystem for buying guides, reviews, recommendations, consultation, education, community and future resale.",
  keywords: [
    "best watches under 5000",
    "best automatic watches India",
    "luxury watches India",
    "watch guide India",
    "Seiko vs Citizen",
    "first luxury watch",
  ],
  openGraph: {
    title: "Watchwise India",
    description:
      "Editorial watch intelligence for Indian buyers, collectors and first-time luxury customers.",
    url: "https://watchwise.in",
    siteName: "Watchwise India",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watchwise India",
    description: "Find, compare and buy the right watch in India.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#d6b56d",
          colorBackground: "#0d0d0d",
          borderRadius: "0.5rem",
        },
      }}
    >
      <html
        lang="en-IN"
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <body>
          <SmoothScroll />
          <SiteNav />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
