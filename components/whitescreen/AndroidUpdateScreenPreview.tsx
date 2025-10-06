"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";

interface AndroidUpdateScreenPreviewProps {
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
  onResolutionChange: (resolution: any) => void;
  onSwapDimensions: () => void;
  onColorChange: (color: any) => void;
  isFullscreen: boolean;
  updatePercentage: number;
  updateDuration: number;
  startTime: number;
  onUpdateDurationChange: (duration: number) => void;
  onStartTimeChange: (time: number) => void;
  onRestart: () => void;
}

export default function AndroidUpdateScreenPreview({
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
  updatePercentage,
  updateDuration,
  startTime,
  onUpdateDurationChange,
  onStartTimeChange,
  onRestart,
}: AndroidUpdateScreenPreviewProps) {
  const t = useTranslations("AndroidUpdateScreen");
  const previewRef = useRef<HTMLDivElement>(null);

  const getUpdateText = () => {
    return t("preview.updateText");
  };

  const getTextSize = () => {
    if (isFullscreen) return "22px";
    return "14px";
  };

  const getLogoSize = () => {
    if (isFullscreen) return "200px";
    return "80px";
  };

  const getLogoMargin = () => {
    if (isFullscreen) return "100px";
    return "20px";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <style jsx>{`
        progress::-webkit-progress-value {
          background-color: #fff !important;
        }
        progress::-webkit-progress-bar {
          background-color: #56a5e2;
        }
        progress::-moz-progress-bar {
          background-color: #fff !important;
        }
      `}</style>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Preview</h2>

        {/* Main Preview */}
        <div
          ref={previewRef}
          className="relative w-full h-64 bg-blue-600 rounded-lg overflow-hidden cursor-pointer full-screen"
          onClick={onFullscreen}
          style={{
            backgroundColor: "#0084e7",
            fontFamily: "Roboto, sans-serif",
            fontSize: getTextSize(),
            lineHeight: 1.6,
            color: "#fff",
            textAlign: "center",
            fontWeight: 400,
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              src="/22/image/android/logo.svg"
              alt="Android logo"
              className="mb-5"
              style={{
                height: getLogoSize(),
                marginBottom: getLogoMargin(),
              }}
            />
            <p
              className="text-start whitespace-nowrap overflow-hidden text-ellipsis text-white pb-2.5"
              style={{
                textAlign: "start",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "#fff",
                padding: "0 0 10px 0",
              }}
            >
              {getUpdateText()}<br />
              <span>{Math.round(updatePercentage)}%</span>
            </p>
            <progress
              value={updatePercentage}
              max="100"
              className="w-full h-1.5 bottom-20 rounded-none border-none text-white overflow-hidden"
              style={{
                height: "6px",
                bottom: "20vh",
                borderRadius: "1px",
                border: "none",
                color: "#fff",
                background: "rgba(255, 255, 255, .5)",
                backgroundColor: "#56a5e2",
                overflow: "hidden",
                width: "100%",
              }}
            />
          </div>
        </div>

        {/* Screen Selection */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Choose Screen</h3>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <div key={color.value} className="text-center">
                <button
                  className={`w-full h-12 rounded-xl border-2 transition-all hover:scale-105 mb-1 overflow-hidden ${selectedColor === color.value
                    ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-400"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                    }`}
                  onClick={() => onColorChange(color)}
                  title={color.name}
                  style={{
                    backgroundImage: color.value === "windows-10" ? "url('/22/image/fake/windows-10-update-screen.webp')" :
                      color.value === "windows-xp" ? "url('/22/image/fake/windows-xp-update-screen.webp')" :
                        color.value === "mac-os-x" ? "url('/22/image/fake/mac-os-x-update-screen.webp')" :
                          color.value === "ubuntu-22-04" ? "url('/22/image/fake/ubuntu-22-04-update-screen.webp')" :
                            color.value === "chrome-os" ? "url('/22/image/fake/chrome-os-update-screen.webp')" :
                              color.value === "android" ? "url('/22/image/fake/android-update-screen.webp')" :
                                color.value === "windows-11" ? "url('/22/image/fake/windows-11-update-screen.webp')" : "none",
                    backgroundColor: color.value === "windows-10" ? "#0078d7" :
                      color.value === "windows-xp" ? "#0078d7" :
                        color.value === "mac-os-x" ? "#000" :
                          color.value === "ubuntu-22-04" ? "#772953" :
                            color.value === "chrome-os" ? "#000" :
                              color.value === "android" ? "#0084e7" :
                                color.value === "windows-11" ? "#000" : "#000000",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img
                    src={color.value === "windows-10" ? "/22/image/fake/windows-10-update-screen.webp" :
                      color.value === "windows-xp" ? "/22/image/fake/windows-xp-update-screen.webp" :
                        color.value === "mac-os-x" ? "/22/image/fake/mac-os-x-update-screen.webp" :
                          color.value === "ubuntu-22-04" ? "/22/image/fake/ubuntu-22-04-update-screen.webp" :
                            color.value === "chrome-os" ? "/22/image/fake/chrome-os-update-screen.webp" :
                              color.value === "android" ? "/22/image/fake/android-update-screen.webp" :
                                color.value === "windows-11" ? "/22/image/fake/windows-11-update-screen.webp" : ""}
                    alt={color.name}
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
                    {color.name}
                  </div>
                </button>
                <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                  {color.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 