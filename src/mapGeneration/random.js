import { ITEM_VISITED, ITEM_WALL, BOARD_COL, BOARD_ROW } from "constants.js";


// updateItem 是一个函数指针，用于可视化
export function MGRandom(updateItem) {
    console.log('Random Map!');
    for(var i=0; i < BOARD_COL; i++) {
        updateItem(0, i, ITEM_WALL);
    }
    for(var i=0; i < BOARD_ROW; i++) {
        updateItem(i, 0, ITEM_WALL);
    }
}