export default class Article {
    constructor({id, imgSrc, activeState, address, typeId, provinceId, cityId, areaId, typeName, content, title, updateDate}) {
        this.id = id;
        this.imgSrc = imgSrc;
        this.activeState = activeState;
        this.title = title;
        this.content = content;
        this.typeId = typeId;
        this.provinceId = provinceId;
        this.cityId = cityId;
        this.areaId = areaId;
        this.typeName = typeName;
        this.address = address;
        this.updateDate = updateDate;
    }
};