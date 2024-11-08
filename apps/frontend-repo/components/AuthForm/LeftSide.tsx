import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface LeftSideProps {
  path: "login" | "register";
}

const LeftSide: React.FC<LeftSideProps> = ({ path }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "50%",
        bgcolor: theme.palette.primary.main,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Typography variant="h1">
        {path === "login" ? "Welcome back!" : "Hello there!"}
      </Typography>
      <Typography variant="subtitle1" align="center">
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus,
        similique."
      </Typography>
    </Box>
  );
};

export default LeftSide;
