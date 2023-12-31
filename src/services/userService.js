import axios from "../axios";
import _ from "lodash";

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

const getAllDoctors = async () => {
    try {
        const data = await axios.get(`/api/all-doctors`);
        // console.log("check data: ", data);
        if (data && data.data && data.data.errCode === 0) {
            if (data.data.doctors) return data.data.doctors;
        }
    } catch (e) {
        console.log(e);
    }
};

const getDoctorInforBySpecialty = async (id, provinceId) => {
    try {
        const data = await axios.get(
            `/api/doctors-by-specialty?id=${id || ""}&provinceId=${
                provinceId || ""
            }`
        );
        // console.log("check data: ", data);
        if (data && data.errCode === 0) {
            if (data.doctorsInfor) return data.doctorsInfor;
        }
    } catch (e) {
        console.log(e);
    }
};

const getDoctorInforByClinic = async (clinicId) => {
    try {
        const data = await axios.get(
            `/api/doctors-by-clinic?id=${clinicId || ""}`
        );
        // console.log("check data: ", data);
        if (data && data.errCode === 0) {
            if (data.doctorsInfor) return data.doctorsInfor;
        }
    } catch (e) {
        console.log(e);
    }
};

const getDoctorDetail = async (id) => {
    try {
        const data = await axios.get(`/api/detail-doctor?id=${id || ""}`);
        // console.log("check data: ", data);
        if (data && data.data && data.data.errCode === 0) {
            if (data.data.doctor) return data.data.doctor;
        }
    } catch (e) {
        console.log(e);
    }
};

const createMarkdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post(`api/create-markdown`, data);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

const updateMarkdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.put(`api/update-markdown`, data);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

const getSchedule = async (doctorId, date) => {
    try {
        const data = await axios.get(
            `/api/get-schedule?doctorId=${doctorId || ""}&date=${date || ""}`
        );
        // console.log("check data: ", data);
        if (data.data && data.data.errCode === 0) {
            if (data.data.schedule) return data.data.schedule;
        }
    } catch (e) {
        console.log(e);
    }
};

const bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post(`api/bulk-create-schedule`, data);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

const createDoctorInfor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post(`api/create-doctor-infor`, data);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

const updateDoctorInfor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.put(`api/update-doctor-infor`, data);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

const createBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post("/api/create-booking", data);
            resolve(res);
        } catch (e) {
            reject(e);
        }
    });
};

const createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post(`api/create-specialty`, data);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

const getSpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(`api/get-specialty?id=${id}`);
            if (result && result.errCode === 0) resolve(result.specialties);
        } catch (e) {
            reject(e);
        }
    });
};

const getAllSpecialties = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(`api/get-all-specialties`);
            // console.log(result);
            if (result && result.errCode === 0) resolve(result.specialties);
        } catch (e) {
            reject(e);
        }
    });
};

const getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(`api/get-all-clinic`);
            if (result && result.errCode === 0)
                if (result.clinics) resolve(result.clinics);
        } catch (e) {
            reject(e);
        }
    });
};

const getClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(`api/get-clinic?id=${id}`);
            if (result && result.errCode === 0)
                if (result.clinic) resolve(result.clinic);
        } catch (e) {
            reject(e);
        }
    });
};

const createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post(`api/create-clinic`, data);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

const getAllBookingByDoctor = async (doctorId, date) => {
    try {
        const data = await axios.get(
            `/api/get-all-booking-doctor?doctorId=${doctorId || ""}&date=${
                date || ""
            }`
        );
        // console.log("check data: ", data);
        if (data.data && data.data.errCode === 0) {
            if (data.data.bookings) return data.data.bookings;
        }
    } catch (e) {
        console.log(e);
    }
};

const confirmBooking = async (dataRequest) => {
    try {
        const data = await axios.put(
            `/api/confirm-booking-doctor`,
            dataRequest
        );
        console.log("check data: ", data);
        if (data && !_.isEmpty(data)) {
            if (data) return data;
        }
    } catch (e) {
        console.log(e);
    }
};

const getAllCategoryHandbook = (limit, haveImg) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(
                `api/get-all-handbook-category?limit=${limit}&haveImg=${haveImg}`
            );
            if (result && result.errCode === 0)
                if (result.categories) resolve(result.categories);
        } catch (e) {
            reject(e);
        }
    });
};

const getHandbookCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(
                `api/get-handbook-category?categoryId=${categoryId}`
            );
            if (result && result.errCode === 0)
                if (result.category) resolve(result.category);
        } catch (e) {
            reject(e);
        }
    });
};

const createCategoryHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post(
                `api/create-handbook-category`,
                data
            );
            if (result && !_.isEmpty(result)) resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

const updateCategoryHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post(
                `api/update-handbook-category`,
                data
            );
            if (result && !_.isEmpty(result)) resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

const deleteCategoryHandbook = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.delete(`api/delete-handbook-category`, {
                data: { id },
            });
            if (result && !_.isEmpty(result)) resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

const getAllHandbook = (limit, orderBy) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(
                `api/get-all-handbook?limit=${limit}${
                    (orderBy && `&orderBy=${orderBy}`) || ""
                }`
            );
            if (result && result.errCode === 0)
                if (result.handbooks) resolve(result.handbooks);
        } catch (e) {
            reject(e);
        }
    });
};

const getAllHandbookByCategory = (categoryId, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(
                `api/get-all-handbook-by-category?categoryId=${categoryId}&limit=${limit}`
            );
            if (result && result.errCode === 0)
                if (result.handbooks) resolve(result.handbooks);
        } catch (e) {
            reject(e);
        }
    });
};

const getAllHandbookByCategoryPG = (categoryId, page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(
                `api/get-all-handbook-by-category-pagination?categoryId=${categoryId}&page=${page}&limit=${limit}`
            );
            if (result && result.errCode === 0) {
                if (result.handbooks)
                    resolve({
                        handbooks: result.handbooks,
                        count: result.count,
                    });
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

const getHandbook = (id, isIncreaseViews) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(
                `api/get-handbook?id=${id}&isIncreaseViews=${isIncreaseViews}`
            );
            if (result && result.errCode === 0)
                if (result.handbook) resolve(result.handbook);
        } catch (e) {
            reject(e);
        }
    });
};

const createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post(`api/create-handbook`, data);
            if (result && !_.isEmpty(result)) resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

export {
    handleUserLogin,
    handleGetUsers,
    handleGetAllCode,
    createUser,
    deleteUser,
    updateUser,
    getTopDoctors,
    getAllDoctors,
    createMarkdown,
    getDoctorDetail,
    updateMarkdown,
    bulkCreateSchedule,
    getSchedule,
    createDoctorInfor,
    updateDoctorInfor,
    createBooking,
    createSpecialty,
    getAllSpecialties,
    getSpecialty,
    getDoctorInforBySpecialty,
    getDoctorInforByClinic,
    createClinic,
    getAllClinic,
    getClinic,
    getAllBookingByDoctor,
    confirmBooking,
    getAllCategoryHandbook,
    getHandbookCategory,
    createCategoryHandbook,
    deleteCategoryHandbook,
    updateCategoryHandbook,
    getAllHandbook,
    getAllHandbookByCategory,
    getAllHandbookByCategoryPG,
    getHandbook,
    createHandbook,
};
