import React, {useState, useContext} from "react";
import { Context} from '../../Provider.jsx';
import MgRandom from "mapGeneration/MgRandom.js";


const RANDOM = 'random';
const PH = 'place holder';
const mapAlgos = [PH, RANDOM];
const MapSelector = () => {
    const context = useContext(Context);
    const {isVisualized, updateItem, clear, startr, startc, endr, endc, updateBoardSize} = context;
    
    const MapGenerationMap = {
        [RANDOM]: MgRandom,
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
        console.log(startr, startc, endr, endc);
        var mgalgo = new MapGenerationMap[algoName]({startr, startc, endr, endc, updateItem, updateBoardSize});
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
