import actionTypes from "../actions/actionTypes";

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.data,
            };
        case actionTypes.FETCH_GENDER_FAIL:
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data,
            };
        case actionTypes.FETCH_ROLE_FAIL:
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data,
            };
        case actionTypes.FETCH_POSITION_FAIL:
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            return {
                ...state,
                topDoctors: action.topDoctors,
            };
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            return {
                ...state,
            };
        case actionTypes.CREATE_USER_SUCCCEED:
            return {
                ...state,
            };
        case actionTypes.CREATE_USER_FAILED:
            return {
                ...state,
            };
        case actionTypes.UPDATE_USER_SUCCCEED:
            return {
                ...state,
            };
        case actionTypes.UPDATE_USER_FAILED:
            return {
                ...state,
            };
        case actionTypes.DELETE_USER_SUCCCEED:
            console.log(action.res);
            return {
                ...state,
            };
        case actionTypes.DELETE_USER_FAILED:
            return {
                ...state,
            };
        case actionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
            };
        case actionTypes.FETCH_USERS_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
