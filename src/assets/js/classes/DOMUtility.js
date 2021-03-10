module.exports = class DOMUtility {
    lcuClient;
    championList;
    counter;

    constructor(lcuClient, championList, counter) {
        this.lcuClient = lcuClient;
        this.championList = championList;
        this.counter = counter
    }

    renderCounts() {
        $('#skins_owned_stat .stat_content .big_number').html(this.counter.skinsOwnedCount)
        $('#skins_owned_stat .stat_content span span').html(this.counter.skinsNotOwnedCount)

        $('#skin_shards_owned_stat .stat_content .big_number').html(this.counter.skinShardCount)
        $('#skin_shards_owned_stat .stat_content span span').html(this.counter.skinShardLegendaryCount)

        $('#champs_owned_stat .stat_content .big_number').html(this.counter.championOwnedCount)
        $('#champs_owned_stat .stat_content span span').html(this.counter.championNotOwnedCount)
    }

    renderChampionList() {
        $('#champion_container .champion_list').empty()
        this.championList.forEach((champion) => {
            champion.render(this.lcuClient)
        })
    }

    static renderConnectionError(){
        $('.overlay').css('display', 'flex');
    }

    static handleEvents(){
        $(document).on('click', '#reload-page', () => {
            location.reload()
        })

        $(document).on('click', '.quit', () => {
            window.close();
        })
    }
}