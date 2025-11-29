export default class Skin {
  id: number
  name: string
  img: string
  owned: boolean
  type: string
  storeItem: StoreCatalogType

  constructor(skinData: SkinType, storeItem: StoreCatalogType) {
    this.id = skinData.id
    this.name = skinData.name
    this.img = skinData.tilePath
    this.owned = skinData.ownership.owned
    this.type = skinData.skinType
    this.storeItem = storeItem
  }
}
