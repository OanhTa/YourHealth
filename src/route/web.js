import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";

let initWebRoutes = ( app)=>{
    app.get("/", homeController.getHomePage)
    app.get("/about", homeController.getAboutPage)
    app.get("/crud", homeController.getCrud)

    app.get("/get-crud", homeController.displayCrud)
    app.post("/post-crud", homeController.postCrud)
    app.get("/edit-crud", homeController.getEditCrud)
    app.get("/delete-crud", homeController.deleteCrud)
    app.post("/put-crud", homeController.putCrud)

    app.post("/api/login", userController.handleLogin)
    app.get("/api/get-all-user", userController.handleGetAllUser)
    app.post("/api/create-new-user", userController.handleCreateNewUser)
    app.put("/api/edit-user", userController.handleEditUser)
    app.delete("/api/delete-user", userController.handleDeleteUser)

    app.get("/api/all-code", userController.getAllCode)
    app.get("/api/top-doctor-home", doctorController.getTopDoctorHome)
    app.get("/api/get-all-doctors", doctorController.getAllDoctor)
    app.post("/api/save-infor-doctor", doctorController.saveInfoDoctor)
    app.get("/api/get-infor-doctor", doctorController.getInfoDoctor)
    app.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule)
    app.get("/api/get-all-schedule", doctorController.getAllSchedule)
    app.get("/api/get-extra-infor-doctorById", doctorController.getExtraInfoDoctorById)
    
    app.get("/api/get-list-patient-ByDoctor", doctorController.getListPatientByDoctor)
    app.post("/api/sendBill", doctorController.postSendBill)
    
    app.post("/api/patient-book-appointment", patientController.patientBookingAppointment)
    app.post("/api/verify-book-appointment", patientController.verifyBookingAppointment)

    app.post("/api/create-new-specialty", specialtyController.createSpecialty)
    app.get("/api/get-all-specialty", specialtyController.getAllSpecialty)
    app.get("/api/get-specialty-id", specialtyController.getSpecialtyById)

    app.post("/api/create-new-clinic", clinicController.createClinic)
    app.get("/api/get-all-clinic", clinicController.getAllClinic)
    app.get("/api/get-clinic-id", clinicController.getClinicById)

}

module.exports = initWebRoutes;