const Skin = require('./Skin.js')

module.exports = class Champion {
    id;
    name;
    img;
    owned;
    purchaseDate;
    title;
    skins;

    constructor(championData) {
        this.id = championData.id
        this.name = championData.name
        this.img = championData.squarePortraitPath
        this.owned = championData.ownership.owned
        this.purchaseDate = championData.purchased
        this.title = championData.title

        this.skins = []
        this.initSkinData(championData.skins)
    }

    initSkinData(skinsData){
        skinsData.forEach((skinData) => {
            if (skinData.isBase) return;
            this.skins.push(new Skin(skinData))
        })
    }
}