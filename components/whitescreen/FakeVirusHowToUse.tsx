"use client";

import { useTranslations } from "next-intl";

export default function FakeVirusHowToUse() {
  const t = useTranslations("FakeVirusScreen");

  const steps = [
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
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t("howToUse.title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {`${index + 1}. ${step.title}`}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
