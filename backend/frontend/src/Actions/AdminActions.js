import axios from 'axios';
import {
    GET_STORES_INFO_REQUEST,
    GET_STORES_INFO_SUCCESS,
    GET_STORES_INFO_FAIL,

    UPDATE_STORE_NAME_REQUEST,
    UPDATE_STORE_NAME_SUCCESS,
    UPDATE_STORE_NAME_FAIL,
    
    DELETE_STORE_REQUEST,
    DELETE_STORE_SUCCESS,
    DELETE_STORE_FAIL,
    
    GET_LIST_USER_RESULTS_REQUEST,
    GET_LIST_USER_RESULTS_SUCCESS,
    GET_LIST_USER_RESULTS_FAIL,
    
    CREATE_STORE_REQUEST,
    CREATE_STORE_SUCCESS,
    CREATE_STORE_FAIL,
    
    UPDATE_POSITION_NAME_REQUEST,
    UPDATE_POSITION_NAME_SUCCESS,
    UPDATE_POSITION_NAME_FAIL,
    
    DELETE_POSITION_REQUEST,
    DELETE_POSITION_SUCCESS,
    DELETE_POSITION_FAIL,
        
    CREATE_POSITION_REQUEST,
    CREATE_POSITION_SUCCESS,
    CREATE_POSITION_FAIL,
        
    GET_POSITION_REQUEST,
    GET_POSITION_SUCCESS,
    GET_POSITION_FAIL,
        
    GET_TEST_REQUEST,
    GET_TEST_SUCCESS,
    GET_TEST_FAIL,
        
    UPDATE_TEST_REQUEST,
    UPDATE_TEST_SUCCESS,
    UPDATE_TEST_FAIL,
    
    DELETE_TEST_REQUEST,
    DELETE_TEST_SUCCESS,
    DELETE_TEST_FAIL,
        
    CREATE_TEST_REQUEST,
    CREATE_TEST_SUCCESS,
    CREATE_TEST_FAIL,
            
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAIL,
            
    UPDATE_QUESTION_REQUEST,
    UPDATE_QUESTION_SUCCESS,
    UPDATE_QUESTION_FAIL,
    
    DELETE_QUESTION_REQUEST,
    DELETE_QUESTION_SUCCESS,
    DELETE_QUESTION_FAIL,
        
    CREATE_QUESTION_REQUEST,
    CREATE_QUESTION_SUCCESS,
    CREATE_QUESTION_FAIL,
        
    DELETE_VARIANT_REQUEST,
    DELETE_VARIANT_SUCCESS,
    DELETE_VARIANT_FAIL,
            
    CREATE_QUESTION_MULTI_REQUEST,
    CREATE_QUESTION_MULTI_SUCCESS,
    CREATE_QUESTION_MULTI_FAIL,
            
    GET_USERS_LIST_REQUEST,
    GET_USERS_LIST_SUCCESS,
    GET_USERS_LIST_FAIL,
                
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
                
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
                
    UPDATE_ADMIN_REQUEST,
    UPDATE_ADMIN_SUCCESS,
    UPDATE_ADMIN_FAIL,
                
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
                
    CREATE_PROFILE_REQUEST,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_FAIL,
                
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
                
    GET_LIST_PROFILES_REQUEST,
    GET_LIST_PROFILES_SUCCESS,
    GET_LIST_PROFILES_FAIL,
                
    UPDATE_STORE_POS_REQUEST,
    UPDATE_STORE_POS_SUCCESS,
    UPDATE_STORE_POS_FAIL,
} from '../Constants/AdminConstants';

