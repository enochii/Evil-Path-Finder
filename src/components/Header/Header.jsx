// @flow

import React, { useState, useContext } from 'react';
import {
  DIJKSTRA,
  BELLMAN_FORD,
  A_STAR,
  DFS,
  BFS,
  DELAY_SLOWEST,
  DELAY_SLOW,
  DELAY_NORMAL,
  DELAY_FAST,
  DELAY_FASTEST,
} from 'constants.js';
import { Context, type ContextType } from 'Provider';
import pathfinderMap, {PathfinderMapType} from 'algorithms/index';
import { FaPause, FaPlay } from 'react-icons/fa';
import './Header.scss';
import AlgoSelector from './AlgoSelector';
import MapSelector from './MapSelector';


const Header = () => {
  const [type, setType] = useState<string>(DIJKSTRA);
  const [pause, setPause] = useState<boolean>(false);
  const context = useContext<ContextType>(Context);
  // 用于更新 header 的可选算法
  // algorithm name -> class
  const [pfMap, setPfMap] = useState<PathfinderMapType>(pathfinderMap);
  const {
    algorithms,
    begin,
    end,
    updateItem,
    delay,
    pathFinder,
    clear,
    clearPath,
    board,
    isVisualized,
    setIsPathExist,
    setIsVisualized,
    setIsHelped,
    setIsCoding,
  } = context;
  
  const onAlgoChange = (e: ElementEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const onDelayChange = (e: ElementEvent<HTMLSelectElement>) => {
    delay.current = Number(e.target.value);
  };

  const onVisualize = () => {
    if (isVisualized) return;
    clearPath();
    setIsVisualized(true);

    console.log(type);
    console.log(pathfinderMap[type]);
    pathFinder.current = new pathfinderMap[type]({
      begin: begin.current,
      end: end.current,
      updateItem,
      board: board.current,
    });
    const isPossiblePath = pathFinder.current.execute();
    setIsPathExist(isPossiblePath);
  };

  const onClearAll = () => {
    if (isVisualized && !pause) return;
    if (pause) setPause(false);
    setIsVisualized(false);

    clear();
  };

  const onClearPath = () => {
    if (isVisualized && !pause) return;
    if (pause) setPause(false);
    setIsVisualized(false);

    clearPath();
  };

  const onPause = () => {
    if (pause) {
      setPause(false);
      pathFinder.current.resumeTimers();
    } else {
      setPause(true);
      pathFinder.current.stopTimers();
    }
  };

  const onHelp = () => {
    setIsHelped(true);
  };

  const onCoding = () => {
    setIsCoding(true);
  };

  return (
    <div className="content-header">
      {/* <select
        className="content-header__select"
        onChange={onAlgoChange}
        id="algorithm"
        disabled={isVisualized}
      >
        <option value={DIJKSTRA} defaultChecked>
          Dijkstra
        </option>
        <option value={BELLMAN_FORD}>Bellman-Ford</option>
        <option value={BFS}>0-1 BFS</option>
        <option value={DFS}>DFS</option>
        <option value={A_STAR}>A*</option>
        <option value={'Test'}>Test</option>
      </select> */}
      {/* const numbers = [1, 2, 3, 4, 5]; */}
      <MapSelector />
      <AlgoSelector  onAlgoChange={onAlgoChange}/>
      <select
        className="content-header__select"
        onChange={onDelayChange}
        defaultValue={DELAY_FAST}
        disabled={isVisualized}
      >
        <option value={DELAY_SLOW}>slowest</option>
        <option value={DELAY_SLOWEST}>slow</option>
        <option value={DELAY_NORMAL}>normal</option>
        <option value={DELAY_FAST}>fast</option>
        <option value={DELAY_FASTEST}>fastest</option>
      </select>
      <button
        className="content-header__button"
        onClick={onVisualize}
        disabled={isVisualized}
        type="button"
      >
        Visualize!
      </button>
      <button
        className="content-header__button"
        onClick={onClearAll}
        disabled={isVisualized && !pause}
        type="button"
      >
        Clear All
      </button>
      <button
        className="content-header__button"
        onClick={onClearPath}
        disabled={isVisualized && !pause}
        type="button"
      >
        Clear Path
      </button>
      <button
        className="content-header__button--pause"
        onClick={onPause}
        disabled={!isVisualized}
        type="button"
      >
        {pause ? <FaPlay /> : <FaPause />}
      </button>
      <button
        className="content-header__button--usage"
        onClick={onHelp}
        disabled={isVisualized && !pause}
        type="button"
      >
        How to use?
      </button>
      <button
        className="content-header__button--usage"
        onClick={onCoding}
        disabled={isVisualized && !pause}
        type="button"
      >
        Code Editor
      </button>
    </div>
  );
};

export default Header;
