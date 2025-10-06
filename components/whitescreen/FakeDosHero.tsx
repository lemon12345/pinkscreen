"use client";
import { Link as I18nLink } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Monitor, Play, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import ColorScreensSection from "./ColorScreensSection";

interface FakeDosHeroProps {
  onFullscreen: () => void;
  isFullscreen: boolean;
}

export default function FakeDosHero({ onFullscreen, isFullscreen }: FakeDosHeroProps) {
  const t = useTranslations("FakeDosScreen");

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
      <section className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-50 dark:via-gray-100 dark:to-gray-200 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute inset-0 bg-grid animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-200 text-gray-700 dark:text-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-6 drop-shadow-md">
            <Monitor className="w-4 h-4" />
            {t("hero.badge")}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-900 mb-6 leading-tight drop-shadow-lg">
            {t("hero.title")}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed font-medium drop-shadow-md">
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onFullscreen}
              disabled={isFullscreen}
              className="group relative overflow-hidden bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 disabled:bg-gray-600 dark:disabled:bg-gray-700 disabled:cursor-not-allowed px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {t("colorPicker.launchButton")}
            </button>
          </div>
        </div>

        {/* Main Interactive Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-start mb-16"
        >
          {/* DOS Preview - Live Interface */}
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

            <div className="relative max-w-4xl mx-auto">
              <div className="bg-black rounded-lg overflow-hidden shadow-2xl border-2 border-gray-700" style={{ fontFamily: 'monospace', fontSize: '12px', lineHeight: '16px', color: '#fff' }}>
                <div className="p-4">
                  <div className="mb-3">
                    Microsoft Windows [Version 10.0.14393]<br />
                    (c) 2017 Microsoft Corporation. All rights reserved.<br />
                    <br />
                    C:\&gt;<span className="animate-pulse bg-white text-black px-1">_</span>
                  </div>

                  <div className="text-red-400 mb-3">
                    WARNING, ALL DATA ON NON-REMOVABLE DISK<br />
                    DRIVE C: WILL BE LOST!
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="border-2 border-white px-2 py-1">
                      <div className="flex">
                        {'█'.repeat(12)}{'░'.repeat(3)}
                      </div>
                    </div>
                  </div>

                  <div>
                    Formatting C: <br />
                    <span className="text-yellow-400">85</span>% complete
                  </div>

                  <div className="mt-4 text-gray-400 text-xs">
                    FDISK Options<br />
                    Successfully Erased Disk Drives: 1<br />
                    <br />
                    Choose one of the following:<br />
                    1. Create Dos partition of Logical DOS Drive<br />
                    2. Set active partition<br />
                    3. Delete partition or Logical DOS Drive<br />
                    4. Display partition information
                  </div>
                </div>
              </div>

              {/* Overlay click hint */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg cursor-pointer" onClick={onFullscreen}>
                <div className="bg-red-600/90 backdrop-blur-sm rounded-lg px-4 py-2 text-white font-semibold shadow-lg text-sm">
                  {t("colorPicker.clickHint")}
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
                colorOption.href && colorOption.href !== "/fake-dos" ? (
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
                        backgroundColor: "#000000",
                        backgroundImage: "url('/fake/fake-dos.png')",
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

            <p className="text-sm text-gray-600">
              Perfect for pranks, testing, and creative displays
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10 hover:border-white/20 transition-colors">
            <div className="text-3xl mb-3">😂</div>
            <h3 className="text-white font-semibold mb-2">Harmless Prank</h3>
            <p className="text-gray-400 text-sm">100% safe simulation</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10 hover:border-white/20 transition-colors">
            <div className="text-3xl mb-3">🎭</div>
            <h3 className="text-white font-semibold mb-2">Realistic Effect</h3>
            <p className="text-gray-400 text-sm">Authentic DOS interface</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10 hover:border-white/20 transition-colors">
            <div className="text-3xl mb-3">🎪</div>
            <h3 className="text-white font-semibold mb-2">Entertainment</h3>
            <p className="text-gray-400 text-sm">Perfect for social media</p>
          </div>
        </div>
      </div>
    </section>

    {/* Color Screens Section */}
    <ColorScreensSection />
  </>
  );
} 