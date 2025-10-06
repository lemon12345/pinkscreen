"use client";
import { Link as I18nLink } from "@/i18n/routing";
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { AlertTriangle, CheckCircle, Monitor, Play, RotateCcw, Settings, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface Windows10UpdateScreenHeroProps {
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

// Windows 10主题背景颜色
const COLORS_BACKGROUND = ["#0078d7", "#0066cc", "#004d99", "#003d7a"];

export default function Windows10UpdateScreenHero({
  selectedColor = "windows-10",
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
}: Windows10UpdateScreenHeroProps) {
  const t = useTranslations("Windows10UpdateScreen");
  const previewRef = useRef<HTMLDivElement>(null);
  const __fs = useRef(false);
  const [screenWidth, setScreenWidth] = useState(0);

  // Windows 10特有的字体计算和文本函数 - 完全复刻原Preview组件
  const getTextSize = () => {
    if (isFullscreen) {
      if (screenWidth >= 1920) return "32px";
      if (screenWidth >= 1280) return "28px";
      if (screenWidth >= 1024) return "24px";
      return "22px";
    }
    return "14px";
  };

  // Use translation function directly instead of locale detection to avoid hydration issues
  const getUpdateText = () => {
    return `${t("preview.updateText")} ${Math.round(updatePercentage)}%${t("preview.completeText")}`;
  };

  const getDontTurnOffText = () => {
    return t("preview.dontTurnOffText");
  };

  const getRestartText = () => {
    return t("preview.restartText");
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
    { name: "Windows 10", value: "windows-10", className: "bg-blue-600", href: "/fake-windows-10-update-screen" },
    { name: "Windows XP", value: "windows-xp", className: "bg-blue-600", href: "/fake-windows-xp-update-screen" },
    { name: "Mac OS X", value: "mac-os-x", className: "bg-black", href: "/fake-mac-os-x-update-screen" },
    { name: "Ubuntu 22.04", value: "ubuntu-22-04", className: "bg-purple-800", href: "/fake-ubuntu-update" },
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
        {/* 简洁装饰元素 */}
        <div className="absolute inset-0 overflow-hidden">
          {/* 微妙的几何线条 */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
          <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
          
          {/* 微妙的网格纹理 */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
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
              {/* Windows 10更新预览区域 - 完全复刻原Preview组件 */}
              <div
                ref={previewRef}
                className={`relative w-full h-64 bg-blue-600 overflow-hidden cursor-pointer full-screen ${isFullscreen ? 'rounded-none' : 'rounded-lg'}`}
                onClick={handlePreviewClick}
                style={{
                  backgroundColor: "#0079d7",
                  fontFamily: '"Segoe UI Variable", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                  fontSize: getTextSize(),
                  lineHeight: 1.6,
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: 400,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -40%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    className="loader"
                    style={{
                      position: "relative",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginBottom: "20px",
                    }}
                  >
                    <span className="pip-0"></span>
                    <span className="pip-1"></span>
                    <span className="pip-2"></span>
                    <span className="pip-3"></span>
                    <span className="pip-4"></span>
                    <span className="pip-5"></span>
                  </div>
                  <span
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <span>{getUpdateText()}</span><br />
                    <span>{getDontTurnOffText()}</span>
                  </span>
                </div>
                <span
                  style={{
                    position: "absolute",
                    bottom: "max(15px, 10%)",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {getRestartText()}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {colors.map((colorOption) => (
                colorOption.href && colorOption.href !== "/fake-windows-10-update-screen" ? (
                  <I18nLink
                    key={colorOption.value}
                    href={colorOption.href}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 transition-all duration-200 relative hover:shadow-md cursor-pointer block ${selectedColor === colorOption.value
                      ? "border-white shadow-lg"
                      : "border-blue-500/50"
                      }`}
                    title={`Go to ${colorOption.name} page`}
                    style={{
                      backgroundImage: colorOption.value === "windows-10" ? "url('/22/image/fake/windows-10-update-screen.webp')" :
                        colorOption.value === "windows-xp" ? "url('/22/image/fake/windows-xp-update-screen.webp')" :
                          colorOption.value === "mac-os-x" ? "url('/22/image/fake/mac-os-x-update-screen.webp')" :
                            colorOption.value === "ubuntu-22-04" ? "url('/22/image/fake/ubuntu-22-04-update-screen.webp')" :
                              colorOption.value === "android" ? "url('/22/image/fake/android-update-screen.webp')" :
                                colorOption.value === "windows-11" ? "url('/22/image/fake/windows-11-update-screen.webp')" : "none",
                      backgroundColor: colorOption.value === "windows-10" ? "#0078d7" :
                        colorOption.value === "windows-xp" ? "#0078d7" :
                          colorOption.value === "mac-os-x" ? "#000" :
                            colorOption.value === "ubuntu-22-04" ? "#772953" :
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
                      : "border-blue-500/50 hover:shadow-md"
                      }`}
                    style={{
                      backgroundColor: "#0078d7",
                      backgroundImage: "url('/22/image/fake/windows-10-update-screen.webp')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat"
                    }}
                  />
                )
              ))}
            </div>
          </motion.div>

          {/* Choose System & Progress Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900 font-sans">Choose System</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {colors.map((colorOption) => (
                  colorOption.href && colorOption.href !== "/fake-windows-10-update-screen" ? (
                    <I18nLink
                      key={colorOption.value}
                      href={colorOption.href}
                      className="p-3 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer block bg-white/5 hover:bg-white/10 border border-blue-600/30"
                      title={`Go to ${colorOption.name} page`}
                    >
                      <div
                        className="w-full h-12 rounded-md border border-blue-500/30 relative mb-2"
                        style={{
                          backgroundImage: colorOption.value === "windows-10" ? "url('/22/image/fake/windows-10-update-screen.webp')" :
                            colorOption.value === "windows-xp" ? "url('/22/image/fake/windows-xp-update-screen.webp')" :
                              colorOption.value === "mac-os-x" ? "url('/22/image/fake/mac-os-x-update-screen.webp')" :
                                colorOption.value === "ubuntu-22-04" ? "url('/22/image/fake/ubuntu-22-04-update-screen.webp')" :
                                  colorOption.value === "android" ? "url('/22/image/fake/android-update-screen.webp')" :
                                    colorOption.value === "windows-11" ? "url('/22/image/fake/windows-11-update-screen.webp')" : "none",
                          backgroundColor: colorOption.value === "windows-10" ? "#0078d7" :
                            colorOption.value === "windows-xp" ? "#0078d7" :
                              colorOption.value === "mac-os-x" ? "#000" :
                                colorOption.value === "ubuntu-22-04" ? "#772953" :
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
                        } border border-blue-600/30`}
                      title={`Select ${colorOption.name}`}
                    >
                      <div
                        className="w-full h-12 rounded-md border border-blue-500/30 relative mb-2"
                        style={{
                          backgroundColor: "#0078d7",
                          backgroundImage: "url('/22/image/fake/windows-10-update-screen.webp')",
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
            </div>

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

            <p className="text-sm text-gray-600">
              Perfect for pranks, system testing, and Windows 10 update simulation
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
              <span>Launch Windows 10 Update</span>
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

      {/* 完全复刻原Preview组件的CSS样式 */}
      <style jsx>{`
        .loader {
          animation: rotate 4s linear infinite;
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
      `}</style>
    </motion.section>
  );
} 