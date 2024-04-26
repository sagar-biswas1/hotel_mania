import { Request, Response } from "express";
import Room, { Room as RoomModel } from "../models/Room";

import { z } from "zod";

// Get all rooms with pagination and sorting
 const getRooms = async (req: Request, res: Response) => {
  try {
    const page: number = parseInt(req.query.page as string, 10) || 1; // Cast to number and provide default
    const limit: number = parseInt(req.query.limit as string, 10) || 10; // Cast to number and provide default
    const { sortBy = "updatedAt", sortType = "desc" } = req.query;

    const rooms = await Room.find()
      .skip(Number((page - 1) * limit))
      .limit(Number(limit))
      .sort({ [sortBy as string]: sortType === "asc" ? 1 : -1 });

    res.status(200).json(rooms);
  } catch (error) {
    if (error instanceof z.ZodError) {
        // Zod validation error
      
        res.status(400).json({ message: error.errors });
      } else {
    
        res.status(500).json({ message: (error as Error).message });
      }
  }
};


export default getRooms