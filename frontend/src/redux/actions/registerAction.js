import axios from "axios";
import { API_PUBLIC_URL } from "../../utils/config";
import {
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from "./actionTypes";
export const registerRequest = () => ({
    type: REGISTER_REQUEST,
});

export const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: user,
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error,
});
export const registerUser = (userData) => {
    return async (dispatch) => {
        dispatch(registerRequest());
        const api = `${API_PUBLIC_URL}users/`;
        try {
            const res = await axios.post(api, userData);
            dispatch(registerSuccess(res.data));
            return res.data;
            // console.log(res);
            // console.log(res.data);
            // console.log(res.data.user);
        } catch (error) {
            dispatch(registerFailure(error));
            console.log(error);
        }
    };
};
