const FilterUtility = require('./FilterUtility')

module.exports = class DOMUtility {
    championList;
    counter;

    filters;

    constructor(championList, counter) {
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
            champion.render()
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
        let filterUtility = new FilterUtility()
        let _this = this
        $(document).on('click', '.filter_container span[id^="filter_"]', (e) => {
            _this.filters[e.target.id] = !_this.filters[e.target.id]
            _this.setFilterElementStatus(e.target.id, _this.filters[e.target.id])
            filterUtility.filter(this.filters)
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
}