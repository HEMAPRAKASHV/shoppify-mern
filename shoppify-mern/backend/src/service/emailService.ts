import transporter from '../utils/mailer';
import { SentMessageInfo } from 'nodemailer';

interface EmailOptions {
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
}

async function sendEmail(options: EmailOptions): Promise<SentMessageInfo> {
    console.log(process.env.MAIL_FROM_ADDRESS)
    try {
        const info = await transporter.sendMail({
            from: "abc@gmail.com", //process.env.MAIL_FROM_ADDRESS,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
        });

        console.log('Message sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

export { sendEmail }; 