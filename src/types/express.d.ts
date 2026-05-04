import { Request } from "express";
import { AdminType } from "./admin";

declare module "express-serve-static-core" {
  interface Request {
    admin?: AdminType | null;
  }
}