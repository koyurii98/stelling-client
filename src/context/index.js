import React, { createContext, useReducer, useCallback } from "react";
import { LoadMaskReducer } from "../reducer/loadmask";
import { writeReducer, WRITE_FALSE, WRITE_TRUE } from "../reducer/write";
import { AlertReducer, initialAlertState, ALERT_OPEN, ALERT_CLOSE, ALERT_C_OPEN } from "../reducer/alert";
import { ModalReducer, initialModalState, MODAL_CLOSE } from "../reducer/modal";
import { UserReducer, initialUserState, USER_LOGIN, USER_LOGOUT } from "../reducer/user";
import { initialSchedule, ScheduleReducer } from '../reducer/schedule';
import LoadMask from "../components/LoadMask";
import Alert from "../components/Alert";
import Modal from "../components/modals";
import { requestGet } from "../utils/requestHelper";
import { SERVER_URL } from "../env_config";

export const AppContext = createContext({});

export const AppProvider = props => {
	const [loadMask, dispatchLoadMask] = useReducer(LoadMaskReducer, false);
	const [alert, dispatchAlert] = useReducer(AlertReducer, initialAlertState);
	const [modal, dispatchModal] = useReducer(ModalReducer, initialModalState);
	const [user, dispatchUser] = useReducer(UserReducer, initialUserState);
	const [schedule, dispatchSchedule] = useReducer(ScheduleReducer, initialSchedule);
	const [write, dispatchWrite] = useReducer(writeReducer, false);

	// 기본 알러트.
	const openAlert = useCallback(
		(content, error) => {
			setTimeout(() => dispatchAlert({ type: ALERT_OPEN, content, error }), 500);
		},
		[dispatchAlert],
	);

	// 컨펌 알러트.
	const openConfirmAlert = useCallback(
		(content, confirmFunc) => {
			setTimeout(() => dispatchAlert({ type: ALERT_C_OPEN, content, confirmFunc }), 500);
		},
		[dispatchAlert],
	);

	// 알러트 닫기.
	const closeAlert = useCallback(() => {
		dispatchAlert({ type: ALERT_CLOSE });
	}, [dispatchAlert]);

	// // 모달 열기.
	// const openModal = useCallback((name, options, callback) => {
	//   dispatchModal({ type: MODAL_OPEN, name, options, callback });
	// }, [dispatchModal]);

	// 모달 닫기.
	const closeModal = useCallback(() => {
		dispatchModal({ type: MODAL_CLOSE, edit: false });
	}, [dispatchModal]);

	const userLogin = useCallback(
		(data, token) => {
			window.localStorage.setItem("stelling", token);
			dispatchUser({ type: USER_LOGIN, data, token });
		},
		[dispatchUser],
	);

	const userLogout = useCallback(() => {
		window.localStorage.removeItem("stelling");
		dispatchUser({ type: USER_LOGOUT });
	}, [dispatchUser]);

	const userCheck = useCallback( async () => {
		try {
			const token = window.localStorage.getItem("stelling");

			if(token) {
				const { res, err } = await requestGet(`${SERVER_URL}user/token?reissue=${true}`, {}, null, token.toString());

				if(err) {
					throw new Error(err);
				}

				if(res?.result) {
					if(res.token) {
						userLogin(res.data, res.token.toString());
					} else {
						throw new Error("token is null.");
					}
				}
			}
 		} catch(err) {
			window.localStorage.removeItem("stelling");
			openAlert(err.message);
		}
	}, [openAlert, userLogin]);

	const writeTrue = useCallback(()=>{
		dispatchWrite({type:WRITE_TRUE})
	},[dispatchWrite]);

	const writeFalse = useCallback(()=>{
		dispatchWrite({type:WRITE_FALSE})
	},[dispatchWrite]);
	// 모든 컨텍스트 값.
	
	const values = {
		openAlert,
		openConfirmAlert,
		closeAlert,
		dispatchModal,
		closeModal,
		dispatchLoadMask,
		dispatchSchedule,
		dispatchUser,
		userLogin,
		userLogout,
		userCheck,
		user,
		alert,
		modal,
		schedule, 
		writeTrue,
		write,
		writeFalse,
	};
	return (
		<AppContext.Provider value={values}>
			{alert.show && <Alert />}
			{loadMask && <LoadMask />}
			{modal.show && <Modal {...modal} />}
			{props.children}
		</AppContext.Provider>
	);
};
