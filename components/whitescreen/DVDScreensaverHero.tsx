"use client";
import { Link as I18nLink } from "@/i18n/routing";
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { CheckCircle, Monitor, Play, Sparkles, Tv } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import ColorScreensSection from "./ColorScreensSection";

interface DVDScreensaverHeroProps {
  selectedColor?: string;
  onColorChange?: (color: any) => void;
  onFullscreen?: () => void;
  onCustomColorChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFullscreen?: boolean;
  dvdSpeed?: number;
  dvdSize?: number;
  onDvdSpeedChange?: (speed: number) => void;
  onDvdSizeChange?: (size: number) => void;
}

// DVD主题背景颜色 - 更加生动和主题相关
const COLORS_BACKGROUND = [
  "#0f0f23", // 深蓝黑色 - 科技感
  "#1a1a2e", // 深蓝紫色 - 神秘感
  "#16213e", // 深蓝色 - 专业感
  "#0f3460"  // 深蓝绿色 - 现代感
];

// Global variables for DVD animation - exactly the same as in Preview component
let dvdElement: HTMLElement | null = null;
let fieldElement: HTMLElement | null = null;
let pathElement: SVGPathElement | null = null;
let speedX = 1;
let speedY = 1;
let currentColor = "red";
let posX = 0;
let posY = 0;
let animationId: number | null = null;

// DVD Animation Functions - exactly the same as in Preview component
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

