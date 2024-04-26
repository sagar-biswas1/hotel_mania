import { Request, Response } from "express";
import Booking, { Booking as BookingModel } from "../models/Booking";

// Get a single booking by ID
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Extract the booking ID from the request parameters

    // Fetch the booking with the specified ID
    const booking: BookingModel | null = await Booking.findById(id);

    if (!booking) {
      // If the booking is not found, return a 404 status
      return res.status(404).json({ message: "Booking not found" });
    }

    // Return the booking details with a 200 status
    return res.status(200).json(booking);
  } catch (error) {
    // Handle unexpected errors
    console.error("Error fetching booking by ID:", error);
    return res.status(500).json({ message: (error as Error).message });
  }
};

export default getBookingById;
