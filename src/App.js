import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import Login from './pages/Login';
import View from './pages/View';
import Write from './pages/Write';  //만들어놓은 컴포넌트들
import Base from '../src/components/layout/Base';

function App() {

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
