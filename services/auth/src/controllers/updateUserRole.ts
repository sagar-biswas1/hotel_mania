import { Response, Request, NextFunction } from "express";
import prisma from "@/prisma";

// Controller to update user role
const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // User ID to be updated
    const { role } = req.body;    // New role to be set

    if (!role) {
      return res.status(400).json({ message: "Role is required in request body" });
    }

    const validRoles = ["ADMIN", "USER", "MODERATOR"];
    if (!validRoles.includes(role.toUpperCase())) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Fetch the user by ID
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's role
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        role: role.toUpperCase(), 
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return res.json({
      message: `User role updated to ${role.toUpperCase()}`,
      user: updatedUser,
    });
  } catch (error) {
    next(error); // Handle errors properly
  }
};

export default updateUserRole;
