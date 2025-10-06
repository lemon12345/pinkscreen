"use client";

interface BrokenScreenPreviewProps {
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
  onColorChange: (color: { name: string; value: string; className: string }) => void;
  isFullscreen: boolean;
}

export default function BrokenScreenPreview({
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
  onColorChange,
  isFullscreen,
}: BrokenScreenPreviewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Live Preview</h2>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4 transition-colors">
        <div
          className="w-full h-48 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer hover:opacity-90 transition-opacity full-screen relative overflow-hidden"
          style={{
            backgroundImage: selectedColor === "broken-screen"
              ? "url('/image/prank/broken.webp')"
              : selectedColor === "radar-screen"
                ? "url('/image/prank/small/radar.webp')"
                : selectedColor === "death-screen-xp"
                  ? "url('/fake/death.webp')"
                  : selectedColor === "hacker-typer"
                    ? "url('/image/prank/small/hacker-typer.webp')"
                    : selectedColor === "death-screen-10"
                      ? "url('/fake/death-10.webp')"
                        : "none",
            backgroundColor: selectedColor === "broken-screen" ? "gray" :
              selectedColor === "radar-screen" ? "black" :
                selectedColor === "death-screen-xp" ? "#0078d7" :
                  selectedColor === "hacker-typer" ? "black" :
                    selectedColor === "death-screen-10" ? "#0078d7" : selectedColor,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
          onClick={onFullscreen}
        >
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4 mb-4">
        {colors.map((color) => (
          <div key={color.value} className="text-center">
            <div
              className={`w-16 h-16 rounded-lg border-2 transition-all hover:scale-105 mb-2 cursor-pointer ${selectedColor === color.value
                ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-400"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              style={{
                backgroundColor: color.value === "broken-screen" ? "gray" :
                  color.value === "radar-screen" ? "black" :
                    color.value === "death-screen-xp" ? "#0078d7" :
                      color.value === "hacker-typer" ? "black" :
                        color.value === "death-screen-10" ? "#0078d7" : color.value,
                backgroundImage: color.value === "broken-screen"
                  ? "url('/image/prank/broken.webp')"
                  : color.value === "radar-screen"
                    ? "url('/image/prank/small/radar.webp')"
                    : color.value === "death-screen-xp"
                        ? "url('/fake/death.webp')"
                        : color.value === "hacker-typer"
                          ? "url('/image/prank/small/hacker-typer.webp')"
                          : color.value === "death-screen-10"
                            ? "url('/fake/death-10.webp')"
                            : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
              onClick={() => onColorChange(color)}
            />
            <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
              {color.name}
            </div>
          </div>
        ))}
      </div>


    </div>
  );
} 