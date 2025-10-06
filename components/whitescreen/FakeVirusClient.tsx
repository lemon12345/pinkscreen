"use client";
import { useEffect, useState } from "react";
import FakeVirusFAQ from "./FakeVirusFAQ";
import FakeVirusHero from "./FakeVirusHero";
import FakeVirusHowToUse from "./FakeVirusHowToUse";
import FakeVirusUseCases from "./FakeVirusUseCases";
import OtherToolsSection from "../home/OtherToolsSection";

export default function FakeVirusClient() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 清理函数
  useEffect(() => {
    return () => {
      // 组件卸载时清理全屏元素
      const fullscreenElement = document.getElementById("fake-virus-fullscreen");
      const styleElement = document.querySelector('style[data-fake-virus]');
      
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
      // 首先进入浏览器全屏模式
      try {
        await document.documentElement.requestFullscreen();
      } catch (err) {
        console.log("Fullscreen not supported");
      }

      const fullscreenElement = document.createElement("div");
      fullscreenElement.id = "fake-virus-fullscreen";

      // 添加完整的病毒样式
      const style = document.createElement("style");
      style.setAttribute('data-fake-virus', 'true');
      style.textContent = `
        #fake-virus-fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          margin: 0;
          padding: 0;
          font-family: "Arial Black", Gadget, sans-serif;
          background-color: #9F2C1A;
          overflow: hidden;
          line-height: 1;
        }
        
        #fake-virus-fullscreen img.bg {
          min-height: 100%;
          min-width: 1024px;
          width: 100%;
          height: auto;
          position: fixed;
          top: 0;
          left: 0;
        }
        
        @media screen and (max-width: 1024px) {
          #fake-virus-fullscreen img.bg {
            left: 50%;
            margin-left: -512px;
          }
        }
        
        #fake-virus-fullscreen .content {
          position: fixed;
          max-width: 2000px;
          top: 15%;
          left: 15%;
          min-height: 200px;
          right: 15%;
          background-color: white;
          border: 2px groove #FFF;
          background: #702A1F;
          background: -moz-linear-gradient(top, #702A1F 0%, #9F2C1A 100%);
          background: -webkit-linear-gradient(top, #702A1F 0%, #9F2C1A 100%);
          background: linear-gradient(to bottom, #702A1F 0%, #9F2C1A 100%);
        }
        
        #fake-virus-fullscreen .headline {
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
        
        #fake-virus-fullscreen .sidebar {
          float: left;
          width: 30%;
          padding: 10px 2%;
          text-align: center;
        }
        
        #fake-virus-fullscreen .maincont {
          float: right;
          width: 60%;
          padding: 20px 3% 10px;
        }
        
        #fake-virus-fullscreen .description {
          color: #000;
          background: url(/image/fake-virus/scroll.png) no-repeat bottom center #EEE;
          padding: 20px 3%;
          font-family: Arial, Helvetica, sans-serif;
          line-height: 20px;
          font-size: 15px;
          max-height: 400px;
          overflow-y: scroll;
        }
        
        #fake-virus-fullscreen .payment {
          color: #FFF;
          font-family: Arial, Helvetica, sans-serif;
          padding: 20px 0 10px;
          overflow: hidden;
        }
        
        #fake-virus-fullscreen h1 {
          font-size: 30px;
          line-height: 33px;
          margin: 0px 0 10px;
          color: #FFF;
          font-weight: bold;
        }
        
        #fake-virus-fullscreen h2 {
          color: #FFD82D;
          margin: 10px 0 10px;
          font-weight: bold;
          font-size: 20px;
          line-height: 25px;
        }
        
        #fake-virus-fullscreen .description h1, 
        #fake-virus-fullscreen .description h2, 
        #fake-virus-fullscreen .description h3, 
        #fake-virus-fullscreen .description h4 {
          color: #000;
        }
        
        #fake-virus-fullscreen .lock {
          margin: 20px 0;
        }
        
        #fake-virus-fullscreen #timer {
          color: #FFF;
          font-family: "Courier New", Courier, monospace;
          font-size: 50px;
          margin: 25px 10px 30px;
          display: block;
        }
        
        #fake-virus-fullscreen #inputmezo {
          display: inline-block;
          background: #DDDDDD;
          background: -moz-linear-gradient(top, #DDDDDD 0%, #FFFFFF 50%, #DDDDDD 100%);
          background: -webkit-linear-gradient(top, #DDDDDD 0%, #FFFFFF 50%, #DDDDDD 100%);
          background: linear-gradient(to bottom, #DDDDDD 0%, #FFFFFF 50%, #DDDDDD 100%);
          width: 100px;
          padding: 2px;
          text-align: left;
          cursor: text;
        }
        
        #fake-virus-fullscreen #inputmezo img {
          width: 17px;
          height: 17px;
        }
        
        #fake-virus-fullscreen #decrypt {
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
        
        #fake-virus-fullscreen #decrypt:hover {
          background: #DDDDDD;
        }
        
        #fake-virus-fullscreen #decrypt:active {
          background: #E1E3E2;
        }
        
        #fake-virus-fullscreen .steps {
          margin-bottom: 10px;
        }
        
        #fake-virus-fullscreen .steps strong {
          display: inline-block;
          margin: 0 5px;
          color: #FFD82D;
          font-weight: bold;
        }
        
        #fake-virus-fullscreen .input {
          margin-bottom: 10px;
          display: inline-block;
          padding-right: 40px;
          vertical-align: top;
        }
        
        #fake-virus-fullscreen .methods {
          text-align: center;
          display: inline-block;
          vertical-align: top;
        }
        
        #fake-virus-fullscreen .methods img {
          height: 40px;
        }
        
        #fake-virus-fullscreen #support {
          position: fixed;
          bottom: 0;
          right: 30px;
          cursor: pointer;
        }
        
        #fake-virus-fullscreen #support span {
          display: block;
          font-size: 14px;
          color: #ddd;
          line-height: 17px;
          font-weight: bold;
          font-family: Arial, Helvetica, sans-serif;
          margin-right: 20px;
        }
        
        #fake-virus-fullscreen #support img {
          display: block;
          float: right;
          margin: 10px 0 0;
        }
        
        #fake-virus-fullscreen p {
          margin-bottom: 15px;
        }
        
        #fake-virus-fullscreen ol {
          list-style: decimal;
          margin-left: 30px;
        }
        
        #fake-virus-fullscreen li {
          border-bottom: 1px solid #999;
          padding: 5px 0;
        }
        
        #fake-virus-fullscreen strong {
          font-weight: bold;
        }
        
        #fake-virus-fullscreen .clearboth {
          clear: both;
        }
        
        @media (max-width: 1550px) {
          #fake-virus-fullscreen .description { max-height: 280px; }
          #fake-virus-fullscreen .sidebar h3 { font-size: 17px; line-height: 22px; }
          #fake-virus-fullscreen #timer { font-size: 45px; margin: 5px 10px 20px; }
          #fake-virus-fullscreen .content { max-width: 100%; top: 10%; left: 10%; right: 10%; }
          #fake-virus-fullscreen .sidebar { width: 28%; }
          #fake-virus-fullscreen .maincont { width: 62%; }
        }
        
        @media (max-width: 1200px) {
          #fake-virus-fullscreen .content { max-width: 100%; top: 5%; left: 5%; right: 5%; }
          #fake-virus-fullscreen .lock { margin: 20px 0; width: 100px; }
          #fake-virus-fullscreen .description { max-height: 250px; }
          #fake-virus-fullscreen #support { display: none; }
        }
        
        @media (max-width: 900px) {
          #fake-virus-fullscreen img.bg, #fake-virus-fullscreen .headline { display: none; }
          #fake-virus-fullscreen .content { width: 100%; top: 0; left: 0; right: 0; border: none; position: relative; }
          #fake-virus-fullscreen { overflow-y: auto; overflow-x: hidden; }
        }
        
        @media (max-width: 700px) {
          #fake-virus-fullscreen .sidebar { width: 100%; float: none; padding: 0; }
          #fake-virus-fullscreen .steps { display: none; }
          #fake-virus-fullscreen .maincont { width: 90%; float: none; padding: 10px 5%; }
          #fake-virus-fullscreen .description { max-height: none; overflow: hidden; background-image: none; }
          #fake-virus-fullscreen h1 { text-align: center; }
          #fake-virus-fullscreen #inputmezo { width: 100px; }
          #fake-virus-fullscreen .sale { display: none; }
        }
      `;

      fullscreenElement.innerHTML = `
        <img src="/image/fake-virus/background.jpg" alt="background" class="bg">
        <div class="content">
          <div class="headline">
            Decryptor 2.1
          </div>
          <div class="sidebar">
            <img src="/image/fake-virus/fake-virus.png" alt="fake computer virus" class="lock">
            <h3>Hurry! <br>Your files will be permanently deleted in:</h3>
            <div class="wraptimer"><span id="timer">59:00</span></div>
            <img src="/image/fake-virus/fake-virus-prank.png" alt="online computer virus prank" class="sale">
            <h3>Please read the instructions</h3>
          </div>
          <div class="maincont">
            <h1>Bad news, your files have been encrypted!</h1>
            <div class="description">
              <h2>What Happened To This Computer?</h2>
              <p><strong>All your personal data, photos, videos, work files, including your operating system have been encrypted and can be accessed again if you pay a ransome. You can't access anything on this machine but this screen.</strong></p> 
              <p>You have <strong>one hour</strong> to pay the prize, otherwise you will no longer be able to decrypt them. Powering off or restarting your computer will also destroy your files. </p>
              <h2>What Can You Do?</h2>
              <p>You might be looking for a way to recover your files but don't waste your time. We use an unbreakable encryption so nobody can restore your files without a decryption key. </p>
              <p>You can purchase your key using one of the payment methods listed below. You will get a code to paste in the input field and click <strong>Decrypt</strong>. After this you should be restored in a couple of minutes.</p>
              <h2>Is This Legal?</h2>
              <p>Someone who has access to this computer has recently installed one of our free applications and agreed for the files to be encrypted by accepting the terms and conditions. This procedure is absolutely legal, we are a certified and awarded company specialized in computer viruses and digital identity theft. We will send you an invoice for your payment.</p>
              <h2>How Do You Pay?</h2>
              <p>We offer many payment methods to make the transaction smooth and easy to make you a satisfied but not a returning customer: </p>
              <ol type="1">
                <li>Send <strong>$399 + Tax</strong> worth of <strong>Monopoly Money</strong> to this address: <br>&nbsp;&nbsp;&nbsp;&nbsp;ʞuɐɹԀ∀ʇsnſsIsᴉɥ┴#GeekPrank </li>
                <li>Send the fee with <strong>PayDude</strong>: <br>&nbsp;&nbsp;&nbsp;&nbsp;just_a_prank@dont-send-money-lol.com</li>
                <li>We now accept <strong>kidneys</strong>! <br>Call now to request kidney transplant: +1&nbsp;804&nbsp;TAKE MY KIDNEY</li>
              </ol>
              <h2>Still Having Trouble</h2>
              <p>You shouldn't be worried, your files are safe and you don't need to pay anything. <br>This was just a prank :) </p>
              <p><strong>You can revert back to the window view pressing the F11 key or ESC to exit.<br>&nbsp;</strong></p>
            </div>
            <div class="payment">
              <div class="steps">
                Send $399 <strong>⇒</strong> Get a key <strong>⇒</strong> Paste your key below <strong>⇒</strong> Click Decrypt 
              </div>
              <div class="input">
                Your key: <span id="inputmezo"><img src="/image/fake-virus/cursor.gif" alt="cursor"></span> <span id="decrypt">Decrypt</span>
              </div>
              <div class="methods">
                 <img src="/image/fake-virus/fake-hacked-computer.png" alt="fake hacked computer"> <img src="/image/fake-virus/files-encrypted-prank.png" alt="files encrypted online prank"> <img src="/image/fake-virus/pay-with-kidneys.png" alt="pay with your kidney">
              </div>
            </div>
          </div>
          <div class="clearboth">
          </div>
          <div id="support">
            <span>Having troubles paying?<br>I'm here to help.</span>
            <img src="/image/fake-virus/support.png" alt="support online">
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
      async function exitPrank() {
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

          // 退出浏览器全屏模式
          try {
            if (document.fullscreenElement) {
              await document.exitFullscreen();
            }
          } catch (err) {
            console.log("Exit fullscreen failed");
          }
        } catch (error) {
          console.error("Error exiting fake virus:", error);
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
      <FakeVirusHero
        onFullscreen={handleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* Original Content */}
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="max-w-6xl mx-auto px-4 py-6">
          {/* Main Content */}
          <FakeVirusUseCases />
          <FakeVirusHowToUse />
          <FakeVirusFAQ />
        </main>
      </div>
    </div>
  );
} 