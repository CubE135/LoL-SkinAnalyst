export default class CmdClient {
  async getLCUPortAndPassword(
    callback: (port: number, password: string) => void
  ) {
    const result: string = await window.electronAPI.doExec(
      `wmic PROCESS WHERE "name='LeagueClientUx.exe'" GET commandline`
    )
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
