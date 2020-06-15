import { ALGO_LIST, localItemExist } from "components/Editor/evil";

export function pointEqual(x, y, obj) {
    return x == obj.x && y == obj.y;
}

export function beginOrEnd(x, y, begin, end){
    return pointEqual(x, y, begin) || pointEqual(x, y, end);
}

export function getLocalAlgoList() {
    try {
        if(!localItemExist(ALGO_LIST)) return [];
        var algoNames = localStorage.getItem(ALGO_LIST);
        algoNames = JSON.parse(algoNames);
        return algoNames;
    } catch {
        return [];
    }
}