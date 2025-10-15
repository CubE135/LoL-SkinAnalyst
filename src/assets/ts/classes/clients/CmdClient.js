export default class CmdClient {
  async getLCUPortAndPassword(callback) {
    const result = await window.electronAPI.doExec(
      `wmic PROCESS WHERE "name='LeagueClientUx.exe'" GET commandline`
    )
    callback(this.extractPort(result), this.extractPassword(result))
  }

  extractPort(input) {
    let portRegex = /--app-port=([0-9]*)/gm
    let portMatch = portRegex.exec(input)
    return portMatch?.[1] || false
  }

  extractPassword(input) {
    let passwordRegex = /--remoting-auth-token=([\w_-]*)/gm
    let passwordMatch = passwordRegex.exec(input)
    return passwordMatch?.[1] || false
  }
}
