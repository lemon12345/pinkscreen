"use client";
import { Link as I18nLink } from "@/i18n/routing";
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { AlertTriangle, CheckCircle, Monitor, Play, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface UbuntuUpdateScreenHeroProps {
  selectedColor?: string;
  onColorChange?: (color: any) => void;
  onFullscreen?: () => void;
  onCustomColorChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFullscreen?: boolean;
}

// Ubuntu主题背景颜色
const COLORS_BACKGROUND = ["#2c0220", "#772953", "#993366", "#bb4477"];

export default function UbuntuUpdateScreenHero({
  selectedColor = "ubuntu-22-04",
  onColorChange,
  onFullscreen,
  onCustomColorChange,
  isFullscreen = false,
}: UbuntuUpdateScreenHeroProps) {
  const t = useTranslations("UbuntuUpdateScreen");
  const previewRef = useRef<HTMLDivElement>(null);
  const __fs = useRef(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [updatePercentage, setUpdatePercentage] = useState(0);
  const [updateInterval, setUpdateInterval] = useState<NodeJS.Timeout | null>(null);

  // 完全复刻 UbuntuUpdateScreenPreview.tsx 的逻辑
  const getTextSize = () => {
    return isFullscreen ? "22px" : "14px";
  };

  const getLogoSize = () => {
    return isFullscreen ? "100px" : "40px";
  };

  const getLogoMargin = () => {
    return isFullscreen ? "20px" : "10px";
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

  useEffect(() => {
    const startUpdateTimer = () => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }

      const interval = setInterval(() => {
        setUpdatePercentage((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 2;
        });
      }, 1000);

      setUpdateInterval(interval);
    };

    startUpdateTimer();
    return () => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
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
        // Fallscreen fullscreen
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
      "/22/image/ubuntu-22-04/logo.png",
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
    { name: "Ubuntu 22.04", value: "ubuntu-22-04", className: "bg-purple-800", href: "/fake-ubuntu-update" },
    { name: "Windows 10", value: "windows-10", className: "bg-blue-600", href: "/fake-windows-10-update-screen" },
    { name: "Windows XP", value: "windows-xp", className: "bg-blue-600", href: "/fake-windows-xp-update-screen" },
    { name: "Mac OS X", value: "mac-os-x", className: "bg-black", href: "/fake-mac-os-x-update-screen" },
    { name: "Android", value: "android", className: "bg-green-500", href: "/fake-android-update-screen" },
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
      {/* 完全复刻原Preview组件的Ubuntu特有样式 */}
      <style jsx>{`
        @keyframes dotColorChange {
          0%, 9% { background-color: #fff; }
          10%, 19% { background-color: #fc3d04; }
          20%, 29% { background-color: #fc3d04; }
          30%, 39% { background-color: #fc3d04; }
          40%, 49% { background-color: #fc3d04; }
          50%, 59% { background-color: #fc3d04; }
          60%, 69% { background-color: #fff; }
          70%, 79% { background-color: #fff; }
          80%, 89% { background-color: #fff; }
          90%, 99% { background-color: #fff; }
          100% { background-color: #fff; }
        }

        .loader {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dot {
          background-color: #fff;
          border-radius: 50%;
          width: 4px;
          height: 4px;
          margin: 0 7px;
          animation: dotColorChange 10s infinite;
        }

        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 1s; }
        .dot:nth-child(3) { animation-delay: 2s; }
        .dot:nth-child(4) { animation-delay: 3s; }
        .dot:nth-child(5) { animation-delay: 4s; }
        
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

      {/* Ubuntu主题的装饰元素 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-orange-400/5 rounded-full blur-3xl animate-bounce" />
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-purple-600/15 rounded-full blur-2xl animate-pulse delay-1000" />


        {/* 浮动Ubuntu图标 - 使用固定位置避免水合错误 */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { left: 15, top: 25, delay: 0 },
            { left: 80, top: 20, delay: 0.5 },
            { left: 30, top: 70, delay: 1 },
            { left: 65, top: 55, delay: 1.5 },
            { left: 85, top: 75, delay: 2 },
            { left: 20, top: 50, delay: 2.5 },
            { left: 55, top: 30, delay: 0.3 },
            { left: 40, top: 85, delay: 0.8 },
            { left: 75, top: 45, delay: 1.3 },
            { left: 50, top: 15, delay: 1.8 },
            { left: 10, top: 65, delay: 2.3 },
            { left: 90, top: 40, delay: 0.2 },
          ].map((item, i) => (
            <div
              key={i}
              className="absolute text-purple-200/10 text-lg animate-pulse"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                animationDelay: `${item.delay}s`,
              }}
            >
              🐧
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
              {/* 完全复刻 UbuntuUpdateScreenPreview.tsx 的预览区域 */}
              <div
                ref={previewRef}
                className={`w-full h-64 cursor-pointer hover:opacity-90 transition-opacity full-screen ${isFullscreen ? 'rounded-none border-none' : 'rounded-lg border border-purple-600'}`}
                style={{
                  backgroundColor: "#2c0220",
                  color: "#fff",
                  fontFamily: '"Segoe UI Variable", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                  fontSize: getTextSize(),
                  lineHeight: 1.6,
                  textAlign: "center",
                  fontWeight: 400,
                  position: "relative",
                  overflow: "hidden"
                }}
                onClick={handlePreviewClick}
              >
                {selectedColor === "ubuntu-22-04" && (
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
                    <img
                      src="/22/image/ubuntu-22-04/logo.png"
                      alt="Ubuntu Logo"
                      style={{
                        height: getLogoSize(),
                        marginBottom: getLogoMargin()
                      }}
                    />
                    <div className="loader">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {colors.map((colorOption) => (
                colorOption.href && colorOption.href !== "/fake-ubuntu-update" ? (
                  <I18nLink
                    key={colorOption.value}
                    href={colorOption.href}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 transition-all duration-200 relative hover:shadow-md cursor-pointer block ${selectedColor === colorOption.value
                      ? "border-white shadow-lg"
                      : "border-purple-500/50"
                      }`}
                    title={`Go to ${colorOption.name} page`}
                    style={{
                      backgroundImage: colorOption.value === "ubuntu-22-04" ? "url('/22/image/fake/ubuntu-22-04-update-screen.webp')" :
                        colorOption.value === "windows-10" ? "url('/22/image/fake/windows-10-update-screen.webp')" :
                          colorOption.value === "windows-xp" ? "url('/22/image/fake/windows-xp-update-screen.webp')" :
                            colorOption.value === "mac-os-x" ? "url('/22/image/fake/mac-os-x-update-screen.webp')" :
                              colorOption.value === "android" ? "url('/22/image/fake/android-update-screen.webp')" :
                                colorOption.value === "windows-11" ? "url('/22/image/fake/windows-11-update-screen.webp')" : "none",
                      backgroundColor: colorOption.value === "ubuntu-22-04" ? "#772953" :
                        colorOption.value === "windows-10" ? "#0078d7" :
                          colorOption.value === "windows-xp" ? "#0078d7" :
                            colorOption.value === "mac-os-x" ? "#000" :
                              colorOption.value === "android" ? "#0084e7" :
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
                      : "border-purple-500/50 hover:shadow-md"
                      }`}
                    style={{
                      backgroundColor: "#772953",
                      backgroundImage: "url('/22/image/fake/ubuntu-22-04-update-screen.webp')",
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
                colorOption.href && colorOption.href !== "/fake-ubuntu-update" ? (
                  <I18nLink
                    key={colorOption.value}
                    href={colorOption.href}
                    className="p-3 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer block bg-white/5 hover:bg-white/10 border border-purple-600/30"
                    title={`Go to ${colorOption.name} page`}
                  >
                    <div
                      className="w-full h-12 rounded-md border border-purple-500/30 relative mb-2"
                      style={{
                        backgroundImage: colorOption.value === "ubuntu-22-04" ? "url('/22/image/fake/ubuntu-22-04-update-screen.webp')" :
                          colorOption.value === "windows-10" ? "url('/22/image/fake/windows-10-update-screen.webp')" :
                            colorOption.value === "windows-xp" ? "url('/22/image/fake/windows-xp-update-screen.webp')" :
                              colorOption.value === "mac-os-x" ? "url('/22/image/fake/mac-os-x-update-screen.webp')" :
                                colorOption.value === "android" ? "url('/22/image/fake/android-update-screen.webp')" :
                                  colorOption.value === "windows-11" ? "url('/22/image/fake/windows-11-update-screen.webp')" : "none",
                        backgroundColor: colorOption.value === "ubuntu-22-04" ? "#772953" :
                          colorOption.value === "windows-10" ? "#0078d7" :
                            colorOption.value === "windows-xp" ? "#0078d7" :
                              colorOption.value === "mac-os-x" ? "#000" :
                                colorOption.value === "android" ? "#0084e7" :
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
                      } border border-purple-600/30`}
                    title={`Select ${colorOption.name}`}
                  >
                    <div
                      className="w-full h-12 rounded-md border border-purple-500/30 relative mb-2"
                      style={{
                        backgroundColor: "#772953",
                        backgroundImage: "url('/22/image/fake/ubuntu-22-04-update-screen.webp')",
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
              Perfect for pranks, system testing, and Ubuntu update simulation
            </p>
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
              <span>Launch Ubuntu Update</span>
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