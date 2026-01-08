import BaiDuAnalytics from "@/app/BaiDuAnalytics";
import GoogleAdsense from "@/app/GoogleAdsense";
import GoogleAnalytics from "@/app/GoogleAnalytics";
import PlausibleAnalytics from "@/app/PlausibleAnalytics";
import ToltScript from "@/app/ToltScript";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import DiscordInviteWidget from "@/components/shared/DiscordInviteWidget";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { DEFAULT_LOCALE, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/loading.css";
import { Analytics } from "@vercel/analytics/react";
import { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import { notFound } from "next/navigation";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: siteConfig.themeColors,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale || DEFAULT_LOCALE} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background flex flex-col",
          fontSans.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme={siteConfig.defaultNextTheme}
            enableSystem
          >
            {messages.Header && <Header />}
            <main className="flex-1 flex flex-col">
              {children}
            </main>

            {messages.Footer && <Footer />}
          </ThemeProvider>
        </NextIntlClientProvider>
        <Toaster />
        <TailwindIndicator />
        <DiscordInviteWidget />
        {process.env.NODE_ENV === "development" ? (
          <>
            <GoogleAnalytics />
          </>
        ) : (
          <>
            <Analytics />
            <BaiDuAnalytics />
            <GoogleAnalytics />
            <GoogleAdsense />
            <PlausibleAnalytics />
            <ToltScript />
          </>
        )}
      </body>
    </html>
  );
}
