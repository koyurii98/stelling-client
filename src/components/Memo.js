import React, { useCallback, useState } from 'react';

const Memo = () => {
  const [ edit, setEdit ] = useState(false);

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
      { edit ? <textarea></textarea>:<span>텍스트</span> }
      </div>
    </div>

  )
}

export default Memo;