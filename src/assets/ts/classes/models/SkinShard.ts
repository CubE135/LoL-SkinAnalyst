export default class SkinShard {
  id: number
  name: string
  rarity: string
  value: number
  disenchantValue: number
  upgradeEssenceValue: number
  img: string
  parent: number

  constructor(shardData: LootType) {
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
