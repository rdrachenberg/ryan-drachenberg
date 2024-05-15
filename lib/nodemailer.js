import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer'


export const sendEmail = async (to, from, subject, text) => {

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });
  
    const msg = Mail.Options = {
        to, 
        from,
        subject,
        text,
    };
    // console.log(msg)
    try {
        await new Promise((resolve, reject) => {
            transport.sendMail(msg, (error, data) => {
                if(error) { 
                    console.log(error);
                    reject(error);
                    
                } else {
                    resolve(data)
                }
                // console.log(data);
            });
        })

        console.log(`Email was successfully sent to ${to} with a \nhash: ${text}`);
        
    } catch (error) {
        console.log('This error is from the nodemailer.js sendEmail function')
        console.log(error);
    }
}