import { Request, Response } from "express";
import Room, { Room as RoomModel } from "../models/Room";

import { z } from "zod";



// Delete a room by ID
const deleteRoom = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedRoom = await Room.findByIdAndDelete(id);
  
      if (!deletedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      res.status(204).send();
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Zod validation error
          
            res.status(400).json({ message: error.errors });
          } else {
        
            res.status(500).json({ message: (error as Error).message });
          }
    }
  };


export default deleteRoom