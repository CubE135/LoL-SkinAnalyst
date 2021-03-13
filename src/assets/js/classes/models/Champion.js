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

    constructor(championData, imageData) {
        this.id = championData.id
        this.name = championData.name
        this.img = championData.squarePortraitPath
        this.imageData = this.transformToBase64(imageData)
        this.owned = championData.ownership.owned
        this.purchaseDate = championData.purchased
        this.title = championData.title
        this.role = championData.roles[0]

        this.skins = []
        this.initSkinData(championData.skins)
    }

    initSkinData(skinsData){
        skinsData.forEach((skinData) => {
            if (skinData.isBase) return;
            this.skins.push(new Skin(skinData))
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

    render(){
        this.element = $(`
            <div class="col-2 filter-grid-item" data-groups='`+FilterUtility.getGroups(this)+`'>
                <div class="champion_box role_`+this.role+`">
                    <span class="ttip">
                        <img src="`+this.imageData+`" alt="Image"/>
                        <span class="ttiptext">`+this.name+`</span>
                    </span>
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
            <span class="ttip">
                <i class="fas fa-check-circle showOwnedSkins"></i>
                <span class="ttiptext">Owned Skins</span>
            </span>
        `)
        this.notOwnedSkinsBtn = $(`
            <span class="ttip">
                <i class="fas fa-times-circle showNotOwnedSkins"></i>
                <span class="ttiptext">Not Owned Skins</span>
            </span>
        `)
        this.skinShardsBtn = $(`
            <span class="ttip">
                <i class="fas fa-arrow-alt-circle-up showSkinShards"></i>
                <span class="ttiptext">Skin Shards</span>
            </span>
        `)

        this.ownedSkinsBtn.on('click', this.showSkinsOwned)
        this.notOwnedSkinsBtn.on('click', this.showSkinsNotOwned)
        this.skinShardsBtn.on('click', this.showSkinShards)

        this.element.find('.bottom').append(this.ownedSkinsBtn)
        this.element.find('.bottom').append(this.notOwnedSkinsBtn)
        this.element.find('.bottom').append(this.skinShardsBtn)
    }

    showSkinsOwned(){
        console.log("show skins owned")
    }

    showSkinsNotOwned() {
        console.log("show skins not owned")
    }

    showSkinShards() {
        console.log("show skin shards")
    }
}