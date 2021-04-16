import React from 'react';
import Privacy from './privacy';

const Modal = props => {
  const { name, show } = props;
  switch(name){
    case 'privacy' : 
      return <Privacy show={show} /> ;
    default :
      return;
  }
}

export default Modal;