import React, { useCallback, useContext, useState } from 'react';
import { AppContext } from '../context/index';
const Alert = props => {
  const { alert, closeAlert } = useContext(AppContext);

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
              <button className="MA-Btn Btn-color-gray" onCick={closeAlert}>취소</button>
          }
          <button className="MA-Btn Btn-color-green" onClick={alert.cencleAble ? alert.confirmFunc : closeAlert }>확인</button>
        </div>
      </div>
    </div>
  )
}

export default Alert;