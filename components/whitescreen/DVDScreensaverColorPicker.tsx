"use client";

import { useRouter } from "@/i18n/routing";
import { Maximize } from "lucide-react";
import { useTranslations } from "next-intl";

interface DVDScreensaverColorPickerProps {
  selectedColor: string;
  colors: Array<{ name: string; value: string; className: string }>;
  onColorChange: (color: any) => void;
  onCustomColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFullscreen: () => void;
  onRestart?: () => void;
  dvdSpeed: number;
  dvdSize: number;
  onDvdSpeedChange: (speed: number) => void;
  onDvdSizeChange: (size: number) => void;
}

export default function DVDScreensaverColorPicker({
  selectedColor,
  colors,
  onColorChange,
  onCustomColorChange,
  onFullscreen,
  onRestart,
  dvdSpeed,
  dvdSize,
  onDvdSpeedChange,
  onDvdSizeChange,
}: DVDScreensaverColorPickerProps) {
  const t = useTranslations("DVDScreensaver");
  const router = useRouter();

  const screenOptions = [
    { name: "DVD", value: "dvd", image: "/22/image/saver/dvd.webp", href: "/dvd-screensaver" },
    { name: "Flip Clock", value: "flip-clock", image: "/22/image/saver/flip-clock.webp", href: "/flip-clock-screensaver" },
    { name: "Quotes", value: "quotes", image: "/22/image/saver/motivational-quote.webp", href: "/motivational-quote-screensaver" },
    { name: "No Signal", value: "no-signal", image: "/22/image/saver/saver-color-bars.png", href: "/no-signal-smpte-color-bars-screensaver" },
    { name: "Matrix", value: "matrix", image: "/22/image/saver/small/saver-matrix.webp", href: "/matrix-screensaver" },
  ];

  const handleScreenClick = (screen: any) => {
    onColorChange(screen);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t("colorPicker.title")}</h2>

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
                backgroundImage: `url(${screen.image})`,
                backgroundColor: "#000000",
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

      <div className="mt-6">
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("colorPicker.speed")}</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="6"
                step="0.5"
                value={dvdSpeed}
                onChange={(e) => onDvdSpeedChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">{dvdSpeed}</span>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("colorPicker.size")}</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="1"
                max="40"
                step="2"
                value={dvdSize}
                onChange={(e) => onDvdSizeChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">{dvdSize}%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {t("colorPicker.selectScreen")}
        </p>
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-11 rounded-md px-8 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
          onClick={onFullscreen}
        >
          <Maximize className="h-5 w-5 mr-2" />
          {t("colorPicker.fullScreen")}
        </button>
      </div>
    </div>
  );
} 