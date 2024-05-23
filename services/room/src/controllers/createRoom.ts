import { Request, Response } from 'express';
import Room, { Room as RoomModel } from '../models/Room';
import { RoomCreateSchema, RoomUpdateSchema, RoomAvailabilitySchema } from '../../schemas';
import { z } from 'zod';



// Add a new room
const createRoom = async (req: Request, res: Response) => {
    try {
console.log("hello world")
      // Validate request data
      const validationResult = RoomCreateSchema.safeParse(req.body);
  
      if (!validationResult.success) {
        return res.status(400).json({
          message: 'Validation error',
          errors: validationResult.error.issues,
        });
      }
  
      const newRoom = new Room(req.body);
      const savedRoom = await newRoom.save();
  
      res.status(201).json(savedRoom);
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Zod validation error
          
            res.status(400).json({ message: error.errors });
          } else {
        
            res.status(500).json({ message: (error as Error).message });
          }
    }
  };

  export default createRoom