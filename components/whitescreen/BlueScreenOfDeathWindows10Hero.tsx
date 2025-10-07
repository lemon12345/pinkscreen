"use client";
import { Link as I18nLink } from "@/i18n/routing";
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { AlertTriangle, CheckCircle, Monitor, Play, RotateCcw, Settings, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import ColorScreensSection from "./ColorScreensSection";

interface BlueScreenOfDeathWindows10HeroProps {
  selectedColor?: string;
  onColorChange?: (color: any) => void;
  onFullscreen?: () => void;
  onCustomColorChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFullscreen?: boolean;
}

// Windows 10蓝屏主题背景颜色 - 更接近真实BSOD色调
const COLORS_BACKGROUND = ["#0066cc", "#004d99", "#003d7a", "#002952"];

export default function BlueScreenOfDeathWindows10Hero({
  selectedColor = "death-screen-10",
  onColorChange,
  onFullscreen,
  onCustomColorChange,
  isFullscreen = false,
}: BlueScreenOfDeathWindows10HeroProps) {
  const t = useTranslations("BlueScreenOfDeathWindows10");
  const previewRef = useRef<HTMLDivElement>(null);
  const __fs = useRef(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [updateDuration, setUpdateDuration] = useState(42);
  const [startTime, setStartTime] = useState(7);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && (document.fullscreenElement || __fs.current)) {
        if (document.exitFullscreen) { document.exitFullscreen(); }
        else if ((document as any).mozCancelFullScreen) { (document as any).mozCancelFullScreen(); }
        else if ((document as any).webkitExitFullscreen) { (document as any).webkitExitFullscreen(); }
        else if ((document as any).msExitFullscreen) { (document as any).msExitFullscreen(); }
        else if (__fs.current && previewRef.current) {
          const element = previewRef.current;
          element.style.position = "static";
          element.style.left = ""; element.style.top = ""; element.style.zIndex = "";
          element.style.width = ""; element.style.height = "";
          element.style.fontSize = ""; element.style.lineHeight = ""; element.style.padding = "";
          __fs.current = false; document.body.style.overflow = "auto";
        }
        onFullscreen?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onFullscreen]);

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

  const startUpdateTimer = () => {
    // Clear existing interval
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
      updateIntervalRef.current = null;
    }

    // Set initial progress
    const updatePercentageElement = document.querySelector("#update-percentage");
    if (updatePercentageElement) {
      updatePercentageElement.textContent = startTime.toString();
    }

    // Calculate interval time
    const totalTime = updateDuration * 60 * 1000; // Convert to milliseconds
    const intervalTime = totalTime / 100;

    // Start new interval
    updateIntervalRef.current = setInterval(() => {
      const currentElement = document.querySelector("#update-percentage");
      if (currentElement) {
        const currentProgress = parseInt(currentElement.textContent || "0") + 1;
        if (currentProgress > 100) {
          if (updateIntervalRef.current) {
            clearInterval(updateIntervalRef.current);
            updateIntervalRef.current = null;
          }
        } else {
          currentElement.textContent = currentProgress.toString();
        }
      }
    }, intervalTime);
  };

  const handleRestart = () => {
    startUpdateTimer();
  };

  useEffect(() => {
    // Start timer on component mount
    startUpdateTimer();

    // Cleanup on unmount
    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [updateDuration, startTime]);

  const _f = () => {
    if (typeof window === 'undefined') return;

    const element = previewRef.current;
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
        element.style.fontSize = ""; element.style.lineHeight = ""; element.style.padding = "";
        __fs.current = false; document.body.style.overflow = "auto";
      }
      onFullscreen?.(); // 通知父组件状态改变
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
        element.style.fontSize = "16px"; // 全屏时使用更大的字体
        element.style.lineHeight = "1.2";
        element.style.padding = "20px";
        __fs.current = true; document.body.style.overflow = "hidden";
      }
      onFullscreen?.(); // 通知父组件状态改变
    }
  };

  const handlePreviewClick = () => {
    _f();
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (previewRef.current) {
        const isInFullscreen = !!(document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement || __fs.current);
        // 如果状态不一致，通知父组件
        if (isInFullscreen !== isFullscreen) {
          onFullscreen?.();
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

  // CSS Variables for death screen text size - 优化全屏模式下的字体大小
  const getTextSize = () => {
    if (!isFullscreen) return "9px";
    if (screenWidth <= 512) return "22px";
    if (screenWidth <= 768) return "28px";
    if (screenWidth <= 1024) return "34px";
    if (screenWidth <= 1440) return "40px";
    return "46px"; // 大屏幕全屏模式下使用更大的字体
  };

  const getSmileSize = () => {
    if (!isFullscreen) return "36px";
    if (screenWidth <= 512) return "90px";
    if (screenWidth <= 768) return "120px";
    if (screenWidth <= 1024) return "150px";
    if (screenWidth <= 1440) return "180px";
    return "210px"; // 大屏幕全屏模式下使用更大的表情符号
  };

  const getSmallTextSize = () => {
    if (!isFullscreen) return "4px";
    if (screenWidth <= 512) return "10px";
    if (screenWidth <= 768) return "14px";
    if (screenWidth <= 1024) return "18px";
    if (screenWidth <= 1440) return "22px";
    return "26px"; // 大屏幕全屏模式下使用更大的小字体
  };

  const getQrCodeSize = () => {
    if (!isFullscreen) {
      // 非全屏模式：使用固定大小
      return "50px";
    }

    // 全屏模式：使用响应式大小
    if (screenWidth <= 512) {
      return "90px";
    } else if (screenWidth <= 768) {
      return "130px";
    } else if (screenWidth <= 1024) {
      return "170px";
    } else if (screenWidth <= 1440) {
      return "210px";
    } else {
      return "250px"; // 大屏幕全屏模式下使用更大的QR码
    }
  };

  const getPadding = () => {
    if (!isFullscreen) return { top: "0%", left: "10%", right: "10%", bottom: "0%" };
    if (screenWidth <= 512) return { top: "3%", left: "6%", right: "6%", bottom: "3%" };
    if (screenWidth <= 768) return { top: "4%", left: "10%", right: "10%", bottom: "4%" };
    if (screenWidth <= 1024) return { top: "5%", left: "14%", right: "14%", bottom: "5%" };
    if (screenWidth <= 1440) return { top: "6%", left: "18%", right: "18%", bottom: "6%" };
    return { top: "8%", left: "22%", right: "22%", bottom: "8%" }; // 大屏幕全屏模式下使用更大的内边距
  };

  const getLineHeight = () => {
    if (!isFullscreen) return "1.2";
    if (screenWidth <= 512) return "1.3";
    if (screenWidth <= 768) return "1.4";
    if (screenWidth <= 1024) return "1.5";
    if (screenWidth <= 1440) return "1.6";
    return "1.7"; // 大屏幕全屏模式下使用更大的行高
  };

  const deathScreenTextSize = getTextSize();
  const deathScreenSmileSize = getSmileSize();
  const deathScreenSmallTextSize = getSmallTextSize();
  const qrCodeSize = getQrCodeSize();
  const padding = getPadding();
  const lineHeight = getLineHeight();

  // 监听全屏状态变化，重新计算字体大小
  useEffect(() => {
    if (previewRef.current) {
      const element = previewRef.current;
      // 强制重新渲染以应用新的字体大小
      element.style.fontSize = deathScreenTextSize;
      element.style.lineHeight = lineHeight;
      element.style.paddingTop = padding.top;
      element.style.paddingLeft = padding.left;
      element.style.paddingRight = padding.right;
      element.style.paddingBottom = padding.bottom;
    }
  }, [isFullscreen, screenWidth, deathScreenTextSize, lineHeight, padding]);

  // 预加载图片
  useEffect(() => {
    const imageUrls = [
      "/image/prank/small/broken.webp",
      "/image/prank/small/radar.webp",
      "/image/prank/small/hacker-typer.webp",
      "/fake/death.webp",
      "/fake/death-10.webp",
      "/image/prank/death-10-qr-code.png"
    ];
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  const color = useMotionValue(COLORS_BACKGROUND[0]);

  useEffect(() => {
    animate(color, COLORS_BACKGROUND, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`linear-gradient(135deg, #ffffff 0%, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%, #ffffff 100%)`;

  const colors = [
    { name: "Broken Screen", value: "broken-screen", className: "bg-gray-500", href: "/broken-screen" },
    { name: "Blue Screen XP", value: "death-screen-xp", className: "bg-blue-600", href: "/blue-screen-of-death-windows" },
    { name: "Blue Screen 10", value: "death-screen-10", className: "bg-blue-500", href: "/blue-screen-of-death-windows-10" },
    { name: "FBI Warning", value: "fbi-warning", className: "bg-red-600", href: "/fbi-warning" },
    { name: "Fake Virus", value: "fake-virus", className: "bg-red-500", href: "/fake-virus" },
    { name: "No Signal", value: "no-signal", className: "bg-purple-600", href: "/no-signal-smpte-color-bars-screensaver" },
    { name: "Fake DOS", value: "fake-dos", className: "bg-black", href: "/fake-dos" },
    { name: "DVD Screensaver", value: "dvd-screensaver", className: "bg-indigo-600", href: "/dvd-screensaver" },
    { name: "Hacker Typer", value: "hacker-typer", className: "bg-green-600", href: "/hacker-typer" },
  ];

  return (
    <>
      <motion.section
      style={{
        backgroundImage,
        margin: 0,
      }}
      className="relative grid place-content-center overflow-hidden py-16 md:py-28 2xl:py-40"
    >
      {/* Windows 10蓝屏主题的装饰元素 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-800/20 rounded-sm blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-blue-900/15 rounded-sm blur-3xl animate-bounce" />
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-blue-700/25 rounded-sm blur-2xl animate-pulse delay-1000" />

      </div>

      <div className="relative z-10 flex flex-col items-center text-gray-900 px-4 max-w-7xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 backdrop-blur-sm border border-gray-200 rounded-sm mb-6"
        >
          <AlertTriangle className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">{t("hero.badge")}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 leading-tight tracking-tight text-gray-900"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 mb-12 max-w-3xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed text-gray-600"
        >
          {t("hero.description")}
        </motion.p>

        {/* Main Interactive Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-start mb-16"
        >
          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900 font-mono">Live Preview</h3>
            </div>

            <div className="relative bg-gray-900 rounded-sm shadow-lg border border-blue-700/40 overflow-hidden">
              <div
                ref={previewRef}
                className={`w-full h-80 cursor-pointer hover:opacity-90 transition-opacity full-screen ${isFullscreen ? "full-screen" : ""}`}
                style={{
                  backgroundColor: "#0078d7",
                  color: "#fff",
                  textAlign: "start",
                  fontSize: deathScreenTextSize,
                  fontWeight: 300,
                  lineHeight: lineHeight,
                  boxSizing: "border-box",
                  paddingTop: padding.top,
                  paddingLeft: padding.left,
                  paddingRight: padding.right,
                  paddingBottom: padding.bottom,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  fontFamily: "'Segoe UI Light', sans-serif",
                  userSelect: "none"
                }}
                onClick={handlePreviewClick}
              >
                {selectedColor === "death-screen-10" && (
                  <div className="w-full h-full flex flex-col text-white" style={{
                    fontFamily: "'Segoe UI Light', sans-serif",
                    textAlign: "start",
                    justifyContent: isFullscreen ? "flex-start" : "center"
                  }}>
                    <span className="block" style={{ 
                      fontSize: deathScreenSmileSize, 
                      fontWeight: "bold",
                      marginBottom: isFullscreen ? "1.5vh" : "8px"
                    }}>:(</span>
                    <span className="block" style={{ 
                      fontSize: deathScreenTextSize,
                      marginBottom: isFullscreen ? "2vh" : "8px"
                    }}>
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
                          marginTop: isFullscreen ? "0.5vh" : "0px",
                          flexShrink: 0
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

          </motion.div>

          {/* Choose Screen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900 font-mono">Choose Screen</h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {colors.map((colorOption) => (
                colorOption.href && colorOption.href !== "/blue-screen-of-death-windows-10" ? (
                  <I18nLink
                    key={colorOption.value}
                    href={colorOption.href}
                    className={`p-2 rounded-sm transition-all duration-200 hover:shadow-md cursor-pointer block`}
                    title={`Go to ${colorOption.name} page`}
                  >
                    <div
                      className="w-full h-12 rounded-sm border border-gray-300 relative"
                      style={{
                        backgroundColor: colorOption.value === "broken-screen" ? "gray" :
                          colorOption.value === "death-screen-xp" ? "#0078d7" :
                            colorOption.value === "death-screen-10" ? "#0078d7" :
                              colorOption.value === "fbi-warning" ? "#dc2626" :
                                colorOption.value === "fake-virus" ? "#ef4444" :
                                  colorOption.value === "no-signal" ? "#7c3aed" :
                                    colorOption.value === "fake-dos" ? "#000000" :
                                      colorOption.value === "dvd-screensaver" ? "#4f46e5" :
                                        colorOption.value === "hacker-typer" ? "#16a34a" : colorOption.value,
                        backgroundImage: colorOption.value === "broken-screen"
                          ? "url('/fake/broken.webp')"
                          : colorOption.value === "death-screen-xp"
                            ? "url('/fake/death.webp')"
                            : colorOption.value === "death-screen-10"
                              ? "url('/fake/death-10.webp')"
                              : colorOption.value === "fbi-warning"
                                ? "url('/fake/fbi-warning.png')"
                                : colorOption.value === "fake-virus"
                                  ? "url('/fake/fake-virus.png')"
                                  : colorOption.value === "no-signal"
                                    ? "url('/fake/saver-color-bars.png')"
                                    : colorOption.value === "fake-dos"
                                      ? "url('/fake/fake-dos.png')"
                                      : colorOption.value === "dvd-screensaver"
                                        ? "url('/fake/dvd.webp')"
                                        : colorOption.value === "hacker-typer"
                                          ? "url('/fake/bio.png')"
                                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                      }}
                    />
                    <div className="text-xs text-center mt-1 text-gray-700 font-mono">
                      {colorOption.name}
                    </div>
                  </I18nLink>
                ) : (
                  <motion.button
                    key={colorOption.value}
                    onClick={() => onColorChange && onColorChange(colorOption)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-sm transition-all duration-200 ${selectedColor === colorOption.value
                      ? "ring-2 ring-blue-500 shadow-lg"
                      : "hover:shadow-md"
                      }`}
                    title={`Select ${colorOption.name}`}
                  >
                    <div
                      className="w-full h-12 rounded-sm border border-gray-300 relative"
                      style={{
                        backgroundColor: colorOption.value === "broken-screen" ? "gray" :
                          colorOption.value === "death-screen-xp" ? "#0078d7" :
                            colorOption.value === "death-screen-10" ? "#0078d7" :
                              colorOption.value === "fbi-warning" ? "#dc2626" :
                                colorOption.value === "fake-virus" ? "#ef4444" :
                                  colorOption.value === "no-signal" ? "#7c3aed" :
                                    colorOption.value === "fake-dos" ? "#000000" :
                                      colorOption.value === "dvd-screensaver" ? "#4f46e5" :
                                        colorOption.value === "hacker-typer" ? "#16a34a" : colorOption.value,
                        backgroundImage: colorOption.value === "broken-screen"
                          ? "url('/fake/broken.webp')"
                          : colorOption.value === "death-screen-xp"
                            ? "url('/fake/death.webp')"
                            : colorOption.value === "death-screen-10"
                              ? "url('/fake/death-10.webp')"
                              : colorOption.value === "fbi-warning"
                                ? "url('/fake/fbi-warning.png')"
                                : colorOption.value === "fake-virus"
                                  ? "url('/fake/fake-virus.png')"
                                  : colorOption.value === "no-signal"
                                    ? "url('/fake/saver-color-bars.png')"
                                    : colorOption.value === "fake-dos"
                                      ? "url('/fake/fake-dos.png')"
                                      : colorOption.value === "dvd-screensaver"
                                        ? "url('/fake/dvd.webp')"
                                        : colorOption.value === "hacker-typer"
                                          ? "url('/fake/bio.png')"
                                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                      }}
                    />
                    <div className="text-xs text-center mt-1 text-gray-700 font-mono">
                      {colorOption.name}
                    </div>
                  </motion.button>
                )
              ))}
            </div>

            <p className="text-sm text-gray-600 font-mono">
              Perfect for pranks, testing, and creative displays
            </p>

            {/* Progress Controls */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-sm p-4 border border-blue-700/40">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-4 h-4 text-gray-700" />
                <h4 className="text-sm font-semibold text-white font-mono">Progress Settings</h4>
              </div>

              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Update time</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      value={updateDuration}
                      onChange={(e) => setUpdateDuration(parseInt(e.target.value) || 42)}
                      className="w-16 px-2 py-1 text-xs border border-blue-600/40 rounded bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 backdrop-blur-sm"
                    />
                    <span className="text-xs text-gray-700">minutes</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Start time</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={startTime}
                      onChange={(e) => setStartTime(parseInt(e.target.value) || 7)}
                      className="w-16 px-2 py-1 text-xs border border-blue-600/40 rounded bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 backdrop-blur-sm"
                    />
                    <span className="text-xs text-gray-700">%</span>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleRestart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium py-2 px-4 rounded text-sm transition-all backdrop-blur-sm border border-blue-600/40"
              >
                <RotateCcw className="w-4 h-4" />
                Restart Progress
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Launch Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 items-center mb-16"
        >
          <motion.button
            onClick={handlePreviewClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-blue-600/90 backdrop-blur-sm border border-blue-500/50 rounded-sm text-white font-semibold text-lg transition-all duration-300 hover:bg-blue-600 hover:border-blue-400"
          >
            <div className="flex items-center gap-3">
              <Play className="w-5 h-5 group-hover:animate-pulse" />
              <span>Launch Windows 10 Blue Screen</span>
            </div>
          </motion.button>

          <div className="flex items-center gap-6 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{t("hero.features.noRegistration")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{t("hero.features.worksOffline")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{t("hero.features.allDevices")}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>

    {/* Color Screens Section */}
    <ColorScreensSection />
  </>
  );
} 