export default class News {
    constructor({id, imgSrc, activeState, sortOrder, content, link, title, createDate}) {
        this.id = id;
        this.imgSrc = imgSrc;
        this.activeState = activeState;
        this.title = title;
        this.link = link;
        this.sortOrder = sortOrder;
        this.content = content;
        this.createDate = createDate;
    }
};