import { ITEM_CLICKED } from "../constants";


export default class MgBase {
    // 这声明语法？
    constructor({startr, startc, endr, endc, updateItem}) {
        this.startr = startr;
        this.startc = startc;
        this.endr = endr;
        this.endc = endc;
        this.updateItem = updateItem;
    }
    setItemClicked(nx, ny, delay=0) {
        this.updateItem(nx, ny, ITEM_CLICKED, delay);
    }
}