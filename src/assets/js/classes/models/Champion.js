const $ = require('jquery')
const Skin = require('./Skin.js')
const FilterUtility = require('../utilities/FilterUtility')

module.exports = class Champion {
    id;
    name;
    img;
    imageData;
    owned;
    purchaseDate;
    title;
    role;
    skins;
    skinShards;

    element;
    domUtility;

    constructor(championData, imageData, storeItems) {
        this.id = championData.id
        this.name = championData.name
        this.img = championData.squarePortraitPath
        this.imageData = this.transformToBase64(imageData)
        this.owned = championData.ownership.owned
        this.purchaseDate = championData.purchased
        this.title = championData.title
        this.role = championData.roles[0]
        this.storeItems = storeItems

        this.skins = []
        this.initSkinData(championData.skins)
    }

    initSkinData(skinsData){
        skinsData.forEach((skinData) => {
            if (skinData.isBase) return;
            const storeItem = this.storeItems.find(item => {
                return item.itemId === skinData.id
            })
            this.skins.push(new Skin(skinData, storeItem))
        })
    }

    transformToBase64(data){
        let binary = "";
        for ( let i = 0; i < data.length; i++ ) {
            binary += String.fromCharCode(data.charCodeAt(i) & 255)
        }
        return "data:image/png;base64,"+btoa(binary)
    }

    addSkinShards(skinShards){
        this.skinShards = skinShards
    }

    getSkins(owned){
        let skins = []
        this.skins.forEach((skin) => {
            if(owned){
                if (skin.owned) skins.push(skin)
            }else{
                if (!skin.owned) skins.push(skin)
            }
        })
        return skins
    }

    render(domUtility){
        this.domUtility = domUtility
        this.element = $(`
            <div class="col-2 filter-grid-item" data-groups='`+FilterUtility.getGroups(this)+`'>
                <div class="champion_box role_`+this.role+`">
                    <img src="`+this.imageData+`" alt="`+this.name+` Image" data-title="`+this.name+`" draggable="false"/>
                    <div class="bottom"></div>
                </div>
            </div>
        `)
        this.element.data("champion", this)
        this.addButtons()
        $('#champion_container .champion_list').append(this.element);
    }

    addButtons(){
        this.ownedSkinsBtn = $(`
            <span data-title="Owned Skins">
                <i class="fas fa-check-circle showOwnedSkins"></i>
            </span>
        `)
        this.notOwnedSkinsBtn = $(`
            <span data-title="Not owned Skins">
                <i class="fas fa-times-circle showNotOwnedSkins"></i>
            </span>
        `)
        this.skinShardsBtn = $(`
            <span data-title="Owned SkinShards">
                <i class="fas fa-arrow-alt-circle-up showSkinShards"></i>
            </span>
        `)

        this.ownedSkinsBtn.on('click', () => {this.domUtility.openModal('showOwnedSkins', this)})
        this.notOwnedSkinsBtn.on('click', () => {this.domUtility.openModal('showNotOwnedSkins', this)})
        this.skinShardsBtn.on('click', () => {this.domUtility.openModal('showSkinShards', this)})

        this.element.find('.bottom').append(this.ownedSkinsBtn)
        this.element.find('.bottom').append(this.notOwnedSkinsBtn)
        this.element.find('.bottom').append(this.skinShardsBtn)
    }
}