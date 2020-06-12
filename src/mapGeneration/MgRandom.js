
import { ITEM_WALL } from "../constants";
import MgBase from "./mgBase";

export default class MgRandom extends MgBase {
    constructor(args) {
        super(args);
    }

    excute = () => {
        console.log(this.updateBoardSize(10,20));
        for(var i=this.startc; i < this.endc; i++) {
            // console.log('??');
            this.updateItem(0, i, ITEM_WALL);
        }
        for(var j=this.startr; j < this.endr; j++) {
            this.updateItem(j, 0, ITEM_WALL);
        }
    }
}