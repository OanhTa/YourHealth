import { raw } from 'body-parser';
import db from '../models';

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

let checkUserEmail = (email)=>{
    return new Promise( async(resolve, reject) =>{
        try {
            var user = await db.User.findOne({ 
                where: { email: email },
                attributes: ['email','roleId','password'],
            });
            resolve(user)
        }catch (error) {
            reject(error);
        }
    });
}

let handleUserLogin = async(email, pass)=>{
    return new Promise( async(resolve, reject) =>{
        try {
            let userData = {}
            
            var user = await db.User.findOne({ 
                where: { email: email },
                attributes: ['email','roleId','password','firstName', 'lastName'],
            });
            //Ktra email có tồn tại khong
            if(user){
                //So sánh password có giống
                let isCheck = await bcrypt.compareSync(pass, user.password)
                if(isCheck){
                    userData.errCode = 0
                    userData.message = "Ok";
                    delete user.password
                    userData.user = user
                }else{
                    userData.errCode = 3
                    userData.message = "Wrong password"
                }
            }else{
                userData.errCode = 2
                userData.message = "Your email isn't exist in system. Please try other email!"
            }
            resolve(userData)
                  
        } catch (error) {
            reject(error);
        }
    });
}

let getAllUser = (userID)=>{
    return new Promise( async(resolve, reject) =>{
        try {
            let users = ''
            if(userID === 'ALL'){
                users = await db.User.findAll({
                    attributes:{
                        exclude: ['password']
                    },                 
                });
            }
            if(userID && userID !== 'ALL'){
                users = await db.User.findOne({ 
                    where: { id: userID },
                    attributes:{
                        exclude: ['password']
                    },
                });
            }
            resolve(users);
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
let createNewUser = (data)=>{
    return new Promise( async(resolve, reject) =>{
            try {
                let isCheck = await checkUserEmail(data.email);
                if(isCheck){
                    resolve({
                        errCode: 1,
                        message: 'Your email is already used. Please try another email'
                    });
                }else{
                    let hashPass = await hashUserPassword(data.password)
                    await db.User.create({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        password:hashPass,
                        address: data.address,
                        gender: data.gender,
                        roleId: data.roleId,
                        phonenumber:data.phonenumber,
                        positionId: data.positionId,
                        image: data.avatar
                    });
                    resolve({
                        errCode: 0,
                        message: 'Create Successful'
                    });
                }
            } catch (error) {
                reject(error);
            }
        }
    )
}
let deleteUser = (id)=>{
    return new Promise( async(resolve, reject) =>{
        try {
            var user = await db.User.findOne({ 
                where: { id: id },
                raw: false
            });
            if (!user) {
                resolve({
                    errCode: 2,
                    message: "The user isn't exist"
                });
            } 
            await user.destroy();
            resolve({
                errCode: 0,
                message: 'The user is delete'
            });
        }catch (error) {
            reject(error);
        }
    });
}
let editUser = (data)=>{
    return new Promise( async(resolve, reject) =>{
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    message: 'Missing required paramenters!'
                }); 
            }
            let user = await db.User.findOne({ 
                where: { id: data.id },
                raw: false
            });
            
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;         
                user.gender= data.gender,
                user.roleId= data.roleId,
                user.positionId= data.positionId,
                user.image= data.avatar
                await user.save();

                resolve({
                    user,
                    errCode: 0,
                    message: 'Update the user succeeds!'
                }); 
            }else{
                resolve({
                    errCode: 1,
                    message: 'User not found!'
                });
            }
        
               
        } catch (error) {
            reject(error);
        }
    });
}
let getAllCodeService =(type)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            if(!type){
                resolve({
                    errCode: 1,
                    message: 'Missing required paramenters!'
                }); 
            }else{
                let allcode = await db.Allcode.findAll({
                    where: {type },
                })
                resolve({
                    errCode: 0,
                    data: allcode
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin,
    getAllUser,
    createNewUser,
    deleteUser,
    editUser,
    getAllCodeService
}