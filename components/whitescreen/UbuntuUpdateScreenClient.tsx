"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import UbuntuUpdateScreenFAQ from "./UbuntuUpdateScreenFAQ";
import UbuntuUpdateScreenHero from "./UbuntuUpdateScreenHero";
import UbuntuUpdateScreenUseCases from "./UbuntuUpdateScreenUseCases";
import UbuntuUpdateScreenHowToUse from "./UbuntuUpdateScreenHowToUse";
import ColorScreensSection from "./ColorScreensSection";

export default function UbuntuUpdateScreenClient() {
  const t = useTranslations("UbuntuUpdateScreen");
  const [selectedColor, setSelectedColor] = useState("ubuntu-22-04");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const colors = [
    { name: "Ubuntu 22.04", value: "ubuntu-22-04", className: "bg-purple-800", href: "/fake-ubuntu-update" },
    { name: "Windows 10", value: "windows-10", className: "bg-blue-600", href: "/fake-windows-10-update-screen" },
    { name: "Windows XP", value: "windows-xp", className: "bg-blue-600", href: "/fake-windows-xp-update-screen" },
    { name: "Mac OS X", value: "mac-os-x", className: "bg-black", href: "/fake-mac-os-x-update-screen" },
    { name: "Android", value: "android", className: "bg-green-500", href: "/fake-android-update-screen" },
    { name: "Windows 11", value: "windows-11", className: "bg-black", href: "/fake-windows-11-update" },
  ];

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleColorChange = (color: any) => {
    // 只处理当前页面的颜色切换
    if (color.value === "ubuntu-22-04") {
      setSelectedColor(color.value);
    }
    // 其他页面的跳转通过I18nLink处理，不在这里处理
  };

  const handleCustomColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* FAQPage Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": t("faq.whatIs.question"),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t("faq.whatIs.answer")
                }
              },
              {
                "@type": "Question",
                "name": t("faq.safe.question"),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t("faq.safe.answer")
                }
              },
              {
                "@type": "Question",
                "name": t("faq.pranks.question"),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t("faq.pranks.answer")
                }
              },
              {
                "@type": "Question",
                "name": t("faq.exit.question"),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t("faq.exit.answer")
                }
              },
              {
                "@type": "Question",
                "name": t("faq.devices.question"),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t("faq.devices.answer")
                }
              },
              {
                "@type": "Question",
                "name": t("faq.real.question"),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t("faq.real.answer")
                }
              },
              {
                "@type": "Question",
                "name": t("faq.content.question"),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t("faq.content.answer")
                }
              }
            ]
          })
        }}
      />

      <UbuntuUpdateScreenHero
        selectedColor={selectedColor}
        onColorChange={handleColorChange}
        onFullscreen={handleFullscreen}
        onCustomColorChange={handleCustomColorChange}
        isFullscreen={isFullscreen}
      />

      {/* Color Screens Section */}
      <ColorScreensSection />

      {/* How to Use Section */}
      <UbuntuUpdateScreenHowToUse />

      {/* Original Content */}
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="max-w-6xl mx-auto px-4 py-6">
          <UbuntuUpdateScreenUseCases />
          <UbuntuUpdateScreenFAQ />
        </main>
      </div>
    </div>
  );
} 