"use client";
import { checkAuthAction } from "@/store/actions";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();
  const token: string | null = localStorage.getItem("accessToken")
  useEffect(() => {
    if (token) {
      dispatch(checkAuthAction(token))
    }
  }, [token, dispatch])
  return children;
};

export default AuthProvider;
