"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface BlueScreenOfDeathWindows10PreviewProps {
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

export default function BlueScreenOfDeathWindows10Preview({
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
}: BlueScreenOfDeathWindows10PreviewProps) {
  const t = useTranslations("BlueScreenOfDeathWindows10");
  const previewRef = useRef<HTMLDivElement>(null);
  const __fs = useRef(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  const _f = () => {
    if (typeof window === 'undefined') return;

    const element = document.getElementsByClassName("full-screen")[0] as HTMLElement;
    if (!element) return;

    // Check if already in fullscreen
    if (document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement || __fs.current) {
      // Exit fullscreen
      if (document.exitFullscreen) { document.exitFullscreen(); }
      else if ((document as any).mozCancelFullScreen) { (document as any).mozCancelFullScreen(); }
      else if ((document as any).webkitExitFullscreen) { (document as any).webkitExitFullscreen(); }
      else if ((document as any).msExitFullscreen) { (document as any).msExitFullscreen(); }
      else if (__fs.current) {
        // Fallback exit
        element.style.position = "static";
        element.style.left = ""; element.style.top = ""; element.style.zIndex = "";
        element.style.width = ""; element.style.height = "";
        __fs.current = false; document.body.style.overflow = "auto";
      }
    } else {
      // Enter fullscreen
      if (element.requestFullscreen) { element.requestFullscreen(); }
      else if ((element as any).mozRequestFullScreen) { (element as any).mozRequestFullScreen(); }
      else if ((element as any).webkitRequestFullscreen) { (element as any).webkitRequestFullscreen(); }
      else if ((element as any).msRequestFullscreen) { (element as any).msRequestFullscreen(); }
      else {
        // Fallback fullscreen
        element.style.position = "fixed";
        element.style.left = "0"; element.style.top = "0";
        element.style.width = "100vw"; element.style.height = "100vh";
        element.style.zIndex = "9999";
        __fs.current = true; document.body.style.overflow = "hidden";
      }
    }
  };

  const handlePreviewClick = () => {
    _f();
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (previewRef.current) {
        const isInFullscreen = !!(document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement || __fs.current);
        if (isInFullscreen !== isFullscreen) {
          onFullscreen();
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [isFullscreen, onFullscreen]);

  // CSS Variables for death screen text size - 完全按照原始版本，包括响应式
  const getTextSize = () => {
    if (!isFullscreen) return "9px";
    if (screenWidth <= 512) return "16px";
    return "24px"; // 原始版本使用的是24px，不是32px
  };

  const getSmileSize = () => {
    if (!isFullscreen) return "36px";
    if (screenWidth <= 512) return "64px";
    return "96px"; // 24px * 4 = 96px
  };

  const getSmallTextSize = () => {
    if (!isFullscreen) return "4px";
    if (screenWidth <= 512) return "6px";
    return "10px"; // 24px * 0.4 = 9.6px，约等于10px
  };

  const getQrCodeSize = () => {
    if (!isFullscreen) {
      // 非全屏模式：使用固定大小
      return "50px";
    }

    // 全屏模式：使用响应式大小
    if (screenWidth <= 512) {
      return "60px";
    } else if (screenWidth <= 768) {
      return "80px";
    } else {
      return "105px";
    }
  };

  const getPadding = () => {
    if (!isFullscreen) return { left: "10%", right: "10%" };
    if (screenWidth <= 512) return { left: "10%", right: "10%" };
    return { left: "15%", right: "15%" };
  };

  const getLineHeight = () => {
    if (!isFullscreen) return "1.2";
    if (screenWidth <= 512) return "1.3";
    return "1.4";
  };

  const deathScreenTextSize = getTextSize();
  const deathScreenSmileSize = getSmileSize();
  const deathScreenSmallTextSize = getSmallTextSize();
  const qrCodeSize = getQrCodeSize();
  const padding = getPadding();
  const lineHeight = getLineHeight();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Live Preview</h2>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4 transition-colors">
        <div
          ref={previewRef}
          className={`w-full h-64 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer hover:opacity-90 transition-opacity full-screen ${isFullscreen ? "full-screen" : ""}`}
          style={{
            backgroundColor: "#0078d7",
            color: "#fff",
            textAlign: "start",
            fontSize: deathScreenTextSize,
            fontWeight: 300,
            lineHeight: lineHeight,
            boxSizing: "border-box",
            paddingLeft: padding.left,
            paddingRight: padding.right,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontFamily: "'Segoe UI Light', sans-serif",
            userSelect: "none"
          }}
          onClick={handlePreviewClick}
        >
          {selectedColor === "death-screen-10" && (
            <div className="w-full h-full flex flex-col justify-center text-white" style={{
              fontFamily: "'Segoe UI Light', sans-serif",
              textAlign: "start"
            }}>
              <span className="block mb-2" style={{ fontSize: deathScreenSmileSize, fontWeight: "bold" }}>:(</span>
              <span className="block mb-2" style={{ fontSize: deathScreenTextSize }}>
                Your PC ran into a problem and needs to restart. We&apos;re<br />
                just collecting some error info, and then we&apos;ll restart for<br />
                you.<br /><br />
                <span id="update-percentage">0</span>% complete<br /><br />
              </span>
              <div className="flex items-start" style={{ justifyContent: "start" }}>
                <img
                  src="/image/prank/death-10-qr-code.png"
                  alt="QR Code"
                  className="mr-2"
                  style={{
                    width: qrCodeSize,
                    height: qrCodeSize,
                    marginTop: isFullscreen ? "2px" : "0px"
                  }}
                />
                <span className="block" style={{ fontSize: deathScreenSmallTextSize, paddingLeft: "15px" }}>
                  For more information about this issue and possible fixes, visit https://www.windows.com/stopcode<br /><br /><br />
                  if you call a support person, give them this info:<br /><br />
                  Stop code: CRITICAL_PROCESS_DIED<br />
                </span>
              </div>
            </div>
          )}
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
                    color.value === "hacker-screen" ? "black" :
                      color.value === "death-screen-xp" ? "#0078d7" :
                        color.value === "death-screen-10" ? "#0078d7" : color.value,
                backgroundImage: color.value === "broken-screen" ? "url('/image/prank/small/broken.webp')" :
                  color.value === "radar-screen" ? "url('/image/prank/small/radar.webp')" :
                    color.value === "hacker-screen" ? "url('/image/prank/small/hacker-typer.webp')" :
                      color.value === "death-screen-xp" ? "url('/fake/death.webp')" :
                        color.value === "death-screen-10" ? "url('/fake/death-10.webp')" : "none",
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