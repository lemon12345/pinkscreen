"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import BrokenScreenFAQ from "./BrokenScreenFAQ";
import BrokenScreenHero from "./BrokenScreenHero";
import BrokenScreenHowToUse from "./BrokenScreenHowToUse";
import BrokenScreenUseCases from "./BrokenScreenUseCases";
import ColorScreensSection from "./ColorScreensSection";
import WhiteScreenTechSpecs from "./WhiteScreenTechSpecs";

export default function BrokenScreenClient() {
  const t = useTranslations("BrokenScreen");
  const [selectedColor, setSelectedColor] = useState("broken-screen");
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState("Custom");

  const colors = [
    { name: "Broken Screen", value: "broken-screen", className: "bg-gray-500" },
    { name: "Radar Screen", value: "radar-screen", className: "bg-green-500" },
    { name: "Death Screen XP", value: "death-screen-xp", className: "bg-blue-600" },
    { name: "Hacker Typer", value: "hacker-typer", className: "bg-green-600" },
    { name: "Death Screen 10", value: "death-screen-10", className: "bg-blue-500" },
  ];

  const resolutions = [
    { name: "Custom", width: 1920, height: 1080 },
    { name: "4K", width: 3840, height: 2160 },
    { name: "2K", width: 2560, height: 1440 },
    { name: "Full HD", width: 1920, height: 1080 },
    { name: "HD", width: 1280, height: 720 },
    { name: "Mobile", width: 375, height: 667 },
  ];

  const handleFullscreen = async () => {
    try {
      // 创建全屏元素
      const fullscreenElement = document.createElement("div");
      fullscreenElement.style.position = "fixed";
      fullscreenElement.style.top = "0";
      fullscreenElement.style.left = "0";
      fullscreenElement.style.width = "100vw";
      fullscreenElement.style.height = "100vh";
      fullscreenElement.style.zIndex = "9999";
      fullscreenElement.style.cursor = "pointer";
      fullscreenElement.className = "full-screen";

      // 根据选择的颜色设置背景
      fullscreenElement.style.backgroundImage = selectedColor === "broken-screen"
        ? "url('/image/prank/broken.webp')"
        : selectedColor === "radar-screen"
          ? "url('/image/prank/small/radar.webp')"
          : selectedColor === "death-screen-xp"
            ? "url('/fake/death.webp')"
            : selectedColor === "hacker-typer"
              ? "url('/image/prank/small/hacker-typer.webp')"
              : selectedColor === "death-screen-10"
                ? "url('/fake/death-10.webp')"
                : "none";

      fullscreenElement.style.backgroundColor = selectedColor === "broken-screen" ? "gray" :
        selectedColor === "radar-screen" ? "black" :
          selectedColor === "death-screen-xp" ? "#0078d7" :
            selectedColor === "hacker-typer" ? "black" :
              selectedColor === "death-screen-10" ? "#0078d7" : selectedColor;

      fullscreenElement.style.backgroundSize = "cover";
      fullscreenElement.style.backgroundPosition = "center";
      fullscreenElement.style.backgroundRepeat = "no-repeat";

      // 点击退出全屏
      fullscreenElement.onclick = () => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        document.body.removeChild(fullscreenElement);
        setIsFullscreen(false);
      };

      // 添加到页面
      document.body.appendChild(fullscreenElement);

      // 请求浏览器全屏
      await fullscreenElement.requestFullscreen();
      setIsFullscreen(true);

      // 监听全屏状态变化
      const handleFullscreenChange = () => {
        if (!document.fullscreenElement) {
          if (document.body.contains(fullscreenElement)) {
            document.body.removeChild(fullscreenElement);
          }
          setIsFullscreen(false);
        }
      };

      document.addEventListener("fullscreenchange", handleFullscreenChange);

      // 清理函数
      return () => {
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
      };
    } catch (error) {
      console.error("全屏请求失败:", error);
      // 如果全屏失败，回退到覆盖层模式
      const fullscreenElement = document.createElement("div");
      fullscreenElement.style.position = "fixed";
      fullscreenElement.style.top = "0";
      fullscreenElement.style.left = "0";
      fullscreenElement.style.width = "100vw";
      fullscreenElement.style.height = "100vh";
      fullscreenElement.style.zIndex = "9999";
      fullscreenElement.style.cursor = "pointer";
      fullscreenElement.className = "full-screen";

      fullscreenElement.style.backgroundImage = selectedColor === "broken-screen"
        ? "url('/image/prank/broken.webp')"
        : selectedColor === "radar-screen"
          ? "url('/image/prank/small/radar.webp')"
          : selectedColor === "death-screen-xp"
            ? "url('/fake/death.webp')"
            : selectedColor === "hacker-typer"
              ? "url('/image/prank/small/hacker-typer.webp')"
              : selectedColor === "death-screen-10"
                ? "url('/fake/death-10.webp')"
                : "none";

      fullscreenElement.style.backgroundColor = selectedColor === "broken-screen" ? "gray" :
        selectedColor === "radar-screen" ? "black" :
          selectedColor === "death-screen-xp" ? "#0078d7" :
            selectedColor === "hacker-typer" ? "black" :
              selectedColor === "death-screen-10" ? "#0078d7" : selectedColor;

      fullscreenElement.style.backgroundSize = "cover";
      fullscreenElement.style.backgroundPosition = "center";
      fullscreenElement.style.backgroundRepeat = "no-repeat";

      fullscreenElement.onclick = () => {
        document.body.removeChild(fullscreenElement);
        setIsFullscreen(false);
      };

      document.body.appendChild(fullscreenElement);
      setIsFullscreen(true);
    }
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // For broken screen, create a cracked effect
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Add some crack lines
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width * 0.3, height * 0.2);
      ctx.lineTo(width * 0.7, height * 0.8);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width * 0.2, height * 0.6);
      ctx.lineTo(width * 0.8, height * 0.4);
      ctx.stroke();

      const link = document.createElement("a");
      link.download = `broken-screen-${width}x${height}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const swapDimensions = () => {
    setWidth(height);
    setHeight(width);
  };

  const handleResolutionChange = (resolution: any) => {
    setSelectedResolution(resolution.name);
    setWidth(resolution.width);
    setHeight(resolution.height);
  };

  const handleColorChange = (color: any) => {
    setSelectedColor(color.value);
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
      <BrokenScreenHero
        selectedColor={selectedColor}
        onColorChange={handleColorChange}
        onFullscreen={handleFullscreen}
        onCustomColorChange={handleCustomColorChange}
        width={width}
        height={height}
        selectedResolution={selectedResolution}
        resolutions={resolutions}
        onWidthChange={setWidth}
        onHeightChange={setHeight}
        onResolutionChange={handleResolutionChange}
        onSwapDimensions={swapDimensions}
        isFullscreen={isFullscreen}
      />

      {/* Color Screens Section */}
      <ColorScreensSection />

      {/* Original Content */}
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="max-w-6xl mx-auto px-4 py-6">
          {/* Main Content */}
          <BrokenScreenUseCases />
          <BrokenScreenHowToUse />
          <BrokenScreenFAQ />
        </main>
      </div>
    </div>
  );
} 