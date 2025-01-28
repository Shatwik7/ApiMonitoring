import nodemailer from 'nodemailer';
import { readHtmlFile, replacePlaceholders } from './helpers';
import {ApiError} from '@prisma/client'

export async function mail(to: string, subject: string, text: string,html:string) {

    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST || 'gamil.com' ,
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER||'your-email@example.com',
            pass: process.env.MAIL_PASS||'your-email-password',
        },
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        html:html
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email: %s', error);
    }
}

interface incidentMailData{
    api_url:string,
    started_at :Date,
    errortype:ApiError,
    acknowledge_url:string,
    unavailable_url:string
}

/**
 * 
 * @param to email of the user
 * @param data data of the incident
 * @returns 
 */
export async function sendIncidentMail(to: string,data:incidentMailData) : Promise<void>{
    
    const html=replacePlaceholders(
        readHtmlFile('incindet.html'),
        {
        api_url:data.api_url,
        started_at:data.started_at.toISOString(),
        errortype:data.errortype,
        acknowledge_url:data.acknowledge_url,
        unavailable_url:data.unavailable_url,
        }
    );
    return mail(to,"Incident","",html);
}



interface sendEmailVerificationType{
    verification_link:string,
    expires_at:Date,
}

/**
 * 
 * @param to email address of the user
 * @param data expiration date and verification link
 * @returns 
 */
export async function sendEmailVerificationLink(to:string,data:sendEmailVerificationType) {
    
    const html=replacePlaceholders(readHtmlFile('emailverification.html'),{
        verification_link:data.verification_link,
        expires_at:data.expires_at.toISOString(),
    });
    
    return mail(to,"Verification","",html);
}







