// controllers/orderController.ts
import { Request, Response } from "express";
import Booking , { Booking as BookingModel } from "../models/Booking";

 const getBookings = async (req: Request, res: Response) => {
  try {
    const orders: BookingModel[] = await Booking.find();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};


export default getBookings