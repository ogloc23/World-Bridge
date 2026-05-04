export type AdminRole = "SUPER_ADMIN" | "ADMIN";

export interface AdminType {
  _id: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
}