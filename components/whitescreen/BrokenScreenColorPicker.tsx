"use client";
import { useRouter } from "@/i18n/routing";
import { Maximize } from "lucide-react";
import { useTranslations } from "next-intl";

interface BrokenScreenColorPickerProps {
  selectedColor: string;
  colors: Array<{ name: string; value: string; className: string }>;
  onColorChange: (color: any) => void;
  onCustomColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFullscreen: () => void;
}

export default function BrokenScreenColorPicker({
  selectedColor,
  colors,
  onColorChange,
  onCustomColorChange,
  onFullscreen,
}: BrokenScreenColorPickerProps) {
  const t = useTranslations("BrokenScreen");
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
    if (screen.value === "broken-screen") {
      // 如果是当前页面，不导航
      onColorChange({ value: "broken-screen" });
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
                ? "border-red-500 ring-2 ring-red-200 dark:ring-red-400"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              onClick={() => handleScreenClick(screen)}
              title={screen.name}
            >
              <img
                src={screen.image}
                alt={screen.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // 如果图片加载失败，显示灰色背景
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.style.backgroundColor = '#6B7280';
                }}
              />
            </button>
            <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
              {screen.name}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Select a screen effect to display
        </p>
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-11 rounded-md px-8 w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white"
          onClick={onFullscreen}
        >
          <Maximize className="h-5 w-5 mr-2" />
          {t("colorPicker.launchButton")}
        </button>
      </div>
    </div>
  );
} 