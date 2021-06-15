export const WRITE_TRUE = 'WRITE_TRUE';
export const WRITE_FALSE = 'WRITE_FALSE';



export const writeReducer = (state , action) =>{
  switch (action.type) {
    case WRITE_TRUE:
      return true
    case WRITE_FALSE:
      return false;
    default:
      return state;
  }
}