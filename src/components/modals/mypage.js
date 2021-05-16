import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../Modal";
import { requestPut, requestDelete } from "../../utils/requestHelper";
import { SERVER_URL } from "../../env_config";
import { USER_LOGIN } from "../../reducer/user";
import { useHistory } from 'react-router-dom';

const Mypage = props => {
	const history = useHistory();
	const { modal, closeModal, user, openAlert, dispatchUser, dispatchLoadMask, userLogout, openConfirmAlert, closeAlert } = useContext(AppContext);
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

	const deleteUser = useCallback(async(e)=>{
		const token = window.localStorage.getItem("stelling");
		const { res, err } = await requestDelete(`${SERVER_URL}user/`, {}, dispatchLoadMask, token);
		if(err){
			openAlert(err.message);
		}
		if(res){
			closeAlert();
			userLogout();
			closeModal();
			openAlert("회원탈퇴가 완료되었습니다.");
		}
	},[dispatchLoadMask, openAlert, closeModal, userLogout ]);

	const alertDeleteUser = useCallback(()=>{
		openConfirmAlert("회원 탈퇴시 회원정보 및 게시글이 모두 삭제됩니다. 탈퇴하시겠습니까?", deleteUser)
	},[openConfirmAlert, deleteUser]);

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
					<button className="MA-Btn Btn-color-red" onClick={alertDeleteUser}>
						회원탈퇴
					</button>
				)}
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
