import db from "../models/index"
import CRUDservice from "../services/CRUDservice";

let getHomePage = async (req, res)=> {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error);
    }
}

let getAboutPage = (req, res)=> {
    return res.render('test/aboutpage.ejs')
}
let getCrud = (req, res)=> {
    return res.render('crud.ejs')
}

let postCrud = async(req, res)=> {
    let mess =  await CRUDservice.createNewUser(req.body);
    return res.send("post crud")
}

let  displayCrud = async(req, res)=> {
    let data =  await CRUDservice.getAllUser();
    return res.render('displayCrud.ejs', {
        data: data
    })
}
let getEditCrud = async(req, res)=> {
    let id = req.query.id;
    if (id) {
        let user =  await CRUDservice.getUserById(id);
        return res.render('editCrud.ejs', {
            user: user
        })
    } else {
        return res.send('User not found')
    }
}
let putCrud = async(req, res)=>{
    let data = req.body;
    await CRUDservice.updateUserDate(data)
    let dataUpdate = await CRUDservice.getAllUser();
    return res.render('displayCrud.ejs', {
        data: dataUpdate
    })
}

let deleteCrud = async(req, res)=>{
    let id = req.query.id;
    if (id) {
        await CRUDservice.deleteUserById(id);
        return res.send('Delete success')
    } else {
        return res.send('User not found')
    }
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage : getAboutPage ,
    getCrud : getCrud,
    postCrud: postCrud,
    displayCrud: displayCrud,
    getEditCrud: getEditCrud,
    putCrud: putCrud,
    deleteCrud: deleteCrud
}