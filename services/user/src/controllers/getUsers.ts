import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { User } from "@prisma/client";

const getUsers= async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findMany({});

    if (!user) {
      return res.status(404).json({ message: "no users found" });
    }
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

export default getUsers;
