/* eslint-disable import/no-anonymous-default-export */
import { NextResponse, NextRequest } from 'next/server';
// import { sendEmail } from '../../../lib/sendgrid';
import { sendEmail } from '../../../lib/nodemailer';


type RequestBody = {
    to: string;
    from: string;
    subject: string;
    text: string;     
}

export async function POST(req: NextRequest, res: NextResponse) {
        const body: RequestBody = await req.json();
        // console.log(body);
        try {
            await sendEmail(body.to, body.from, body.subject, body.text);
            
            // if(res.ok) res.status:(Number(200)).json({message: 'Email sent successfully '});
            res.ok ?  console.log(res.body) : null;
            
            return NextResponse.json({success: true}, {status: 200});

        } catch (error) {
            console.log('Is this the error')
            console.log(error)
            // res.status(500).json({message: 'Internal Server Error'});
            return NextResponse.json({status: 500})
        }
    
   
}