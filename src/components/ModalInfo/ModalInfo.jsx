// @flow

import React from 'react';
import Modal from 'react-modal';
import './ModalInfo.scss';

type ModalInfoPropTypes = {
  isHelped: boolean,
  onHelpClose: any => void,
};

const ModalInfo = ({ isHelped, onHelpClose }: ModalInfoPropTypes) => {
  return (
    <Modal
      className="modal-info"
      isOpen={isHelped}
      contentLabel="Example Modal"
      onRequestClose={onHelpClose}
    >
      <h1 className="modal-info__title">How to use?</h1>
      <p className="modal-info__color">
        <div className="modal-info__row">
          <p className="modal-info__content">
            <span className="modal-info__square--initial" />
            <p>initial</p>
          </p>
          <p className="modal-info__content">
            <span className="modal-info__square--visited" />
            <p>visited</p>
          </p>
        </div>
        <div className="modal-info__row">
          <p className="modal-info__content">
            <span className="modal-info__square--clicked" />
            <p>wall</p>
          </p>
          <p className="modal-info__content">
            <span className="modal-info__square--fixed" />
            <p>begin end</p>
          </p>
        </div>
        <div className="modal-info__row">
          <p className="modal-info__content">
            <span className="modal-info__square--shortest" />
            <p>path</p>
          </p>
        </div>
      </p>
      <p className="modal-info__usage">
        <div className="modal-info__row">
          <h2>1. You can make wall by clicking any block</h2>
        </div>
        <div className="modal-info__row">
          <h2>2. You can move</h2>
          <span className="modal-info__square--fixed" />
          <h2>by dragging</h2>
        </div>
        <div className="modal-info__row">
          <h2>3. You can choose path-finding or map-generation algorithms</h2>
        </div>
        <div className="modal-info__row">
          <h2>4. You can change Borad size or delay</h2>
        </div>
        <div className="modal-info__row">
          <h2>5. You can use your own algorithm !!! by code editor</h2>
        </div>
        <div className="modal-info__row">
          <h2>Explore more by yourself ~~~///(^v^)\\\~~~</h2>
        </div>
      </p>
      <button onClick={onHelpClose} className="modal-info__close" type="button">
        X
      </button>
    </Modal>
  );
};

export default ModalInfo;
