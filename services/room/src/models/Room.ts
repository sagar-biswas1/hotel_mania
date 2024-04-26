import mongoose, { Schema, Document } from "mongoose";

// Extend Mongoose Document to define the Room type with necessary properties
export interface Room extends Document {
  type: string; // Room type (e.g., single, double, suite)
  name: string; // Room name
  description: string; // Room description
  amenities: string[]; // List of amenities
  price: number; // Pricing information
  capacity: number; // Maximum capacity of the room
  availability: Date[]; // Array of available dates
  createdAt: Date; // Timestamp for when the room was created
  updatedAt: Date; // Timestamp for when the room was last updated
}

// Define the schema for Room
const RoomSchema: Schema = new Schema(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    amenities: { type: [String], required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    availability: { type: [Date], required: true }, // Array of available dates
  },
  {
    timestamps: true, // This will add `createdAt` and `updatedAt` automatically
  }
);

export default mongoose.model<Room>("Room", RoomSchema);
