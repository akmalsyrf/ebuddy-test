import dotenv from "dotenv";

dotenv.config();

export const AUTH_SERVICE = process.env.NEXT_PUBLIC_AUTH_SERVICE as string;
export const PROFILE_SERVICE = process.env
  .NEXT_PUBLIC_PROFILE_SERVICE as string;
