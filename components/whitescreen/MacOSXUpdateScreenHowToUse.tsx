"use client";
import { useTranslations } from "next-intl";

export default function MacOSXUpdateScreenHowToUse() {
  const t = useTranslations("MacOSXUpdateScreen");

  const steps = [
    {
      title: t("howToUse.steps.open"),
      description: t("howToUse.steps.openDescription"),
    },
    {
      title: t("howToUse.steps.fullscreen"),
      description: t("howToUse.steps.fullscreenDescription"),
    },
    {
      title: t("howToUse.steps.watch"),
      description: t("howToUse.steps.watchDescription"),
    },
    {
      title: t("howToUse.steps.use"),
      description: t("howToUse.steps.useDescription"),
    },
    {
      title: t("howToUse.steps.exit"),
      description: t("howToUse.steps.exitDescription"),
    },
  ];

  const tips = [
    t("howToUse.tips.exit"),
    t("howToUse.tips.realistic"),
    t("howToUse.tips.safe"),
    t("howToUse.tips.devices"),
  ];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("howToUse.title")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t("howToUse.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Step-by-Step Guide</h3>
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {step.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("howToUse.tips.title")}</h3>
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
