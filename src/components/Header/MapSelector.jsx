import React, {useState, useContext} from "react";
import { Context} from '../../Provider.jsx';


const MapSelector = (props) => {
    // 地图生成算法
    const [type, setType] = useState<string>('no');
    const onMapAlgoChange = (e: ElementEvent<HTMLSelectElement>) => {
        setType(e.target.value);
        console.log('清除地图并生成新地图');
        // 调用函数
    }

    const context = useContext(Context);
    const {isVisualized} = context;
    
    const mapAlgos = ['random']
    const listItems = mapAlgos.current.map((algo_name) =><option key={algo_name}> {algo_name}</option>);

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
