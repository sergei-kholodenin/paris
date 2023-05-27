import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT_REQUEST,

    USER_GET_PROFILE_REQUEST,
    USER_GET_PROFILE_SUCCESS,
    USER_GET_PROFILE_FAIL,
    USER_GET_PROFILE_RESET,

    USER_GET_STORES_REQUEST,
    USER_GET_STORES_SUCCESS,
    USER_GET_STORES_FAIL,

    USER_CREATE_PROFILE_REQUEST,
    USER_CREATE_PROFILE_SUCCESS,
    USER_CREATE_PROFILE_FAIL,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
} from '../Constants/UserConstants';
import { GET_RESULTS_RESET } from '../Constants/TestConstants';


export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });
        const config = {
            headers : {
                "Content-type":"application/json"
            }
        }
        const { data } = await axios.post(
            '/api/users/login/',
            { "username": email, "password": password },
             config
             );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch(error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const logoutUser = () => async (dispatch) => {
    localStorage.removeItem('userInfo');    
    localStorage.setItem('profileInfo', JSON.stringify({profileInfo:{profileExist:false}}));    
    dispatch({ type: USER_LOGOUT_REQUEST });        
    dispatch({ type: USER_GET_PROFILE_RESET });
    dispatch({ type: GET_RESULTS_RESET });        
}

export const getUserProfile = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_GET_PROFILE_REQUEST
        });
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            '/api/users/profile/',
             config
             );

        dispatch({
            type: USER_GET_PROFILE_SUCCESS,
            payload: data
        });

        localStorage.setItem("profileInfo", JSON.stringify(data));

    } catch(error) {
        dispatch({
            type: USER_GET_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const getStoreList = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_GET_STORES_REQUEST
        });
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            '/api/users/profile/stores/',
             config
             );

        dispatch({
            type: USER_GET_STORES_SUCCESS,
            payload: data
        });

    } catch(error) {
        dispatch({
            type: USER_GET_STORES_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const createProfile = (profile) => async (dispatch) => {
    try {
        dispatch({
            type: USER_CREATE_PROFILE_REQUEST
        });
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            '/api/users/profile/create/',
            profile,
            config
            );

        dispatch({
            type: USER_CREATE_PROFILE_SUCCESS,
            payload: data
        });
        dispatch({
            type: USER_GET_PROFILE_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: USER_CREATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const updateProfile = (profile) => async (dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        });
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(
            '/api/users/profile/update/',
            profile,
            config
            );

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });
        dispatch({
            type: USER_GET_PROFILE_SUCCESS,
            payload: data
        });

    } catch(error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}