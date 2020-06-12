
export function pointEqual(x, y, obj) {
    return x == obj.x && y == obj.y;
}

export function beginOrEnd(x, y, begin, end){
    return pointEqual(x, y, begin) || pointEqual(x, y, end);
}