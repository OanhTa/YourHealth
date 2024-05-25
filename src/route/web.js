import homeController from "../controllers/homeController";

let initWebRoutes = ( app)=>{
    app.get("/", homeController.getHomePage)
    app.get("/about", homeController.getAboutPage)
    app.get("/crud", homeController.getCrud)

    app.post("/post-crud", homeController.postCrud)
    app.get("/get-crud", homeController.displayCrud)
}

module.exports = initWebRoutes;