"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";

interface Windows10UpdateScreenPreviewProps {
  selectedColor: string;
  width: number;
  height: number;
  selectedResolution: string;
  colors: any[];
  resolutions: any[];
  onFullscreen: () => void;
  onDownload: () => void;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onResolutionChange: (resolution: string) => void;
  onColorChange: (color: any) => void;
  isFullscreen: boolean;
  updatePercentage: number;
  updateDuration: number;
  startTime: number;
  onUpdateDurationChange: (duration: number) => void;
  onStartTimeChange: (time: number) => void;
  onRestart: () => void;
}

export default function Windows10UpdateScreenPreview({
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
  onColorChange,
  isFullscreen,
  updatePercentage,
  updateDuration,
  startTime,
  onUpdateDurationChange,
  onStartTimeChange,
  onRestart,
}: Windows10UpdateScreenPreviewProps) {
  const t = useTranslations("Windows10UpdateScreen");
  const previewRef = useRef<HTMLDivElement>(null);

  const getTextSize = () => {
    if (isFullscreen) return "22px";
    return "14px";
  };

  const getLogoSize = () => {
    if (isFullscreen) return "200px";
    return "80px";
  };

  const getLogoMargin = () => {
    if (isFullscreen) return "100px";
    return "20px";
  };

  // Get current locale from the URL or use a default
  const getCurrentLocale = () => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      if (pathname.startsWith('/ja/')) return 'ja';
      if (pathname.startsWith('/zh/')) return 'zh';
      return 'en';
    }
    return 'en';
  };

  const currentLocale = getCurrentLocale();

  const getUpdateText = () => {
    if (currentLocale === 'ja') {
      return `${t("preview.updateText")} ${Math.round(updatePercentage)}%${t("preview.completeText")}`;
    }
    return `Working on updates ${Math.round(updatePercentage)}% complete`;
  };

  const getDontTurnOffText = () => {
    if (currentLocale === 'ja') {
      return t("preview.dontTurnOffText");
    }
    return "Don't turn off your PC. This will take a while.";
  };

  const getRestartText = () => {
    if (currentLocale === 'ja') {
      return t("preview.restartText");
    }
    return "Your PC may restart several times";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Preview</h2>
        <div
          ref={previewRef}
          className="relative w-full h-64 bg-blue-600 rounded-lg overflow-hidden cursor-pointer full-screen"
          onClick={onFullscreen}
          style={{
            backgroundColor: "#0079d7",
            fontFamily: '"Segoe UI Variable", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            fontSize: getTextSize(),
            lineHeight: 1.6,
            color: "#fff",
            textAlign: "center",
            fontWeight: 400,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -40%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              className="loader"
              style={{
                position: "relative",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginBottom: "20px",
              }}
            >
              <span className="pip-0"></span>
              <span className="pip-1"></span>
              <span className="pip-2"></span>
              <span className="pip-3"></span>
              <span className="pip-4"></span>
              <span className="pip-5"></span>
            </div>
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <span>{getUpdateText()}</span><br />
              <span>{getDontTurnOffText()}</span>
            </span>
          </div>
          <span
            style={{
              position: "absolute",
              bottom: "max(15px, 10%)",
              left: "50%",
              transform: "translate(-50%, 0)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {getRestartText()}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Choose Screen</h3>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((screen) => (
            <button
              key={screen.value}
              onClick={() => onColorChange(screen)}
              className="w-full h-12 rounded-xl overflow-hidden mb-1 transition-transform hover:scale-105"
              style={{
                backgroundColor: screen.value === "windows-10" ? "#0079d7" : "#000",
              }}
            >
              <img
                src={screen.image}
                alt={screen.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .loader {
          animation: rotate 4s linear infinite;
        }
        
        .loader span::after {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #fff;
          content: "";
          display: block;
          transform-origin: 20px 20px;
          animation-duration: 4s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .pip-0::after {
          transform: rotate(0deg);
          animation-name: rotate-0;
          animation-delay: 0.9s;
        }

        @keyframes rotate-0 {
          0%, 20% { transform: rotate(0deg); }
          40%, 60% { transform: rotate(180deg); }
          80%, 100% { transform: rotate(360deg); }
        }

        .pip-1::after {
          transform: rotate(20deg);
          animation-name: rotate-1;
          animation-delay: 0.775s;
        }

        @keyframes rotate-1 {
          0%, 20% { transform: rotate(20deg); }
          40%, 60% { transform: rotate(200deg); }
          80%, 100% { transform: rotate(380deg); }
        }

        .pip-2::after {
          transform: rotate(40deg);
          animation-name: rotate-2;
          animation-delay: 0.65s;
        }

        @keyframes rotate-2 {
          0%, 20% { transform: rotate(40deg); }
          40%, 60% { transform: rotate(220deg); }
          80%, 100% { transform: rotate(400deg); }
        }

        .pip-3::after {
          transform: rotate(60deg);
          animation-name: rotate-3;
          animation-delay: 0.525s;
        }

        @keyframes rotate-3 {
          0%, 20% { transform: rotate(60deg); }
          40%, 60% { transform: rotate(240deg); }
          80%, 100% { transform: rotate(420deg); }
        }

        .pip-4::after {
          transform: rotate(80deg);
          animation-name: rotate-4;
          animation-delay: 0.4s;
        }

        @keyframes rotate-4 {
          0%, 20% { transform: rotate(80deg); }
          40%, 60% { transform: rotate(260deg); }
          80%, 100% { transform: rotate(440deg); }
        }

        .pip-5::after {
          transform: rotate(100deg);
          animation-name: rotate-5;
          animation-delay: 0.275s;
        }

        @keyframes rotate-5 {
          0%, 20% { transform: rotate(100deg); }
          40%, 60% { transform: rotate(280deg); }
          80%, 100% { transform: rotate(460deg); }
        }
      `}</style>
    </div>
  );
} 