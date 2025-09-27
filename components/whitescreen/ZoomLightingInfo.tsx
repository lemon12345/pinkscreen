import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles, Download } from "lucide-react";
import Image from "next/image";

interface ZoomLightingInfoProps {
  onDownload: () => void;
  onDownload4K: () => void;
  selectedColor: string;
}

export default function ZoomLightingInfo({ onDownload, onDownload4K, selectedColor }: ZoomLightingInfoProps) {
  const t = useTranslations("ZoomLighting");

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-300/10 to-yellow-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" />
              {t("info.professionalTool")}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent mb-4">
              {t("info.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t("info.subtitle")}
            </p>
          </motion.div>
          
          {/* Download Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-r from-white to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-xl border border-orange-100 dark:border-orange-800/50 backdrop-blur-sm mb-16"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-lg">
                <Download className="w-4 h-4" />
                {t("info.downloadReady")}
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                {t("info.downloadTitle")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("info.downloadDescription")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="group text-center"
              >
                <div className="bg-orange-50 dark:bg-gray-900/20 rounded-xl p-6 mb-6 border border-orange-200 dark:border-gray-700 group-hover:shadow-lg transition-all duration-300">
                  <div className="w-full h-40 rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <Image
                      src="/color-screen/zoomlighting.png"
                      alt="Zoom Lighting HD Preview"
                      width={400}
                      height={160}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t("info.hdTitle")}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {t("info.hdDescription")}
                  </p>
                  <motion.button 
                    onClick={onDownload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                  >
                    <Download className="w-5 h-5" />
                    {t("info.hdButton")}
                  </motion.button>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="group text-center"
              >
                <div className="bg-orange-50 dark:bg-gray-900/20 rounded-xl p-6 mb-6 border border-orange-200 dark:border-gray-700 group-hover:shadow-lg transition-all duration-300">
                  <div className="w-full h-40 rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <Image
                      src="/color-screen/zoomlighting-4k.png"
                      alt="Zoom Lighting 4K Preview"
                      width={400}
                      height={160}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t("info.fourKTitle")}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {t("info.fourKDescription")}
                  </p>
                  <motion.button 
                    onClick={onDownload4K}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                  >
                    <Download className="w-5 h-5" />
                    {t("info.fourKButton")}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Pro Tip */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-900/20 dark:to-gray-800/20 rounded-2xl p-8 border border-orange-200 dark:border-orange-700 shadow-lg backdrop-blur-sm">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-lg">
                <Sparkles className="w-4 h-4" />
                {t("info.proTipBadge")}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t("info.proTipTitle")}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t("info.proTipDescription")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 