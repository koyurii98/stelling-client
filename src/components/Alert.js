import React, { useCallback, useContext, useState } from 'react';
import { AppContext } from '../context/index';
const Alert = props => {
  const { alert, closeAlert } = useContext(AppContext);

  console.log(alert.show);
  const onClickAlert =()=>{
    closeAlert();
  }
  return(
    <div className="Alert-box">
      <div className="Alert">
        <div className="Alert-Header">
          {alert.err?"오류":"알림"}
        </div>
        <div className="Alert-Body">
          <p>{alert.content}</p>
        </div>
        <div className="Alert-Footer">
          {
            alert.cencleAble &&
              <button className="Alert-Btn Btn-color-gray" onCick={closeAlert}>취소</button>
          }
          <button className="Alert-Btn Btn-color-green" onClick={alert.cencleAble ? alert.confirmFunc : onClickAlert }>확인</button>
        </div>
      </div>
    </div>
  )
}

export default Alert;