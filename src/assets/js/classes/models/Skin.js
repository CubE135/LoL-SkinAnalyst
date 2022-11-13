module.exports = class Skin {
    id;
    name;
    img;
    owned;
    type;

    constructor(skinData, storeItem) {
        this.id = skinData.name
        this.name = skinData.name
        this.img = skinData.tilePath
        this.owned = skinData.ownership.owned
        this.type = skinData.skinType
        this.storeItem = storeItem
    }
}