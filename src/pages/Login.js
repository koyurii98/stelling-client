import React, { useCallback, useState } from 'react'; 
import './Login.css';

//리액트는 반드시 선언되어야함!

//react hook 검색해서 나오는거 공부하면 좋을듯!
// useEffect, useState, useCallback, useMemo

const Login = () => {
  //보통 abc , setAbc 형식으로 맞춰서 사용 
  //useState() 괄호안에 들어간 값은 초기값
  const [ click, setClick ] = useState(false); 

  // 테스트 버튼 클릭시 실행되는 함수
  // 함수는 보통 이런식으로 선언하면됨
  // useCallBack은 자주 사용되는 함수에 쓰는데 걍 함수마다 다써도 무방,,,
  const onClickHandler = useCallback(()=>{
    //이안에 실행내용 적으면됨

    console.log("버튼 클릭!");

    // 버튼 클릭시 setClick을 사용해서 click의 값을 true로 변환
    setClick(true); 

  },[]); 

  //return 안에 퍼블리싱 작성 css파일 만들어도되고 인라인으로 해도됨 
  return(
    // <div>
    //   <p>LOGIN</p>
    //   <button onClick={()=>onClickHandler()}>test</button> {/*이런식으로 버튼에 함수를 입혀주면됨 onClick은 클릭했을때를 뜻함*/}
    //   {click && 
    //     //click이 true일때 버튼클릭이 화면에 나타남
    //     <p>버튼 클릭!</p>
    //   }
    // </div>
    
    <div class="containter">
      <div class="area" >
      <ul class="circles">
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
      <div class="logo">
        <img src="../img/stelling_logo.png"></img>
      </div>

      <div class="login-form">
        <div class="login-tit">로그인</div>
        <button class="google"><img src="../img/google_btn.png"></img></button>
        <button class="kakao"><img src="../img/kakao_btn.png"></img></button>

        <div class="privacy">위의 “Google/카카오 로그인”를 클릭함으로써<br></br>귀하는 <a href="#" id="modal_btn" class="pri_detail">개인정보 처리 방침</a>을 읽고 이해했으며 그에 동의함을 확인합니다.</div>
      </div>

      <div class="black_bg"></div>
      <div class="modal_wrap">
        <div>
        <div class="pri-tit">개인 정보 처리방침
        <div class="modal_close"><img src="../img/close_btn.png"></img></div>
        </div>
        <div class="pri-content">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr
        </div>
        </div>
      </div>
    </div >
    </div>
  )
}

window.onload = function() {

function onClick() {
    document.querySelector('.modal_wrap').style.display ='block';
    document.querySelector('.black_bg').style.display ='block';
}   
function offClick() {
    document.querySelector('.modal_wrap').style.display ='none';
    document.querySelector('.black_bg').style.display ='none';
}

document.getElementById('modal_btn').addEventListener('click', onClick);
document.querySelector('.modal_close').addEventListener('click', offClick);

};


export default Login;