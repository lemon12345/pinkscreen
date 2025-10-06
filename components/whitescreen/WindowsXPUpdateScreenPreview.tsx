"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface WindowsXPUpdateScreenPreviewProps {
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

export default function WindowsXPUpdateScreenPreview({
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
}: WindowsXPUpdateScreenPreviewProps) {
  const t = useTranslations("WindowsXPUpdateScreen");

  // 调试翻译
  console.log('WindowsXPUpdateScreenPreview: updateText =', t("preview.updateText"));
  console.log('WindowsXPUpdateScreenPreview: dontTurnOffText =', t("preview.dontTurnOffText"));
  const [updatePercentage, setUpdatePercentage] = useState(startTime);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startUpdateTimer = () => {
    // Clear existing interval
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
    }

    // Calculate total duration in milliseconds
    const totalDuration = updateDuration * 60 * 1000; // Convert minutes to milliseconds
    const intervalTime = totalDuration / 100; // Time per percentage point

    // Set initial percentage
    setUpdatePercentage(startTime);

    // Start the timer
    updateIntervalRef.current = setInterval(() => {
      setUpdatePercentage(prev => {
        if (prev >= 100) {
          if (updateIntervalRef.current) {
            clearInterval(updateIntervalRef.current);
          }
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);
  };

  const handleRestart = () => {
    console.log('WindowsXPUpdateScreenPreview: handleRestart called');
    // Clear existing interval
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
    }
    // Restart the timer
    startUpdateTimer();
  };

  // 监听 restartTrigger 变化
  useEffect(() => {
    if (restartTrigger !== undefined && restartTrigger > 0) {
      console.log('WindowsXPUpdateScreenPreview: restartTrigger changed to', restartTrigger);
      handleRestart();
    }
  }, [restartTrigger]);

  // 监听 updateDuration 和 startTime 变化
  useEffect(() => {
    console.log('WindowsXPUpdateScreenPreview: startUpdateTimer called with updateDuration:', updateDuration, 'startTime:', startTime);
    startUpdateTimer();

    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [updateDuration, startTime]);

  const handlePreviewClick = () => {
    onFullscreen();
  };

  const getTextSize = () => {
    if (width >= 1920) return "text-2xl";
    if (width >= 1280) return "text-xl";
    return "text-lg";
  };

  const getLogoSize = () => {
    if (width >= 1920) return "h-16";
    if (width >= 1280) return "h-12";
    return "h-10";
  };

  const getLogoMargin = () => {
    if (width >= 1920) return "mb-6";
    if (width >= 1280) return "mb-4";
    return "mb-3";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-2 border-gray-300 dark:border-gray-600 p-6 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("preview.title")}
        </h2>
      </div>

      <div className="relative">
        <div
          className="full-screen rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg"
          style={{
            width: '100%',
            height: '400px',
            maxWidth: '100%',
            maxHeight: '400px',
            margin: '0 auto',
          }}
          onClick={handlePreviewClick}
        >
          {/* Windows XP Update Screen */}
          <div
            className="w-full h-full windows-xp"
            style={{
              fontSize: isFullscreen ? '22px' : '14px',
            }}
          >
            <div className="window-xp-main-section">
              <img
                className="update-windows-xp-logo"
                src="/22/image/windows-xp/logo.png"
                style={{
                  height: isFullscreen ? '140px' : '40px',
                  marginBottom: isFullscreen ? '40px' : '10px',
                }}
              />
              <span className="window-xp-main-text">
                <span>{t("preview.updateText")} </span>
                <span id="update-percentage">{updatePercentage}</span>
                %<br />
                <span>{t("preview.dontTurnOffText")}</span>
              </span>
            </div>
            <span className="windows-xp-bottom-text"></span>
          </div>
        </div>


      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
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
        .windows-xp {
          font-family: "Tahoma, Arial";
          font-size: 14px;
          line-height: 1.6;
          background-color: #5a7edc;
          background-image: url(/22/image/windows-xp/update-background.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          color: #fff;
          text-align: end;
          font-weight: 400
        }

        .windows-xp:fullscreen {
          font-size: 22px
        }

        @media screen and (max-width: 1024px) {
          .windows-xp {
            font-size: 12px;
            line-height: 1.4
          }

          .windows-xp:fullscreen {
            font-size: 18px
          }
        }

        .window-xp-main-section {
          position: absolute;
          top: 50%;
          left: 60%;
          transform: translate(-60%,-50%);
          display: flex;
          align-items: end;
          justify-content: center;
          flex-direction: column
        }

        .window-xp-main-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis
        }

        .windows-xp-bottom-text {
          position: absolute;
          bottom: max(15px,10%);
          left: 50%;
          transform: translate(-50%,0);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis
        }

        .update-windows-xp-logo {
          height: 40px;
          margin-bottom: 10px
        }

        .windows-xp:fullscreen .update-windows-xp-logo {
          height: 140px;
          margin-bottom: 40px
        }

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

        .pip-6::after {
          transform: rotate(120deg);
          animation-name: rotate-6;
          animation-delay: 0.15s;
        }

        @keyframes rotate-6 {
          0%, 20% { transform: rotate(120deg); }
          40%, 60% { transform: rotate(300deg); }
          80%, 100% { transform: rotate(480deg); }
        }

        .pip-7::after {
          transform: rotate(140deg);
          animation-name: rotate-7;
          animation-delay: 0.025s;
        }

        @keyframes rotate-7 {
          0%, 20% { transform: rotate(140deg); }
          40%, 60% { transform: rotate(320deg); }
          80%, 100% { transform: rotate(500deg); }
        }

        .pip-8::after {
          transform: rotate(160deg);
          animation-name: rotate-8;
          animation-delay: -0.1s;
        }

        @keyframes rotate-8 {
          0%, 20% { transform: rotate(160deg); }
          40%, 60% { transform: rotate(340deg); }
          80%, 100% { transform: rotate(520deg); }
        }

        .pip-9::after {
          transform: rotate(180deg);
          animation-name: rotate-9;
          animation-delay: -0.225s;
        }

        @keyframes rotate-9 {
          0%, 20% { transform: rotate(180deg); }
          40%, 60% { transform: rotate(360deg); }
          80%, 100% { transform: rotate(540deg); }
        }

        .pip-10::after {
          transform: rotate(200deg);
          animation-name: rotate-10;
          animation-delay: -0.35s;
        }

        @keyframes rotate-10 {
          0%, 20% { transform: rotate(200deg); }
          40%, 60% { transform: rotate(380deg); }
          80%, 100% { transform: rotate(560deg); }
        }

        .pip-11::after {
          transform: rotate(220deg);
          animation-name: rotate-11;
          animation-delay: -0.475s;
        }

        @keyframes rotate-11 {
          0%, 20% { transform: rotate(220deg); }
          40%, 60% { transform: rotate(400deg); }
          80%, 100% { transform: rotate(580deg); }
        }

        .pip-12::after {
          transform: rotate(240deg);
          animation-name: rotate-12;
          animation-delay: -0.6s;
        }

        @keyframes rotate-12 {
          0%, 20% { transform: rotate(240deg); }
          40%, 60% { transform: rotate(420deg); }
          80%, 100% { transform: rotate(600deg); }
        }

        .pip-13::after {
          transform: rotate(260deg);
          animation-name: rotate-13;
          animation-delay: -0.725s;
        }

        @keyframes rotate-13 {
          0%, 20% { transform: rotate(260deg); }
          40%, 60% { transform: rotate(440deg); }
          80%, 100% { transform: rotate(620deg); }
        }

        .pip-14::after {
          transform: rotate(280deg);
          animation-name: rotate-14;
          animation-delay: -0.85s;
        }

        @keyframes rotate-14 {
          0%, 20% { transform: rotate(280deg); }
          40%, 60% { transform: rotate(460deg); }
          80%, 100% { transform: rotate(640deg); }
        }

        .pip-15::after {
          transform: rotate(300deg);
          animation-name: rotate-15;
          animation-delay: -0.975s;
        }

        @keyframes rotate-15 {
          0%, 20% { transform: rotate(300deg); }
          40%, 60% { transform: rotate(480deg); }
          80%, 100% { transform: rotate(660deg); }
        }

        .pip-16::after {
          transform: rotate(320deg);
          animation-name: rotate-16;
          animation-delay: -1.1s;
        }

        @keyframes rotate-16 {
          0%, 20% { transform: rotate(320deg); }
          40%, 60% { transform: rotate(500deg); }
          80%, 100% { transform: rotate(680deg); }
        }

        .pip-17::after {
          transform: rotate(340deg);
          animation-name: rotate-17;
          animation-delay: -1.225s;
        }

        @keyframes rotate-17 {
          0%, 20% { transform: rotate(340deg); }
          40%, 60% { transform: rotate(520deg); }
          80%, 100% { transform: rotate(700deg); }
        }

        .pip-18::after {
          transform: rotate(360deg);
          animation-name: rotate-18;
          animation-delay: -1.35s;
        }

        @keyframes rotate-18 {
          0%, 20% { transform: rotate(360deg); }
          40%, 60% { transform: rotate(540deg); }
          80%, 100% { transform: rotate(720deg); }
        }

        .pip-19::after {
          transform: rotate(380deg);
          animation-name: rotate-19;
          animation-delay: -1.475s;
        }

        @keyframes rotate-19 {
          0%, 20% { transform: rotate(380deg); }
          40%, 60% { transform: rotate(560deg); }
          80%, 100% { transform: rotate(740deg); }
        }
      `}</style>
    </div>
  );
} 