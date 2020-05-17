import nodemailer from 'nodemailer';
import config from '../configs/configs'

class Mail {

    constructor(
        public email?: string,
        public password?: string,
        public name?: string,
    ) { }

    sendMail() {

        let mailOptions = {
            from: "gmmartins06@gmail.com",
            to: this.email,
            secure: false,
            subject: `Dados de acesso`,
            html: `
                <h1>Seja bem vindo ${this.name}</h1>
                <strong>Seu cadastro foi realizado com sucesso</strong>
                <strong>Dados para acesso</strong>
                <p><strong>email: </strong>${this.email}</p>
                <p><strong>senha: </strong>${this.password}</p>
            `
        };

        const transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: false,
            auth: {
                user: config.user,
                pass: config.password
            },
            tls: { rejectUnauthorized: false }
        });

        transporter.sendMail(mailOptions, function (error) {
            return error ? console.log('error') : "E-mail enviado com sucesso!"
        });
    }
}

export default new Mail;