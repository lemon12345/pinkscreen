"use client";
import { FAQItem, FAQItemType } from "@/components/shared/FAQItem";
import { useTranslations } from "next-intl";

export default function WhiteScreenFAQ() {
  const t = useTranslations("WhiteScreen");

  const faqs: FAQItemType[] = t.raw("faq.questions");

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("faq.title")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t("faq.description")}
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
