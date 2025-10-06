"use client";
import { useTranslations } from "next-intl";

export default function UbuntuUpdateScreenFAQ() {
  const t = useTranslations("UbuntuUpdateScreen");

  const faqs = [
    {
      question: t("faq.whatIs.question"),
      answer: t("faq.whatIs.answer"),
    },
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
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
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
              className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 