"use client";
import { useState, useEffect } from "react";
import BiosFAQ from "./BiosFAQ";
import BiosHero from "./BiosHero";
import BiosUseCases from "./BiosUseCases";
import BiosHowToUse from "./BiosHowToUse";
import ColorScreensSection from "./ColorScreensSection";
import WhiteScreenTechSpecs from "./WhiteScreenTechSpecs";

export default function BiosClient() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleFullscreen = async () => {
    if (!isFullscreen) {
      const fullscreenElement = document.createElement("div");
      fullscreenElement.id = "bios-fullscreen";

      // 添加完整的BIOS样式
      const style = document.createElement("style");
      style.textContent = `
        #bios-fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          margin: 0;
          padding: 0;
          font-family: monospace;
          background-color: #CCCCCC;
          font-size: 26px;
          line-height: 33px;
          color: #73ffff;
          cursor: pointer;
          user-select: none;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        #bios-fullscreen .bios-container {
          width: 90%;
          max-width: 1200px;
          height: 90%;
          max-height: 800px;
          background-color: #CCCCCC;
          border: 3px solid #000;
          display: flex;
          flex-direction: column;
        }
        #bios-fullscreen .header {
          text-align: center;
          background-color: #00EEBB;
          color: #000;
          padding: 10px;
          font-weight: bold;
        }
        #bios-fullscreen #mainMenu {
          display: block;
          background-color: #0426EA;
          color: #CCCCCC;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        #bios-fullscreen #mainMenu li {
          display: inline-block;
          padding: 0 30px;
        }
        #bios-fullscreen #mainMenu li.selected {
          background-color: #CCCCCC;
          color: #0426EA;
        }
        #bios-fullscreen .mainContent {
          flex: 1;
          display: flex;
          color: #0426EA;
          overflow: hidden;
        }
        #bios-fullscreen .keys {
          background-color: #00EEBB;
          color: #000;
          padding: 15px 20px;
          display: flex;
          gap: 60px;
          font-size: 18px;
        }
        #bios-fullscreen .keys > div {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        #bios-fullscreen .keys span {
          color: #FFF;
          font-weight: bold;
        }
        #bios-fullscreen .panel {
          flex: 1;
          display: none;
          color: #000;
        }
        #bios-fullscreen .panel.visiblepanel {
          display: flex;
        }
        #bios-fullscreen .gery {
          color: #555;
        }
        #bios-fullscreen .leftPanel {
          border-right: 3px solid #000;
          flex: 1;
          height: 100%;
          overflow-y: auto;
        }
        #bios-fullscreen .rightPanel {
          flex: 0 0 35%;
          height: 100%;
          overflow-y: auto;
        }
        #bios-fullscreen .rightPanelHead {
          border-bottom: 3px solid #000;
          color: #0426EA;
        }
        #bios-fullscreen .leftPanelInner, #bios-fullscreen .rightPanelHead, #bios-fullscreen .explicationText {
          padding: 20px;
        }
        #bios-fullscreen .explicationText {
          line-height: 25px;
        }
        #bios-fullscreen table {
          width: 100%;
          border-collapse: collapse;
        }
        #bios-fullscreen .clickable tr {
          color: #0426EA;
        }
        #bios-fullscreen .clickable .selected {
          color: #FFF;
          background-color: #0426EA;
        }
        
        @media screen and (max-width: 700px) {
          #bios-fullscreen .rightPanel { display: none; }
          #bios-fullscreen .leftPanel { border-right: none; float: none; width: 100%; height: 100%; }
        }
        
        @media screen and (max-width: 600px) {
          #bios-fullscreen { font-size: 17px; line-height: 23px; }
          #bios-fullscreen #mainMenu li { padding: 0 8px; }
        }
        
        @media screen and (max-width: 450px) {
          #bios-fullscreen { font-size: 15px; line-height: 20px; }
          #bios-fullscreen .keys > div:nth-child(1), #bios-fullscreen .keys > div:nth-child(2) { display: none; }
          #bios-fullscreen .header { height: 23px; overflow: hidden; }
          #bios-fullscreen .mainContent { border: 2px solid #000; top: 75px; bottom: 80px; left: 8px; right: 8px; }
          #bios-fullscreen .keys { height: 50px; }
          #bios-fullscreen .leftPanelInner, #bios-fullscreen .rightPanelHead, #bios-fullscreen .explicationText { padding: 5px; }
        }
      `;

      fullscreenElement.innerHTML = `
        <div class="bios-container">
          <div class="header">
            Phoenix TrustedBios(tm) CMOS Setup Utility
          </div>
          <ul id="mainMenu">
            <li class="selected">Main</li>
            <li>Advanced</li>
            <li>Security</li>
            <li>Boot</li>
            <li>Exit</li>
          </ul>
          <div class="mainContent">
          <div id="mainPage" class="panel visiblepanel">
            <div class="leftPanel">
              <div class="leftPanelInner">
                Bios Version: 4S4EB8X0.86F<br>
                Service tag: XXXXX<br>
                <br>
                <table class="clickable">
                  <tr class="selected">
                    <td>System Time</td>
                    <td></td>
                    <td>[<span id='clockh'>10</span>:<span id='clockm'>50</span>:<span id='clocks'>33</span>]</td>
                  </tr>
                  <tr>
                    <td>System Date</td>
                    <td></td>
                    <td>[<span id='daten'>Wed</span> <span id='datem'>06</span>/<span id='dated'>23</span>/<span id='datey'>1986</span>]</td>
                  </tr>
                  <tr>
                    <td>&#9658; Primary IDE Master</td>
                    <td>:</td>
                    <td>[Not Detected]</td>
                  </tr>
                  <tr>
                    <td>&#9658; Primary IDE Slave</td>
                    <td>:</td>
                    <td>[Not Detected]</td>
                  </tr>
                  <tr>
                    <td>&#9658; SATA1</td>
                    <td>:</td>
                    <td>[HL-DT-ST DVDRW GH]</td>
                  </tr>
                  <tr>
                    <td>&#9658; SATA2</td>
                    <td>:</td>
                    <td>[SAMSUNG HD103SJ]</td>
                  </tr>
                  <tr>
                    <td>&#9658; SATA3</td>
                    <td>:</td>
                    <td>[Not Detected]</td>
                  </tr>
                  <tr>
                    <td>&#9658; SATA4</td>
                    <td>:</td>
                    <td>[Not Detected]</td>
                  </tr>
                  <tr>
                    <td>&#9658; Storage Configuration</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>&#9658; System Information</td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="rightPanel">
              <div class="rightPanelInner">
                <div class="rightPanelHead">
                  Item Specific Help
                </div>
                <div class="explicationText">
                  Use the keys in the footer to navigate.<br>
                </div>
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="leftPanel">
              <div class="leftPanelInner">
                Setup Warning<br>
                Setting items on this menu to incorrect values may cause your system to malfunction.<br>
                <br>
                <table>
                  <tr>
                    <td>CPU Type</td>
                    <td>Intel (R) Core(TM)2 Quad CPU</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Q66 @ 2.40GHz</td>
                  </tr>
                  <tr>
                    <td>CPU Speed</td>
                    <td>2.40GHz/1066MHz</td>
                  </tr>
                  <tr>
                    <td>Cache RAM</td>
                    <td>8192KB</td>
                  </tr>
                </table>
                <br>
                <table class="clickable">
                  <tr class="selected">
                    <td>Primary Video Adapter</td>
                    <td></td>
                    <td>[PCI]</td>
                  </tr>
                  <tr>
                    <td>PS/2 Mouse</td>
                    <td></td>
                    <td>Auto Detect</td>
                  </tr>
                  <tr>
                    <td>PATA Controller</td>
                    <td></td>
                    <td>[Enabled]</td>
                  </tr>
                  <tr>
                    <td>SATA Controller</td>
                    <td></td>
                    <td>[Enabled]</td>
                  </tr>
                  <tr>
                    <td>Onboard LAN</td>
                    <td></td>
                    <td>[Enabled]</td>
                  </tr>
                  <tr>
                    <td>Onboard LAN Boot ROM</td>
                    <td></td>
                    <td>[Disabled]</td>
                  </tr>
                  <tr>
                    <td>Onboard 1394</td>
                    <td></td>
                    <td>[Enabled]</td>
                  </tr>
                  <tr>
                    <td>Supervisor Password</td>
                    <td></td>
                    <td><span class="gery">Disabled</span></td>
                  </tr>
                  <tr>
                    <td>User Password</td>
                    <td></td>
                    <td><span class="gery">Disabled</span></td>
                  </tr>
                  <tr>
                    <td>Onboard Audio</td>
                    <td></td>
                    <td>[Auto]</td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="rightPanel">
              <div class="rightPanelInner">
                <div class="rightPanelHead">
                  Item Help
                </div>
                <div class="explicationText">
                  Menu Level<br><br>
                  [Disabled] disables the Primary Video Adapter function and frees up IRQ 12.<br>
                  [Enabled] enables and supports the function.<br>
                  [Auto Detect] enables the Video Adapter function if detected.<br>
                  <br>
                  <br>
                  <br>
                </div>
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="leftPanel">
              <div class="leftPanelInner">
                Password Description<br>
                If ONLY the Administrator's password is set, this only access to Setup and is only asked for when entering Setup.<br>
                If ONLY the User's password is set, this is a power on password and must be entered to boot to enter Setup.<br>
                In Setup the User will have Administrator rights.<br>
                <br>
                <table class="clickable">
                  <tr class="selected">
                    <td>Administrator Password Status</td>
                    <td><span class="gery">:</span></td>
                    <td><span class="gery">INSTALLED</span></td>
                  </tr>
                  <tr>
                    <td>User Password Status</td>
                    <td><span class="gery">:</span></td>
                    <td><span class="gery">INSTALLED</span></td>
                  </tr>
                  <tr>
                    <td>Administrator Password</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>User Password</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>HDD Password Status</td>
                    <td><span class="gery">:</span></td>
                    <td><span class="gery">NOT INSTALLED</span></td>
                  </tr>
                  <tr>
                    <td>Set Master Password</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Set User Password</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>&#9658; I/O Interface Security</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>&#9658; Secure Boot Menu</td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="rightPanel">
              <div class="rightPanelInner">
                <div class="rightPanelHead">
                  Set Administrator Password
                </div>
                <div class="explicationText">
                  The password length must be in the following range:<br>
                  Minimum length: 3<br>
                  Maximum length: 20<br>
                  Must type with character:<br>
                  a-z, 0-9
                </div>
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="leftPanel">
              <div class="leftPanelInner">
                Boot priority order:<br>
                <br>
                <table class="clickable">
                  <tr class="selected">
                    <td><span class="gery">1: </span></td>
                    <td></td>
                    <td>IDE0: WCD WD1600BEVT-223CHG-(PM)</td>
                  </tr>
                  <tr>
                    <td><span class="gery">2: </span></td>
                    <td></td>
                    <td>CD/DVD: Optiarc DVD RW AD-98123-(P)</td>
                  </tr>
                  <tr>
                    <td><span class="gery">3: </span></td>
                    <td></td>
                    <td>Network Boot: MBA v11.0.11 Slot 0200</td>
                  </tr>
                  <tr>
                    <td><span class="gery">4: </span></td>
                    <td></td>
                    <td>USB HDD</td>
                  </tr>
                  <tr>
                    <td><span class="gery">5: </span></td>
                    <td></td>
                    <td>USB FDD</td>
                  </tr>
                  <tr>
                    <td><span class="gery">6: </span></td>
                    <td></td>
                    <td>USB KEY</td>
                  </tr>
                  <tr>
                    <td><span class="gery">7: </span></td>
                    <td></td>
                    <td>USB CD/DVD ROM</td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="rightPanel">
              <div class="rightPanelInner">
                <div class="rightPanelHead">
                  Item Specific Help
                </div>
                <div class="explicationText">
                  Use the Up and Down arrows to select an item then move it up or down in the list.
                </div>
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="leftPanel">
              <div class="leftPanelInner">
                You are about to leave the Bios Setup Utility. <br>
                <br>
                <table class="clickable">
                  <tr class="selected">
                    <td><span class="gery">1: </span></td>
                    <td></td>
                    <td>Save Changes and Exit</td>
                  </tr>
                  <tr>
                    <td><span class="gery">2: </span></td>
                    <td></td>
                    <td>Exit Without Saving</td>
                  </tr>
                  <tr>
                    <td><span class="gery">3: </span></td>
                    <td></td>
                    <td>Load Defaults and Exit</td>
                  </tr>
                </table>
                <br>
                Your computer will reboot.
              </div>
            </div>
            <div class="rightPanel">
              <div class="rightPanelInner">
                <div class="rightPanelHead">
                  Exit
                </div>
                <div class="explicationText">
                  Leaving the Bios Setup Utility will optionally save the CMOS settings and reboot the computer.
                </div>
              </div>
            </div>
          </div>
        </div>
          <div class="keys">
            <div><span>&larr;&rarr;</span> Select Menu</div>
            <div><span>&uarr;&darr;</span> Select Item</div>
            <div><span>Enter</span> Select / Sub-Menu</div>
            <div><span>F9</span> Save and Exit</div>
          </div>
        </div>
      `;

      // 添加JavaScript逻辑
      let seg: any, oldseg: any;

      // 设置时间函数
      function setTime() {
        const d = new Date();
        const clockh = fullscreenElement.querySelector("#clockh");
        const clockm = fullscreenElement.querySelector("#clockm");
        const clocks = fullscreenElement.querySelector("#clocks");
        const dated = fullscreenElement.querySelector("#dated");
        const datem = fullscreenElement.querySelector("#datem");
        const datey = fullscreenElement.querySelector("#datey");
        const daten = fullscreenElement.querySelector("#daten");

        if (clockh) clockh.innerHTML = String(d.getHours()).padStart(2, '0');
        if (clockm) clockm.innerHTML = String(d.getMinutes()).padStart(2, '0');
        if (clocks) clocks.innerHTML = String(d.getSeconds()).padStart(2, '0');
        if (dated) dated.innerHTML = String(d.getDate()).padStart(2, '0');
        if (datem) datem.innerHTML = String(d.getMonth() + 1).padStart(2, '0');
        if (datey) datey.innerHTML = String(d.getFullYear());

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        if (daten) daten.innerHTML = days[d.getDay()];
      }

      // 统一的退出函数
      async function exitBios() {
        // 退出浏览器全屏模式
        try {
          if (document.fullscreenElement) {
            await document.exitFullscreen();
          }
        } catch (err) {
          console.log("Exit fullscreen failed");
        }
        // 其他清理工作由 fullscreenchange 事件监听器处理
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault();

        if (e.which === 38) { // Up arrow
          const currentSelected = fullscreenElement.querySelector(".visiblepanel table.clickable tr.selected");
          if (currentSelected && currentSelected.previousElementSibling) {
            currentSelected.classList.remove('selected');
            currentSelected.previousElementSibling.classList.add('selected');
          }
        }

        if (e.which === 40) { // Down arrow
          const currentSelected = fullscreenElement.querySelector(".visiblepanel table.clickable tr.selected");
          if (currentSelected && currentSelected.nextElementSibling) {
            currentSelected.classList.remove('selected');
            currentSelected.nextElementSibling.classList.add('selected');
          }
        }

        if (e.which === 37) { // Left arrow
          const currentMenu = fullscreenElement.querySelector("#mainMenu li.selected");
          if (currentMenu && currentMenu.previousElementSibling) {
            currentMenu.classList.remove('selected');
            currentMenu.previousElementSibling.classList.add('selected');

            // Switch panels
            fullscreenElement.querySelectorAll('.panel').forEach(p => p.classList.remove('visiblepanel'));
            const panels = fullscreenElement.querySelectorAll('.panel');
            const index = Array.from(fullscreenElement.querySelectorAll("#mainMenu li")).indexOf(currentMenu.previousElementSibling as Element);
            if (panels[index]) {
              panels[index].classList.add('visiblepanel');
              // Reset selection to first item
              fullscreenElement.querySelectorAll("table.clickable tr").forEach(tr => tr.classList.remove('selected'));
              const firstItem = panels[index].querySelector("table.clickable tr");
              if (firstItem) firstItem.classList.add('selected');
            }
          }
        }

        if (e.which === 39) { // Right arrow
          const currentMenu = fullscreenElement.querySelector("#mainMenu li.selected");
          if (currentMenu && currentMenu.nextElementSibling) {
            currentMenu.classList.remove('selected');
            currentMenu.nextElementSibling.classList.add('selected');

            // Switch panels
            fullscreenElement.querySelectorAll('.panel').forEach(p => p.classList.remove('visiblepanel'));
            const panels = fullscreenElement.querySelectorAll('.panel');
            const index = Array.from(fullscreenElement.querySelectorAll("#mainMenu li")).indexOf(currentMenu.nextElementSibling as Element);
            if (panels[index]) {
              panels[index].classList.add('visiblepanel');
              // Reset selection to first item
              fullscreenElement.querySelectorAll("table.clickable tr").forEach(tr => tr.classList.remove('selected'));
              const firstItem = panels[index].querySelector("table.clickable tr");
              if (firstItem) firstItem.classList.add('selected');
            }
          }
        }

        if (e.which === 27 || e.which === 120) { // ESC or F9
          exitBios();
        }
      };

      // 初始化时间更新
      setTime();
      const timeInterval = setInterval(setTime, 1000);

      // 添加事件监听器
      document.addEventListener("keydown", handleKeyDown);

      // 点击退出
      fullscreenElement.addEventListener('click', (e) => {
        if (e.target === fullscreenElement) {
          exitBios();
        }
      });

      // 监听全屏状态变化（处理 ESC 键退出）
      const handleFullscreenChange = () => {
        if (!document.fullscreenElement) {
          if (document.body.contains(fullscreenElement)) {
            document.body.removeChild(fullscreenElement);
          }
          if (document.head.contains(style)) {
            document.head.removeChild(style);
          }
          setIsFullscreen(false);
          document.removeEventListener("keydown", handleKeyDown);
          clearInterval(timeInterval);
        }
      };

      document.addEventListener("fullscreenchange", handleFullscreenChange);

      // 添加到DOM
      document.head.appendChild(style);
      document.body.appendChild(fullscreenElement);
      setIsFullscreen(true);

      // 请求浏览器全屏
      try {
        await fullscreenElement.requestFullscreen();
      } catch (err) {
        console.log("Fullscreen not supported");
      }
    }
  };

  return (
    <div className="min-h-screen">
      <BiosHero
        onFullscreen={handleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* Color Screens Section */}
      <ColorScreensSection />

      {/* Original Content */}
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="max-w-6xl mx-auto px-4 py-6">
          {/* Main Content */}
          <BiosUseCases />
          <BiosHowToUse />
          <BiosFAQ />
        </main>
      </div>
    </div>
  );
} 