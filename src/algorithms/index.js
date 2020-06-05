// @flow

import { DIJKSTRA, BELLMAN_FORD, A_STAR, DFS, BFS } from 'constants.js';
import Dijkstra from './dijkstra';
import BellmanFord from './bellmanFord';
import AStar from './AStar';
import Dfs from './dfs';
import Bfs from './bfs';

export type PathfinderMapType = {
  [key: string]: | typeof Dijkstra
    | typeof BellmanFord
    | typeof AStar
    | typeof Dfs,
};

const pathfinderMap: PathfinderMapType = {
  [DIJKSTRA]: Dijkstra,
  [BELLMAN_FORD]: BellmanFord,
  [A_STAR]: AStar,
  [DFS]: Dfs,
  [BFS]: Bfs,
};

export default pathfinderMap;
