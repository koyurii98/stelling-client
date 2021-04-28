import React, { useCallback, useContext } from 'react';
import { List,ListItem } from '@material-ui/core';
import { useHistory } from 'react-router';

const SidePageMenu = (props) => {
  const { test, item, menuTit } = props;
  const pageList = item.pageList;
  const history = useHistory();

  const addPage = useCallback(() =>{
    console.log("Add");
    history.push('/write')
  },[history]);

  return(
     <div className={test}>
      <div className={menuTit}>
        <span>{item.title}</span>
      </div>
      <div>
        <List component="nav" aria-label="secondary mailbox folder" style={{padding:0}}>
          {
            pageList && pageList.map((menuItem,i)=>{
              return <ListItem
                  key={i}
                  button
                  style={{height:"2.8vw"}}
                >
                <div className="SidePageMenu-text">
                  <span>{menuItem.title}</span>
                  <span className="SidePageMenu-text-date">{menuItem.date}</span>
                </div>
              </ListItem>
            })
          }
        </List>
        {/* <div className="sideMenu-Btn" onClick={addPage}>
          <span>페이지 추가</span>
        </div> */}
      </div>
    </div>
  )
}

export default SidePageMenu;