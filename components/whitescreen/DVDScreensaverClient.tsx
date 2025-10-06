"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import DVDScreensaverFAQ from "./DVDScreensaverFAQ";
import DVDScreensaverHero from "./DVDScreensaverHero";
import DVDScreensaverHowToUse from "./DVDScreensaverHowToUse";
import DVDScreensaverUseCases from "./DVDScreensaverUseCases";
import WhiteScreenTechSpecs from "./WhiteScreenTechSpecs";

export default function DVDScreensaverClient() {
  const t = useTranslations("DVDScreensaver");
  const [selectedColor, setSelectedColor] = useState("dvd");
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [selectedResolution, setSelectedResolution] = useState("Custom");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dvdSpeed, setDvdSpeed] = useState(1);
  const [dvdSize, setDvdSize] = useState(30);

  const colors = [
    { name: "DVD", value: "dvd", className: "dvd", href: "/dvd-screensaver" },
    { name: "Flip Clock", value: "flip-clock", className: "flip-clock", href: "/flip-clock-screensaver" },
    { name: "Quotes", value: "quotes", className: "quotes", href: "/motivational-quote-screensaver" },
    { name: "No Signal", value: "no-signal", className: "no-signal", href: "/no-signal-smpte-color-bars-screensaver" },
    { name: "Matrix", value: "matrix", className: "matrix", href: "/matrix-screensaver" },
  ];

  const resolutions = [
    { name: "Custom", width: 1920, height: 1080 },
    { name: "4K", width: 3840, height: 2160 },
    { name: "2K", width: 2560, height: 1440 },
    { name: "Full HD", width: 1920, height: 1080 },
    { name: "HD", width: 1280, height: 720 },
    { name: "Mobile", width: 375, height: 667 },
  ];

  const handleFullscreen = () => {
    const element = document.querySelector('.full-screen') as HTMLElement;
    if (!element) return;

    // Check if already in fullscreen
    if (document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement) {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      setIsFullscreen(false);
    } else {
      // Enter fullscreen
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        (element as any).mozRequestFullScreen();
      } else if ((element as any).webkitRequestFullscreen) {
        (element as any).webkitRequestFullscreen();
      } else if ((element as any).msRequestFullscreen) {
        (element as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    }
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // For DVD screensaver, create a black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const link = document.createElement("a");
      link.download = `dvd-screensaver-${width}x${height}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleRestart = () => {
    // DVD screensaver doesn't need restart functionality
    console.log('DVD Screensaver: Restart called');
  };

  const swapDimensions = () => {
    const temp = width;
    setWidth(height);
    setHeight(temp);
  };

  const handleResolutionChange = (resolution: any) => {
    setSelectedResolution(resolution.name);
    setWidth(resolution.width);
    setHeight(resolution.height);
  };

  const handleColorChange = (color: any) => {
    // 只处理当前页面的颜色切换
    if (color.value === "dvd") {
      setSelectedColor(color.value);
    }
    // 其他页面的跳转通过I18nLink处理，不在这里处理
  };

  const handleCustomColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <DVDScreensaverHero
        selectedColor={selectedColor}
        onColorChange={handleColorChange}
        onFullscreen={handleFullscreen}
        onCustomColorChange={handleCustomColorChange}
        isFullscreen={isFullscreen}
        dvdSpeed={dvdSpeed}
        dvdSize={dvdSize}
        onDvdSpeedChange={setDvdSpeed}
        onDvdSizeChange={setDvdSize}
      />

      {/* Original Content */}
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="max-w-6xl mx-auto px-4 py-6">
        <DVDScreensaverHowToUse />
          <DVDScreensaverFAQ />
          <DVDScreensaverUseCases />
        </main>
      </div>
    </div>
  );
} 