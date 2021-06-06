import moment from "moment";
import React, { useCallback, useContext, useDebugValue, useState } from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import TodayIcon from "@material-ui/icons/Today";
import { AppContext } from "../../context";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../Modal";
import { requestDelete, requestPost, requestPut } from "../../utils/requestHelper";
import { SERVER_URL } from "../../env_config";
import 'moment/locale/ko';
import { SCHEDULE_ADD, SCHEDULE_UPDATE, SCHEDULE_DELETE } from "../../reducer/schedule";

const Mypage = props => {
	const { modal, closeModal, user, openAlert, dispatchLoadMask, dispatchSchedule } = useContext(AppContext);
	const { options, edit } = modal;
	
	const [ values, setValues ] = useState({
		id: options.id,
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
			const { res, err } = await requestPut(`${SERVER_URL}schedule`, { ...values }, dispatchLoadMask, user.token)
		
			if(err) {
				throw new Error(err);
			}
			if(res?.result) {
				dispatchSchedule({ type: SCHEDULE_UPDATE, payload: { ...res.data } });
			}
		} catch(err) {
			openAlert(err.message);
		} finally {
			closeModal();
		}
	}, [values, openAlert, user, closeModal, dispatchLoadMask, dispatchSchedule]);

	const deleteSchedule = useCallback( async()=>{
		try{
			const { res, err } = await requestDelete(`${SERVER_URL}schedule?id=${values.id}`, {}, dispatchLoadMask, user.token)

			if(err){
				throw new Error(err);
			}
			if(res?.result) {
				dispatchSchedule({ type: SCHEDULE_DELETE, payload: {id: values.id} });
				openAlert("스케줄 삭제가 완료되었습니다.");
			}
		} catch(err) {
			openAlert(err.message);
		} finally {
			closeModal();
		}
	},[openAlert, closeModal,  dispatchLoadMask, user, values, dispatchSchedule]);

	return (
		<Modal className="modal-box">
			<ModalHeader>
        		일정추가
			</ModalHeader>
			<ModalBody>
				<div className="date_now_layout">
			        <TodayIcon style={{ fontSize: "1.2vw"}} />
				    <div className="date_now">{moment(values.day).format("YYYY년 MM월 DD일 ddd")}</div>
				</div>
				<div className="date_layout">
			    	<AccessTimeIcon style={{ fontSize: "1.2vw"}} />
					<div className="time">
					{values.start} - {values.end}
				    </div>
				</div>
       	<input className="schedule_tit" value={values.title} id="title" onChange={onChangeValues} placeholder="제목 입력"></input>

		<textarea className="schedule_sub" value={values.content} id="content" onChange={onChangeValues} placeholder="설명 추가"></textarea>
			</ModalBody>
			<ModalFooter>
				{modal.edit &&
					<div className="MA-Btn Btn-color-red" onClick={deleteSchedule}>삭제</div>
				}
				<div className="MA-Btn Btn-color-gray cancel" onClick={closeModal}>취소</div>
				<div className="MA-Btn Btn-color-green add" onClick={ modal.edit ? updateSchedule : createSchedule }>{ edit ? "수정" : "저장" }</div>
			</ModalFooter>
		</Modal>
	);
};

export default Mypage;
