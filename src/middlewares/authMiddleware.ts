import jwt from "jsonwebtoken";
import Admin from "../models/admin";
import { Request, Response, NextFunction } from "express";

type JwtPayload = {
  id: string;
};

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  req.admin = null;

  if (!authHeader?.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.split(" ")[1];

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const admin = await Admin.findById(decoded.id);

    if (admin && admin.isActive) {
      req.admin = {
        _id: admin._id.toString(),
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
      };
    }
  } catch {
    req.admin = null;
  }

  next();
};
