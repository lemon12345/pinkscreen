import DVDScreensaverClient from "@/components/whitescreen/DVDScreensaverClient";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string }>;

type MetadataProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DVDScreensaver" });

  return constructMetadata({
    page: "DVDScreensaver",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/dvd-screensaver`,
  });
}

export default function DVDScreensaverPage() {
  return <DVDScreensaverClient />;
} 