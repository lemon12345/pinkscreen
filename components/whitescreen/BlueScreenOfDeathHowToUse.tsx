"use client";

import { useTranslations } from "next-intl";

export default function BlueScreenOfDeathHowToUse() {
  const t = useTranslations("BlueScreenOfDeath");

  const steps = [
    {
      number: "1",
      title: t("howToUse.steps.0"),
      description: t("howToUse.steps.0"),
    },
    {
      number: "2", 
      title: t("howToUse.steps.1"),
      description: t("howToUse.steps.1"),
    },
    {
      number: "3",
      title: t("howToUse.steps.2"), 
      description: t("howToUse.steps.2"),
    },
    {
      number: "4",
      title: t("howToUse.steps.3"),
      description: t("howToUse.steps.3"),
    },
    {
      number: "5",
      title: t("howToUse.steps.4"),
      description: t("howToUse.steps.4"),
    },
    {
      number: "6",
      title: t("howToUse.steps.5"),
      description: t("howToUse.steps.5"),
    },
  ];

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t("howToUse.title")}
        </h2>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-md"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
