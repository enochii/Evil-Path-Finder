import { ITEM_WALL, ITEM_CLICKED } from "../constants";
import Recursion from "./RecursiveDivision";

export default class HorizontalRecursion extends Recursion {
    constructor(args) {
        super(args);
    }
    // 方向
    orientation_ = this.HOR;
}
