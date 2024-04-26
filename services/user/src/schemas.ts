import { z } from 'zod';

export const UserCreateSchema = z.object({
	authUserId: z.string(),
	name: z.string(),
	email: z.string().email(),
	address: z.string().optional(),
	phone: z.string().optional(),
});

// export const UserUpdateSchema = UserCreateSchema.omit({
// 	authUserId: true,
// }).partial();


export const UserUpdateSchema = z.object({
	name: z.string().optional(), // Allow name to be updated optionally
	address: z.string().optional(),
	phone: z.string().optional(),
	birthDate: z.string().optional(), // Assuming birthDate is a string, modify it accordingly if it's a DateTime
});
