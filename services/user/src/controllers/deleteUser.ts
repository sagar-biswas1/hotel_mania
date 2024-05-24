import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma'; // Import your Prisma instance

// Delete user by ID
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Try to find the user by ID
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user from the database
    await prisma.user.delete({ where: { id } });

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error); 
  }
};

export default deleteUser;
