"use client";

import { useTranslations } from "next-intl";

export default function Windows11UpdateScreenUseCases() {
  const t = useTranslations("Windows11UpdateScreen");

  const useCases = [
    {
      key: "simulate",
      icon: "🔧",
    },
    {
      key: "engage",
      icon: "🎯",
    },
    {
      key: "education",
      icon: "📚",
    },
    {
      key: "content",
      icon: "🎬",
    },
    {
      key: "prank",
      icon: "😄",
    },
    {
      key: "ux",
      icon: "🎨",
    },
    {
      key: "recovery",
      icon: "🔄",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("useCases.title")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("useCases.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase) => (
            <div
              key={useCase.key}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-4">{useCase.icon}</div>
              <h3 className="text-xl font-semibold mb-3">
                {t(`useCases.${useCase.key}.title`)}
              </h3>
              <p className="text-gray-600">
                {t(`useCases.${useCase.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 