import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminRepository from "../repositories/auth.repo";

const adminRepo = new AdminRepository();

class AuthService {
  // 🔐 LOGIN ADMIN
  async login(email: string, password: string) {
    const admin = await adminRepo.findOne({ email });

    if (!admin) {
      throw new Error("Invalid credentials");
    }

    if (!admin.isActive) {
      throw new Error("Account is deactivated");
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    return {
      token,
      admin,
    };
  }

  // 👤 GET CURRENT ADMIN (ME)
  async me(adminId: string) {
    const admin = await adminRepo.findById(adminId);

    if (!admin) {
      throw new Error("Admin not found");
    }

    return admin;
  }

  // ➕ CREATE ADMIN (ONLY FOR SUPER_ADMIN LOGIC LATER)
  async createAdmin(data: {
    email: string;
    password: string;
    role?: "SUPER_ADMIN" | "ADMIN";
  }) {
    if (!data.email || !data.password) {
      throw new Error("Email and password are required");
    }
    const existing = await adminRepo.findOne({ email: data.email });

    if (existing) {
      throw new Error("Admin already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const admin = await adminRepo.create({
      ...data,
      role: data.role || "ADMIN",
      password: hashedPassword,
    });

    return admin;
  }

  // 👥 GET ALL ADMINS
  async getAllAdmins() {
    return adminRepo.findMany({});
  }

  // ❌ DEACTIVATE ADMIN
  async deactivateAdmin(id: string) {
    return adminRepo.update({ _id: id }, { isActive: false });
  }
}

export default AuthService;
