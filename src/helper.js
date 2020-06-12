import { ALGO_LIST } from "components/Editor/evil";

export function pointEqual(x, y, obj) {
    return x == obj.x && y == obj.y;
}

export function beginOrEnd(x, y, begin, end){
    return pointEqual(x, y, begin) || pointEqual(x, y, end);
}

export function getLocalAlgoList() {
    try {
        var algoNames = localStorage.getItem(ALGO_LIST);
        if(algoNames === null) return ;
        algoNames = JSON.parse(algoNames);
        return algoNames;
    } catch {
        return [];
    }
}