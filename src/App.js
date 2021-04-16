import React, { useCallback, useContext, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import Login from './pages/Login';
import View from './pages/View';
import Write from './pages/Write';  //만들어놓은 컴포넌트들
import Base from '../src/components/layout/Base';
import { getQueryString }  from '../src/utils/getQueryString';
import { requestGet } from './utils/requestHelper';
import { SERVER_URL } from './env_config';
import { AppContext } from './context/index';

function App() {
  const { dispatchLoadMask } = useContext(AppContext);

  const getAuth = useCallback( async (tk) =>{
    const { res, err } = await requestGet(SERVER_URL+"user/token",{ },dispatchLoadMask, tk);
    if(err){
      console.log(err.message);
    }
    if(res){
      const localStorage = window.localStorage;
      localStorage.setItem("stelling", tk);
      console.log(res);
    }
  },[]);

  useEffect(()=>{
    const state = getQueryString("state");
    if(state === "success") {
      const tokenQst = getQueryString("token");
      const token  = decodeURI(tokenQst);
      getAuth(token);
    }
  },[getAuth]);

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
           <Base>
            <Home/>
          </Base> 
        </Route> {/* '/'는 모든곳에 사용되기때문에 구분하기위해 exact 사용  path는 url 경로 */}
        <Route path="/view">
          <View/>
        </Route>
        <Route path="/write" >
          <Write/>  
        </Route> 
        <Route path="/login">
          <Login/>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
