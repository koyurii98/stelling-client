import React, { useContext } from 'react';
import { AppContext } from '../context';

export const Modal = props =>{
  const { closeModal } = useContext(AppContext);
  return(
  <div className="Alert-box" onClick={closeModal}>
    <div className="Alert">
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
    <div className="Alert-Footer">
        {props.children}
    </div>
  )
}
