import { Request, Response } from 'express';
import Room, { Room as RoomModel } from '../models/Room';
import { RoomCreateSchema, RoomUpdateSchema, RoomAvailabilitySchema } from '../../schemas';
import { z } from 'zod';



// Patch room availability
const updateRoomAvailability = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
console.log(req.body)

      const validationResult = RoomAvailabilitySchema.safeParse(req.body);
  
      if (!validationResult.success) {
        return res.status(400).json({
          message: 'Validation error',
          errors: validationResult.error.issues,
        });
      }
  
      const room = await Room.findById(id);
  
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      const { dates } = req.body;
  
      // Add or remove dates from the room's availability
      room.availability = dates;
  
      const updatedRoom = await room.save();
  
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


export default updateRoomAvailability;