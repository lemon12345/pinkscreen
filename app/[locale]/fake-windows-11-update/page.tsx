import Windows11UpdateScreenClient from "@/components/whitescreen/Windows11UpdateScreenClient";
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
  const t = await getTranslations({ locale, namespace: "Windows11UpdateScreen" });

  return constructMetadata({
    page: "Windows11UpdateScreen",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/fake-windows-11-update`,
  });
}

export default function Windows11UpdateScreenPage() {
  return <Windows11UpdateScreenClient />;
} 