import React from 'react';
import { List,ListItem } from '@material-ui/core';

const SidePageMenu = (props) => {
  const { test, item } = props;
  const pageList = item.pageList;
  console.log(pageList);

  return(
     <div className={test}>
      <div className="sidePageMenu-tit">
        <span>{item.name}</span>
      </div>
      <List component="nav" aria-label="secondary mailbox folder">
        {
          pageList && pageList.map((menuItem,i)=>{
            return <ListItem
                key={i}
                button
                // selected={selectedIndex === i}
                // onClick={() => handleListItemClick(i, data)}
                style={{margin:0}}
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