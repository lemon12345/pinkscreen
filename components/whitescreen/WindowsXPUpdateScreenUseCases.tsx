"use client";

import { useTranslations } from "next-intl";

export default function WindowsXPUpdateScreenUseCases() {
  const t = useTranslations("WindowsXPUpdateScreen");

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          {t("useCases.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t(`useCases.case${index}.title`)}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t(`useCases.case${index}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 