"use client";

import { useTranslations } from "next-intl";

export default function Windows11UpdateScreenFAQ() {
  const t = useTranslations("Windows11UpdateScreen");

  const faqs = [
    {
      key: "whatIs",
      icon: "❓",
    },
    {
      key: "safe",
      icon: "🔒",
    },
    {
      key: "howToUse",
      icon: "🖱️",
    },
    {
      key: "pranks",
      icon: "😄",
    },
    {
      key: "realistic",
      icon: "🎯",
    },
    {
      key: "otherScreens",
      icon: "🖥️",
    },
    {
      key: "exit",
      icon: "🚪",
    },
    {
      key: "mobile",
      icon: "📱",
    },
    {
      key: "privacy",
      icon: "🛡️",
    },
    {
      key: "difference",
      icon: "⚖️",
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.key}
              className="bg-white rounded-lg p-6 shadow-md border border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl">{faq.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    {t(`faq.${faq.key}.question`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`faq.${faq.key}.answer`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 