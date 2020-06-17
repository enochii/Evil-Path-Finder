import { ITEM_WALL, ITEM_CLICKED } from "../constants";
import MgBase from "./mgBase";

export default class Stair extends MgBase {
    constructor(args) {
        super(args);
    }

    excute = () => {
        const {board} = this;
		console.log(board);
        this.stairDemo_(board);
    }
    stairDemo_(board) {
		console.log(board);
        let currentIdX = board.length - 1;
        let currentIdY = 0;
        
        while (currentIdX > 0 && currentIdY < board[0].length) {
          	if (this.canSetWall(currentIdX, currentIdY)) {
				this.updateItem_(currentIdX, currentIdY, ITEM_CLICKED, 0.2);
          	}
			currentIdX--;
			currentIdY++;
		}
		currentIdX++;
        while (currentIdX < board.length - 2 && currentIdY < board[0].length) {
		if (this.canSetWall(currentIdX, currentIdY)) {
			this.updateItem_(currentIdX, currentIdY, ITEM_CLICKED, 0.2);
		}
          currentIdX++;
          currentIdY++;
        }
        while (currentIdX > 0 && currentIdY < board[0].length - 1) {
          	if (this.canSetWall(currentIdX, currentIdY)) {
      			this.updateItem_(currentIdX, currentIdY, ITEM_CLICKED, 0.2);
          	}
			currentIdX--;
			currentIdY++;
        }
    }    
}