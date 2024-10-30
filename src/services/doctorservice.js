
import db from '../models';
import _ from 'lodash';
require("dotenv").config();

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE

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
            if(!data.doctorId || !data.contentHTML || !data.contentMarkdown || !data.action
                ||!data.selectedPrice || !data.selectedProvince || !data.selectedPayment || !data.addressClinic || !data.nameClicnic
            ){
                resolve({
                    errCode: 1,
                    message: 'Missing paramerter'
            })}else{
                //table Markdown
                if(data.action === 'CREATE'){
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId,
                    })
                }
                if(data.action === 'EDIT'){
                    let doctor = await db.Markdown.findOne({ 
                        where: {doctorId: data.doctorId},
                        raw: false
                    });
                    if(doctor){
                        doctor.contentHTML= data.contentHTML,
                        doctor.contentMarkdown= data.contentMarkdown,
                        doctor.description= data.description,
                        await doctor.save();
                    }else{
                        resolve({
                            errCode: 1,
                            message: 'Doctor not found!'
                        });
                    }
                }
                 //table DoctorInfo
                let doctor_detail = await db.DoctorInfo.findOne({ 
                    where: {doctorId: data.doctorId},
                    raw: false
                });
                console.log(doctor_detail)
                if(doctor_detail){
                    doctor_detail.priceId = data.selectedPrice,
                    doctor_detail.provinceId = data.selectedProvince,
                    doctor_detail.paymentId =  data.selectedPayment,
                    doctor_detail.addressClinic =  data.addressClinic,
                    doctor_detail.nameClinic =  data.nameClicnic,
                    doctor_detail.note =  data.note,
                    await doctor_detail.save();
                }else{
                    await db.DoctorInfo.create({
                        doctorId: data.doctorId,
                        priceId: data.selectedPrice,
                        provinceId: data.selectedProvince,
                        paymentId: data.selectedPayment,
                        addressClinic: data.addressClinic,
                        nameClinic: data.nameClicnic,
                        note: data.note,
                        // count: data.contentHTML,
                    })
                }
                resolve({
                    errCode: 0,
                    message: 'Save info doctor successfully'
               })
            }
            
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
            let doctor = await db.User.findOne({
                where: {id},
                attributes: {
                    exclude: ['password']
                },
                include:[
                    {
                        model: db.Markdown,
                        attributes: ["contentHTML", "contentMarkdown", "description"]
                    },
                    {   
                        model: db.Allcode, 
                        as: 'positionData', 
                        attributes: ['valueEn', 'valueVi']
                    },  
                    {   
                        model: db.DoctorInfo, 
                        attributes: {
                            exclude: ['id', 'doctorId']
                        },
                        include:[
                            { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi']},
                            { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi']},
                            { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi']},
                        ]
                    },             
                ],
                raw: false,
                nest: true
            });
            
            if(doctor && doctor.image){
                doctor.image = new Buffer(doctor.image, 'base64').toString('binary');
                
            }
            
            resolve({
                errCode: 0,
                data: doctor ? doctor: {}
            })
        } catch (error) {
            reject(error)
        }
    })
}
let bulkCreateScheduleService = async(data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            if(!data ||!data.arrSchedule || !data.doctorId ||!data.date){
                resolve({
                    errCode: 1,
                    message: 'Missing parament'
                })
            }

            let arrSchedule = data.arrSchedule

            if(arrSchedule && arrSchedule.length>0){
                arrSchedule.map(item => item.maxNumber = MAX_NUMBER_SCHEDULE)

                let doFind = await db.Schedule.findAll({
                    where:{doctorId: data.doctorId, date:  data.date},
                    attributes: ['maxNumber', 'date', 'timeType', 'doctorId']
                })
                
                //tìm khunng giờ trong ngày chưa đặt
                let compareDiff = _.differenceWith(arrSchedule, doFind, (a, b) => {
                    return +a.date === +b.date && a.timeType === b.timeType;
                });

                if(compareDiff && compareDiff.length>0){
                    await db.Schedule.bulkCreate(compareDiff);
                }

                resolve({
                    errCode: 0,
                    message: 'Save info schedule successfully'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllScheduleService = (doctorId, date)=>{
    return new Promise(async(resolve, reject) =>{
        try {
            if(!doctorId || !date){
                resolve({
                    errCode: 1,
                    message: 'Missing parament'
                })
            }else{
                let data = await db.Schedule.findAll({
                    where:{doctorId, date},
                    include:[
                        {   
                            model: db.Allcode, as: 'timeTypeData', 
                            attributes: ['valueEn', 'valueVi']
                        },             
                    ],
                    raw: false,
                    nest: true
                })
               
                resolve( {
                    errCode: 0,
                    data: data || []
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getTopDoctorHome,
    getAllDoctor,
    saveInfoDoctorService,
    getInfoDoctorService,
    bulkCreateScheduleService,
    getAllScheduleService
}