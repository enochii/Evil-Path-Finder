import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";


const AceWrapper = () => {
  const onChange = (newValue) => {
    console.log("change", newValue);
  }
  
  // functional editor component
  return (
    <AceEditor
      mode="javascript"
      theme="tomorrow"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />
  );
}

export default AceWrapper;