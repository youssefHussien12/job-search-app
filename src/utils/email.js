import jwt from "jsonwebtoken"
import { createTransport } from "nodemailer";
import { emailHtml } from "./emailHtml.js";
export const sendEmails = async (email) => {
    const transporter = createTransport({
        service: "gmail",
        auth: {
            user: "yossefhussienm@gmail.com",
            pass: "qjyrwujcrjpbosmt",
        },
    });

    jwt.sign({ email }, "my-Secret-Key", { expiresIn: "5m" }, async (err, token) => {
        const info = await transporter.sendMail({
            from: '"youssef hussien 🤩" <yossefhussienm@gmail.com>',
            to: email,
            subject: "Hello ✔",
            html: emailHtml(token,email)
        });

        console.log("Message sent: %s", info.messageId);
    })

}

