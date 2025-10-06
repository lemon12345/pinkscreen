import BlueScreenClient from "@/components/whitescreen/BlueScreenClient";
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
  const t = await getTranslations({ locale, namespace: "BlueScreen" });

  return constructMetadata({
    page: "BlueScreen",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/blue-screen`,
  });
}

export default function BlueScreenPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Blue Screen tool?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It shows a solid blue background on your monitor — ideal for blue color testing, visual balance, or chroma-style effects."
        }
      },
      {
        "@type": "Question",
        "name": "Is it the same as the Blue Screen of Death?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. This is a harmless blue background generator, not an error screen."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use it for photography or video?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the solid blue color works well as a background for compositing or creative effects."
        }
      },
      {
        "@type": "Question",
        "name": "Does it support full screen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Use the full-screen button for an immersive display."
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
      <BlueScreenClient />
    </>
  );
} 