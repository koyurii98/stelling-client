import React from 'react';
import SideMenuItem from './SideMenuItem';
import SidePageMenu from './SidePageMenu';

const Base = (props) => {

  const subj = [
    { name:"국어", key:"ko"},
    { name:"수학", key:"su"},
    { name:"과학", key:"ga"},
    { name:"사회", key:"sa"},
    { name:"한국사", key:"han"},
  ]

  return(
    <div className="base">
      <div className="header">
        <div className="header-Icons">
          <div className="header-Icon"></div>
          <div className="header-Icon"></div>
        </div>
      </div>
      <div className="base-layout">
        <div className="sideMenu">
          <div className="sideMenu-Logo">
            <img src="../img/stelling_logo.png" alt="logo"/>
          </div>
          <div className="sideMenu-Profile">
            <div className="sideMenu-Profile-fr">
              <img src="" className="sideMenu-Profile-img" alt="profile"/>
            </div>
          </div>
          <div className="sideMenu-Menu">
            <div className="sideMenu-Items">
              {
                subj.map((data,i)=>{
                  return <SideMenuItem data={data}/>
                })
              }
            </div>
            <div className="sideMenu-Btn">
              <span>과목 편집</span>
            </div>
          </div>
        </div>
        <SidePageMenu/>
        <div className="contents">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Base;