import axios from "axios";
import { BookingCreateSchema } from "../schemas";
import { z } from "zod";
// controllers/orderController.ts
import { Request, Response } from "express";
import Booking, { Booking as BookingModel } from "../models/Booking";
import { EMAIL_SERVICE } from "../config";

const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const newBody = { ...req.body };
    
    newBody.bookingDate = new Date(newBody.bookingDate).toISOString();
    newBody.checkInDate = new Date(newBody.checkInDate).toISOString();
    newBody.checkOutDate = new Date(newBody.checkOutDate).toISOString();
    
    const parsedBody = BookingCreateSchema.parse(newBody);
    // parsedBody.orderDate= new Date();
    // parsedBody.deliveryDate= new Date();
    const booking = new Booking(parsedBody);
    const savedBooking = await booking.save();
    await axios.post(`${EMAIL_SERVICE}/emails/send`, {
      recipient: savedBooking.guestEmail,
      subject: "Booking Confirmed",
      body: `Your reservation is successfull for room id ${savedBooking.roomID} . And the reservation date is ${savedBooking.checkInDate} - ${savedBooking.checkOutDate}`,
      source: "user-booking",
    });
    res.status(201).json(savedBooking);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Zod validation error
      console.log("error 22");
      res.status(400).json({ message: error.errors });
    } else {
      // Other error (e.g., database error)
      console.log("error 26");
      res.status(500).json({ message: (error as Error).message });
    }
  }
};

export default createBooking;
