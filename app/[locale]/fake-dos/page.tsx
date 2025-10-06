import FakeDosClient from "@/components/whitescreen/FakeDosClient";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FakeDosScreen" });

  return constructMetadata({
    page: "FakeDosScreen",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/fake-dos`,
  });
}

export default function FakeDosPage() {
  return <FakeDosClient />;
} 