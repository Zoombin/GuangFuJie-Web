export default class Case {
    constructor({id, title, desc, imgSrc, imgSize, content, activeState, sortOrder, updateDate}) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.imgSrc = imgSrc;
        this.imgSize = imgSize;
        this.content = content;
        this.activeState = activeState;
        this.sortOrder = sortOrder;
        this.updateDate = updateDate;
    }
}