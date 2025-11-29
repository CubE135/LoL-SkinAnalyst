import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import started from 'electron-squirrel-startup'
import { exec } from 'child_process'
import https from 'https'

import { setGlobalDispatcher, Agent } from 'undici'

// disable SSL verification globally (safe only for local dev)
setGlobalDispatcher(new Agent({ connect: { rejectUnauthorized: false } }))

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

// Set the App User Model ID
app.setAppUserModelId('com.squirrel.LoLSkinAnalyst.LoLSkinAnalyst')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 850,
    height: 650,
    icon: path.join(__dirname, '/assets/img/icon.ico'),
    frame: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    )
  }

  ipcMain.on('minimize', () => {
    mainWindow.minimize()
  })

  // Open the DevTools.
  // const runDevTools = app.commandLine.hasSwitch('console')
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

/**
 * Add doExec Methods
 */
function doExec(command: string, callback: (returnValue: string) => void) {
  exec(command, (error, stdout, stderr) => {
    callback(stdout)
  })
}

ipcMain.handle('doExec', async (event, command: string) => {
  return new Promise((resolve) => {
    doExec(command, (output) => {
      resolve(output)
    })
  })
})

/**
 * Add SafeFetch ApiCall Methods
 */
async function safeFetch(
  url: string,
  options: any = {},
  returnType: 'json' | 'arrayBuffer' = 'json'
) {
  const res = await fetch(url, { ...options })

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

  // Return based on requested type
  if (returnType === 'json') {
    return await res.json()
  } else if (returnType === 'arrayBuffer') {
    const buffer = await res.arrayBuffer()
    // Convert to regular array so it can be sent via IPC safely
    return Array.from(new Uint8Array(buffer))
  } else {
    throw new Error(`Unknown returnType: ${returnType}`)
  }
}

ipcMain.handle(
  'api:call',
  async (event, { url, options, returnType = 'json' }) => {
    try {
      return await safeFetch(url, options, returnType)
    } catch (err) {
      console.error('API error:', err)
      throw err
    }
  }
)
