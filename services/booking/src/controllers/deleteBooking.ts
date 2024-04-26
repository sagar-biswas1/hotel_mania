// controllers/orderController.ts
import { Request, Response } from "express";
import Booking, { Booking as OrderModel } from "../models/Booking";
import {
  EMAIL_SERVICE,
  ROOM_DETAILS,
  UPDATE_ROOM_AVAILABLE_DATES,
} from "../config";
import axios from "axios";

const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find the order by ID and delete it
    const bookingId = req.params.id;
    const bookingDetails = await Booking.findById(bookingId);

    if (!bookingDetails) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }
    const checkInDate = new Date(bookingDetails.checkInDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const timeDifference = checkInDate.getTime() - currentDate.getTime();
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    if (daysDifference < 2) {
      res.status(400).json({ message: "You can not cancle the booking" });
      return;
    }
    const { data } = await axios.get(
      `${ROOM_DETAILS}/${bookingDetails.roomID}`
    );

    const generateDateRange = () => {
      const dates: Date[] = [];
      let currentDate = new Date(checkInDate);

      while (currentDate <= new Date(bookingDetails.checkOutDate)) {
        dates.push(new Date(currentDate)); // Add current date to array
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }
      return dates;
    };

    const updatedAvailableDates = Array.from(
      new Set([...data.availability, ...generateDateRange()])
    ).sort((a, b) => {
      return new Date(a).getTime() -new Date(b).getTime(); // Sort based on timestamp
    });;

    await axios.patch(
      `${UPDATE_ROOM_AVAILABLE_DATES}/${bookingDetails.roomID}`,
      { dates: updatedAvailableDates }
    );

    const deletedOrder = await Booking.findByIdAndDelete(bookingId);

    if (!deletedOrder) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default deleteBooking;
