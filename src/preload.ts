import { contextBridge, ipcRenderer } from 'electron'
// import https from 'https'
// import { IncomingMessage } from 'http'

console.log('✅ Preload script loaded')

contextBridge.exposeInMainWorld('electronAPI', {
  doExec: (command: string) => ipcRenderer.invoke('doExec', command)
})

contextBridge.exposeInMainWorld('apiClient', {
  call: (
    url: string,
    options = {},
    returnType: 'json' | 'arrayBuffer' = 'json'
  ) => ipcRenderer.invoke('api:call', { url, options, returnType })
})

// contextBridge.exposeInMainWorld('lcu', {
//   async getChampionIcon(authToken: string, url: string): Promise<string> {
//     return new Promise((resolve, reject) => {
//       https
//         .get(
//           url,
//           {
//             rejectUnauthorized: false, // 👈 accept self-signed cert (only for local LCU)
//             headers: {
//               Authorization: 'Basic ' + authToken
//             }
//           },
//           (res: IncomingMessage) => {
//             if (res.statusCode !== 200) {
//               reject(new Error(`HTTP ${res.statusCode}`))
//               return
//             }

//             const chunks: Buffer[] = []

//             res.on('data', (chunk: Buffer) => chunks.push(chunk))

//             res.on('end', () => {
//               const buffer = Buffer.concat(chunks)
//               const blob = new Blob([buffer], { type: 'image/png' })
//               const blobUrl = URL.createObjectURL(blob)
//               resolve(blobUrl)
//             })
//           }
//         )
//         .on('error', (err: Error) => reject(err))
//     })
//   }
// })
