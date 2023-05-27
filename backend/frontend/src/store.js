import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { testListReducer, testTakeReducer, resultPostReducer, resultsGetReducer, resultDetailsReducer } from './Reducers/TestReducers';
import { userLoginReducer, userProfileReducer, listStoresReducer, createProfileReducer, updateProfileReducer } from './Reducers/UserReducers';
import { storesInfoReducer, updateStoreNameReducer, userResultsReducer, createStoreReducer, updatePositionNameReducer, deletePositionReducer, createPositionReducer, getPositionsReducer, getTestsReducer, updateTestReducer, deleteTestReducer, createTestReducer, getQuestionsReducer, updateQuestionReducer, deleteQuestionReducer, createQuestionReducer, createQuestionsReducer, usersListReducer, createUserReducer, deleteUserReducer, updateAdminReducer, takeProfileReducer, createUserProfileReducer, updateUserProfileReducer, getListProfilesReducer, updateStorePosReducer } from './Reducers/AdminReducers';

const reducer = combineReducers({
    testList: testListReducer,
    userLogin: userLoginReducer,
    userProfile: userProfileReducer,
    listStores: listStoresReducer,
    createProfile: createProfileReducer,
    updateProfile: updateProfileReducer,
    testTake: testTakeReducer,
    resultPost: resultPostReducer,
    resultsGet: resultsGetReducer,
    resultDetails: resultDetailsReducer,

    storesInfo: storesInfoReducer,
    updateStoreName: updateStoreNameReducer,
    userResults: userResultsReducer,
    createStore: createStoreReducer,
    updatePositionName: updatePositionNameReducer,
    deletePosition: deletePositionReducer,
    createPositionReducer: createPositionReducer,
    getPositions: getPositionsReducer,
    getTests: getTestsReducer,
    updateTest: updateTestReducer,
    deleteTest: deleteTestReducer,
    createTest: createTestReducer,
    getQuestions: getQuestionsReducer,
    updateQuestion: updateQuestionReducer,
    deleteQuestion: deleteQuestionReducer,
    createQuestion: createQuestionReducer,
    createQuestions: createQuestionsReducer,
    usersList: usersListReducer,
    createUser: createUserReducer,
    deleteUser: deleteUserReducer,
    updateAdmin: updateAdminReducer,
    takeProfile: takeProfileReducer,
    createUserProfile: createUserProfileReducer,
    updateUserProfile: updateUserProfileReducer,
    getListProfiles: getListProfilesReducer,
    updateStorePos: updateStorePosReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const profileInfoFromStorage = localStorage.getItem("profileInfo") ? JSON.parse(localStorage.getItem("profileInfo")) : {profileInfo: {profileExist:false}};

const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage,
        userProfile: profileInfoFromStorage
    }    
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;