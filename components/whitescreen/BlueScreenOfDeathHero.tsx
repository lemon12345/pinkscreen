"use client";
import { Link as I18nLink } from "@/i18n/routing";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Monitor, Play, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import ColorScreensSection from "./ColorScreensSection";

interface BlueScreenOfDeathHeroProps {
  selectedColor?: string;
  onColorChange?: (color: any) => void;
  onFullscreen?: () => void;
  onCustomColorChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFullscreen?: boolean;
}

// Windows XP蓝屏死机经典背景色

export default function BlueScreenOfDeathHero({
  selectedColor = "death-screen-xp",
  onColorChange,
  onFullscreen,
  onCustomColorChange,
  isFullscreen = false,
}: BlueScreenOfDeathHeroProps) {
  const t = useTranslations("BlueScreenOfDeath");
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

  // CSS Variables for death screen text size - 优化全屏模式下的字体大小
  const getTextSize = () => {
    if (!isFullscreen) return "7px";
    if (screenWidth <= 512) return "16px";
    if (screenWidth <= 768) return "24px";
    if (screenWidth <= 1024) return "32px";
    return "40px"; // 大屏幕全屏模式下使用更大的字体
  };

  const getLineHeight = () => {
    if (!isFullscreen) return "1.2";
    if (screenWidth <= 512) return "1.4";
    if (screenWidth <= 768) return "1.5";
    if (screenWidth <= 1024) return "1.6";
    return "1.7"; // 大屏幕全屏模式下使用更大的行高
  };

  const getPadding = () => {
    if (!isFullscreen) return { top: "7%", left: "7%", right: "7%" };
    if (screenWidth <= 512) return { top: "1%", left: "5%", right: "5%" };
    if (screenWidth <= 768) return { top: "2%", left: "8%", right: "8%" };
    if (screenWidth <= 1024) return { top: "3%", left: "10%", right: "10%" };
    return { top: "4%", left: "12%", right: "12%" }; // 大屏幕全屏模式下大幅减少上方空白
  };

  const deathScreenTextSize = getTextSize();
  const lineHeight = getLineHeight();
  const padding = getPadding();

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
    }
  }, [isFullscreen, screenWidth, deathScreenTextSize, lineHeight, padding]);

  // 预加载图片
  useEffect(() => {
    const imageUrls = [
      "/image/prank/small/broken.webp",
      "/image/prank/small/radar.webp",
      "/image/prank/small/hacker-typer.webp",
      "/fake/death.webp",
      "/fake/death-10.webp"
    ];
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // 移除动画颜色，使用静态背景

  // 使用白色渐变背景
  const backgroundImage = "linear-gradient(135deg, #ffffff 0%, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%, #ffffff 100%)";

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
        backgroundImage: backgroundImage,
        margin: 0,
      }}
      className="relative grid place-content-center overflow-hidden py-16 md:py-28 2xl:py-40"
    >
      {/* 简洁的Windows XP蓝屏死机背景 */}

      <div className="relative z-10 flex flex-col items-center text-gray-900 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-12"
        >
          <motion.span
            className="inline-flex items-center gap-2 rounded-sm bg-gray-100 backdrop-blur-sm border border-gray-200 px-3 py-1.5 text-sm text-gray-700 font-mono"
            whileHover={{ scale: 1.05 }}
          >
            <AlertTriangle className="w-4 h-4" />
            {t("hero.badge")}
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-4xl text-center text-3xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight font-mono"
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

            <div className="relative bg-gray-900 rounded-sm shadow-lg border border-blue-400/30 overflow-hidden">
              <div
                ref={previewRef}
                className="w-full h-64 cursor-pointer hover:opacity-90 transition-opacity full-screen"
                style={{
                  backgroundColor: "#004091",
                  color: "#ffffff",
                  textAlign: "start",
                  fontSize: deathScreenTextSize,
                  fontWeight: 400,
                  lineHeight: lineHeight,
                  boxSizing: "border-box",
                  paddingTop: padding.top,
                  paddingLeft: padding.left,
                  paddingRight: padding.right,
                  fontFamily: "'Lucida Console', 'Courier New', monospace",
                  userSelect: "none",
                }}
                onClick={handlePreviewClick}
              >
                <div className="whitespace-pre-wrap select-none">
                  <p className="text-white mb-2">
                    Your PC ran into a problem and needs to restart. We&apos;re just collecting some error info, and then we&apos;ll restart for you.
                  </p>
                  A problem has been detected and windows has been shut down to prevent damage to your computer.{"\n\n"}
                  The problem seems to be caused by the following file: SPCMDCON.SYS PAGE_FAULT_IN_NONPAGED_AREA{"\n\n"}
                  If this is the first time you&apos;ve seen this stop error screen, restart your computer. If this screen appears again, follow these steps:{"\n\n"}
                  Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any windows updates you might need.{"\n\n"}
                  If problems continue, disable or remove any newly installed hardware or software. Disable BIOS memory options such as caching or shadowing. If you need to use Safe Mode to remove or disable components, restart your computer, press F8 to select Advanced startup options, and then select Safe Mode.{"\n\n"}
                  Technical information:{"\n\n"}
                  *** STOP: 0x00000050 (OXFD3094C2, 0x00000001, 0xFBFE7617, 0x00000000){"\n\n"}
                  *** SPCMDCON. SYS - Address FBFE7617 base at FBFE5000, Datestamp 3d6dd67c
                </div>
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
                colorOption.href && colorOption.href !== "/blue-screen-of-death-windows" ? (
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
              Perfect for pranks, system testing, and error simulation
            </p>
          </motion.div>
        </motion.div>

        {/* Launch Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-12"
        >
          <motion.button
            onClick={handlePreviewClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-sm text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-mono"
          >
            <Play className="w-5 h-5" />
            Launch Blue Screen
          </motion.button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-6"
        >
          {[
            { icon: CheckCircle, text: t("hero.features.noRegistration") },
            { icon: CheckCircle, text: t("hero.features.worksOffline") },
            { icon: CheckCircle, text: t("hero.features.allDevices") }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
              className="flex items-center gap-2 text-gray-600"
            >
              <feature.icon className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium font-mono">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>

      {/* Color Screens Section */}
      <ColorScreensSection />
    </>
  );
} 