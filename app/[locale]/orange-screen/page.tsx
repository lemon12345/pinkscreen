import OrangeScreenClient from "@/components/whitescreen/OrangeScreenClient";
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
  const t = await getTranslations({ locale, namespace: "OrangeScreen" });

  return constructMetadata({
    page: "OrangeScreen",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/orange-screen`,
  });
}

export default function OrangeScreenPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Orange or Yellow Screen used for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It shows a warm color background for testing, design previews, or mood lighting."
        }
      },
      {
        "@type": "Question",
        "name": "Can it reduce blue light at night?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, orange and yellow tones are gentler on the eyes and can reduce sleep disruption."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use it as a light source?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the warm hue can be used as a reading light or ambient glow."
        }
      },
      {
        "@type": "Question",
        "name": "Does it work on all devices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. It runs smoothly on desktop, tablet, and mobile browsers."
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
      <OrangeScreenClient />
    </>
  );
} 