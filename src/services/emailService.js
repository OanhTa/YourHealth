require("dotenv").config();
import nodemailer from "nodemailer";

let simpleSendEmail = async(data)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.EMAIL,
          pass: process.env.MAIL_PASS,
        },
      });
    
      await transporter.sendMail({
        from: 'Hỗ trợ khách hàng" <helpIT12@gmail.com>', 
        to: data.receiverEmail, 
        subject: "Vui lòng xác nhận thông tin đã đặt", 
        text: "Thông tin đặt lịch khám bệnh", 
        html: getBodyHTMLEmail(data),
      });
    
}

let getBodyHTMLEmail = (data)=>{
  var result = ``;
  if(data.language === "vi"){
    result = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #2c3e50;">Xin chào, ${data.patientName} !</h2>
              <p style="margin: 10px 0;">
                  Bạn nhận được email này vì đã đặt lịch khám bệnh online trên <b style="color: #e74c3c;">HealthyYour</b>.
              </p>
              <h3 style="color: #2ecc71; margin-top: 20px;">Thông tin đặt lịch khám bệnh</h3>
              <ul style="list-style: none; padding: 0;">
                  <li><strong>Thời gian:</strong> ${data.time} ${data.date}</li>
                  <li><strong>Bác sĩ:</strong> ${data.doctorName}</li>
              </ul>
              <p style="margin: 20px 0;">
                  Nếu các thông tin trên đây là chính xác, vui lòng nhấn vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám:
              </p>
              <a href="${data.redirectLink}" 
                style="display: inline-block; text-decoration: none; background-color: #3498db; color: #fff; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                  Xác nhận đặt lịch
              </a>
              <p style="margin-top: 20px;">Xin chân thành cảm ơn,</p>
              <p style="font-style: italic; color: #7f8c8d;">Đội ngũ HealthyYour</p>
          </div>
        `
  }
  if(data.language === "en"){
    result = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2c3e50;">Hello, ${data.patientName}!</h2>
            <p style="margin: 10px 0;">
                You received this email because you have booked an online medical appointment on <b style="color: #e74c3c;">HealthyYour</b>.
            </p>
            <h3 style="color: #2ecc71; margin-top: 20px;">Appointment Information</h3>
            <ul style="list-style: none; padding: 0;">
                <li><strong>Time:</strong> ${data.time} ${data.date}</li>
                <li><strong>Doctor:</strong> ${data.doctorName}</li>
            </ul>
            <p style="margin: 20px 0;">
                If the above information is correct, please click the link below to confirm and complete the appointment booking process:
            </p>
            <a href="${data.redirectLink}" 
                style="display: inline-block; text-decoration: none; background-color: #3498db; color: #fff; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                Confirm Appointment
            </a>
            <p style="margin-top: 20px;">Thank you very much,</p>
            <p style="font-style: italic; color: #7f8c8d;">HealthyYour Team</p>
        </div>
        `
  }

  return result
}

module.exports = {
    simpleSendEmail
}