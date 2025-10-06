"use client";
import { useTranslations } from "next-intl";

export default function UbuntuUpdateScreenHowToUse() {
  const t = useTranslations("UbuntuUpdateScreen");

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
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">{t("howToUse.steps.open")}</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("howToUse.steps.openDescription")}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">{t("howToUse.steps.fullscreen")}</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("howToUse.steps.fullscreenDescription")}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">{t("howToUse.steps.watch")}</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("howToUse.steps.watchDescription")}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">{t("howToUse.steps.use")}</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("howToUse.steps.useDescription")}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  5
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">{t("howToUse.steps.exit")}</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("howToUse.steps.exitDescription")}
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("howToUse.tips.title")}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{t("howToUse.tips.exit")}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{t("howToUse.tips.realistic")}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{t("howToUse.tips.safe")}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{t("howToUse.tips.devices")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
