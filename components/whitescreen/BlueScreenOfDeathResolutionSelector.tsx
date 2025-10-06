"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

interface BlueScreenOfDeathResolutionSelectorProps {
  selectedResolution: string;
  resolutions: Array<{ name: string; width: number; height: number }>;
  width: number;
  height: number;
  onResolutionChange: (resolution: { name: string; width: number; height: number }) => void;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onSwapDimensions: () => void;
}

export default function BlueScreenOfDeathResolutionSelector({
  selectedResolution,
  resolutions,
  width,
  height,
  onResolutionChange,
  onWidthChange,
  onHeightChange,
  onSwapDimensions,
}: BlueScreenOfDeathResolutionSelectorProps) {
  const t = useTranslations("BlueScreenOfDeath");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {t("resolutionSelector.title")}
      </h2>

      {/* Desktop Layout */}
      <div className="space-y-4">
        <div className="flex-1">
          <label className="font-medium text-xs text-gray-600 dark:text-gray-300 mb-1 block">
            {t("resolutionSelector.resolution")}
          </label>
          <div className="relative">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm h-9 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            >
              <span className="text-gray-900 dark:text-white">{selectedResolution}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
            <select
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              value={selectedResolution}
              onChange={(e) => {
                const resolution = resolutions.find(r => r.name === e.target.value);
                if (resolution) onResolutionChange(resolution);
              }}
            >
              {resolutions.map((resolution) => (
                <option key={resolution.name} value={resolution.name}>
                  {resolution.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="font-medium text-xs text-gray-600 dark:text-gray-300 mb-1 block">
              {t("resolutionSelector.width")}
            </label>
            <input
              type="number"
              className="flex w-full rounded-md border px-3 py-2 text-sm h-9 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:text-white"
              min="1"
              max="7680"
              value={width}
              onChange={(e) => onWidthChange(Number(e.target.value))}
            />
          </div>
          <button
            className="inline-flex items-center justify-center px-2 h-9 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
            onClick={onSwapDimensions}
            title="Swap width and height"
          >
            ⇄
          </button>
          <div className="flex-1">
            <label className="font-medium text-xs text-gray-600 dark:text-gray-300 mb-1 block">
              {t("resolutionSelector.height")}
            </label>
            <input
              type="number"
              className="flex w-full rounded-md border px-3 py-2 text-sm h-9 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:text-white"
              min="1"
              max="4320"
              value={height}
              onChange={(e) => onHeightChange(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 