"use client";

import { useTranslations } from "next-intl";

export default function NoSignalSMPTEColorBarsScreensaverFAQ() {
  const t = useTranslations("NoSignalSMPTEColorBarsScreensaver");

  const faqs = [
    {
      question: t("faq.whatIsSMPTE.question"),
      answer: t("faq.whatIsSMPTE.answer"),
    },
    {
      question: t("faq.howToUse.question"),
      answer: t("faq.howToUse.answer"),
    },
    {
      question: t("faq.fullscreen.question"),
      answer: t("faq.fullscreen.answer"),
    },
    {
      question: t("faq.download.question"),
      answer: t("faq.download.answer"),
    },
    {
      question: t("faq.compatibility.question"),
      answer: t("faq.compatibility.answer"),
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        {t("faq.title")}
      </h2>
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {faq.question}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 