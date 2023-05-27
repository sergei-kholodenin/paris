import axios from 'axios';
import {
    TEST_LIST_REQUEST,
    TEST_LIST_SUCCESS,
    TEST_LIST_FAIL,

    TEST_TAKER_REQUEST,
    TEST_TAKER_SUCCESS,
    TEST_TAKER_FAIL,

    POST_RESULT_REQUEST,
    POST_RESULT_SUCCESS,
    POST_RESULT_FAIL,

    GET_RESULTS_REQUEST,
    GET_RESULTS_SUCCESS,
    GET_RESULTS_FAIL,

    GET_RESULT_DETAILS_REQUEST,
    GET_RESULT_DETAILS_SUCCESS,
    GET_RESULT_DETAILS_FAIL,
} from '../Constants/TestConstants';

export const listTests = () => async (dispatch) => {
    try {
        dispatch({type: TEST_LIST_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/tests/`, config);
        dispatch({
            type: TEST_LIST_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: TEST_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const takeTest = (id) => async (dispatch) => {
    try {
        dispatch({type: TEST_TAKER_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/tests/${id}/`, config);
        dispatch({
            type: TEST_TAKER_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: TEST_TAKER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const postResult = (result) => async (dispatch) => {
    try {
        dispatch({type: POST_RESULT_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/tests/results/create/`, result, config);
        dispatch({
            type: POST_RESULT_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: POST_RESULT_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const getResults = () => async (dispatch) => {
    try {
        dispatch({type: GET_RESULTS_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/tests/results/get/`, config);
        dispatch({
            type: GET_RESULTS_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: GET_RESULTS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const getResultDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: GET_RESULT_DETAILS_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/tests/results/get/${id}`, config);
        dispatch({
            type: GET_RESULT_DETAILS_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: GET_RESULT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}