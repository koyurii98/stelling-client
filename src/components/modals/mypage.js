import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../Modal";
import { requestPut } from "../../utils/requestHelper";
import { SERVER_URL } from "../../env_config";
import { USER_LOGIN } from "../../reducer/user";

const Mypage = props => {
	const { modal, closeModal, user, openAlert, dispatchUser } = useContext(AppContext);
	const [myInfo, setMyInfo] = useState({ name: "", profile: null, preview: null });

	useEffect(() => {
		if(user?.data) {
			if (modal.edit) {
				setMyInfo({
					name: user.data.name,
					profile: user.data.profile,
					preview: user.data.profile
				});
			}
		}
	}, [modal, user]);

	const addOrUpdate = useCallback(async () => {
		if (!myInfo.name) {
			return openAlert("이름이 입력되지 않았습니다");
		} else {
			const token = window.localStorage.getItem("stelling");

			const forms = new FormData();

			forms.append("name", myInfo.name);
			forms.append("profile", myInfo.profile);

			const { res, err } = await requestPut(`${SERVER_URL}user/`, forms, null, token);
			if (err) {
				return openAlert(err.message, true);
			}
			if (res.data) {
				closeModal();
				dispatchUser({ type:USER_LOGIN, data: res.data, token });
				openAlert("프로필등록이 완료되었습니다.");
			}
		}
	}, [openAlert, myInfo, closeModal, dispatchUser ]);

	const addUpdateProfile = useCallback((e)=>{
		if(!e.target.files || !e.target.files[0]) {
			return openAlert("선택된 파일이 없습니다.");
		}

		const file = e.target.files[0];
		const preview = URL.createObjectURL(file);

		setMyInfo({ ...myInfo, profile: file, preview });
	},[myInfo, openAlert]);

	const onChange = useCallback(
		e => {
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
					<input type="file" id="profile" onChange={addUpdateProfile}></input>
					<label htmlFor="profile">
						<img alt="img" src={myInfo.preview ? myInfo.preview : "./img/user.png"} style={{ cursor: "pointer" }}></img>
					</label>
				</div>
				<div className="profile-name">
					<span>이름</span>
					<input onChange={onChange} value={myInfo.name} className="input-name" placeholder="이름을 입력해주세요"></input>
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
