import {
    GET_STORES_INFO_REQUEST,
    GET_STORES_INFO_SUCCESS,
    GET_STORES_INFO_FAIL,
    GET_STORES_INFO_RESET,

    UPDATE_STORE_NAME_REQUEST,
    UPDATE_STORE_NAME_SUCCESS,
    UPDATE_STORE_NAME_FAIL,
    UPDATE_STORE_NAME_RESET,

    DELETE_STORE_REQUEST,
    DELETE_STORE_SUCCESS,
    DELETE_STORE_FAIL,

    GET_LIST_USER_RESULTS_REQUEST,
    GET_LIST_USER_RESULTS_SUCCESS,
    GET_LIST_USER_RESULTS_FAIL,
    GET_LIST_USER_RESULTS_RESET,

    CREATE_STORE_REQUEST,
    CREATE_STORE_SUCCESS,
    CREATE_STORE_FAIL,
    
    UPDATE_POSITION_NAME_REQUEST,
    UPDATE_POSITION_NAME_SUCCESS,
    UPDATE_POSITION_NAME_FAIL,
    UPDATE_POSITION_NAME_RESET,

    DELETE_POSITION_REQUEST,
    DELETE_POSITION_SUCCESS,
    DELETE_POSITION_FAIL,
    DELETE_POSITION_RESET,
    
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
    UPDATE_TEST_RESET,

    DELETE_TEST_REQUEST,
    DELETE_TEST_SUCCESS,
    DELETE_TEST_FAIL,
    DELETE_TEST_RESET,
    
    CREATE_TEST_REQUEST,
    CREATE_TEST_SUCCESS,
    CREATE_TEST_FAIL,
    CREATE_TEST_RESET,
        
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAIL,
    GET_QUESTIONS_RESET,
            
    UPDATE_QUESTION_REQUEST,
    UPDATE_QUESTION_SUCCESS,
    UPDATE_QUESTION_FAIL,
    UPDATE_QUESTION_RESET,

    DELETE_QUESTION_REQUEST,
    DELETE_QUESTION_SUCCESS,
    DELETE_QUESTION_FAIL,
    DELETE_QUESTION_RESET,
    
    CREATE_QUESTION_REQUEST,
    CREATE_QUESTION_SUCCESS,
    CREATE_QUESTION_FAIL,
    CREATE_QUESTION_RESET,
    
    DELETE_VARIANT_REQUEST,
    DELETE_VARIANT_SUCCESS,
    DELETE_VARIANT_FAIL,
        
    CREATE_QUESTION_MULTI_REQUEST,
    CREATE_QUESTION_MULTI_SUCCESS,
    CREATE_QUESTION_MULTI_FAIL,
    CREATE_QUESTION_MULTI_RESET,
        
    GET_USERS_LIST_REQUEST,
    GET_USERS_LIST_SUCCESS,
    GET_USERS_LIST_FAIL,
    GET_USERS_LIST_RESET,
            
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    CREATE_USER_RESET,
            
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
            
    UPDATE_ADMIN_REQUEST,
    UPDATE_ADMIN_SUCCESS,
    UPDATE_ADMIN_FAIL,
    UPDATE_ADMIN_RESET,
            
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    GET_PROFILE_RESET,
            
    CREATE_PROFILE_REQUEST,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_FAIL,
    CREATE_PROFILE_RESET,
            
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
            
    GET_LIST_PROFILES_REQUEST,
    GET_LIST_PROFILES_SUCCESS,
    GET_LIST_PROFILES_FAIL,
    GET_LIST_PROFILES_RESET,
            
    UPDATE_STORE_POS_REQUEST,
    UPDATE_STORE_POS_SUCCESS,
    UPDATE_STORE_POS_FAIL,
    UPDATE_STORE_POS_RESET,
} from '../Constants/AdminConstants';


export const storesInfoReducer = (state={}, action) => {
    switch(action.type) {
        case GET_STORES_INFO_REQUEST:
            return {
                loading: true
            }
        case GET_STORES_INFO_SUCCESS:
            return {
                loading: false,
                storesList: action.payload
            }
        case GET_STORES_INFO_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case GET_STORES_INFO_RESET:
            return {}
        default:
            return state
    }
}

