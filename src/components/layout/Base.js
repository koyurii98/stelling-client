import React, { useCallback, useMemo, useState } from 'react';

import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import {List,ListItem,ListItemText} from '@material-ui/core';


const Base = (props) => {
  const [ test, setTest ] = useState('');
  const [selectedIndex, setSelectedIndex] = React.useState('');

  const subj = useMemo(() =>  [ 
    { 
      name:"국어",
      key:"ko", 
      pageList:[
        {title:"국어1주차",content:"국어1주차 내용입니다람쥐", date:"2021-04-01"},
        {title:"국어1주차",content:"국어1주차 내용입니다람쥐", date:"2021-04-01"},
        {title:"국어1주차",content:"국어1주차 내용입니다람쥐", date:"2021-04-01"}
      ]
    },
    { 
      name:"수학",
      key:"su",
      pageList:[
        {title:"수학1주차",content:"수학1주차 내용입니다람쥐", date:"2021-04-01"},
        {title:"수학1주차",content:"수학1주차 내용입니다람쥐", date:"2021-04-01"},
        {title:"수학1주차",content:"수학1주차 내용입니다람쥐", date:"2021-04-01"}
      ]
    },
    { name:"과학",
      key:"ga",
      pageList:[
        {title:"과학1주차",content:"과학1주차 내용입니다람쥐", date:"2021-04-01"},
        {title:"과학1주차",content:"과학1주차 내용입니다람쥐", date:"2021-04-01"},
        {title:"과학1주차",content:"과학1주차 내용입니다람쥐", date:"2021-04-01"}
      ]
    },
    { 
      name:"사회", 
      key:"sa",
      pageList:[
        {title:"사회1주차",content:"사회1주차 내용입니다람쥐", date:"2021-04-01"},
        {title:"사회1주차",content:"사회1주차 내용입니다람쥐", date:"2021-04-01"},
        {title:"사회1주차",content:"사회1주차 내용입니다람쥐", date:"2021-04-01"}
      ]
    },
    { 
      name:"한국사", 
      key:"han",
    pageList:[
        {title:"한국사1주차",content:"한국사1주차 내용입니다람쥐", date:"2021-04-01"},
        {title:"한국사1주차",content:"한국사1주차 내용입니다람쥐", date:"2021-04-01"},
        {title:"한국사1주차",content:"한국사1주차 내용입니다람쥐", date:"2021-04-01"}
      ]
    },
  ]);

  const handleListItemClick = useCallback(( data, index ) => {
    setSelectedIndex(index);
    setTest('sidePageMenu-open');
    if(data){
      SidePageMenu(data);
    }
  },[setSelectedIndex ,setTest ]);

  const closeMenu = useCallback(() =>{
    setTest('sidePageMenu-close');
  },[]);

  const SidePageMenu = useCallback((data) => {
    console.log(data.pageList)
    return <div className={test}>
      <div className="sidePageMenu-tit">
        <span>{data.name}</span>
        <ArrowBackIosIcon style={{fontSize:"20px", color:"rgb(75, 75, 75)"}} onClick={closeMenu}/>
      </div>
      <List className="sideMenu-Menu" component="nav" aria-label="secondary mailbox folder">
        {/* {
          data.pageList.map((item,i)=>{
            return <ListItem
                key={i}
                className="sideMenu-Items"
                button
                selected={selectedIndex === i}
                onClick={() => handleListItemClick(i, data)}
              >
              <ListItemText>{item.title}</ListItemText>
              <ListItemText>{itme.content}</ListItemText>
              <ListItemText>{itme.date}</ListItemText>
            </ListItem>
          })
        } */}
      </List>
    </div>
  },[test])

  return(
    <div className="base">
      <div className="header">
        <div className="header-Icons">
          <HomeIcon className="header-Icon"/>
          <PowerSettingsNewIcon className="header-Icon"/>
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
          <List className="sideMenu-Menu" component="nav" aria-label="secondary mailbox folder">
            {
              subj.map((data,i)=>{
                return <ListItem
                    className="sideMenu-Items"
                    button
                    selected={selectedIndex === i}
                    onClick={() => handleListItemClick(data,i)}
                  >
                  <ListItemText>{data.name}</ListItemText>
                </ListItem>
              })
            }
          </List>
          <div className="sideMenu-Btn">
            <span>과목 편집</span>
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