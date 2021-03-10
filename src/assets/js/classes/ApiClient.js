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

    fetchImageData(imagePath, callback){
        $.ajax({
            type: "GET",
            // url: this.baseUrl+"/lol-game-data/assets/v1/champion-icons/1.png",
            url: this.baseUrl+imagePath,
            headers: {
                "Authorization": "Basic "+this.authToken
            },
            beforeSend: function (xhr) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
        }).done(function (result, textStatus, jqXHR) {
            let binary = "";
            for ( let i = 0; i < jqXHR.responseText.length; i++ ) {
                binary += String.fromCharCode(jqXHR.responseText.charCodeAt(i) & 255)
            }
            callback(btoa(binary))
            // $('#champion_container img').attr("src","data:image/png;base64,"+btoa(binary));
        });
    }
}