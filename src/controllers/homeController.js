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
    console.log(mess)
    return res.send("post crud")
}

let  displayCrud = async(req, res)=> {
    let data =  await CRUDservice.getAllUser();
    console.log(data)
    return res.render('displayCrud.ejs', {
        data: data
    })
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage : getAboutPage ,
    getCrud : getCrud,
    postCrud: postCrud,
    displayCrud: displayCrud
}