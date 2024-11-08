export interface IUserAccount {
  id?: string;
  username?: string;
  email?: string;
  role?: "ADMIN" | "USER";
}
