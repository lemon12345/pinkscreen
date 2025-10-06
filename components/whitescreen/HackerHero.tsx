"use client";
import { Link as I18nLink } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Play, Terminal } from "lucide-react";
import { useTranslations } from "next-intl";
import ColorScreensSection from "./ColorScreensSection";

interface HackerHeroProps {
  onFullscreen: () => void;
  isFullscreen: boolean;
}

export default function HackerHero({ onFullscreen, isFullscreen }: HackerHeroProps) {
  const t = useTranslations("HackerSimulator");

  const colors = [
    { name: "Broken Screen", value: "broken-screen", className: "bg-gray-500", href: "/broken-screen" },
    { name: "Blue Screen XP", value: "death-screen-xp", className: "bg-blue-600", href: "/blue-screen-of-death-windows" },
    { name: "Blue Screen 10", value: "death-screen-10", className: "bg-blue-500", href: "/blue-screen-of-death-windows-10" },
    { name: "FBI Warning", value: "fbi-warning", className: "bg-red-600", href: "/fbi-warning" },
    { name: "Fake Virus", value: "fake-virus", className: "bg-red-500", href: "/fake-virus" },
    { name: "No Signal", value: "no-signal", className: "bg-purple-600", href: "/no-signal-smpte-color-bars-screensaver" },
    { name: "Fake DOS", value: "fake-dos", className: "bg-black", href: "/fake-dos" },
    { name: "DVD Screensaver", value: "dvd-screensaver", className: "bg-indigo-600", href: "/dvd-screensaver" },
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
            <Terminal className="w-4 h-4" />
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
          className="w-full max-w-7xl grid lg:grid-cols-[2fr_1fr] gap-8 items-start mb-16"
        >
          {/* Hacker Preview - Live Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900 font-mono">Live Preview</h3>
            </div>

            {/* Preview Area - Hacker Theme */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-2xl border-2 border-[#ce0d18] cursor-pointer hover:border-[#ff0000] transition-colors" 
              style={{ 
                width: '900px',
                height: '500px',
                backgroundColor: '#1d1d1d',
                backgroundImage: 'url(/image/hacker/bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                fontFamily: 'Arial, Sans-Serif',
                color: '#ce0d18'
              }}
              onClick={onFullscreen}
            >
              {/* Left Folders */}
              <div style={{ 
                position: 'absolute', 
                left: '30px', 
                top: '30px', 
                zIndex: 5 
              }}>
                <div style={{ textAlign: 'center', marginBottom: '20px', cursor: 'pointer' }}>
                  <img src="/image/hacker/icons/psa.png" style={{ width: '50px', height: '50px' }} alt="COV-19" />
                  <p style={{ fontSize: '9px', color: 'white', marginTop: '5px' }}>COV-19 PSA</p>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '20px', cursor: 'pointer' }}>
                  <img src="/image/hacker/icons/download.png" style={{ width: '50px', height: '50px' }} alt="Download" />
                  <p style={{ fontSize: '9px', color: 'white', marginTop: '5px' }}>DL Data</p>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '20px', cursor: 'pointer' }}>
                  <img src="/image/hacker/icons/decryptor.png" style={{ width: '50px', height: '50px' }} alt="Decryptor" />
                  <p style={{ fontSize: '9px', color: 'white', marginTop: '5px' }}>Decryptor</p>
                </div>
                <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                  <img src="/image/hacker/icons/allscripts.png" style={{ width: '50px', height: '50px' }} alt="Scripts" />
                  <p style={{ fontSize: '9px', color: 'white', marginTop: '5px' }}>All Scripts</p>
                </div>
              </div>

              {/* Numbers Window - Right Top */}
              <div style={{
                position: 'absolute',
                right: '8%',
                top: '5%',
                width: '400px',
                backgroundColor: '#000',
                borderLeft: '3px solid rgb(255, 0, 0)',
                borderRight: '3px solid rgb(255, 0, 0)',
                borderBottom: '3px solid rgb(255, 0, 0)',
                borderTop: '20px solid rgb(255, 0, 0)',
                padding: '10px',
                zIndex: 1,
                textShadow: '0.1em 0.1em 0.2em #000'
              }}>
                <div style={{ position: 'absolute', top: '-18px', right: '5px', width: '20px', height: '20px', cursor: 'pointer', zIndex: 10 }}>
                  <img src="/image/hacker/close1.png" style={{ width: '20px', height: '20px' }} alt="Close" />
                </div>
                <img src="/image/hacker/numbers.gif" style={{ width: '100%', display: 'block' }} alt="Numbers" />
              </div>

              {/* Query Window (COVID-19 PSA) - Center */}
              <div style={{
                position: 'absolute',
                width: '630px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#000',
                borderLeft: '3px solid rgb(255, 0, 0)',
                borderRight: '3px solid rgb(255, 0, 0)',
                borderBottom: '3px solid rgb(255, 0, 0)',
                borderTop: '20px solid rgb(255, 0, 0)',
                padding: '20px',
                textAlign: 'center',
                zIndex: 5,
                textShadow: '0.1em 0.1em 0.2em #000'
              }}>
                <div style={{ position: 'absolute', top: '-18px', right: '5px', width: '20px', height: '20px', cursor: 'pointer', zIndex: 10 }}>
                  <img src="/image/hacker/close1.png" style={{ width: '20px', height: '20px' }} alt="Close" />
                </div>
                <img src="/image/hacker/cov.png" style={{ width: '100%', display: 'block' }} alt="COVID-19 Symptoms" />
              </div>

              {/* Downloading Window - Left */}
              <div style={{
                position: 'absolute',
                width: '450px',
                top: '15%',
                left: '12%',
                backgroundColor: '#000',
                borderLeft: '3px solid rgb(255, 0, 0)',
                borderRight: '3px solid rgb(255, 0, 0)',
                borderBottom: '3px solid rgb(255, 0, 0)',
                borderTop: '20px solid rgb(255, 0, 0)',
                padding: '20px',
                textAlign: 'center',
                zIndex: 3,
                textShadow: '0.1em 0.1em 0.2em #000'
              }}>
                <div style={{ position: 'absolute', top: '-18px', right: '5px', width: '20px', height: '20px', cursor: 'pointer', zIndex: 10 }}>
                  <img src="/image/hacker/close1.png" style={{ width: '20px', height: '20px' }} alt="Close" />
                </div>
                <h1 style={{ color: '#ce0d18', fontSize: '24px', marginBottom: '10px' }}>Downloading...</h1>
                <div style={{ color: '#ce0d18', marginBottom: '15px' }}>Critical Data</div>
                <img src="/image/hacker/downloading.gif" style={{ width: '100%', maxWidth: '400px' }} alt="Downloading" />
              </div>

              {/* Satellite Uplink Window - Center */}
              <div style={{
                position: 'absolute',
                width: '580px',
                top: '35%',
                left: '30%',
                backgroundColor: '#000',
                borderLeft: '3px solid rgb(255, 0, 0)',
                borderRight: '3px solid rgb(255, 0, 0)',
                borderBottom: '3px solid rgb(255, 0, 0)',
                borderTop: '20px solid rgb(255, 0, 0)',
                padding: '20px',
                textAlign: 'center',
                zIndex: 6,
                textShadow: '0.1em 0.1em 0.2em #000'
              }}>
                <div style={{ position: 'absolute', top: '-18px', right: '5px', width: '20px', height: '20px', cursor: 'pointer', zIndex: 10 }}>
                  <img src="/image/hacker/close1.png" style={{ width: '20px', height: '20px' }} alt="Close" />
                </div>
                <h1 style={{ color: '#ce0d18', fontSize: '28px', marginBottom: '10px' }}>Satellite Uplink</h1>
                <div style={{ color: '#ce0d18', marginBottom: '15px' }}>Interfacing via Stuttgard</div>
                <img src="/image/hacker/uplink.gif" style={{ width: '100%', maxWidth: '500px' }} alt="Uplink" />
              </div>

              {/* ACCESS GRANTED Dialog - Large Green Overlay */}
              <div style={{
                position: 'absolute',
                width: '400px',
                top: '40%',
                left: '40%',
                backgroundColor: 'rgba(0, 255, 0, 0.95)',
                border: '3px solid #00ff00',
                padding: '40px 60px',
                textAlign: 'center',
                zIndex: 10,
                boxShadow: '0 0 30px rgba(0, 255, 0, 0.5)'
              }}>
                <h1 style={{ 
                  color: '#000', 
                  fontSize: '48px', 
                  fontWeight: 'bold',
                  textShadow: 'none',
                  margin: 0
                }}>ACCESS<br/>GRANTED</h1>
              </div>

              {/* BigFolder Window - Right */}
              <div style={{
                position: 'absolute',
                width: '560px',
                top: '60vh',
                left: '70%',
                backgroundColor: '#000',
                borderLeft: '3px solid rgb(255, 0, 0)',
                borderRight: '3px solid rgb(255, 0, 0)',
                borderBottom: '3px solid rgb(255, 0, 0)',
                borderTop: '20px solid rgb(255, 0, 0)',
                padding: '20px',
                overflowY: 'auto',
                maxHeight: '450px',
                zIndex: 2,
                textShadow: '0.1em 0.1em 0.2em #000'
              }}>
                <div style={{ position: 'absolute', top: '-18px', right: '5px', width: '20px', height: '20px', cursor: 'pointer', zIndex: 10 }}>
                  <img src="/image/hacker/close1.png" style={{ width: '20px', height: '20px' }} alt="Close" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                  <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                    <img src="/image/hacker/icons/download.png" style={{ width: '50px', height: '50px', margin: '0 auto' }} alt="Download" />
                    <p style={{ fontSize: '9px', color: 'white', marginTop: '5px' }}>DL Data</p>
                  </div>
                  <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                    <img src="/image/hacker/icons/hash.png" style={{ width: '50px', height: '50px', margin: '0 auto' }} alt="Hash" />
                    <p style={{ fontSize: '9px', color: 'white', marginTop: '5px' }}>Hash</p>
                  </div>
                  <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                    <img src="/image/hacker/icons/satellite.png" style={{ width: '50px', height: '50px', margin: '0 auto' }} alt="Satellite" />
                    <p style={{ fontSize: '9px', color: 'white', marginTop: '5px' }}>Scan 6</p>
                  </div>
                  <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                    <img src="/image/hacker/icons/world.png" style={{ width: '50px', height: '50px', margin: '0 auto' }} alt="Map" />
                    <p style={{ fontSize: '9px', color: 'white', marginTop: '5px' }}>Map</p>
                  </div>
                  <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                    <img src="/image/hacker/icons/folder.png" style={{ width: '50px', height: '50px', margin: '0 auto' }} alt="Folder" />
                    <p style={{ fontSize: '9px', color: 'white', marginTop: '5px' }}>COV-19 PSA</p>
                  </div>
                </div>
              </div>

              {/* Overlay click hint */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  zIndex: 100
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
              >
                <div style={{
                  backgroundColor: 'rgba(206, 13, 24, 0.9)',
                  backdropFilter: 'blur(5px)',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  color: 'white',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                }}>
                  {t("colorPicker.clickHint")}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Choose Screen Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-4"
            style={{ minWidth: '400px' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Choose Screen</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {colors.map((colorOption) => (
                <I18nLink
                  key={colorOption.value}
                  href={colorOption.href}
                  className={`p-2 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer block`}
                  title={`Go to ${colorOption.name} page`}
                >
                  <div
                    className="w-full h-20 rounded-md border border-gray-300 relative"
                    style={{
                      backgroundColor: colorOption.value === "broken-screen" ? "gray" :
                        colorOption.value === "death-screen-xp" ? "#0078d7" :
                          colorOption.value === "death-screen-10" ? "#0078d7" :
                            colorOption.value === "fbi-warning" ? "#dc2626" :
                              colorOption.value === "fake-virus" ? "#ef4444" :
                                colorOption.value === "no-signal" ? "#7c3aed" :
                                  colorOption.value === "fake-dos" ? "#000000" :
                                    colorOption.value === "dvd-screensaver" ? "#4f46e5" : colorOption.value,
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
              ))}
            </div>

            <p className="text-sm text-gray-600">
              Perfect for pranks, testing, and creative displays
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gray-100 dark:bg-gray-200 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-200 dark:border-gray-300 hover:border-gray-300 dark:hover:border-gray-400 transition-colors">
            <div className="text-3xl mb-3">💻</div>
            <h3 className="text-gray-900 font-semibold mb-2">Realistic Interface</h3>
            <p className="text-gray-600 text-sm">Authentic hacker terminal experience</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-200 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-200 dark:border-gray-300 hover:border-gray-300 dark:hover:border-gray-400 transition-colors">
            <div className="text-3xl mb-3">⌨️</div>
            <h3 className="text-gray-900 font-semibold mb-2">Interactive Typing</h3>
            <p className="text-gray-600 text-sm">Type anything to see code appear</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-200 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-200 dark:border-gray-300 hover:border-gray-300 dark:hover:border-gray-400 transition-colors">
            <div className="text-3xl mb-3">🎬</div>
            <h3 className="text-gray-900 font-semibold mb-2">Perfect for Content</h3>
            <p className="text-gray-600 text-sm">Great for videos and pranks</p>
          </div>
        </div>
      </div>
    </section>

    {/* Color Screens Section */}
    <ColorScreensSection />
    </>
  );
}
