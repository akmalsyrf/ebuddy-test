import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Link,
  Typography,
  CircularProgress,
} from "@mui/material";
import FormFields from "./FormFields";
import { Google } from "@mui/icons-material";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "@/store/actions";
import { AppDispatch, RootState } from "@/store/store";
import { authSchema, userRegisterSchema } from "../../../../packages/entities";
import StatusProcess from "../StatusProcess";
import { useRouter } from "next/navigation";
import { authActions } from "@/store/reducers";

interface RightSideProps {
  path: "login" | "register";
}

type TFormData = {
  usernameOrEmail: string;
  username?: string;
  role?: "ADMIN" | "USER";
  email?: string;
  password: string;
  confirmPassword?: string;
};

const RightSide: React.FC<RightSideProps> = ({ path }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<TFormData>({
    usernameOrEmail: "",
    username: "",
    role: "USER",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const { loading, success } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    try {
      const schema = path === "register" ? userRegisterSchema : authSchema;
      schema.parse(formData);
      setIsFormValid(true);
    } catch (e) {
      setIsFormValid(false);
    }
  }, [formData, path]);

  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        router.push("/");
        setFormData({
          usernameOrEmail: "",
          username: "",
          role: "USER",
          email: "",
          password: "",
          confirmPassword: "",
        });
        dispatch(authActions.resetAuthState());
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [success, dispatch, router]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(authUser(path, formData));
  };

  const title = path === "login" ? "Login" : "Register";
  const subtitle =
    path === "login"
      ? "Welcome back! Please enter your credentials to log in."
      : "Please enter your details to create an account.";

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "50%" },
        p: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
        {subtitle}
      </Typography>

      <form style={{ width: "100%" }} onSubmit={handleAuth}>
        <FormFields
          path={path}
          formData={formData}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          onChange={handleChange}
          onToggleShowPassword={handleClickShowPassword}
          onToggleShowConfirmPassword={handleClickShowConfirmPassword}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5 }}
          disabled={loading || !isFormValid}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : path === "login" ? (
            "Login"
          ) : (
            "Register"
          )}
        </Button>
      </form>

      <StatusProcess
        successMessage={
          path === "register"
            ? "Registration Successfully!"
            : "Login Succesfully"
        }
        module="auth"
      />

      <Divider sx={{ width: "100%", my: 3 }}>or</Divider>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<Google />}
        sx={{ py: 1.5 }}
      >
        Continue with Google
      </Button>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" align="center">
          {path === "login"
            ? "Don’t have an account? "
            : "Already have an account? "}
          <Link
            component={NextLink}
            href={path === "login" ? "/register" : "/login"}
            underline="none"
            color="primary"
          >
            {path === "login" ? "Register" : "Login"}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RightSide;
