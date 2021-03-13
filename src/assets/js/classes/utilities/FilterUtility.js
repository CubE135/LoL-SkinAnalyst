const Shuffle = require('shufflejs')

module.exports = class FilterUtility {
    shuffleInstance;

    constructor() {
        this.shuffleInstance = new Shuffle($('.filter-grid'), {
            itemSelector: '.filter-grid-item',
            filterMode: Shuffle.FilterMode.ALL
        })
        this.shuffleInstance.filter(Shuffle.ALL_ITEMS);
    }

    static hasSkins(champion){
        let result = false
        champion.skins.forEach((skin) => {
            if (skin.owned) result = true
        })
        return result
    }

    static getGroups(champion){
        let groups = []

        /** Champion owned */
        if(champion.owned) groups.push("filter_owned")

        /** Champion not owned */
        if(!champion.owned) groups.push("filter_unowned")

        /** Skins owned */
        if (this.hasSkins(champion)) groups.push("filter_skins_owned")

        /** No skins owned */
        if (!this.hasSkins(champion)) groups.push("filter_skins_unowned")

        /** SkinShards owned */
        if (champion.skinShards.length > 0) groups.push("filter_shards")

        return JSON.stringify(groups);
    }

    filter(filters){
        let activeFilters = []
        filters = Object.entries(filters)
        filters.forEach((filter) => {
            if(filter[1]){
                activeFilters.push(filter[0])
            }
        })
        this.shuffleInstance.filter(activeFilters);
    }
}