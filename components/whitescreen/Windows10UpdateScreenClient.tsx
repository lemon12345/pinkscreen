"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import Windows10UpdateScreenHowToUse from "./Windows10UpdateScreenHowToUse";
import Windows10UpdateScreenFAQ from "./Windows10UpdateScreenFAQ";
import Windows10UpdateScreenHero from "./Windows10UpdateScreenHero";
import Windows10UpdateScreenUseCases from "./Windows10UpdateScreenUseCases";
import ColorScreensSection from "./ColorScreensSection";

export default function Windows10UpdateScreenClient() {
  const t = useTranslations("Windows10UpdateScreen");
  const [selectedColor, setSelectedColor] = useState("windows-10");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [updateDuration, setUpdateDuration] = useState(42);
  const [startTime, setStartTime] = useState(7);
  const [updatePercentage, setUpdatePercentage] = useState(7);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const colors = [
    { name: "Windows 10", value: "windows-10", href: "/fake-windows-10-update-screen" },
    { name: "Windows XP", value: "windows-xp", href: "/fake-windows-xp-update-screen" },
    { name: "Mac OS X", value: "mac-os-x", href: "/fake-mac-os-x-update-screen" },
    { name: "Ubuntu 22.04", value: "ubuntu-22-04", href: "/fake-ubuntu-update" },
    { name: "Android", value: "android", href: "/fake-android-update-screen" },
    { name: "Windows 11", value: "windows-11", href: "/fake-windows-11-update" },
  ];

  const startUpdateTimer = () => {
    // Clear existing interval
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
    }

    // Calculate total duration in milliseconds
    const totalDuration = updateDuration * 60 * 1000; // Convert minutes to milliseconds
    const intervalTime = totalDuration / 100; // Time per percentage point

    // Set initial percentage
    setUpdatePercentage(startTime);

    // Start the timer
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
    // Clear existing interval
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
    }
    // Restart the timer
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

  const handleColorChange = (color: any) => {
    // 只处理当前页面的颜色切换
    if (color.value === "windows-10") {
      setSelectedColor(color.value);
    }
    // 其他页面的跳转通过I18nLink处理，不在这里处理
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const handleCustomColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

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
              },
              {
                "@type": "Question",
                "name": t("faq.windows11.question"),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t("faq.windows11.answer")
                }
              }
            ]
          })
        }}
      />

      <Windows10UpdateScreenHero
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
      <div className="bg-white dark:bg-gray-900">
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Windows10UpdateScreenUseCases />
          <Windows10UpdateScreenHowToUse />
          <Windows10UpdateScreenFAQ />
        </main>
      </div>
    </div>
  );
} 