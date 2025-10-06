"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Monitor, MousePointer, Eye, Settings, Power } from "lucide-react";

export default function DVDScreensaverHowToUse() {
  const t = useTranslations("DVDScreensaver");

  const steps = [
    {
      icon: Monitor,
      title: "Open the page",
      description: t("howToUse.steps.0")
    },
    {
      icon: MousePointer,
      title: "Go full screen",
      description: t("howToUse.steps.1")
    },
    {
      icon: Eye,
      title: "Watch the animation",
      description: t("howToUse.steps.2")
    },
    {
      icon: Settings,
      title: "Use as screensaver",
      description: t("howToUse.steps.3")
    },
    {
      icon: Power,
      title: "Exit anytime",
      description: t("howToUse.steps.4")
    }
  ];

  const tips = [
    "Press F11 or ESC to exit fullscreen mode",
    "Adjust the DVD logo size and speed for different effects",
    "Perfect for presentations, waiting rooms, and entertainment",
    "Works on all modern browsers and devices"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Monitor className="w-4 h-4" />
            Step-by-Step Guide
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6">
            {t("howToUse.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Follow these simple steps to enjoy the classic DVD screensaver experience
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Step-by-Step Guide */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Monitor className="w-4 h-4 text-white" />
              </div>
              Step-by-Step Guide
            </h3>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              Quick Tips
            </h3>
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {tip}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Additional Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white shadow-xl"
            >
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Power className="w-5 h-5" />
                Pro Tip
              </h4>
              <p className="text-blue-100 leading-relaxed">
                For the best experience, use a desktop or smart TV in full-screen mode. The larger the screen, the more nostalgic the effect!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
