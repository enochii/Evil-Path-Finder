import React, {useState} from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import {addAlgo} from "./evil";


const AceWrapper = () => {
  async function onSubmit() {
    const { codeText } = state;
    console.log(codeText);
    addAlgo('Test', codeText);
  }

  const onChange = (newValue) => {
    // console.log("change", newValue);
    // 那是真的牛逼
    setState({
      codeText: newValue,
    });
  }

  const [state, setState] = useState({
    codeText: init_code,
  });
  
  // functional editor component
  return (
    <div>
      <AceEditor
        mode="javascript"
        theme="tomorrow"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true
        }}
        width="1100px"
        height="750px"
        fontSize="18px"
         // 这个不加字符串都被codeText吃了，啥都没了
        value={state.codeText}
      />
      <button onClick={()=> {onSubmit()}}>
          Submit</button>
    </div>
  );
}

const init_code = 
"// 使用须知以下常量定义：\n\
// BOARD_ROW|   BOARD_COL|      ITEM_CLICKED|          ITEM_VISITED\n\
// 行数         列数            该格子已经被占用        该格子已经被访问过\n\
\n\
class MyAlgoName extends PathFinder {\n\
  constructor(args) {\n\
    super(args);\n\
    this.find = false;\n\
  }\n\
\n\
// 类成员和方法须知（使用 this.* 进行调用）：\n\
// 在访问一个节点后，请执行以下调用\n\
// updateItem(nextX, nextY, ITEM_VISITED, 1);（可视化点状态）\n\
// prev[x][y] 表示(x,y)的祖先节点，请使用以下代码进行链接（可视化路径）\n\
// prev[x][y] = { x: i, y: j };\n\
// begin / end：起点 / 终点\n\
// board[x][y]：(x,y) 的状态\n\
\n\
  execute = () => {\n\
    // const { prev, end, board, updateItem } = this;\n\
    // 这里写入你算法的主要逻辑\n\
    \n\
    // END \n\
    if (!this.find) this.clearTimers();\n\
    return this.find;\n\
  };\n\
}\n\
"

export default AceWrapper;