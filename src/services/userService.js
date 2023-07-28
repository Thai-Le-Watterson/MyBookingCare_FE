// import { symbolName } from "typescript";
import axios from "../axios";

const handleUserLogin = async (email, password) => {
    try {
        const response = await axios.post("/api/login", { email, password });
        return response.userData;
    } catch (e) {
        console.log(e.response);
    }
};

const handleGetUsers = async (id) => {
    try {
        const data = await axios.get(`/api/get-users?id=${id}`);

        if (data && data.users) {
            if (data.users.errCode === 0) {
                return data.users.users;
            }
        }
    } catch (e) {
        console.log(e);
    }
};

const handleGetAllCode = async (type) => {
    const data = await axios.get(`/api/get-allcode?type=${type}`);

    if (data && data.data && data.data.errCode === 0) {
        return data.data.data;
    }
};

const createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post(`api/create-user`, data);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

const updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.put(`api/update-user`, data);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.delete(`api/delete-user`, {
                data: { id },
            });
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

const getTopDoctors = async (limit) => {
    try {
        const data = await axios.get(`/api/top-doctors?limit=${limit || ""}`);
        // console.log("check data: ", data);
        if (data && data.data && data.data.errCode === 0) {
            if (data.data.topDoctors) return data.data.topDoctors;
        }
    } catch (e) {
        console.log(e);
    }
};

export {
    handleUserLogin,
    handleGetUsers,
    handleGetAllCode,
    createUser,
    deleteUser,
    updateUser,
    getTopDoctors,
};
