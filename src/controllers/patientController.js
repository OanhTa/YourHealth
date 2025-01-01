import patientService from "../services/bookingService"

let patientBookingAppointment = async(req, res) =>{
    try {
        let book = await patientService.patientBookingService(req.body)
        res.status(200).json(book)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server" + error
        })
    }
}
let verifyBookingAppointment= async(req, res) =>{
    try {
        let verify = await patientService.verifyBookingService(req.body)
        res.status(200).json(verify)

    } catch (error) {
        res.status(200).json({
            errCode: -1,
            message: "Error From Server" + error
        })
    }
}
module.exports = {
    patientBookingAppointment,
    verifyBookingAppointment
}