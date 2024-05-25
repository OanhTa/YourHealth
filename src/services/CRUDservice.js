import { raw } from 'body-parser';
import db from '../models';
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

let createNewUser = async(data)=>{
    return new Promise( async(resolve, reject) =>{
        try {
            let hashPass = await hashUserPassword(data.password)
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password:hashPass,
                address: data.address,
                gender: data.gender == '1' ? true : false,
                roleId:data.role,
                phonenumber:data.phonenumber,
                // positionId: data.position,
                // image: data.image
            });
            resolve("create ok");
        } catch (error) {
            reject(error);
        }
    });
  
}
let hashUserPassword = (pass)=>{
    return new Promise( async(resolve, reject) =>{
        try {
            var hash = await bcrypt.hashSync(pass, salt);
            resolve(hash);
        } catch (error) {
            reject(error);
        }
    });
}

let getAllUser = ()=>{
    return new Promise( async(resolve, reject) =>{
        try {
            var users = db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser
}