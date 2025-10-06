"use client";
import { useState } from "react";
import HackerFAQ from "./HackerFAQ";
import HackerHero from "./HackerHero";
import HackerUseCases from "./HackerUseCases";
import HackerHowToUse from "./HackerHowToUse";

export default function HackerClient() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = async () => {
    if (!isFullscreen) {
      // 创建全屏容器
      const fullscreenElement = document.createElement("div");
      fullscreenElement.id = "hacker-fullscreen";

      // 完全复制原版HTML结构
      fullscreenElement.innerHTML = `
        <style>
          @font-face {
            font-family: 'Fixedsys';
            src: url('/fonts/fixedsys/fsex300-webfont.woff') format('woff');
          }
          
          body { 
            font-family: Arial, Sans-Serif;
            margin: 0;
            padding: 0;
            overflow: hidden;
            user-select: none;
          }
          
        #hacker-fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
            font-family: Arial, Sans-Serif;
            background-color: #1d1d1d;
            background-image: url('/image/hacker/bg.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
            color: #ce0d18;
            overflow: hidden;
          z-index: 9999;
          }
          
          #console {
            font-family: Fixedsys, Sans-Serif;
            display: flex;
          overflow: hidden;
            flex-direction: column-reverse;
            max-height: 400px;
            padding: 10px;
          }
          
          #button {
            background-color: #ce0d18;
            color: #000;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            margin-top: 15px;
          }
          
          #button:hover {
            background-color: #ff0000;
          }
          
          .folder {
            width: 48px;
            height: 32px;
          position: relative;
            background-color: rgba(0, 0, 0, 0);
            border-radius: 3px 3px 3px 3px;
            margin: 30px;
            cursor: pointer;
            float: left;
          }
          
          .folder:before {
            content: '';
            width: 50%;
            height: 6px;
            border-radius: 0 3px 0 0;
            background-color: rgba(0, 0, 0, 0);
          position: absolute;
            top: -6px;
            left: 0px;
            cursor: pointer;
          }
          
          .folder p {
            padding-top: 40px;
            text-align: center;
            padding-bottom: 20px;
            font-size: 9px;
            color: white;
          }
          
          .foldericon {
            width: 50px;
            height: 50px;
          }
          
          #folders {
            position: fixed;
            left: 30px;
            top: 100px;
            width: 64px;
          }
          
          .dragme {
            position: fixed;
            text-shadow: 0.1em 0.1em 0.2em #000;
            background-color: #000;
            text-align: center;
            font-size: 16px;
            padding: 20px;
            color: #ce0d18;
            cursor: move;
            border-left: 3px solid rgb(255, 0, 0);
            border-right: 3px solid rgb(255, 0, 0);
            border-bottom: 3px solid rgb(255, 0, 0);
            border-top: 20px solid rgb(255, 0, 0);
            z-index: 1000;
            resize: both;
            overflow: auto;
            min-width: 200px;
            min-height: 150px;
          }
          
          .resize-handle {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 20px;
            height: 20px;
            cursor: nwse-resize;
            background: linear-gradient(135deg, transparent 50%, rgba(206, 13, 24, 0.5) 50%);
            z-index: 11;
          }
          
          #close {
            position: absolute;
            top: -18px;
            right: 5px;
            width: 20px;
            height: 20px;
            cursor: pointer;
            z-index: 10;
          }
          
          .dialog {
          position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 255, 0, 0.9);
            padding: 40px;
            border: 3px solid #00ff00;
            z-index: 9999;
          display: none;
            text-align: center;
            font-size: 36px;
            font-weight: bold;
            color: #000;
          }
          
          #AccessDenied {
            background: rgba(255, 0, 0, 0.9);
            border-color: #ff0000;
            color: #fff;
          }
          
          #LevelRequired {
            background: rgba(255, 0, 0, 0.9);
            border-color: #ff0000;
            color: #fff;
          }
          
          #Audio {
            background: rgba(0, 0, 0, 0.9);
            text-align: left;
            height: 500px;
            width: 600px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          display: none;
        }
        
          #BigFolder {
            height: 450px;
            width: 600px;
            background: rgba(0, 0, 0, 0.8);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          overflow-y: auto;
            display: none;
          }
          
          #Numbers {
            position: fixed;
            right: 8%;
            top: 5%;
            width: 400px;
            background-color: #000;
            border-left: 3px solid rgb(255, 0, 0);
            border-right: 3px solid rgb(255, 0, 0);
            border-bottom: 3px solid rgb(255, 0, 0);
            border-top: 20px solid rgb(255, 0, 0);
            padding: 10px;
            display: none;
            z-index: 1;
            text-shadow: 0.1em 0.1em 0.2em #000;
          }
          
          #Numbers img {
            width: 100%;
            display: block;
          }
          
          #Downloading {
            width: 450px;
            top: 15%;
            left: 12%;
            transform: none;
            display: none;
          }
          
          #Hash {
            width: 615px;
            top: 60%;
            left: 20%;
            transform: none;
            display: none;
          }
          
          #Scan {
            width: 580px;
            top: 35%;
            left: 30%;
            transform: none;
            display: none;
          }
          
          #Map {
            width: 630px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: none;
          }
          
          #Query {
            width: 630px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: none;
          }
          
          #Random {
            width: 700px;
            top: 30%;
            left: 20%;
            transform: none;
            display: none;
          }
          
          #Audio {
            width: 640px;
            top: 30%;
            left: 30%;
            transform: none;
          }
          
          #BigFolder {
            width: 560px;
            top: 60vh;
            left: 70%;
            transform: none;
          }
          
          .dragme img {
            max-width: 100%;
            height: auto;
          }
        </style>

        <!-- Dialogs -->
        <div id="AccessGranted" class="dialog">
          <h1>ACCESS GRANTED</h1>
        </div>
        <div id="AccessDenied" class="dialog">
          <h1>ACCESS DENIED</h1>
        </div>
        <div id="LevelRequired" class="dialog">
          <h1>SECURITY BREACH</h1>
          <h2>LEVEL 3 ACCESS REQUIRED</h2>
        </div>

         <!-- Draggable Windows -->
         <div id="Downloading" class="dragme">
           <img id="close" class="close-btn" src="/image/hacker/close1.png"/>
           <div class="resize-handle"></div>
           <h1 style="font-size: 24px; margin-bottom: 10px;">Downloading...</h1>
           <div style="margin-bottom: 15px;">Critical Data</div>
           <img src="/image/hacker/downloading.gif" style="max-width: 400px; width: 100%;">
         </div>

        <div id="Hash" class="dragme">
          <img id="close" class="close-btn" src="/image/hacker/close1.png"/>
          <div class="resize-handle"></div>
          <h1>Password Decryptor</h1>
          Calculating Hashes<br>
          <img src="/image/hacker/hash.gif">
        </div>

        <div id="Scan" class="dragme">
          <img id="close" class="close-btn" src="/image/hacker/close1.png"/>
          <div class="resize-handle"></div>
          <h1 style="font-size: 28px; margin-bottom: 10px;">Satellite Uplink</h1>
          <div style="margin-bottom: 15px;">Interfacing via Stuttgard</div>
          <img src="/image/hacker/uplink.gif" style="max-width: 500px; width: 100%;">
        </div>

        <div id="Map" class="dragme">
          <img id="close" class="close-btn" src="/image/hacker/close1.png"/>
          <div class="resize-handle"></div>
          <h1>Tracing Contact</h1>
          <img src="/image/hacker/tracing.gif">
        </div>

        <div id="Query" class="dragme">
          <img id="close" class="close-btn" src="/image/hacker/close1.png"/>
          <div class="resize-handle"></div>
          <img style="width:100%;" src="/image/hacker/cov.png">
        </div>

        <div id="Random" class="dragme" style="width:400px;">
          <img id="close" class="close-btn" src="/image/hacker/close1.png"/>
          <div class="resize-handle"></div>
          <img style="width:100%;" src="https://imgur.com/TQe6IrA">
        </div>

        <div id="Audio" class="dragme">
          <img id="close" class="close-btn" src="/image/hacker/close1.png"/>
          <div class="resize-handle"></div>
          <div id="console">
            <button id="button">Automate</button>
            <br><br>
            <center>
              <img style="width:300px;" src="/image/hacker/ani.gif" /><br>
            </center>
            GLOBAL HEALTH ALLIANCE <br/><br>
            <img style="width:50px;height:50px;" src="/image/hacker/plus.png"><br>
            <br/>Authorized-access only<br/>Press F2 or TAB for help, or type to begin.
          </div>
        </div>

        <div id="BigFolder" class="dragme">
          <img id="close" class="close-btn" src="/image/hacker/close1.png"/>
          <div class="resize-handle"></div>
          <div class="folder" data-target="Downloading">
            <img class="foldericon" src="/image/hacker/icons/download.png"><br>
            <p>DL Data</p>
          </div>
          <div class="folder" data-target="Hash">
            <img class="foldericon" src="/image/hacker/icons/hash.png"><br>
            <p>Hash</p>
          </div>
          <div class="folder" data-target="Scan">
            <img class="foldericon" src="/image/hacker/icons/satellite.png"><br>
            <p>Scan 6</p>
          </div>
          <div class="folder" data-target="Map">
            <img class="foldericon" src="/image/hacker/icons/world.png"><br>
            <p>Map</p>
          </div>
          <div class="folder" data-target="Query">
            <img class="foldericon" src="/image/hacker/icons/folder.png"><br>
            <p>COV-19 PSA</p>
          </div>
          <div class="folder" data-target="Random">
            <img class="foldericon" src="/image/hacker/icons/microscope.png"><br>
            <p>Electron Microscope</p>
          </div>
        </div>

        <div id="Numbers">
          <img id="close" class="close-btn" src="/image/hacker/close1.png" style="position:absolute;top:-18px;right:5px;width:20px;height:20px;cursor:pointer;z-index:10;"/>
          <img src="/image/hacker/numbers.gif">
        </div>

        <!-- Left Folders -->
        <div id="folders">
          <div class="folder" data-target="Query">
            <img class="foldericon" src="/image/hacker/icons/psa.png"><br>
            <p>COV-19 PSA</p>
          </div>
          <div class="folder" data-target="Downloading">
            <img class="foldericon" src="/image/hacker/icons/download.png"><br>
            <p>DL Data</p>
          </div>
          <div class="folder" data-target="Random">
            <img class="foldericon" src="/image/hacker/icons/microscope.png"><br>
            <p>Microscope</p>
          </div>
          <div class="folder" data-target="Hash">
            <img class="foldericon" src="/image/hacker/icons/decryptor.png"><br>
            <p>Decryptor</p>
          </div>
          <div class="folder" data-target="BigFolder">
            <img class="foldericon" src="/image/hacker/icons/allscripts.png"><br>
            <p>All Scripts</p>
          </div>
        </div>
      `;

      // 添加JavaScript逻辑
      const script = document.createElement("script");
      script.textContent = `
        (function() {
          let zIndexCounter = 1000;
          let currentDragData = { offset: {x:0, y:0}, target: null };
          let automateInterval = null;
          let typerIndex = 0;
          
          const typerText = \`nixcraft@wks05:-$ grep root /etc/passwd
root:x:0:0:root:/root:/bin/bash

nmap -sT -A localhost

Starting nmap V. 3.00
Interesting ports on localhost.localdomain (127.0.0.1):
(The 1596 ports scanned but not shown below are in state: closed)
Port       State       Service
22/tcp     open        ssh
111/tcp    open        sunrpc
515/tcp    open        printer
834/tcp    open        unknown
6000/tcp   open        X11
Remote OS guesses: Linux Kernel 2.4.0 or Gentoo 1.2 Linux 2.4.19 rc1-rc7)

Nmap run completed -- 1 IP address (1 host up) scanned in 5 seconds

cat /etc/services | grep 834
tcp   0    0 0.0.0.0:834    0.0.0.0:*   LISTEN   653/ypbind
lsof -i | grep 834

ypbind      653        0    7u  IPv4       1319                 TCP *:834 (LISTEN)

Discovered open port 80/tcp on 207.46.250.119

nixcraft@wks05:-$ telnet -l root 207.46.250.119
Trying 207.46.250.119
Connected to localhost

login: root
password: ***********

Last login: Tue Aug 10 16:51:20 from Billy_G
Welcome to localhost!

[root@localhost]# mv ~ /dev/null\`;

          // Show window
          function showWindow(id) {
            const el = document.getElementById(id);
            if (el) {
              el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
              if (el.style.display === 'block') {
                el.style.zIndex = ++zIndexCounter;
              }
            }
          }

          // Close buttons
          document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
              e.stopPropagation();
              this.closest('.dragme').style.display = 'none';
            });
          });

          // Folder clicks
          document.querySelectorAll('.folder').forEach(folder => {
            folder.addEventListener('click', function(e) {
              if (!e.target.closest('.close-btn')) {
                const target = this.getAttribute('data-target');
                if (target) {
                  showWindow(target);
                }
              }
            });
          });

          // Resizing variables
          let currentResizeData = { target: null, startX: 0, startY: 0, startWidth: 0, startHeight: 0 };
          
          // Resize handles
          document.querySelectorAll('.resize-handle').forEach(handle => {
            handle.addEventListener('mousedown', function(e) {
              e.stopPropagation();
              const window = this.closest('.dragme');
              if (window) {
                currentResizeData.target = window;
                currentResizeData.startX = e.clientX;
                currentResizeData.startY = e.clientY;
                currentResizeData.startWidth = parseInt(window.style.width || window.offsetWidth);
                currentResizeData.startHeight = parseInt(window.style.height || window.offsetHeight);
                window.style.zIndex = ++zIndexCounter;
              }
            });
          });

          // Dragging
          document.addEventListener('mousedown', function(e) {
            const dragme = e.target.closest('.dragme');
            if (dragme && !e.target.classList.contains('close-btn') && !e.target.classList.contains('resize-handle') && !e.target.closest('.folder')) {
              currentDragData.target = dragme;
              const rect = dragme.getBoundingClientRect();
              currentDragData.offset.x = e.clientX - rect.left;
              currentDragData.offset.y = e.clientY - rect.top;
              dragme.style.zIndex = ++zIndexCounter;
              dragme.style.transform = 'none';
            }
          });

          document.addEventListener('mouseup', function() {
            currentDragData.target = null;
            currentResizeData.target = null;
          });

          document.addEventListener('mousemove', function(e) {
            // Handle resizing
            if (currentResizeData.target) {
              e.preventDefault();
              const newWidth = currentResizeData.startWidth + (e.clientX - currentResizeData.startX);
              const newHeight = currentResizeData.startHeight + (e.clientY - currentResizeData.startY);
              
              if (newWidth > 200) {
                currentResizeData.target.style.width = newWidth + 'px';
              }
              if (newHeight > 150) {
                currentResizeData.target.style.height = newHeight + 'px';
              }
            }
            // Handle dragging
            else if (currentDragData.target) {
              e.preventDefault();
              currentDragData.target.style.left = (e.clientX - currentDragData.offset.x) + 'px';
              currentDragData.target.style.top = (e.clientY - currentDragData.offset.y) + 'px';
            }
          });

          // Typing effect
          let cursorBlink = setInterval(function() {
            const console = document.getElementById('console');
            if (console) {
              const content = console.innerHTML;
              if (content.endsWith('_')) {
                console.innerHTML = content.substring(0, content.length - 1);
              } else {
                console.innerHTML = content + '_';
              }
            }
          }, 500);

           // Keyboard typing
          document.addEventListener('keyup', function(e) {
            const console = document.getElementById('console');
            
            // ALT for access granted
            if (e.keyCode === 18) {
              const granted = document.getElementById('AccessGranted');
              granted.style.display = 'block';
              setTimeout(() => { granted.style.display = 'none'; }, 2000);
          return;
        }

            // ENTER for access denied
            if (e.keyCode === 13) {
              const denied = document.getElementById('AccessDenied');
              denied.style.display = 'block';
              setTimeout(() => { denied.style.display = 'none'; }, 2000);
              return;
            }
            
            // CTRL for level required
            if (e.keyCode === 17) {
              const level = document.getElementById('LevelRequired');
              level.style.display = 'block';
              setTimeout(() => { level.style.display = 'none'; }, 2000);
              return;
            }
            
            // Number keys to show windows
            const keyMap = {
              49: 'Downloading',  // 1
              50: 'Hash',         // 2
              53: 'Map',          // 3
              54: 'Scan',         // 4
              55: 'Query',        // 5
              186: 'Random',      // ;
              32: 'BigFolder',    // Space
            };
            
            if (keyMap[e.keyCode]) {
              showWindow(keyMap[e.keyCode]);
              return;
            }
            
            // Regular typing
            if (console && typerText) {
              let content = console.innerHTML;
              if (content.endsWith('_')) {
                content = content.substring(0, content.length - 1);
              }
              
              const speed = 2;
              typerIndex = typerIndex % typerText.length;
              const newText = typerText.substr(typerIndex, speed);
              const displayText = newText.replace(/\\n/g, '<br/>').replace(/\\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
              
              console.innerHTML = content + displayText;
              typerIndex += speed;
              
              // Auto scroll
              console.scrollTop = console.scrollHeight;
            }
          });

          // Automate button
          const button = document.getElementById('button');
        if (button) {
            button.addEventListener('click', function() {
              if (automateInterval) {
                clearInterval(automateInterval);
                automateInterval = null;
                this.textContent = 'Automate';
              } else {
                automateInterval = setInterval(function() {
                  const console = document.getElementById('console');
                  if (console && typerText) {
                    let content = console.innerHTML;
                    if (content.endsWith('_')) {
                      content = content.substring(0, content.length - 1);
                    }
                    
                    typerIndex = typerIndex % typerText.length;
                    const newText = typerText.substr(typerIndex, 12);
                    const displayText = newText.replace(/\\n/g, '<br/>').replace(/\\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
                    
                    console.innerHTML = content + displayText;
                    typerIndex += 12;
                    console.scrollTop = console.scrollHeight;
                  }
                }, 30);
                this.textContent = 'Stop';
              }
            });
          }

          // Initial display - match preview area
          setTimeout(function() {
            // Show multiple overlapping windows like in preview
            showWindow('Downloading');
            showWindow('Scan');  // Satellite Uplink
            showWindow('Query');  // COVID-19
            showWindow('BigFolder');
            document.getElementById('Numbers').style.display = 'block';
            
            // Show ACCESS GRANTED dialog
            const granted = document.getElementById('AccessGranted');
            if (granted) {
              granted.style.display = 'block';
              setTimeout(() => { granted.style.display = 'none'; }, 3000);
            }
          }, 100);
        })();
      `;

       document.body.appendChild(fullscreenElement);
      document.body.appendChild(script);

      // 请求浏览器全屏
      try {
        await fullscreenElement.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.log("Fullscreen not supported");
        // 如果全屏失败，仍然显示效果
        setIsFullscreen(true);
      }

      // 监听全屏状态变化（处理ESC键退出）
      const handleFullscreenChange = () => {
        if (!document.fullscreenElement) {
          // 用户按了ESC或F11退出全屏
          if (document.body.contains(fullscreenElement)) {
        document.body.removeChild(fullscreenElement);
          }
          if (script && script.parentNode) {
            script.parentNode.removeChild(script);
          }
          setIsFullscreen(false);
          document.removeEventListener("fullscreenchange", handleFullscreenChange);
        }
      };

      document.addEventListener("fullscreenchange", handleFullscreenChange);
    }
  };

  return (
    <div className="min-h-screen">
      <HackerHero
        onFullscreen={handleFullscreen}
        isFullscreen={isFullscreen}
      />
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="max-w-6xl mx-auto px-4 py-6">
           <HackerHowToUse />
           <HackerFAQ />
          <HackerUseCases />
        </main>
      </div>
    </div>
  );
} 
