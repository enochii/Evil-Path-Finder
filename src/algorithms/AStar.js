// @flow

import PriorityQueue from 'js-priority-queue';
import {    ITEM_VISITED } from 'constants.js';
import PathFinder, { type ConstructorType } from './pathFinder';

export default class AStar extends PathFinder {
  opened: Array<Array<boolean>>;

  constructor(args: ConstructorType) {
    super(args);
    this.opened = new Array(this.board.length);
    for (let i = 0; i < this.board.length; i++) {
      this.opened[i] = new Array(this.board[0].length).fill(false);
    }
    this.pq = new PriorityQueue<Object>({ comparator: (a, b) => a.f - b.f });
  }

  _h = (start: {| x: number, y: number |}): number => {
    return Math.abs(start.x - this.end.x) + Math.abs(start.y - this.end.y);
  };

  execute = (): boolean => {
    const { dist, pq, opened, board, updateItem, prev, begin, _h, end } = this;
    const fBegin = _h(begin);
    pq.queue({ x: begin.x, y: begin.y, f: fBegin });
    dist[begin.x][begin.y] = 0;
    opened[begin.x][begin.y] = true;
    console.log(this.opened);

    let find = false;
    let timeFactor = 1;

    while (pq.length) {
      const current: {| x: number, y: number, f: number |} = pq.peek();
      const currentX = current.x;
      const currentY = current.y;

      if (currentX === end.x && currentY === end.y) {
        pq.clear();
        find = true;
        break;
      }

      opened[currentX][currentY] = false;
      pq.dequeue();

      for (let i = 0; i < PathFinder.dx.length; i++) {
        const nextX: number = currentX + PathFinder.dx[i];
        const nextY: number = currentY + PathFinder.dy[i];

        if (nextX < 0 || nextX >= this.board.length || nextY < 0 || nextY >= this.board[0].length)
          continue;
        if (!this.canItemVisit(nextX, nextY)) continue;

        const g = dist[currentX][currentY] + 1;
        const nextF = g + _h({ x: nextX, y: nextY });

        if (g < dist[nextX][nextY]) {
          prev[nextX][nextY] = { x: currentX, y: currentY };
          dist[nextX][nextY] = g;

          updateItem(nextX, nextY, ITEM_VISITED, timeFactor);
          timeFactor++;

          if (opened[nextX][nextY] === false) {
            pq.queue({ x: nextX, y: nextY, f: nextF });
            opened[nextX][nextY] = true;
          }
        }
      }
    }
    if (!find) this.clearTimers();
    return find;
  };
}
