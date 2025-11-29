import { getChampionIconUrlFromId } from '../utilities/DDragon'
import Champion from './Champion'
import SkinShard from './SkinShard'

export default class ChampionList {
  champions: Champion[] = []

  constructor(
    championsData: ChampionType[],
    imageData: Record<number, string>,
    storeCatalog: StoreCatalogType[],
    statStones: StatStoneType[]
  ) {
    championsData.forEach(async (championData, key) => {
      if (championData.id > 0 && championData.active) {
        const storeItems: StoreCatalogType[] = []
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
            imageData[championData.id],
            storeItems,
            statStone
          )
        )
      }
    })
  }

  attachLoot(lootList: { skinShards: SkinShard[] }) {
    this.champions.forEach((champion) => {
      let shards: SkinShard[] = []
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
