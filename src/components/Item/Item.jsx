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
} from 'constants.js';
import './Item.scss';

const Item = ({ ridx, cidx }: { ridx: number, cidx: number }) => {
  const [type, setType] = useState(ITEM_INITIAL);
  const { setItemCache, begin, end, pathFinder, setIsVisualized, board } = useContext(
    Context,
  );

  setItemCache.current[KEYS[ridx][cidx]] = setType;

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
    if (
      (ridx === begin.current.x && cidx === begin.current.y) ||
      (ridx === end.current.x && cidx === end.current.y)
    ) {
      return FIXED_COLOR;
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

  const getItemSize = () => {
	return JSON.stringify(BOARD_HEIGHT / board.current.length) + "vh";
  }
//   console.log(getItemSize());

  return (
    // <CSSTransition in="true" timeout={200} classNames="example">
    <div
      className="board__item"
      data-type={type}
      data-ridx={ridx}
      data-cidx={cidx}
      style={{
		backgroundColor: getColor(),
		height: getItemSize(),
		width: getItemSize(),
        // boxShadow: 
      }}
    />
    // </CSSTransition>
  );
};

export default Item;
