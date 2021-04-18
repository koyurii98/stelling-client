import React from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody } from '../Modal'; 


const Test = props => {

  return(
    <Modal className="modal-box">
        <ModalHeader>
            <div className="modal-tit">알림</div>
        </ModalHeader>
        <ModalBody>
            <div className="modal-content">modal content text</div>
        </ModalBody>
        <ModalFooter>
            <button className="modal-ok">확인</button>
        </ModalFooter>
    </Modal>
  )
}

export default Test;