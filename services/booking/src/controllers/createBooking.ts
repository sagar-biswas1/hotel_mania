import axios from "axios";
import { BookingCreateSchema } from "../schemas";
import { z } from "zod";
import { Request, Response } from "express";
import Booking, { Booking as BookingModel } from "../models/Booking";
import {
  EMAIL_SERVICE,
  ROOM_DETAILS,
  UPDATE_ROOM_AVAILABLE_DATES,
} from "../config";
import sendToQueue from "../queue";

const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const newBody = { ...req.body };
    console.log("hello",`${ROOM_DETAILS}/${newBody.roomID}`)
    const { data } = await axios.get(`${ROOM_DETAILS}/${newBody.roomID}`, {
      headers: {
        ip: req.ip,
        "user-agent": req.headers["user-agent"],
        origin: process.env.BASE_URL_BOOKING,
      },
    });
    console.log("world")
    // newBody.bookingDate = new Date(newBody.bookingDate).toISOString();
    // newBody.checkInDate = new Date(newBody.checkInDate).toISOString();
    // newBody.checkOutDate = new Date(newBody.checkOutDate).toISOString();
    const checkInDate = new Date(newBody.checkInDate).toISOString();
    const checkOutDate = new Date(newBody.checkOutDate).toISOString();

    // Check if the check-in date is available in the availability array
    const isCheckInDateAvailable = data.availability.some(
      (availableDate) => new Date(availableDate).toISOString() === checkInDate
    );

    if (!isCheckInDateAvailable) {
      res.status(400).json({
        message: "Check-in date is not available.",
      });

      return;
    }

    newBody.bookingDate = new Date(newBody.bookingDate).toISOString();
    newBody.checkInDate = checkInDate;
    newBody.checkOutDate = checkOutDate;
    const parsedBody = BookingCreateSchema.parse(newBody);
    // parsedBody.orderDate= new Date();
    // parsedBody.deliveryDate= new Date();
    const booking = new Booking(parsedBody);
    const savedBooking = await booking.save();

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
      { dates: restDates() },
      {
        headers: {
          ip: req.ip,
          "user-agent": req.headers["user-agent"],
          origin: process.env.BASE_URL_BOOKING,
        },
      }
    );

    // await axios.post(`${EMAIL_SERVICE}/emails/send`, {
    //   recipient: savedBooking.guestEmail,
    //   subject: "Booking Confirmed",
    //   body: `Your reservation is successfull for room id ${savedBooking.roomID} . And the reservation date is ${savedBooking.checkInDate} - ${savedBooking.checkOutDate}`,
    //   source: "user-booking",
    // });
    sendToQueue("send-email", JSON.stringify(savedBooking));
    res.status(201).json(savedBooking);
  } catch (error) {
    //console.log(error);
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
