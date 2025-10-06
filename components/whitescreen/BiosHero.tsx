"use client";
import { Link as I18nLink } from "@/i18n/routing";
import { motion } from "framer-motion";
import { CheckCircle, Monitor, Play, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface BiosHeroProps {
  onFullscreen: () => void;
  isFullscreen: boolean;
}

export default function BiosHero({ onFullscreen, isFullscreen }: BiosHeroProps) {
  const t = useTranslations("BiosScreen");
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return { hours, minutes, seconds };
  };

  const formatDate = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[date.getDay()];
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return { dayName, month, day, year };
  };

  const { hours, minutes, seconds } = currentTime ? formatTime(currentTime) : { hours: "00", minutes: "00", seconds: "00" };
  const { dayName, month, day, year } = currentTime ? formatDate(currentTime) : { dayName: "Mon", month: "01", day: "01", year: "2024" };

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
    <motion.section
      style={{
        backgroundImage: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%, #ffffff 100%)",
        margin: 0,
      }}
      className="relative grid place-content-center overflow-hidden py-16 md:py-28 2xl:py-40"
    >
      {/* 简洁装饰元素 */}
      <div className="absolute inset-0 overflow-hidden">
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 backdrop-blur-sm border border-gray-200 rounded-full mb-6"
        >
          <Sparkles className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">{t("hero.badge")}</span>
        </motion.div>

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

            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div
                className="w-full h-64 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 relative overflow-hidden"
                onClick={onFullscreen}
              >
                {/* BIOS Preview */}
                <div className="bg-[#CCCCCC] rounded-lg overflow-hidden shadow-2xl border-2 border-gray-700 w-full h-full" style={{ fontFamily: 'monospace', fontSize: '12px', lineHeight: '16px' }}>
                  {/* BIOS Header */}
                  <div className="bg-[#00EEBB] text-black text-center py-1 font-bold text-xs">
                    Phoenix TrustedBios(tm) CMOS Setup Utility
                  </div>

                  {/* Main Menu */}
                  <div className="bg-[#0426EA] text-[#CCCCCC] flex text-xs">
                    <div className="bg-[#CCCCCC] text-[#0426EA] px-3 py-1 font-bold">Main</div>
                    <div className="px-3 py-1">Advanced</div>
                    <div className="px-3 py-1">Security</div>
                    <div className="px-3 py-1">Boot</div>
                    <div className="px-3 py-1">Exit</div>
                  </div>

                  {/* Main Content */}
                  <div className="flex h-32 border-2 border-black bg-[#CCCCCC]">
                    {/* Left Panel */}
                    <div className="w-[65%] border-r-2 border-black p-2 text-black text-xs">
                      <div className="mb-2">
                        <div>Bios Version: 4S4EB8X0.86F</div>
                        <div>Service tag: XXXXX</div>
                      </div>

                      <table className="w-full text-xs">
                        <tbody>
                          <tr className="bg-[#0426EA] text-white">
                            <td className="py-0.5">System Time</td>
                            <td></td>
                            <td suppressHydrationWarning>[{hours}:{minutes}:{seconds}]</td>
                          </tr>
                          <tr className="text-[#0426EA]">
                            <td className="py-0.5">System Date</td>
                            <td></td>
                            <td suppressHydrationWarning>[{dayName} {month}/{day}/{year}]</td>
                          </tr>
                          <tr className="text-[#0426EA]">
                            <td className="py-0.5">▶ Primary IDE Master</td>
                            <td>:</td>
                            <td>[Not Detected]</td>
                          </tr>
                          <tr className="text-[#0426EA]">
                            <td className="py-0.5">▶ SATA1</td>
                            <td>:</td>
                            <td>[HL-DT-ST DVDRW GH]</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Right Panel */}
                    <div className="w-[35%] text-black">
                      <div className="border-b-2 border-black p-2 bg-[#CCCCCC]">
                        <div className="font-bold text-[#0426EA] mb-1 text-xs">Item Specific Help</div>
                      </div>
                      <div className="p-2 text-xs leading-4">
                        Use the keys in the footer to navigate.
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-[#00EEBB] text-black px-2 py-1 flex gap-4 text-xs">
                    <div><span className="text-white">←→</span> Select Menu</div>
                    <div><span className="text-white">↑↓</span> Select Item</div>
                    <div><span className="text-white">Enter</span> Select / Sub-Menu</div>
                    <div><span className="text-white">F9</span> Save and Exit</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-black/20 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                  <Play className="w-4 h-4" />
                  <span className="text-sm">Click for Fullscreen</span>
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
              <h3 className="text-lg font-semibold text-gray-900 font-sans">Choose Screen</h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {colors.map((colorOption) => (
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
              ))}
            </div>

            <p className="text-sm text-gray-600">
              Perfect for pranks, testing, and creative displays
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
            onClick={onFullscreen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Launch BIOS Screen
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
              <feature.icon className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
} 