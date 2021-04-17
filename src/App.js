import React, { useCallback, useContext, useEffect } from 'react';
import { BrowserRouter, Route, useHistory } from 'react-router-dom'; 
import Home from './pages/Home';
import Login from './pages/Login';
import View from './pages/View';
import Write from './pages/Write';  //만들어놓은 컴포넌트들
import Base from '../src/components/layout/Base';
import { getQueryString }  from '../src/utils/getQueryString';
import { requestGet } from './utils/requestHelper';
import { SERVER_URL } from './env_config';
import { AppContext } from './context/index';
import LoadMask from './components/LoadMask';

function App() {
  const { dispatchLoadMask, userLogin } = useContext(AppContext);
  const token = window.localStorage.getItem("stelling");

  const getAuth = useCallback( async (token) =>{
    const {res,err} = await requestGet(`${SERVER_URL}user/token`, {}, dispatchLoadMask, token);
    if(err){
      console.log(err.message);
    }
    if(res){
      console.log(res);
      userLogin(res.data,token);
    };
  },[userLogin, dispatchLoadMask]);

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
        <React.Suspense fullback={LoadMask}>
        <Route exact path="/">
          {token?
            <Base>
              <Home/>
            </Base> 
            :
            <Login/>
          }
        </Route> {/* '/'는 모든곳에 사용되기때문에 구분하기위해 exact 사용  path는 url 경로 */}
        <Route path="/view">
          <View/>
        </Route>
        <Route path="/write" >
          <Write/>  
        </Route> 
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
