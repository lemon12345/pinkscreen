"use client";
import { useTranslations } from "next-intl";

export default function UbuntuUpdateScreenUseCases() {
  const t = useTranslations("UbuntuUpdateScreen");

  const useCases = [
    {
      title: t("useCases.pranks.title"),
      description: t("useCases.pranks.description"),
    },
    {
      title: t("useCases.simulation.title"),
      description: t("useCases.simulation.description"),
    },
    {
      title: t("useCases.training.title"),
      description: t("useCases.training.description"),
    },
    {
      title: t("useCases.content.title"),
      description: t("useCases.content.description"),
    },
    {
      title: t("useCases.staging.title"),
      description: t("useCases.staging.description"),
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("useCases.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t("useCases.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {useCase.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 