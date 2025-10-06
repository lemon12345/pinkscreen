"use client";

import { useRouter } from "@/i18n/routing";
import { Maximize } from "lucide-react";
import { useTranslations } from "next-intl";

interface Windows10UpdateScreenColorPickerProps {
  selectedColor: string;
  colors: any[];
  onColorChange: (color: any) => void;
  onCustomColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFullscreen: () => void;
  updateDuration: number;
  startTime: number;
  onUpdateDurationChange: (duration: number) => void;
  onStartTimeChange: (time: number) => void;
  onRestart: () => void;
}

export default function Windows10UpdateScreenColorPicker({
  selectedColor,
  colors,
  onColorChange,
  onCustomColorChange,
  onFullscreen,
  updateDuration,
  startTime,
  onUpdateDurationChange,
  onStartTimeChange,
  onRestart,
}: Windows10UpdateScreenColorPickerProps) {
  const t = useTranslations("Windows10UpdateScreen");
  const router = useRouter();

  const screenOptions = [
    { name: "Windows 10", value: "windows-10", image: "/22/image/fake/windows-10-update-screen.webp", href: "/fake-windows-10-update-screen" },
    { name: "Windows XP", value: "windows-xp", image: "/22/image/fake/windows-xp-update-screen.webp", href: "/fake-windows-xp-update-screen" },
    { name: "Mac OS X", value: "mac-os-x", image: "/22/image/fake/mac-os-x-update-screen.webp", href: "/fake-mac-os-x-update-screen" },
    { name: "Ubuntu 22.04", value: "ubuntu-22-04", image: "/22/image/fake/ubuntu-22-04-update-screen.webp", href: "/fake-ubuntu-update" },

    { name: "Android", value: "android", image: "/22/image/fake/android-update-screen.webp", href: "/fake-android-update-screen" },
    { name: "Windows 11", value: "windows-11", image: "/22/image/fake/windows-11-update-screen.webp", href: "/fake-windows-11-update" },
  ];

  const handleScreenClick = (screen: any) => {
    onColorChange(screen);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Choose Screen</h3>
        <div className="grid grid-cols-2 gap-3">
          {screenOptions.map((screen) => (
            <div key={screen.value} className="text-center">
              <button
                onClick={() => handleScreenClick(screen)}
                className="w-full h-20 rounded-xl overflow-hidden mb-1 transition-transform hover:scale-105"
                style={{
                  backgroundColor: screen.value === "windows-10" ? "#0079d7" : "#000",
                }}
              >
                <img
                  src={screen.image}
                  alt={screen.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>
              <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                {screen.name}
              </div>
            </div>
          ))}
        </div>
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
                onChange={(e) => onUpdateDurationChange(parseInt(e.target.value) || 42)}
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
                onChange={(e) => onStartTimeChange(parseInt(e.target.value) || 7)}
                className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
            </div>
          </div>
        </div>
        <button
          onClick={onRestart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Restart
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Click the preview to go fullscreen
        </p>
        <button
          onClick={onFullscreen}
          className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors"
        >
          <Maximize className="w-4 h-4" />
          <span>Full Screen</span>
        </button>
      </div>
    </div>
  );
} 