import React, { useCallback, useEffect, useState } from 'react';
import { List,ListItem } from '@material-ui/core';
import { useHistory } from 'react-router';
import moment from 'moment';

const SidePageMenu = (props) => {
  const { sideSwit, item, menuTit, sidePageBtn } = props;
  const [ pageList, setPageList ] = useState(item.pages);
  const history = useHistory();

  const addPage = useCallback(() =>{
    history.push({
      pathname:'/write',
      state: { item},
    })
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

  return(
     <div className={sideSwit}>
      <div className={menuTit}>
        <span>{item.title}</span>
      </div>
      <div className="sidePageMenu">
        <List component="nav" aria-label="secondary mailbox folder" style={{padding:0}}>
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
        <div className={sidePageBtn} onClick={addPage}>
          <span>글 작성하기</span>
        </div> 
      </div>
    </div>
  )
}

export default SidePageMenu;