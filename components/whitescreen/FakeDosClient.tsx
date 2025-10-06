"use client";
import { useState } from "react";
import FakeDosFAQ from "./FakeDosFAQ";
import FakeDosHero from "./FakeDosHero";
import FakeDosHowToUse from "./FakeDosHowToUse";
import FakeDosUseCases from "./FakeDosUseCases";

export default function FakeDosClient() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = async () => {
    if (!isFullscreen) {
      // 首先进入浏览器全屏模式
      try {
        await document.documentElement.requestFullscreen();
      } catch (err) {
        console.log("Fullscreen not supported");
      }

      const fullscreenElement = document.createElement("div");
      fullscreenElement.id = "fake-dos-fullscreen";

      // 添加完整的DOS样式
      const style = document.createElement("style");
      style.textContent = `
        #fake-dos-fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          margin: 0;
          padding: 20px;
          font-family: monospace;
          background-color: #000000;
          font-size: 26px;
          color: #fff;
          cursor: default;
          user-select: none;
          overflow: hidden;
          box-sizing: border-box;
        }
        
        #fake-dos-fullscreen .typing {
          display: inline-block;
          background: url(data:image/gif;base64,R0lGODlhEAAUAPIAAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAUAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAUAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAFAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAFAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAFAAAAzIIunInK0rnlNaaKZXFNdGjHA40GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAFAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAFAAAAzIIunInK0rnlNaaKZXFNdGjHA40GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAOw==) bottom right no-repeat transparent;
          padding: 0 16px 0 0;
          min-width: 16px;
          height: 20px;
        }
        
        #fake-dos-fullscreen #typing2 {
          padding: 0 0px 0 0;
          min-width: 13px;
        }
        
        #fake-dos-fullscreen .formatting {
          margin: 0 5px 0 30px;
          border: 3px solid #FFF;
          display: inline-block;
        }
        
        #fake-dos-fullscreen #formatting {
          margin: 3px;
          border: 3px solid #FFF;
          display: inline-block;
          padding: 17px 5px;
        }
        
        #fake-dos-fullscreen #formattingWrap, 
        #fake-dos-fullscreen #formatComplete {
          display: none;
        }
        
        #fake-dos-fullscreen #prankBro {
          text-align: center;
          display: none;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          cursor: default !important;
          padding: 20px;
        }
        
        #fake-dos-fullscreen #prankBro a {
          cursor: pointer !important;
          color: #EE0000;
          text-decoration: none;
        }
        
        #fake-dos-fullscreen #prankBro a:hover {
          color: #FF0000;
        }
        
        #fake-dos-fullscreen .trollFace {
          font-family: monospace;
          font-size: 12px;
          line-height: 12px;
          margin-top: 20px;
        }
        
        #fake-dos-fullscreen .trollFace > span {
          color: #000;
        }
        
        @media screen and (max-width: 1100px) {
          #fake-dos-fullscreen {
            font-size: 18px;
            line-height: 20px;
          }
        }
        
        @media screen and (max-width: 750px) {
          #fake-dos-fullscreen .trollFace {
            display: none;
          }
        }
      `;

      fullscreenElement.innerHTML = `
        <div class="dos">
          <div id="intro">
            Microsoft Windows [Version 10.0.14393]<br>
            (c) 2017 Microsoft Corporation. All rights reserved.<br>
            <br>
            C:\\<span id="typing" class="typing"></span>
          </div>
          <div id="formattingWrap">
            <br>
            WARNING, ALL DATA ON NON-REMOVABLE DISK<br>
            DRIVE C: WILL BE LOST!<br>
            <br>
            <div class="formatting">
              <div id="formatting">
              </div>
            </div>
            <br>
            <br>
            Formatting C: <br><span id="percent">77</span>% complete
            <br>
            <br>
            <div id="formatComplete">
              Cleaned Disk Setup Program<br>
              FDISK Options<br>
              <br>
              Successfully Erased Disk Drives: 1<br>
              <br>
              Choose one of the following:<br>
              1. Create Dos partition of Logical DOS Drive<br>
              2. Set active partition<br>
              3. Delete partition or Logical DOS Drive<br>
              4. Display partition information<br>
              <br>
              Enter choice: [<span id="typing2" class="typing"> </span>]
            </div>
          </div>
          <div id="prankBro">
            <br>
            <a href="#" onclick="exitPrank()">
            Don't worry, your disk is intact! <br><br>
            THIS IS JUST A PRANK BRO! <br><br>
            Click here to return to the home page<br>
            Exit full screen with ESC
            </a>
            <br>
            <br>
            <div class="trollFace">
___<span>_</span><span>_</span><span>_</span>____<span>_</span><span>_</span>____<span>_</span>_<span>_</span><span>_</span><span>_</span>_<span>_</span><span>_</span>___<span>_</span><span>_</span><span>_</span>____<span>_</span><span>_</span>___<span>_</span><span>_</span>__<span>_</span><span>_</span><span>_</span>_<span>_</span>_<span>_</span><span>_</span><span>_</span>_<span>_</span><span>_</span><span>_</span><span>_</span><span>_</span>___<span>_</span><span>_</span>___<span>_</span><span>_</span>___<br>
|<span>_</span>__<span>_</span><span>_</span>|____<span>_</span>|____<span>_</span>|__/<span>_</span><span>_</span>|___]<span>_</span>|___/<span>_</span>|___|<span>_</span>|<span>_</span>\\<span>_</span><span>_</span>|<span>_</span>|__/<span>_</span><span>_</span><span>_</span><span>_</span><span>_</span>|<span>_</span><span>_</span><span>_</span><span>_</span>|<span>_</span><span>_</span><span>_</span>||<span>_</span>|<span>_</span>|<br>
||___|<span>_</span>|____<span>_</span>|____<span>_</span>|<span>_</span><span>_</span>\\<span>_</span><span>_</span>|<span>_</span><span>_</span><span>_</span><span>_</span><span>_</span>|<span>_</span><span>_</span>\\<span>_</span><span>_</span>|<span>_</span><span>_</span><span>_</span>|<span>_</span>|<span>_</span><span>_</span>\\|<span>_</span>|<span>_</span><span>_</span>\\<span>_</span><span>_</span><span>_</span>.<span>_</span>|___<span>_</span>|___||<span>_</span>|<span>_</span>|
            </div>
          </div>
        </div>
      `;

      // JavaScript逻辑
      let percent = 0;
      let stage = 1;
      let typingTimer: NodeJS.Timeout | null = null;

      function timedCount() {
        percent++;
        const formattingEl = fullscreenElement.querySelector('#formatting') as HTMLElement;
        const percentEl = fullscreenElement.querySelector('#percent') as HTMLElement;
        const formatCompleteEl = fullscreenElement.querySelector('#formatComplete') as HTMLElement;

        if (percent <= 20) {
          let seg = "";
          for (let i = 0; i <= 20; i++) {
            if (i <= percent) {
              seg = seg + '█';
            } else {
              seg = seg + '░';
            }
          }
          if (formattingEl) formattingEl.innerHTML = seg;
          if (percentEl) percentEl.innerHTML = String(percent * 5 - (Math.floor(Math.random() * 5) + 1));
          typingTimer = setTimeout(timedCount, 300 + (Math.floor(Math.random() * 800) + 1));
        } else {
          if (percentEl) percentEl.innerHTML = '100';
          if (formatCompleteEl) formatCompleteEl.style.display = 'block';
          stage = 3;
        }
      }

      // 键盘事件处理
      const handleKeyPress = (e: KeyboardEvent) => {
        const typingEl = fullscreenElement.querySelector('#typing') as HTMLElement;
        const typing2El = fullscreenElement.querySelector('#typing2') as HTMLElement;
        const formattingWrapEl = fullscreenElement.querySelector('#formattingWrap') as HTMLElement;
        const introEl = fullscreenElement.querySelector('#typing') as HTMLElement;

        if (stage === 1) { // 输入阶段
          if (e.key === 'Enter') {
            if (formattingWrapEl) formattingWrapEl.style.display = 'block';
            timedCount();
            stage = 2;
            if (typingEl) typingEl.classList.remove('typing');
          } else if (e.key === 'Backspace') {
            if (typingEl && typingEl.innerHTML.length > 0) {
              typingEl.innerHTML = typingEl.innerHTML.substring(0, typingEl.innerHTML.length - 1);
            }
          } else if (e.key === ' ') {
            if (typingEl) typingEl.innerHTML += '_';
          } else if (e.key.length === 1) {
            if (typingEl) typingEl.innerHTML += e.key;
          }
        }

        if (stage === 3) { // 最终阶段
          if (e.key === 'Enter') {
            exitPrank();
          } else if (e.key === 'Backspace') {
            if (typing2El && typing2El.innerHTML.length > 0) {
              typing2El.innerHTML = typing2El.innerHTML.substring(0, typing2El.innerHTML.length - 1);
            }
          } else if (e.key !== ' ' && e.key.length === 1) {
            if (typing2El) typing2El.innerHTML = e.key;
          }
        }
      };

      // ESC键退出
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          exitPrank();
        }
      };

      // 退出函数
      async function exitPrank() {
        if (typingTimer) clearTimeout(typingTimer);
        document.body.removeChild(fullscreenElement);
        document.head.removeChild(style);
        setIsFullscreen(false);
        document.removeEventListener("keypress", handleKeyPress);
        document.removeEventListener("keydown", handleKeyDown);

        // 退出浏览器全屏模式
        try {
          if (document.fullscreenElement) {
            await document.exitFullscreen();
          }
        } catch (err) {
          console.log("Exit fullscreen failed");
        }
      }

      // 全局退出函数
      (window as any).exitPrank = exitPrank;

      // 添加事件监听器
      document.addEventListener("keypress", handleKeyPress);
      document.addEventListener("keydown", handleKeyDown);

      // 添加到DOM
      document.head.appendChild(style);
      document.body.appendChild(fullscreenElement);
      setIsFullscreen(true);
    }
  };

  return (
    <div className="min-h-screen">
      <FakeDosHero
        onFullscreen={handleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* Original Content */}
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="max-w-6xl mx-auto px-4 py-6">
          {/* Main Content */}
          <FakeDosUseCases />
          <FakeDosHowToUse />
          <FakeDosFAQ />
        </main>
      </div>
    </div>
  );
} 