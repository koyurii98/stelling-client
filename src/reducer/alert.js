export const ALERT_OPEN = 'ALERT_OPEN';
export const ALERT_C_OPEN = 'ALERT_C_OPEN';
export const ALERT_CLOSE = 'ALERT_CLOSE';


export const initialAlertState = {
  show:false,
  content:"",
  err:false,
  cencleAble:false,
  confirmFunc:null,
};

export const AlertReducer = (state = initialAlertState, action) =>{
  switch (action.type) {
    case ALERT_OPEN:
      return {
        ...state,
        show:true,
        content:action.content,
        err:action.err,
     };
    case ALERT_C_OPEN: return {
      show:true,
      content:action.content,
      err:action.err,
      cencleAble:true,
      confirmFunc:action.confirmFunc,
    }
    case ALERT_CLOSE:
      return initialAlertState;
    default:
      return state;
  }
}