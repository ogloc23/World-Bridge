export interface Context {
  admin?: {
    _id: string;
    email: string;
    role: "SUPER_ADMIN" | "ADMIN";
    isActive: boolean;
  };
}
