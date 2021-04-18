import React from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody } from '../Modal'; 

const Test = props => {  
  return(
    <Modal className="Alert-box">
        <ModalHeader>
            <p>모달헤더임다</p>
        </ModalHeader>
        <ModalBody>
            <p>모달몸텅임다</p>
        </ModalBody>
        <ModalFooter>
            <p>모달푸터임다</p>
        </ModalFooter>
    </Modal>
  )
}

export default Test;