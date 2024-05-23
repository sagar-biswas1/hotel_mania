import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST || 'host.docker.internal',
	port: parseInt(process.env.SMTP_PORT || '1025'),
	// secure:true,
	auth: {
		user: process.env.SMTP_USERNAME,
		pass: process.env.SMTP_PASSWORD
	  }
});




export const QUEUE_URL = process.env.QUEUE_URL || 'amqp://localhost';

export const defaultSender =
	process.env.DEFAULT_SENDER_EMAIL || 'admin@example.com';
