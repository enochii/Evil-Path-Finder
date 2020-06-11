// @flow

import PriorityQueue from 'js-priority-queue';
import {   ITEM_CLICKED, ITEM_VISITED } from 'constants.js';
import PathFinder, { type ConstructorType } from './pathFinder';

export default class Dijkstra extends PathFinder {
  constructor(args: ConstructorType) {
    super(args);
    this.pq = new PriorityQueue({ comparator: (a, b) => a.d - b.d });
  }

  // 奇形怪状的 path 调试贼久，以为是 Bug 
  execute = (): boolean => {
    const { pq, dist, prev, board, begin, end, updateItem } = this;

    pq.queue({ x: begin.x, y: begin.y, d: 0 });
    dist[begin.x][begin.y] = 0;
    let find = false;

    var cnt = 0;
    while (pq.length) {
      ++cnt;
      // const current: {| x: number, y: number, d: number |} = pq.peek();
      const current = pq.dequeue();
      const currentX: number = current.x;
      const currentY: number = current.y;
      const currentD: number = current.d;
      if(this.board[currentX][currentY] === ITEM_VISITED) {alert(current); continue;}
      else {
        // dijkstra 访问过的点有两层
        // - 访问过
        // - 已经是最近的点
        // 如果还没访问过，现在这是最近的点
        this.visitItem(currentX, currentY, currentD);
      }
      if (currentX === end.x && currentY === end.y) {
        find = true;
        // console.log(pq);
        pq.clear();
        console.log(cnt);
        console.log(dist);
        return true;
      }

      for (let i = 0; i < PathFinder.dx.length; i++) {
        var nextX = currentX + PathFinder.dx[i];
        var nextY = currentY + PathFinder.dy[i];

        if (nextX < 0 || nextX >= this.board.length || nextY < 0 || nextY >= this.board[0].length)
          continue;
        if (
          dist[currentX][currentY] === Infinity ||
          dist[currentX][currentY] + 1 >= dist[nextX][nextY]
        )
          continue;
        if (!this.canItemVisit(nextX, nextY)) continue;

        // board[nextX][nextY] = ITEM_VISITED;
        // updateItem(nextX, nextY, ITEM_VISITED, currentD);
        prev[nextX][nextY] = {x: currentX, y:currentY, d:currentD+1};

        dist[nextX][nextY] = dist[currentX][currentY] + 1;
        pq.queue({ x: nextX, y: nextY, d: dist[nextX][nextY] });
      }

      // if (find) {
      //   pq.clear();
      //   return true;
      // }
    }
    this.clearTimers();
    return false;
  };
}
