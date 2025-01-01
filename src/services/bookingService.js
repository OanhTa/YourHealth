import { where } from 'sequelize';
import db from '../models';
import _ from 'lodash';
require("dotenv").config();
import emailService from "./emailService"
import moment from 'moment';
import  { v4 as uuidv4} from 'uuid'
import { raw } from 'body-parser';

let buildUrlEmail = (token, doctorId)=>{
    return `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
}
let patientBookingService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            if(!data.email && !data.doctorId && !data.timeType){
                resolve({
                    errCode: 1,
                    message: 'Missing paramerter'
                })
            }
            let formattedDate = data.language === "vi" ? 
                moment(data.selectedDate).format("DD/MM/YYYY"): moment(data.selectedDate).format("MM/DD/YYYY"); 
            let token = uuidv4()
            await emailService.simpleSendEmail({
                receiverEmail: data.email,
                doctorName: data.doctorName,
                patientName: data.fullName,
                time: data.timeType,
                date: formattedDate,
                language: data.language,
                redirectLink: buildUrlEmail(token, data.doctorId)
            })
            let user = await db.User.findOrCreate({
                where: {email: data.email},
                defaults: {
                    email: data.email,
                    roleId: 'R3'
                }
            })
            
            if(user && user[0]){
                await db.Booking.findOrCreate({
                    where: {
                        patientid: user[0].id,
                        date: data.selectedDate,
                        timeType: new Date(data.selectedDate).getTime(),
                    },
                    defaults: {
                        statusId: "S1",
                        doctorId: data.doctorId,
                        patientid: user[0].id,
                        date: new Date(data.selectedDate).getTime(),
                        token: token,
                        timeType: data.timeType,
                    }
                });
            }
            resolve({
                errCode: 0,
                message: 'Booking appointment successfully',
           })
        } catch (error) {
            reject(error)
        }
    })
}
let verifyBookingService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            if(!data.token && !data.doctorId){
                resolve({
                    errCode: 1,
                    message: 'Missing paramerter'
                })
            }
            let book = await db.Booking.findOne({
                where: {
                    doctorId: data.doctorId,
                    token: data.token,
                    statusId: "S1"
                },
                raw: false
            }) 
            if(book){
                book.statusId = "S2"
                await book.save()
                
                resolve({
                    errCode: 0,
                    message: 'Update appointment successfully',
               })
            }else{
                resolve({
                    errCode: 2,
                    message: 'Appointment have been activated or does not exits',
               })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports ={
    patientBookingService,
    verifyBookingService
}