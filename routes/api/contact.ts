import express = require("express");
import wrap = require("express-async-error-wrapper");
import nodemailer = require("nodemailer");

const router = express.Router();

// Se utilizar router.xxx() mas não utilizar o wrap(), as exceções ocorridas
// dentro da função async não serão tratadas!!!
router.post("/send", wrap(async (req: express.Request, res: express.Response) => {
	debugger;
	const output = `<p>Hello,</p>
    <p>Novo contato</p>
    <h3>Informações de contato</h3>
    <ul>  
        <li>Nome: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Assunto: ${req.body.subject}</li>
    </ul>
    <h3>Mensagem:</h3>
    <p>${req.body.text}</p>`;

	let transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 465,
		secure: "true",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	let mailOptions = {
		from: "caroline.ferguson86@gmail.com",
		to: "carlosrafaelgn@hotmail.com",
		subject: "Testing",
		text: "Olá",
		html: output
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			res.json(error);
			return;
		}
		console.log("Message sent: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

		res.json(true);
	});
}));

export = router;
