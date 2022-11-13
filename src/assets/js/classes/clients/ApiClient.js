const $ = require('jquery')
module.exports = class ApiClient {
    constructor(port, password) {
        this.baseUrl = 'https://127.0.0.1:'+port;
        this.authToken = btoa("riot:"+password);
        this.initAjax();
    }

    initAjax(){
        this.ajaxSettings = {
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Basic "+this.authToken
            },
        };
    }

    call(endpoint) {
        return $.ajax(this.baseUrl+endpoint, this.ajaxSettings);
    }

    getCurrentSummoner(){
        return this.call("/lol-summoner/v1/current-summoner")
    }

    getChampions(summonerId){
        return this.call("/lol-champions/v1/inventories/"+summonerId+"/champions")
    }

    getLoot(){
        return this.call("/lol-loot/v1/player-loot")
    }

    getStoreCatalog(){
        return this.call("/lol-store/v1/catalog")
    }

    fetchChampionImages(championData){
        let images = []
        championData.forEach((champion) => {
            images.push(champion.squarePortraitPath)
        })
        return this.fetchImages(images)
    }

    fetchImages(images){
        let promises = []
        images.forEach((image) => {
            promises.push(
                this.fetchImageData(image)
            )
        })
        return Promise.all(promises)
    }

    fetchImageData(imagePath){
        return $.ajax({
            type: "GET",
            url: this.baseUrl+imagePath,
            headers: {
                "Authorization": "Basic "+this.authToken
            },
            beforeSend: function (xhr) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
        })
    }
}