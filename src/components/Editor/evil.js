import PriorityQueue from 'js-priority-queue';
import Queue from 'queue-fifo';

import {BOARD_ROW,BOARD_COL,ITEM_CLICKED,ITEM_VISITED, INITIAL_COLOR} from '../../constants.js'
import PathFinder from 'algorithms/pathFinder'
import pathfinderMap from 'algorithms/index'
import { useContext } from 'react';
import { Context } from 'Provider.jsx';

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
    // 对代码做预处理
    code = preprocessCode(code);
    console.log(code);
    // map
    // setState 让 header 更新
    var wrapped_code = 'function(PathFinder,BOARD_ROW,BOARD_COL,ITEM_CLICKED,ITEM_VISITED){'
        + 'return ' + code +';}';
    try{
        var cls = runCodeWithEnv(wrapped_code);
        // name -> cls
        pathfinderMap[cls.name] = cls;
        // todo : 这里删除掉
        pathfinderMap[name] = cls;
        console.log(cls); alert('代码成功上传啦');
    } catch (error) {
        console.log(error);
        alert(error);
    }
    
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

// todo: 空格后 再 注释还无法消除
// 直接 抽一个 function isComment(line)
function preprocessCode(code :String){
    var codes = code.split('\n');
    var noComments = [];

    for(var i=0;i<codes.length;i++) {
        if((codes[i][0] == '/' && codes[i][1] == '/') || codes[i].length==0) {
            // console.log(codes[i]);
        } else {
            noComments.push(codes[i]);
        }
    }
    var ret = noComments.join('\n')
    // console.log(ret);
    return ret;
}