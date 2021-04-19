import React from 'react';
import { List,ListItem } from '@material-ui/core';

const SidePageMenu = (props) => {
  const { test, item, menuTit } = props;
  const pageList = item.pageList;

  return(
     <div className={test}>
      <div className={menuTit}>
        <span>{item.title}</span>
      </div>
      <List component="nav" aria-label="secondary mailbox folder" style={{padding:0}}>
        {
          pageList ? pageList.map((menuItem,i)=>{
            return <ListItem
                key={i}
                button
                // selected={selectedIndex === i}
                // onClick={() => handleListItemClick(i, data)}
                style={{height:"2.8vw"}}
              >
              <div className="SidePageMenu-text">
                <span>{menuItem.title}</span>
                <span className="SidePageMenu-text-date">{menuItem.date}</span>
              </div>
            </ListItem>
          })
          :
          <ListItem style={{ fontSize: "0.76vw" }}>아직 페이지가 없습니다. 페이지를 추가해보세요.</ListItem>
        }
      </List>
    </div>
  )
}

export default SidePageMenu;