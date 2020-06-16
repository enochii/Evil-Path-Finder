// @flow

import React, { useState, useContext, useEffect } from 'react';
import { Context } from 'Provider';
// import {CSSTransition} from 'react-transition-group'; // ES6
import {
  INITIAL_COLOR,
  VISITED_COLOR,
  KEYS,
  FIXED_COLOR,
  ITEM_INITIAL,
  ITEM_VISITED,
  ITEM_CLICKED,
  CLICKED_COLOR,
  ITEM_SHORTEST,
  SHORTEST_COLOR,
  ITEM_WALL,
  WALL_COLOR,
  BOARD_HEIGHT,
  ITEM_FIXED,
} from 'constants.js';
import './Item.scss';
import { pointEqual } from 'helper';
import Background from '../../styles/circle.svg'



const Item = ({ ridx, cidx }: { ridx: number, cidx: number }) => {
  const [type, setType] = useState(ITEM_INITIAL);
  const [num, setNum] = useState('');
  const { setItemCache, begin, end, pathFinder, setIsVisualized, board } = useContext(
    Context,
  );

  const setTypeWrapper = (type, i) => {
    setType(type);
    // if(type === ITEM_SHORTEST) console.log(i);
    if(type === ITEM_SHORTEST) {
      setNum(i);
    } else {
      setNum('');
    }
  }

  // setItemCache.current[KEYS[ridx][cidx]] = setType;
  setItemCache.current[KEYS[ridx][cidx]] = setTypeWrapper;

  useEffect(() => {
    if (
      type === ITEM_VISITED &&
      ridx === end.current.x &&
      cidx === end.current.y
    ) {
      pathFinder.current.paintShortestPath();
    }
  }, [type, end, pathFinder, ridx, cidx]);

  useEffect(() => {
    if (
      type === ITEM_SHORTEST &&
      ridx === end.current.x &&
      cidx === end.current.y
    ) {
      pathFinder.current.clearTimers();
      setIsVisualized(false);
    }
  }, [type, end, pathFinder, ridx, cidx, setIsVisualized]); // 仅在这些值更改时进行更新

  const getColor = () => {
    if (ridx === begin.current.x && cidx === begin.current.y)return FIXED_COLOR;
    else if(ridx === end.current.x && cidx === end.current.y)
    {
      return 'white';
    }
    // todo: 把常量换成数字，做个数组
    if (type === ITEM_VISITED) {
      return VISITED_COLOR;
    }
    if (type === ITEM_CLICKED) {
      return CLICKED_COLOR;
    }
    if (type === ITEM_SHORTEST) {
      return SHORTEST_COLOR;
    }
    if(type === ITEM_WALL) {
      return WALL_COLOR;
    }
    return INITIAL_COLOR;
  };


  const animationMap = {
    [ITEM_INITIAL]: 'none',
    [ITEM_VISITED]: 'visitedAnimation',
    [ITEM_CLICKED]: 'wallAnimation',
    [ITEM_SHORTEST]: 'shortestAnimation'
  }
  const getFrame = () => {
    if(pointEqual(ridx, cidx, begin.current) || pointEqual(ridx, cidx, end.current)) {
      return 'none';
    }
    return animationMap[type];
  }

  const getItemSize = () => {
	  return JSON.stringify(BOARD_HEIGHT / board.current.length) + "vh";
  }

  const getFontSize = () => {
    // 跟随棋盘高度摇摆~
    return String(20*16/board.current.length)+"px";
  }
//   console.log(getItemSize());
  const getBgImage = () => {
    var link = `url(${Background})`;
    return (ridx === end.current.x && cidx === end.current.y)? link : 'none'
  }

  return (
    // <CSSTransition in="true" timeout={200} classNames="example">
    <div
      className="board__item"
      data-type={type}
      data-ridx={ridx}
      data-cidx={cidx}
      style={{
        fontSize: getFontSize(),
		backgroundColor: getColor(),
		height: getItemSize(),
    width: getItemSize(),
    animationName: getFrame(),
    backgroundImage: getBgImage(),
        // boxShadow: 
      }}
    >
      <div className="shortest-num">{num}</div>
    </div>
    // </CSSTransition>
  );
};

export default Item;
