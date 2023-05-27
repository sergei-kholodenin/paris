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
    USER_GET_STORES_RESET,
    
    USER_CREATE_PROFILE_REQUEST,
    USER_CREATE_PROFILE_SUCCESS,
    USER_CREATE_PROFILE_FAIL,
    USER_CREATE_PROFILE_RESET,
    
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
} from '../Constants/UserConstants';

export const userLoginReducer = (state={}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT_REQUEST:
            return {}
        default:
            return state
    }
}

export const userProfileReducer = (state={profileInfo: {profileExist: false}, success:false}, action) => {
    switch(action.type) {
        case USER_GET_PROFILE_REQUEST:
            return {
                loading: true,
                success: false,
                profileInfo: {profileExist: false}
            }
        case USER_GET_PROFILE_SUCCESS:
            return {
                loading: false,
                success: true,
                profileInfo: action.payload
            }
        case USER_GET_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_GET_PROFILE_RESET:
            return {profileInfo: {profileExist: false}, success:false}
        default:
            return state
    }
}

export const listStoresReducer = (state={}, action) => {
    switch(action.type) {
        case USER_GET_STORES_REQUEST:
            return {
                loading: true
            }
        case USER_GET_STORES_SUCCESS:
            return {
                loading: false,
                stores: action.payload
            }
        case USER_GET_STORES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_GET_STORES_RESET:
            return {}
        default:
            return state
    }
}

export const createProfileReducer = (state={success:false}, action) => {
    switch(action.type) {
        case USER_CREATE_PROFILE_REQUEST:
            return {
                loading: true,
                success: false
            }
        case USER_CREATE_PROFILE_SUCCESS:
            return {
                loading: false,
                success:true
            }
        case USER_CREATE_PROFILE_FAIL:
            return {
                loading: false,
                success:false,
                error: action.payload
            }
        case USER_CREATE_PROFILE_RESET:
            return {success:false}
        default:
            return state
    }
}

export const updateProfileReducer = (state={success:false}, action) => {
    switch(action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                loading: true,
                success: false
            }
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                success:true
            }
        case USER_UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload
            }
        case USER_UPDATE_PROFILE_RESET:
            return {success:false}
        default:
            return state
    }
}