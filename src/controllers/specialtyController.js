const specialtyService = require("../services/specialtyService")

let createSpecialty = async(req, res)=>{
    try {
        let specialty = await specialtyService.createSpecialtyService(req.body)
        res.status(200).json(specialty)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server" + error
        })
    }
}
let getAllSpecialty = async(req, res)=>{
    try {
        let specialtys = await specialtyService.getAllSpecialtyService()
        res.status(200).json(specialtys)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server" + error
        })
    }
}
let getSpecialtyById = async(req, res)=>{
    try {
        let specialtys = await specialtyService.getSpecialtyByIdService(req.query.id, req.query.province)
        res.status(200).json(specialtys)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server" + error
        })
    }
}
module.exports = {
    createSpecialty,
    getAllSpecialty,
    getSpecialtyById
}