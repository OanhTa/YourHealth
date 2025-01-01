const clinicService = require("../services/clinicService")

let createClinic = async(req, res)=>{
    try {
        let clinic = await clinicService.createClinicService(req.body)
        res.status(200).json(clinic)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server" + error
        })
    }
}
let getAllClinic = async(req, res)=>{
    try {
        let clinics = await clinicService.getAllClinicService()
        res.status(200).json(clinics)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server" + error
        })
    }
}
let getClinicById = async(req, res)=>{
    try {
        let clinics = await clinicService.getClinicByIdService(req.query.id, req.query.province)
        res.status(200).json(clinics)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server" + error
        })
    }
}
module.exports = {
    createClinic,
    getAllClinic,
    getClinicById
}