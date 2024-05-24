import dotenv from "dotenv";

dotenv.config();

export const USER_SERVICE =
	process.env.USER_SERVICE_URL || 'https://user-drab.vercel.app';

export const EMAIL_SERVICE =
	process.env.EMAIL_SERVICE_URL || 'https://email-three-phi.vercel.app';