export default function DVDScreensaverHero({
  selectedColor = "dvd",
  onColorChange,
  onFullscreen,
  onCustomColorChange,
  isFullscreen = false,
  dvdSpeed = 1,
  dvdSize = 30,
  onDvdSpeedChange,
  onDvdSizeChange,
}: DVDScreensaverHeroProps) {
  const t = useTranslations("DVDScreensaver");
  const previewRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isFullscreenState, setIsFullscreenState] = useState(false);

  // Ensure component is mounted before showing to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to reset position when screen size changes - exactly the same as in Preview component
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

  // Animation loop - exactly the same as in Preview component
  function animateDVD() {
    if (!fieldElement || !dvdElement) {
      console.log('animateDVD: Missing elements', { fieldElement: !!fieldElement, dvdElement: !!dvdElement });
      return;
    }

    const fieldWidth = fieldElement.clientWidth;
    const fieldHeight = fieldElement.clientHeight;
    const logoWidth = dvdElement.clientWidth;
    const logoHeight = dvdElement.clientHeight;

    // Ensure we have valid dimensions
    if (fieldWidth === 0 || fieldHeight === 0) {
      console.log('animateDVD: Invalid field dimensions', { fieldWidth, fieldHeight });
      // Retry after a short delay
      setTimeout(() => animateDVD(), 100);
      return;
    }

    // Update position
    posX += speedX * dvdSpeed;
    posY += speedY * dvdSpeed;

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

    animationId = requestAnimationFrame(animateDVD);
  }

  // Initialize DVD Animation - exactly the same as in Preview component
  useEffect(() => {
    if (selectedColor === "dvd") {
      // Wait for DOM to be ready
      const timer = setTimeout(() => {
        // Always prioritize the preview element for non-fullscreen state
        if (!isFullscreenState) {
          dvdElement = document.getElementById("preview-dvd-img-id");
          fieldElement = previewRef.current;
        } else {
          dvdElement = document.getElementById("saver-dvd-img-id");
          fieldElement = document.querySelector(".fullscreen-active .full-screen") as HTMLElement;
        }

        pathElement = dvdElement?.querySelector("path") as SVGPathElement;

        console.log('DVD Animation Init:', {
          dvdElement: !!dvdElement,
          fieldElement: !!fieldElement,
          pathElement: !!pathElement,
          isFullscreen: isFullscreenState,
          dvdElementId: dvdElement?.id,
          fieldWidth: fieldElement?.clientWidth,
          fieldHeight: fieldElement?.clientHeight
        });

        if (dvdElement && fieldElement && pathElement) {
          // Stop any existing animation
          if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }

          // Initialize size
          dvdElement.style.width = dvdSize + "%";
          dvdElement.style.height = "auto";
          dvdElement.style.position = "absolute";

          // Initialize speed
          speedX = dvdSpeed;
          speedY = dvdSpeed;

          // Reset position to ensure it's within bounds
          const fieldWidth = fieldElement.clientWidth;
          const fieldHeight = fieldElement.clientHeight;
          posX = Math.min(50, fieldWidth * 0.1); // Start 10% from left
          posY = Math.min(50, fieldHeight * 0.1); // Start 10% from top
          currentColor = "red";

          // Set initial color and position
          pathElement.setAttribute('fill', currentColor);
          dvdElement.style.left = posX + "px";
          dvdElement.style.top = posY + "px";

          // Start animation
          animateDVD();

          // Listen for window resize
          window.addEventListener('resize', resetPosition);

          console.log('DVD Animation Started Successfully', {
            initialPos: { x: posX, y: posY },
            speed: { x: speedX, y: speedY },
            fieldSize: { width: fieldWidth, height: fieldHeight }
          });
        } else {
          console.log('DVD Animation Failed to Initialize - Missing elements', {
            dvdElement: !!dvdElement,
            fieldElement: !!fieldElement,
            pathElement: !!pathElement
          });
        }
      }, 200); // Increased timeout to ensure DOM is ready

      return () => {
        clearTimeout(timer);
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
        window.removeEventListener('resize', resetPosition);
      };
    } else {
      // Stop animation if not DVD
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }
  }, [selectedColor, isFullscreenState, dvdSpeed, dvdSize]);

  // Update speed when dvdSpeed changes
  useEffect(() => {
    if (dvdElement) {
      speedX = dvdSpeed;
      speedY = dvdSpeed;
    }
  }, [dvdSpeed]);

  // Update size when dvdSize changes
  useEffect(() => {
    if (dvdElement) {
      dvdElement.style.width = dvdSize + "%";
    }
  }, [dvdSize]);

  // Separate fullscreen functions for better control
  const enterFullscreen = async () => {
    if (typeof window === 'undefined') return;
    const element = fullscreenRef.current;
    if (!element) return;

    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      }
    } catch (error) {
      console.error('Failed to enter fullscreen:', error);
    }
  };

  const exitFullscreen = async () => {
    if (typeof window === 'undefined') return;
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    } catch (error) {
      console.error('Failed to exit fullscreen:', error);
    }
  };

  // Handle fullscreen functionality - using original Preview component logic
  const handleFullscreen = () => {
    if (isFullscreenState) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }

    if (onFullscreen) onFullscreen();
  };

  const handleExitClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    exitFullscreen();
  };

  // Listen for fullscreen changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreenState(isCurrentlyFullscreen);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreenState) {
        event.preventDefault();
        exitFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreenState]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    animate(mouseX, Math.random() * 100, {
      duration: 20,
      repeat: Infinity,
      repeatType: "reverse"
    });
    animate(mouseY, Math.random() * 100, {
      duration: 20,
      repeat: Infinity,
      repeatType: "reverse"
    });
  }, [mouseX, mouseY]);

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

  const backgroundImage = useMotionTemplate`linear-gradient(135deg, #ffffff 0%, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%, #ffffff 100%)`;

  // Fixed positions for DVD emojis to avoid hydration errors
  const dvdPositions = [
    { left: "10%", top: "20%", delay: "0s" },
    { left: "90%", top: "10%", delay: "1s" },
    { left: "20%", top: "80%", delay: "2s" },
    { left: "80%", top: "70%", delay: "0.5s" },
    { left: "50%", top: "15%", delay: "1.5s" },
    { left: "15%", top: "50%", delay: "2.5s" },
    { left: "85%", top: "40%", delay: "0.3s" },
    { left: "60%", top: "85%", delay: "1.8s" }
  ];

  return (
    <>
      {/* Hidden fullscreen container */}
      <div
        ref={fullscreenRef}
        className={`dvd-fullscreen-container ${isFullscreenState ? 'fullscreen-active' : 'fullscreen-hidden'}`}
        onMouseDown={(e) => e.preventDefault()}
        onTouchStart={(e) => e.preventDefault()}
      >
        <div className="w-full h-full bg-black relative saver-dvd full-screen">
          <svg
            className="saver-dvd-img"
            id="saver-dvd-img-id"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            viewBox="0 0 500 300"
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
              d="M469.9 212.1h-14.7l-.4 2.2h6.2l-2.2 17.3h2.6l2.3-17.3h5.7zM480.1 224.9l-3.1-12.8h-1.8l-6.7 19.5h2.2l5.4-15.1 3.1 15.1 8-15.1v15.1h2.6v-19.5h-2.6zM76.2 282.1 59 249.7H44.3l27.1 49.7h8.4l27.5-49.7H92.2zM141 275.4v24h13.3v-49.7H141zM285 299.4h36.8V291h-23v-13.3h21.7v-8.5h-21.7v-11h23v-8.5H285zM472 188.1c0-18.6-105.6-33.7-236-33.7S0 169.5 0 188.1s105.7 33.7 236 33.7 236-15 236-33.7zm-298.7.5c0-6.2 24.2-11.1 54.1-11.1s54 5 54 11-24.1 11.1-54 11.1-54-5-54-11zM392.3 249.5c-19.3 0-35 11.1-35 24.8s15.7 24.8 35 24.8 35-11 35-24.8c0-13.7-15.7-24.8-35-24.8zm0 40.6c-11.5 0-20.8-7-20.8-15.8 0-8.7 9.3-15.7 20.8-15.7s20.8 7 20.8 15.7-9.3 15.8-20.8 15.8zM214.8 249.7h-21v49.7h21s33.4 0 33.4-25-33.4-25-33.4-25zm-7 41.2v-32.7s26.2-1.7 26.2 16.5c0 18.1-26.1 16.2-26.1 16.2zM192 54.3a78 78 0 0 0-4-26.2h1.7L234.5 154 344.5 28h59.3S450 26.8 450 56.5s-38.4 41.2-63 41.2h-10.6l13.8-59.4h-48.3l-20.4 86.4h65.8c63 0 112.8-34.6 112.8-70.4C500 1.3 418.9.6 418.9.6h-102l-64.7 81.6L227 .6H43l-6.7 27.5h61.5c8.7.2 44 2.4 44 28.4 0 29.7-38.4 41.2-62.9 41.2H68.3L82 38.3H33.7l-20.4 86.4h65.8c63 0 112.8-34.6 112.8-70.4z"
            />
          </svg>

          {/* Exit fullscreen hint */}
          <div
            className="absolute top-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded px-3 py-1 cursor-pointer z-50"
            onClick={handleExitClick}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <span className="text-gray-900 text-sm">Press ESC or click here to exit</span>
          </div>
        </div>
      </div>

      {/* Main Hero Content - hidden when fullscreen */}
      <motion.section
        style={{
          backgroundImage,
        }}
        className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isFullscreenState ? 'hidden' : ''}`}
      >
        {/* 简洁装饰元素 */}
        <div className="absolute inset-0 overflow-hidden">
          {/* 微妙的网格纹理 */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 text-gray-900">
          {/* Header Section - Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 backdrop-blur-sm border border-gray-200 rounded-full mb-6"
            >
              <Tv className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {t("hero.title")}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              {t("hero.description")}
            </motion.p>

            {/* Features - Horizontal layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">{t("hero.features.noRegistration")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">{t("hero.features.worksOffline")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">{t("hero.features.allDevices")}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content - Preview and Controls */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Center Column - Live Preview (8 columns) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="lg:col-span-8"
            >
              {/* Live Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2 font-mono">
                  <Monitor className="w-5 h-5 text-gray-600" />
                  Live Preview
                </h3>

                <div
                  ref={previewRef}
                  onClick={handleFullscreen}
                  className="rounded-xl overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-2xl border border-gray-200 relative"
                  style={{
                    width: '100%',
                    height: '400px',
                    maxWidth: '100%',
                    maxHeight: '400px',
                    margin: '0 auto',
                  }}
                >
                  {/* DVD Screensaver - exactly the same as Preview component */}
                  {selectedColor === "dvd" && (
                    <div className="w-full h-full bg-black relative" style={{ position: 'relative', zIndex: 1 }}>
                      <svg
                        className="saver-dvd-img"
                        id="preview-dvd-img-id"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0"
                        y="0"
                        viewBox="0 0 500 300"
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
                          d="M469.9 212.1h-14.7l-.4 2.2h6.2l-2.2 17.3h2.6l2.3-17.3h5.7zM480.1 224.9l-3.1-12.8h-1.8l-6.7 19.5h2.2l5.4-15.1 3.1 15.1 8-15.1v15.1h2.6v-19.5h-2.6zM76.2 282.1 59 249.7H44.3l27.1 49.7h8.4l27.5-49.7H92.2zM141 275.4v24h13.3v-49.7H141zM285 299.4h36.8V291h-23v-13.3h21.7v-8.5h-21.7v-11h23v-8.5H285zM472 188.1c0-18.6-105.6-33.7-236-33.7S0 169.5 0 188.1s105.7 33.7 236 33.7 236-15 236-33.7zm-298.7.5c0-6.2 24.2-11.1 54.1-11.1s54 5 54 11-24.1 11.1-54 11.1-54-5-54-11zM392.3 249.5c-19.3 0-35 11.1-35 24.8s15.7 24.8 35 24.8 35-11 35-24.8c0-13.7-15.7-24.8-35-24.8zm0 40.6c-11.5 0-20.8-7-20.8-15.8 0-8.7 9.3-15.7 20.8-15.7s20.8 7 20.8 15.7-9.3 15.8-20.8 15.8zM214.8 249.7h-21v49.7h21s33.4 0 33.4-25-33.4-25-33.4-25zm-7 41.2v-32.7s26.2-1.7 26.2 16.5c0 18.1-26.1 16.2-26.1 16.2zM192 54.3a78 78 0 0 0-4-26.2h1.7L234.5 154 344.5 28h59.3S450 26.8 450 56.5s-38.4 41.2-63 41.2h-10.6l13.8-59.4h-48.3l-20.4 86.4h65.8c63 0 112.8-34.6 112.8-70.4C500 1.3 418.9.6 418.9.6h-102l-64.7 81.6L227 .6H43l-6.7 27.5h61.5c8.7.2 44 2.4 44 28.4 0 29.7-38.4 41.2-62.9 41.2H68.3L82 38.3H33.7l-20.4 86.4h65.8c63 0 112.8-34.6 112.8-70.4z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Other screensavers would go here */}
                  {selectedColor !== "dvd" && (
                    <div className="w-full h-full bg-black flex items-center justify-center text-gray-900">
                      <p>{t("preview.comingSoon")}</p>
                    </div>
                  )}

                  {/* Click to fullscreen hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                      <span className="text-gray-900 text-sm font-medium">Click for fullscreen</span>
                    </div>
                  </div>
                </div>

                {isMounted && (
                  <p className="text-sm text-gray-600 mt-3 flex items-center gap-2 justify-center">
                    <Tv className="w-4 h-4 text-gray-600" />
                    {t("preview.bouncingLogo")}: Active
                  </p>
                )}
              </motion.div>
            </motion.div>

            {/* Right Column - Controls (4 columns) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="lg:col-span-4 space-y-4"
            >
              {/* DVD Controls - Compact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-lg"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-3">DVD Settings</h3>

                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Speed: {dvdSpeed}x</label>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={dvdSpeed}
                      onChange={(e) => onDvdSpeedChange && onDvdSpeedChange(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((dvdSpeed - 0.5) / (3 - 0.5)) * 100}%, #e5e7eb ${((dvdSpeed - 0.5) / (3 - 0.5)) * 100}%, #e5e7eb 100%)`,
                        WebkitAppearance: 'none',
                        MozAppearance: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Size: {dvdSize}%</label>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      step="1"
                      value={dvdSize}
                      onChange={(e) => onDvdSizeChange && onDvdSizeChange(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${((dvdSize - 10) / (50 - 10)) * 100}%, #e5e7eb ${((dvdSize - 10) / (50 - 10)) * 100}%, #e5e7eb 100%)`,
                        WebkitAppearance: 'none',
                        MozAppearance: 'none'
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Launch Button - Prominent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                <motion.button
                  onClick={handleFullscreen}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 border border-blue-600 shadow-lg text-sm"
                >
                  <Play className="w-4 h-4" />
                  Launch
                </motion.button>
              </motion.div>

              {/* Choose Screen */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="bg-white rounded-xl border border-gray-200 p-3 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-gray-600" />
                  <h3 className="text-sm font-semibold text-gray-900 font-mono">Choose Screen</h3>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {colors.map((colorOption) => (
                    colorOption.href && colorOption.href !== "/dvd-screensaver" ? (
                      <I18nLink
                        key={colorOption.value}
                        href={colorOption.href}
                        className={`p-1 rounded-lg transition-shadow duration-200 hover:shadow-md cursor-pointer block`}
                        title={`Go to ${colorOption.name} page`}
                      >
                        <div
                          className="w-full h-10 rounded-md border border-gray-300 relative"
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
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-1 rounded-lg transition-shadow duration-200 ring-2 ring-blue-500 shadow-lg`}
                        title={`Select ${colorOption.name}`}
                      >
                        <div
                          className="w-full h-10 rounded-md border border-gray-300 relative"
                          style={{
                            backgroundColor: "#4f46e5",
                            backgroundImage: "url('/fake/dvd.webp')",
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

                <p className="text-xs text-gray-600 mt-2">
                  Perfect for pranks, testing, and creative displays
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* DVD Animation Styles */}
        <style jsx global>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            border: 2px solid #000;
          }

          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            border: 2px solid #000;
          }

          .dvd-fullscreen-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9999;
            user-select: none;
            cursor: default;
          }

          .fullscreen-hidden {
            display: none !important;
          }

          .fullscreen-active {
            display: block !important;
          }
        `}</style>
      </motion.section>

      {/* Color Screens Section */}
      <ColorScreensSection />
    </>
  );
} 