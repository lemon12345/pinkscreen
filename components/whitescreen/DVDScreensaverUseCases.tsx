"use client";

import { useTranslations } from "next-intl";

export default function DVDScreensaverUseCases() {
  const t = useTranslations("DVDScreensaver");

  const useCases = [
    {
      title: t("useCases.case1.title"),
      description: t("useCases.case1.description"),
    },
    {
      title: t("useCases.case2.title"),
      description: t("useCases.case2.description"),
    },
    {
      title: t("useCases.case3.title"),
      description: t("useCases.case3.description"),
    },
    {
      title: t("useCases.case4.title"),
      description: t("useCases.case4.description"),
    },
    {
      title: t("useCases.case5.title"),
      description: t("useCases.case5.description"),
    },
    {
      title: t("useCases.case6.title"),
      description: t("useCases.case6.description"),
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        {t("useCases.title")}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {useCase.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {useCase.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
} 