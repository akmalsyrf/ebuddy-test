import { Dispatch } from "@reduxjs/toolkit";
import { authActions, userActions } from "./reducers";
import { TFormData } from "@/types/formAuthData";
import { User, userLoginSchema, userRegisterSchema } from "@/apis/user";
import {
  getAllUserProfile,
  getUserProfile,
  loginUser,
  registerUser,
  checkAuth,
  createProfile,
  updateProfile,
} from "@/apis/userApi";
import { z } from "zod";
import { AppThunk } from "./store";
import { IUserProfile } from "@/types/profile";

export const { loginRequest, loginSuccess, loginFailure, logout } = authActions;

export const {
  fetchAllProfilesFailure,
  fetchAllProfilesRequest,
  fetchAllProfilesSuccess,
  fetchSelfProfileFailure,
  fetchSelfProfileRequest,
  fetchSelfProfileSuccess,
  createSelfProfileRequest,
  createSelfProfileSuccess,
  createSelfProfileFailure,
  updateSelfProfileRequest,
  updateSelfProfileSuccess,
  updateSelfProfileFailure,
} = userActions;

export const authUser = (
  path: "login" | "register",
  formData: TFormData
): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch(authActions.loginRequest());

    try {
      const schema = path === "login" ? userLoginSchema : userRegisterSchema;
      schema.parse(formData);

      const authData = {
        usernameOrEmail: formData.usernameOrEmail,
        password: formData.password,
        ...(path === "register" && {
          username: formData.username,
          role: formData.role || "USER",
          email: formData.email,
        }),
      };

      const response =
        path === "login"
          ? await loginUser(authData)
          : await registerUser(authData);
      const { token, account, profile } = response.content;

      dispatch(
        authActions.loginSuccess({
          account,
          token,
          profile
        })
      );
      dispatch(fetchSelfProfileRequest());
      const profiles = await getUserProfile(token, account.id);
      if (profiles === null) {
        dispatch(fetchSelfProfileFailure("Profile not found"));
      } else {
        dispatch(fetchSelfProfileSuccess(profiles));
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        dispatch(
          authActions.loginFailure(
            error.errors.map((err) => err.message).join(", ")
          )
        );
      } else {
        dispatch(authActions.loginFailure(error.message));
      }
    }
  };
};

export const checkAuthAction = (token: string): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await checkAuth(token)
      const { account, profile } = response.content;
      dispatch(
        authActions.loginSuccess({
          account,
          token,
          profile
        })
      )
    } catch (error) {
      console.error(error)
    }
  }
}

export const getAllUser = (token: string): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchSelfProfileRequest());
    try {
      const allProfile = await getAllUserProfile(token);
      dispatch(fetchAllProfilesSuccess(allProfile));
    } catch (error: any) {
      dispatch(userActions.fetchAllProfilesFailure(error.message));
    }
  };
};

export const createUser = (token: string, payload: User): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch(createSelfProfileRequest())
    try {
      const profile = await createProfile(token, payload)
      dispatch(createSelfProfileSuccess(profile.content.profile as IUserProfile))
    } catch (error: any) {
      dispatch(createSelfProfileFailure(error.message))
    }
  }
}

export const updateUser = (token: string, payload: User): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch(updateSelfProfileRequest())
    try {
      const profile = await updateProfile(token, payload)
      dispatch(updateSelfProfileSuccess(profile.content.profile as IUserProfile))
    } catch (error: any) {
      dispatch(updateSelfProfileFailure(error.message))
    }
  }
}
