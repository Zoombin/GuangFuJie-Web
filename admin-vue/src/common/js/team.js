export default class Team {
    constructor({id, imgSrc, name, job, desc, activeState, sortOrder, createDate}) {
        this.id = id;
        this.imgSrc = imgSrc;
        this.name = name;
        this.job = job;
        this.desc = desc;
        this.activeState = activeState;
        this.sortOrder = sortOrder;
        this.createDate = createDate;
    }
}