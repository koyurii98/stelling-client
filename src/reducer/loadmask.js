export const LOADMASK_ON = 'LOADMASK_ON';

export const LOADMASK_OFF = 'LOADMASK_OFF';



export const loadmaskReducer = (state = initialLoadMaskState, action) =>{
  switch (action.type) {
    case LOADMASK_ON:
      return true
    case LOADMASK_OFF:
      return false;
    default:
      return state;
  }
}