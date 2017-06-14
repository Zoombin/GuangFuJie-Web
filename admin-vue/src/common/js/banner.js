export default class Banner {
    constructor({id, imgSrc, activeState, sortOrder, createDate}) {
        this.id = id;
        this.imgSrc = imgSrc;
        this.activeState = activeState;
        this.sortOrder = sortOrder;
        this.createDate = createDate;
    }

    static getProps() {
        return [
            'imgSrc',
            'activeState',
            'sortOrder',
            'createDate'
        ];
    }
}