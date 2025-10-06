"use client";
import { Link as I18nLink } from "@/i18n/routing";
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { CheckCircle, Monitor, Play, Sparkles, Tv } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import ColorScreensSection from "./ColorScreensSection";

interface NoSignalSMPTEColorBarsScreensaverHeroProps {
  selectedColor?: string;
  onColorChange?: (color: any) => void;
  onFullscreen?: () => void;
  onCustomColorChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFullscreen?: boolean;
}

// SMPTE/Broadcast主题背景颜色 - 使用更鲜艳的色彩
const COLORS_BACKGROUND = ["#dc2626", "#ea580c", "#d97706", "#ca8a04"];

export default function NoSignalSMPTEColorBarsScreensaverHero({
  selectedColor = "no-signal",
  onColorChange,
  onFullscreen,
  onCustomColorChange,
  isFullscreen = false,
}: NoSignalSMPTEColorBarsScreensaverHeroProps) {
  const t = useTranslations("NoSignalSMPTEColorBarsScreensaver");
  const previewRef = useRef<HTMLDivElement>(null);
  const __fs = useRef(false);

  const _f = () => {
    if (typeof window === 'undefined') return;

    const element = previewRef.current;
    if (!element) return;

    if (__fs.current) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    } else {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        (element as any).msRequestFullscreen();
      }
    }
  };

  const handlePreviewClick = () => {
    _f();
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleFullscreenChange = () => {
      __fs.current = !!(document.fullscreenElement || (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement || (document as any).msFullscreenElement);
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
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    animate(mouseX, Math.random() * 100, {
      duration: 20,
      repeat: Infinity,
      repeatType: "reverse"
    });
    animate(mouseY, Math.random() * 100, {
      duration: 20,
      repeat: Infinity,
      repeatType: "reverse"
    });
  }, [mouseX, mouseY]);

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

  const backgroundImage = useMotionTemplate`linear-gradient(135deg, #ffffff 0%, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%, #ffffff 100%)`;

  // Fixed positions for TV/broadcast emojis to avoid hydration errors
  const tvPositions = [
    { left: "12%", top: "25%", delay: "0s" },
    { left: "88%", top: "15%", delay: "1s" },
    { left: "25%", top: "75%", delay: "2s" },
    { left: "75%", top: "65%", delay: "0.5s" },
    { left: "45%", top: "20%", delay: "1.5s" },
    { left: "15%", top: "60%", delay: "2.5s" },
    { left: "85%", top: "45%", delay: "0.3s" },
    { left: "55%", top: "80%", delay: "1.8s" }
  ];

  return (
    <>
      <motion.section
      style={{
        backgroundImage,
      }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-100/10 via-orange-100/10 to-yellow-100/10" />

      {/* Floating TV Icons */}
      {tvPositions.map((pos, i) => (
        <div
          key={i}
          className="absolute text-white/20 text-2xl animate-pulse"
          style={{
            left: pos.left,
            top: pos.top,
            animationDelay: pos.delay,
          }}
        >
          📺
        </div>
      ))}

      {/* Blur Effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-red-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-400/20 rounded-full blur-2xl" />

      {/* Animated Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-300/40 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 text-gray-900">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gray-100 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 font-medium text-sm drop-shadow-lg">{t("hero.badge")}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-2xl"
              style={{
                textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.5)'
              }}
            >
              {t("hero.title")}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl drop-shadow-lg"
            >
              {t("hero.description")}
            </motion.p>
          </motion.div>

          {/* Right Column - Live Preview & Controls */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Live Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-black/20 backdrop-blur-sm rounded-xl border border-black/20 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 font-mono mb-4 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-gray-600" />
                Live Preview
              </h3>

              <div
                ref={previewRef}
                onClick={handlePreviewClick}
                className="relative w-full max-w-md aspect-video bg-black rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 overflow-hidden"
              >
                {/* Full SMPTE Color Bars Display for Fullscreen */}
                <div className={`w-full h-full bg-black relative saver-color-bars ${__fs.current ? 'fullscreen' : ''} flex items-center justify-center`}>
                  <div id="content" className="w-full h-full flex relative">
                    <div className="colorBar flex-1 h-full" style={{ backgroundColor: '#fff' }}></div>
                    <div className="colorBar flex-1 h-full" style={{ backgroundColor: '#ff0' }}></div>
                    <div className="colorBar flex-1 h-full" style={{ backgroundColor: '#0ff' }}></div>
                    <div className="colorBar flex-1 h-full" style={{ backgroundColor: '#0f0' }}></div>
                    <div className="colorBar flex-1 h-full" style={{ backgroundColor: '#f0f' }}></div>
                    <div className="colorBar flex-1 h-full" style={{ backgroundColor: 'red' }}></div>
                    <div className="colorBar flex-1 h-full" style={{ backgroundColor: '#00f' }}></div>
                    <div className="colorBar flex-1 h-full" style={{ backgroundColor: '#000' }}></div>
                    <div id="textOverlay" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-mono z-10 text-shadow-lg bg-black bg-opacity-50 px-4 py-2">
                      NO SIGNAL
                    </div>
                  </div>
                </div>

                {/* Click to fullscreen hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-white text-xs font-medium">Click for fullscreen</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                <Tv className="w-4 h-4" />
                {t("preview.colorBars")}: SMPTE Standard
              </p>
            </motion.div>

            {/* Screensaver Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="bg-black/20 backdrop-blur-sm rounded-xl border border-black/20 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 font-mono mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gray-600" />
                Choose Screen
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {colors.map((colorOption) => (
                  colorOption.href && colorOption.href !== "/no-signal-smpte-color-bars-screensaver" ? (
                    <I18nLink
                      key={colorOption.value}
                      href={colorOption.href}
                      className={`p-2 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer block`}
                      title={`Go to ${colorOption.name} page`}
                    >
                      <div
                        className="w-full h-12 rounded-md border border-gray-300 relative"
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
                      <div className="text-xs text-center mt-1 text-gray-700">
                        {colorOption.name}
                      </div>
                    </I18nLink>
                  ) : (
                    <motion.button
                      key={colorOption.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-lg transition-all duration-200 ring-2 ring-blue-500 shadow-lg`}
                      title={`Select ${colorOption.name}`}
                    >
                      <div
                        className="w-full h-12 rounded-md border border-gray-300 relative"
                        style={{
                          backgroundColor: "#7c3aed",
                          backgroundImage: "url('/fake/saver-color-bars.png')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat"
                        }}
                      />
                      <div className="text-xs text-center mt-1 text-gray-700">
                        {colorOption.name}
                      </div>
                    </motion.button>
                  )
                ))}
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Perfect for pranks, testing, and creative displays
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Launch Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 items-center mt-16 mb-16"
        >
          <motion.button
            onClick={handlePreviewClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-black/30 backdrop-blur-sm border border-black/20 rounded-lg text-white font-semibold text-lg transition-all duration-300 hover:bg-black/40 hover:border-black/30 drop-shadow-xl"
          >
            <div className="flex items-center gap-3">
              <Play className="w-5 h-5 group-hover:animate-pulse" />
              <span className="drop-shadow-lg">Launch SMPTE Color Bars</span>
            </div>
          </motion.button>

          <div className="flex items-center gap-6 text-sm text-gray-900">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{t("hero.features.noRegistration")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4" />
              <span>{t("hero.features.worksOffline")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              <span>{t("hero.features.allDevices")}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Complete No Signal SMPTE Color Bars CSS styles */}
      <style jsx global>{`
        .saver-color-bars {
          background-color: #000;
          overflow: hidden;
          font-size: 1.5rem;
          font-family: Arial, sans-serif;
          font-weight: bold;
        }

        .saver-color-bars.fullscreen {
          font-size: 3rem;
        }

        @media screen and (max-width: 768px) {
          .saver-color-bars {
            font-size: 1rem;
          }
          .saver-color-bars.fullscreen {
            font-size: 2rem;
          }
        }

        .colorBar {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        #textOverlay {
          font-size: inherit;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          border-radius: 4px;
          padding: 10px 20px;
          backdrop-filter: blur(4px);
        }

        .text-shadow-lg {
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.9);
        }
      `}</style>
    </motion.section>

    {/* Color Screens Section */}
    <ColorScreensSection />
  </>
  );
} 