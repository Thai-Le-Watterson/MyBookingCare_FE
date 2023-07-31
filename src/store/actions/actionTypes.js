const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
    SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
    CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

    //user
    ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
    USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
    USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
    PROCESS_LOGOUT: "PROCESS_LOGOUT",

    //admin
    FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
    FETCH_GENDER_FAIL: "FETCH_GENDER_FAIL",

    FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
    FETCH_ROLE_FAIL: "FETCH_ROLE_FAIL",

    FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
    FETCH_POSITION_FAIL: "FETCH_POSITION_FAIL",

    FETCH_TIME_SUCCESS: "FETCH_TIME_SUCCESS",
    FETCH_TIME_FAIL: "FETCH_TIME_FAIL",

    FETCH_USERS_SUCCESS: "FETCH_USErS_SUCCESS",
    FETCH_USERS_FAIL: "FETCH_USErS_FAIL",

    CREATE_USER_SUCCCEED: "CREATE_USER_SUCCCEED",
    CREATE_USER_FAILED: "CREATE_USER_FAILED",

    UPDATE_USER_SUCCCEED: "UPDATE_USER_SUCCCEED",
    UPDATE_USER_FAILED: "UPDATE_USER_FAILED",

    DELETE_USER_SUCCCEED: "DELETE_USER_SUCCCEED",
    DELETE_USER_FAILED: "DELETE_USER_FAILED",

    FETCH_TOP_DOCTOR_SUCCESS: "FETCH_TOP_DOCTOR_SUCCESS",
    FETCH_TOP_DOCTOR_FAIL: "FETCH_TOP_DOCTOR_FAIL",

    FETCH_ALL_DOCTOR_SUCCESS: "FETCH_ALL_DOCTOR_SUCCESS",
    FETCH_ALL_DOCTOR_FAIL: "FETCH_ALL_DOCTOR_FAIL",

    CREATE_MARKDOWN_SUCCCEED: "CREATE_MARKDOWN_SUCCCEED",
    CREATE_MARKDOWN_FAILED: "CREATE_MARKDOWN_FAILED",

    UPDATE_MARKDOWN_SUCCCEED: "UPDATE_MARKDOWN_SUCCCEED",
    UPDATE_MARKDOWN_FAILED: "UPDATE_MARKDOWN_FAILED",

    BULK_CREATE_SCHEDULE_SUCCESS: "BULK_CREATE_SCHEDULE_SUCCESS",
    BULK_CREATE_SCHEDULE_FAILED: "BULK_CREATE_SCHEDULE_FAILED",
});

export default actionTypes;
