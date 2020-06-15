// Header 的 算法选择
// 从 Provider 拉取状态
// 允许用户进行定制

import React, {useState, useContext} from "react";
import { Context} from '../../Provider.jsx';
// import { DropdownButton, Dropdown } from 'react-bootstrap'
// import ItemRenderer from './DropDown'
import CustomDropdownHandle from './DropHandler'
import CustomDrop from "./CustomDrop.jsx";

const AlgoSelector = (props) => {
    const context = useContext(Context);
    const {isVisualized, algorithms} = context;
    
    // console.log(props);
    const onAlgoChange = props.onAlgoChange;
    // 倒序... 这样用户的算法就会排在最前面--
    const listItems = algorithms.current;//.map((algo_name) =><option key={algo_name}> {algo_name}</option>);
    var options = [];
    listItems.forEach(element => {
        options.push({'label':element, 'value': element, id: element});
    });
    options.reverse();
    console.log(options)

    return (
        // <select
        // className="content-header__select"
        // onChange={onAlgoChange}
        // id="algorithm"
        // disabled={isVisualized}
        // >
        // {listItems}
        // </select>
        // <div >
        // <CustomDropdownHandle 
        <CustomDrop
        className="content-header__drop"
         options={options} title={'nb'} 
         onAlgoChange={onAlgoChange}
         disabled={isVisualized}/>
        // <ItemRenderer className="content-header__select" options={listItems} title={'nb'}></ItemRenderer>
        // </div>
    );
}

export default AlgoSelector;
