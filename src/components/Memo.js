import React, { useCallback, useState } from 'react';

const Memo = () => {
  const [ edit, setEdit ] = useState(false);

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };
  
  const clickEdit = useCallback(()=>{
    setEdit(!edit);
  },[edit]);

  return(
    <div>
      <div className="Home-Memo-Header">
        <span>MEMO</span>
        <div className="Home-Header-btn color-Btn" onClick={clickEdit}>
          { edit ? "목록저장":" 목록수정" }
        </div>
      </div>
      <div className="Home-Memo Home-box">
        <span>메모장</span>
      </div>
    </div>

  )
}

export default Memo;