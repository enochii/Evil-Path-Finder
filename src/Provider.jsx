// @flow

import React, { createContext, useRef, useState, type Node } from 'react';
import Timer from 'algorithms/Timer';
import {
  BOARD,
  KEYS,
  DELAY_FAST,
  ITEM_INITIAL,
  ITEM_FIXED,
  ITEM_CLICKED,
  BOARD_ROW,
  BOARD_COL,
  BELLMAN_FORD,
  BFS,
  DFS,
  A_STAR,
  DIJKSTRA,
  ORGINAL_ALGOS,
} from './constants';
import { ALGO_LIST, localItemExist, runCodeWrapper } from 'components/Editor/evil';
import { getLocalAlgoList } from 'helper';

type PositionType = {| x: number, y: number |};
type SetItemCacheType = { [key: string]: (string) => void };


export type ContextType = {|
  isPathExist: boolean,
  isVisualized: boolean,
  isHelped: boolean,
  isCoding: boolean,

  begin: { current: PositionType },
  end: { current: PositionType },
  board: { current: Array<Array<string>> },
  setItemCache: { current: SetItemCacheType },
  setBoardSizeHook:{ current: Array<void> } , // 补丁
  pathFinder: { current: any },
  delay: { current: number },
  algorithms: {current: Array<string>},

  clear: void => void,
  clearPath: void => void,
  updateItem: (number, number, string, number) => void,
  updateBoardSize: (number, number) => void,

  setIsPathExist: boolean => void,
  setIsVisualized: boolean => void,
  setIsHelped: boolean => void,
  setIsCoding: boolean => void,
  addAlgoToHeader: string => void,
|};

const Context = createContext<ContextType>();
// const ALGOS = [DIJKSTRA ,BELLMAN_FORD, BFS, DFS, A_STAR];

const Provider = ({ children }: Node) => {
  const [isPathExist, setIsPathExist] = useState<boolean>(true);
  const [isVisualized, setIsVisualized] = useState<boolean>(false);
  const [isHelped, setIsHelped] = useState<boolean>(true);
  // 代码编辑器是否打开
  const [isCoding, setIsCoding] = useState<boolean>(false);
  const algorithms = useRef<Array<string>>(ORGINAL_ALGOS);

  const begin = useRef<PositionType>({ x: Math.round(BOARD_ROW / 2), y: 2 });
  const end = useRef<PositionType>({
    x: Math.round(BOARD_ROW / 2),
    y: BOARD_COL - 3,
  });
  // board 可变，BOARD 不可变
  const board = useRef<Array<Array<string>>>(JSON.parse(JSON.stringify(BOARD)));
  const setItemCache = useRef<SetItemCacheType>({});
  const pathFinder = useRef<Array<void>>(null);
  const delay = useRef<number>(DELAY_FAST);
  const setBoardSizeHook = useRef<any>(null);
  // board 的 开始与结束
  // const [startc, setStartc] = useState(0);
  // const [startr, setStartr] = useState(0);
  // const [endc, setEndc] = useState(BOARD_COL);
  // const [endr, setEndr] = useState(BOARD_ROW);

  function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    } else {
		while(i-- > 0) arr[i] = ITEM_INITIAL;
    }

    return arr;
  }

  const hasAlgo = (name) => {
    return algorithms.current.includes(name.toUpperCase());
  }
  const addAlgoToHeader = (name) => {
    if(!hasAlgo(name)) algorithms.current = algorithms.current.concat(name.toUpperCase());
  }
  const updateBoardSize = (br, bc) => {
    board.current = createArray(br, bc);
    // 拿到 hook
    const setRow = setBoardSizeHook.current[0];
    const setCol = setBoardSizeHook.current[1];
    // 更新 begin 和 end
    begin.current = {x : Math.round(br / 2), y: 2};
    end.current   = {x : Math.round(br / 2), y: bc-3};
    setRow(br);
    setCol(bc);
    clear();
  }

  const updateItem = (
    ridx,
    cidx,
    type: string = ITEM_FIXED,
    timeFactor: number = 0,
  ) => {
    board.current[ridx][cidx] = type;
    const setItem = setItemCache.current[KEYS[ridx][cidx]];

    if (timeFactor) {
      const timer = new Timer({
        callback: () => setItem(type, timeFactor),
        delay: timeFactor * delay.current,
      });
      pathFinder.current.timers.push(timer);
    } else {
      setItem(type);
    }
    // console.log(board);
    // console.log(BOARD);
  };

  const clear = () => {
    if (!isPathExist) setIsPathExist(true);
    if (isVisualized) setIsVisualized(false);
    const currentBoard = board.current;
    currentBoard.forEach((row, ridx) => {
      row.forEach((item, cidx) => {
        updateItem(ridx, cidx, ITEM_INITIAL);
      });
    });
  };

  const clearPath = () => {
    board.current.forEach((row, ridx) => {
      row.forEach((item, cidx) => {
        if (board.current[ridx][cidx] !== ITEM_CLICKED) {
          updateItem(ridx, cidx, ITEM_INITIAL);
        }
      });
    });
  };

  // todo ： 添加新算法后会把新算法加入header两次？
  // 一次是主动，一次是关闭 modal 会刷新页面
  // 不过这里做了一个 return 问题不大
  const restoreAlgos = () => {
    var algoNames = getLocalAlgoList();
    // restore
    algoNames.forEach(algo => {
		// todo : 如果覆盖自带的算法可能会有点问题
		if(hasAlgo(algo)) {
			console.log('already load algo', algo);
			return;
		}
        console.log(algo);
        if(!localItemExist(algo)) {
            console.log('error when loading ', algo);
            // continue;
        } else {
            // 绑定运行时环境
            var code = localStorage.getItem(algo);
            var succ = runCodeWrapper(code);
            if(succ) {
				console.log('resume ', succ);
				addAlgoToHeader(succ);
            } else {
				console.log('load ', algo, ' error');
			}
        }
    });
}

	restoreAlgos();

  return (
    <Context.Provider
      value={{
        // States
        isPathExist,
        isVisualized,
        isHelped,
        isCoding,

        // Methods
        clear,
        clearPath,
        updateItem,
        setIsPathExist,
        setIsVisualized,
        setIsHelped,
        setIsCoding,
        updateBoardSize,
        addAlgoToHeader,
        // setStartc,
        // setStartr,
        // setEndc,
        // setEndr,

        // Refs
        pathFinder,
        begin,
        end,
        board,
        setItemCache,
        setBoardSizeHook,
        delay,
        algorithms,
        // startc,
        // startr,
        // endr,
        // endc
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
