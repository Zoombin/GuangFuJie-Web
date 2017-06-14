export default class VisitorMsg {
    constructor({id, name, tel, address, area, msg, is_contact, created_date}) {
        this.id = id;
        this.name = name;
        this.tel = tel;
        this.address = address;
        this.area = area;
        this.msg = msg;
        this.isContact = is_contact;
        this.createdDate = created_date;
    }
}