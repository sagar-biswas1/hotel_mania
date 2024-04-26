import { Request, Response } from 'express';
import Room, { Room as RoomModel } from '../models/Room';
import { RoomCreateSchema, RoomUpdateSchema, RoomAvailabilitySchema } from '../../schemas';
import { z } from 'zod';


// Update an existing room by ID
const updateRoom = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const validationResult = RoomUpdateSchema.safeParse(req.body);
  
      if (!validationResult.success) {
        return res.status(400).json({
          message: 'Validation error',
          errors: validationResult.error.issues,
        });
      }
  
      const updatedRoom = await Room.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      res.status(200).json(updatedRoom);
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Zod validation error
          
            res.status(400).json({ message: error.errors });
          } else {
        
            res.status(500).json({ message: (error as Error).message });
          }
    }
  };


  export default updateRoom