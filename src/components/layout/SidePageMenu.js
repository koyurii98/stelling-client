import React, { useCallback, useState } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const SidePageMenu = (props) => {
  const { closeMenu, test, data } = props;

  return(
    <div className={test}>
      <div className="sidePageMenu-tit">
        <span>{data.name}</span>
        <ArrowBackIosIcon style={{fontSize:"20px", color:"rgb(75, 75, 75)"}} onClick={closeMenu}/>
      </div>
    </div>
  )
}

export default SidePageMenu;