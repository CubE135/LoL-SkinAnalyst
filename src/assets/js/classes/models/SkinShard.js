module.exports = class SkinShard {
    id
    name
    rarity
    value
    disenchantValue
    upgradeEssenceValue
    img

    constructor(shardData) {
        this.id = shardData.storeItemId
        this.name = shardData.itemDesc
        this.rarity = shardData.rarity
        this.value = shardData.value
        this.disenchantValue = shardData.disenchantValue
        this.upgradeEssenceValue = shardData.upgradeEssenceValue
        this.img = shardData.tilePath
        this.parent = shardData.parentStoreItemId
    }
}
