import actionTypes from "./actionTypes";
import {
    handleGetAllCode,
    createUser,
    handleGetUsers,
    deleteUser,
    updateUser,
} from "../../services/userService";
import { toast } from "react-toastify";
// import axios from "axios";

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            const data = await handleGetAllCode("gender");

            dispatch(fetchGenderSuccess(data));
        } catch (e) {
            dispatch(fetchGenderFail());
        }
    };
};
export const fetchGenderSuccess = (genders) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genders,
});
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL,
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            const data = await handleGetAllCode("role");

            dispatch(fetchRoleSuccess(data));
        } catch (e) {
            dispatch(fetchRoleSuccess());
        }
    };
};
export const fetchRoleSuccess = (roles) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roles,
});
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL,
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            const data = await handleGetAllCode("position");

            dispatch(fetchPositionSuccess(data));
        } catch (e) {
            dispatch(fetchPositionFail());
        }
    };
};
export const fetchPositionSuccess = (position) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: position,
});
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL,
});

export const createUserStart = (data) => {
    return async (dispatch, getState) => {
        const res = await createUser(data);
        if (res && res.data && res.data.errCode === 0) {
            dispatch(createUserSucceed(res));
            toast.success("Create user successfully");
        } else {
            dispatch(createUserFail());
            toast.error("Create user fail");
        }
    };
};
export const createUserSucceed = (res) => ({
    type: actionTypes.CREATE_USER_SUCCCEED,
    res,
});
export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

export const updateUserStart = (data) => {
    return async (dispatch, getState) => {
        const res = await updateUser(data);

        if (res && res.data && res.data.errCode === 0) {
            dispatch(updateUserSucceed(res));
            toast.success("Update user successfully");
        } else {
            dispatch(updateUserFail());
            toast.error("Update user fail");
        }
    };
};
export const updateUserSucceed = (res) => ({
    type: actionTypes.UPDATE_USER_SUCCCEED,
    res,
});
export const updateUserFail = () => ({
    type: actionTypes.UPDATE_USER_FAILED,
});

export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        const res = await deleteUser(id);
        if (res) {
            dispatch(deleteUserSucceed(res));
            toast.success("Delete user success", { theme: "light" });
        } else {
            dispatch(deleteUserFail());
            toast.error("Delete user fail");
        }
    };
};
export const deleteUserSucceed = (res) => ({
    type: actionTypes.CREATE_USER_SUCCCEED,
    res,
});
export const deleteUserFail = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

export const fetchUsersStart = (id) => {
    return async (dispatch, getState) => {
        try {
            const users = await handleGetUsers(id);

            dispatch(fetchUsersSuccess(users));
        } catch (e) {
            dispatch(fetchUsersFail());
        }
    };
};
export const fetchUsersSuccess = (users) => ({
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: users,
});
export const fetchUsersFail = () => ({
    type: actionTypes.FETCH_USERS_FAIL,
});

export const fetchTopDoctorStart = (id) => {
    return async (dispatch, getState) => {
        try {
            const users = await handleGetUsers(id);

            dispatch(fetchTopDoctorSuccess(users));
        } catch (e) {
            dispatch(fetchTopDoctorFail());
        }
    };
};
export const fetchTopDoctorSuccess = (users) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    users: users,
});
export const fetchTopDoctorFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
});
