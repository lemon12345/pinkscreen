import BlackScreenClient from "@/components/whitescreen/BlackScreenClient";
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
  const t = await getTranslations({ locale, namespace: "BlackScreen" });

  return constructMetadata({
    page: "BlackScreen",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/black-screen`,
  });
}

export default function BlackScreenPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Black Screen tool?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Black Screen tool turns your screen completely black. It's perfect for testing monitors, using as a dark background, or focusing without distractions."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use it as a light-off screen or night mode?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Many people use the black screen to reduce glare or light while watching movies, resting, or sleeping."
        }
      },
      {
        "@type": "Question",
        "name": "Does the black screen damage the display?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, it's completely safe. It simply displays a black color and doesn't affect your monitor or pixels."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use it in full screen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Click the Full Screen button or press F11 for a borderless black display."
        }
      },
      {
        "@type": "Question",
        "name": "Is it available offline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Once loaded, you can keep the black screen active even without an internet connection."
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
      <BlackScreenClient />
    </>
  );
}
