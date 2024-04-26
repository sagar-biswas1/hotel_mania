import { z } from 'zod';

// Define Zod schema for creating a booking
export const BookingCreateSchema = z.object({
  guestID: z.string(), // Reference to the guest's ID
  roomID: z.string(), // Reference to the booked room's ID
  bookingStatus: z.string(), // Status of the booking (e.g., confirmed, pending, canceled)
  guestName: z.string(), // Guest's full name
  guestEmail: z.string().email(), // Guest's email address
  guestCellNo: z.string(), // Guest's contact phone number
  totalCost: z.number(), // Total cost of the booking
  bookingDate: z.string().pipe(z.coerce.date()), // Date the booking was made
  checkInDate: z.string().pipe(z.coerce.date()), // Scheduled check-in date
  checkOutDate: z.string().pipe(z.coerce.date()), // Scheduled check-out date
});

// Define Zod schema for updating a booking
export const BookingUpdateSchema = BookingCreateSchema.partial(); // Allows partial updates
