import axios from 'axios';
import { LOADMASK_ON, LOADMASK_OFF } from '../reducer/LoadMask';
// GET.
export const requestGet = async (url, params, dispatchLoadMask) => {
  let responseData = null;
  let error = null;

  if(dispatchLoadMask) {
    dispatchLoadMask({ type: LOADMASK_ON });
  };

  try {
    const response = await axios.get(url, {
      params, timeout: 200000
    });

    responseData = response?.data;
  } catch(e) {
    error = e;
    if (e.response.status === 500) {
      error.message = e.response.data ? e.response.data : e.message;
    } else {
      error.message = '요청 중 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.';
    }
  } finally {
    if(dispatchLoadMask){
      setTimeout(() => dispatchLoadMask({ type: LOADMASK_OFF }), 1000);
    };
  }
  return { response: responseData, error };
};

// POST.
export const requestPost = async (url, params, dispatchLoadMask) => {
  let responseData = null;
  let error = null;

  if(dispatchLoadMask) {
    dispatchLoadMask({ type: LOADMASK_ON });
  };

  try {
    const response = await axios.post(url, params, { timeout: 200000 });
    responseData = response?.data;
  } catch(e) {
    error = e;
    if (e.response.status === 500) {
      error.message = e.response.data ? e.response.data : e.message;
    } else {
      error.message = '요청 중 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.';
    }
  } finally {
    if(dispatchLoadMask){
      setTimeout(()=> dispatchLoadMask({ type: LOADMASK_OFF }), 500);
    };
  }
  return { response: responseData, error };
};

// PUT.
export const requestPut = async (url, params, dispatchLoadMask) => {
  let responseData = null;
  let error = null;

  if(dispatchLoadMask){
    dispatchLoadMask({ type: LOADMASK_ON });
  };

  try {
    const response = await axios.put(url, params, { timeout: 200000 });
    responseData = response?.data;
  } catch(e) {
    error = e;
    if (e.response.status === 500) {
      error.message = e.response.data ? e.response.data : e.message;
    } else {
      error.message = '요청 중 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.';
    }
  } finally {
    if(dispatchLoadMask){
      setTimeout(() => dispatchLoadMask({ type: LOADMASK_OFF }), 500);
    }
  }

  return { response: responseData, error};
};

// DELETE.
export const requestDelete = async (url, params, dispatchLoadMask) => {
  let responseData = null;
  let error = null;

  if(dispatchLoadMask) {
    dispatchLoadMask({ type: LOADMASK_ON });
  };

  try {
    const response = await axios.delete(url, { params, timeout: 200000 });
    responseData = response?.data;
  } catch(e) {
    error = e;
    if (e.response.status === 500) {
      error.message = e.response.data ? e.response.data : e.message;
    } else {
      error.message = '요청 중 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.';
    }
  } finally {
    if(dispatchLoadMask) {
      setTimeout(() => dispatchLoadMask({ type: LOADMASK_OFF }), 500);
    };
  }

  return { response: responseData, error };
};
