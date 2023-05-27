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
    GET_RESULTS_RESET,

    GET_RESULT_DETAILS_REQUEST,
    GET_RESULT_DETAILS_SUCCESS,
    GET_RESULT_DETAILS_FAIL,
} from '../Constants/TestConstants';

export const testListReducer = (state={tests:[]}, action) => {
    switch(action.type) {
        case TEST_LIST_REQUEST:
            return {
                loading: true,
                tests:[]
            }
        case TEST_LIST_SUCCESS:
            return {
                loading: false,
                tests: action.payload
            }
        case TEST_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const testTakeReducer = (state={}, action) => {
    switch(action.type) {
        case TEST_TAKER_REQUEST:
            return {
                loading: true
            }
        case TEST_TAKER_SUCCESS:
            return {
                loading: false,
                infoTest: action.payload
            }
        case TEST_TAKER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const resultPostReducer = (state={}, action) => {
    switch(action.type) {
        case POST_RESULT_REQUEST:
            return {
                loading: true,
                success: false
            }
        case POST_RESULT_SUCCESS:
            return {
                loading: false,
                success:true,
                message: action.payload
            }
        case POST_RESULT_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const resultsGetReducer = (state={}, action) => {
    switch(action.type) {
        case GET_RESULTS_REQUEST:
            return {
                loading: true
            }
        case GET_RESULTS_SUCCESS:
            return {
                loading: false,
                listResults: action.payload
            }
        case GET_RESULTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case GET_RESULTS_RESET:
            return {}
        default:
            return state
    }
}

export const resultDetailsReducer = (state={}, action) => {
    switch(action.type) {
        case GET_RESULT_DETAILS_REQUEST:
            return {
                loading: true
            }
        case GET_RESULT_DETAILS_SUCCESS:
            return {
                loading: false,
                details: action.payload
            }
        case GET_RESULT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}