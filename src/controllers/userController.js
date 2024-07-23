import db from "../models/index"
import userService from "../services/userService";

let handleLogin = async(req, res)=>{
    let email = req.body.email;
    let pass = req.body.password;

    if(!email || !pass){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter'
        })
    }
    let userData = await userService.handleUserLogin(email,pass)
    console.log(userData.user)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    });
}
let handleGetAllUser = async(req, res)=>{
   let id = req.query.id;
   if(!id){
    return res.status(200).json({
        errCode:1,
        Message:'Missing required parementers',
        user:[]
   })
   }
   let users = await userService.getAllUser(id)

   return res.status(200).json({
        errCode:0,
        Message:'Ok',
        users
   })
}
let handleCreateNewUser = async(req, res)=>{
    let mess = await userService.createNewUser(req.body);

    return res.status(200).json(mess)

}
let handleEditUser = async(req, res)=>{
    let mess = await userService.editUser(req.body);

    return res.status(200).json(mess)

}
let handleDeleteUser = async(req, res)=>{
    let mess = await userService.deleteUser(req.body.id);

    return res.status(200).json(mess)

}
let getAllCode = async(req, res)=>{
    try {
        let type = req.query.type
        let data = await userService.getAllCodeService(type);
        return res.status(200).json(data)
    } catch (error) {
        res.status(200).json({
            errCode:-1,
            Message:'Error the server',
       })
    }
}
module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
    getAllCode
}