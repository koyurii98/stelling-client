export const USER_LOGIN = 'USER_LOGIN';

export const USER_LOGOUT = 'USER_LOGOUT';

export const initialUserState = {
  token:null,
  login:false,
  data:null,
};

export const UserReducer = (state = initialUserState, action) =>{
  switch (action.type) {
    case USER_LOGIN:
      return {
        token:action.token,
        login:true,
        data:action.data,
      };
    case USER_LOGOUT:
      return state;
    default:
      return state;
  }
}