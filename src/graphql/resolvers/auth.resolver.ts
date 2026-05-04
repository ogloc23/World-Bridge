import AuthService from "../../services/auth.service";
import { Context } from "../../types/context";

const authService = new AuthService();

const authResolver = {
  Query: {
    me: async (_: unknown, __: unknown, context: Context) => {
      if (!context.admin) {
        throw new Error("Not authenticated");
      }

      return context.admin;
    },
    admins: async (_: unknown, __: unknown, context: Context) => {
      // Only SUPER_ADMIN can view all admins
      if (!context.admin || context.admin.role !== "SUPER_ADMIN") {
        throw new Error("Unauthorized");
      }

      return authService.getAllAdmins();
    },
  },

  Mutation: {
    loginAdmin: async (
      _: unknown,
      { input }: { input: { email: string; password: string } },
    ) => {
      return authService.login(input.email, input.password);
    },

    createAdmin: async (
      _: unknown,
      {
        input,
      }: {
        input: {
          email: string;
          password: string;
          role?: "SUPER_ADMIN" | "ADMIN";
        };
      },
      context: Context,
    ) => {
      // 🔐 Only SUPER_ADMIN can create another admin
      if (!context.admin || context.admin.role !== "SUPER_ADMIN") {
        throw new Error("Unauthorized");
      }

      return authService.createAdmin(input);
    },

    deactivateAdmin: async (
      _: unknown,
      { adminId }: { adminId: string },
      context: Context,
    ) => {
      if (!context.admin || context.admin.role !== "SUPER_ADMIN") {
        throw new Error("Unauthorized");
      }

      return authService.deactivateAdmin(adminId);
    },
  },
};

export default authResolver;
