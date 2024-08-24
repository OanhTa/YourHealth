import { where } from 'sequelize';
import db from '../models';
import { raw } from 'body-parser';

let getTopDoctorHome = (limit)=>{   
    return new Promise(async(resolve, reject) =>{
        try {
            let doctors = await db.User.findAll({
                limit: limit,
                where: {roleId: 'R2'},
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include:[
                    {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                    {model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']},               
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getAllDoctor = ()=>{   
    return new Promise(async(resolve, reject) =>{
        try {
            let doctors = await db.User.findAll({
                where: {roleId: 'R2'},
                attributes: {
                    exclude: ['password', 'image']
                },
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    })
}

let saveInfoDoctorService = async(data)=>{   
    return new Promise(async(resolve, reject) =>{
        try {
            if(!data.contentHTML || !data.contentMarkdown){
                resolve({
                    errCode: 1,
                    message: 'Missing paramerter'
                })}

                console.log("Code is running up to this point.");
    
                await db.Markdown.create({
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    description: data.description,
                    doctorId: data.doctorId.value,
                })
            resolve({
                 errCode: 0,
                  message: 'Save info doctor successfully'
            })
            
        } catch (error) {
            reject(error)
        }
    })
}
let getInfoDoctorService =(id)=>{
    return new Promise(async(resolve, reject) =>{
        try {
            if(!id){
                resolve({
                    errCode: 1,
                    message:"Missing paramenter"
                })
            }
            let doctor = await db.User.findAll({
                where: {id},
                attributes: {
                    exclude: ['password', 'image']
                },
                include:[
                    {
                        model: db.Markdown,
                        attributes: ["contentHTML", "contentMarkdown", "description"]
                    },
                    {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},             
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: doctor
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getTopDoctorHome,
    getAllDoctor,
    saveInfoDoctorService,
    getInfoDoctorService
}