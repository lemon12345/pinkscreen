"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import BlueScreenOfDeathFAQ from "./BlueScreenOfDeathFAQ";
import BlueScreenOfDeathHero from "./BlueScreenOfDeathHero";
import BlueScreenOfDeathHowToUse from "./BlueScreenOfDeathHowToUse";
import BlueScreenOfDeathUseCases from "./BlueScreenOfDeathUseCases";

export default function BlueScreenOfDeathClient() {
  const t = useTranslations("BlueScreenOfDeath");
  const [selectedColor, setSelectedColor] = useState("death-screen-xp");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const colors = [
    { name: "White Noise", value: "white-noise", className: "bg-white", href: "/white-noise" },
    { name: "Broken Screen", value: "broken-screen", className: "bg-gray-500", href: "/broken-screen" },
    { name: "Radar Screen", value: "radar-screen", className: "bg-green-500", href: "/radar-screen" },
    { name: "Hacker Screen", value: "hacker-typer", className: "bg-green-600", href: "/hacker-screen" },
    { name: "Death Screen XP", value: "death-screen-xp", className: "bg-blue-600", href: "/blue-screen-of-death-windows" },
    { name: "Death Screen 10", value: "death-screen-10", className: "bg-blue-500", href: "/blue-screen-of-death-windows-10" },
  ];

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
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

  const handleColorChange = (color: any) => {
    // 只处理当前页面的颜色切换
    if (color.value === "death-screen-xp") {
      setSelectedColor(color.value);
    }
    // 其他页面的跳转通过I18nLink处理，不在这里处理
  };

  const handleCustomColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  return (
    <div className="min-h-screen">
      <BlueScreenOfDeathHero
        selectedColor={selectedColor}
        onColorChange={handleColorChange}
        onFullscreen={handleFullscreen}
        onCustomColorChange={handleCustomColorChange}
        isFullscreen={isFullscreen}
      />

      {/* Original Content */}
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="max-w-6xl mx-auto px-4 py-6">
          {/* Main Content */}
          <BlueScreenOfDeathHowToUse />
          <BlueScreenOfDeathUseCases />
          <BlueScreenOfDeathFAQ />
        </main>
      </div>
    </div>
  );
}