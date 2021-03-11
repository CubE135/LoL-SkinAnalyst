module.exports = class DOMUtility {
    lcuClient;
    championList;
    counter;

    filters;

    constructor(lcuClient, championList, counter) {
        this.lcuClient = lcuClient;
        this.championList = championList;
        this.counter = counter

        this.filters = {
            "filter_owned": false,
            "filter_unowned": false,
            "filter_skins_owned": false,
            "filter_skins_unowned": false,
            "filter_shards": false
        }
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

    handleFilters(){
        let _this = this
        $(document).on('click', '.filter_container span[id^="filter_"]', (e) => {
            _this.filters[e.target.id] = !_this.filters[e.target.id]
            _this.setFilterElementStatus(e.target.id, _this.filters[e.target.id])
            _this.filter()
        })
    }

    setFilterElementStatus(id, status){
        let element = $('#'+id)
        if (status){
            element.addClass('active')
        }else{
            element.removeClass('active')
        }
    }

    filter() {
        let champions = $('.champion_list').children()
        champions.hide()

        champions.each((_, element) => {
            let champion = $(element).data("champion")
            let show = true

            // Champion owned
            if(this.filters["filter_owned"]){
                if (!champion.owned) show = false
            }

            // Champion not owned
            if(this.filters["filter_unowned"]){
                if (champion.owned) show = false
            }

            // Skins owned
            if(this.filters["filter_skins_owned"]){
                let skinOwned = champion.skins.filter((skin) => {
                    return skin.owned === true
                })
                if(skinOwned.length <= 0) show = false
            }

            // Skins not owned
            if(this.filters["filter_skins_unowned"]){
                let skinOwned = champion.skins.filter((skin) => {
                    return skin.owned === true
                })
                if(skinOwned.length > 0) show = false
            }

            // Skin Shards owned
            if(this.filters["filter_shards"]){
                if(champion.skinShards.length <= 0) show = false
            }

            // If show is true, show the champion
            if(show){
                $(element).show()
            }
        })
    }
}