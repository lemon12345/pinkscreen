import AndroidUpdateScreenClient from "@/components/whitescreen/AndroidUpdateScreenClient";
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
  const t = await getTranslations({ locale, namespace: "AndroidUpdateScreen" });

  return constructMetadata({
    page: "AndroidUpdateScreen",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: "/fake-android-update-screen",
  });
}

export default function AndroidUpdateScreenPage() {
  return <AndroidUpdateScreenClient />;
} 