export const getStoresInfo = () => async (dispatch) => {
    try {
        dispatch({type: GET_STORES_INFO_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/admin/`, config);
        dispatch({
            type: GET_STORES_INFO_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: GET_STORES_INFO_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const updateStoreName = (store) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_STORE_NAME_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/admin/stores/update/`, store, config );
        dispatch({
            type: UPDATE_STORE_NAME_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: UPDATE_STORE_NAME_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const deleteStore = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_STORE_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`/api/admin/stores/delete/${id}`,config );
        dispatch({
            type: DELETE_STORE_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: DELETE_STORE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const getUserResults = (id) => async (dispatch) => {
    try {
        dispatch({type: GET_LIST_USER_RESULTS_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/admin/results/users/${id}/`,config );
        dispatch({
            type: GET_LIST_USER_RESULTS_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: GET_LIST_USER_RESULTS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const createStore = (name) => async (dispatch) => {
    try {
        dispatch({type: CREATE_STORE_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/admin/stores/create/`, name,config );
        dispatch({
            type: CREATE_STORE_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: CREATE_STORE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}


export const updatePositionName = (position) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_POSITION_NAME_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/admin/positions/update/`, position, config );
        dispatch({
            type: UPDATE_POSITION_NAME_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: UPDATE_POSITION_NAME_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const deletePosition = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_POSITION_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`/api/admin/positions/delete/${id}`,config );
        dispatch({
            type: DELETE_POSITION_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: DELETE_POSITION_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}


export const createPosition = (name) => async (dispatch) => {
    try {
        dispatch({type: CREATE_POSITION_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/admin/positions/create/`, name,config );
        dispatch({
            type: CREATE_POSITION_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: CREATE_POSITION_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const getPositionsInfo = () => async (dispatch) => {
    try {
        dispatch({type: GET_POSITION_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/admin/positions/get/`, config );
        dispatch({
            type: GET_POSITION_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: GET_POSITION_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const getTestsInfo = () => async (dispatch) => {
    try {
        dispatch({type: GET_TEST_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/admin/tests/get/`, config );
        dispatch({
            type: GET_TEST_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: GET_TEST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}


export const updateTest = (test) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_TEST_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/admin/tests/update/`, test, config );
        dispatch({
            type: UPDATE_TEST_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: UPDATE_TEST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const deleteTest = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_TEST_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`/api/admin/tests/delete/${id}`,config );
        dispatch({
            type: DELETE_TEST_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: DELETE_TEST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}


export const createTest = (name) => async (dispatch) => {
    try {
        dispatch({type: CREATE_TEST_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/admin/tests/create/`, name,config );
        dispatch({
            type: CREATE_TEST_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: CREATE_TEST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}


export const getQuestionsInfo = (id) => async (dispatch) => {
    try {
        dispatch({type: GET_QUESTIONS_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/admin/questions/get/${id}`, config);
        dispatch({
            type: GET_QUESTIONS_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: GET_QUESTIONS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const updateQuestion = (question) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_QUESTION_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/admin/questions/update/`, question, config );
        dispatch({
            type: UPDATE_QUESTION_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: UPDATE_QUESTION_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const deleteQuestion = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_QUESTION_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`/api/admin/questions/delete/${id}`,config );
        dispatch({
            type: DELETE_QUESTION_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: DELETE_QUESTION_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}


export const createQuestion = (question) => async (dispatch) => {
    try {
        dispatch({type: CREATE_QUESTION_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/admin/questions/create/`, question,config );
        dispatch({
            type: CREATE_QUESTION_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: CREATE_QUESTION_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const deleteVariant = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_VARIANT_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`/api/admin/variants/delete/${id}`,config );
        dispatch({
            type: DELETE_VARIANT_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: DELETE_VARIANT_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const createQuestions = (questions) => async (dispatch) => {
    try {
        dispatch({type: CREATE_QUESTION_MULTI_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/admin/questions/create/multi/`, questions,config );
        dispatch({
            type: CREATE_QUESTION_MULTI_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: CREATE_QUESTION_MULTI_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const getUsersList = () => async (dispatch) => {
    try {
        dispatch({type: GET_USERS_LIST_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/admin/users/get/`,config );
        dispatch({
            type: GET_USERS_LIST_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: GET_USERS_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const createNewUser = (user) => async (dispatch) => {
    try {
        dispatch({type: CREATE_USER_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/admin/users/create/`, user,config );
        dispatch({
            type: CREATE_USER_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: CREATE_USER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_USER_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`/api/admin/users/delete/${id}/`,config );
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const updateAdminStatus = (user) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_ADMIN_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/admin/users/update/`, user,config );
        dispatch({
            type: UPDATE_ADMIN_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: UPDATE_ADMIN_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const takeProfileById = (id) => async (dispatch) => {
    try {
        dispatch({type: GET_PROFILE_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/admin/users/profile/${id}/`,config );
        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: GET_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const createProfileById = (profile) => async (dispatch) => {
    try {
        dispatch({type: CREATE_PROFILE_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/admin/users/profile/create/`, profile, config );
        dispatch({
            type: CREATE_PROFILE_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: CREATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const updateProfileById = (profile) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PROFILE_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/admin/users/profile/update/`, profile, config );
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const getListProfiles = () => async (dispatch) => {
    try {
        dispatch({type: GET_LIST_PROFILES_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/admin/users/profiles/all/`, config );
        dispatch({
            type: GET_LIST_PROFILES_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: GET_LIST_PROFILES_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const updateStorePosition = (info) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_STORE_POS_REQUEST});
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers : {
                "Content-type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/admin/users/profiles/update/`, info, config );
        dispatch({
            type: UPDATE_STORE_POS_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: UPDATE_STORE_POS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}