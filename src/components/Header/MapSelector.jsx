import React, {useState, useContext} from "react";
import { Context} from '../../Provider.jsx';
import MgRandom from "mapGeneration/MgRandom";
import Stair from "mapGeneration/StairDemo";
import Recursion from "mapGeneration/RecursiveDivision";
import HorizontalRecursion from "mapGeneration/HorizontalRecursion.js";
import VerticalRecursion from "mapGeneration/VerticalRecursion.js";

const RANDOM = 'random';
const STAIR = 'stair';
const HOR_RER = 'horizontal';
const VER_RER = 'vertical';

const MapSelector = () => {
    const context = useContext(Context);
    const {isVisualized, updateItem, clear, board, begin, end, updateBoardSize, pathFinder} = context;
    
    const mapAlgos = [ 
        // RANDOM, 
        STAIR, HOR_RER, VER_RER];
    const MapGenerationMap = {
        // [RANDOM]: MgRandom,
        [STAIR]: Stair,
        [HOR_RER]: HorizontalRecursion,
        [VER_RER]: VerticalRecursion,
    };

    // 地图生成算法
    // const [type, setType] = useState<string>(RANDOM);
    const onMapAlgoChange = (e: ElementEvent<HTMLSelectElement>) => {
        // setType(e.target.value);
        console.log('清除地图并生成新地图');
        clear();
        // 调用函数
        var algoName = e.target.value;
        // console.log(algoName);
        // console.log(startr, startc, endr, endc);
        var mgalgo = new MapGenerationMap[algoName]({
            begin: begin.current,
            end: end.current,
            updateItem,
            board: board.current, 
            updateBoardSize: updateBoardSize}
        );
        pathFinder.current = mgalgo;
        mgalgo.excute(updateItem);
    }
    
    const listItems = mapAlgos.map((algo_name) =><option key={algo_name}> {algo_name}</option>);

    return (
        <select
        className="content-header__select"
        onChange={onMapAlgoChange}
        id="mapAlgorithm"
        disabled={isVisualized}
        >
        {listItems}
        </select>
    );
}

export default MapSelector;
