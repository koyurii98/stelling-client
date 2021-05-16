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
			<div className="date_now">2021년 05월 07일</div>
        <input className="schedule_tit" placeholder="제목 입력"></input>
		<div className="time">
			<select className="start">
				<option value="1">오전 12:00</option>
				<option value="2">오전 1:00</option>
				<option value="3">오전 2:00</option>
				<option value="4">오전 3:00</option>
				<option value="5">오전 4:00</option>
				<option value="6">오전 5:00</option>
				<option value="7">오전 6:00</option>
				<option value="8">오전 7:00</option>
				<option value="9">오전 8:00</option>
				<option value="10">오전 9:00</option>
				<option value="11">오전 10:00</option>
				<option value="12">오전 11:00</option>
				<option value="13">오후 12:00</option>
				<option value="14">오후 1:00</option>
				<option value="15">오후 2:00</option>
				<option value="16">오후 3:00</option>
				<option value="17">오후 4:00</option>
				<option value="18">오후 5:00</option>
				<option value="19">오후 6:00</option>
				<option value="20">오후 7:00</option>
				<option value="21">오후 8:00</option>
				<option value="22">오후 9:00</option>
				<option value="23">오후 10:00</option>
				<option value="24">오후 11:00</option>
			</select>
			<span> - </span>
			<select className="fin">
				<option value="1">오전 12:00</option>
				<option value="2">오전 1:00</option>
				<option value="3">오전 2:00</option>
				<option value="4">오전 3:00</option>
				<option value="5">오전 4:00</option>
				<option value="6">오전 5:00</option>
				<option value="7">오전 6:00</option>
				<option value="8">오전 7:00</option>
				<option value="9">오전 8:00</option>
				<option value="10">오전 9:00</option>
				<option value="11">오전 10:00</option>
				<option value="12">오전 11:00</option>
				<option value="13">오후 12:00</option>
				<option value="14">오후 1:00</option>
				<option value="15">오후 2:00</option>
				<option value="16">오후 3:00</option>
				<option value="17">오후 4:00</option>
				<option value="18">오후 5:00</option>
				<option value="19">오후 6:00</option>
				<option value="20">오후 7:00</option>
				<option value="21">오후 8:00</option>
				<option value="22">오후 9:00</option>
				<option value="23">오후 10:00</option>
				<option value="24">오후 11:00</option>
			</select>
		</div>

		<textarea className="schedule_sub" placeholder="설명 추가"></textarea>
			</ModalBody>
			<ModalFooter>
				<div className="MA-Btn Btn-color-gray cancel" onClick={closeModal}>취소</div>
				<div className="MA-Btn Btn-color-green add">저장</div>
			</ModalFooter>
		</Modal>
	);
};

export default Mypage;
