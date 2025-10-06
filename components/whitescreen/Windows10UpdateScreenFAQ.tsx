import { useTranslations } from "next-intl";

export default function Windows10UpdateScreenFAQ() {
  const t = useTranslations("Windows10UpdateScreen");

  const faqs = [
    {
      question: t("faq.safe.question"),
      answer: t("faq.safe.answer"),
    },
    {
      question: t("faq.pranks.question"),
      answer: t("faq.pranks.answer"),
    },
    {
      question: t("faq.exit.question"),
      answer: t("faq.exit.answer"),
    },
    {
      question: t("faq.devices.question"),
      answer: t("faq.devices.answer"),
    },
    {
      question: t("faq.real.question"),
      answer: t("faq.real.answer"),
    },
    {
      question: t("faq.content.question"),
      answer: t("faq.content.answer"),
    },
    {
      question: t("faq.windows11.question"),
      answer: t("faq.windows11.answer"),
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 