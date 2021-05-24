import moment from "moment";
import React, { useCallback, useContext, useState } from "react";
import { AppContext } from "../../context";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../Modal";
import { requestPost } from "../../utils/requestHelper";
import { SERVER_URL } from "../../env_config";
import 'moment/locale/ko';
import { SCHEDULE_ADD } from "../../reducer/schedule";

const Mypage = props => {
	const { modal, closeModal, user, openAlert, dispatchLoadMask, dispatchSchedule } = useContext(AppContext);
	const { options, edit } = modal;
	const [ values, setValues ] = useState({
		title: options.title,
		day: moment(options.day).format("YYYY-MM-DD"),
		start: moment(options.start).format("HH:mm"),
		end: moment(options.end).format("HH:mm"),
		content: options.content,
	});	

	const onChangeValues = useCallback(e => {
		const newValues = { ...values };
		newValues[e.target.id] = e.target.value;
		setValues(newValues);
	}, [values]);

	const createSchedule = useCallback( async () => {
		try {
			if(!values.title || !values.day || !values.start || !values.end) {
				return openAlert("비어있는 내용이 있습니다.");
			}

			const { res, err } = await requestPost(`${SERVER_URL}schedule`, { ...values }, dispatchLoadMask, user.token)
		
			if(err) {
				throw new Error(err);
			}

			if(res?.result) {
				dispatchSchedule({ type: SCHEDULE_ADD, payload: res.data });
				return openAlert("일정을 추가하였습니다.");
			}
		} catch(err) {
			openAlert(err.message);
		} finally {
			closeModal();
		}
	}, [values, dispatchLoadMask, user, openAlert, closeModal, dispatchSchedule]);

	const updateSchedule = useCallback( async () => {
		try {
			if(!values.title || !values.day || !values.start || !values.end) {
				return openAlert("비어있는 내용이 있습니다.");
			}

			const { res, err } = await requestPost(`${SERVER_URL}schedule`, { ...values }, dispatchLoadMask, user.token)
		
			if(err) {
				throw new Error(err);
			}

			if(res?.result) {
				console.log(res.data);
			}
		} catch(err) {
			openAlert(err.message);
		} finally {
			closeModal();
		}
	}, []);

	return (
		<Modal className="modal-box">
			<ModalHeader>
        일정추가
			</ModalHeader>
			<ModalBody>
				<div className="date_now">{moment(values.day).format("YYYY년 MM월 DD일 ddd")}</div>
       	<input className="schedule_tit" value={values.title} id="title" onChange={onChangeValues} placeholder="제목 입력"></input>
				<div className="time">
					{values.start} - {values.end}
				</div>

		<textarea className="schedule_sub" value={values.content} id="content" onChange={onChangeValues} placeholder="설명 추가"></textarea>
			</ModalBody>
			<ModalFooter>
				<div className="MA-Btn Btn-color-gray cancel" onClick={closeModal}>취소</div>
				<div className="MA-Btn Btn-color-green add" onClick={createSchedule}>저장</div>
			</ModalFooter>
		</Modal>
	);
};

export default Mypage;
