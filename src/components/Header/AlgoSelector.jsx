// Header 的 算法选择
// 从 Provider 拉取状态
// 允许用户进行定制

import React, {useState, useContext} from "react";
import { Context} from '../../Provider.jsx';


const AlgoSelector = (props) => {
    const context = useContext(Context);
    const {isVisualized, algorithms} = context;
    
    // console.log(props);
    const onAlgoChange = props.onAlgoChange;
    // 倒序... 这样用户的算法就会排在最前面--
    const listItems = algorithms.current.reverse().map((algo_name) =><option key={algo_name}> {algo_name}</option>);

    return (
        <select
        className="content-header__select"
        onChange={onAlgoChange}
        id="algorithm"
        disabled={isVisualized}
        >
        {listItems}
        </select>
    );
}

export default AlgoSelector;
