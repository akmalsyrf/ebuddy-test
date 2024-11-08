import { AUTH_SERVICE, PROFILE_SERVICE } from "@/constant/constant";
import axios from "axios";
import { User } from "./user";

interface RegisterData {
  username?: string;
  role?: string;
  email?: string;
  password?: string;
}

interface LoginData {
  usernameOrEmail: string;
  password: string;
}

interface AuthResponseData {
  message: string;
  content: {
    account: {
      id: string;
      username: string;
      email: string;
      role: "ADMIN" | "USER";
    };
    profile: User | null;
    token: string;
  };
  debug?: {
    requestId: string;
  };
}

interface UserProfile {
  id: string;
  accountId: string;
  fullName: string;
  age: number;
  address: string[];
  university: {
    bachelor: string;
    master: string;
  };
}

interface AllProfileResponseData {
  message: string;
  content: {
    account: UserProfile;
    token: string;
    profile: User
  };
  debug?: {
    requestId: string;
  };
}

interface ProfileResponseData {
  message: string;
  content: UserProfile[];
  debug?: {
    requestId: string;
  };
}

export const loginUser = async (
  loginData: LoginData
): Promise<AuthResponseData> => {
  try {
    const response = await axios.post(`${AUTH_SERVICE}/login`, loginData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const checkAuth = async (access_token: string): Promise<AuthResponseData> => {
  try {
    const response = await axios.get(`${AUTH_SERVICE}/check-auth`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data?.message || "Login failed");
  }
}

export const registerUser = async (
  registerData: RegisterData
): Promise<AuthResponseData> => {
  try {
    const response = await axios.post(`${AUTH_SERVICE}/register`, registerData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Register failed");
  }
};

export const createProfile = async (
  access_token: string,
  payload: User
): Promise<AllProfileResponseData> => {
  try {
    if (!access_token) throw new Error("Access token required");
    const response = await axios.post(`${PROFILE_SERVICE}`, payload, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed create profile");
  }
}

export const updateProfile = async (
  access_token: string,
  payload: User
): Promise<AllProfileResponseData> => {
  try {
    if (!access_token) throw new Error("Access token required");
    const response = await axios.put(`${PROFILE_SERVICE}`, payload, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed update profile");
  }
}

export const getUserProfileById = async (
  access_token: string,
  id: string
): Promise<AllProfileResponseData> => {
  try {
    if (!access_token) throw new Error("Access token required");
    const response = await axios.get(`${PROFILE_SERVICE}/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed get user by id");
  }
};

export const getAllUserProfile = async (
  access_token: string
): Promise<UserProfile[]> => {
  try {
    if (!access_token) throw new Error("Access token required");
    const response = await axios.get(`${PROFILE_SERVICE}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data.content;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed get all user profile"
    );
  }
};

export const getUserProfile = async (
  access_token: string,
  accountId: string
): Promise<UserProfile | null> => {
  try {
    if (!access_token) throw new Error("Access token required");
    const response = await axios.get(`${PROFILE_SERVICE}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const userProfile = response.data.content.find(
      (profile: UserProfile) => profile.accountId === accountId
    );
    if (!userProfile) {
      return null;
    }
    return userProfile;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed get user profile");
  }
};
