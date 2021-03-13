const Champion = require('./Champion.js')

module.exports = class ChampionList {
    champions = [];

    constructor(championsData, imageData) {
        championsData.forEach((championData, key) => {
            if (championData.id > 0) this.champions.push(new Champion(championData, imageData[key]))
        })
    }

    attachLoot(lootList) {
        this.champions.forEach((champion) => {
            let shards = [];
            lootList.skinShards.forEach((skinShard) => {
                if (skinShard.parent === champion.id) shards.push(skinShard)
            })
            champion.addSkinShards(shards)
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