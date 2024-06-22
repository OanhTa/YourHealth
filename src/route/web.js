import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let initWebRoutes = ( app)=>{
    app.get("/", homeController.getHomePage)
    app.get("/about", homeController.getAboutPage)
    app.get("/crud", homeController.getCrud)

    app.post("/post-crud", homeController.postCrud)
    app.get("/get-crud", homeController.displayCrud)
    app.get("/edit-crud", homeController.getEditCrud)

    app.get("/delete-crud", homeController.deleteCrud)
    app.post("/put-crud", homeController.putCrud)

    app.post("/api/login", userController.handleLogin)
    app.get("/api/get-all-user", userController.handleGetAllUser)
}

module.exports = initWebRoutes;