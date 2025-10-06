"use client";
import { useTranslations } from "next-intl";

export default function FakeVirusUseCases() {
  const t = useTranslations("FakeVirusScreen");

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("useCases.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("useCases.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.raw("useCases.cases").map((useCase: any, index: number) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors hover:shadow-lg"
            >
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {useCase.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 