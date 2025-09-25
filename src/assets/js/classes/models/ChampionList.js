const Champion = require('./Champion.js')

module.exports = class ChampionList {
    champions = []

    constructor(championsData, imageData, storeCatalog, statStones) {
        championsData.forEach((championData, key) => {
            if (championData.id > 0) {
                const storeItems = []
                championData.skins.forEach((skin) => {
                    const storeItem = storeCatalog.find((item) => {
                        return item.itemId === skin.id
                    })
                    if (storeItem) {
                        storeItems.push(storeItem)
                    }
                })
                const statStone = statStones.find(
                    (e) => e.championId === championData.id
                )
                this.champions.push(
                    new Champion(
                        championData,
                        imageData[key],
                        storeItems,
                        statStone
                    )
                )
            }
        })
    }

    attachLoot(lootList) {
        this.champions.forEach((champion) => {
            let shards = []
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
        this.champions.sort(function (a, b) {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
        })
        return this
    }
}
