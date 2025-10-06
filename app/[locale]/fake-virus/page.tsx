import FakeVirusClient from "@/components/whitescreen/FakeVirusClient";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FakeVirusScreen" });

  return constructMetadata({
    page: "FakeVirusScreen",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/fake-virus`,
  });
}

export default function FakeVirusPage() {
  return <FakeVirusClient />;
} 