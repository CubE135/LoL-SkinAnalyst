import { contextBridge, ipcRenderer } from 'electron'

console.log('✅ Preload script loaded')

contextBridge.exposeInMainWorld('electronAPI', {
  doExec: (command: string) => ipcRenderer.invoke('doExec', command),
  minimize: () => ipcRenderer.send('minimize')
})

contextBridge.exposeInMainWorld('apiClient', {
  call: (
    url: string,
    options = {},
    returnType: 'json' | 'arrayBuffer' = 'json'
  ) => ipcRenderer.invoke('api:call', { url, options, returnType })
})
