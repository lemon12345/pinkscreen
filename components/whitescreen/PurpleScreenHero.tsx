"use client";
import { Link as I18nLink } from "@/i18n/routing";
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { CheckCircle, Download, Monitor, Palette, Play, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

interface PurpleScreenHeroProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  onFullscreen: () => void;
  onDownload: () => void;
  onCustomColorChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const COLORS_BACKGROUND = ["#800080", "#9932CC", "#8A2BE2", "#9370DB"];

export default function PurpleScreenHero({
  selectedColor,
  onColorChange,
  onFullscreen,
  onDownload,
  onCustomColorChange,
}: PurpleScreenHeroProps) {
  const t = useTranslations("PurpleScreen");

  const color = useMotionValue(COLORS_BACKGROUND[0]);

  useEffect(() => {
    animate(color, COLORS_BACKGROUND, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)`;

  const colors = [
    { name: t("colors.Purple"), value: "#800080", href: "/purple-screen" },
    { name: t("colors.White"), value: "#FFFFFF", href: "/white-screen" },
    { name: t("colors.Black"), value: "#000000", href: "/black-screen" },
    { name: t("colors.Red"), value: "#FF0000", href: "/red-screen" },
    { name: t("colors.Blue"), value: "#0000FF", href: "/blue-screen" },
    { name: t("colors.Green"), value: "#00FF00", href: "/green-screen" },
    { name: t("colors.Yellow"), value: "#FFFF00", href: "/yellow-screen" },
    { name: t("colors.Pink"), value: "#FFC0CB", href: "/" },
    { name: t("colors.Orange"), value: "#FFA500", href: "/orange-screen" },
    { name: t("colors.Zoom Lighting"), value: "#FFE5B4", href: "/zoom-lighting" }
  ];

  return (
    <motion.section
      className="relative grid place-content-center overflow-hidden py-16 md:py-28 2xl:py-40 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-400/30 dark:bg-purple-300/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-pink-400/30 dark:bg-pink-300/40 rounded-full blur-3xl animate-bounce" />
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-blue-400/30 dark:bg-blue-300/40 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-12"
        >
          <motion.span
            className="inline-flex items-center gap-2 rounded-full bg-purple-600/50 dark:bg-purple-400/30 px-3 py-1.5 text-sm text-purple-100 dark:text-purple-50"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            {t("hero.badge")}
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-4xl bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-50 dark:to-purple-50 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 mb-12 max-w-3xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed text-gray-800 dark:text-white"
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
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="w-5 h-5 text-gray-600 dark:text-white" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Preview</h3>
            </div>

            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div
                className="w-full h-64 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: selectedColor }}
                onClick={onFullscreen}
              >
                <div className="flex items-center gap-2 bg-black/20 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                  <Play className="w-4 h-4" />
                  <span className="text-sm">Click for Fullscreen</span>
                </div>
              </div>

              <button
                onClick={onDownload}
                className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
              >
                <Download className="w-4 h-4 text-gray-600 dark:text-white" />
              </button>
            </div>

            <div className="text-sm text-gray-500 dark:text-white">
              Current: {selectedColor}
            </div>
          </motion.div>

          {/* Color Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gray-600 dark:text-white" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Choose Your Color</h3>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {colors.map((colorOption) => (
                colorOption.href && colorOption.href !== "/purple-screen" ? (
                  <I18nLink
                    key={colorOption.value}
                    href={colorOption.href}
                    className={`p-2 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer block`}
                    title={`Go to ${colorOption.name} page`}
                  >
                    <div
                      className="w-full h-12 rounded-md border border-gray-200 dark:border-gray-700 relative"
                      style={{ backgroundColor: colorOption.value }}
                    >
                      <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                    <div className="text-xs text-center mt-1 text-gray-600 dark:text-white">
                      {colorOption.name}
                    </div>
                  </I18nLink>
                ) : (
                  <motion.button
                    key={colorOption.value}
                    onClick={() => onColorChange(colorOption.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg transition-all duration-200 ${selectedColor === colorOption.value
                      ? "ring-2 ring-blue-500 shadow-lg"
                      : "hover:shadow-md"
                      }`}
                    title={`Select ${colorOption.name}`}
                  >
                    <div
                      className="w-full h-12 rounded-md border border-gray-200 dark:border-gray-700"
                      style={{ backgroundColor: colorOption.value }}
                    />
                    <div className="text-xs text-center mt-1 text-gray-600 dark:text-white">
                      {colorOption.name}
                    </div>
                  </motion.button>
                )
              ))}

              {/* Custom Color Picker */}
              <div className="text-center relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg transition-all duration-200 hover:shadow-md w-full"
                  title="Custom Color Picker"
                >
                  <div className="w-full h-12 rounded-md border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 flex items-center justify-center">
                    <Palette className="w-5 h-5 text-white drop-shadow-sm" />
                  </div>
                  <div className="text-xs text-center mt-1 text-gray-600 dark:text-white">
                    {t("colorPicker.custom")}
                  </div>
                </motion.button>
                <input
                  type="color"
                  className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 opacity-0 cursor-pointer"
                  value={selectedColor}
                  onChange={onCustomColorChange}
                />
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-white">
              Perfect for monitor testing, photography lighting, and presentations
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
            Launch Purple Screen
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
              className="flex items-center gap-2 text-gray-600 dark:text-white"
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
