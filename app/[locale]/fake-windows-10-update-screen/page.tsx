import Windows10UpdateScreenClient from "@/components/whitescreen/Windows10UpdateScreenClient";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface MetadataProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Windows10UpdateScreen" });

  return constructMetadata({
    page: "Windows10UpdateScreen",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: "/fake-windows-10-update-screen",
  });
}

export default function Windows10UpdateScreenPage() {
  return <Windows10UpdateScreenClient />;
} 