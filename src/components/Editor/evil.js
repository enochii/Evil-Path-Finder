import PriorityQueue from 'js-priority-queue';
import Queue from 'queue-fifo';

import {BOARD_ROW,BOARD_COL,ITEM_CLICKED,ITEM_VISITED, INITIAL_COLOR} from '../../constants.js'
import PathFinder from 'algorithms/pathFinder'
import pathfinderMap from 'algorithms/index'


export const ALGO_LIST = 'EPF_ALGO_LIST';
export function restoreAlgos() {
    var algoNames = localStorage.getItem(ALGO_LIST);
    if(algoNames === null) return ;
    algoNames = JSON.parse(algoNames);
    // restore
    algoNames.forEach(algo => {
        console.log(algo);
        if(!localItemExist(algo)) {
            console.log('error when loading ', algo);
            // continue;
        } else {
            // 绑定运行时环境
            // runCodeWrapper(code);
        }
    });
}
export function localItemExist(key) {
    return !(localStorage.getItem(key) === null);
}

// 单纯的 eval 只能引用局部变量
// function 可以利用绑定
// todo : -> board.length
function runCodeWithEnv(obj){
    return Function('"use strict";return (' + obj + ')')()(
        PathFinder, BOARD_ROW,BOARD_COL,ITEM_CLICKED,ITEM_VISITED
    );
}

function runCodeWrapper(code) {
    var wrapped_code = 'function(PathFinder,BOARD_ROW,BOARD_COL,ITEM_CLICKED,ITEM_VISITED){'
    + 'return ' + code +';}';
    try{
        var cls = runCodeWithEnv(wrapped_code);
        // name -> cls
        pathfinderMap[cls.name] = cls;
        
        // todo : 这里删除掉
        // pathfinderMap[name] = cls;
        console.log(cls); alert('代码成功上传啦');
        return cls.name;
    } catch (error) {
        console.log(error);
        alert(error);
        return false;
    }
}

export function addAlgo(name, code) {

    saveInitCode(code); // 保存用户编辑过的代码
    
    // 对代码做预处理
    code = preprocessCode(code);
    console.log(code);
    // 加入 local storage
    storeLocal(name, code);
    // map
    // setState 让 header 更新
    return runCodeWrapper(code);
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
        if((codes[i][0] == '/' && codes[i][1] == '/') || allBlank(codes[i])) {
            // console.log(codes[i]);
        } else {
            // console.log('line: ', i+1);
            if(i == 3) console.log(codes[i].length, '(', codes[i].charCodeAt(), ')');
            noComments.push(codes[i]);
        }
    }
    var ret = noComments.join('\n')
    // console.log(ret);
    return ret;
}

// todo: 这样可以处理 \r\n 和 \n 应该
function allBlank(line) {
    return line.replace(/\r/g, "").length == 0;
}