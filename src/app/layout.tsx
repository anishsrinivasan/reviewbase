import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { AnalyticsProvider } from "@/lib/analytics/wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Review Base",
  description:
    "Generate Reviews in seconds. Our platform lets users effortlessly create authentic and compelling reviews. Whether you need reviews for products, services, books, movies, or any other category. With our advanced AI-powered platform, generating high-quality reviews has never been easier",
  openGraph: {
    images: ["/api/og-image"],
  },
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AnalyticsProvider>
        <body className={inter.className}>{children}</body>
      </AnalyticsProvider>
      <Toaster />
    </html>
  );
}
