module.exports = class CountUtility {
    skinList;
    championList;
    skinShardList;

    skinsOwnedCount;
    skinsNotOwnedCount;
    championOwnedCount;
    championNotOwnedCount;
    skinShardCount;
    skinShardLegendaryCount;

    constructor(championList, lootList) {
        this.skinList = []
        this.championList = []
        this.skinShardList = []
        this.skinsOwnedCount = 0
        this.skinsNotOwnedCount = 0
        this.championOwnedCount = 0
        this.championNotOwnedCount = 0
        this.skinShardCount = 0
        this.skinShardLegendaryCount = 0

        this.splitChampionList(championList)
        this.splitLootList(lootList)
        this.countSkins()
        this.countChampions()
        this.countSkinShards()
    }

    splitChampionList(championList) {
        championList.forEach((champion) => {
            this.skinList = this.skinList.concat(champion.skins)
            this.championList = this.championList.concat(champion)
        })
    }

    splitLootList(lootList) {
        this.skinShardList = lootList.skinShards
    }

    countSkins() {
        this.skinList.forEach((skin) => {
            if (skin.owned) this.skinsOwnedCount++
            if (!skin.owned) this.skinsNotOwnedCount++
        })
    }

    countChampions() {
        this.championList.forEach((champion) => {
            if (champion.owned) this.championOwnedCount++
            if (!champion.owned) this.championNotOwnedCount++
        })
    }

    countSkinShards() {
        this.skinShardList.forEach((skinShard) => {
            this.skinShardCount++
            if (skinShard.rarity === "LEGENDARY") this.skinShardLegendaryCount++
        })
    }
}