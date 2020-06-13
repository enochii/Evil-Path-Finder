import uuidv4 from 'uuid/v4';
import Styles from 'styles/_variables.scss';

// Board Size(初始)
export const BOARD_ROW = Number(Styles.boardRow);
export const BOARD_COL = Number(Styles.boardCol);

// Color
export const INITIAL_COLOR = Styles.initialColor;
export const VISITED_COLOR = Styles.visitedColor;
export const CLICKED_COLOR = Styles.clickedColor;
export const FIXED_COLOR = Styles.fixedColor;
export const SHORTEST_COLOR = Styles.shortestColor;
export const WALL_COLOR = Styles.wallColor;
// export const COLOR_TYPES = [
//   'initial',
//   'visited',
//   'clicked',
//   'fixed',
//   'shortest',
// ];

export const BOARD_HEIGHT = 60;

// algorithm
export const DIJKSTRA = 'dijkstra';
export const BELLMAN_FORD = 'bellman-ford';
export const A_STAR = 'A-star';
export const DFS = 'DFS';
export const BFS = 'BFS';

// uuid
export const KEYS = [];
for (let i = 0; i < BOARD_ROW; i++) {
  KEYS[i] = [];
  for (let j = 0; j < BOARD_COL; j++) {
    KEYS[i][j] = uuidv4();
  }
}

// Item state
export const ITEM_FIXED = 'ITEM_FIXED';
export const ITEM_INITIAL = 'ITEM_INITIAL';
export const ITEM_VISITED = 'ITEM_VISITED';
export const ITEM_CLICKED = 'ITEM_CLICKED';
export const ITEM_SHORTEST = 'ITEM_SHORTEST';
export const ITEM_WALL = 'ITEM_WALL';

// Delay
export const DELAY_SLOWEST = 400;
export const DELAY_SLOW = 300;
export const DELAY_NORMAL = 200;
export const DELAY_FAST = 80;
export const DELAY_FASTEST = 50;

// Board
export const BOARD = [];
for (let i = 0; i < BOARD_ROW; i++) {
  BOARD[i] = [];
  for (let j = 0; j < BOARD_COL; j++) {
    BOARD[i][j] = {
      color: INITIAL_COLOR,
      visit: false,
    };
  }
}
