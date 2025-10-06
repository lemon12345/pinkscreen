import FbiWarningClient from "@/components/whitescreen/FbiWarningClient";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FbiWarningScreen" });

  return constructMetadata({
    page: "FbiWarningScreen",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/fbi-warning`,
  });
}

export default function FbiWarningPage() {
  return <FbiWarningClient />;
} 