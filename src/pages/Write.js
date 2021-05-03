import React, { useRef, useState, useCallback, useContext } from 'react';
import '../css/Write.css'
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';

import 'tui-chart/dist/tui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';
import 'highlight.js/styles/github.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
import { useHistory , useLocation} from 'react-router';
import { requestPost } from '../utils/requestHelper';
import { AppContext } from '../context/index';
import { SERVER_URL } from "../env_config";

const Write = () => {
	const { modal, closeModal, user, openAlert, dispatchLoadMask } = useContext(AppContext);
  const [ title , setTitle ] = useState("");
  const editorRef = useRef(null);
  const history = useHistory();
  const location = useLocation();
  const { item } = location.state;

  const addContent = useCallback(async() => {
    if(!title || !editorRef.current.getInstance().getHtml()){
      openAlert("제목 또는 내용이 비어있습니다.",true);
      return;
    }
    const { res, err } = await requestPost(`${SERVER_URL}page/`, {
      title,
      content: editorRef.current.getInstance().getHtml(),
      groupId:item.id ,
    }, dispatchLoadMask, user.token);
    if(err){
      openAlert(err.message,true);
    }
    if(res){
      console.log(res.data);
      // setPageList(pageList.concat(res.data));
      openAlert("글 작성이 완료되었습니다.");
      // history.push(`/view?id=${red.data.id}`);
    }
  },[editorRef, title, dispatchLoadMask, user]);


  return(
    <div id="wrap">
      <div id="content">
        <div className="title_btns">
          <div className="title">
            <p className="write-tit">글 작성</p>
            <div className="subject-name">{item.title}</div>
          </div>

          <div className="btns">
            <p className="cancel" onClick={()=>history.push("/")}>작성취소</p>
            <p className="write-ok" onClick={addContent}>작성완료</p>
          </div>
        </div>

        <input type="text" className="input-title" placeholder="제목을 입력해주세요." value={title} onChange={(e)=> setTitle(e.target.value)}/>
        <div className="input-content">
          <Editor
            previewStyle="vertical"
            height="100%"
            initialEditType="wysiwyg"
            initialValue="hello"
            ref={editorRef}
            usageStatistics={true}
            useCommandShortcut={true}
            plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
            style={{width:"100%"}}
          />
        </div>
      </div>
    </div>
  )
}

export default Write;