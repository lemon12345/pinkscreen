import ZoomLightingClient from "@/components/whitescreen/ZoomLightingClient";
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
  const t = await getTranslations({ locale, namespace: "ZoomLighting" });

  return constructMetadata({
    page: "ZoomLighting",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/zoom-lighting`,
  });
}

export default function ZoomLightingPage() {
  return <ZoomLightingClient />;
}
