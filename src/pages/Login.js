import React, { useCallback, useEffect, useState } from 'react'; 
import { SERVER_URL } from '../env_config';

import './Login.css';

const Login = () => {
  const oAuthLogin = useCallback((w)=>{
    if(w === "google"){
      window.location.href=SERVER_URL+'user/google';
    }
    if(w === "kakao"){
      window.location.href=SERVER_URL+'user/kakao';
    }
  },[]); 

  return(
    <div className="containter">
      <div className="area" >
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
        <button className="google" onClick={()=>oAuthLogin("google")}><img src="../img/google_btn.png" alt="google-btn"></img></button>
        <button className="kakao" onClick={()=>oAuthLogin("kakao")}><img src="../img/kakao_btn.png" alt="kakao-btn"></img></button>

        <div className="privacy">위의 “Google/카카오 로그인”를 클릭함으로써<br></br>귀하는 <a href="#pri-modal" id="modal_btn" className="pri_detail">개인정보 처리 방침</a>을 읽고 이해했으며 그에 동의함을 확인합니다.</div>
      </div>

      <div id="pri-modal" className="modal">
        <div className="modal__content">
          <div className="pri-tit">개인 정보 처리방침</div>
          <p className="pri-content">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr
          </p>

          <a href="#" className="modal__close"><img src="../img/close_btn.png" alt="close-btn"></img></a>
        </div>
      </div>
    </div>
    </div>
  )
}


export default Login;