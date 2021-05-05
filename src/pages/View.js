import React from 'react';
import '../css/View.css';

const View = () => {
  return(
    <div id="wrap">
      <div id="content">
        <div className="subject_btns">
          <div className="subject">
            <p className="subject-tit">과목</p>
          </div>

          <div className="btns">
            <p className="edit">수정</p>
            <p className="delete">삭제</p>
          </div>
        </div>

        <div className="view-content">
          <div className="view-tit">타이틀</div>
          <div className="view-date">2021월 01월 01일 10시 01분</div>
        </div>
      </div>
    </div>
  )
}

export default View;