// @flow

import React, { useEffect, useContext, useState } from 'react';
import Modal from 'react-modal';
import { FaGithub } from 'react-icons/fa';
import Header from 'components/Header/Header';
import Board from 'components/Board/Board';
import ModalInfo from 'components/ModalInfo/ModalInfo';
import ModalError from 'components/ModalError/ModalError';
import { Context, type ContextType } from 'Provider';
import Helmet from 'react-helmet';
import './Container.scss';
import CodeEditor from 'components/Editor/Editor';
import Switcher from 'components/Header/Switcher';

Modal.setAppElement('#root');

const Container = () => {
  const context = useContext(Context);
  const { isPathExist, clear, isHelped, setIsHelped,  isCoding, setIsCoding }: ContextType = context;
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  useEffect(() => {
    if (!isPathExist) {
      clear();
      setIsErrorOpen(true);
    }
  }, [isPathExist, clear]);

  const onErrorClose = () => {
    setIsErrorOpen(false);
  };
  const onHelpClose = () => {
    setIsHelped(false);
  };
  const onEditorClose = () => {
    setIsCoding(false);
  }

  return (
    <>
      <Helmet>
        <title>Evil Path Finder</title>
        <meta property="og:title" content="Pathfinding Visualizer" />
        <meta property="og:type" content="website" />

      </Helmet>
      <header className="header">
        <h1 className="header__title">Evil Path Finder</h1>
      </header>
      <ModalError isErrorOpen={isErrorOpen} onErrorClose={onErrorClose} />
      <ModalInfo isHelped={isHelped} onHelpClose={onHelpClose} />
      <CodeEditor isCoding={isCoding} onEditorClose={onEditorClose} />
      <Header />
      <Switcher />
      <Board />
      <footer className="footer">
        <p className="footer__author">Powered By SCH001 With <span style={{color:"red"}}>❤</span></p>
        {/* <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="footer__github" />
        </a> */}
      </footer>
    </>
  );
};

export default Container;
