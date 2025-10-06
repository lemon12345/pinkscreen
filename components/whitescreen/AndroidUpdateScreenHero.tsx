"use client";
import { Link as I18nLink } from "@/i18n/routing";
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { AlertTriangle, CheckCircle, Monitor, Play, RotateCcw, Settings, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface AndroidUpdateScreenHeroProps {
  selectedColor?: string;
  onColorChange?: (color: any) => void;
  onFullscreen?: () => void;
  onCustomColorChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  updatePercentage?: number;
  updateDuration?: number;
  startTime?: number;
  onUpdateDurationChange?: (duration: number) => void;
  onStartTimeChange?: (time: number) => void;
  onRestart?: () => void;
  isFullscreen?: boolean;
}

// Android主题背景颜色
const COLORS_BACKGROUND = ["#0084e7", "#0070cc", "#005cb3", "#004899"];

export default function AndroidUpdateScreenHero({
  selectedColor = "android",
  onColorChange,
  onFullscreen,
  onCustomColorChange,
  updatePercentage = 7,
  updateDuration = 42,
  startTime = 7,
  onUpdateDurationChange,
  onStartTimeChange,
  onRestart,
  isFullscreen = false,
}: AndroidUpdateScreenHeroProps) {
  const t = useTranslations("AndroidUpdateScreen");
  const previewRef = useRef<HTMLDivElement>(null);
  const __fs = useRef(false);
  const [screenWidth, setScreenWidth] = useState(0);

  // 完全复刻 AndroidUpdateScreenPreview.tsx 的逻辑
  const getUpdateText = () => {
    return t("preview.updateText");
  };

  const getTextSize = () => {
    if (isFullscreen) return "22px";
    return "14px";
  };

  const getLogoSize = () => {
    if (isFullscreen) return "200px";
    return "80px";
  };

  const getLogoMargin = () => {
    if (isFullscreen) return "100px";
    return "20px";
  };

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
      onFullscreen?.();
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
      onFullscreen?.();
    }
  };

  const handlePreviewClick = () => {
    _f();
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleFullscreenChange = () => {
      if (previewRef.current) {
        const isInFullscreen = !!(document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement || __fs.current);
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

  // 预加载图片
  useEffect(() => {
    const imageUrls = [
      "/22/image/android/logo.svg",
      "/22/image/fake/windows-10-update-screen.webp",
      "/22/image/fake/windows-xp-update-screen.webp",
      "/22/image/fake/mac-os-x-update-screen.webp",
      "/22/image/fake/ubuntu-22-04-update-screen.webp",
      "/22/image/fake/android-update-screen.webp",
      "/22/image/fake/windows-11-update-screen.webp"
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
    { name: "Android", value: "android", className: "bg-green-500", href: "/fake-android-update-screen" },
    { name: "Windows 10", value: "windows-10", className: "bg-blue-600", href: "/fake-windows-10-update-screen" },
    { name: "Windows XP", value: "windows-xp", className: "bg-blue-600", href: "/fake-windows-xp-update-screen" },
    { name: "Mac OS X", value: "mac-os-x", className: "bg-black", href: "/fake-mac-os-x-update-screen" },
    { name: "Ubuntu 22.04", value: "ubuntu-22-04", className: "bg-purple-800", href: "/fake-ubuntu-update" },
    { name: "Windows 11", value: "windows-11", className: "bg-black", href: "/fake-windows-11-update" },
  ];

  return (
    <motion.section
      style={{
        backgroundImage,
        margin: 0,
      }}
      className="relative grid place-content-center overflow-hidden py-16 md:py-28 2xl:py-40"
    >
      {/* 完全复刻原Preview组件的进度条样式 */}
      <style jsx>{`
        progress::-webkit-progress-value {
          background-color: #fff !important;
        }
        progress::-webkit-progress-bar {
          background-color: #56a5e2;
        }
        progress::-moz-progress-bar {
          background-color: #fff !important;
        }
        
        @media (max-width: 768px) {
          .full-screen {
            font-size: 10px !important;
            padding: 10px !important;
          }
        }
        
        .full-screen:fullscreen,
        .full-screen:-webkit-full-screen,
        .full-screen:-moz-full-screen {
          font-size: 24px !important;
          padding: 50px !important;
        }
      `}</style>

      {/* Android主题的装饰元素 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-blue-400/5 rounded-full blur-3xl animate-bounce" />
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-green-600/15 rounded-full blur-2xl animate-pulse delay-1000" />

        {/* Android机器人线条 */}
        <div className="absolute top-32 left-0 w-full h-px bg-green-500/20" />
        <div className="absolute bottom-32 left-0 w-full h-px bg-green-500/20" />
        <div className="absolute left-20 top-0 w-px h-full bg-green-500/15" />
        <div className="absolute right-20 top-0 w-px h-full bg-green-500/15" />

        {/* 浮动Android图标 - 使用固定位置避免水合错误 */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { left: 10, top: 20, delay: 0 },
            { left: 85, top: 15, delay: 0.5 },
            { left: 25, top: 75, delay: 1 },
            { left: 70, top: 60, delay: 1.5 },
            { left: 90, top: 80, delay: 2 },
            { left: 15, top: 45, delay: 2.5 },
            { left: 60, top: 25, delay: 0.3 },
            { left: 35, top: 90, delay: 0.8 },
            { left: 80, top: 40, delay: 1.3 },
            { left: 45, top: 10, delay: 1.8 },
            { left: 5, top: 70, delay: 2.3 },
            { left: 95, top: 50, delay: 0.2 },
            { left: 55, top: 85, delay: 0.7 },
            { left: 30, top: 35, delay: 1.2 },
            { left: 75, top: 65, delay: 1.7 },
          ].map((item, i) => (
            <div
              key={i}
              className="absolute text-green-500/10 text-lg animate-pulse"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                animationDelay: `${item.delay}s`,
              }}
            >
              🤖
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-gray-900 px-4 max-w-7xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-full mb-6 drop-shadow-md"
        >
          <AlertTriangle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("hero.badge")}</span>
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
              <h3 className="text-lg font-semibold text-gray-900 font-sans">Live Preview</h3>
            </div>

            <div className={`relative bg-gray-100 shadow-lg overflow-hidden ${isFullscreen ? 'rounded-none border-none' : 'rounded-lg border border-gray-200'}`}>
              {/* 完全复刻 AndroidUpdateScreenPreview.tsx 的预览区域 */}
              <div
                ref={previewRef}
                className={`relative w-full h-64 bg-blue-600 overflow-hidden cursor-pointer full-screen ${isFullscreen ? 'rounded-none' : 'rounded-lg'}`}
                onClick={handlePreviewClick}
                style={{
                  backgroundColor: "#0084e7",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: getTextSize(),
                  lineHeight: 1.6,
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: 400,
                }}
              >
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src="/22/image/android/logo.svg"
                    alt="Android logo"
                    className="mb-5"
                    style={{
                      height: getLogoSize(),
                      marginBottom: getLogoMargin(),
                    }}
                  />
                  <p
                    className="text-start whitespace-nowrap overflow-hidden text-ellipsis text-white pb-2.5"
                    style={{
                      textAlign: "start",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "#fff",
                      padding: "0 0 10px 0",
                    }}
                  >
                    {getUpdateText()}<br />
                    <span>{Math.round(updatePercentage)}%</span>
                  </p>
                  <progress
                    value={updatePercentage}
                    max="100"
                    className="w-full h-1.5 bottom-20 rounded-none border-none text-white overflow-hidden"
                    style={{
                      height: "6px",
                      bottom: "20vh",
                      borderRadius: "1px",
                      border: "none",
                      color: "#fff",
                      background: "rgba(255, 255, 255, .5)",
                      backgroundColor: "#56a5e2",
                      overflow: "hidden",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {colors.map((colorOption) => (
                colorOption.href && colorOption.href !== "/fake-android-update-screen" ? (
                  <I18nLink
                    key={colorOption.value}
                    href={colorOption.href}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 transition-all duration-200 relative hover:shadow-md cursor-pointer block ${selectedColor === colorOption.value
                      ? "border-white shadow-lg"
                      : "border-green-500/50"
                      }`}
                    title={`Go to ${colorOption.name} page`}
                    style={{
                      backgroundImage: colorOption.value === "android" ? "url('/22/image/fake/android-update-screen.webp')" :
                        colorOption.value === "windows-10" ? "url('/22/image/fake/windows-10-update-screen.webp')" :
                          colorOption.value === "windows-xp" ? "url('/22/image/fake/windows-xp-update-screen.webp')" :
                            colorOption.value === "mac-os-x" ? "url('/22/image/fake/mac-os-x-update-screen.webp')" :
                              colorOption.value === "ubuntu-22-04" ? "url('/22/image/fake/ubuntu-22-04-update-screen.webp')" :
                                colorOption.value === "windows-11" ? "url('/22/image/fake/windows-11-update-screen.webp')" : "none",
                      backgroundColor: colorOption.value === "android" ? "#0084e7" :
                        colorOption.value === "windows-10" ? "#0078d7" :
                          colorOption.value === "windows-xp" ? "#0078d7" :
                            colorOption.value === "mac-os-x" ? "#000" :
                              colorOption.value === "ubuntu-22-04" ? "#772953" :
                                colorOption.value === "windows-11" ? "#000" : "#000000",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat"
                    }}
                  />
                ) : (
                  <motion.button
                    key={colorOption.value}
                    onClick={() => onColorChange && onColorChange(colorOption)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 transition-all duration-200 relative ${selectedColor === colorOption.value
                      ? "border-white shadow-lg"
                      : "border-green-500/50 hover:shadow-md"
                      }`}
                    style={{
                      backgroundColor: "#0084e7",
                      backgroundImage: "url('/22/image/fake/android-update-screen.webp')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat"
                    }}
                  />
                )
              ))}
            </div>
          </motion.div>

          {/* Choose System */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900 font-sans">Choose System</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {colors.map((colorOption) => (
                colorOption.href && colorOption.href !== "/fake-android-update-screen" ? (
                  <I18nLink
                    key={colorOption.value}
                    href={colorOption.href}
                    className={`p-3 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer block bg-white/5 hover:bg-white/10 border border-green-500/30`}
                    title={`Go to ${colorOption.name} page`}
                  >
                    <div
                      className="w-full h-12 rounded-md border border-green-400/30 relative mb-2"
                      style={{
                        backgroundImage: colorOption.value === "android" ? "url('/22/image/fake/android-update-screen.webp')" :
                          colorOption.value === "windows-10" ? "url('/22/image/fake/windows-10-update-screen.webp')" :
                            colorOption.value === "windows-xp" ? "url('/22/image/fake/windows-xp-update-screen.webp')" :
                              colorOption.value === "mac-os-x" ? "url('/22/image/fake/mac-os-x-update-screen.webp')" :
                                colorOption.value === "ubuntu-22-04" ? "url('/22/image/fake/ubuntu-22-04-update-screen.webp')" :
                                  colorOption.value === "windows-11" ? "url('/22/image/fake/windows-11-update-screen.webp')" : "none",
                        backgroundColor: colorOption.value === "android" ? "#0084e7" :
                          colorOption.value === "windows-10" ? "#0078d7" :
                            colorOption.value === "windows-xp" ? "#0078d7" :
                              colorOption.value === "mac-os-x" ? "#000" :
                                colorOption.value === "ubuntu-22-04" ? "#772953" :
                                  colorOption.value === "windows-11" ? "#000" : "#000000",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                      }}
                    />
                    <div className="text-xs text-center text-gray-700 font-medium">
                      {colorOption.name}
                    </div>
                  </I18nLink>
                ) : (
                  <motion.button
                    key={colorOption.value}
                    onClick={() => onColorChange && onColorChange(colorOption)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-lg transition-all duration-200 ${selectedColor === colorOption.value
                      ? "ring-2 ring-white shadow-lg bg-white/10"
                      : "hover:shadow-md bg-white/5 hover:bg-white/10"
                      } border border-green-500/30`}
                    title={`Select ${colorOption.name}`}
                  >
                    <div
                      className="w-full h-12 rounded-md border border-green-400/30 relative mb-2"
                      style={{
                        backgroundColor: "#0084e7",
                        backgroundImage: "url('/22/image/fake/android-update-screen.webp')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                      }}
                    />
                    <div className="text-xs text-center text-gray-700 font-medium">
                      {colorOption.name}
                    </div>
                  </motion.button>
                )
              ))}
            </div>

            <p className="text-sm text-gray-600">
              Perfect for pranks, system testing, and mobile update simulation
            </p>

            {/* Progress Controls */}
            <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-4 h-4 text-gray-600" />
                <h4 className="text-sm font-semibold text-gray-900">Progress Settings</h4>
              </div>

              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Update time</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      value={updateDuration}
                      onChange={(e) => onUpdateDurationChange && onUpdateDurationChange(parseInt(e.target.value) || 42)}
                      className="w-16 px-2 py-1 text-xs border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-xs text-gray-600">minutes</span>
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
                      onChange={(e) => onStartTimeChange && onStartTimeChange(parseInt(e.target.value) || 7)}
                      className="w-16 px-2 py-1 text-xs border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-xs text-gray-600">%</span>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={onRestart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm transition-all"
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
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 border border-blue-600 rounded-lg text-white font-semibold text-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <Play className="w-5 h-5 group-hover:animate-pulse" />
              <span>Launch Android Update</span>
            </div>
          </motion.button>

          <div className="flex items-center gap-6 text-sm text-gray-600">
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
  );
} 