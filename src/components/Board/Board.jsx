// @flow

import React, { useContext, useState, useRef } from 'react';
import { Context, type ContextType } from 'Provider';
import { KEYS, BOARD, ITEM_CLICKED, ITEM_INITIAL, ITEM_WALL, BOARD_COL, BOARD_ROW } from 'constants.js';
import './Board.scss';
import Item from '../Item/Item';

const Board = () => {
  const context = useContext<ContextType>(Context);
  const { updateItem, begin, end, isVisualized, board, setBoardSizeHook } = context;

  const [boardRow, setBoardRow] = useState(BOARD_ROW);
  const [boardCol, setBoardCol] = useState(BOARD_COL);

  // Hook
  setBoardSizeHook.current = [setBoardRow, setBoardCol];

  const [clicking, setClicking] = useState<boolean>(false);
  const [dragging, setDragging] = useState<{| begin: boolean, end: boolean |}>({
    begin: false,
    end: false,
  });
  const clickPos = useRef<{|x: number, y: number|}>({ x: -1, y: -1 });

  const onMouseDown = (e: ElementEvent<HTMLDivElement>) => {
    const ridx = Number(e.target.dataset.ridx);
    const cidx = Number(e.target.dataset.cidx);

    if (ridx === begin.current.x && cidx === begin.current.y) {
      setDragging({ begin: true, end: false });
    } else if (ridx === end.current.x && cidx === end.current.y) {
      setDragging({ begin: false, end: true });
    } else {
      clickPos.current = { x: ridx, y: cidx };
      setClicking(true);
    }
  };
  const onMouseUp = () => {
    setClicking(false);
    setDragging({ begin: false, end: false });
  };

  const changeColor = (e: ElementEvent<HTMLDivElement>, mouseMove: boolean) => {
    if (e.target.className !== 'board__item') return;
    const { type } = e.target.dataset;
    if (type !== ITEM_INITIAL && type !== ITEM_CLICKED) return;

    const ridx = Number(e.target.dataset.ridx);
    const cidx = Number(e.target.dataset.cidx);

    const itemType =
      type === ITEM_CLICKED && !mouseMove ? ITEM_INITIAL : ITEM_CLICKED;
    updateItem(ridx, cidx, itemType);
  };

  const onClick = (e: ElementEvent<HTMLDivElement>) => {
    if (isVisualized) return;
    // 这个 e 是和最开始点击的 e 绑定的，如果没有移到原位
    // 那么 e.*** 是 undefined ，这和手机点击移开取消是一回事！
    changeColor(e, false);
  };

  const onMouseMove = (e: ElementEvent<HTMLDivElement>) => {
    // console.log('onmove');
    if (isVisualized) return;
    if (e.target.className !== 'board__item') return;
    const { type } = e.target.dataset;
    if(type == ITEM_WALL) return;

    const ridx = Number(e.target.dataset.ridx);
    const cidx = Number(e.target.dataset.cidx);

    if (dragging.begin || dragging.end) {
      const formerX = dragging.begin ? begin.current.x : end.current.x;
      const formerY = dragging.begin ? begin.current.y : end.current.y;

      updateItem(formerX, formerY, ITEM_INITIAL);

      const next = { x: ridx, y: cidx };

      if (dragging.begin) {
        begin.current = next;
      } else {
        end.current = next;
      }

      updateItem(next.x, next.y);
    } else {
      if (!clicking) return;
      // 取消注释会导致 drag 方式第一个 item 不会着 clicked
      if (clickPos.current.x === ridx && clickPos.current.y === cidx) return;
      changeColor(e, true);
    }
  };

  return (
    <div
      className="board"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onClick={onClick}
      role="button"
      tabIndex="0"
    >
      {board.current.map((row, ridx) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="board__row" key={ridx}>
          {row.map((col, cidx) => (
            <Item ridx={ridx} cidx={cidx} key={KEYS[ridx][cidx]} />
          ))}
          <br />
        </div>
      ))}
    </div>
  );
};

export default Board;
