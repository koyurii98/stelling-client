import React, { useCallback, useContext, useEffect, useState } from 'react';
import { List,ListItem } from '@material-ui/core';
import { useHistory } from 'react-router';
import moment from 'moment';
import { AppContext } from '../../context/index';
const SidePageMenu = (props) => {
  const { writeTrue } = useContext(AppContext);
  const { sideSwit, item, setSideSwit, setSideMenuFlex } = props;
  const [ pageList, setPageList ] = useState(item.pages);
  const history = useHistory();

  const addPage = useCallback(() =>{
    history.push({
      pathname:'/write',
      state: { item},
    })
    writeTrue();
  },[history, item]);

  const moveView = useCallback((data) =>{
    history.push({
      pathname:`/view/${data.id}`,
      state: {data, item},
    })
  },[history, item])

  useEffect(()=>{
    setPageList(item.pages);
  },[item]);

  const closeMenu = useCallback(()=>{
    setSideSwit("sidePageMenu-close");
    setTimeout(() => {
      setSideMenuFlex(false);
    }, 500);
  }, [ setSideSwit, setSideMenuFlex ])

  return(
     <div className={sideSwit}>
      <div className="sidePageMenu-tit" onClick={closeMenu}>
        <span>{item.title}</span>
      </div>
      <div className="sidePageMenu">
      {
          pageList.length===0 ?
            <div className="sidePageBox">
              <span>✏️</span>
              <span>아직 {item.title}에 작성한 글이 없네요! 새로운 글을 작성해보세요!</span>
            </div> :
            <List component="nav" aria-label="secondary mailbox folder" style={{padding:0, overflow:"scroll", height:"82vh"}}>  
              {
                pageList && pageList.map((data,i)=>{
                  return <ListItem
                      key={i}
                      button
                      style={{height:"2.8vw"}}
                      onClick={()=>moveView(data)}
                    >
                    <div className="SidePageMenu-text">
                      <span>{data.title}</span>
                      <span className="SidePageMenu-text-date">{moment(data.createdAt).format('YYYY-MM-DD')}</span>
                    </div>
                  </ListItem>
                })
              }
            </List>
        }
        <div className="sidePageMenu-Btn" onClick={addPage}>
          <span>글 작성하기</span>
        </div> 
      </div>
    </div>
  )
}

export default SidePageMenu;