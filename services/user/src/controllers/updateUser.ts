import { Request, Response, NextFunction } from "express";
import { UserUpdateSchema } from "@/schemas"; // Import your update schema
import prisma from "@/prisma";

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the request body
    const reqData = req.body;
    if (reqData.birthDate) {
      reqData.birthDate = new Date(reqData.birthDate).toISOString();
    }
    const parsedBody = UserUpdateSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ message: parsedBody.error.errors });
    }

    // Extract userId from request params
    const userId = req.params.id;

    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
console.log("asdasd",parsedBody.data)
    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: parsedBody.data,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export default updateUser;
