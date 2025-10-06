"use client";

import { useTranslations } from "next-intl";
import { Link as I18nLink } from "@/i18n/routing";
import { motion } from "framer-motion";

export default function ColorScreensSection() {
  const t = useTranslations("ColorScreens");

  const colorScreens = [
    {
      href: "/",
      nameKey: "screens.pinkScreen",
      backgroundColor: "#FFC0CB"
    },
    {
      href: "/blue-screen",
      nameKey: "screens.blueScreen",
      backgroundColor: "#0000FF"
    },
    {
      href: "/red-screen",
      nameKey: "screens.redScreen",
      backgroundColor: "#FF0000"
    },
    {
      href: "/green-screen",
      nameKey: "screens.greenScreen",
      backgroundColor: "#00FF00"
    },
    {
      href: "/yellow-screen",
      nameKey: "screens.yellowScreen",
      backgroundColor: "#FFFF00"
    },
    {
      href: "/orange-screen",
      nameKey: "screens.orangeScreen",
      backgroundColor: "#FFA500"
    },
    {
      href: "/purple-screen",
      nameKey: "screens.purpleScreen",
      backgroundColor: "#800080"
    },
    {
      href: "/black-screen",
      nameKey: "screens.blackScreen",
      backgroundColor: "#000000"
    },
    {
      href: "/white-screen",
      nameKey: "screens.whiteScreen",
      backgroundColor: "#FFFFFF"
    },
    {
      href: "/zoom-lighting",
      nameKey: "screens.zoomLighting",
      backgroundColor: "#FFE5B4"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-blue-500"></div>
            {t("badge")}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6">
            {t("title")}
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {colorScreens.map((screen, index) => (
            <motion.div
              key={screen.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <I18nLink
                href={screen.href}
                className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="relative">
                  <div 
                    className="w-full h-32 flex items-center justify-center"
                    style={{ backgroundColor: screen.backgroundColor }}
                  >
                    <div className={`text-2xl font-bold ${screen.backgroundColor === "#FFFFFF" ? 'text-gray-900' : 'text-white'}`}>
                      {t(screen.nameKey).charAt(0)}
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
                
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {t(screen.nameKey)}
                  </h3>
                </div>
              </I18nLink>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("footer.description")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
