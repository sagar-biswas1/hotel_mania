import dotenv from 'dotenv';
dotenv.config({
	path: '.env',
});

export const EMAIL_SERVICE =
	process.env.EMAIL_SERVICE_URL || 'http://localhost:4005';


export const UPDATE_ROOM_AVAILABLE_DATES = process.env.UPDATE_ROOM_AVAILABLE_DATES_URL ||'http://localhost:4010/room-availability';


export const ROOM_DETAILS = process.env.GET_ROOM_DETAILS ||'http://localhost:4010/room';


export const QUEUE_URL = process.env.QUEUE_URL || 'amqp://localhost';