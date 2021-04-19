import React, { useCallback, useState, useContext, useEffect } from 'react';
import { AppContext } from "../context/index";
import { SERVER_URL } from '../env_config';
import { requestGet } from '../utils/requestHelper';

const Memo = () => {
	const { dispatchLoadMask, openAlert, user } = useContext(AppContext);
  const [ edit, setEdit ] = useState(false);
  // const [ memo, setMemo ] = useState("");

  const memoInit = useCallback( async () => {
    try {
      const { res, err } = await requestGet(`${SERVER_URL}memo`, {}, dispatchLoadMask, user.token);
    
      if(err) {
        throw new Error(err);
      }

      if(res?.result) {
        console.log(res.data);
      }
    } catch(err) {
      openAlert(err.message);
    }
  }, [openAlert, dispatchLoadMask, user]);

  useEffect(() => {
    memoInit();
  }, [memoInit]);

  const clickEdit = useCallback(()=>{
    setEdit(!edit);
  },[edit]);

  return(
    <div>
      <div className="Home-Memo-Header">
        <span>Memo</span>
        <div className="Home-memo-btn color-Btn" onClick={clickEdit}>
          { edit ? "메모저장":" 메모수정" }
        </div>
      </div>
      <div className="Home-Memo box">
      { edit ? <textarea className="Home-Memo-Textarea" placeholder={"이곳에 메모를 작성해보세요!"}></textarea>:<span></span> }
      </div>
    </div>

  )
}

export default Memo;