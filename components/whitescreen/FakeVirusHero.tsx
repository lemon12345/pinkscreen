"use client";
import { Link as I18nLink } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Play, Shield, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import ColorScreensSection from "./ColorScreensSection";

interface FakeVirusHeroProps {
  onFullscreen: () => void;
  isFullscreen: boolean;
}

export default function FakeVirusHero({ onFullscreen, isFullscreen }: FakeVirusHeroProps) {
  const t = useTranslations("FakeVirusScreen");

  const colors = [
    { name: "Broken Screen", value: "broken-screen", className: "bg-gray-500", href: "/broken-screen" },
    { name: "Blue Screen XP", value: "death-screen-xp", className: "bg-blue-600", href: "/blue-screen-of-death-windows" },
    { name: "Blue Screen 10", value: "death-screen-10", className: "bg-blue-500", href: "/blue-screen-of-death-windows-10" },
    { name: "FBI Warning", value: "fbi-warning", className: "bg-red-600", href: "/fbi-warning" },
    { name: "Fake Virus", value: "fake-virus", className: "bg-red-500", href: "/fake-virus" },
    { name: "No Signal", value: "no-signal", className: "bg-purple-600", href: "/no-signal-smpte-color-bars-screensaver" },
    { name: "Fake DOS", value: "fake-dos", className: "bg-black", href: "/fake-dos" },
    { name: "DVD Screensaver", value: "dvd-screensaver", className: "bg-indigo-600", href: "/dvd-screensaver" },
    { name: "Hacker Typer", value: "hacker-typer", className: "bg-green-600", href: "/hacker-typer" },
  ];

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-50 dark:via-gray-100 dark:to-gray-200 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute inset-0 bg-grid animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-200 text-gray-700 dark:text-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-6 drop-shadow-md">
            <Shield className="w-4 h-4" />
            {t("hero.badge")}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-900 mb-6 leading-tight drop-shadow-lg">
            {t("hero.title")}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed font-medium drop-shadow-md">
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onFullscreen}
              disabled={isFullscreen}
              className="group relative overflow-hidden bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 disabled:bg-gray-600 dark:disabled:bg-gray-700 disabled:cursor-not-allowed px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {t("colorPicker.launchButton")}
            </button>
          </div>
        </div>

        {/* Main Interactive Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-start mb-16"
        >
          {/* Virus Preview - Live Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900 font-mono">Live Preview</h3>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="bg-gradient-to-b from-red-800 to-red-900 rounded-lg overflow-hidden shadow-2xl border-2 border-red-600" style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', lineHeight: '16px', color: '#fff' }}>
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-white font-bold text-sm tracking-wider border-b-2 border-gray-300">
                  Decryptor 2.1
                </div>

                <div className="flex">
                  {/* Sidebar */}
                  <div className="w-1/3 p-4 text-center">
                    <div className="mb-4">
                      <div className="w-16 h-16 mx-auto mb-3 bg-gray-800 rounded-lg flex items-center justify-center">
                        <Shield className="w-8 h-8 text-red-400" />
                      </div>
                      <h3 className="text-yellow-300 font-bold mb-1 text-sm">Hurry!</h3>
                      <p className="text-xs mb-3">Your files will be permanently deleted in:</p>
                      <div className="text-2xl font-mono text-white bg-black/30 rounded px-3 py-1">
                        59:00
                      </div>
                    </div>

                    <div className="bg-yellow-400 text-black p-2 rounded mb-3">
                      <div className="font-bold text-sm">$500</div>
                      <div className="text-xs">only today</div>
                      <div className="font-bold text-lg text-red-600">$399!</div>
                      <div className="text-xs">SALE!</div>
                    </div>

                    <p className="text-xs text-yellow-300 font-bold">Please read the instructions</p>
                  </div>

                  {/* Main Content */}
                  <div className="w-2/3 p-4">
                    <h1 className="text-lg font-bold text-white mb-3">Bad news, your files have been encrypted!</h1>

                    <div className="bg-gray-100 text-black p-3 rounded max-h-32 overflow-y-auto text-xs">
                      <h2 className="font-bold text-yellow-600 mb-1">What Happened To My Computer?</h2>
                      <p className="mb-2">
                        <strong>All your personal data, photos, videos, work files, including your operating system have been encrypted and can be accessed again if you pay a ransome.</strong>
                      </p>

                      <h2 className="font-bold text-yellow-600 mb-1">What Can You Do?</h2>
                      <p className="mb-2">
                        You might be looking for a way to recover your files but don&apos;t waste your time. We use an unbreakable encryption.
                      </p>

                      <h2 className="font-bold text-yellow-600 mb-1">How Do You Pay?</h2>
                      <ol className="list-decimal ml-4 space-y-1">
                        <li>Send <strong>$399 + Tax</strong> worth of <strong>Monopoly Money</strong></li>
                        <li>Send the fee with <strong>PayDude</strong>: just_a_prank@dont-send-money-lol.com</li>
                        <li>We now accept <strong>kidneys</strong>!</li>
                      </ol>

                      <h2 className="font-bold text-yellow-600 mb-1 mt-2">Still Having Trouble</h2>
                      <p>
                        You shouldn&apos;t be worried, your files are safe and you don&apos;t need to pay anything.<br />
                        <strong>This was just a prank :)</strong>
                      </p>
                    </div>

                    <div className="mt-3">
                      <div className="text-white mb-1 text-xs">
                        Send $399 <strong>⇒</strong> Get a key <strong>⇒</strong> Paste your key below <strong>⇒</strong> Click Decrypt
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-xs">Your key:</span>
                        <div className="bg-gray-200 px-2 py-1 w-20 h-5 flex items-center">
                          <div className="w-1 h-3 bg-black animate-pulse"></div>
                        </div>
                        <button className="bg-white text-black px-3 py-1 rounded font-bold text-xs hover:bg-gray-200">
                          Decrypt
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay click hint */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg cursor-pointer" onClick={onFullscreen}>
                <div className="bg-red-600/90 backdrop-blur-sm rounded-lg px-4 py-2 text-white font-semibold shadow-lg text-sm">
                  {t("colorPicker.clickHint")}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Choose Screen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900 font-mono">Choose Screen</h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {colors.map((colorOption) => (
                colorOption.href && colorOption.href !== "/fake-virus" ? (
                  <I18nLink
                    key={colorOption.value}
                    href={colorOption.href}
                    className={`p-2 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer block`}
                    title={`Go to ${colorOption.name} page`}
                  >
                    <div
                      className="w-full h-12 rounded-md border border-gray-300 relative"
                      style={{
                        backgroundColor: colorOption.value === "broken-screen" ? "gray" :
                          colorOption.value === "death-screen-xp" ? "#0078d7" :
                            colorOption.value === "death-screen-10" ? "#0078d7" :
                              colorOption.value === "fbi-warning" ? "#dc2626" :
                                colorOption.value === "fake-virus" ? "#ef4444" :
                                  colorOption.value === "no-signal" ? "#7c3aed" :
                                    colorOption.value === "fake-dos" ? "#000000" :
                                      colorOption.value === "dvd-screensaver" ? "#4f46e5" :
                                        colorOption.value === "hacker-typer" ? "#16a34a" : colorOption.value,
                        backgroundImage: colorOption.value === "broken-screen"
                          ? "url('/fake/broken.webp')"
                          : colorOption.value === "death-screen-xp"
                            ? "url('/fake/death.webp')"
                            : colorOption.value === "death-screen-10"
                              ? "url('/fake/death-10.webp')"
                              : colorOption.value === "fbi-warning"
                                ? "url('/fake/fbi-warning.png')"
                                : colorOption.value === "fake-virus"
                                  ? "url('/fake/fake-virus.png')"
                                  : colorOption.value === "no-signal"
                                    ? "url('/fake/saver-color-bars.png')"
                                    : colorOption.value === "fake-dos"
                                      ? "url('/fake/fake-dos.png')"
                                      : colorOption.value === "dvd-screensaver"
                                        ? "url('/fake/dvd.webp')"
                                        : colorOption.value === "hacker-typer"
                                          ? "url('/fake/bio.png')"
                                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                      }}
                    />
                    <div className="text-xs text-center mt-1 text-gray-700">
                      {colorOption.name}
                    </div>
                  </I18nLink>
                ) : (
                  <motion.button
                    key={colorOption.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg transition-all duration-200 ring-2 ring-blue-500 shadow-lg`}
                    title={`Select ${colorOption.name}`}
                  >
                    <div
                      className="w-full h-12 rounded-md border border-gray-300 relative"
                      style={{
                        backgroundColor: "#ef4444",
                        backgroundImage: "url('/fake/fake-virus.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                      }}
                    />
                    <div className="text-xs text-center mt-1 text-gray-700">
                      {colorOption.name}
                    </div>
                  </motion.button>
                )
              ))}
            </div>

            <p className="text-sm text-gray-600">
              Perfect for pranks, testing, and creative displays
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10 hover:border-white/20 transition-colors">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="text-white font-semibold mb-2">100% Safe</h3>
            <p className="text-gray-400 text-sm">No actual malware</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10 hover:border-white/20 transition-colors">
            <div className="text-3xl mb-3">🎭</div>
            <h3 className="text-white font-semibold mb-2">Realistic Design</h3>
            <p className="text-gray-400 text-sm">Authentic ransomware look</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10 hover:border-white/20 transition-colors">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-white font-semibold mb-2">Educational</h3>
            <p className="text-gray-400 text-sm">Perfect for cybersecurity training</p>
          </div>
        </div>
      </div>
    </section>

    {/* Color Screens Section */}
    <ColorScreensSection />
  </>
  );
} 