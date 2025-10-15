import SkinShard from './SkinShard.js'

export default class LootList {
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
