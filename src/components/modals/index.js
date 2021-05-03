import React, { useContext } from 'react';
import Privacy from './privacy';
import Mypage from './mypage'
import AddSchedule from './addSchedule'
import { AppContext } from '../../context/index';

const Modal = props => {
  const { modal } = useContext(AppContext);
  switch(modal.name){
    case 'privacy' : 
      return <Privacy/> ;
    case 'mypage' : 
      return <Mypage/> ;
    case 'addSchedule' : 
      return <AddSchedule/> ;
    default :
      return;
  }
}

export default Modal;