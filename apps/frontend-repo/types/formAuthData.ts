export type TFormData = {
  usernameOrEmail: string;
  username?: string;
  role?: "ADMIN" | "USER";
  email?: string;
  password: string;
  confirmPassword?: string;
};
