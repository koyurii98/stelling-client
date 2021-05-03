import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../Modal";

const Mypage = props => {
	const { modal, closeModal, user, openAlert, dispatchUser } = useContext(AppContext);
	return (
		<Modal className="modal-box">
			<ModalHeader>
        일정추가
			</ModalHeader>
			<ModalBody>
        일정내용
			</ModalBody>
			<ModalFooter>
        푸터~~
			</ModalFooter>
		</Modal>
	);
};

export default Mypage;
