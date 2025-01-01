const { where } = require("sequelize")
const db = require("../models")

let createSpecialtyService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            if(!data.nameSpe &&!data.imageBase64 && !data.contentHTML){
                resolve({
                    errCode: 1,
                    message: 'Missing paramerter'
                })
            } 
            await db.Specialty.create({
                descriptionHTML:data.contentHTML,
                descriptionMarkdown	:data.contentMarkdown,
                image: data.imageBase64,
                name: data.nameSpe,
            })
            resolve({
                errCode: 0,
                message: 'Create specialty successfully',
           })
        } catch (error) {
            reject(error)
        }
    })
}
let getAllSpecialtyService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let res = await db.Specialty.findAll();
            resolve({
                errCode: 0,
                data: res
           })
        } catch (error) {
            reject(error)
        }
    })
}
let getSpecialtyByIdService = (id, province)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            if(!id && !province){
                resolve({
                    errCode: 1,
                    message: 'Missing paramerter'
                })
            }
            let specialty = await db.Specialty.findOne({
                where: {id},
                attributes: ['descriptionHTML', 'descriptionMarkdown']
            });
            let doctorInfo;
            if(specialty){
                if(province === 'ALL'){
                    doctorInfo = await db.DoctorInfo.findAll({
                        where: {specialtyId: id},
                        attributes: ['doctorId', 'provinceId']
                    });
                }else{
                    doctorInfo = await db.DoctorInfo.findAll({
                        where: {
                            specialtyId: id,
                            provinceId: province
                        },
                        attributes: ['doctorId', 'provinceId']
                    });
                }
                
            }
            resolve({
                errCode: 0,
                data: {
                    specialty,
                    doctorInfo
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createSpecialtyService,
    getAllSpecialtyService,
    getSpecialtyByIdService
}