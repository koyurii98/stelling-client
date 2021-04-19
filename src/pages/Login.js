import React, { useCallback, useContext, useEffect } from "react";
import { AppContext } from "../context";
import { SERVER_URL } from "../env_config";
import { requestGet } from "../utils/requestHelper";
import "./Login.css";
import { MODAL_OPEN } from "../reducer/modal";

const Login = () => {
	const { userLogin, openAlert, dispatchLoadMask, dispatchModal } = useContext(AppContext);

	const oAuthLogin = useCallback(w => {
		if (w === "google") {
			window.location.href = SERVER_URL + "user/google";
		}
		if (w === "kakao") {
			window.location.href = SERVER_URL + "user/kakao";
		}
	}, []);

	const onClickPrivacy = useCallback(() => {
		dispatchModal({ type: MODAL_OPEN, name:"privacy"});
	}, [dispatchModal]);

	const userAuth = useCallback(
		async token => {
			try {
				const { res, err } = await requestGet(`${SERVER_URL}user/token?reissue=${true}`, {}, dispatchLoadMask, token.toString());

				if (err) {
					throw new Error(err);
				}

				if (res?.result) {
					userLogin(res?.data, res?.token?.toString());
				}
			} catch (err) {
				openAlert(err.message);
			}
		},
		[openAlert, dispatchLoadMask, userLogin],
	);

	useEffect(() => {
		const urls = new URL(window.location);
		const state = urls.searchParams.get("state");

		if (state === "success") {
			const token = urls.searchParams.get("token");
			const parse = decodeURIComponent(token);
			userAuth(parse);
		}
	}, [userAuth]);

	return (
		<div className="containter">
			<div className="area">
				<ul className="circles">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>

				<div className="logo">
					<img src="../img/stelling_logo.png" alt="logo"></img>
				</div>

				<div className="login-form">
					<div className="login-tit">로그인</div>
					<button className="google" onClick={() => oAuthLogin("google")}>
						<img src="../img/google_btn.png" alt="google-btn"></img>
					</button>
					<button className="kakao" onClick={() => oAuthLogin("kakao")}>
						<img src="../img/kakao_btn.png" alt="kakao-btn"></img>
					</button>
					<div className="privacy">
						위의 “Google/카카오 로그인”를 클릭함으로써<br></br>귀하는{" "}
						<span id="modal_btn" className="pri_detail" onClick={onClickPrivacy}>
							개인정보 처리 방침
						</span>
						을 읽고 이해했으며 그에 동의함을 확인합니다.
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
