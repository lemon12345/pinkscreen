"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

interface DVDScreensaverPreviewProps {
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
  onRestart?: () => void;
  dvdSpeed: number;
  dvdSize: number;
  onDvdSpeedChange: (speed: number) => void;
  onDvdSizeChange: (size: number) => void;
}

// Global variables like original HTML
let dvdElement: HTMLElement | null = null;
let fieldElement: HTMLElement | null = null;
let pathElement: SVGPathElement | null = null;
let speedX = 1;
let speedY = 1;
let currentColor = "red";
let posX = 0;
let posY = 0;
let animationId: number | null = null;

// DVD Animation Functions (like original HTML)
function getNewColor() {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function changeColor(element: SVGPathElement | null, currentColor: string) {
  let newColor = getNewColor();
  while (newColor === currentColor) {
    newColor = getNewColor();
  }

  if (element) {
    element.setAttribute('fill', newColor);
  }
  return newColor;
}

export default function DVDScreensaverPreview({
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
  onRestart,
  dvdSpeed,
  dvdSize,
  onDvdSpeedChange,
  onDvdSizeChange,
}: DVDScreensaverPreviewProps) {
  const t = useTranslations("DVDScreensaver");
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to reset position when screen size changes (like original HTML)
  function resetPosition() {
    if (!fieldElement || !dvdElement) return;

    const fieldWidth = fieldElement.clientWidth;
    const fieldHeight = fieldElement.clientHeight;
    const logoWidth = dvdElement.clientWidth;
    const logoHeight = dvdElement.clientHeight;

    // Ensure position is within bounds
    if (posX + logoWidth > fieldWidth) {
      posX = fieldWidth - logoWidth;
    }
    if (posY + logoHeight > fieldHeight) {
      posY = fieldHeight - logoHeight;
    }
    if (posX < 0) posX = 0;
    if (posY < 0) posY = 0;

    // Apply corrected position
    dvdElement.style.left = posX + "px";
    dvdElement.style.top = posY + "px";
  }

  // Animation loop (like original HTML)
  function animate() {
    if (!fieldElement || !dvdElement) return;

    const fieldWidth = fieldElement.clientWidth;
    const fieldHeight = fieldElement.clientHeight;
    const logoWidth = dvdElement.clientWidth;
    const logoHeight = dvdElement.clientHeight;

    // Update position
    posX += speedX;
    posY += speedY;

    // Check collision with right or left edge
    if (posX + logoWidth >= fieldWidth || posX <= 0) {
      speedX = -speedX;
      currentColor = changeColor(pathElement, currentColor);

      // Correct position to stay within bounds
      if (posX <= 0) {
        posX = 0;
      } else if (posX + logoWidth >= fieldWidth) {
        posX = fieldWidth - logoWidth;
      }
    }

    // Check collision with top or bottom edge
    if (posY + logoHeight >= fieldHeight || posY <= 0) {
      speedY = -speedY;
      currentColor = changeColor(pathElement, currentColor);

      // Correct position to stay within bounds
      if (posY <= 0) {
        posY = 0;
      } else if (posY + logoHeight >= fieldHeight) {
        posY = fieldHeight - logoHeight;
      }
    }

    // Apply position
    dvdElement.style.left = posX + "px";
    dvdElement.style.top = posY + "px";

    animationId = requestAnimationFrame(animate);
  }

  // Initialize DVD Animation (like original HTML)
  useEffect(() => {
    if (selectedColor === "dvd") {
      // Wait for DOM to be ready
      const timer = setTimeout(() => {
        dvdElement = document.getElementById("saver-dvd-img-id") as HTMLElement;
        fieldElement = document.querySelector(".full-screen") as HTMLElement;
        pathElement = dvdElement?.querySelector("path") as SVGPathElement;

        if (dvdElement && fieldElement && pathElement) {
          // Initialize size
          dvdElement.style.width = dvdSize + "%";

          // Initialize speed
          speedX = dvdSpeed;
          speedY = dvdSpeed;

          // Reset position
          posX = 0;
          posY = 0;
          currentColor = "red";

          // Start animation
          animate();

          // Listen for window resize
          window.addEventListener('resize', resetPosition);
        }
      }, 100);

      return () => {
        clearTimeout(timer);
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        window.removeEventListener('resize', resetPosition);
      };
    } else {
      // Stop animation if not DVD
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    }
  }, [selectedColor]);

  // Update speed when dvdSpeed changes
  useEffect(() => {
    speedX = dvdSpeed;
    speedY = dvdSpeed;
  }, [dvdSpeed]);

  // Update size when dvdSize changes
  useEffect(() => {
    if (dvdElement) {
      dvdElement.style.width = dvdSize + "%";
    }
  }, [dvdSize]);

  const handlePreviewClick = () => {
    onFullscreen();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-2 border-gray-300 dark:border-gray-600 p-6 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
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
            {/* DVD Screensaver */}
            {selectedColor === "dvd" && (
              <div className="w-full h-full bg-black relative saver-dvd">
                <svg
                  className="saver-dvd-img"
                  id="saver-dvd-img-id"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  y="0"
                  viewBox="0 0 500 300"
                  enableBackground="new 0 0 500 300"
                  style={{
                    position: "absolute",
                    width: dvdSize + "%",
                    left: "0px",
                    top: "0px",
                  }}
                  xmlSpace="preserve"
                >
                  <style>{`.st0{fill-rule:evenodd;clip-rule:evenodd;}`}</style>
                  <path
                    className="st0"
                    fill="red"
                    d="M469.9 212.1h-14.7l-.4 2.2h6.2l-2.2 17.3h2.6l2.3-17.3h5.7zM480.1 224.9l-3.1-12.8h-1.8l-6.7 19.5h2.2l5.4-15.1 3.1 15.1 8-15.1v15.1h2.6v-19.5h-2.6zM76.2 282.1 59 249.7H44.3l27.1 49.7h8.4l27.5-49.7H92.2zM141 275.4v24h13.3v-49.7H141zM285 299.4h36.8V291h-23v-13.3h21.7v-8.5h-21.7v-11h23v-8.5H285zM472 188.1c0-18.6-105.6-33.7-236-33.7S0 169.5 0 188.1s105.7 33.7 236 33.7 236-15 236-33.7zm-298.7.5c0-6.2 24.2-11.1 54.1-11.1s54 5 54 11-24.1 11.1-54 11.1-54-5-54-11zM392.3 249.5c-19.3 0-35 11.1-35 24.8s15.7 24.8 35 24.8 35-11 35-24.8c0-13.7-15.7-24.8-35-24.8zm0 40.6c-11.5 0-20.8-7-20.8-15.8 0-8.7 9.3-15.7 20.8-15.7s20.8 7 20.8 15.7-9.3 15.8-20.8 15.8zM214.8 249.7h-21v49.7h21s33.4 0 33.4-24.6-33.4-25-33.4-25zm-7 41.2v-32.7s26.2-1.7 26.2 16.5c0 18.1-26.1 16.2-26.1 16.2zM192 54.3a78 78 0 0 0-4-26.2h1.7L234.5 154 344.5 28h59.3S450 26.8 450 56.5s-38.4 41.2-63 41.2h-10.6l13.8-59.4h-48.3l-20.4 86.4h65.8c63 0 112.8-34.6 112.8-70.4C500 1.3 418.9.6 418.9.6h-102l-64.7 81.6L227 .6H43l-6.7 27.5h61.5c8.7.2 44 2.4 44 28.4 0 29.7-38.4 41.2-62.9 41.2H68.3L82 38.3H33.7l-20.4 86.4h65.8c63 0 112.8-34.6 112.8-70.4z"
                  />
                </svg>
              </div>
            )}

            {/* Other screensavers would go here */}
            {selectedColor !== "dvd" && (
              <div className="w-full h-full bg-black flex items-center justify-center text-white">
                <p>{t("preview.comingSoon")}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {colors.map((color) => (
            <div key={color.value} className="text-center">
              <div
                className={`w-full h-12 rounded-xl border-2 transition-all hover:scale-105 mb-1 cursor-pointer overflow-hidden ${selectedColor === color.value
                  ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-400"
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                onClick={() => onColorChange(color)}
              >
                <img
                  src={color.value === "dvd" ? "/22/image/saver/dvd.webp" :
                    color.value === "flip-clock" ? "/22/image/saver/flip-clock.webp" :
                      color.value === "quotes" ? "/22/image/saver/motivational-quote.webp" :
                        color.value === "no-signal" ? "/22/image/saver/saver-color-bars.png" :
                          color.value === "matrix" ? "/22/image/saver/small/saver-matrix.webp" : ""}
                  alt={color.name}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.parentElement?.querySelector('.fallback') as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }}
                />
                <div className="fallback w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm" style={{ display: 'none' }}>
                  {color.name}
                </div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                {color.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 