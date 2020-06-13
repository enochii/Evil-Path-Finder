import { ITEM_CLICKED } from "../constants";
import { pointEqual } from "helper";
import PathFinder from "algorithms/pathFinder";


export default class MgBase {
    // 这声明语法？
    constructor({begin, end, board, updateItem, updateBoardSize}) {
        // this.startr = startr;
        // this.startc = startc;
        // this.endr = endr;
        // this.endc = endc;
        // super(begin, end, updateItem, board);
        this.begin = begin;
        this.end = end;
        this.board = board;
        this.updateItem = updateItem;
        this.updateBoardSize = updateBoardSize;
        this.timers = [];
    }
    updateItem_ = (r,c,type,factor=0.1) => {
        this.updateItem(r,c,type,++this.cnt*factor);
    }
    setItemClicked(nx, ny, delay=0) {
        this.updateItem(nx, ny, ITEM_CLICKED, delay);
    }

    // 起始和终点不能放置障碍物
    canSetWall(x, y) {
        const {begin, end } = this;
        // console.log(begin);
        return !pointEqual(x,y,begin) || !pointEqual(x,y,end);
    }
}