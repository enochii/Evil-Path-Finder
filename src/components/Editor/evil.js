// 单纯的 eval 只能引用局部变量
// function 可以利用绑定
export function runCodeWithEnv(obj){
    return Function('"use strict";return (' + obj + ')')()(
        PathFinder,BOARD_ROW,BOARD_COL,ITEM_CLICKED,ITEM_VISITED
    );
}

export function addAlgo(name, code) {
    // 加入 local storage
    storeLocal(name, code);
    // map
    // setState 让 header 更新
    var wrapped_code = 'function(PathFinder,BOARD_ROW,BOARD_COL,ITEM_CLICKED,ITEM_VISITED){\
        return ' + code +';}';
    var cls = runCodeWithEnv(wrapped_code);
    // name -> cls
    
}

function storeLocal(name, code) {
    if(localStorage.getItem(name) !=== null) {
        console.log('update ' + name);
    }
    localStorage.setItem(name, code);
}