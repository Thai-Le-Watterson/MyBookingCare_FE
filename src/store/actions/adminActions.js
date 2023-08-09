import actionTypes from "./actionTypes";
import {
    handleGetAllCode,
    createUser,
    handleGetUsers,
    deleteUser,
    updateUser,
    getTopDoctors,
    getAllDoctors,
    createMarkdown,
    updateMarkdown,
    bulkCreateSchedule,
    getAllSpecialties,
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

export const fetchTimeStart = () => {
    return async (dispatch, getState) => {
        try {
            const data = await handleGetAllCode("time");

            dispatch(fetchTimeSuccess(data));
        } catch (e) {
            dispatch(fetchTimeFail());
        }
    };
};
export const fetchTimeSuccess = (times) => ({
    type: actionTypes.FETCH_TIME_SUCCESS,
    data: times,
});
export const fetchTimeFail = () => ({
    type: actionTypes.FETCH_TIME_FAIL,
});

export const fetchRequireDoctorInforStart = () => {
    return async (dispatch, getState) => {
        try {
            const data_price = await handleGetAllCode("price");
            const data_payment = await handleGetAllCode("payment");
            const data_province = await handleGetAllCode("province");
            const data_specialties = await getAllSpecialties();

            const data = {
                data_price,
                data_payment,
                data_province,
                data_specialties,
            };
            dispatch(fetchRequireDoctorInforSuccess(data));
        } catch (e) {
            dispatch(fetchRequireDoctorInforFail());
        }
    };
};
export const fetchRequireDoctorInforSuccess = (requireDoctorInfor) => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS,
    data: requireDoctorInfor,
});
export const fetchRequireDoctorInforFail = () => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_FAIL,
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

export const fetchTopDoctorStart = (limit) => {
    return async (dispatch, getState) => {
        try {
            const topDoctors = await getTopDoctors(limit);
            // console.log("check topDoctors: ", topDoctors);
            dispatch(fetchTopDoctorSuccess(topDoctors));
        } catch (e) {
            dispatch(fetchTopDoctorFail());
        }
    };
};
export const fetchTopDoctorSuccess = (topDoctors) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    topDoctors: topDoctors,
});
export const fetchTopDoctorFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
});

export const fetchAllDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            const allDoctors = await getAllDoctors();
            // console.log("check topDoctors: ", topDoctors);
            dispatch(fetchAllDoctorSuccess(allDoctors));
        } catch (e) {
            dispatch(fetchAllDoctorFail());
        }
    };
};
export const fetchAllDoctorSuccess = (allDoctors) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    allDoctors: allDoctors,
});
export const fetchAllDoctorFail = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
});

export const createMarkdownStart = (data) => {
    return async (dispatch, getState) => {
        console.log("Create markdown");
        const res = await createMarkdown(data);
        if (res && res && res.errCode === 0) {
            dispatch(createMarkdownSucceed(res));
            toast.success("Create markdown successfully");
        } else {
            dispatch(createMarkdownFail());
            toast.error("Create markdown fail");
        }
    };
};
export const createMarkdownSucceed = (res) => ({
    type: actionTypes.CREATE_MARKDOWN_SUCCCEED,
    res,
});
export const createMarkdownFail = () => ({
    type: actionTypes.CREATE_MARKDOWN_FAILED,
});

export const updateMarkdownStart = (data) => {
    return async (dispatch, getState) => {
        const res = await updateMarkdown(data);
        if (res && res && res.errCode === 0) {
            dispatch(updateMarkdownSucceed(res));
            toast.success("Update markdown successfully");
        } else {
            dispatch(updateMarkdownFail());
            toast.error("Update markdown fail");
        }
    };
};
export const updateMarkdownSucceed = (res) => ({
    type: actionTypes.UPDATE_MARKDOWN_SUCCCEED,
    res,
});
export const updateMarkdownFail = () => ({
    type: actionTypes.UPDATE_MARKDOWN_FAILED,
});

export const bulkCreateScheduleStart = (data) => {
    return async (dispatch, getState) => {
        const res = await bulkCreateSchedule(data);
        if (res && res.data && res.data.errCode === 0) {
            dispatch(bulkCreateScheduleSucceed(res));
            toast.success("Create schedule successfully");
        } else {
            dispatch(bulkCreateScheduleFail());
            toast.error("Create schedule fail");
        }
    };
};
export const bulkCreateScheduleSucceed = (res) => ({
    type: actionTypes.BULK_CREATE_SCHEDULE_SUCCESS,
    res,
});
export const bulkCreateScheduleFail = () => ({
    type: actionTypes.BULK_CREATE_SCHEDULE_FAILED,
});
