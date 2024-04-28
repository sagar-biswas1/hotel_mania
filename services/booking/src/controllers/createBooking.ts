import axios from "axios";
import { BookingCreateSchema } from "../schemas";
import { z } from "zod";
// controllers/orderController.ts
import { Request, Response } from "express";
import Booking, { Booking as BookingModel } from "../models/Booking";
import {
  EMAIL_SERVICE,
  ROOM_DETAILS,
  UPDATE_ROOM_AVAILABLE_DATES,
} from "../config";

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

    const { data } = await axios.get(`${ROOM_DETAILS}/${savedBooking.roomID}`);

    // Utility function to remove dates within a range
    const restDates = () => {
      const startDate = new Date(newBody.checkInDate).getTime(); // Convert to timestamp
      const endDate = new Date(newBody.checkOutDate).getTime(); // Convert to timestamp

      // Filter out dates within the specified range
      return data.availability.filter((date) => {
        const dateTimestamp = new Date(date).getTime();
        return dateTimestamp < startDate || dateTimestamp > endDate;
      });
    };

     await axios.patch(
      `${UPDATE_ROOM_AVAILABLE_DATES}/${savedBooking.roomID}`,
      { dates: restDates() }
    );

    await axios.post(`${EMAIL_SERVICE}/emails/send`, {
      recipient: savedBooking.guestEmail,
      subject: "Booking Confirmed",
      body: `Your reservation is successfull for room id ${savedBooking.roomID} . And the reservation date is ${savedBooking.checkInDate} - ${savedBooking.checkOutDate}`,
      source: "user-booking",
    });
    res.status(201).json(savedBooking);
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      // Zod validation error
      res.status(400).json({ message: error.errors });
    } else {
      // Other error (e.g., database error)

      res.status(500).json({ message: (error as Error).message });
    }
  }
};

export default createBooking;
