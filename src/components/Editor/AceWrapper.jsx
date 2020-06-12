import React, {useState} from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import {addAlgo, getInitCode, saveInitCode, addLocalAlgoList} from "./evil";
import { useContext } from "react";
import { Context } from "Provider";


const AceWrapper = () => {
  const context = useContext(Context);
  const {setIsCoding, algorithms, addAlgoToHeader} = context;

  function resetCode() {
    saveInitCode(init_code);
    setState({
      codeText: init_code,
    });
  }

  async function onSubmit() {
    const { codeText } = state;
    console.log(codeText);
    var succ = addAlgo(undefined, codeText);
    if(succ) {
      // console.log(succ);
      // if(!algorithms.current.includes(succ)) algorithms.current = algorithms.current.concat(succ);
      addAlgoToHeader(succ);
      addLocalAlgoList(succ, codeText); // 后续可以恢复
      // console.log(algorithms);
      alert('代码成功上传啦');
      setIsCoding(false);
    } else {
      // alert(error);
    }
  }

  const onChange = (newValue) => {
    // console.log("change", newValue);
    // 那是真的牛逼
    setState({
      codeText: newValue,
    });
  }

  const [state, setState] = useState({
    codeText: getEditedCode(),
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
          {/* 重置代码 */}
      <button onClick={()=>{resetCode()}}>
          Reset</button>
    </div>
  );
}


function getEditedCode() {
  var code = getInitCode();
  return (code===null)?init_code:code;
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