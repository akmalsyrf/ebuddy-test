import { User } from "../../../packages/entities";
import { IUserAccount } from "@/types/auth";
import { IUserProfile } from "@/types/profile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  account: IUserAccount | null;
  profile: User | null;
  token?: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  isLoggedIn: boolean;
}

interface UserState {
  selfProfile: IUserProfile | null;
  allProfiles: IUserProfile[] | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialAuthState: AuthState = {
  account: null,
  token: null,
  profile: null,
  loading: false,
  error: null,
  success: false,
  isLoggedIn: false,
};

const initialUserState: UserState = {
  selfProfile: null,
  allProfiles: null,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ account: IUserAccount; token: string, profile: User | null }>
    ) => {
      state.loading = false;
      state.account = action.payload.account;
      state.profile = action.payload.profile;
      state.token = action.payload.token;
      state.success = true;
      state.isLoggedIn = true;
      if (action.payload.token) {
        localStorage.setItem("accessToken", action.payload.token);
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.isLoggedIn = false;
    },
    logout: (state) => {
      state.account = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
    },
    resetAuthState: (state) => {
      state.success = false;
    },
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    fetchSelfProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchSelfProfileSuccess: (state, action: PayloadAction<IUserProfile>) => {
      state.loading = false;
      state.selfProfile = action.payload;
      state.success = true;
    },
    fetchSelfProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    fetchAllProfilesRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchAllProfilesSuccess: (state, action: PayloadAction<IUserProfile[]>) => {
      state.loading = false;
      state.allProfiles = action.payload;
      state.success = true;
    },
    fetchAllProfilesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    createSelfProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createSelfProfileSuccess: (state, action: PayloadAction<IUserProfile>) => {
      state.loading = false;
      state.selfProfile = action.payload;
      state.success = true;
    },
    createSelfProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    updateSelfProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    updateSelfProfileSuccess: (state, action: PayloadAction<IUserProfile>) => {
      state.loading = false;
      state.selfProfile = action.payload;
      state.success = true;
    },
    updateSelfProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = true;
    },
  },
});

export const authActions = authSlice.actions;
export const userActions = userSlice.actions;

export const authReducer = authSlice.reducer;
export const userReducer = userSlice.reducer;
