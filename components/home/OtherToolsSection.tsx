"use client";
import { Link as I18nLink } from "@/i18n/routing";
import { motion } from "framer-motion";
import { 
  Monitor, 
  Globe
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function OtherToolsSection() {
  const t = useTranslations("OtherTools");

  // 非颜色屏的工具链接
  const otherTools = [
    {
      href: "/bios",
      nameKey: "tools.bios.name",
      descriptionKey: "tools.bios.description",
      image: "/fake/bios.jpg",
      categoryKey: "categories.systemSimulation"
    },
    {
      href: "/fake-windows-11-update",
      nameKey: "tools.fakeWindows11Update.name",
      descriptionKey: "tools.fakeWindows11Update.description",
      image: "/fake/windows-11-update-screen.webp",
      categoryKey: "categories.systemSimulation"
    },
    {
      href: "/fake-windows-10-update-screen",
      nameKey: "tools.fakeWindows10Update.name",
      descriptionKey: "tools.fakeWindows10Update.description",
      image: "/fake/windows-10-update-screen.webp",
      categoryKey: "categories.systemSimulation"
    },
    {
      href: "/fake-windows-xp-update-screen",
      nameKey: "tools.fakeWindowsXpUpdate.name",
      descriptionKey: "tools.fakeWindowsXpUpdate.description",
      image: "/fake/windows-xp-update-screen.webp",
      categoryKey: "categories.systemSimulation"
    },
    {
      href: "/fake-mac-os-x-update-screen",
      nameKey: "tools.fakeMacOsXUpdate.name",
      descriptionKey: "tools.fakeMacOsXUpdate.description",
      image: "/fake/mac-os-x-update-screen.webp",
      categoryKey: "categories.systemSimulation"
    },
    {
      href: "/fake-ubuntu-update",
      nameKey: "tools.fakeUbuntuUpdate.name",
      descriptionKey: "tools.fakeUbuntuUpdate.description",
      image: "/fake/ubuntu-22-04-update-screen.webp",
      categoryKey: "categories.systemSimulation"
    },
    {
      href: "/fake-android-update-screen",
      nameKey: "tools.fakeAndroidUpdate.name",
      descriptionKey: "tools.fakeAndroidUpdate.description",
      image: "/fake/android-update-screen.webp",
      categoryKey: "categories.systemSimulation"
    },
    {
      href: "/fake-dos",
      nameKey: "tools.fakeDos.name",
      descriptionKey: "tools.fakeDos.description",
      image: "/fake/fake-dos.png",
      categoryKey: "categories.systemSimulation"
    },
    {
      href: "/fake-virus",
      nameKey: "tools.fakeVirus.name",
      descriptionKey: "tools.fakeVirus.description",
      image: "/fake/fake-virus.png",
      categoryKey: "categories.systemSimulation"
    },
    {
      href: "/fbi-warning",
      nameKey: "tools.fbiWarning.name",
      descriptionKey: "tools.fbiWarning.description",
      image: "/fake/fbi-warning.png",
      categoryKey: "categories.systemSimulation"
    },
    {
      href: "/dvd-screensaver",
      nameKey: "tools.dvdScreensaver.name",
      descriptionKey: "tools.dvdScreensaver.description",
      image: "/fake/dvd.webp",
      categoryKey: "categories.screensaver"
    },
    {
      href: "/broken-screen",
      nameKey: "tools.brokenScreen.name",
      descriptionKey: "tools.brokenScreen.description",
      image: "/fake/broken.webp",
      categoryKey: "categories.effects"
    },
    {
      href: "/blue-screen-of-death-windows",
      nameKey: "tools.blueScreenOfDeath.name",
      descriptionKey: "tools.blueScreenOfDeath.description",
      image: "/fake/death.webp",
      categoryKey: "categories.systemSimulation"
    },
    {
      href: "/hacker-typer",
      nameKey: "tools.hackerTyper.name",
      descriptionKey: "tools.hackerTyper.description",
      image: "/fake/bio.png",
      categoryKey: "categories.systemSimulation"
    },
    {
      href: "/no-signal-smpte-color-bars-screensaver",
      nameKey: "tools.noSignalScreensaver.name",
      descriptionKey: "tools.noSignalScreensaver.description",
      image: "/fake/saver-color-bars.png",
      categoryKey: "categories.screensaver"
    }
  ];

  // 所有工具放在一起，不分组

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            {t("badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        {/* 所有工具统一展示 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {otherTools.map((tool, toolIndex) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + toolIndex * 0.05, duration: 0.6 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <I18nLink
                href={tool.href}
                className="group block"
              >
                <div className="space-y-3">
                  {/* 屏幕截图卡片 */}
                  <div className="relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
                    {tool.image ? (
                      <img 
                        src={tool.image} 
                        alt={t(tool.nameKey)}
                        className="w-full h-32 object-cover"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                        <Monitor className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* 标签 */}
                  <div className="text-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 underline decoration-2 underline-offset-2 decoration-blue-500 group-hover:decoration-blue-600 transition-colors duration-200">
                      {t(tool.nameKey)}
                    </span>
                  </div>
                </div>
              </I18nLink>
            </motion.div>
          ))}
        </div>

        {/* 底部说明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("footer.description")}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}