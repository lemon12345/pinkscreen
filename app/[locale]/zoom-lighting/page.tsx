import ZoomLightingClient from "@/components/whitescreen/ZoomLightingClient";
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
  const t = await getTranslations({ locale, namespace: "ZoomLighting" });

  return constructMetadata({
    page: "ZoomLighting",
    title: t("hero.title"),
    description: t("hero.description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/zoom-lighting`,
  });
}

export default function ZoomLightingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Zoom Lighting Online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zoom Lighting Online is a free web tool that turns your screen into a bright, soft light source — perfect for improving your appearance on video calls, live streams, or online meetings."
        }
      },
      {
        "@type": "Question",
        "name": "How do I use it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply open the page, choose your preferred brightness or color, and make your browser full screen. The screen will act as a virtual light for your face or background."
        }
      },
      {
        "@type": "Question",
        "name": "Does it really make me look better on Zoom?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! A bright, even light helps your camera capture clearer, more natural skin tones. It reduces shadows and makes your video look more professional."
        }
      },
      {
        "@type": "Question",
        "name": "Can I adjust the brightness or color temperature?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Use your device's brightness controls, or switch between white, warm, and cool color options to find the lighting that suits you best."
        }
      },
      {
        "@type": "Question",
        "name": "Is Zoom Lighting safe for my eyes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it's completely safe. However, avoid staring directly at bright white light for long periods — use it at a comfortable brightness level."
        }
      },
      {
        "@type": "Question",
        "name": "Does it work on phones or tablets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Zoom Lighting works on any device with a web browser — desktop, laptop, tablet, or mobile."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to download anything?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No downloads or sign-ups required. Just open the page and use it instantly."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use it for photography or streaming too?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Many people use Zoom Lighting as a quick and simple soft light for YouTube videos, Twitch streams, and portrait photos."
        }
      },
      {
        "@type": "Question",
        "name": "Is it free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Zoom Lighting Online is 100% free and doesn't include any ads or watermarks."
        }
      },
      {
        "@type": "Question",
        "name": "Does it work offline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You need an internet connection to load the page, but once it's loaded, it will continue to display the light even if your connection drops."
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
      <ZoomLightingClient />
    </>
  );
}
