import express = require("express");
import wrap = require("express-async-error-wrapper");
import nodemailer = require("nodemailer");

const router = express.Router();

// Se utilizar router.xxx() mas não utilizar o wrap(), as exceções ocorridas
// dentro da função async não serão tratadas!!!
router.post("/send", wrap(async (req: express.Request, res: express.Response) => {
	const output = `Olá,
    Novo contato
    Informações de contato
    - Nome: ${req.body.name}
    - Email: ${req.body.email}
    - Assunto: ${req.body.subject}
    Mensagem:
    ${req.body.text}`;

	let transporter = nodemailer.createTransport({
		service: "Hotmail",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	let mailOptions = {
		from: process.env.EMAIL,
		to: process.env.EMAIL,
		subject: "Contato do site",
		text: output
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
