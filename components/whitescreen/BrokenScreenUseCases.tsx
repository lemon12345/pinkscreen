"use client";
import { useTranslations } from "next-intl";

export default function BrokenScreenUseCases() {
  const t = useTranslations("BrokenScreen");

  const useCases = [
    {
      icon: "😱",
      title: t("useCases.cases.0.title"),
      description: t("useCases.cases.0.description"),
    },
    {
      icon: "🎬",
      title: t("useCases.cases.1.title"),
      description: t("useCases.cases.1.description"),
    },
    {
      icon: "🧪",
      title: t("useCases.cases.2.title"),
      description: t("useCases.cases.2.description"),
    },
    {
      icon: "🎨",
      title: t("useCases.cases.3.title"),
      description: t("useCases.cases.3.description"),
    },
    {
      icon: "📚",
      title: t("useCases.cases.4.title"),
      description: t("useCases.cases.4.description"),
    },
    {
      icon: "📱",
      title: t("useCases.cases.5.title"),
      description: t("useCases.cases.5.description"),
    },
    {
      icon: "🎃",
      title: t("useCases.cases.6.title"),
      description: t("useCases.cases.6.description"),
    },
  ];

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {t("useCases.title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t("useCases.description")}
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-4">{useCase.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
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
