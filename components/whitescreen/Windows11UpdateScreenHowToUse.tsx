"use client";
import { useTranslations } from "next-intl";
import { CheckCircle, Clock, Monitor, Settings, Zap } from "lucide-react";

export default function Windows11UpdateScreenHowToUse() {
  const t = useTranslations("Windows11UpdateScreen");

  const steps = [
    {
      icon: Clock,
      titleKey: "howToUse.steps.chooseDuration.title",
      descriptionKey: "howToUse.steps.chooseDuration.description"
    },
    {
      icon: Settings,
      titleKey: "howToUse.steps.setStartingPercentage.title",
      descriptionKey: "howToUse.steps.setStartingPercentage.description"
    },
    {
      icon: Monitor,
      titleKey: "howToUse.steps.selectWindowsVersion.title",
      descriptionKey: "howToUse.steps.selectWindowsVersion.description"
    },
    {
      icon: Zap,
      titleKey: "howToUse.steps.startSimulation.title",
      descriptionKey: "howToUse.steps.startSimulation.description"
    }
  ];

  const features = [
    {
      titleKey: "howToUse.features.realisticAnimation.title",
      descriptionKey: "howToUse.features.realisticAnimation.description"
    },
    {
      titleKey: "howToUse.features.customizableSettings.title",
      descriptionKey: "howToUse.features.customizableSettings.description"
    },
    {
      titleKey: "howToUse.features.fullscreenMode.title",
      descriptionKey: "howToUse.features.fullscreenMode.description"
    },
    {
      titleKey: "howToUse.features.deviceCompatibility.title",
      descriptionKey: "howToUse.features.deviceCompatibility.description"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t("howToUse.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t("howToUse.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{t("howToUse.stepByStepTitle")}</h3>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {t(step.titleKey)}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t(step.descriptionKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{t("howToUse.keyFeaturesTitle")}</h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-blue-100 dark:border-gray-600">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {t(feature.titleKey)}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t(feature.descriptionKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold">
            <Zap className="w-5 h-5" />
            <span>{t("howToUse.footer.title")}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            {t("howToUse.footer.description")}
          </p>
        </div>
      </div>
    </section>
  );
}
