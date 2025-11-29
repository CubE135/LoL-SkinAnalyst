import Champion from '../models/Champion'
import Skin from '../models/Skin'
import SkinShard from '../models/SkinShard'

export default class CountUtility {
  skinList: Skin[]
  championList: Champion[]
  skinShardList: SkinShard[]

  skinsOwnedCount: number
  skinsNotOwnedCount: number
  championOwnedCount: number
  championNotOwnedCount: number
  skinShardCount: number
  skinShardLegendaryCount: number

  constructor(championList: Champion[], lootList: LootListType) {
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

  splitChampionList(championList: Champion[]) {
    championList.forEach((champion) => {
      this.skinList = this.skinList.concat(champion.skins)
      this.championList = this.championList.concat(champion)
    })
  }

  splitLootList(lootList: LootListType) {
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
      if (skinShard.rarity === 'LEGENDARY') this.skinShardLegendaryCount++
    })
  }
}
