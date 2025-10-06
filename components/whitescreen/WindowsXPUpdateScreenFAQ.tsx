"use client";

import { useTranslations } from "next-intl";

export default function WindowsXPUpdateScreenFAQ() {
  const t = useTranslations("WindowsXPUpdateScreen");

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          {t("faq.title")}
        </h2>
        <div className="space-y-6">
          {[
            { key: "whatIs", question: "faq.whatIs.question", answer: "faq.whatIs.answer" },
            { key: "safe", question: "faq.safe.question", answer: "faq.safe.answer" },
            { key: "pranks", question: "faq.pranks.question", answer: "faq.pranks.answer" },
            { key: "exit", question: "faq.exit.question", answer: "faq.exit.answer" },
            { key: "content", question: "faq.content.question", answer: "faq.content.answer" },
            { key: "real", question: "faq.real.question", answer: "faq.real.answer" },
            { key: "devices", question: "faq.devices.question", answer: "faq.devices.answer" }
          ].map((item) => (
            <div key={item.key} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t(item.question)}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t(item.answer)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 