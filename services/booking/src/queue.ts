import amqp from 'amqplib';
import { QUEUE_URL } from './config';

const sendToQueue = async (queue: string, message: string) => {
	console.log(QUEUE_URL,"connecting")
	const connection = await amqp.connect(QUEUE_URL);
	console.log(QUEUE_URL,"connected")
	const channel = await connection.createChannel();

	const exchange = 'booking';
	await channel.assertExchange(exchange, 'direct', { durable: true });

	channel.publish(exchange, queue, Buffer.from(message));
	console.log(`Sent ${message} to ${queue}`);

	setTimeout(() => {
		connection.close();
	}, 500);
};

export default sendToQueue;