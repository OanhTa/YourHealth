import axios from "../axios"

const handleLoginAPI = (userEmail, userPassword) => {
    return axios.post("/api/login", {email: userEmail, password: userPassword});
}

const getAllUser = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`);
}

const CreateNewUserServiceAPI = (data) => {
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
const getInfoDetailDoctorServie = (id) => {
    return axios.get(`/api/get-infor-doctor?id=${id}`);
}
const getExtraInfoDoctorServie = (id) => {
    return axios.get(`/api/get-extra-infor-doctorById?id=${id}`);
}
const saveBulkScheduleServie = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}
const getScheduleByDateServie = (doctorId, date) => {
    return axios.get(`/api/get-all-schedule?doctorId=${doctorId}&date=${date}`);
}
const getAllPatientBookingByDoctor = (doctorId, date) => {
    return axios.get(`/api/get-list-patient-ByDoctor?doctorId=${doctorId}&date=${date}`);
}
const getProfileDoctorServie = (id) => {
    return axios.get(`/api/get-profile-doctorById?id=${id}`);
}
const postPatientBookingAppoinment = (data) => {
    return axios.post("/api/patient-book-appointment", data);
}
const postVerifyBookingAppoinment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
}
const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
}
const getAllSpecialtyServie = () => {
    return axios.get(`/api/get-all-specialty`);
}
const getSpecialtyByIdServie = (data) => {
    return axios.get(`/api/get-specialty-id?id=${data.id}&province=${data.province}`);
}
const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
}
const getAllClinicServie = () => {
    return axios.get(`/api/get-all-clinic`);
}
const getClinicByIdServie = (id) => {
    return axios.get(`/api/get-clinic-id?id=${id}`);
}
const sendConfirmBill = (data) => {
    return axios.post(`/api/sendBill`, data);
}
export {
    handleLoginAPI,
    getAllUser, CreateNewUserServiceAPI, DeleteUserServiceAPI, EditUserServiceAPI,
    getAllCodeService,
    getTopDoctorHomeServiceAPI, getAllDoctorService,
    saveInfoDoctorServie, getInfoDetailDoctorServie,
    saveBulkScheduleServie, getScheduleByDateServie,
    getExtraInfoDoctorServie,
    getProfileDoctorServie,
    postPatientBookingAppoinment, sendConfirmBill,
    getAllPatientBookingByDoctor,
    postVerifyBookingAppoinment,
    createNewSpecialty, getAllSpecialtyServie, getSpecialtyByIdServie,
    createNewClinic, getAllClinicServie, getClinicByIdServie
}
