const exec = require('child_process').exec

module.exports = class CmdClient {
    async getLCUPortAndPassword(callback) {
        exec(
            `wmic PROCESS WHERE "name='LeagueClientUx.exe'" GET commandline`,
            (error, stdout, stderr) => {
                callback(this.extractPort(stdout), this.extractPassword(stdout))
            }
        )
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
