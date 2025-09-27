"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface ZoomLightingTemperatureControlProps {
  onTemperatureChange: (color: string) => void;
}

export default function ZoomLightingTemperatureControl({
  onTemperatureChange,
}: ZoomLightingTemperatureControlProps) {
  const t = useTranslations("ZoomLighting");
  const [temperature, setTemperature] = useState(3300);
  const [rgbValues, setRgbValues] = useState({ r: 255, g: 147, b: 41 });

  // 温度到RGB转换函数
  const temperatureToRgb = (temp: number) => {
    const tempK = temp / 100;
    let r, g, b;

    if (tempK <= 66) {
      r = 255;
      g = tempK;
      g = 99.4708025861 * Math.log(g) - 161.1195681661;
      if (tempK <= 19) {
        b = 0;
      } else {
        const tempG = tempK - 10;
        b = 138.5177312231 * Math.log(tempG) - 305.0447927307;
      }
    } else {
      const tempR = tempK - 60;
      r = 329.698727446 * Math.pow(tempR, -0.1332047592);
      const tempG = tempK - 60;
      g = 288.1221695283 * Math.pow(tempG, -0.0755148492);
      b = 255;
    }

    const clamp = (value: number, min: number, max: number) => {
      return Math.min(Math.max(value, min), max);
    };

    return {
      r: Math.round(clamp(r, 0, 255)),
      g: Math.round(clamp(g, 0, 255)),
      b: Math.round(clamp(b, 0, 255)),
    };
  };

  const handleTemperatureChange = (newTemp: number) => {
    setTemperature(newTemp);
    const rgb = temperatureToRgb(newTemp);
    setRgbValues(rgb);
    const color = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    onTemperatureChange(color);
  };

  const handleTemperatureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTemp = parseInt(e.target.value);
    if (!isNaN(newTemp) && newTemp >= 1000 && newTemp <= 12000) {
      handleTemperatureChange(newTemp);
    }
  };

  useEffect(() => {
    // 初始化温度
    handleTemperatureChange(3300);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t("temperatureControl.title")}</h2>

      {/* 温度滑动条 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="temperature-slider" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("temperatureControl.temperature")}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={temperature}
              onChange={handleTemperatureInputChange}
              min="1000"
              max="12000"
              step="50"
              className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-transparent text-gray-900 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">K</span>
          </div>
        </div>
        <input
          type="range"
          min="1000"
          max="12000"
          step="50"
          value={temperature}
          onChange={(e) => handleTemperatureChange(parseInt(e.target.value))}
          className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          id="temperature-slider"
        />
      </div>

      {/* RGB值显示 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">R</label>
          <input
            type="number"
            value={rgbValues.r}
            readOnly
            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-center"
          />
        </div>
        <div className="text-center">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">G</label>
          <input
            type="number"
            value={rgbValues.g}
            readOnly
            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-center"
          />
        </div>
        <div className="text-center">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">B</label>
          <input
            type="number"
            value={rgbValues.b}
            readOnly
            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-center"
          />
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
        {t("temperatureControl.description")}
      </p>
    </div>
  );
}
