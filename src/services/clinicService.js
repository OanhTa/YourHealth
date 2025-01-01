const { where } = require("sequelize")
const db = require("../models")

let createClinicService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            if(!data.nameSpe &&!data.imageBase64 && !data.contentHTML && !data.	address){
                resolve({
                    errCode: 1,
                    message: 'Missing paramerter'
                })
            } 
            await db.Clinic.create({
                descriptionHTML:data.contentHTML,
                descriptionMarkdown	:data.contentMarkdown,
                image: data.imageBase64,
                name: data.nameSpe,
                address: data.address
            })
            resolve({
                errCode: 0,
                message: 'Create clinic successfully',
           })
        } catch (error) {
            reject(error)
        }
    })
}
let getAllClinicService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let res = await db.Clinic.findAll();
            resolve({
                errCode: 0,
                data: res
           })
        } catch (error) {
            reject(error)
        }
    })
}
let getClinicByIdService = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            if(!id && !province){
                resolve({
                    errCode: 1,
                    message: 'Missing paramerter'
                })
            }
            let clinic = await db.Clinic.findOne({
                where: {id},
                attributes: ['descriptionHTML', 'descriptionMarkdown', 'name']
            });
            let doctorInfo;
            if(clinic){
                doctorInfo = await db.DoctorInfo.findAll({
                    where: {clinicId: id},
                    attributes: ['doctorId', 'provinceId']
                });  
            }
            resolve({
                errCode: 0,
                data: {
                    clinic,
                    doctorInfo
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createClinicService,
    getAllClinicService,
    getClinicByIdService
}