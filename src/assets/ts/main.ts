import ApiClient from './classes/clients/ApiClient'
import CmdClient from './classes/clients/CmdClient.js'
import DOMUtility from './classes/utilities/DOMUtility.js'
import CountUtility from './classes/utilities/CountUtility.js'
import ChampionList from './classes/models/ChampionList.js'
import LootList from './classes/models/LootList.js'

let cmdClient = new CmdClient()
cmdClient.getLCUPortAndPassword(async function (
  port: number,
  password: string
) {
  DOMUtility.handleEvents()
  if (!port || !password) {
    DOMUtility.renderConnectionError()
    return
  }
  let lcuClient = new ApiClient(port, password)

  let { summonerId } = await lcuClient.getCurrentSummoner()
  let championsData = await lcuClient.getChampions(summonerId)
  let lootData = await lcuClient.getLoot()
  let storeCatalog = await lcuClient.getStoreCatalog()
  let statStones = await lcuClient.getStatstones()
  let imageData = await lcuClient.fetchChampionImages(championsData)

  let championList = new ChampionList(
    championsData,
    imageData,
    storeCatalog,
    statStones
  ).sortList()
  let lootList = new LootList(lootData).getList()
  let counter = new CountUtility(championList.getList(), lootList)
  let domUtility = new DOMUtility(championList.getList(), counter, lcuClient)

  championList.attachLoot(lootList)
  domUtility.renderCounts()
  domUtility.renderChampionList()
  domUtility.handleFilters()
})
