import GreenScreenClient from "@/components/whitescreen/GreenScreenClient";
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
  const t = await getTranslations({ locale, namespace: "GreenScreen" });

  return constructMetadata({
    page: "GreenScreen",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/green-screen`,
  });
}

export default function GreenScreenPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does the Green Screen page do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It shows a flat green background, useful for video compositing, color calibration, or visual tests."
        }
      },
      {
        "@type": "Question",
        "name": "Is this suitable for chroma key effects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. You can use the green screen as a simple background for video editing and streaming."
        }
      },
      {
        "@type": "Question",
        "name": "Does it have ads or watermarks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, the screen is clean and distraction-free — ideal for production use."
        }
      },
      {
        "@type": "Question",
        "name": "Can I make it full screen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Click the full-screen button or press F11 for a clean green display."
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
      <GreenScreenClient />
    </>
  );
}
