"use client";
import { useEffect, useState } from "react";
import FbiWarningFAQ from "./FbiWarningFAQ";
import FbiWarningHero from "./FbiWarningHero";
import FbiWarningHowToUse from "./FbiWarningHowToUse";
import FbiWarningUseCases from "./FbiWarningUseCases";
import OtherToolsSection from "../home/OtherToolsSection";

export default function FbiWarningClient() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 清理函数
  useEffect(() => {
    return () => {
      // 组件卸载时清理全屏元素
      const fullscreenElement = document.getElementById("fbi-warning-fullscreen");
      const styleElement = document.querySelector('style[data-fbi-warning]');
      
      if (fullscreenElement && document.body.contains(fullscreenElement)) {
        document.body.removeChild(fullscreenElement);
      }
      if (styleElement && document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  const handleFullscreen = async () => {
    if (!isFullscreen) {
      const fullscreenElement = document.createElement("div");
      fullscreenElement.id = "fbi-warning-fullscreen";

      // 添加完整的FBI警告样式
      const style = document.createElement("style");
      style.setAttribute('data-fbi-warning', 'true');
      style.textContent = `
        #fbi-warning-fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          margin: 0;
          padding: 0;
          font-family: "Arial Black", Gadget, sans-serif;
          background-color: #000;
          overflow: hidden;
          line-height: 1;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        #fbi-warning-fullscreen .content {
          overflow: hidden;
          width: 90%;
          max-width: 1200px;
          margin: 50px auto 10px;
          min-height: 200px;
          background-color: white;
          border: 2px groove #FFF;
          background: #333;
        }
        
        #fbi-warning-fullscreen .headerImg {
          width: 100%;
          display: block;
          height: auto;
          max-width: 100%;
          object-fit: contain;
        }
        
        #fbi-warning-fullscreen .headline {
          background: #1C6EA4;
          background: -moz-linear-gradient(top, #1C6EA4 0%, #2285C7 50%, #1C6EA4 100%);
          background: -webkit-linear-gradient(top, #1C6EA4 0%, #2285C7 50%, #1C6EA4 100%);
          background: linear-gradient(to bottom, #1C6EA4 0%, #2285C7 50%, #1C6EA4 100%);
          font-family: Impact, Charcoal, sans-serif;
          padding: 8px;
          color: #FFF;
          font-size: 18px;
          letter-spacing: 2px;
          border-bottom: 2px groove #FFF;
        }
        
        #fbi-warning-fullscreen .sidebar {
          float: right;
          width: 27%;
          padding: 100px 2% 10px 0;
          text-align: center;
        }
        
        #fbi-warning-fullscreen .maincont {
          float: left;
          width: 65%;
          padding: 10px 3% 5px;
        }
        
        #fbi-warning-fullscreen .logo {
          height: 0;
          overflow: visible;
          margin: -150px 0 150px;
          text-align: right;
          padding-right: 15px;
        }
        
        #fbi-warning-fullscreen .logo img {
          display: inline-block;
        }
        
        #fbi-warning-fullscreen .description {
          background: #EEE;
          color: #000;
          padding: 20px 3%;
          font-family: Arial, Helvetica, sans-serif;
          line-height: 20px;
          font-size: 15px;
          max-height: 250px;
          overflow-y: scroll;
        }
        
        #fbi-warning-fullscreen h1 {
          font-size: 25px;
          line-height: 33px;
          margin: 0px 0 10px;
          color: #FFF;
          font-weight: bold;
        }
        
        #fbi-warning-fullscreen h2 {
          color: #FFF;
          margin: 10px 0 10px;
          font-weight: bold;
          font-size: 20px;
          line-height: 25px;
        }
        
        #fbi-warning-fullscreen h3 {
          color: #FFF;
          margin: 10px 0 10px;
          font-weight: bold;
          font-size: 20px;
          line-height: 25px;
        }
        
        #fbi-warning-fullscreen .description h1,
        #fbi-warning-fullscreen .description h2,
        #fbi-warning-fullscreen .description h3,
        #fbi-warning-fullscreen .description h4 {
          color: #000;
        }
        
        #fbi-warning-fullscreen #timer {
          color: #FFF;
          font-family: "Courier New", Courier, monospace;
          font-size: 50px;
          margin: 25px 10px 30px;
          display: block;
        }
        
        #fbi-warning-fullscreen .input {
          position: relative;
          top: -20px;
          left: 45px;
          color: #bbb;
          font-size: 14px;
        }
        
        #fbi-warning-fullscreen #inputmezo {
          display: inline-block;
          background: #DDDDDD;
          background: -moz-linear-gradient(top, #DDDDDD 0%, #FFFFFF 50%, #DDDDDD 100%);
          background: -webkit-linear-gradient(top, #DDDDDD 0%, #FFFFFF 50%, #DDDDDD 100%);
          background: linear-gradient(to bottom, #DDDDDD 0%, #FFFFFF 50%, #DDDDDD 100%);
          width: 150px;
          padding: 2px;
          text-align: left;
          cursor: text;
        }
        
        #fbi-warning-fullscreen #inputmezo img {
          width: 17px;
          height: 17px;
        }
        
        #fbi-warning-fullscreen #decrypt {
          color: rgb(0, 0, 0);
          font-size: 14px;
          line-height: 14px;
          padding: 5px 15px;
          cursor: pointer;
          border-radius: 11px;
          font-family: "Arial Black", Gadget, sans-serif;
          font-weight: bold;
          text-decoration: none;
          font-style: normal;
          text-transform: none;
          box-shadow: #bbb -3px -2px 3px 5px inset;
          display: inline-block;
          background: #FFF;
        }
        
        #fbi-warning-fullscreen #decrypt:hover {
          background: #DDDDDD;
        }
        
        #fbi-warning-fullscreen #decrypt:active {
          background: #E1E3E2;
        }
        
        #fbi-warning-fullscreen #support {
          position: fixed;
          bottom: 0;
          right: 30px;
          text-align: center;
          cursor: pointer;
        }
        
        #fbi-warning-fullscreen #support span {
          font-size: 14px;
          color: #ddd;
          line-height: 17px;
          font-weight: normal;
          font-family: Arial, Helvetica, sans-serif;
          margin-right: 10px;
          text-align: center;
        }
        
        #fbi-warning-fullscreen #support span.greendot {
          color: #383;
          font-size: 18px;
          margin-right: 5px;
          line-height: 20px;
        }
        
        #fbi-warning-fullscreen #support img {
          display: block;
          float: right;
          margin: 10px 0 0;
        }
        
        #fbi-warning-fullscreen p {
          margin-bottom: 15px;
        }
        
        #fbi-warning-fullscreen ul {
          list-style: decimal;
          margin-left: 30px;
        }
        
        #fbi-warning-fullscreen strong {
          font-weight: bold;
        }
        
        #fbi-warning-fullscreen .clearboth {
          clear: both;
        }
        
        #fbi-warning-fullscreen a,
        #fbi-warning-fullscreen a:visited,
        #fbi-warning-fullscreen a:hover,
        #fbi-warning-fullscreen a:active {
          color: #338;
        }
        
        #fbi-warning-fullscreen img {
          max-width: 100%;
        }
        
        #fbi-warning-fullscreen #scrolldown {
          background: url(/image/fbi-warning/scroll.png) no-repeat bottom center #EEE;
          height: 30px;
          width: 30px;
          position: relative;
          left: 450px;
          border-radius: 20px;
          top: -30px;
        }
        
        #fbi-warning-fullscreen .reasons {
          width: 100%;
          height: auto;
          display: block;
          margin: 10px 0;
        }
        
        @media (max-width: 1250px) {
          #fbi-warning-fullscreen #support,
          #fbi-warning-fullscreen .headline,
          #fbi-warning-fullscreen .input {
            display: none;
          }
          #fbi-warning-fullscreen .content {
            width: 95%;
            max-width: 800px;
            margin: 30px auto 10px;
          }
          #fbi-warning-fullscreen .logo img {
            width: 180px;
          }
          #fbi-warning-fullscreen .logo {
            margin: -120px 0 120px;
          }
          #fbi-warning-fullscreen h1,
          #fbi-warning-fullscreen h2,
          #fbi-warning-fullscreen h3,
          #fbi-warning-fullscreen h4 {
            font-size: 17px;
            line-height: 19px;
          }
          #fbi-warning-fullscreen h1 {
            font-size: 23px;
            line-height: 30px;
          }
          #fbi-warning-fullscreen .description {
            max-height: 230px;
          }
          #fbi-warning-fullscreen #scrolldown {
            left: 380px;
          }
        }
        
        @media (max-width: 700px) {
          #fbi-warning-fullscreen img.bg,
          #fbi-warning-fullscreen .headline,
          #fbi-warning-fullscreen .sidebar,
          #fbi-warning-fullscreen .input,
          #fbi-warning-fullscreen #scrolldown,
          #fbi-warning-fullscreen #support {
            display: none;
          }
          #fbi-warning-fullscreen {
            background: #eee;
          }
          #fbi-warning-fullscreen .content {
            width: 100%;
            border: none;
            background: transparent;
            margin: 0;
          }
          #fbi-warning-fullscreen .headerImg {
            display: block !important;
            width: 100%;
            margin-bottom: 20px;
          }
          #fbi-warning-fullscreen .maincont {
            float: none;
            width: 100%;
            padding: 0;
          }
          #fbi-warning-fullscreen .description {
            max-height: none;
            overflow: hidden;
            padding: 0 10%;
          }
          #fbi-warning-fullscreen .logo img {
            display: inline-block;
            width: 150px;
          }
          #fbi-warning-fullscreen .logo {
            margin: -100px 0 100px;
          }
          #fbi-warning-fullscreen h1 {
            color: #333;
            padding: 30px 150px 10px 10%;
          }
        }
        
        @media (max-width: 450px) {
          #fbi-warning-fullscreen .logo img {
            display: none;
          }
          #fbi-warning-fullscreen h1 {
            padding: 30px 10% 10px 10%;
          }
        }
      `;

      fullscreenElement.innerHTML = `
        <div class="content">
          <div class="headline">
            Important Message
          </div>
          <img class="headerImg" alt="fake fbi warning prank" src="/image/fbi-warning/fake-fbi-waring-prank.jpg">
          <div class="logo"><img alt="logo" src="/image/fbi-warning/logo.png"></div>
          <div class="sidebar">
            <h3>Read the instructions and take action immediately!</h3>
            <div class="wraptimer"><span id="timer">59:59</span></div>
          </div>
          <div class="maincont">
            <h1>This device has been locked</h1>
            <div class="description">
              <p><strong>Your operating system has been locked due to the violation of the federal laws of the Global Internet Safety Society. This computer lock is aimed to stop your illegal activity: </strong></p>
              <img alt="internet security warning reasons" src="/image/fbi-warning/internet-security-reasons.png" class="reasons">
              <h2>Understand your rights</h2>
              <ul>
                <li>You have the right to remain silent.</li>
                <li>The information you provide can and will be used against you in a court of law.</li>
                <li>You have the right to an attorney. If you can't afford an attorney, one will be provided for you.</li>
              </ul>
              <h2>You are bound to do the following</h2>
              <p>Now that you understand your rights, remain calm and do not leave the area.</p>
              <p>A SWAT team is on the way to your location. Make sure the door is open, otherwise they are ready to break in.</p>
              <p>Don't destroy any evidence and don't contact your accomplices!</p>
              <p>Prepare disks, flash drives and any other multimedia devices containing illegal materials, proving your criminality.</p>
              <p>Be prepared to answer the question during your interrogation! Cooperate and don't deny the charges against you.</p>
              <h2>Is this all true?</h2>
              <p>Don't worry, everything is fine. This was just a prank! :)</p>
              <p><strong>You can revert back to normal mode pressing the F11 key or ESC to exit.<br>&nbsp;</strong></p>
            </div>
            <div id="scrolldown">
            </div>
          </div>
          <div class="clearboth">
            <div class="input">
              Key: <span id="inputmezo"><img src="/image/fbi-warning/cursor.gif" alt="prank cursor gif"></span> <span id="decrypt">Unlock</span>
            </div>
          </div>
          <div id="support">
            <span><strong>Questions or concerns?</strong><br><span class="greendot">●</span>Officer Cadet Andry Stoller is online</span><br>
            <img src="/image/fbi-warning/support.png" alt="support online">
          </div>
        </div>
      `;

      // JavaScript逻辑 - 倒计时器
      let timerInterval: NodeJS.Timeout;

      function startTimer() {
        const timerElement = fullscreenElement.querySelector('#timer');
        if (!timerElement) return;

        const presentTime = timerElement.innerHTML;
        const timeArray = presentTime.split(/[:]+/);
        let m = parseInt(timeArray[0]);
        let s = parseInt(timeArray[1]) - 1;

        if (s < 0) {
          s = 59;
          m = m - 1;
        }

        if (m < 0) {
          m = 1;
        }

        const formattedS = s < 10 ? "0" + s : s.toString();
        timerElement.innerHTML = m + ":" + formattedS;
      }

      // 启动倒计时器
      timerInterval = setInterval(startTimer, 1000);

      // ESC键退出
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'F11') {
          e.preventDefault();
          exitPrank();
        }
      };

      // 退出函数
      function exitPrank() {
        try {
          if (timerInterval) clearInterval(timerInterval);
          
          // 安全地移除元素
          if (fullscreenElement && document.body.contains(fullscreenElement)) {
            document.body.removeChild(fullscreenElement);
          }
          if (style && document.head.contains(style)) {
            document.head.removeChild(style);
          }
          
          setIsFullscreen(false);
          document.removeEventListener("keydown", handleKeyDown);
        } catch (error) {
          console.error("Error exiting FBI warning:", error);
          setIsFullscreen(false);
        }
      }

      // 添加事件监听器
      document.addEventListener("keydown", handleKeyDown);

      // 点击退出
      fullscreenElement.addEventListener('click', (e) => {
        if (e.target === fullscreenElement) {
          exitPrank();
        }
      });

      // 添加到DOM
      document.head.appendChild(style);
      document.body.appendChild(fullscreenElement);
      setIsFullscreen(true);
    }
  };

  return (
    <div className="min-h-screen">
      <FbiWarningHero
        onFullscreen={handleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* Original Content */}
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="max-w-6xl mx-auto px-4 py-6">
          {/* Main Content */}
          <FbiWarningUseCases />
          <FbiWarningHowToUse />
          <FbiWarningFAQ />
        </main>
      </div>
    </div>
  );
} 