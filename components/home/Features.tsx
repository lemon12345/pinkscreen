"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Eye, Monitor, Palette, Smartphone, TestTube, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const screenFeatures = [
  {
    id: "white-screen",
    icon: Monitor,
    href: "/",
    color: "bg-white",
    borderColor: "border-gray-300"
  },
  {
    id: "color-screens",
    icon: Palette,
    href: "/red-screen",
    color: "bg-gradient-to-r from-red-500 to-blue-500",
    borderColor: "border-blue-500"
  },
  {
    id: "screen-testing",
    icon: TestTube,
    href: "/broken-screen",
    color: "bg-gradient-to-r from-gray-800 to-black",
    borderColor: "border-gray-600"
  },
  {
    id: "screensavers",
    icon: Zap,
    href: "/matrix-screensaver",
    color: "bg-gradient-to-r from-green-600 to-black",
    borderColor: "border-green-500"
  },
  {
    id: "display-tools",
    icon: Eye,
    href: "/zoom-lighting",
    color: "bg-gradient-to-r from-yellow-400 to-orange-500",
    borderColor: "border-orange-500"
  },
  {
    id: "mobile-friendly",
    icon: Smartphone,
    href: "/",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    borderColor: "border-purple-500"
  }
];

export default function AIFeatures() {
  const t = useTranslations("Home");

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Professional Screen Tools
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Complete collection of online screen utilities for testing, presentations, gaming, and creative projects
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {screenFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={feature.href}>
                  <div className={`relative p-8 rounded-2xl border-2 ${feature.borderColor} bg-white hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 cursor-pointer`}>
                    {/* Feature Preview */}
                    <div className={`w-full h-32 rounded-lg mb-6 ${feature.color} border-2 ${feature.borderColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>

                    {/* Feature Info */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900 capitalize">
                        {feature.id.replace('-', ' ')}
                      </h3>
                      <p className="text-gray-600">
                        {feature.id === "white-screen" && "Clean white background for display testing, presentations, and calibration"}
                        {feature.id === "color-screens" && "Full spectrum of colored screens - red, blue, green, yellow, and more"}
                        {feature.id === "screen-testing" && "Test your display with broken screen effects and diagnostic tools"}
                        {feature.id === "screensavers" && "Animated screensavers including Matrix rain, DVD bounce, and flip clocks"}
                        {feature.id === "display-tools" && "Professional lighting tools for video calls and photography"}
                        {feature.id === "mobile-friendly" && "Optimized for all devices - desktop, tablet, and mobile"}
                      </p>

                      {/* Action Button */}
                      <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                        Try Now
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link href="/" className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            <Monitor className="w-5 h-5 mr-2" />
            Explore All Screen Tools
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
