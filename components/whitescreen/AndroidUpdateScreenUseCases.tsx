import { useTranslations } from "next-intl";

export default function AndroidUpdateScreenUseCases() {
  const t = useTranslations("AndroidUpdateScreen");

  const useCases = [
    {
      title: t("useCases.simulate.title"),
      description: t("useCases.simulate.description"),
    },
    {
      title: t("useCases.engage.title"),
      description: t("useCases.engage.description"),
    },
    {
      title: t("useCases.education.title"),
      description: t("useCases.education.description"),
    },
    {
      title: t("useCases.content.title"),
      description: t("useCases.content.description"),
    },
    {
      title: t("useCases.prank.title"),
      description: t("useCases.prank.description"),
    },
    {
      title: t("useCases.ux.title"),
      description: t("useCases.ux.description"),
    },
    {
      title: t("useCases.recovery.title"),
      description: t("useCases.recovery.description"),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("useCases.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("useCases.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
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
      </div>
    </div>
  );
} 