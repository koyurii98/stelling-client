import React, { useCallback, useState, useContext, useEffect } from 'react';
import { AppContext } from "../context/index";
import { SERVER_URL } from '../env_config';
import { requestGet, requestPut } from '../utils/requestHelper';

const Memo = () => {
	const { dispatchLoadMask, openAlert, user } = useContext(AppContext);
  const [ edit, setEdit ] = useState(false);
  const [ memoData, setMemoData ] = useState('');
  const [ memoValue, setMemoValue ] = useState('');

  const getMemo = useCallback(async()=>{
    const { res, err } = await requestGet(`${SERVER_URL}memo/one`, {} ,dispatchLoadMask, user.token);
    if(err){
      openAlert(err.message,true);
    }
    if(res){
      setMemoData(res.data);
      if(edit){
        setMemoValue(res.data.content);
      }
    }
  },[dispatchLoadMask, user, setMemoValue, edit, openAlert]);
  
  const clickEdit = useCallback(async()=>{
    setEdit(!edit);
    if(edit){
      const { res, err } = await requestPut(`${SERVER_URL}memo`, {
        content: memoValue,
        id:memoData.id,
      } ,dispatchLoadMask, user.token);
      if(err){
        openAlert(err.message,true);
      }
      if(res){
        setMemoData(res.data);
      }
    }
  },[ edit, memoValue, dispatchLoadMask, user, openAlert, memoData ]);

	const onChangeHandler = useCallback((e) => {
    setMemoValue(e.target.value);
  }, [setMemoValue]);

  useEffect(()=>{
    getMemo();
  },[getMemo])

  return(
    <div>
      <div className="Home-Memo-Header">
        <span>Memo</span>
        <div className="Home-memo-btn color-Btn" onClick={clickEdit}>
          { edit ? "메모저장":" 메모수정" }
        </div>
      </div>
      <div className="Home-Memo box">
      { edit ? 
          <textarea className="Home-Memo-input" placeholder="클릭하여 메모를 입력해주세요"
          onChange={onChangeHandler}
          value={memoValue}
          id="memoValue"></textarea>
          :
          <p>
          { memoData.content !== ""?
            <p style={{fontSize:"0.84vw",padding:"0.7vh"}}>{ memoData.content }</p>:
            <div>
              <span>&#128523;</span>
              <span style={{fontSize:"0.9vw"}}>아직 메모가 없어요! 중요한 내용을 기록해보세요!</span>
            </div>
          }
          </p> 
        }
      </div>
    </div>

  )
}

export default Memo;