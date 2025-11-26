/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './assets/css/ext/bootstrap.min.css'
import './assets/css/ext/fontawesome.min.css'
import './assets/css/main.min.css'
import 'tippy.js/dist/tippy.css'

import './assets/js/ext/bootstrap.min.js'
import './assets/js/ext/fontawesome.min.js'

import './assets/ts/main.ts'

console.log(
  '👋 This message is being logged by "renderer.ts", included via Vite'
)
