import PriorityQueue from 'js-priority-queue';
import Queue from 'queue-fifo';

import {BOARD_ROW,BOARD_COL,ITEM_CLICKED,ITEM_VISITED, INITIAL_COLOR} from '../../constants.js'
import PathFinder from 'algorithms/pathFinder'
import pathfinderMap from 'algorithms/index'

// 单纯的 eval 只能引用局部变量
// function 可以利用绑定
function runCodeWithEnv(obj){
    return Function('"use strict";return (' + obj + ')')()(
        PathFinder, BOARD_ROW,BOARD_COL,ITEM_CLICKED,ITEM_VISITED
    );
}

export function addAlgo(name, code) {
    saveInitCode(code); // 保存用户编辑过的代码
    // 加入 local storage
    storeLocal(name, code);
    // map
    // setState 让 header 更新
    var wrapped_code = 'function(PathFinder,BOARD_ROW,BOARD_COL,ITEM_CLICKED,ITEM_VISITED){'
        + 'return ' + code +';}';
    var cls = runCodeWithEnv(wrapped_code);
    // name -> cls
    console.log(cls);
    pathfinderMap[name] = cls;
}

function storeLocal(name, code) {
    if(!(localStorage.getItem(name) === null)) {
        console.log('update ' + name);
    }
    localStorage.setItem(name, code);
}

export function getInitCode() {
    return localStorage.getItem(INTI_CODE_KEY);
}

// 可以考虑做一个 save 按钮或者 Ctrl+S
export function saveInitCode(code) {
    storeLocal(INTI_CODE_KEY, code); // 可用于恢复用户编辑过的代码
}

const INTI_CODE_KEY = 'init-code';