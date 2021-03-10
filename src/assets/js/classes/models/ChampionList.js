const Champion = require('./Champion.js')

module.exports = class ChampionList {
    champions = [];

    constructor(championsData) {
        championsData.forEach((championData) => {
            if (championData.id > 0) this.champions.push(new Champion(championData));
        })
    }

    getList() {
        this.sortList()
        return this.champions
    }

    sortList() {
        this.champions.sort(function(a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
        return this
    }
}