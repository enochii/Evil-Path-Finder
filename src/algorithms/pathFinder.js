// @flow

import {   ITEM_SHORTEST, ITEM_CLICKED, ITEM_WALL } from 'constants.js';
import Timer from './Timer';

export type ConstructorType = {
  begin: {| x: number, y: number |},
  end: {| x: number, y: number |},
  updateItem: (number, number, string, ?number) => void,
  board: Array<Array<string>>,
};

export default class PathFinder {
  begin: {| x: number, y: number |};

  end: {| x: number, y: number |};

  updateItem: (number, number, string, ?number) => void;

  board: Array<Array<string>>;

  timers: Array<Timer>;

  dist: Array<Array<number>>;

  prev: Array<Array<{| x: number, y: number |}>>;

  static dx: Array<number>;

  static dy: Array<number>;

  constructor({ begin, end, updateItem, board }: ConstructorType) {
    this.begin = begin;
    this.end = end;
    this.updateItem = updateItem;
    this.board = board;
    this.timers = [];
    this._init();
  }

  static dx = [-1, 1, 0, 0];

  static dy = [0, 0, -1, 1];

  _init = () => {
    this.dist = new Array(this.board.length);
    this.prev = new Array(this.board.length);
    for (let i = 0; i < this.board.length; i++) {
      this.dist[i] = [];
      this.prev[i] = [];
      for (let j = 0; j < this.board[0].length; j++) {
        this.dist[i][j] = Infinity;
        this.prev[i][j] = { x: -1, y: -1 };
      }
    }
    this.dist[this.begin.x][this.begin.y] = 0;
  };

  canItemVisit(nx, ny) {
    var state = this.board[nx][ny];
    return state != ITEM_CLICKED && state != ITEM_WALL;
  }
  
  clearTimers() {
    this.timers.forEach((timer: Timer) => {
      timer.destroy();
    });
    this.timers = [];
  }

  stopTimers() {
    this.timers.forEach(timer => timer.pause());
  }

  resumeTimers() {
    this.timers.forEach(timer => timer.resume());
  }

  paintShortestPath = () => {
    const { begin, end, prev, updateItem } = this;

    const path: Array<{| x: number, y: number |}> = [];
    let { x } = end;
    let { y } = end;

    while (prev[x][y].x !== -1 && prev[x][y].y !== -1) {
      path.push({ x, y });
      const tempX = x;
      const tempY = y;
      x = prev[tempX][tempY].x;
      y = prev[tempX][tempY].y;
    }
    path.push({ x: begin.x, y: begin.y });

    for (let i = path.length - 1; i >= 0; i--) {
      x = path[i].x;
      y = path[i].y;
      updateItem(x, y, ITEM_SHORTEST, path.length - i);
    }
  };
}
