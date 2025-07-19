import nodemailer from 'nodemailer'; 

const mailtrapConfig = { 

  host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io', 
  port: parseInt(process.env.MAILTRAP_PORT || '2525'), 
  auth: { 
    user: process.env.MAILTRAP_USERNAME, 
    pass: process.env.MAILTRAP_PASSWORD, 
  }, 
}; 

const transporter = nodemailer.createTransport(mailtrapConfig); 

export default transporter; 