"use client";
import React from "react";
import { Box, useTheme, Container } from "@mui/material";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

interface AuthFormProps {
  path: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ path }) => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingY: "4rem",
        maxWidth: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: 900,
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: theme.palette.background.paper,
        }}
      >
        <LeftSide path={path} />
        <RightSide path={path} />
      </Box>
    </Container>
  );
};

export default AuthForm;
