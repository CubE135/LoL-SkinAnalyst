import $ from 'jquery'
import FilterUtility from '../utilities/FilterUtility'
import tippy from 'tippy.js'
import * as bootstrap from 'bootstrap'
import Champion from '../models/Champion'
import CountUtility from './CountUtility'
import ApiClient from '../clients/ApiClient'
import Skin from '../models/Skin'
import SkinShard from '../models/SkinShard'
import { getChampionSkinSplashUrlFromId } from './DDragon'

export default class DOMUtility {
  championList: Champion[]
  counter: CountUtility
  lcuClient: ApiClient

  filters: FiltersType
  modal: BootstrapModalType

  constructor(
    championList: Champion[],
    counter: CountUtility,
    lcuClient: ApiClient
  ) {
    this.championList = championList
    this.counter = counter
    this.lcuClient = lcuClient

    this.filters = {
      filter_owned: false,
      filter_unowned: false,
      filter_skins_owned: false,
      filter_skins_unowned: false,
      filter_shards: false,
      filter_sale: false,
      filter_eternals_unowned: false
    }
    this.initModal()
  }

  renderCounts() {
    $('#skins_owned_stat .stat_content .big_number').html(
      this.counter.skinsOwnedCount.toString()
    )
    $('#skins_owned_stat .stat_content span span').html(
      this.counter.skinsNotOwnedCount.toString()
    )

    $('#skin_shards_owned_stat .stat_content .big_number').html(
      this.counter.skinShardCount.toString()
    )
    $('#skin_shards_owned_stat .stat_content span span').html(
      this.counter.skinShardLegendaryCount.toString()
    )

    $('#champs_owned_stat .stat_content .big_number').html(
      this.counter.championOwnedCount.toString()
    )
    $('#champs_owned_stat .stat_content span span').html(
      this.counter.championNotOwnedCount.toString()
    )
  }

  renderChampionList() {
    $('#champion_container .champion_list').empty()
    this.championList.forEach((champion) => {
      champion.render(this)
    })
    $('#champion_count').html('(' + this.championList.length + ')')
    this.handleTooltips('.champion_box img, .champion_box .bottom span')
  }

  static renderConnectionError() {
    $('.overlay').css('display', 'flex')
  }

  static handleEvents() {
    $(document).on('click', '#reload-page', () => {
      location.reload()
    })
    $(document).on('click', '.quit', () => {
      window.close()
    })
    $(document).on('click', '.minimize', () => {
      window.electronAPI.minimize()
    })
  }

  handleTooltips(classes: string) {
    tippy(classes, {
      theme: 'custom',
      content: (reference) => reference.getAttribute('data-title')
    })
  }

  handleFilters() {
    let filterUtility = new FilterUtility()
    let _this = this
    $(document).on('click', '.filter_container span[id^="filter_"]', (e) => {
      const targetId = e.target.id as FilterKeyType
      _this.filters[targetId] = !_this.filters[targetId]
      _this.setFilterElementStatus(targetId, _this.filters[targetId])
      filterUtility.filter(this.filters)
    })
    $(document).on('click', '.filter_container .fa-search', (e) => {
      $('#search_box').show('fast', function () {
        $('#search_box').trigger('focus')
      })
    })
    $(document).on('blur', '#search_box', (e) => {
      $('#search_box').hide('fast', function () {
        $('#search_box').val('')
        filterUtility.filter(_this.filters)
      })
    })
    $(document).on('keyup', '.filter_container #search_box', (e) => {
      filterUtility.filter(_this.filters, e.target.value.toLowerCase())
    })
  }

  setFilterElementStatus(id: FilterKeyType, status: boolean) {
    let element = $('#' + id)
    if (status) {
      element.addClass('active')
    } else {
      element.removeClass('active')
    }
  }

  initModal() {
    const modalElement = document.getElementById('modal')!
    let modal = new bootstrap.Modal(document.getElementById('modal'), {
      backdrop: true
    })
    this.modal = {
      object: modal,
      element: $(modalElement),
      title: $(modalElement).find('.modal-title'),
      body: $(modalElement).find('.modal-body'),
      body_row: $(modalElement).find('.modal-body .row')
    }
  }

  openModal(type: string, champion: Champion) {
    this.modal.body_row.empty()
    if (type === 'showOwnedSkins') {
      this.renderImageTiles(champion, champion.getSkins(true))
      this.modal.title.text('Owned Skins')
    } else if (type === 'showNotOwnedSkins') {
      this.renderImageTiles(champion, champion.getSkins(false))
      this.modal.title.text('Not owned Skins')
    } else if (type === 'showSkinShards') {
      this.renderImageTiles(champion, champion.skinShards)
      this.modal.title.text('Owned Skin Shards')
    }
    this.modal.object.show()
  }

  async renderImageTiles(champion: Champion, skins: Skin[] | SkinShard[]) {
    if (skins.length === 0) {
      this.modal.body_row.append(`
                <div class="col-12 text-center">
                    Nothing found..
                </div>
            `)
      return
    }

    const skinSplashArtUrls: string[] = []
    for (const skin of skins) {
      const skinId = Number(
        skin.id.toString().replace(champion.id.toString(), '')
      )

      const splashArtUrl = await getChampionSkinSplashUrlFromId(
        champion.id,
        skinId
      )
      skinSplashArtUrls[skin.id] = splashArtUrl
    }

    skins.forEach((skin, key) => {
      let priceData = this.calcSkinPrice(skin)

      const discountHtml = priceData.discount
        ? `<span class="discount">-${100 - priceData.discount} %</span>`
        : ''

      const priceHtml = `<span class="price">
      ${priceData.price >= 0 ? priceData.price : 'n/a'}
      <img src="${priceData.icon}" style="width:16px;">
      </span>`

      const skinTileHtml = `
      <div class="col-3 skinImageTile" data-title="${skin.name}">
      <img src="${skinSplashArtUrls[skin.id]}" alt="${skin.name} Image" draggable="false" />
      ${priceHtml}
      ${discountHtml}
      </div>
      `

      this.modal.body_row.append(skinTileHtml)
    })
    this.handleTooltips('.skinImageTile')
  }

  calcSkinPrice(skin: SkinShard | Skin) {
    let price: number
    let isDiscount: boolean
    let discount: number
    let currency: string
    let icon: string
    if (skin instanceof Skin) {
      price = skin.storeItem?.sale?.prices[0]?.cost
      discount = null
      if (price) {
        currency = skin.storeItem?.sale?.prices[0].currency
        discount =
          100 - Math.round(skin.storeItem?.sale?.prices[0].discount * 100)
      } else {
        price = skin.storeItem?.prices[0]?.cost
        if (price) {
          currency = skin.storeItem?.prices[0].currency
        } else {
          price = -1
        }
      }
    } else if (skin instanceof SkinShard) {
      currency = 'OE'
      price = skin.upgradeEssenceValue
      isDiscount = false
    } else {
      price = -1
      isDiscount = false
    }
    if (currency === 'RP') {
      icon =
        'https://wiki.leagueoflegends.com/en-us/images/thumb/RP_icon.png/20px-RP_icon.png'
    } else if (currency === 'OE') {
      icon =
        'https://wiki.leagueoflegends.com/en-us/images/thumb/OE_icon.png/20px-OE_icon.png'
    } else {
      icon =
        'https://wiki.leagueoflegends.com/en-us/images/thumb/BE_icon.png/20px-BE_icon.png'
    }
    return { price, discount, currency, icon }
  }
}