export const updateStoreNameReducer = (state={}, action) => {
    switch(action.type) {
        case UPDATE_STORE_NAME_REQUEST:
            return {
                loading: true,
                success: false
            }
        case UPDATE_STORE_NAME_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload
            }
        case UPDATE_STORE_NAME_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_STORE_NAME_RESET:
            return {}
        default:
            return state
    }
}

export const deleteStoreReducer = (state={}, action) => {
    switch(action.type) {
        case DELETE_STORE_REQUEST:
            return {
                loading: true,
                success: false
            }
        case DELETE_STORE_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload
            }
        case DELETE_STORE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const userResultsReducer = (state={}, action) => {
    switch(action.type) {
        case GET_LIST_USER_RESULTS_REQUEST:
            return {
                loading: true
            }
        case GET_LIST_USER_RESULTS_SUCCESS:
            return {
                loading: false,
                listResults: action.payload
            }
        case GET_LIST_USER_RESULTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case GET_LIST_USER_RESULTS_RESET:
            return {}
        default:
            return state
    }
}

export const createStoreReducer = (state={}, action) => {
    switch(action.type) {
        case CREATE_STORE_REQUEST:
            return {
                loading: true
            }
        case CREATE_STORE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case CREATE_STORE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}


export const updatePositionNameReducer = (state={}, action) => {
    switch(action.type) {
        case UPDATE_POSITION_NAME_REQUEST:
            return {
                loading: true,
                success: false
            }
        case UPDATE_POSITION_NAME_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload
            }
        case UPDATE_POSITION_NAME_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_POSITION_NAME_RESET:
            return {}
        default:
            return state
    }
}

export const deletePositionReducer = (state={}, action) => {
    switch(action.type) {
        case DELETE_POSITION_REQUEST:
            return {
                loading: true,
                success: false
            }
        case DELETE_POSITION_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload
            }
        case DELETE_POSITION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_POSITION_RESET:
            return {}
        default:
            return state
    }
}

