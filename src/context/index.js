import React, { createContext, useReducer, useCallback } from "react";
import { LoadMaskReducer } from '../reducer/loadmask';
import { AlertReducer,initialAlertState, ALERT_OPEN, ALERT_CLOSE, ALERT_C_OPEN } from '../reducer/alert';
import { ModalReducer, initialModalState, MODAL_OPEN, MODAL_CLOSE } from '../reducer/modal';
import { UserReducer, initialUserState, USER_LOGIN, USER_LOGOUT } from '../reducer/user';
import LoadMask from '../components/LoadMask';
import Alert from '../components/Alert';
import Modal from '../components/modals';

export const AppContext = createContext({});

export const AppProvider = props => {
  const [ loadMask, dispatchLoadMask ] = useReducer(LoadMaskReducer, false);
  const [ alert, dispatchAlert ] = useReducer(AlertReducer, initialAlertState);
  const [ modal, dispatchModal ] = useReducer(ModalReducer, initialModalState);
  const [ user, dispatchUser ] = useReducer(UserReducer, initialUserState);

  // 기본 알러트. 
  const openAlert = useCallback((content, error) => {
    setTimeout(() =>dispatchAlert({ type: ALERT_OPEN, content, error }), 500);
  },[dispatchAlert]);
  
  // 컨펌 알러트.
  const openConfirmAlert = useCallback((content, confirmFunc) => {
    setTimeout(() =>dispatchAlert({ type: ALERT_C_OPEN, content, confirmFunc }), 500);
  }, [dispatchAlert]);

  // 알러트 닫기.
  const closeAlert = useCallback(() => {
    dispatchAlert({ type: ALERT_CLOSE })
  }, [dispatchAlert]);
  
  // // 모달 열기.
  // const openModal = useCallback((name, options, callback) => {
  //   dispatchModal({ type: MODAL_OPEN, name, options, callback });
  // }, [dispatchModal]);

  // 모달 닫기.
  const closeModal = useCallback(() => {
    dispatchModal({ type: MODAL_CLOSE, edit:false });
  }, [dispatchModal]);

  const userLogin = useCallback((data, token)=> {
    localStorage.setItem("stelling", token);
    dispatchUser({ type:USER_LOGIN, data:data, token:token});
  },[dispatchUser, USER_LOGIN]);

  const userLogout = useCallback(()=>{
    localStorage.removeItem("stelling")
    dispatchUser({ type:USER_LOGOUT });
  },[dispatchUser, USER_LOGOUT]);

  // 모든 컨텍스트 값.
  const values = {
    openAlert,
    openConfirmAlert,
    closeAlert,
    dispatchModal,
    closeModal,
    dispatchLoadMask,
    userLogin,
    userLogout,
    user,
    alert,
    modal,
  };
  return (
    <AppContext.Provider value={values}>
      { alert.show && <Alert/> }
      { loadMask && <LoadMask/> }
      {
        modal.show && 
        <Modal
          show={modal.show}
          name={modal.name}/>
      }
      {props.children}
    </AppContext.Provider>
  );
};
