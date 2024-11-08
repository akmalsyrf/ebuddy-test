"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h2">Welcome to homepage</Typography>
    </Box>
  );
}
