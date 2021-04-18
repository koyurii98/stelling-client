import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../Modal";
import { requestPut } from "../../utils/requestHelper";
import { SERVER_URL } from "../../env_config";

const Mypage = props => {
	const { modal, closeModal, user, dispatchLoadMask, openAlert } = useContext(AppContext);
	const [myInfo, setMyInfo] = useState({ name: "", profile: "" });

	useEffect(() => {
		if (modal.edit) {
			setMyInfo({
				name: user.name,
				profile: user.profile,
			});
		}
	}, [modal, user]);

	const addOrUpdate = useCallback(async () => {
		if (!myInfo.name) {
			return openAlert("이름이 입력되지 않았습니다");
		} else {
			const token = window.localStorage.getItem("stelling");

			const forms = new FormData();

			forms.append("name", myInfo.name);

			const { res, err } = await requestPut(`${SERVER_URL}user/`, forms, dispatchLoadMask, token);
			if (err) {
				return openAlert(err.message, true);
			}
			if (res) {
				console.log(res);
				closeModal();
			}
		}
	}, [dispatchLoadMask, openAlert, myInfo, closeModal]);

	const onChange = useCallback(
		e => {
			console.log(e.target.value);
			setMyInfo({ ...myInfo, name: e.target.value });
		},
		[myInfo],
	);

	return (
		<Modal className="modal-box">
			<ModalHeader>
				<div className="modal-tit">프로필 {modal.edit ? "편집" : "등록"}</div>
			</ModalHeader>
			<ModalBody>
				{!modal.edit && (
					<div className="profile-first">
						<p>
							<span>STELLING</span> 에 오신것을 환영합니다!&#128154;
						</p>
						<span>나의 프로필을 등록해보세요!</span>
					</div>
				)}
				<div className="profile-img">
					<img alt="img" src={user.img ? user.img : "./img/user.png"}></img>
				</div>
				<div className="profile-name">
					<span>이름</span>
					<input onChange={onChange} className="input-name" placeholder="이름을 입력해주세요"></input>
				</div>
			</ModalBody>
			<ModalFooter>
				{modal.edit && (
					<button className="MA-Btn Btn-color-gray" onClick={closeModal}>
						취소
					</button>
				)}
				<button className="MA-Btn Btn-color-green" onClick={addOrUpdate}>
					저장
				</button>
			</ModalFooter>
		</Modal>
	);
};

export default Mypage;
