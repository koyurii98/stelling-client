import React, { useState, useCallback, useContext, useEffect } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import { AppContext } from "../context/index";
import { SERVER_URL } from "../env_config";
import { requestGet, requestPost, requestPut, requestDelete } from "../utils/requestHelper";
import moment from "moment";

const TodoList = () => {
	const { dispatchLoadMask, openAlert, user } = useContext(AppContext);
	const [TodoListData, setTodoListData] = useState([]);
	const [edit, setEdit] = useState(false);
	const [selectedItem, setSelectedItem] = useState(0);

	const todoInit = useCallback(async () => {
		try {
			const { res, err } = await requestGet(`${SERVER_URL}todo`, {}, dispatchLoadMask, user.token);

			if (err) {
				throw new Error(err);
			}

			if (res?.result) {
				setTodoListData(res.data);
			}
		} catch (err) {
			openAlert(err.message);
		}
	}, [openAlert, dispatchLoadMask, user]);

	useEffect(() => {
		todoInit();
	}, [todoInit]);

	const addTodo = useCallback(async () => {
		try {
			const { res, err } = await requestPost(
				`${SERVER_URL}todo`,
				{
					content: "new todo list item",
					start: moment().format("YYYY-MM-DD"),
					end: moment().format("YYYY-MM-DD"),
					success: "N",
				},
				null,
				user.token,
			);

			if (err) {
				throw new Error(err);
			}

			if (res?.result) {
				setTodoListData(
					TodoListData.concat({
						...res.data,
					}),
				);
			}
		} catch (err) {
			openAlert(err.message);
		}
	}, [TodoListData, openAlert, user]);

	const updateTodo = useCallback(async () => {
		try {
			const { err } = await requestPut(
				`${SERVER_URL}todo/multiple`,
				{
					todos: TodoListData,
				},
				null,
				user.token,
			);

			if (err) {
				throw new Error(err);
			}
		} catch (err) {
			openAlert(err.message);
		}
	}, [openAlert, TodoListData, user]);

	const deleteTodo = useCallback(
		async id => {
			try {
				const { err } = await requestDelete(`${SERVER_URL}todo?id=${id}`, {}, null, user.token);

				if (err) {
					throw new Error(err);
				}

				const filterdItems = TodoListData.filter(value => value.id !== id);

				setTodoListData(filterdItems);
			} catch (err) {
				openAlert(err.message);
			}
		},
		[openAlert, TodoListData, user],
	);

	const todoListValueOnChange = useCallback(
		(e, id) => {
			if (id || selectedItem) {
				const editTodo = TodoListData.map(value => {
					if ((id || selectedItem) === value.id) {
						return {
							...value,
							content: e.target.value,
						};
					}

					return {
						...value,
					};
				});

				setTodoListData(editTodo);
			}
		},
		[selectedItem, TodoListData],
	);

	const todoListCheckChange = useCallback(
		async (id, success, e) => {
			try {
				if (e.target.id || id) {
					let values = {};

					const editTodo = TodoListData.map(value => {
						if (id === value.id) {
							values = { ...value, success: success === "Y" ? "N" : "Y" };
							return {
								...value,
								success: success === "Y" ? "N" : "Y",
							};
						}

						return {
							...value,
						};
					});

					const { res, err } = await requestPut(
						`${SERVER_URL}todo`,
						{
							...values,
						},
						null,
						user.token,
					);

					if (err) {
						throw new Error(err);
					}

					if (res?.result) {
						setTodoListData(editTodo);
					}
				}
			} catch (err) {
				openAlert(err.message);
			}
		},
		[TodoListData, openAlert, user],
	);

	const selectedItemClick = useCallback(id => {
		setSelectedItem(id);
	}, []);

	const clickEdit = useCallback(async () => {
		try {
			if (edit) {
				updateTodo();
			}
		} catch (err) {
			openAlert(err.message);
		} finally {
			setEdit(!edit);
		}
	}, [edit, openAlert, updateTodo]);

	return (
		<div>
			<div className="Home-Header">
				<p className="Home-TodoList-tit">Todo List</p>
				<div className="Home-Header-btn color-Btn" onClick={clickEdit}>
					{edit ? "목록저장" : " 목록수정"}
				</div>
			</div>
			<div className="Home-TodoList box">
				<div className="Home-TodoList-list">
					{
						TodoListData[0] ? TodoListData.map((data, i) => {
							return (
								<div className="Home-TodoList-Item" key={i}>
									{edit ? (
										<div className="Home-TodoList-Item-cnt" style={{ display: "flex", justifyContent: "space-between", width: "95%" }}>
											<input type="text" onClick={() => selectedItemClick(data.id)} onChange={e => todoListValueOnChange(e, data.id)} className="Home-TodoList-Item-Input" value={data.content} />
											<CancelIcon onClick={() => deleteTodo(data.id)} className="Home-TodoList-Icon" style={{ fontSize: "15px", color: "#afafaf" }} />
										</div>
									) : (
										<div className="Home-TodoList-Item-cnt">
											<input onChange={e => todoListCheckChange(data.id, data.success, e)} type="checkbox" id={`checkedTodo-${data.id}`} checked={data.success === "Y"} />
											<label className={data.success === "Y" ? "Home-TodoList-Item-ctn textline" : "Home-TodoList-Item-ctn"} htmlFor={`checkedTodo-${data.id}`}>
												{data.content}
											</label>
										</div>
									)}
								</div>
							);
						})
						:
						<div className="Home-TodoList-Item Home-TodoList-Item-cnt" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}}>&#128071;아래 버튼을 눌러<br/> 할일을 추가해보세요!</div>
					}
					{TodoListData.length < 10 && (
						<div className="Home-TodoList-Btn addbtn" onClick={addTodo}>
							Add TodoList +
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TodoList;
