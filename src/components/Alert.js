import React, { useCallback, useContext, useState } from 'react';
import { AppContext } from '../context/index';
const Alert = props => {
  const { alert, closeAlert } = useContext(AppContext);
  const [ alertCls, setAlertCls]=useState('Alert');

  const onClickConfirm = useCallback(()=>{
    closeAlert();
    setAlertCls('Alert-close')
  },[setAlertCls, closeAlert]);


  return(
    <div className="Alert-box">
      <div className={alertCls}>
        <div className="Alert-Header">
          {alert.err?"오류":"알림"}
        </div>
        <div className="Alert-Body">
          <p dangerouslySetInnerHTML={{__html:alert.content}}></p>
        </div>
        <div className="Alert-Footer">
          {
            alert.cencleAble &&
              <button className="MA-Btn Btn-color-gray" onClick={closeAlert}>취소</button>
          }
          <button className="MA-Btn Btn-color-green" onClick={alert.cencleAble ? alert.confirmFunc : onClickConfirm }>확인</button>
        </div>
      </div>
    </div>
  )
}

export default Alert;