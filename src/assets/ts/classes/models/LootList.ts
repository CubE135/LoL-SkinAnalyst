import SkinShard from './SkinShard'

export default class LootList {
  loot: { skinShards: SkinShard[] }

  constructor(lootData: LootType[]) {
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
