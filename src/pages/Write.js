import React, { useRef, useState, useCallback, useEffect } from 'react';
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

const Write = () => {
  const editorRef = useRef(null);
  
  const onChange = useCallback(() => {
    if (!editorRef.current) return
    const instance = editorRef.current.getInstance()
    console.log(instance);
  }, [ editorRef])

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
        <div className="input-content">
          <Editor
            previewStyle="vertical"
            height="400px"
            initialEditType="wysiwyg"
            initialValue="hello"
            ref={editorRef}
            onChange={onChange}
            usageStatistics={true}
            useCommandShortcut={true}
            plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
          />
          <button>make bold</button>
        </div>
      </div>
    </div>
  )
}

export default Write;