import RedScreenClient from "@/components/whitescreen/RedScreenClient";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Head from "next/head";

type Params = Promise<{ locale: string }>;

type MetadataProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RedScreen" });

  return constructMetadata({
    page: "RedScreen",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/red-screen`,
  });
}

export default function RedScreenPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Red Screen tool for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It fills your display with red — often used for testing stuck or dead pixels on monitors and screens."
        }
      },
      {
        "@type": "Question",
        "name": "Is red light good for eyes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Red light is softer at night and may help reduce strain compared to blue light."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this for lighting or ambience?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The red screen can create a warm, cozy light effect in dark rooms."
        }
      },
      {
        "@type": "Question",
        "name": "Does it work on mobile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The Red Screen tool works perfectly on phones and tablets."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <RedScreenClient />
    </>
  );
} 