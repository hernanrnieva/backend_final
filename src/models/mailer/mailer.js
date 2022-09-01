import { createTransport } from 'nodemailer'
import { getNewUserHtml, getNewOrderHtml } from './formatter.js'
import { mailerHost, mailerEmail, mailerPass } from '../../controllers/config/config.js'

const transporter = createTransport({
    host: mailerHost,
    port: 587,
    auth: {
        user: mailerEmail,
        pass: mailerPass,
    }
})

export async function sendNewUserMail(user) {
    const config = {
        from: 'NodeJs Server',
        to: mailerEmail,
        subject: `New User Registered: ${user.name}`,
        html: getNewUserHtml(user)
    }

    try {
        await transporter.sendMail(config)
    } catch(e) {
        // console.log(`Error sending new user registration email: ${e}`)
    }
}

export async function sendNewOrderMail(cart) {
    const subject = `New Order Received`
    const config = {
        from: 'NodeJs Server',
        to: mailerEmail,
        subject: subject,
        html: getNewOrderHtml(cart) 
    }

    try {
        await transporter.sendMail(config)
    } catch(e) {
        // console.log(`Error sending new order email: ${e}`)
    }
}