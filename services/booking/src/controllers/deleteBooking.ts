// controllers/orderController.ts
import { Request, Response } from "express";
import Booking , { Booking as OrderModel } from "../models/Booking";

const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find the order by ID and delete it
    const orderId = req.params.id;
    const deletedOrder = await Booking.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};


export default deleteBooking