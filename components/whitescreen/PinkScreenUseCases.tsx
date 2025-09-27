"use client";
import { useTranslations } from "next-intl";

export default function PinkScreenUseCases() {
  const t = useTranslations("PinkScreen");

  const useCases = [
    {
      icon: "🎨",
      title: t("useCases.cases.0.title"),
      description: t("useCases.cases.0.description")
    },
    {
      icon: "👁️",
      title: t("useCases.cases.1.title"),
      description: t("useCases.cases.1.description")
    },
    {
      icon: "🎥",
      title: t("useCases.cases.2.title"),
      description: t("useCases.cases.2.description")
    },
    {
      icon: "👶",
      title: t("useCases.cases.3.title"),
      description: t("useCases.cases.3.description")
    },
    {
      icon: "💻",
      title: t("useCases.cases.4.title"),
      description: t("useCases.cases.4.description")
    },
    {
      icon: "🎨",
      title: t("useCases.cases.5.title"),
      description: t("useCases.cases.5.description")
    },
    {
      icon: "👁️",
      title: t("useCases.cases.6.title"),
      description: t("useCases.cases.6.description")
    },
    {
      icon: "🧪",
      title: t("useCases.cases.7.title"),
      description: t("useCases.cases.7.description")
    }
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("useCases.title")}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("useCases.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((item, index) => (
            <div key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
