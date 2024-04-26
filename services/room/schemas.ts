import { z } from 'zod';

// Define Zod schema for creating a room
export const RoomCreateSchema = z.object({
  type: z.string(),
  name: z.string(),
  description: z.string(),
  amenities: z.array(z.string()),
  price: z.number(),
  capacity: z.number(),
  availability: z.array(z.coerce.date()), // Array of available dates
});

// Define Zod schema for updating a room
export const RoomUpdateSchema = RoomCreateSchema.partial();

// Schema for updating room availability
export const RoomAvailabilitySchema = z.object({
  dates: z.array(z.coerce.date()), // Array of dates to add to or remove from availability
});

// Define Zod schema for returning room data (includes timestamps)
export const RoomResponseSchema = RoomCreateSchema.extend({
  createdAt: z.date(), // Timestamp when the room was created
  updatedAt: z.date(), // Timestamp when the room was last updated
});
