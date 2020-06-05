// @flow

import React from 'react';
import Modal from 'react-modal';
import './Editor.scss';
import AceWrapper from './AceWrapper';


type EditorPropTypes = {
  isCoding: boolean,
  onEditorClose: any => void,
};

const CodeEditor = ({ isCoding, onEditorClose }: EditorPropTypes) => {
  
  return (
    <Modal
      className="modal-editor"
      isOpen={isCoding}
      contentLabel="Example Modal"
      onRequestClose={onEditorClose}
    >
    <h1 className="modal-info__title">Code Editor</h1>
      
      <div >
        <AceWrapper />
        {/* <button onClick={()=> {this.refs.editor.editor.undo()}}>
          Undo</button>
        <button onClick={()=> {this.refs.editor.editor.redo()}}>
          Redo</button> */}
      </div>

      <button onClick={onEditorClose } className="modal-info__close" type="button">
        X
      </button>
    </Modal>
  );
};

export default CodeEditor;
