const $ = require('jquery')
const FilterUtility = require('./FilterUtility')
const tippy = require('tippy.js')

module.exports = class DOMUtility {
    championList;
    counter;
    lcuClient;

    filters;
    modal;

    constructor(championList, counter, lcuClient) {
        this.championList = championList;
        this.counter = counter
        this.lcuClient = lcuClient

        this.filters = {
            "filter_owned": false,
            "filter_unowned": false,
            "filter_skins_owned": false,
            "filter_skins_unowned": false,
            "filter_shards": false,
            "filter_sale": false,
            "filter_eternals_unowned": false
        }
        this.initModal()
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
            champion.render(this)
        })
        $('#champion_count').html('(' + this.championList.length + ')');
        this.handleTooltips('.champion_box img, .champion_box .bottom span')
    }

    static renderConnectionError(){
        $('.overlay').css('display', 'flex');
    }

    static handleEvents(){
        $(document).on('click', '#reload-page', () => {
            location.reload()
        })
        $(document).on('click', '.quit', () => {
            window.close()
        })
        $(document).on('click', '.minimize', () => {
            const electron = window.require('electron')
            electron.ipcRenderer.send('minimize')
        })
    }

    handleTooltips(classes){
        tippy.default(classes, {
            theme: 'custom',
            content: (reference) => reference.getAttribute('data-title')
        });
    }

    handleFilters(){
        let filterUtility = new FilterUtility()
        let _this = this
        $(document).on('click', '.filter_container span[id^="filter_"]', (e) => {
            _this.filters[e.target.id] = !_this.filters[e.target.id]
            _this.setFilterElementStatus(e.target.id, _this.filters[e.target.id])
            filterUtility.filter(this.filters)
        })
        $(document).on('click', '.filter_container .fa-search', (e) => {
            $('#search_box').show('fast', function() {
                $('#search_box').trigger('focus')
            });
        })
        $(document).on('blur', '#search_box', (e) => {
            $('#search_box').hide('fast', function() {
                $('#search_box').val('')
                filterUtility.filter(_this.filters)
            });
        })
        $(document).on('keyup', '.filter_container #search_box', (e) => {
            filterUtility.filter(_this.filters, e.target.value.toLowerCase())
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

    initModal(){
        let modal = new bootstrap.Modal(document.getElementById('modal'), {
            backdrop: true
        })
        this.modal = {
            'object': modal,
            'element': $(modal._element),
            'title': $(modal._element).find('.modal-title'),
            'body': $(modal._element).find('.modal-body'),
            'body_row': $(modal._element).find('.modal-body .row')
        }
    }

    openModal(type, champion){
        this.modal.body_row.empty()
        if (type === 'showOwnedSkins'){
            this.renderImageTiles(champion, champion.getSkins(true))
            this.modal.title.text('Owned Skins')
        }else if(type === 'showNotOwnedSkins'){
            this.renderImageTiles(champion, champion.getSkins(false))
            this.modal.title.text('Not owned Skins')
        }else if(type === 'showSkinShards'){
            this.renderImageTiles(champion, champion.skinShards)
            this.modal.title.text('Owned Skin Shards')
        }
        this.modal.object.show()
    }

    renderImageTiles(champion, skins){
        let images = skins.map(skin => {return skin.img})
        if(images.length === 0){
            this.modal.body_row.append(`
                <div class="col-12 text-center">
                    Nothing found..
                </div>
            `)
            return
        }
        this.lcuClient.fetchImages(images).then((imagesData) => {
            skins.forEach((skin, key) => {
                let priceData = this.calcSkinPrice(skin)
                skin.imgData = champion.transformToBase64(imagesData[key])
                this.modal.body_row.append(`
                    <div class="col-3 skinImageTile" data-title="`+skin.name+`">
                        <img src="`+skin.imgData+`" alt="`+skin.name+` Image" draggable="false"/>
                        <span class="price">`+priceData.price+`</span>
                        ` + (priceData.discount ? '<span class="discount">'+priceData.discount+'</span>' : '') + `
                    </div>
                `)
            })
            this.handleTooltips('.skinImageTile')
        })
    }

    calcSkinPrice(skin) {
        let price = skin?.storeItem?.sale?.prices[0]?.cost
        let discount = null
        if (price) {
            discount = (100 - Math.round(skin.storeItem.sale.prices[0].discount * 100)) + ' %'
            price += ' ' + skin.storeItem.sale.prices[0].currency
        } else {
            price = skin?.storeItem?.prices[0]?.cost
            if (price) {
                price += ' ' + skin.storeItem.prices[0].currency
            } else {
                price = 'n/a'
            }
        }
        return {price, discount}
    }
}