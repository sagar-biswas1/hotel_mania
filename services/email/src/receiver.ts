import amqp from 'amqplib';
import { QUEUE_URL, defaultSender, transporter } from './config';
import prisma from './prisma';
import dotenv from 'dotenv';

dotenv.config();
const receiveFromQueue = async (
	queue: string,
	callback: (message: string) => void
) => {
	console.log("inside receiveFromQueue")
	const connection = await amqp.connect(QUEUE_URL);
	const channel = await connection.createChannel();

	const exchange = 'booking';
	await channel.assertExchange(exchange, 'direct', { durable: true });

	const q = await channel.assertQueue(queue, { durable: true });
	await channel.bindQueue(q.queue, exchange, queue);

	channel.consume(
		q.queue,
		(msg) => {
			if (msg) {
				console.log("from line 22")
				callback(msg.content.toString());
			}
		},
		{ noAck: true }
	);
};

receiveFromQueue('send-email', async (msg) => {
	console.log("hello from email")
	const parsedBody = JSON.parse(msg);
console.log(parsedBody)
	const { guestEmail, _id } = parsedBody;
	const from = defaultSender;
	const subject = 'Booking Confirmation';
	const body = `Thank you for your booking. Your booking id is ${_id}.`;

	const emailOption = {
		from,
		to: guestEmail,
		subject,
		text: body,
	};

	// send the email
	const { rejected } = await transporter.sendMail(emailOption);
	if (rejected.length) {
		console.log('Email rejected: ', rejected);
		return;
	}

	await prisma.email.create({
		data: {
			sender: from,
			recipient: guestEmail,
			subject: 'Booking Confirmation',
			body,
			source: 'BookingConfirmation',
		},
	});
	console.log('Email sent');
});
