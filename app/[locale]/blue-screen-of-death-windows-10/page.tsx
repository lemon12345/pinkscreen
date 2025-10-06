import BlueScreenOfDeathWindows10Client from "@/components/whitescreen/BlueScreenOfDeathWindows10Client";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string }>;
type MetadataProps = { params: Params; };

export async function generateMetadata({ params, }: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlueScreenOfDeathWindows10" });
  return constructMetadata({
    page: "BlueScreenOfDeathWindows10",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/blue-screen-of-death-windows-10`,
  });
}

export default function BlueScreenOfDeathWindows10Page() {
  return <BlueScreenOfDeathWindows10Client />;
} 