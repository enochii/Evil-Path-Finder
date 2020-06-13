import { ITEM_WALL, ITEM_CLICKED } from "../constants";
import MgBase from "./mgBase";
import Recursion from "./RecursiveDivision";

export default class VerticalRecursion extends Recursion {
    constructor(args) {
        super(args);
        // 方向
        this.orientation_ = Recursion.VER;
    }
}
