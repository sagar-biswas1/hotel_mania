import { Request, Response } from "express";
import Room, { Room as RoomModel } from "../models/Room";

import { z } from "zod";


// Get a specific room by ID
 const getRoomById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const room = await Room.findById(id);
  
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      res.status(200).json(room);
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Zod validation error
          
            res.status(400).json({ message: error.errors });
          } else {
        
            res.status(500).json({ message: (error as Error).message });
          }
    }
  };
  

  export default getRoomById