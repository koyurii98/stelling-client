import React, { useCallback, useState } from 'react'; 
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
    <div>
      <p>LOGIN</p>
      <button onClick={()=>onClickHandler()}>test</button> {/*이런식으로 버튼에 함수를 입혀주면됨 onClick은 클릭했을때를 뜻함*/}
      {click && 
        //click이 true일때 버튼클릭이 화면에 나타남
        <p>버튼 클릭!</p>
      }
    </div>
  )
}

export default Login;