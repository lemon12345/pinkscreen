import { useTranslations } from "next-intl";

export default function MacOSXUpdateScreenUseCases() {
  const t = useTranslations("MacOSXUpdateScreen");

  const useCases = [
    {
      title: t("useCases.cases.0.title"),
      description: t("useCases.cases.0.description"),
    },
    {
      title: t("useCases.cases.1.title"),
      description: t("useCases.cases.1.description"),
    },
    {
      title: t("useCases.cases.2.title"),
      description: t("useCases.cases.2.description"),
    },
    {
      title: t("useCases.cases.3.title"),
      description: t("useCases.cases.3.description"),
    },
    {
      title: t("useCases.cases.4.title"),
      description: t("useCases.cases.4.description"),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            {t("useCases.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {useCase.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 