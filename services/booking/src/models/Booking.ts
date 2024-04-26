// src/models/Booking.ts
import mongoose, { Schema, Document } from 'mongoose';

// Extend Mongoose Document to define the Booking type with necessary properties
export interface Booking extends Document {
  guestID: string; // Reference to the guest's ID
  roomID: string; // Reference to the booked room's ID
  bookingStatus: string; // Status of the booking (e.g., confirmed, pending, canceled)
  guestName: string; // Guest's full name
  guestEmail: string; // Guest's email address
  guestCellNo: string; // Guest's contact phone number
  totalCost: number; // Total cost of the booking
  bookingDate: Date; // Date the booking was made
  checkInDate: Date; // Scheduled check-in date
  paymentId:string;
  checkOutDate: Date; // Scheduled check-out date
 
}

// Define the schema for Booking
const BookingSchema: Schema = new Schema({
  guestID: { type: String, required: true }, // Foreign key to guest
  roomID: { type: String, required: true }, // Foreign key to room
  bookingStatus: { type: String, required: true }, // Booking status
  guestName: { type: String, required: true }, // Guest name
  guestEmail: { type: String, required: true }, // Guest email
  guestCellNo: { type: String, required: true }, // Guest phone
  totalCost: { type: Number, required: true }, // Total cost of the booking
  bookingDate: { type: Date, required: true, default: Date.now }, // Booking creation date
  checkInDate: { type: Date, required: true }, // Check-in date
  checkOutDate: { type: Date, required: true }, // Check-out date
  
});

// Export the Booking model
export default mongoose.model<Booking>('Booking', BookingSchema);
