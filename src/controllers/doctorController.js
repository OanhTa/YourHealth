import { raw } from 'body-parser';
import doctorservice from '../services/doctorservice';

let getTopDoctorHome = async(req, res)=>{
    let limit = req.query.limit
    if(!limit) limit = 10
    try {
        let doctors = await doctorservice.getTopDoctorHome(limit)
        res.status(200).json(doctors)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server"
        })
    }
}

let getAllDoctor = async(req, res)=>{
    try {
        let doctors = await doctorservice.getAllDoctor()
        res.status(200).json(doctors)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server"
        })
    }
}
let saveInfoDoctor = async(req, res)=>{
    try {
        let doctor = await doctorservice.saveInfoDoctorService(req.body)
        res.status(200).json(doctor)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server"
        })
    }
}
let getInfoDoctor = async(req, res)=>{
    try {
        let doctor = await doctorservice.getInfoDoctorService(req.query.id)
        res.status(200).json(doctor)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server" + error
        })
    }
}
let bulkCreateSchedule = async(req, res)=>{
    try {
        let schedule = await doctorservice.bulkCreateScheduleService(req.body)
        res.status(200).json(schedule)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server"
        })
    }
}
let getAllSchedule = async(req, res)=>{
    try {
        let schedule = await doctorservice.getAllScheduleService(req.query.doctorId, req.query.date)
        res.status(200).json(schedule)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server"
        })
    }
}
let getExtraInfoDoctorById = async(req, res)=>{
    try {
        let doctor = await doctorservice.getExtraInfoDoctorByIdService(req.query.id)
        res.status(200).json(doctor)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server"
        })
    }
}

let getListPatientByDoctor = async(req, res)=>{
    try {
        const doctorId = Number(req.query.doctorId);
        const date = req.query.date;

        if (!doctorId || !date) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing parameter",
            });
        }
        let list = await doctorservice.getListPatientByDoctorService(doctorId, date)
        res.status(200).json(list)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: `Error From Server: ${error.message}`,
        })
    }
}

let postSendBill = async(req, res)=>{
    try {
        let result = await doctorservice.postSendBillService(req.body)
        res.status(200).json(result)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server " + error
        })
    }
}
module.exports = {
    getTopDoctorHome,
    getAllDoctor,
    saveInfoDoctor,
    getInfoDoctor,
    bulkCreateSchedule,
    getAllSchedule,
    getExtraInfoDoctorById,
    getListPatientByDoctor,
    postSendBill
}