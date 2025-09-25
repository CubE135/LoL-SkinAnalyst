const SkinShard = require('./SkinShard.js')

module.exports = class LootList {
    loot

    constructor(lootData) {
        this.loot = { skinShards: [] }
        lootData.forEach((lootItem) => {
            if (lootItem.displayCategories === 'SKIN')
                this.loot.skinShards.push(new SkinShard(lootItem))
        })
    }

    getList() {
        return this.loot
    }
}
