const $ = require('jquery')
const ApiClient = require('./assets/js/classes/ApiClient.js')
const CmdClient = require('./assets/js/classes/CmdClient.js')
const DOMUtility = require('./assets/js/classes/DOMUtility.js')
const Counter = require('./assets/js/classes/Counter.js')
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

    let championList = new ChampionList(championsData).getList()
    let lootList = new LootList(lootData).getList()
    let counter = new Counter(championList, lootList)
    let domUtility = new DOMUtility(lcuClient, championList, counter);
    domUtility.renderCounts()
    domUtility.renderChampionList()
})