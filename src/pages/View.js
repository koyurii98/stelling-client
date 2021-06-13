import React, { useCallback, useContext } from 'react';
import { useHistory , useLocation} from 'react-router';
import { AppContext } from '../context/index';
import moment from 'moment';
import { requestDelete } from '../utils/requestHelper';
import { SERVER_URL } from "../env_config";
import { WRITE_TRUE } from '../reducer/write';

const View = () => {
	const { user, openAlert, dispatchLoadMask, openConfirmAlert, closeAlert, writeTrue } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const { data, item } = location.state;
  //item->과목
  //data->페이지 컨텐츠
  const deleteCont = useCallback(async() => {
		const token = window.localStorage.getItem("stelling");
    const { res, err } = await requestDelete(`${SERVER_URL}page/?id=${data.id}`,{}, dispatchLoadMask, token);
    if(err){
      openAlert(err.message,true);
    }
    if(res){
      closeAlert();
      openAlert("게시글이 삭제되었습니다.");
      history.push("/");
    }
  },[data, openAlert, dispatchLoadMask,user, history ]);

  const deleteAlert = useCallback(()=> {
    openConfirmAlert("게시글을 삭제하시겠습니까?", deleteCont);
  },[openConfirmAlert, closeAlert, deleteCont])

  const updateCont = useCallback(() => {
    const edit = true;
      history.push({
        pathname:`/write`,
        state: { edit, viewData:data, item }
      })
      writeTrue();
  }, [history, data, item, writeTrue]);

  return(
    <div id="wrap">
      <div id="content">
        <div className="subject_btns">
          <div className="subject">
            <p className="subject-tit"><span className="subject-tit-img">&#128215;</span>{item.title}</p>
          </div>

          <div className="btns">
            <p className="edit" onClick={updateCont}>수정</p>
            <p className="delete" onClick={deleteAlert}>삭제</p>
          </div>
        </div>
        <div className="view-content">
          <div className="view-tit">{data.title}</div>
          <div className="view-date">{moment(data.updatedAt).format('YYYY년 MM월 DD일 hh:mm')}</div>
          <div className="view-text">
            <div dangerouslySetInnerHTML={{__html:data.content}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default View;