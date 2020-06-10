import { ITEM_VISITED } from "constants.js";


// updateItem 是一个函数指针，用于可视化
export function MGRandom(updateItem) {
    console.log('Random Map!');
    updateItem(1,1,ITEM_VISITED);
}