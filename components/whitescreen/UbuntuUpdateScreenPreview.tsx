"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface UbuntuUpdateScreenPreviewProps {
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

export default function UbuntuUpdateScreenPreview({
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
}: UbuntuUpdateScreenPreviewProps) {
  const t = useTranslations("UbuntuUpdateScreen");
  const previewRef = useRef<HTMLDivElement>(null);
  const [updatePercentage, setUpdatePercentage] = useState(0);
  const [updateInterval, setUpdateInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startUpdateTimer = () => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }

      const interval = setInterval(() => {
        setUpdatePercentage((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 2;
        });
      }, 1000);

      setUpdateInterval(interval);
    };

    startUpdateTimer();
    return () => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    };
  }, []);

  const handlePreviewClick = () => {
    onFullscreen();
  };

  const getTextSize = () => {
    return isFullscreen ? "22px" : "14px";
  };

  const getLogoSize = () => {
    return isFullscreen ? "100px" : "40px";
  };

  const getLogoMargin = () => {
    return isFullscreen ? "20px" : "10px";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <style jsx>{`
        @keyframes dotColorChange {
          0%, 9% { background-color: #fff; }
          10%, 19% { background-color: #fc3d04; }
          20%, 29% { background-color: #fc3d04; }
          30%, 39% { background-color: #fc3d04; }
          40%, 49% { background-color: #fc3d04; }
          50%, 59% { background-color: #fc3d04; }
          60%, 69% { background-color: #fff; }
          70%, 79% { background-color: #fff; }
          80%, 89% { background-color: #fff; }
          90%, 99% { background-color: #fff; }
          100% { background-color: #fff; }
        }

        .loader {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dot {
          background-color: #fff;
          border-radius: 50%;
          width: 4px;
          height: 4px;
          margin: 0 7px;
          animation: dotColorChange 10s infinite;
        }

        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 1s; }
        .dot:nth-child(3) { animation-delay: 2s; }
        .dot:nth-child(4) { animation-delay: 3s; }
        .dot:nth-child(5) { animation-delay: 4s; }
      `}</style>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Live Preview</h2>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4 transition-colors">
        <div
          ref={previewRef}
          className={`w-full h-64 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer hover:opacity-90 transition-opacity full-screen`}
          style={{
            backgroundColor: "#2c0220",
            color: "#fff",
            fontFamily: '"Segoe UI Variable", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            fontSize: getTextSize(),
            lineHeight: 1.6,
            textAlign: "center",
            fontWeight: 400,
            position: "relative",
            overflow: "hidden"
          }}
          onClick={handlePreviewClick}
        >
          {selectedColor === "ubuntu-22-04" && (
            <div
              className="w-full h-full flex flex-col items-center justify-center"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
              }}
            >
              <img
                src="/22/image/ubuntu-22-04/logo.png"
                alt="Ubuntu Logo"
                style={{
                  height: getLogoSize(),
                  marginBottom: getLogoMargin()
                }}
              />
              <div className="loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {colors.map((color) => (
          <div key={color.value} className="text-center">
            <div
              className={`w-full h-12 rounded-xl border-2 transition-all hover:scale-105 mb-1 cursor-pointer overflow-hidden ${selectedColor === color.value
                ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-400"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              onClick={() => onColorChange(color)}
            >
              <img
                src={color.value === "windows-10" ? "/22/image/fake/windows-10-update-screen.webp" :
                  color.value === "windows-xp" ? "/22/image/fake/windows-xp-update-screen.webp" :
                    color.value === "mac-os-x" ? "/22/image/fake/mac-os-x-update-screen.webp" :
                      color.value === "ubuntu-22-04" ? "/22/image/fake/ubuntu-22-04-update-screen.webp" :
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
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
              {color.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 