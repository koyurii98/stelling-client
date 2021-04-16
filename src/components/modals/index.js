import React from 'react';

const Modal = props => {
  const { name, show } = props;
  switch(name){
    case 'privacy' : 
      return <Menu show={show} /> ;
    default :
      return;
  }
}

export default Modal;