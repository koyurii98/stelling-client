export const MODAL_OPEN = 'MODAL_OPEN';

export const MODAL_CLOSE = 'MODAL_CLOSE';

export const initialModalState = {
  show:false,
  name:"",
  options:"",
  callback:"",
};

export const modalReducer = (state = initialModalState, action) =>{
  switch (action.type) {
    case MODAL_OPEN:
      return {
        show:true,
        name:action.name,
        options:action.options,
        callback:action.callback,
      };
    case MODAL_CLOSE:
      return state;
    default:
      return state;
  }
}