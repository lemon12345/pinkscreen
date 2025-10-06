"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function BiosHowToUse() {
  const t = useTranslations("BiosScreen");

  const steps = [
    {
      icon: "🖥️",
      title: t("howToUse.steps.0.title"),
      description: t("howToUse.steps.0.description"),
    },
    {
      icon: "⌨️",
      title: t("howToUse.steps.1.title"),
      description: t("howToUse.steps.1.description"),
    },
    {
      icon: "🔄",
      title: t("howToUse.steps.2.title"),
      description: t("howToUse.steps.2.description"),
    },
    {
      icon: "🚪",
      title: t("howToUse.steps.3.title"),
      description: t("howToUse.steps.3.description"),
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("howToUse.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("howToUse.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{step.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              💡 {t("howToUse.tip.title")}
            </h3>
            <p className="text-blue-700 dark:text-blue-200">
              {t("howToUse.tip.description")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
