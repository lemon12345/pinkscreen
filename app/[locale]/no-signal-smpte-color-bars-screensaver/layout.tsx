import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function NoSignalSMPTEColorBarsScreensaverLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NoSignalSMPTEColorBarsScreensaver" });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  );
} 