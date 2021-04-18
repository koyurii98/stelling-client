import React, { useContext } from 'react';
import Privacy from './privacy';
import Test from './test';
import Mypage from './mypage'
import { AppContext } from '../../context/index';

const Modal = props => {
  const { modal } = useContext(AppContext);
  switch(modal.name){
    case 'privacy' : 
      return <Privacy/> ;
    case 'mypage' : 
    return <Mypage/> ;
    case 'test':
      return <Test/>
    default :
      return;
  }
}

export default Modal;