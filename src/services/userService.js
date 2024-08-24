import axios from "../axios"

const handleLoginAPI = (userEmail, userPassword) => {
    return axios.post("/api/login", {email: userEmail, password: userPassword});
}

const getAllUser = (inputId) => {
    console.log("check data input createuser API: ", inputId);
    return axios.get(`/api/get-all-user?id=${inputId}`);
}

const CreateNewUserServiceAPI = (data) => {
    // console.log("check data input createuser API: ", data);
    return axios.post("/api/create-new-user", data);
}

const DeleteUserServiceAPI = (userId) => {
    return axios.delete("/api/delete-user", 
    {
        data: {
            id: userId
        }
    });
}

const EditUserServiceAPI = (dataEdit) => {
    return axios.put("/api/edit-user", dataEdit);
}

const getAllCodeService = (inputtype) => {
    return axios.get(`/api/all-code?type=${inputtype}`);
}

const getTopDoctorHomeServiceAPI = (limit) => {
    // return axios.get(`/api/top-doctor-home?limit=${limit}`);
    return axios.get(`/api/top-doctor-home`);
}
const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctors`);
}

const saveInfoDoctorServie = (data) => {
    return axios.post(`/api/save-infor-doctor`, data);
}

export {
    handleLoginAPI,
    getAllUser,
    CreateNewUserServiceAPI,
    DeleteUserServiceAPI,
    EditUserServiceAPI,
    getAllCodeService,
    getTopDoctorHomeServiceAPI,
    getAllDoctorService,
    saveInfoDoctorServie
}
