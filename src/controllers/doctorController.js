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
            message: "Error From Server"
        })
    }
}
module.exports = {
    getTopDoctorHome,
    getAllDoctor,
    saveInfoDoctor,
    getInfoDoctor
}