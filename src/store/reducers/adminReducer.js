import actionTypes from "../actions/actionTypes";

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    times: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    requireDoctorInfor: {},
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
                genders: [],
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data,
            };
        case actionTypes.FETCH_ROLE_FAIL:
            return {
                ...state,
                roles: [],
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data,
            };
        case actionTypes.FETCH_POSITION_FAIL:
            return {
                ...state,
                positions: [],
            };
        case actionTypes.FETCH_TIME_SUCCESS:
            return {
                ...state,
                times: action.data,
            };
        case actionTypes.FETCH_TIME_FAIL:
            return {
                ...state,
                times: [],
            };
        case actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS:
            return {
                ...state,
                requireDoctorInfor: action.data,
            };
        case actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_FAIL:
            return {
                ...state,
                requireDoctorInfor: {},
            };
        case actionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
            };
        case actionTypes.FETCH_USERS_FAIL:
            return {
                ...state,
                users: [],
            };
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            return {
                ...state,
                topDoctors: action.topDoctors,
            };
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            return {
                ...state,
                topDoctors: [],
            };
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            return {
                ...state,
                allDoctors: action.allDoctors,
            };
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            return {
                ...state,
                allDoctors: [],
            };
        case actionTypes.CREATE_USER_SUCCCEED:
            return {
                ...state,
            };
        case actionTypes.CREATE_USER_FAILED:
            return {
                ...state,
            };
        case actionTypes.CREATE_MARKDOWN_SUCCCEED:
            return {
                ...state,
            };
        case actionTypes.CREATE_MARKDOWN_FAILED:
            return {
                ...state,
            };
        case actionTypes.UPDATE_MARKDOWN_SUCCCEED:
            return {
                ...state,
            };
        case actionTypes.UPDATE_MARKDOWN_FAILED:
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
        case actionTypes.BULK_CREATE_SCHEDULE_SUCCESS:
            return {
                ...state,
            };
        case actionTypes.BULK_CREATE_SCHEDULE_FAILED:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
