"use client";
import { Link as I18nLink } from "@/i18n/routing";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Monitor, Play, RotateCcw, Settings, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface WindowsXPUpdateScreenHeroProps {
  selectedColor?: string;
  onColorChange?: (color: any) => void;
  onFullscreen?: () => void;
  onCustomColorChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFullscreen?: boolean;
  updatePercentage: number;
  updateDuration: number;
  startTime: number;
  onUpdateDurationChange?: (duration: number) => void;
  onStartTimeChange?: (time: number) => void;
  onRestart?: () => void;
}

export default function WindowsXPUpdateScreenHero({
  selectedColor = "windows-xp",
  onColorChange,
  onFullscreen,
  onCustomColorChange,
  isFullscreen = false,
  updatePercentage,
  updateDuration,
  startTime,
  onUpdateDurationChange,
  onStartTimeChange,
  onRestart,
}: WindowsXPUpdateScreenHeroProps) {
  const t = useTranslations("WindowsXPUpdateScreen");
  const previewRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const __fs = useRef(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [isFullscreenState, setIsFullscreenState] = useState(false);

  // Update screen width for responsive sizing
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  // Get responsive text size for fullscreen
  const getTextSize = (width: number) => {
    if (width >= 1920) return "32px";
    if (width >= 1280) return "28px";
    if (width >= 1024) return "24px";
    return "20px";
  };

  const getLogoSize = (width: number) => {
    if (width >= 1920) return "180px";
    if (width >= 1280) return "160px";
    if (width >= 1024) return "140px";
    return "120px";
  };

  const getLogoMargin = (width: number) => {
    if (width >= 1920) return "60px";
    if (width >= 1280) return "50px";
    if (width >= 1024) return "40px";
    return "30px";
  };

  const enterFullscreen = async () => {
    if (typeof window === 'undefined') return;

    const element = fullscreenRef.current;
    if (!element) return;

    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      }
    } catch (error) {
      console.error('Failed to enter fullscreen:', error);
    }
  };

  const exitFullscreen = async () => {
    if (typeof window === 'undefined') return;

    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    } catch (error) {
      console.error('Failed to exit fullscreen:', error);
    }
  };

  const handlePreviewClick = () => {
    if (isFullscreenState) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  const handleExitClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    exitFullscreen();
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(document.fullscreenElement || (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement || (document as any).msFullscreenElement);
      __fs.current = isCurrentlyFullscreen;
      setIsFullscreenState(isCurrentlyFullscreen);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreenState) {
        event.preventDefault();
        exitFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);

    // Preload images
    const imageUrls = [
      '/22/image/fake/windows-xp-update-screen.webp',
      '/22/image/fake/windows-10-update-screen.webp',
      '/22/image/fake/windows-11-update-screen.webp',
      '/22/image/fake/mac-os-x-update-screen.webp',
      '/22/image/fake/ubuntu-22-04-update-screen.webp',
      '/22/image/fake/android-update-screen.webp'
    ];

    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreenState]);

  const colors = [
    { name: "Windows XP", value: "windows-xp", href: "/fake-windows-xp-update-screen" },
    { name: "Windows 10", value: "windows-10", href: "/fake-windows-10-update-screen" },
    { name: "Windows 11", value: "windows-11", href: "/fake-windows-11-update" },
    { name: "Mac OS X", value: "mac-os-x", href: "/fake-mac-os-x-update-screen" },
    { name: "Ubuntu 22.04", value: "ubuntu-22-04", href: "/fake-ubuntu-update" },
    { name: "Android", value: "android", href: "/fake-android-update-screen" },
  ];

  return (
    <>
      {/* Hidden fullscreen container */}
      <div
        ref={fullscreenRef}
        className={`windows-xp ${isFullscreenState ? 'fullscreen-mode visible' : 'fullscreen-mode hidden'}`}
        style={{
          fontSize: getTextSize(screenWidth),
        }}
        onMouseDown={(e) => e.preventDefault()}
        onTouchStart={(e) => e.preventDefault()}
      >
        <div className="window-xp-main-section">
          <img
            className="update-windows-xp-logo"
            src="/22/image/windows-xp/logo.png"
            alt="Windows XP Logo"
            style={{
              height: getLogoSize(screenWidth),
              marginBottom: getLogoMargin(screenWidth),
            }}
          />
          <span className="window-xp-main-text">
            <span>{t("preview.updateText")} {updatePercentage}%</span><br />
            <span>{t("preview.dontTurnOffText")}</span>
          </span>
        </div>
        <span className="windows-xp-bottom-text"></span>

        {/* Exit fullscreen hint */}
        <div
          className="absolute top-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded px-3 py-1 cursor-pointer z-50"
          onClick={handleExitClick}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <span className="text-white text-sm">Press ESC or click here to exit</span>
        </div>
      </div>

      {/* Main Hero Content - hidden when fullscreen */}
      <section className={`relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 ${isFullscreenState ? 'hidden' : ''}`}>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 lg:py-24">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{t("hero.badge")}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 leading-tight max-w-4xl mx-auto"
            >
              {t("hero.title")}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            >
              {t("hero.description")}
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Live Preview */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-6"
            >
              {/* Live Preview Card */}
              <div className="bg-gray-100 dark:bg-gray-800 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-2xl">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                  <Monitor className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  Live Preview
                </h3>

                <div
                  ref={previewRef}
                  onClick={handlePreviewClick}
                  className={`relative w-full aspect-video bg-blue-600 cursor-pointer hover:scale-[1.02] transition-transform duration-300 overflow-hidden shadow-lg ${isFullscreenState ? 'rounded-none' : 'rounded-xl'}`}
                  style={{
                    backgroundImage: "url('/22/image/fake/windows-xp-update-screen.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  {/* Windows XP Update Screen Display */}
                  <div
                    className="w-full h-full windows-xp"
                    style={{
                      fontSize: isFullscreenState ? getTextSize(screenWidth) : '14px',
                    }}
                  >
                    <div className="window-xp-main-section">
                      <img
                        className="update-windows-xp-logo"
                        src="/22/image/windows-xp/logo.png"
                        alt="Windows XP Logo"
                      />
                      <span className="window-xp-main-text">
                        <span>{t("preview.updateText")} {updatePercentage}%</span><br />
                        <span>{t("preview.dontTurnOffText")}</span>
                      </span>
                    </div>
                    <span className="windows-xp-bottom-text"></span>
                  </div>

                  {/* Click to fullscreen hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Click for fullscreen</span>
                    </div>
                  </div>
                </div>

                {/* Launch Button */}
                <motion.button
                  onClick={handlePreviewClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 border border-blue-600 rounded-xl text-white font-semibold text-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Play className="w-5 h-5" />
                    <span>Launch Windows XP Update</span>
                  </div>
                </motion.button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span>{t("hero.features.noRegistration")}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <AlertTriangle className="w-4 h-4 text-yellow-300" />
                  <span>{t("hero.features.worksOffline")}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Monitor className="w-4 h-4 text-blue-300" />
                  <span>{t("hero.features.allDevices")}</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - System Selection & Controls */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-8"
            >
              {/* System Selection */}
              <div className="bg-gray-100 dark:bg-gray-800 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-2xl">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Choose System</h3>

                <div className="grid grid-cols-2 gap-4">
                  {colors.map((colorOption) => (
                    colorOption.value !== selectedColor ? (
                      <I18nLink
                        key={colorOption.value}
                        href={colorOption.href}
                        className="group"
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-4 rounded-xl transition-all duration-200 hover:shadow-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
                          title={`Switch to ${colorOption.name}`}
                        >
                          <div
                            className="w-full h-16 rounded-lg border border-white/20 relative mb-3"
                            style={{
                              backgroundColor:
                                colorOption.value === "windows-xp" ? "#5a7edc" :
                                  colorOption.value === "windows-10" ? "#0078d7" :
                                    colorOption.value === "windows-11" ? "#0078d7" :
                                      colorOption.value === "mac-os-x" ? "#000" :
                                        colorOption.value === "ubuntu-22-04" ? "#e95420" :
                                          colorOption.value === "android" ? "#3ddc84" : "#000000",
                              backgroundImage: `url('/22/image/fake/${colorOption.value}-update-screen.webp')`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat"
                            }}
                          />
                          <div className="text-sm text-center text-gray-700 dark:text-gray-300 font-medium">
                            {colorOption.name}
                          </div>
                        </motion.div>
                      </I18nLink>
                    ) : (
                      <motion.button
                        key={colorOption.value}
                        onClick={() => onColorChange && onColorChange(colorOption)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 rounded-xl transition-all duration-200 ring-2 ring-white/30 shadow-lg bg-white/15 border border-white/20"
                        title={`Select ${colorOption.name}`}
                      >
                        <div
                          className="w-full h-16 rounded-lg border border-white/30 relative mb-3"
                          style={{
                            backgroundColor: "#5a7edc",
                            backgroundImage: "url('/22/image/fake/windows-xp-update-screen.webp')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"
                          }}
                        />
                        <div className="text-sm text-center text-gray-700 dark:text-gray-300 font-medium">
                          {colorOption.name}
                        </div>
                      </motion.button>
                    )
                  ))}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-6 text-center">
                  Perfect for pranks, system testing, and Windows XP update simulation
                </p>
              </div>

              {/* Progress Controls */}
              <div className="bg-gray-100 dark:bg-gray-800 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Progress Settings</h4>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Update time</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        value={updateDuration}
                        onChange={(e) => onUpdateDurationChange && onUpdateDurationChange(parseInt(e.target.value) || 42)}
                        className="w-20 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">minutes</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start time</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={startTime}
                        onChange={(e) => onStartTimeChange && onStartTimeChange(parseInt(e.target.value) || 7)}
                        className="w-20 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={onRestart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                  Restart Progress
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Complete Windows XP CSS styles */}
        <style jsx global>{`
          .windows-xp {
            font-family: "Tahoma, Arial";
            font-size: 14px;
            line-height: 1.6;
            background-color: #5a7edc;
            background-image: url(/22/image/windows-xp/update-background.jpg);
            background-size: cover;
            background-repeat: no-repeat;
            color: #fff;
            text-align: end;
            font-weight: 400;
          }

          .windows-xp:fullscreen {
            font-size: 22px;
          }

          .fullscreen-mode {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9999;
            cursor: default;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
          }

          .fullscreen-mode.hidden {
            display: none !important;
          }

          .fullscreen-mode.visible {
            display: block !important;
          }

          @media screen and (max-width: 1024px) {
            .windows-xp {
              font-size: 12px;
              line-height: 1.4;
            }

            .windows-xp:fullscreen {
              font-size: 18px;
            }
          }

          .window-xp-main-section {
            position: absolute;
            top: 50%;
            left: 60%;
            transform: translate(-60%,-50%);
            display: flex;
            align-items: end;
            justify-content: center;
            flex-direction: column;
          }

          .update-windows-xp-logo {
            height: 40px;
            margin-bottom: 10px;
          }

          .windows-xp:fullscreen .update-windows-xp-logo,
          .fullscreen-mode .update-windows-xp-logo {
            height: 140px;
            margin-bottom: 40px;
          }

          .window-xp-main-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .fullscreen-mode .window-xp-main-text {
            font-size: inherit;
            line-height: 1.4;
          }

          .fullscreen-mode .update-windows-xp-logo {
            width: auto;
            object-fit: contain;
          }

          .windows-xp-bottom-text {
            position: absolute;
            bottom: max(15px,10%);
            left: 50%;
            transform: translate(-50%,0);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          /* Responsive fullscreen styles */
          @media (max-width: 768px) {
            .fullscreen-content {
              font-size: 14px;
            }
            .fullscreen-logo {
              width: 80px;
              height: 80px;
            }
          }
          
          @media (min-width: 1920px) {
            .fullscreen-content {
              font-size: 22px;
            }
            .fullscreen-logo {
              width: 140px;
              height: 140px;
            }
          }
        `}</style>
      </section>
    </>
  );
} 