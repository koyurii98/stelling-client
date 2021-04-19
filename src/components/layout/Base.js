import React, { useCallback, useContext, useEffect, useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import PersonIcon from "@material-ui/icons/Person";
import SidePageMenu from "./SidePageMenu";
import { List, ListItem } from "@material-ui/core";
import { requestDelete, requestGet, requestPost, requestPut } from "../../utils/requestHelper";
import { SERVER_URL } from "../../env_config";
import { AppContext } from "../../context/index";
import { Link } from "react-router-dom";
import { MODAL_OPEN } from "../../reducer/modal";
import CancelIcon from "@material-ui/icons/Cancel";

// const subj = [
// 	{
// 		name: "국어",
// 		key: "ko",
// 		pageList: [
// 			{ title: "국어1주차", content: "국어1주차 내용입니다람쥐", date: "2021-04-01" },
// 			{ title: "국어1주차", content: "국어1주차 내용입니다람쥐", date: "2021-04-01" },
// 			{ title: "국어1주차", content: "국어1주차 내용입니다람쥐", date: "2021-04-01" },
// 		],
// 	},
// 	{
// 		name: "수학",
// 		key: "su",
// 		pageList: [
// 			{ title: "수학1주차", content: "수학1주차 내용입니다람쥐", date: "2021-04-01" },
// 			{ title: "수학1주차", content: "수학1주차 내용입니다람쥐", date: "2021-04-01" },
// 			{ title: "수학1주차", content: "수학1주차 내용입니다람쥐", date: "2021-04-01" },
// 		],
// 	},
// 	{
// 		name: "과학",
// 		key: "ga",
// 		pageList: [
// 			{ title: "과학1주차", content: "과학1주차 내용입니다람쥐", date: "2021-04-01" },
// 			{ title: "과학1주차", content: "과학1주차 내용입니다람쥐", date: "2021-04-01" },
// 			{ title: "과학1주차", content: "과학1주차 내용입니다람쥐", date: "2021-04-01" },
// 		],
// 	},
// 	{
// 		name: "사회",
// 		key: "sa",
// 		pageList: [
// 			{ title: "사회1주차", content: "사회1주차 내용입니다람쥐", date: "2021-04-01" },
// 			{ title: "사회1주차", content: "사회1주차 내용입니다람쥐", date: "2021-04-01" },
// 			{ title: "사회1주차", content: "사회1주차 내용입니다람쥐", date: "2021-04-01" },
// 		],
// 	},
// 	{
// 		name: "한국사",
// 		key: "han",
// 		pageList: [
// 			{ title: "한국사1주차", content: "한국사1주차 내용입니다람쥐", date: "2021-04-01" },
// 			{ title: "한국사1주차", content: "한국사1주차 내용입니다람쥐", date: "2021-04-01" },
// 			{ title: "한국사1주차", content: "한국사1주차 내용입니다람쥐", date: "2021-04-01" },
// 		],
// 	},
// ];

const Base = props => {
	const { dispatchLoadMask, openAlert, userLogout, user, dispatchModal } = useContext(AppContext);
	const [test, setTest] = useState("");
	const [selectedIndex, setSelectedIndex] = useState("");
	const [item, setItem] = useState([]);
	const [menuTit, setMenuTit] = useState("sidePageMenu-tit tit-Close");
	const [groups, setGroups] = useState([]);
	const [edit, setEdit] = useState(false);
	const [selectGroup, setSelectGroup] = useState(0);

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
			if (selectedIndex === idx && test === "sidePageMenu-open") {
				setTest("sidePageMenu-close");
				setTimeout(() => setMenuTit("sidePageMenu-tit tit-Close"), 500);
			} else {
				setTest("sidePageMenu-open");
				setMenuTit("sidePageMenu-tit tit-Open");
				setItem(data);
			}
		},
		[test, selectedIndex],
	);

	const onClickLogout = useCallback(async () => {
		const token = window.localStorage.getItem("stelling");
		const { res, err } = await requestPost(SERVER_URL + "user/logout", {}, dispatchLoadMask, token);
		if (err) {
			openAlert(err.message, true);
		}
		if (res) {
			openAlert("로그아웃 되었습니다.");
			userLogout();
		}
	}, [dispatchLoadMask, userLogout, openAlert]);

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
			} catch (err) {
				openAlert(err.message);
			}
		},
		[openAlert, user, groups],
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
		try {
			if (edit) {
				groupUpdate();
			}
		} catch (err) {
			openAlert(err.message);
		} finally {
			setEdit(!edit);
		}
	}, [openAlert, edit, groupUpdate]);

	const selectGroupItem = useCallback(id => {
		setSelectGroup(id);
	}, []);

	return (
		<div className="base">
			<div className="header">
				<div className="header-Icons">
					<Link to="/">
						<HomeIcon className="header-Icon" style={{ fontSize: "1.3vw" }} />
					</Link>
					<PersonIcon className="header-Icon" style={{ fontSize: "1.3vw" }} onClick={onClickMy} />
					<PowerSettingsNewIcon className="header-Icon" style={{ fontSize: "1.3vw" }} onClick={onClickLogout} />
				</div>
			</div>
			<div className="base-layout">
				<div className="sideMenu">
					<div className="sideMenu-Logo">
						<img src="../img/stelling_logo.png" alt="logo" />
					</div>
					<div className="sideMenu-Profile">
						<div className="sideMenu-Profile-fr">
							<img src="../img/user.png" className="sideMenu-Profile-img" alt="profile" />
						</div>
					</div>
					<List className="sideMenu-Menu" component="nav" aria-label="secondary mailbox folder">
						{
							groups[0] ? groups.map((data, i) => {
								return (
									<ListItem key={i} style={{ height: "2.8vw", display: "flex", flexDirection: "row", justifyContent: "space-between" }} button={!edit} selected={selectedIndex === i} onClick={() => (edit ? null : handleListItemClick(data, i))}>
										{edit ? <input className="sideMenu-edit-input" type="text" value={data.title} onClick={() => selectGroupItem(data.id)} onChange={e => onChangeGroupValue(e, data.id)} /> : <p>{data.title}</p>}
										{edit && <CancelIcon onClick={() => groupDelete(data.id)} className="Home-TodoList-Icon" style={{ fontSize: "15px", color: "#afafaf" }} />}
									</ListItem>
								);
							})
							:
							<ListItem>아래 버튼을 눌러 그룹을 추가해보세요!</ListItem>
						}
					</List>
					{edit && (
						<div className="Home-TodoList-Btn addbtn" onClick={groupAdd}>
							Add Group +
						</div>
					)}
					<div className="sideMenu-Btn" onClick={editBtnClick}>
						<span>{edit ? "과목 저장" : "과목 편집"}</span>
					</div>
				</div>
				<SidePageMenu item={item} test={test} menuTit={menuTit} />
				<div className="contents">{props.children}</div>
			</div>
		</div>
	);
};

export default Base;
