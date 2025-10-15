import { getChampionIconUrlFromId } from '../../classes/utilities/DDragon'

export default class ApiClient {
  constructor(port, password) {
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

  async call(endpoint) {
    return await window.apiClient.call(
      this.baseUrl + endpoint,
      this.apiCallOptions
    )
  }

  async getCurrentSummoner() {
    return this.call('/lol-summoner/v1/current-summoner')
  }

  getChampions(summonerId) {
    return this.call(
      '/lol-champions/v1/inventories/' + summonerId + '/champions'
    )
  }

  getLoot() {
    return this.call('/lol-loot/v1/player-loot')
  }

  getStoreCatalog() {
    return this.call('/lol-store/v1/catalog')
  }

  getStatstones() {
    return this.call('/lol-statstones/v2/player-summary-self')
  }

  fetchChampionImages(championData) {
    let names = []
    championData.forEach((champion) => {
      if (champion.id > 0 && champion.active) {
        names.push(champion.id)
      }
    })
    return this.fetchImages(names)
  }

  async fetchImages(names) {
    let promises = []
    names.forEach((name) => {
      promises.push(this.fetchImageData(name))
    })
    return Promise.all(promises)
  }

  async fetchImageData(name) {
    return await getChampionIconUrlFromId(name)
  }
}
