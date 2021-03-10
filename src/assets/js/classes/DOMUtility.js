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
            this.lcuClient.fetchImageData(champion.img, (base64image) => {
                let html = `
                    <div class="col-2">
                        <div class="champion_box">
                            <span class="ttip">
                                <img src="data:image/png;base64,`+base64image+`" alt="Image"/>
                                <span class="ttiptext">`+champion.name+`</span>
                            </span>
                            <div class="bottom">
                                <span class="ttip">
                                    <i class="fas fa-check-circle"></i>
                                    <span class="ttiptext">Owned Skins</span>
                                </span>
                                <span class="ttip">
                                    <i class="fas fa-times-circle"></i>
                                    <span class="ttiptext">Not Owned Skins</span>
                                </span>
                                <span class="ttip">
                                    <i class="fas fa-arrow-alt-circle-up"></i>
                                    <span class="ttiptext">Skin Shards</span>
                                </span>
                            </div>
                        </div>
                    </div>
                `
                $('#champion_container .champion_list').append(html);
            })
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