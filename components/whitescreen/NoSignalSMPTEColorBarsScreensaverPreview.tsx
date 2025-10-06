"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";

interface NoSignalSMPTEColorBarsScreensaverPreviewProps {
  selectedColor: string;
  width: number;
  height: number;
  selectedResolution: string;
  colors: Array<{ name: string; value: string; className: string }>;
  resolutions: Array<{ name: string; width: number; height: number }>;
  onFullscreen: () => void;
  onDownload: () => void;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onResolutionChange: (resolution: { name: string; width: number; height: number }) => void;
  onSwapDimensions: () => void;
  onColorChange: (color: { name: string; value: string; className: string }) => void;
  isFullscreen: boolean;
}

export default function NoSignalSMPTEColorBarsScreensaverPreview({
  selectedColor,
  width,
  height,
  selectedResolution,
  colors,
  resolutions,
  onFullscreen,
  onDownload,
  onWidthChange,
  onHeightChange,
  onResolutionChange,
  onSwapDimensions,
  onColorChange,
  isFullscreen,
}: NoSignalSMPTEColorBarsScreensaverPreviewProps) {
  const t = useTranslations("NoSignalSMPTEColorBarsScreensaver");
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePreviewClick = () => {
    onFullscreen();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {t("preview.title")}
        </h2>
      </div>

      <div className="relative">
        <div
          className="full-screen rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg"
          style={{
            width: '100%',
            height: '400px',
            maxWidth: '100%',
            maxHeight: '400px',
            margin: '0 auto',
          }}
          onClick={handlePreviewClick}
          ref={containerRef}
        >
          {/* No Signal SMPTE Color Bars Screensaver */}
          {selectedColor === "no-signal" && (
            <div className={`w-full h-full bg-black relative saver-color-bars ${isFullscreen ? 'fullscreen' : ''} flex items-center justify-center`}>
              <div id="content" className="w-full h-full flex relative">
                <div className="colorBar flex-1 h-full" style={{ backgroundColor: '#fff' }}></div>
                <div className="colorBar flex-1 h-full" style={{ backgroundColor: '#ff0' }}></div>
                <div className="colorBar flex-1 h-full" style={{ backgroundColor: '#0ff' }}></div>
                <div className="colorBar flex-1 h-full" style={{ backgroundColor: '#0f0' }}></div>
                <div className="colorBar flex-1 h-full" style={{ backgroundColor: '#f0f' }}></div>
                <div className="colorBar flex-1 h-full" style={{ backgroundColor: 'red' }}></div>
                <div className="colorBar flex-1 h-full" style={{ backgroundColor: '#00f' }}></div>
                <div className="colorBar flex-1 h-full" style={{ backgroundColor: '#000' }}></div>
                <div id="textOverlay" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-mono z-10 text-shadow-lg bg-black bg-opacity-50 px-4 py-2">
                  NO SIGNAL
                </div>
              </div>
            </div>
          )}

          {/* Other screensavers would go here */}
          {selectedColor !== "no-signal" && (
            <div className="w-full h-full bg-black flex items-center justify-center text-white">
              <p>{t("preview.comingSoon")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Complete No Signal SMPTE Color Bars CSS styles */}
      <style jsx global>{`
        .saver-color-bars {
          background-color: #000;
          overflow: hidden;
          font-size: 1.5rem;
        }

        #content {
          width: 100%;
          height: 100%;
          display: flex;
          position: relative;
        }

        .colorBar {
          flex: 1;
          height: 100%;
        }

        #textOverlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-family: monospace;
          z-index: 2;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          background: rgba(0,0,0,0.5);
          padding: 1rem 2rem;
        }

        #content::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 0;
          width: 100%;
          height: calc(100% + 4px);
          background: linear-gradient(transparent 50%, rgba(0,0,0,0.1) 50%);
          background-size: 100% 4px;
          animation: scan 5s linear infinite;
          pointer-events: none;
          z-index: 3;
        }

        #content::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
          opacity: 0.3;
          pointer-events: none;
          z-index: 1;
          animation: noise 0.2s steps(2) infinite;
        }

        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4px);
          }
        }

        @keyframes noise {
          0% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-2%, -2%);
          }
          20% {
            transform: translate(-4%, 2%);
          }
          30% {
            transform: translate(2%, -4%);
          }
          40% {
            transform: translate(-2%, 6%);
          }
          50% {
            transform: translate(-4%, 2%);
          }
          60% {
            transform: translate(6%, 0);
          }
          70% {
            transform: translate(0, 4%);
          }
          80% {
            transform: translate(-6%, 0);
          }
          90% {
            transform: translate(4%, 2%);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        .saver-color-bars.fullscreen {
          font-size: 2.5rem;
        }

        @media screen and (max-width: 1024px) {
          .saver-color-bars {
            font-size: 1rem;
          }
          .saver-color-bars.fullscreen {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
} 