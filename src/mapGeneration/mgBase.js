import { ITEM_CLICKED } from "../constants";
import { pointEqual } from "helper";


export default class MgBase {
    // 这声明语法？
    constructor({start, end, board, updateItem, updateBoardSize}) {
        // this.startr = startr;
        // this.startc = startc;
        // this.endr = endr;
        // this.endc = endc;
        this.updateItem = updateItem;
        this.updateBoardSize = updateBoardSize;
    }
    setItemClicked(nx, ny, delay=0) {
        this.updateItem(nx, ny, ITEM_CLICKED, delay);
    }

    // 起始和终点不能放置障碍物
    canSetWall(x, y) {
        const {start, end } = this;
        return !pointEqual(x,y,start) || !pointEqual(x,y,end);
    }
}