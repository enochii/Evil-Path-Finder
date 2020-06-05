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
    codeText: '',
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

export default AceWrapper;