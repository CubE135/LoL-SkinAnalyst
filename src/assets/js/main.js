const $ = require('jquery')
const ApiClient = require('./assets/js/classes/clients/ApiClient.js')
const CmdClient = require('./assets/js/classes/clients/CmdClient.js')
const DOMUtility = require('./assets/js/classes/utilities/DOMUtility.js')
const CountUtility = require('./assets/js/classes/utilities/CountUtility.js')
const ChampionList = require('./assets/js/classes/models/ChampionList.js')
const LootList = require('./assets/js/classes/models/LootList.js')

let cmdClient = new CmdClient();
cmdClient.getLCUPortAndPassword(async function (port, password) {
    DOMUtility.handleEvents()
    if(!port || !password){
        DOMUtility.renderConnectionError()
        return;
    }
    let lcuClient = new ApiClient(port, password)

    let {summonerId} = await lcuClient.getCurrentSummoner()
    let championsData = await lcuClient.getChampions(summonerId)
    let lootData = await lcuClient.getLoot()
    let imageData = await lcuClient.fetchImages(championsData)

    let championList = new ChampionList(championsData, imageData).sortList()
    let lootList = new LootList(lootData).getList()
    let counter = new CountUtility(championList.getList(), lootList)
    let domUtility = new DOMUtility(championList.getList(), counter);

    championList.attachLoot(lootList)
    domUtility.renderCounts()
    domUtility.renderChampionList()
    domUtility.handleFilters()
})