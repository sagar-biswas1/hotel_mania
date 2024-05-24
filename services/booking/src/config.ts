import dotenv from 'dotenv';
dotenv.config({
	path: '.env',
});

export const EMAIL_SERVICE =
	process.env.EMAIL_SERVICE_URL || 'https://email-three-phi.vercel.app';


export const UPDATE_ROOM_AVAILABLE_DATES = process.env.UPDATE_ROOM_AVAILABLE_DATES_URL ||'https://room-iota-one.vercel.app/room-availability';


export const ROOM_DETAILS = process.env.GET_ROOM_DETAILS ||'https://room-iota-one.vercel.app/room';


export const QUEUE_URL = process.env.QUEUE_URL || 'amqp://localhost';