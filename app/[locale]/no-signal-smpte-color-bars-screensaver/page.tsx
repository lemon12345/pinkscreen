import NoSignalSMPTEColorBarsScreensaverClient from "@/components/whitescreen/NoSignalSMPTEColorBarsScreensaverClient";
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
  const t = await getTranslations({ locale, namespace: "NoSignalSMPTEColorBarsScreensaver" });

  return constructMetadata({
    page: "NoSignalSMPTEColorBarsScreensaver",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/no-signal-smpte-color-bars-screensaver`,
  });
}

export default function NoSignalSMPTEColorBarsScreensaverPage() {
  return <NoSignalSMPTEColorBarsScreensaverClient />;
} 