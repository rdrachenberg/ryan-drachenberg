import sgMail from '@sendgrid/mail';


export const sendEmail = async (to, from, subject, text) => {
    // setup sendgrid 
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // console.log(body);
    // console.log(to);
    const msg = {
        to, 
        from,
        subject,
        text,
    };

    try {
        await sgMail.send(msg);
        console.log(`Email was successfully sent to ${to} with a \nhash: ${text}`);
    
    } catch (error) {
        console.log('This error is from the function')
        console.log(error);
    }
}