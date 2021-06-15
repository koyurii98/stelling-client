import React, { useCallback, useContext, useEffect, useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SidePageMenu from "./SidePageMenu";
import { List, ListItem } from "@material-ui/core";
import { requestDelete, requestGet, requestPost, requestPut } from "../../utils/requestHelper";
import { SERVER_URL } from "../../env_config";
import { AppContext } from "../../context/index";
import { Link } from "react-router-dom";
import { MODAL_OPEN } from "../../reducer/modal";
import CancelIcon from "@material-ui/icons/Cancel";
import { useHistory } from "react-router-dom";

const Base = props => {
	const history = useHistory();
	const { dispatchLoadMask, openAlert, userLogout, user, dispatchModal, openConfirmAlert, closeAlert, write, writeFalse } = useContext(AppContext);
	const [sideSwit, setSideSwit] = useState("");
	const [selectedIndex, setSelectedIndex] = useState("");
	const [item, setItem] = useState([]);
	const [groups, setGroups] = useState([]);
	const [edit, setEdit] = useState(false);
	const [selectGroup, setSelectGroup] = useState(0);
	const [ sideMenuFlex, setSideMenuFlex ] = useState(false);
	const groupInit = useCallback(async () => {
		try {
			const { res, err } = await requestGet(`${SERVER_URL}group`, {}, dispatchLoadMask, user.token);

			if (err) {
				throw new Error(err);
			}

			if (res?.result) {
				setGroups(res.data);
			}
		} catch (err) {
			openAlert(err.message);
		}
	}, [openAlert, dispatchLoadMask, user]);

	useEffect(() => {
		user?.token && groupInit();
	}, [groupInit, user?.token]);

	const handleListItemClick = useCallback(
		(data, idx) => {
			setSelectedIndex(idx);
			if (selectedIndex === idx && sideSwit === "sidePageMenu-open") {
				setSideSwit("sidePageMenu-close");
				setTimeout(() => {
					setSideMenuFlex(false);
				}, 500);
			} else {
				setSideSwit("sidePageMenu-open");
				setSideMenuFlex(true);
				setItem(data);
			}
		},
		[sideSwit, selectedIndex, setSideMenuFlex],
	);

	const onClickLogout = useCallback(async () => {
		closeAlert();
		const token = user?.token || window.localStorage.getItem("stelling");

		const { res, err } = await requestPost(SERVER_URL + "user/logout", { userId: user.data.id }, dispatchLoadMask, token);

		if (err) {
			openAlert(err.message, true);
		}
		if (res) {
			openAlert("로그아웃 되었습니다.");
			userLogout();
			return history.replace("/");
		}
	}, [dispatchLoadMask, history, userLogout, openAlert, user]);

	const onClickMy = useCallback(async () => {
		dispatchModal({ type: MODAL_OPEN, name: "mypage", edit: true });
	}, [dispatchModal]);

	const groupAdd = useCallback(async () => {
		try {
			const { res, err } = await requestPost(
				`${SERVER_URL}group`,
				{
					title: "new group",
				},
				null,
				user.token,
			);

			if (err) {
				throw new Error(err);
			}

			if (res?.result) {
				setGroups(groups.concat(res.data));
			}
		} catch (err) {
			openAlert(err.message);
		}
	}, [openAlert, groups, user]);

	const groupUpdate = useCallback(async () => {
		try {
			const { err } = await requestPut(`${SERVER_URL}group/multiple`, { groups }, null, user.token);

			if (err) {
				throw new Error(err);
			}
		} catch (err) {
			openAlert(err.message);
		}
	}, [openAlert, user, groups]);

	const groupDelete = useCallback(
		async id => {
			try {
				const { err } = await requestDelete(`${SERVER_URL}group?id=${id}`, {}, null, user.token);

				if (err) {
					throw new Error(err);
				}

				const filterdItems = groups.filter(value => value.id !== id);

				setGroups(filterdItems);
				closeAlert();
				openAlert("삭제가 완료되었습니다.");
			} catch (err) {
				openAlert(err.message);
			}
		},
		[openAlert, user, groups, closeAlert],
	);

	const groupDeleteAlert = useCallback(
		id => {
			openConfirmAlert("그룹삭제시 그룹안의 게시글도 모두 삭제됩니다. 삭제하시겠습니까?", () => groupDelete(id));
		},
		[openConfirmAlert, groupDelete],
	);

	const onChangeGroupValue = useCallback(
		(e, id) => {
			if (id || selectGroup) {
				const newGroups = groups.map(value => {
					if ((id || selectGroup) === value.id) {
						return {
							...value,
							title: e.target.value,
						};
					}

					return { ...value };
				});

				setGroups(newGroups);
			}
		},
		[groups, selectGroup],
	);

	const editBtnClick = useCallback(async () => {
		if(write){
			openAlert("글 작성 중에는 과목편집이 불가능합니다.");
			return setEdit(false);
		}
		try {
			setSideSwit("sidePageMenu-close");
			setTimeout(() => {
				setSideMenuFlex(false);
			}, 500);
			if (edit) {
				groupUpdate();
			}
		} catch (err) {
			openAlert(err.message);
		} finally {
			setEdit(!edit);
		}
	}, [openAlert, edit, groupUpdate, setSideSwit, sideMenuFlex ]);

	const selectGroupItem = useCallback(id => {
		setSelectGroup(id);
	}, []);

	const moveMain = useCallback(() =>{
		if(write){
			const Main=()=>{
				closeAlert();
				writeFalse();
				return history.push("/");
			}
			openConfirmAlert("글 작성 중 페이지 이동시 작성 중이던 글은 저장되지 않습니다. 이동 하시겠습니까?", Main);
		}else{
			history.push("/");
		}
	},[history, closeAlert, writeFalse, openConfirmAlert]);

	return (
		<div className="base">
			<div className="header">
				<div className="header-Icons">
					<HomeIcon className="header-Icon" style={{ fontSize: "1.3vw", top: "0.15vw", position: "relative" }} onClick={moveMain} />
					<PowerSettingsNewIcon className="header-Icon" style={{ fontSize: "1.3vw" }} onClick={()=>openConfirmAlert("로그아웃 하시겠습니까?" ,onClickLogout)} />
				</div>
			</div>
			<div className="base-layout">
				<div className="sideMenu">
					<div className="sideMenu-Logo"  onClick={moveMain}>
						<img src="../img/stelling_logo.png" alt="logo" />
					</div>
					<div className="sideMenu-Profile">
						<div className="sideMenu-Profile-fr" onClick={onClickMy}>
							<img src={user?.data?.profile ? user.data.profile : "../img/user.png"} className="sideMenu-Profile-img" alt="profile" />
						</div>
					</div>
					<List className="sideMenu-Menu" component="nav" aria-label="secondary mailbox folder">
						{groups[0] ? (
							groups.map((data, i) => {
								return (
									<ListItem key={i} style={{ height: "2.8vw", display: "flex", flexDirection: "row", justifyContent: "space-between" }} button={!edit} selected={selectedIndex === i} onClick={() => (edit ? null : handleListItemClick(data, i))}>
										{edit ? <input className="sideMenu-edit-input" type="text" value={data.title} onClick={() => selectGroupItem(data.id)} onChange={e => onChangeGroupValue(e, data.id)} /> : <p>{data.title}</p>}
										{edit && <CancelIcon onClick={() => groupDeleteAlert(data.id)} className="Home-TodoList-Icon" style={{ fontSize: "15px", color: "#afafaf" }} />}
									</ListItem>
								);
							})
						) : (
							<ListItem style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", color: "#5e5e5e", fontSize: "0.9vw" }}>
								&#128071;아래 버튼을 눌러
								<br /> 할일을 추가해보세요!
							</ListItem>
						)}
					</List>
					{edit && (
						groups.length  < 11 &&
						<div className="Home-TodoList-Btn addbtn" onClick={groupAdd}>
							Add Group +
						</div>
					)}
					<div className="sideMenu-Btn" onClick={editBtnClick}>
						<span>{edit ? "과목 저장" : "과목 편집"}</span>
					</div>
				</div>
				{
					sideMenuFlex && 
						<SidePageMenu item={item} sideSwit={sideSwit} setSideSwit={setSideSwit} setSideMenuFlex={setSideMenuFlex} />
				}
				<div className="contents">{props.children}</div>
			</div>
		</div>
	);
};

export default Base;
