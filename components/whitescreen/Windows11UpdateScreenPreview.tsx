"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface Windows11UpdateScreenPreviewProps {
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
  onRestart?: () => void;
  restartTrigger?: number;
  updateDuration?: number;
  startTime?: number;
}

export default function Windows11UpdateScreenPreview({
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
  onRestart,
  restartTrigger,
  updateDuration = 42,
  startTime = 7,
}: Windows11UpdateScreenPreviewProps) {
  const t = useTranslations("Windows11UpdateScreen");
  const previewRef = useRef<HTMLDivElement>(null);
  const [updatePercentage, setUpdatePercentage] = useState(0);
  const [updateInterval, setUpdateInterval] = useState<NodeJS.Timeout | null>(null);

  const startUpdateTimer = () => {
    console.log('Windows11UpdateScreenPreview: startUpdateTimer called with updateDuration=', updateDuration, 'startTime=', startTime);
    // Clear existing interval
    if (updateInterval) {
      clearInterval(updateInterval);
    }

    // Calculate total duration in milliseconds
    const totalDuration = updateDuration * 60 * 1000; // Convert minutes to milliseconds
    const intervalTime = totalDuration / 100; // Time per percentage point

    // Set initial percentage
    setUpdatePercentage(startTime);

    // Start the timer
    const newInterval = setInterval(() => {
      setUpdatePercentage(prev => {
        if (prev >= 100) {
          if (newInterval) {
            clearInterval(newInterval);
          }
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    setUpdateInterval(newInterval);
  };

  const handleRestart = () => {
    console.log('Windows11UpdateScreenPreview: handleRestart called');
    // Clear existing interval
    if (updateInterval) {
      clearInterval(updateInterval);
    }
    // Restart the timer
    startUpdateTimer();
  };

  useEffect(() => {
    startUpdateTimer();

    return () => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    };
  }, [updateDuration, startTime]);

  // 当restartTrigger变化时，重置预览组件的进度
  useEffect(() => {
    console.log('Windows11UpdateScreenPreview: restartTrigger changed to', restartTrigger);
    if (restartTrigger !== undefined && restartTrigger > 0) {
      console.log('Windows11UpdateScreenPreview: calling handleRestart');
      handleRestart();
    }
  }, [restartTrigger]);

  const handlePreviewClick = () => {
    onFullscreen();
  };

  const getTextSize = () => {
    return isFullscreen ? "22px" : "14px";
  };

  const getLogoSize = () => {
    return isFullscreen ? "140px" : "60px";
  };

  const getLogoMargin = () => {
    return isFullscreen ? "100px" : "40px";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Live Preview</h2>

      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4 transition-colors">
        <div
          ref={previewRef}
          className={`w-full h-64 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer hover:opacity-90 transition-opacity full-screen`}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            fontFamily: '"Segoe UI Variable","Segoe UI",Tahoma,Geneva,Verdana,sans-serif',
            fontSize: getTextSize(),
            lineHeight: 1.6,
            textAlign: "center",
            fontWeight: 400,
            position: "relative",
            overflow: "hidden"
          }}
          onClick={handlePreviewClick}
        >
          {selectedColor === "windows-11" && (
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
              <div className="loader mb-4">
                <span className="pip-0"></span>
                <span className="pip-1"></span>
                <span className="pip-2"></span>
                <span className="pip-3"></span>
                <span className="pip-4"></span>
                <span className="pip-5"></span>
              </div>
              <div className="text-center">
                <span>{t("preview.updateText")} </span>
                <span className="font-bold">{updatePercentage}%</span>
                <br />
                <span>{t("preview.dontTurnOffText")}</span>
                <br />
                <span>{t("preview.restartText")}</span>
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

      <style jsx>{`
        .loader {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          animation: rotate 4s linear infinite;
          margin-bottom: 20px;
        }

        .loader span::after {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #fff;
          content: "";
          display: block;
          transform-origin: 20px 20px;
          animation-duration: 4s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .pip-0::after {
          transform: rotate(0deg);
          animation-name: rotate-0;
          animation-delay: 0.9s;
        }

        @keyframes rotate-0 {
          0%, 20% { transform: rotate(0deg); }
          40%, 60% { transform: rotate(180deg); }
          80%, 100% { transform: rotate(360deg); }
        }

        .pip-1::after {
          transform: rotate(20deg);
          animation-name: rotate-1;
          animation-delay: 0.775s;
        }

        @keyframes rotate-1 {
          0%, 20% { transform: rotate(20deg); }
          40%, 60% { transform: rotate(200deg); }
          80%, 100% { transform: rotate(380deg); }
        }

        .pip-2::after {
          transform: rotate(40deg);
          animation-name: rotate-2;
          animation-delay: 0.65s;
        }

        @keyframes rotate-2 {
          0%, 20% { transform: rotate(40deg); }
          40%, 60% { transform: rotate(220deg); }
          80%, 100% { transform: rotate(400deg); }
        }

        .pip-3::after {
          transform: rotate(60deg);
          animation-name: rotate-3;
          animation-delay: 0.525s;
        }

        @keyframes rotate-3 {
          0%, 20% { transform: rotate(60deg); }
          40%, 60% { transform: rotate(240deg); }
          80%, 100% { transform: rotate(420deg); }
        }

        .pip-4::after {
          transform: rotate(80deg);
          animation-name: rotate-4;
          animation-delay: 0.4s;
        }

        @keyframes rotate-4 {
          0%, 20% { transform: rotate(80deg); }
          40%, 60% { transform: rotate(260deg); }
          80%, 100% { transform: rotate(440deg); }
        }

        .pip-5::after {
          transform: rotate(100deg);
          animation-name: rotate-5;
          animation-delay: 0.275s;
        }

        @keyframes rotate-5 {
          0%, 20% { transform: rotate(100deg); }
          40%, 60% { transform: rotate(280deg); }
          80%, 100% { transform: rotate(460deg); }
        }
      `}</style>
    </div>
  );
} 