"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import WhiteScreenHowToUse from "./WhiteScreenHowToUse";
import Windows11UpdateScreenFAQ from "./Windows11UpdateScreenFAQ";
import Windows11UpdateScreenHero from "./Windows11UpdateScreenHero";
import Windows11UpdateScreenUseCases from "./Windows11UpdateScreenUseCases";
import ColorScreensSection from "./ColorScreensSection";
import Windows11UpdateScreenHowToUse from "./Windows11UpdateScreenHowToUse";

export default function Windows11UpdateScreenClient() {
  const t = useTranslations("Windows11UpdateScreen");
  const [selectedColor, setSelectedColor] = useState("windows-11");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [updateDuration, setUpdateDuration] = useState(42);
  const [startTime, setStartTime] = useState(7);
  const [updatePercentage, setUpdatePercentage] = useState(7);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const colors = [
    { name: "Windows 11", value: "windows-11", className: "bg-black", href: "/fake-windows-11-update" },
    { name: "Windows 10", value: "windows-10", className: "bg-blue-600", href: "/fake-windows-10-update-screen" },
    { name: "Windows XP", value: "windows-xp", className: "bg-blue-600", href: "/fake-windows-xp-update-screen" },
    { name: "Mac OS X", value: "mac-os-x", className: "bg-black", href: "/fake-mac-os-x-update-screen" },
    { name: "Ubuntu 22.04", value: "ubuntu-22-04", className: "bg-purple-800", href: "/fake-ubuntu-update" },
    { name: "Android", value: "android", className: "bg-green-500", href: "/fake-android-update-screen" },
  ];

  const startUpdateTimer = () => {
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
    }

    const totalDuration = updateDuration * 60 * 1000;
    const intervalTime = totalDuration / 100;

    setUpdatePercentage(startTime);

    updateIntervalRef.current = setInterval(() => {
      setUpdatePercentage(prev => {
        if (prev >= 100) {
          if (updateIntervalRef.current) {
            clearInterval(updateIntervalRef.current);
          }
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);
  };

  const handleRestart = () => {
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
    }
    startUpdateTimer();
  };

  useEffect(() => {
    startUpdateTimer();

    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [updateDuration, startTime]);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleColorChange = (color: any) => {
    // 只处理当前页面的颜色切换
    if (color.value === "windows-11") {
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
                "name": t("faq.howToUse.question"),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t("faq.howToUse.answer")
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
                "name": t("faq.realistic.question"),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t("faq.realistic.answer")
                }
              },
              {
                "@type": "Question",
                "name": t("faq.otherScreens.question"),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t("faq.otherScreens.answer")
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
                "name": t("faq.mobile.question"),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t("faq.mobile.answer")
                }
              },
              {
                "@type": "Question",
                "name": t("faq.privacy.question"),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t("faq.privacy.answer")
                }
              },
              {
                "@type": "Question",
                "name": t("faq.difference.question"),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t("faq.difference.answer")
                }
              }
            ]
          })
        }}
      />

      <Windows11UpdateScreenHero
        selectedColor={selectedColor}
        onColorChange={handleColorChange}
        onFullscreen={handleFullscreen}
        onCustomColorChange={handleCustomColorChange}
        updatePercentage={updatePercentage}
        updateDuration={updateDuration}
        startTime={startTime}
        onUpdateDurationChange={setUpdateDuration}
        onStartTimeChange={setStartTime}
        onRestart={handleRestart}
        isFullscreen={isFullscreen}
      />

      {/* Color Screens Section */}
      <ColorScreensSection />

      {/* Original Content */}
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="max-w-6xl mx-auto px-4 py-6">
          <Windows11UpdateScreenUseCases />
          <Windows11UpdateScreenHowToUse />
          <Windows11UpdateScreenFAQ />
        </main>
      </div>
    </div>
  );
} 