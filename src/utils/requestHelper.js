import axios from "axios";
import { LOADMASK_ON, LOADMASK_OFF } from "../reducer/loadmask";
// GET.
export const requestGet = async (url, params, dispatchLoadMask, token) => {
	let responseData = null;
	let error = null;

	if (dispatchLoadMask) {
		dispatchLoadMask({ type: LOADMASK_ON });
	}

	try {
		const response = await axios.get(url, {
			headers: {
				authorization: token,
			},
			timeout: 200000,
		});
		responseData = response?.data;
	} catch (e) {
		error = e;
		console.log(e.message);
	} finally {
		if (dispatchLoadMask) {
			setTimeout(() => dispatchLoadMask({ type: LOADMASK_OFF }), 500);
		}
	}
	return { res: responseData, err: error };
};

// POST.
export const requestPost = async (url, params, dispatchLoadMask, token) => {
	let responseData = null;
	let error = null;

	if (dispatchLoadMask) {
		dispatchLoadMask({ type: LOADMASK_ON });
	}

	try {
		const response = await axios.post(url, params, {
			headers: {
				authorization: token,
			},
			timeout: 200000,
		});
		responseData = response?.data;
	} catch (e) {
		error = e;
		console.log(e.message);
	} finally {
		if (dispatchLoadMask) {
			setTimeout(() => dispatchLoadMask({ type: LOADMASK_OFF }), 500);
		}
	}
	return { res: responseData, err: error };
};

// PUT.
export const requestPut = async (url, params, dispatchLoadMask, token) => {
	let responseData = null;
	let error = null;

	if (dispatchLoadMask) {
		dispatchLoadMask({ type: LOADMASK_ON });
	}

	try {
		const response = await axios.put(url, params, {
			headers: {
				authorization: token,
			},
			timeout: 200000,
		});
		responseData = response?.data;
	} catch (e) {
		error = e;
		console.log(e.message);
	} finally {
		if (dispatchLoadMask) {
			setTimeout(() => dispatchLoadMask({ type: LOADMASK_OFF }), 500);
		}
	}

	return { res: responseData, err: error };
};

// DELETE.
export const requestDelete = async (url, params, dispatchLoadMask, token) => {
	let responseData = null;
	let error = null;

	if (dispatchLoadMask) {
		dispatchLoadMask({ type: LOADMASK_ON });
	}

	try {
		const response = await axios.delete(url, {
			headers: {
				authorization: token,
			},
			timeout: 200000,
		});
		responseData = response?.data;
	} catch (e) {
		error = e;
		console.log(e.message);
	} finally {
		if (dispatchLoadMask) {
			setTimeout(() => dispatchLoadMask({ type: LOADMASK_OFF }), 300);
		}
	}

	return { res: responseData, err: error };
};
