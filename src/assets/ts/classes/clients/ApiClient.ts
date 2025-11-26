import { getChampionIconUrlFromId } from '../../classes/utilities/DDragon'

export default class ApiClient {
  baseUrl: string
  authToken: string
  apiCallOptions: { method: string; headers: { Authorization: string } }

  constructor(port: number, password: string) {
    this.baseUrl = 'https://127.0.0.1:' + port
    this.authToken = btoa('riot:' + password)
    this.initApiCallOptions()
  }

  initApiCallOptions() {
    this.apiCallOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + this.authToken
      }
    }
  }

  async call(endpoint: string) {
    return await window.apiClient.call(
      this.baseUrl + endpoint,
      this.apiCallOptions
    )
  }

  async getCurrentSummoner(): Promise<CurrentSummonerType> {
    return this.call('/lol-summoner/v1/current-summoner')
  }

  getChampions(summonerId: number): Promise<ChampionType[]> {
    return this.call(
      '/lol-champions/v1/inventories/' + summonerId + '/champions'
    )
  }

  getLoot(): Promise<LootType[]> {
    return this.call('/lol-loot/v1/player-loot')
  }

  getStoreCatalog(): Promise<StoreCatalogType[]> {
    return this.call('/lol-store/v1/catalog')
  }

  getStatstones(): Promise<StatStoneType[]> {
    return this.call('/lol-statstones/v2/player-summary-self')
  }

  async fetchChampionImages(
    championData: ChampionType[]
  ): Promise<Record<number, string>> {
    const validChampions = championData.filter(
      (champ) => champ.id > 0 && champ.active
    )

    const entries = await Promise.all(
      validChampions.map(async (champ) => {
        const url = await getChampionIconUrlFromId(champ.id)
        return [champ.id, url] as const
      })
    )

    return Object.fromEntries(entries)
  }
}
