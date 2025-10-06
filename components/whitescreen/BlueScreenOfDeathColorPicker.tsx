"use client";

import { useRouter } from "@/i18n/routing";
import { Maximize } from "lucide-react";
import { useTranslations } from "next-intl";

interface BlueScreenOfDeathColorPickerProps {
  selectedColor: string;
  colors: Array<{ name: string; value: string; className: string }>;
  onColorChange: (color: any) => void;
  onCustomColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFullscreen: () => void;
}

export default function BlueScreenOfDeathColorPicker({
  selectedColor,
  colors,
  onColorChange,
  onCustomColorChange,
  onFullscreen,
}: BlueScreenOfDeathColorPickerProps) {
  const t = useTranslations("BlueScreenOfDeath");
  const router = useRouter();

  const screenOptions = [
    {
      name: "Broken Screen",
      value: "broken-screen",
      image: "/image/prank/small/broken.webp",
      href: "/broken-screen"
    },
    {
      name: "Radar Screen",
      value: "radar-screen",
      image: "/image/prank/small/radar.webp",
      href: "/radar-screen"
    },
    {
      name: "Hacker Screen",
      value: "hacker-screen",
      image: "/image/prank/small/hacker-typer.webp",
      href: "/hacker-screen"
    },
    {
      name: "Death Screen XP",
      value: "death-screen-xp",
      image: "/fake/death.webp",
      href: "/blue-screen-of-death-windows"
    },
    {
      name: "Death Screen 10",
      value: "death-screen-10",
      image: "/fake/death-10.webp",
      href: "/blue-screen-of-death-windows-10"
    }
  ];

  const handleScreenClick = (screen: any) => {
    if (screen.value === "death-screen-xp") {
      // 如果是当前页面，不导航
      onColorChange({ value: "death-screen-xp" });
      return;
    }
    // 导航到其他屏幕页面
    router.push(screen.href);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Choose Screen</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {screenOptions.map((screen) => (
          <div key={screen.value} className="text-center">
            <button
              className={`w-full h-24 rounded-lg border-2 transition-all hover:scale-105 mb-2 overflow-hidden ${selectedColor === screen.value
                ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-400"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              onClick={() => handleScreenClick(screen)}
              title={screen.name}
            >
              <img
                src={screen.image}
                alt={screen.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.fallback') as HTMLElement;
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
              <div className="fallback w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm" style={{ display: 'none' }}>
                {screen.name}
              </div>
            </button>
            <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
              {screen.name}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <button
          onClick={onFullscreen}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <Maximize className="w-4 h-4" />
          <span>{t("colorPicker.fullscreen")}</span>
        </button>
      </div>
    </div>
  );
} 