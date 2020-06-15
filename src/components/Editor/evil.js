import PriorityQueue from 'js-priority-queue';
import Queue from 'queue-fifo';

import {BOARD_ROW,BOARD_COL,ITEM_CLICKED,ITEM_VISITED, INITIAL_COLOR,ORGINAL_ALGOS} from '../../constants.js'
import PathFinder from 'algorithms/pathFinder'
import pathfinderMap from 'algorithms/index'


export const ALGO_LIST = 'EPF_ALGO_LIST';

export function localItemExist(key) {
    var val = localStorage.getItem(key);
    console.log(val===null);
    return !(val === null) && !(val === "undefined");
}

// 单纯的 eval 只能引用局部变量
// function 可以利用绑定
// todo : -> board.length
function runCodeWithEnv(obj){
    return Function('"use strict";return (' + obj + ')')()(
        PathFinder, BOARD_ROW,BOARD_COL,ITEM_CLICKED,ITEM_VISITED, PriorityQueue,Queue
    );
}

export function runCodeWrapper(code) {
    // console.log(code);
    var wrapped_code = 'function(PathFinder,BOARD_ROW,BOARD_COL,ITEM_CLICKED,ITEM_VISITED,PriorityQueue,Queue){'
    + 'return ' + code +';}';
    try{
        var cls = runCodeWithEnv(wrapped_code);
        // name -> cls
        var name = cls.name.toUpperCase();
        pathfinderMap[name] = cls;
        // 这里的名字是正确的，代码也是预处理过的...
        storeLocal(name, code);

        console.log(cls); 
        return name;
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
    // storeLocal(name, code);
    // map
    // setState 让 header 更新
    return runCodeWrapper(code);
}

// delegate 可以是添加或者删除
function modifyLocalAlgoList(name, delegate) {
    // storeLocal(name, code);
    // 加入列表，便于后续的恢复
    if(!localItemExist(ALGO_LIST)) {
        // 初始化一个数组
        var algoList = [];
    } else {
        var algoList = localStorage.getItem(ALGO_LIST);
        // console.log(algoList);
        algoList = JSON.parse(algoList);
    }
    // console.log(algoList);
    // todo?
    algoList = delegate(algoList, name);
    localStorage.setItem(ALGO_LIST, JSON.stringify(algoList));
}

// 只会在 AceWrapper 被调用！
export function addLocalAlgoList(name, code) {
    function add(algoList, name) {
        algoList = algoList.concat(name); 
        return algoList;
    }
    // todo?
    modifyLocalAlgoList(name, add);
}
// 删除某个算法
export function rmLocalAlgoList(name, code) {
    function rm(algoList, name) {
        console.log(name);
        var index = algoList.indexOf(name);
        console.log(algoList);
        if(index == -1) {
            alert("You'd better not to remove original ALGO!");
            return algoList;
        }
        console.log(index);
        algoList.splice(algoList.indexOf(name), 1);
        // console.log('deleted: ', algoList); 
        return algoList;
    }
    // todo?
    modifyLocalAlgoList(name, rm);
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