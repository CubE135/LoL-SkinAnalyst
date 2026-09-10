export default class CmdClient {
  async getLCUPortAndPassword(
    callback: (port: number, password: string) => void
  ) {
    let result = ''
    try {
      result = await window.electronAPI.doExec(
        `powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \\"Name='LeagueClientUx.exe'\\" | Select-Object -ExpandProperty CommandLine"`
      )
    } catch (error) {
      console.error('Failed to look up LeagueClientUx.exe:', error)
    }
    callback(this.extractPort(result), this.extractPassword(result))
  }

  extractPort(input: string) {
    let portRegex = /--app-port=([0-9]*)/gm
    let portMatch = portRegex.exec(input)
    return parseInt(portMatch?.[1])
  }

  extractPassword(input: string) {
    let passwordRegex = /--remoting-auth-token=([\w_-]*)/gm
    let passwordMatch = passwordRegex.exec(input)
    return passwordMatch?.[1]
  }
}
