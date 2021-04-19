export const MODAL_OPEN = 'MODAL_OPEN';

export const MODAL_CLOSE = 'MODAL_CLOSE';

export const initialModalState = {
  show:false,
  name:"",
  options:"",
  callback:"",
  edit:false,
};

export const ModalReducer = (state = initialModalState, action) =>{
  switch (action.type) {
    case MODAL_OPEN:
      return {
        show:true,
        name:action.name,
        options:action.options,
        callback:action.callback,
        edit:action.edit,
      };
    case MODAL_CLOSE:
      return initialModalState;
    default:
      return state;
  }
}