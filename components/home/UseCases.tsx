"use client";

import { motion } from "framer-motion";
import { Camera, Gamepad, Monitor, Presentation, TestTube, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const useCases = [
  {
    id: "display-testing",
    icon: TestTube,
    title: "Display Testing & Calibration",
    description: "Test monitors for dead pixels, color accuracy, and display uniformity using our comprehensive screen tools.",
    image: "/22/image/prank/broken.webp",
    stats: "Used by 50K+ tech professionals"
  },
  {
    id: "presentations",
    icon: Presentation,
    title: "Professional Presentations",
    description: "Clean backgrounds and color screens perfect for presentations, streaming, and video conferencing.",
    image: "/22/image/saver/motivational-quote.webp",
    stats: "Trusted by educators worldwide"
  },
  {
    id: "gaming-streaming",
    icon: Gamepad,
    title: "Gaming & Streaming",
    description: "Create immersive backgrounds and screen effects for gaming setups and live streaming.",
    image: "/22/image/saver/matrix.webp",
    stats: "Popular among streamers"
  },
  {
    id: "photography",
    icon: Camera,
    title: "Photography & Video",
    description: "Professional lighting tools and colored backgrounds for photography and video production.",
    image: "/22/zoom-lighting.webp",
    stats: "Used by content creators"
  },
  {
    id: "entertainment",
    icon: Monitor,
    title: "Entertainment & Relaxation",
    description: "Screensavers, ambient screens, and relaxing displays for entertainment and ambiance.",
    image: "/22/image/saver/dvd.webp",
    stats: "Millions of views monthly"
  },
  {
    id: "team-collaboration",
    icon: Users,
    title: "Team Collaboration",
    description: "Screen sharing tools and visual aids for remote teams and collaborative work sessions.",
    image: "/22/image/fake/windows-10-update-screen.webp",
    stats: "Adopted by remote teams"
  }
];

export default function UseCases() {
  const t = useTranslations("Home");

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Trusted by Professionals Worldwide
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            See how different industries and professionals use our screen tools for their daily work
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            return (
              <motion.div
                key={useCase.id}
                className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Image Preview */}
                <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
                  <Image
                    src={useCase.image}
                    alt={useCase.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to a gradient background if image fails to load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {useCase.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm text-blue-600 font-medium">
                      {useCase.stats}
                    </span>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      <span className="text-sm">Learn More</span>
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Statistics */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Monthly Users", value: "2M+" },
            { label: "Screen Tools", value: "25+" },
            { label: "Countries", value: "150+" },
            { label: "Uptime", value: "99.9%" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
