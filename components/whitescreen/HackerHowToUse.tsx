"use client";
import { useTranslations } from "next-intl";

export default function HackerHowToUse() {
  const t = useTranslations("HackerSimulator");

  const howToUseSteps = [
    {
      title: t("howToUse.steps.0"),
    },
    {
      title: t("howToUse.steps.1"),
    },
    {
      title: t("howToUse.steps.2"),
    },
    {
      title: t("howToUse.steps.3"),
    },
    {
      title: t("howToUse.steps.4"),
    },
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {t("howToUse.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t("howToUse.description")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {howToUseSteps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {step.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
