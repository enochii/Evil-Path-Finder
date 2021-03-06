// @flow

import {   ITEM_VISITED } from 'constants.js';
import PathFinder, { type ConstructorType } from './pathFinder';

export default class Dfs extends PathFinder {
  constructor(args) {
    super(args);
    this.find = false;
    this.visited = [];
    for (let i = 0; i < this.board.length; i++) {
      this.visited[i] = Array(this.board[0].length).fill(false);
    }
  }

  _dfs = (x, y, timeFactor) => {
    const { prev, end, board, updateItem } = this;
    this.visited[x][y] = true;

    for (let i = 0; i < PathFinder.dx.length; i++) {
      const nextX = x + PathFinder.dx[i];
      const nextY = y + PathFinder.dy[i];

      if (nextX < 0 || nextX >= this.board.length || nextY < 0 || nextY >= this.board[0].length)
        continue;
      if (this.visited[nextX][nextY] || !this.canItemVisit(nextX, nextY))
        continue;

      prev[nextX][nextY] = { x, y };
      updateItem(nextX, nextY, ITEM_VISITED, timeFactor);

      if (nextX === end.x && nextY === end.y) {
        this.find = true;
        return;
      }
      this._dfs(nextX, nextY, timeFactor + 1);

      if (this.find) return;
    }
  };

  execute = () => {
    this._dfs(this.begin.x, this.begin.y, 1);
    if (!this.find) this.clearTimers();
    return this.find;
  };
}
