import React from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody } from '../Modal'; 


const Test = props => {

  return(
    <Modal className="modal-box">
        <ModalHeader>
            <div className="modal-tit">프로필 편집</div>
        </ModalHeader>
        <ModalBody>
          <div className="modal-content">
            <div className="profile-img">
              <img src=""></img>
            </div>
            <div className="profile-name">
              <h4>이름</h4>
              <input className="input-name" placeholder="이름 입력"></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
            <button className="modal-cancel">취소</button>
            <button className="modal-ok">확인</button>
        </ModalFooter>
    </Modal>
  )
}

export default Test;