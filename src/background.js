'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import bridge from './bridge.js'
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    icon: './icon.ico',
    width: 1280,
    height: 920,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: false,
      spellcheck: false
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  win.maximize();
  win.removeMenu();
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
ipcMain.on('save-bill', async (e, html) => {

  try {
    let win = new BrowserWindow({ title: 'Счет',show: false });
    win.loadURL(`data:text/html;charset=utf-8,<body>${html}</body>`).then(() => {
      dialog.showSaveDialog({
        title: 'Сохранение Счета',
        filters: [
          { name: 'PDF', extensions: ['pdf'] }
        ],
        defaultPath: 'Счет.pdf',
        properties: ['openFile', 'openDirectory']
      }).then(async path => {
        if (!path.canceled) {
          let options = {
            marginsType: 0,
            pageSize: 'A4',
            printBackground: true,
            printSelectionOnly: false,
            landscape: false,
          }
          win.webContents.printToPDF(options).then(data => {
            fs.writeFile(path.filePath, data, function (err) { });
          }).catch(error => {
            console.log(error)
          });
        }
      });


    })


  } catch (e) {
    console.log('IT IS OVER', e)
  }
})


bridge.listen();
