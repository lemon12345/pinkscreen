"use client";
import { ChevronDown, Download, Monitor } from "lucide-react";

interface WhiteScreenPreviewProps {
  selectedColor: string;
  width: number;
  height: number;
  selectedResolution: string;
  colors: Array<{ name: string; value: string; className: string }>;
  resolutions: Array<{ name: string; width: number; height: number }>;
  onFullscreen: () => void;
  onDownload: () => void;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onResolutionChange: (resolution: { name: string; width: number; height: number }) => void;
  onSwapDimensions: () => void;
  isFullscreen: boolean;
}

export default function WhiteScreenPreview({
  selectedColor,
  width,
  height,
  selectedResolution,
  colors,
  resolutions,
  onFullscreen,
  onDownload,
  onWidthChange,
  onHeightChange,
  onResolutionChange,
  onSwapDimensions,
  isFullscreen,
}: WhiteScreenPreviewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Live Preview</h2>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4 transition-colors">
        <div
          className="w-full h-48 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center full-screen"
          style={{ backgroundColor: selectedColor }}
          onClick={onFullscreen}
        >
          {!isFullscreen && (
            <div className="text-center text-gray-400">
              <Monitor className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">Click for Fullscreen</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2 text-sm mb-4">
        <span className="text-gray-600 dark:text-gray-300">Current:</span>
        <div
          className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600"
          style={{ backgroundColor: selectedColor }}
        ></div>
        <span className="font-medium text-gray-900 dark:text-white">
          {colors.find(c => c.value === selectedColor)?.name || "Custom"}
        </span>
        <span className="text-gray-500 dark:text-gray-400 font-jetbrains-mono">{selectedColor}</span>
      </div>

      {/* Resolution Controls */}
      <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
        {/* Mobile Layout */}
        <div className="sm:hidden space-y-3">
          <div>
            <label className="font-medium text-xs text-gray-600 dark:text-gray-300 mb-1 block">
              Resolution
            </label>
            <div className="relative">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm h-9 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              >
                <span>{selectedResolution}</span>
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
                Width
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
              className="inline-flex items-center justify-center px-2 h-9 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              onClick={onSwapDimensions}
              title="Swap width and height"
            >
              ⇄
            </button>
            <div className="flex-1">
              <label className="font-medium text-xs text-gray-600 dark:text-gray-300 mb-1 block">
                Height
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
            <button
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium py-2 h-9 bg-gray-800 hover:bg-gray-900 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-3"
              onClick={onDownload}
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <div className="flex items-end gap-1 sm:gap-2">
            <div className="flex-1">
              <label className="font-medium text-xs text-gray-600 dark:text-gray-300 mb-1 block">
                Resolution
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm h-9 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                >
                  <span>{selectedResolution}</span>
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
            <div className="w-16 sm:w-20">
              <label className="font-medium text-xs text-gray-600 dark:text-gray-300 mb-1 block">
                Width
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
              className="inline-flex items-center justify-center px-2 h-9 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              onClick={onSwapDimensions}
              title="Swap width and height"
            >
              ⇄
            </button>
            <div className="w-16 sm:w-20">
              <label className="font-medium text-xs text-gray-600 dark:text-gray-300 mb-1 block">
                Height
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
            <button
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium py-2 h-9 bg-gray-800 hover:bg-gray-900 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-2 sm:px-3"
              onClick={onDownload}
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
