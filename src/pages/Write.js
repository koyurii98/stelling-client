import React from 'react';
import '../css/Write.css'

const Write = () => {
  return(
    <div id="wrap">
      <div id="content">
        <div className="title_btns">
          <div className="title">
            <p className="write-tit">글 작성</p>
            <div className="subject-name">국어</div>
          </div>

          <div className="btns">
            <a href="" className="cancel">작성취소</a>
            <a href="" className="write-ok">작성완료</a>
          </div>
        </div>

        <input className="input-title" placeholder="제목을 입력해주세요."></input>
        <div className="input-content"></div>
      </div>
    </div>
  )
}

export default Write;