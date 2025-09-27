"use client";
import { useEffect, useState } from "react";
import RedScreenHero from "./RedScreenHero";
import RedScreenInfo from "./RedScreenInfo";
import RedScreenUseCases from "./RedScreenUseCases";
import RedScreenFAQ from "./RedScreenFAQ";
import WhiteScreenHowToUse from "./WhiteScreenHowToUse";

export default function RedScreenClient() {
  const [selectedColor, setSelectedColor] = useState("#FF0000");
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleCustomColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  const handleFullscreen = async () => {
    if (!isFullscreen) {
      // 首先进入浏览器全屏模式
      try {
        await document.documentElement.requestFullscreen();
      } catch (err) {
        console.log("Fullscreen not supported");
      }

      // 创建一个全屏预览元素
      const fullscreenElement = document.createElement("div");
      fullscreenElement.id = "redscreen-fullscreen";
      fullscreenElement.style.position = "fixed";
      fullscreenElement.style.top = "0";
      fullscreenElement.style.left = "0";
      fullscreenElement.style.width = "100vw";
      fullscreenElement.style.height = "100vh";
      fullscreenElement.style.backgroundColor = selectedColor;
      fullscreenElement.style.zIndex = "9999";
      fullscreenElement.style.cursor = "pointer";
      fullscreenElement.style.margin = "0";
      fullscreenElement.style.padding = "0";
      fullscreenElement.style.userSelect = "none";

      fullscreenElement.onclick = () => {
        // 退出浏览器全屏
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }

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
      ctx.fillStyle = selectedColor;
      ctx.fillRect(0, 0, width, height);

      const link = document.createElement("a");
      link.download = `red-page-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleDownload4K = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 3840;
    canvas.height = 2160;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.fillStyle = selectedColor;
      ctx.fillRect(0, 0, 3840, 2160);

      const link = document.createElement("a");
      link.download = `red-page-4k-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isInFullscreen = !!(document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement);
      setIsFullscreen(isInFullscreen);

      // 如果没有全屏元素，清理创建的全屏元素
      if (!isInFullscreen) {
        const fullscreenElement = document.getElementById("redscreen-fullscreen");
        if (fullscreenElement) {
          document.body.removeChild(fullscreenElement);
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <RedScreenHero
        selectedColor={selectedColor}
        onColorChange={handleColorChange}
        onCustomColorChange={handleCustomColorChange}
        onFullscreen={handleFullscreen}
        onDownload={handleDownload}
      />

      <RedScreenInfo
        selectedColor={selectedColor}
        onDownload={handleDownload}
        onDownload4K={handleDownload4K}
      />
      <RedScreenUseCases />
      <WhiteScreenHowToUse />
      <RedScreenFAQ />
    </div>
  );
} 