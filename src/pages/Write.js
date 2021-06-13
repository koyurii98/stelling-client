import React, { useRef, useState, useCallback, useContext, useEffect } from "react";
import "../css/Write.css";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";

import "tui-chart/dist/tui-chart.css";
import chart from "@toast-ui/editor-plugin-chart";
import "highlight.js/styles/github.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "tui-color-picker/dist/tui-color-picker.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import uml from "@toast-ui/editor-plugin-uml";
import { useHistory, useLocation } from "react-router";
import { requestPost, requestPut } from "../utils/requestHelper";
import { AppContext } from "../context/index";
import { SERVER_URL } from "../env_config";
import { WRITE_FALSE } from "../reducer/write";

const Write = () => {
	const { user, openAlert, dispatchLoadMask, closeAlert, openConfirmAlert, writeFalse } = useContext(AppContext);
	const [title, setTitle] = useState("");
	const editorRef = useRef(null);
	const history = useHistory();
	const location = useLocation();
	const { edit, viewData, item } = location.state;

	useEffect(() => {
		if (edit) {
			setTitle(viewData.title);
		}
	}, [viewData, edit]);

	const addUpdateContent = useCallback(async () => {
		if (!title || !editorRef.current.getInstance().getHtml()) {
			openAlert("제목 또는 내용이 비어있습니다.", true);
			return;
		}
		if (edit) {
			const { res, err } = await requestPut(
				`${SERVER_URL}page/`,
				{
					id: viewData.id,
					title,
					content: editorRef.current.getInstance().getHtml(),
				},
				dispatchLoadMask,
				user.token,
			);
			if (err) {
				openAlert(err.message);
			}
			if (res.data) {
				const data = res.data;
				openAlert("글 수정이 완료되었습니다.");
				writeFalse();
				setTimeout(() => {
					history.push({
						pathname: `/view/${data.id}`,
						state: { data, item },
					});
				}, 1000);
			}
		} else {
			const { res, err } = await requestPost(
				`${SERVER_URL}page/`,
				{
					title,
					content: editorRef.current.getInstance().getHtml(),
					groupId: item && item.id,
				},
				dispatchLoadMask,
				user.token,
			);
			if (err) {
				openAlert(err.message, true);
			}
			if (res.data) {
				const data = res.data;
				openAlert("글 작성이 완료되었습니다.");
				writeFalse();
				setTimeout(() => {
					history.push({
						pathname: `/view/${data.id}`,
						state: { data, item },
					});
				}, 1000);
			}
		}
	}, [editorRef, title, dispatchLoadMask, user, history, item, openAlert, viewData, edit]);

	const iamgeUploader = useCallback(
		async file => {
			try {
				if (!/image/.test(file.type)) {
					throw new Error("이미지만 업로드 가능합니다.");
				}

				const forms = new FormData();
				forms.append("image", file);

				const { res, err } = await requestPost(`${SERVER_URL}page/image`, forms, dispatchLoadMask, user.token);

				if (err) {
					throw new Error(err);
				}

				return res.data.url;
			} catch (err) {
				openAlert(err.message || err);
				return false;
			}
		},
		[openAlert, user, dispatchLoadMask],
	);

	const cancelWrite = useCallback((viewData, item)=>{
		const alertWrite = ()=>{
			closeAlert();
			history.push("/");
			writeFalse();
		}
		const alertEdit = ()=>{
			closeAlert();
			history.push({ pathname: `/view/${viewData.id}`, state: { data: viewData, item } });
			writeFalse();
		}
		openConfirmAlert(`${edit?"수정":"작성"} 취소시 작성중이던 글은 모두 사라지게됩니다. </br> ${edit?"수정":"작성"}을 취소하시겠습니까?`,edit?alertEdit:alertWrite)
	},[openConfirmAlert, closeAlert]);

	return (
		<div id="wrap">
			<div id="content">
				<div className="title_btns">
					<div className="title">
						<p className="write-tit">{edit ? "글 수정" : "글 작성"}</p>
						<div className="subject-name">{item.title}</div>
					</div>
					<div className="btns">
						<p
							className="cancel"
							onClick={() => { edit ? cancelWrite(viewData, item) : cancelWrite() }}>
							{edit ? "수정취소" : "작성취소"}
						</p>
						<p className="write-ok" onClick={addUpdateContent}>
							{edit ? "수정완료" : "작성완료"}
						</p>
					</div>
				</div>

				<input type="text" className="input-title" placeholder="제목을 입력해주세요." value={title} onChange={e => setTitle(e.target.value)} />
				<div className="input-content">
					<Editor
						previewStyle="vertical"
						height="100%"
						initialEditType="wysiwyg"
						initialValue={viewData && viewData.content}
						ref={editorRef}
						usageStatistics={true}
						useCommandShortcut={true}
						placeholder={"내용을 입력해주세요."}
						plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
						style={{ width: "100%" }}
						hooks={{
							addImageBlobHook: async (file, callback) => {
								try {
									const image = await iamgeUploader(file);
									callback(image, "page image");
								} catch (err) {
									openAlert("이미지 업로드 중 문제가 발생했습니다. 홈으로 돌아간 후 다시 시도해주세요.");
								} finally {
									return false;
								}
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Write;
