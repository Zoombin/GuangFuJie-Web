export default class Case {
    constructor({id, title, desc, imgSrc, imgSize, activeState, sortOrder, updateDate}) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.imgSrc = imgSrc;
        this.imgSize = imgSize;
        this.activeState = activeState;
        this.sortOrder = sortOrder;
        this.updateDate = updateDate;
    }

    static getProps() {
        return [
            'title',
            'desc',
            'imgSrc',
            'imgSize',
            'activeState',
            'sortOrder',
            'updateDate'
        ];
    }

    static getLables() {
        return [
            '标题',
            '副标题',
            '图片',
            '图片尺寸类型',
            '激活状态',
            '优先级',
            '最近更新'
        ];
    }
}