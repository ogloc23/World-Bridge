import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db";
import Admin from "../models/admin";

const seedSuperAdmin = async () => {
  try {
    await connectDB();

    // Check if super admin already exists
    const existingSuperAdmin = await Admin.findOne({ role: "SUPER_ADMIN" });

    if (existingSuperAdmin) {
      console.log("Super Admin already exists!");
      process.exit(0);
    }

    // Create super admin
    const hashedPassword = await bcrypt.hash("superadmin123", 10);

    const superAdmin = new Admin({
      email: "superadmin@consignment.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    });

    await superAdmin.save();

    console.log("Super Admin created successfully!");
    console.log("Email: superadmin@consignment.com");
    console.log("Password: superadmin123");
    console.log("Please change the password after first login.");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding super admin:", error);
    process.exit(1);
  }
};

seedSuperAdmin();
