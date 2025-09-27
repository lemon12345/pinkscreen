"use client";
import { useRouter } from "@/i18n/routing";
import { Maximize, Palette } from "lucide-react";
import { useTranslations } from "next-intl";

interface BlackScreenColorPickerProps {
  selectedColor: string;
  colors: Array<{ name: string; value: string; className: string }>;
  onColorChange: (color: any) => void;
  onCustomColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFullscreen: () => void;
}

export default function BlackScreenColorPicker({
  selectedColor,
  colors,
  onColorChange,
  onCustomColorChange,
  onFullscreen,
}: BlackScreenColorPickerProps) {
  const t = useTranslations("BlackScreen");
  const router = useRouter();

  const handleColorClick = (color: any) => {
    // 如果是黄色，跳转到yellow-screen页面
    if (color.value === "#FFFF00") {
      router.push("/yellow-screen");
      return;
    }
    // 如果是白色，跳转到whitescreen页面
    if (color.value === "#FFFFFF") {
      router.push("/whitescreen");
      return;
    }
    // 如果是红色，跳转到red-screen页面
    if (color.value === "#FF0000") {
      router.push("/red-screen");
      return;
    }
    // 如果是绿色，跳转到green-screen页面
    if (color.value === "#00FF00") {
      router.push("/green-screen");
      return;
    }
    // 如果是蓝色，跳转到blue-screen页面
    if (color.value === "#0000FF") {
      router.push("/blue-screen");
      return;
    }
    // 如果是橙色，跳转到orange-screen页面
    if (color.value === "#FFA500") {
      router.push("/orange-screen");
      return;
    }
    // 如果是粉色，跳转到首页
    if (color.value === "#FFC0CB") {
      router.push("/");
      return;
    }
    // 如果是紫色，跳转到purple-screen页面
    if (color.value === "#800080") {
      router.push("/purple-screen");
      return;
    }
    // 如果是zoom-lighting，跳转到zoom-lighting页面
    if (color.value === "#ffe5ce") {
      router.push("/zoom-lighting");
      return;
    }
    // 如果是黑色，保持在当前页面
    if (color.value === "#000000") {
      onColorChange(color);
      return;
    }
    // 其他颜色正常处理
    onColorChange(color);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t("colorPicker.title")}</h2>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {colors.map((color) => (
          <div key={color.value} className="text-center">
            <button
              className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-105 mb-1 ${selectedColor === color.value
                ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-400"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              style={{ backgroundColor: color.value }}
              onClick={() => handleColorClick(color)}
              title={`${color.name} - ${color.value}`}
            />
            <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
              {color.name}
            </div>
          </div>
        ))}
        <div className="text-center relative">
          <button
            className="w-12 h-12 rounded-lg border-2 transition-all hover:scale-105 mb-1 bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
            title="Custom Color Picker"
          >
            <Palette className="h-5 w-5 text-white mx-auto drop-shadow-sm" />
          </button>
          <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">{t("colorPicker.custom")}</div>
          <input
            type="color"
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 opacity-0 cursor-pointer"
            value={selectedColor}
            onChange={onCustomColorChange}
          />
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {t("colorPicker.description")}
        </p>
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-11 rounded-md px-8 w-full bg-black hover:bg-gray-800 dark:bg-black dark:hover:bg-gray-800 text-white"
          onClick={onFullscreen}
        >
          <Maximize className="h-5 w-5 mr-2" />
          {t("colorPicker.launchButton")}
        </button>
      </div>
    </div>
  );
}
