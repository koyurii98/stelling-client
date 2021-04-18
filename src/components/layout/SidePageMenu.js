import React from 'react';
import { List,ListItem } from '@material-ui/core';

const SidePageMenu = (props) => {
  const { test, item, menuTit } = props;
  const pageList = item.pageList;

  return(
     <div className={test}>
      <div className={menuTit}>
        <span>{item.name}</span>
      </div>
      <List component="nav" aria-label="secondary mailbox folder" style={{padding:0}}>
        {
          pageList && pageList.map((menuItem,i)=>{
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
        }
      </List>
    </div>
  )
}

export default SidePageMenu;