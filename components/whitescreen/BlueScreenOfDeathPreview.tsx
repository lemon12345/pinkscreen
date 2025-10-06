"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

interface BlueScreenOfDeathPreviewProps {
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

export default function BlueScreenOfDeathPreview({
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
}: BlueScreenOfDeathPreviewProps) {
  const t = useTranslations("BlueScreenOfDeath");
  const previewRef = useRef<HTMLDivElement>(null);
  const __fs = useRef(false);

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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {t("preview.title")}
        </h2>
      </div>

      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4 transition-colors">
        <div
          ref={previewRef}
          className={`w-full h-48 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer hover:opacity-90 transition-opacity full-screen ${isFullscreen ? "full-screen" : ""}`}
          style={{
            backgroundColor: "#004091",
            color: "#ffffff",
            textAlign: "start",
            fontSize: isFullscreen ? "22px" : "7px",
            fontWeight: 400,
            lineHeight: isFullscreen ? "1.4" : "1.2",
            boxSizing: "border-box",
            paddingTop: isFullscreen ? "10%" : "7%",
            paddingLeft: isFullscreen ? "10%" : "7%",
            paddingRight: isFullscreen ? "10%" : "7%",
            fontFamily: "'Lucida Console', 'Courier New', monospace",
            userSelect: "none",
          }}
          onClick={handlePreviewClick}
        >
          <div className="whitespace-pre-wrap select-none">
            A problem has been detected and windows has been shut down to prevent damage to your computer.<br /><br />
            The problem seems to be caused by the following file: SPCMDCON.SYS PAGE_FAULT_IN_NONPAGED_AREA<br /><br />
            If this is the first time you&apos;ve seen this stop error screen, restart your computer. If this screen appears again, follow these steps:<br /><br />
            Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any windows updates you might need.<br /><br />
            If problems continue, disable or remove any newly installed hardware or software. Disable BIOS memory options such as caching or shadowing. If you need to use Safe Mode to remove or disable components, restart your computer, press F8 to select Advanced startup options, and then select Safe Mode.<br /><br />
            Technical information:<br /><br />
            *** STOP: 0x00000050 (OXFD3094C2, 0x00000001, 0xFBFE7617, 0x00000000)<br /><br />
            *** SPCMDCON. SYS - Address FBFE7617 base at FBFE5000, Datestamp 3d6dd67c
          </div>
        </div>
      </div>

      <style jsx>{`
        @media screen and (max-width: 1024px) {
          .full-screen {
            font-size: 5px;
            line-height: 1.1;
          }
          
          .full-screen:fullscreen {
            padding-top: 15%;
            padding-left: 15%;
            padding-right: 15%;
            font-size: 15px;
            line-height: 1.4;
          }
        }
        
        @media screen and (max-width: 512px) {
          .full-screen:fullscreen {
            padding-top: 10%;
            padding-left: 10%;
            padding-right: 10%;
            font-size: 13px;
            line-height: 1.3;
          }
        }
      `}</style>

      <div className="flex items-center justify-center space-x-4 mb-4">
        {colors.map((color) => (
          <div key={color.value} className="text-center">
            <div
              className={`w-16 h-16 rounded-lg border-2 transition-all hover:scale-105 mb-2 cursor-pointer overflow-hidden ${selectedColor === color.value
                ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-400"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              style={{
                backgroundImage: color.value === "broken-screen" ? "url('/image/prank/small/broken.webp')" :
                  color.value === "radar-screen" ? "url('/image/prank/small/radar.webp')" :
                    color.value === "hacker-screen" ? "url('/image/prank/small/hacker-typer.webp')" :
                      color.value === "death-screen-xp" ? "url('/fake/death.webp')" :
                        color.value === "death-screen-10" ? "url('/fake/death-10.webp')" : "none",
                backgroundColor: color.value === "death-screen-10" ? "#0078d7" : "#000000",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
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