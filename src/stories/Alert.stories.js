import React, { useCallback, useContext, useState } from 'react';
import Alert from '../components/Alert';
import { AppContext } from '../context';
import '../css/Index.css';

export default {
  title: "Basic/Alert",
  component: Alert,
};

const Template = (args) => {
  const { alert } = args;
  const { closeAlert } = useContext(AppContext);
  const [ alertCls, setAlertCls ] = useState('Alert');

  const onClickConfirm = useCallback(()=>{
    closeAlert();
    setAlertCls('Alert-close');
  },[setAlertCls, closeAlert]);

  return(
    <div className="Alert-box">
      <div className={alertCls}>
        <div className="Alert-Header">
          {alert.err?"오류":"알림"}
        </div>
        <div className="Alert-Body">
          <p>{alert.content}</p>
        </div>
        <div className="Alert-Footer">
          {
            alert.cencleAble ?
              <button className="MA-Btn Btn-color-gray" onCick={()=>closeAlert()}>취소</button>:""
          }
          <button className="MA-Btn Btn-color-green" onClick={alert.cencleAble ? alert.confirmFunc : onClickConfirm }>확인</button>
        </div>
      </div>
    </div>
  )
}

export const DefaultAlert = Template.bind({});
DefaultAlert.args = {
  alert: {
    err: false,
    content: "This is Content",
    cencleAble: false,
  },
}

export const CancleAlert = Template.bind({});
CancleAlert.args = {
  alert: {
    ...DefaultAlert.args.alert,
    err: true,
    cencleAble: true,
    confirmFunc: () => console.log("Close.")
  }
};