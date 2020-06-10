import React, {useState, useContext} from "react";
import { Context} from '../../Provider.jsx';
import { MGRandom } from "mapGeneration/random.js";


const RANDOM = 'random';
const PH = 'place holder';
const mapAlgos = [PH, RANDOM];
const MapSelector = () => {
    const context = useContext(Context);
    const {isVisualized, updateItem, clear} = context;
    
    const MapGenerationMap = {
        [RANDOM]: MGRandom,
        [PH]: clear
    };

    // 地图生成算法
    // const [type, setType] = useState<string>(RANDOM);
    const onMapAlgoChange = (e: ElementEvent<HTMLSelectElement>) => {
        // setType(e.target.value);
        console.log('清除地图并生成新地图');
        clear();
        // 调用函数
        var algoName = e.target.value;
        console.log(algoName);
        var mgalgo = MapGenerationMap[algoName];
        mgalgo(updateItem);
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
