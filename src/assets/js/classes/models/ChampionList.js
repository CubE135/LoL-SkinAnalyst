const Champion = require('./Champion.js')

module.exports = class ChampionList {
    champions = [];

    constructor(championsData) {
        championsData.forEach((championData) => {
            if (championData.id > 0) this.champions.push(new Champion(championData));
        })
    }

    getList() {
        return this.champions
    }
}