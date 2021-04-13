import React, { useCallback, useState } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SidePageMenu from './SidePageMenu';
import { List,ListItem } from '@material-ui/core';

const subj =  [ 
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
  }
]

const Base = (props) => {
  const [ test, setTest ] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');
  const [item,setItem] = useState([]);

  const handleListItemClick = useCallback(( data, idx ) => {
    setSelectedIndex(idx);
    if(selectedIndex===idx && test==='sidePageMenu-open'){
      setTest('sidePageMenu-close');
    }else{
      setTest('sidePageMenu-open');
      setItem(data);
    }
  },[test,selectedIndex]);

  return(
    <div className="base">
      <div className="header">
        <div className="header-Icons">
          <HomeIcon className="header-Icon" style={{fontSize:"20px"}}/>
          <PowerSettingsNewIcon className="header-Icon" style={{fontSize:"20px"}}/>
        </div>
      </div>
      <div className="base-layout">
        <div className="sideMenu">
          <div className="sideMenu-Logo">
            <img src="../img/stelling_logo.png" alt="logo"/>
          </div>
          <div className="sideMenu-Profile">
            <div className="sideMenu-Profile-fr">
              <img src="../img/user.png" className="sideMenu-Profile-img" alt="profile"/>
            </div>
          </div>
          <List className="sideMenu-Menu" component="nav" aria-label="secondary mailbox folder">
            {
              subj.map((data,i)=>{
                return <ListItem
                    key={i}
                    style={{height:"45px"}}
                    button
                    selected={selectedIndex === i}
                    onClick={() => handleListItemClick(data,i)}
                  >
                  <p>{data.name}</p>
                </ListItem>
              })
            }
          </List>
          <div className="sideMenu-Btn">
            <span>과목 편집</span>
          </div>
        </div>
        <SidePageMenu item={item} test={test}/>
        <div className="contents">
          {props.children}

        </div>
      </div>
    </div>
  )
}

export default Base;