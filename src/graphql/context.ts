// import jwt from "jsonwebtoken";
// import Admin from "../models/admin";

// export const createContext = async ({ req }) => {
//   const token = req.headers.authorization || "";

//   let admin = null;

//   if (token.startsWith("Bearer ")) {
//     try {
//       const decoded = jwt.verify(
//         token.split(" ")[1],
        
//         process.env.JWT_SECRET
//       );

//       admin = await Admin.findById(decoded.id);
//     } catch (err) {
//       admin = null;
//     }
//   }

//   return { admin };
// };


// import jwt from "jsonwebtoken";
// import Admin from "../models/admin";
// import { Request } from "express";

// type JwtPayload = {
//   id: string;
//   email?: string;
//   role?: "SUPER_ADMIN" | "ADMIN";
// };

// export const createContext = async ({ req }: { req: Request }) => {
//   const authHeader = req.headers.authorization;

//   let admin = null;

//   if (authHeader?.startsWith("Bearer ")) {
//     const token = authHeader.split(" ")[1];

//     const secret = process.env.JWT_SECRET;
//     if (!secret) throw new Error("JWT_SECRET is not defined");

//     try {
//       const decoded = jwt.verify(token, secret) as JwtPayload;

//       admin = await Admin.findById(decoded.id);
//     } catch {
//       admin = null;
//     }
//   }

//   return { admin };
// };


import { Request } from "express";

export const createContext = ({ req }: { req: Request }) => {
  return {
    admin: req.admin || null,
  };
};