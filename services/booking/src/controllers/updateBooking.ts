import { BookingCreateSchema } from "../schemas";
import { Request, Response } from "express";
import { z } from "zod";
import Booking, { Booking as BookingModel } from "../models/Booking";
const updateBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const newBody = { ...req.body };
    if (newBody.bookingDate) {
      newBody.bookingDate = new Date(newBody.bookingDate).toISOString();
    }
    if (newBody.checkInDate) {
      newBody.checkInDate = new Date(newBody.checkInDate).toISOString();
    }
    if (newBody.checkOutDate) {
      new Date(newBody.checkOutDate).toISOString();
    }
    // Validate request body against Zod schema
    const validatedData = BookingCreateSchema.parse(newBody);

    // Find the order by ID
    const bookingId = req.params.id;
    const existingBooking = await Booking.findById(bookingId);
    if (!existingBooking) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    // Update the order
    Object.assign(existingBooking, validatedData);
    const updatedOrder = await existingBooking.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Zod validation error
      res.status(400).json({ message: error.errors });
    } else {
      // Other error (e.g., database error)
      res.status(500).json({ message: (error as Error).message });
    }
  }
};

export default updateBooking;
