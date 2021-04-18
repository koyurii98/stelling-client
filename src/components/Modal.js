import React, { useContext } from 'react';
import { AppContext } from '../context';

export const Modal = props =>{
  const { closeModal } = useContext(AppContext);
  return(
  <div className="Modal-box">
    <div className="Modal">
        {props.children}
      </div>
    </div>
 ) 
}

export const ModalHeader = props => {
  return(
    <div className="Modal-Header">
      {props.children}
    </div>
  )
}

export const ModalBody = props => {
    return(
      <div className="Modal-Body">
        {props.children}
      </div>
    )
  }

export const ModalFooter = props => {
  return(
    <div className="Modal-Footer">
        {props.children}
    </div>
  )
}
