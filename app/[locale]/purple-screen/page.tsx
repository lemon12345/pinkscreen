import PurpleScreenClient from "@/components/whitescreen/PurpleScreenClient";
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
  const t = await getTranslations({ locale, namespace: "PurpleScreen" });

  return constructMetadata({
    page: "PurpleScreen",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/purple-screen`,
  });
}

export default function PurpleScreenPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the purpose of the Purple (or Pink) Screen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It displays a soft purple or pink color, used for calming visuals, background light, or aesthetic effects."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use it for lighting or mood setting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, many users use the purple or pink screen to create ambient lighting for rooms or photography."
        }
      },
      {
        "@type": "Question",
        "name": "Does it work on phones and tablets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. It's mobile-friendly and adjusts automatically to your screen size."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe for long use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, but like all bright screens, take occasional breaks to rest your eyes."
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
      <PurpleScreenClient />
    </>
  );
}