export const createPositionReducer = (state={}, action) => {
    switch(action.type) {
        case CREATE_POSITION_REQUEST:
            return {
                loading: true
            }
        case CREATE_POSITION_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case CREATE_POSITION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const getPositionsReducer = (state={}, action) => {
    switch(action.type) {
        case GET_POSITION_REQUEST:
            return {
                loading: true
            }
        case GET_POSITION_SUCCESS:
            return {
                loading: false,
                positionInfo: action.payload
            }
        case GET_POSITION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const getTestsReducer = (state={}, action) => {
    switch(action.type) {
        case GET_TEST_REQUEST:
            return {
                loading: true
            }
        case GET_TEST_SUCCESS:
            return {
                loading: false,
                testInfo: action.payload
            }
        case GET_TEST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const updateTestReducer = (state={}, action) => {
    switch(action.type) {
        case UPDATE_TEST_REQUEST:
            return {
                loading: true,
                success: false
            }
        case UPDATE_TEST_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload
            }
        case UPDATE_TEST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_TEST_RESET:
            return {}
        default:
            return state
    }
}

export const deleteTestReducer = (state={}, action) => {
    switch(action.type) {
        case DELETE_TEST_REQUEST:
            return {
                loading: true,
                success: false
            }
        case DELETE_TEST_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload
            }
        case DELETE_TEST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_TEST_RESET:
            return {}
        default:
            return state
    }
}

export const createTestReducer = (state={}, action) => {
    switch(action.type) {
        case CREATE_TEST_REQUEST:
            return {
                loading: true
            }
        case CREATE_TEST_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case CREATE_TEST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_TEST_RESET:
            return {}
        default:
            return state
    }
}


export const getQuestionsReducer = (state={}, action) => {
    switch(action.type) {
        case GET_QUESTIONS_REQUEST:
            return {
                loading: true
            }
        case GET_QUESTIONS_SUCCESS:
            return {
                loading: false,
                questionList: action.payload
            }
        case GET_QUESTIONS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case GET_QUESTIONS_RESET:
            return {}
        default:
            return state
    }
}


export const updateQuestionReducer = (state={}, action) => {
    switch(action.type) {
        case UPDATE_QUESTION_REQUEST:
            return {
                loading: true,
                success: false
            }
        case UPDATE_QUESTION_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload
            }
        case UPDATE_QUESTION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_QUESTION_RESET:
            return {}
        default:
            return state
    }
}

export const deleteQuestionReducer = (state={}, action) => {
    switch(action.type) {
        case DELETE_QUESTION_REQUEST:
            return {
                loading: true,
                success: false
            }
        case DELETE_QUESTION_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload
            }
        case DELETE_QUESTION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_QUESTION_RESET:
            return {}
        default:
            return state
    }
}

export const createQuestionReducer = (state={}, action) => {
    switch(action.type) {
        case CREATE_QUESTION_REQUEST:
            return {
                loading: true
            }
        case CREATE_QUESTION_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case CREATE_QUESTION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_QUESTION_RESET:
            return {}
        default:
            return state
    }
}

export const deleteVariantReducer = (state={}, action) => {
    switch(action.type) {
        case DELETE_VARIANT_REQUEST:
            return {
                loading: true,
                success: false
            }
        case DELETE_VARIANT_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload
            }
        case DELETE_VARIANT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const createQuestionsReducer = (state={}, action) => {
    switch(action.type) {
        case CREATE_QUESTION_MULTI_REQUEST:
            return {
                loading: true
            }
        case CREATE_QUESTION_MULTI_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case CREATE_QUESTION_MULTI_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_QUESTION_MULTI_RESET:
            return {}
        default:
            return state
    }
}

export const usersListReducer = (state={}, action) => {
    switch(action.type) {
        case GET_USERS_LIST_REQUEST:
            return {
                loading: true
            }
        case GET_USERS_LIST_SUCCESS:
            return {
                loading: false,
                usersList: action.payload
            }
        case GET_USERS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case GET_USERS_LIST_RESET:
            return {}
        default:
            return state
    }
}

export const createUserReducer = (state={}, action) => {
    switch(action.type) {
        case CREATE_USER_REQUEST:
            return {
                loading: true
            }
        case CREATE_USER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case CREATE_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_USER_RESET:
            return {}
        default:
            return state
    }
}

export const deleteUserReducer = (state={}, action) => {
    switch(action.type) {
        case DELETE_USER_REQUEST:
            return {
                loading: true
            }
        case DELETE_USER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case DELETE_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_USER_RESET:
            return {}
        default:
            return state
    }
}

export const updateAdminReducer = (state={}, action) => {
    switch(action.type) {
        case UPDATE_ADMIN_REQUEST:
            return {
                loading: true
            }
        case UPDATE_ADMIN_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case UPDATE_ADMIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_ADMIN_RESET:
            return {}
        default:
            return state
    }
}

export const takeProfileReducer = (state={}, action) => {
    switch(action.type) {
        case GET_PROFILE_REQUEST:
            return {
                loading: true
            }
        case GET_PROFILE_SUCCESS:
            return {
                loading: false,
                profileId: action.payload,
                success: true
            }
        case GET_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case GET_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

export const createUserProfileReducer = (state={}, action) => {
    switch(action.type) {
        case CREATE_PROFILE_REQUEST:
            return {
                loading: true
            }
        case CREATE_PROFILE_SUCCESS:
            return {
                loading: false,
                message: action.payload,
                success: true
            }
        case CREATE_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

export const updateUserProfileReducer = (state={}, action) => {
    switch(action.type) {
        case UPDATE_PROFILE_REQUEST:
            return {
                loading: true
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                message: action.payload,
                success: true
            }
        case UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

export const getListProfilesReducer = (state={}, action) => {
    switch(action.type) {
        case GET_LIST_PROFILES_REQUEST:
            return {
                loading: true
            }
        case GET_LIST_PROFILES_SUCCESS:
            return {
                loading: false,
                listProfiles: action.payload,
                success: true
            }
        case GET_LIST_PROFILES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case GET_LIST_PROFILES_RESET:
            return {}
        default:
            return state
    }
}



export const updateStorePosReducer = (state={}, action) => {
    switch(action.type) {
        case UPDATE_STORE_POS_REQUEST:
            return {
                loading: true
            }
        case UPDATE_STORE_POS_SUCCESS:
            return {
                loading: false,
                message: action.payload,
                success: true
            }
        case UPDATE_STORE_POS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_STORE_POS_RESET:
            return {}
        default:
            return state
    }
}


