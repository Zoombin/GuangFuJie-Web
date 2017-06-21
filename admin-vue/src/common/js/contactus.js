export default class ContactUs {
    constructor({id, name, tel, address, area, msg, isContact, createdDate}) {
        this.id = id;
        this.name = name;
        this.tel = tel;
        this.address = address;
        this.area = area;
        this.msg = msg;
        this.isContact = isContact;
        this.createdDate = createdDate;
    }
}