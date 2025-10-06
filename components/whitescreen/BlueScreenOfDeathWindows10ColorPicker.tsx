"use client";

import { useRouter } from "@/i18n/routing";
import { Maximize } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface BlueScreenOfDeathWindows10ColorPickerProps {
  selectedColor: string;
  colors: Array<{ name: string; value: string; className: string }>;
  onColorChange: (color: any) => void;
  onCustomColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFullscreen: () => void;
}

export default function BlueScreenOfDeathWindows10ColorPicker({
  selectedColor,
  colors,
  onColorChange,
  onCustomColorChange,
  onFullscreen,
}: BlueScreenOfDeathWindows10ColorPickerProps) {
  const t = useTranslations("BlueScreenOfDeathWindows10");
  const router = useRouter();
  const [updateDuration, setUpdateDuration] = useState(42);
  const [startTime, setStartTime] = useState(7);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const screenOptions = [
    { name: "Broken Screen", value: "broken-screen", image: "/image/prank/small/broken.webp", href: "/broken-screen" },
    { name: "Radar Screen", value: "radar-screen", image: "/image/prank/small/radar.webp", href: "/radar-screen" },
    { name: "Hacker Screen", value: "hacker-screen", image: "/image/prank/small/hacker-typer.webp", href: "/hacker-screen" },
    { name: "Death Screen XP", value: "death-screen-xp", image: "/fake/death.webp", href: "/blue-screen-of-death-windows" },
    { name: "Death Screen 10", value: "death-screen-10", image: "/fake/death-10.webp", href: "/blue-screen-of-death-windows-10" }
  ];

  const handleScreenClick = (screen: any) => {
    if (screen.value === "death-screen-10") {
      onColorChange({ value: "death-screen-10" });
      return;
    }
    router.push(screen.href);
  };

  const startUpdateTimer = () => {
    // Clear existing interval
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
      updateIntervalRef.current = null;
    }

    // Set initial progress
    const updatePercentageElement = document.querySelector("#update-percentage");
    if (updatePercentageElement) {
      updatePercentageElement.textContent = startTime.toString();
    }

    // Calculate interval time
    const totalTime = updateDuration * 60 * 1000; // Convert to milliseconds
    const intervalTime = totalTime / 100;

    // Start new interval
    updateIntervalRef.current = setInterval(() => {
      const currentElement = document.querySelector("#update-percentage");
      if (currentElement) {
        const currentProgress = parseInt(currentElement.textContent || "0") + 1;
        if (currentProgress > 100) {
          if (updateIntervalRef.current) {
            clearInterval(updateIntervalRef.current);
            updateIntervalRef.current = null;
          }
        } else {
          currentElement.textContent = currentProgress.toString();
        }
      }
    }, intervalTime);
  };

  const handleRestart = () => {
    startUpdateTimer();
  };

  useEffect(() => {
    // Start timer on component mount
    startUpdateTimer();

    // Cleanup on unmount
    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [updateDuration, startTime]);

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
              style={{
                backgroundImage: screen.value === "broken-screen" ? "url('/image/prank/small/broken.webp')" :
                  screen.value === "radar-screen" ? "url('/image/prank/small/radar.webp')" :
                    screen.value === "hacker-screen" ? "url('/image/prank/small/hacker-typer.webp')" :
                      screen.value === "death-screen-xp" ? "url('/fake/death.webp')" :
                        screen.value === "death-screen-10" ? "url('/fake/death-10.webp')" : "none",
                backgroundColor: screen.value === "death-screen-10" ? "#0078d7" : "#000000",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
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
      <div className="mt-6">
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Update time</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                value={updateDuration}
                onChange={(e) => setUpdateDuration(parseInt(e.target.value) || 42)}
                className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">minutes</span>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start time</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                max="100"
                value={startTime}
                onChange={(e) => setStartTime(parseInt(e.target.value) || 7)}
                className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleRestart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Restart
        </button>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Select a screen effect to display
        </p>
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-11 rounded-md px-8 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
          onClick={onFullscreen}
        >
          <Maximize className="h-5 w-5 mr-2" />
          {t("colorPicker.launchButton")}
        </button>
      </div>
    </div>
  );
} 