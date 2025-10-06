"use client";

import { useRouter } from "@/i18n/routing";
import { Maximize } from "lucide-react";
import { useTranslations } from "next-intl";

interface UbuntuUpdateScreenColorPickerProps {
  selectedColor: string;
  colors: Array<{ name: string; value: string; className: string }>;
  onColorChange: (color: any) => void;
  onCustomColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFullscreen: () => void;
}

export default function UbuntuUpdateScreenColorPicker({
  selectedColor,
  colors,
  onColorChange,
  onCustomColorChange,
  onFullscreen,
}: UbuntuUpdateScreenColorPickerProps) {
  const t = useTranslations("UbuntuUpdateScreen");
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
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Choose Screen</h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {screenOptions.map((screen) => (
          <div key={screen.value} className="text-center">
            <button
              className={`w-full h-20 rounded-xl border-2 transition-all hover:scale-105 mb-1 overflow-hidden ${selectedColor === screen.value
                ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-400"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              onClick={() => handleScreenClick(screen)}
              title={screen.name}
              style={{
                backgroundImage: screen.value === "windows-10" ? "url('/22/image/fake/windows-10-update-screen.webp')" :
                  screen.value === "windows-xp" ? "url('/22/image/fake/windows-xp-update-screen.webp')" :
                    screen.value === "mac-os-x" ? "url('/22/image/fake/mac-os-x-update-screen.webp')" :
                      screen.value === "ubuntu-22-04" ? "url('/22/image/fake/ubuntu-22-04-update-screen.webp')" :
                        screen.value === "android" ? "url('/22/image/fake/android-update-screen.webp')" :
                          screen.value === "windows-11" ? "url('/22/image/fake/windows-11-update-screen.webp')" : "none",
                backgroundColor: screen.value === "windows-10" ? "#0078d7" :
                  screen.value === "windows-xp" ? "#0078d7" :
                    screen.value === "mac-os-x" ? "#000" :
                      screen.value === "ubuntu-22-04" ? "#772953" :
                        screen.value === "android" ? "#3DDC84" :
                          screen.value === "windows-11" ? "#000" : "#000000",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <img
                src={screen.image}
                alt={screen.name}
                className="w-full h-full object-cover rounded-lg"
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

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Select a screen effect to display
        </p>
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-11 rounded-md px-8 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
          onClick={onFullscreen}
        >
          <Maximize className="h-5 w-5 mr-2" />
          Full Screen
        </button>
      </div>
    </div>
  );
} 