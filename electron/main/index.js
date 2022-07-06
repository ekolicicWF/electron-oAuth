'use strict';

import { app, BrowserWindow, ipcMain, Notification, shell } from 'electron';
import * as path from 'path';
import { listeners } from 'process';
import { format as formatUrl } from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;
let progressInterval;

function createMainWindow() {
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js")
    },
    icon: path.join(__dirname, 'assets/icon.png') || undefined,
  });

  if (isDevelopment) {
    browserWindow.webContents.openDevTools();
  }

  if (isDevelopment) {
    browserWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    browserWindow.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
      })
    );
  }

  browserWindow.on('closed', () => {
    mainWindow = null;
  });

  browserWindow.webContents.on('devtools-opened', () => {
    browserWindow.focus();
    setImmediate(() => {
      browserWindow.focus();
    });
  });

  const filter = {
    urls: ['https://localhost/callback*'],
  };

  const { session: { webRequest }, } = browserWindow.webContents;


  webRequest.onBeforeRequest(filter, (details, callback) => {

    browserWindow.webContents.send('authEvent', details);
    // callback({ responseHeaders: { ...details.responseHeaders, type: 'success', 'Content-Security-Policy': [policy], } });
  });

  return browserWindow;
}


app.on('before-quit', () => {
  clearInterval(progressInterval)
})

app.whenReady().then(() => {
  mainWindow = createMainWindow();

  mainWindow.webContents.on('new-window', function (event, url) {
    console.log('new-window==>', url);
  })

  if (process.platform === 'win32') {
    app.setAppUserModelId('oAuth Login');
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {

      // Prevent private URI scheme notifications on Windows + Linux from creating a new instance of the application
      const primaryInstance = app.requestSingleInstanceLock();
      if (!primaryInstance) {
        app.quit();
        return;
      }

      createMainWindow();
    }
  })
})