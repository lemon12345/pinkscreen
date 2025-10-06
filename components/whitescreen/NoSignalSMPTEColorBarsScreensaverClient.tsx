"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import NoSignalSMPTEColorBarsScreensaverFAQ from "./NoSignalSMPTEColorBarsScreensaverFAQ";
import NoSignalSMPTEColorBarsScreensaverHero from "./NoSignalSMPTEColorBarsScreensaverHero";
import NoSignalSMPTEColorBarsScreensaverHowToUse from "./NoSignalSMPTEColorBarsScreensaverHowToUse";
import NoSignalSMPTEColorBarsScreensaverUseCases from "./NoSignalSMPTEColorBarsScreensaverUseCases";

export default function NoSignalSMPTEColorBarsScreensaverClient() {
  const t = useTranslations("NoSignalSMPTEColorBarsScreensaver");
  const [selectedColor, setSelectedColor] = useState("no-signal");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const colors = [
    { name: "No Signal", value: "no-signal", className: "bg-gray-800", href: "/no-signal-smpte-color-bars-screensaver" },
    { name: "DVD", value: "dvd", className: "bg-black", href: "/dvd-screensaver" },
    { name: "Flip Clock", value: "flip-clock", className: "bg-white", href: "/flip-clock-screensaver" },
    { name: "Quotes", value: "quotes", className: "bg-blue-600", href: "/motivational-quote-screensaver" },
    { name: "Matrix", value: "matrix", className: "bg-green-900", href: "/matrix-screensaver" },
  ];

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleColorChange = (color: any) => {
    // 只处理当前页面的颜色切换
    if (color.value === "no-signal") {
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
      <NoSignalSMPTEColorBarsScreensaverHero
        selectedColor={selectedColor}
        onColorChange={handleColorChange}
        onFullscreen={handleFullscreen}
        onCustomColorChange={handleCustomColorChange}
        isFullscreen={isFullscreen}
      />

      {/* Original Content */}
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="max-w-6xl mx-auto px-4 py-6">
          <NoSignalSMPTEColorBarsScreensaverUseCases />
          <NoSignalSMPTEColorBarsScreensaverHowToUse />
          <NoSignalSMPTEColorBarsScreensaverFAQ />
        </main>
      </div>
    </div>
  );
} 