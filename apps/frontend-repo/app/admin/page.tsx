import React from "react";
import { Box, Grid, Paper, Typography, Link as MuiLink } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import NextLink from "next/link";

const Dashboard = () => {
  const data = [
    {
      icon: <AccountCircle sx={{ fontSize: 60 }} />,
      value: "714k",
      label: "User",
      color: "#E3F2FD",
      href: "/admin/user",
    },
    {
      icon: <AccountCircle sx={{ fontSize: 60 }} />,
      value: "1.35m",
      label: "Coming Soon",
      color: "#BBDEFB",
      href: "#",
    },
    {
      icon: <AccountCircle sx={{ fontSize: 60 }} />,
      value: "1.72m",
      label: "Coming Soon",
      color: "#FFF9C4",
      href: "#",
    },
    {
      icon: <AccountCircle sx={{ fontSize: 60 }} />,
      value: "234",
      label: "Coming Soon",
      color: "#FFCDD2",
      href: "#",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Hi, Welcome back
      </Typography>

      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MuiLink
              component={NextLink}
              href={item.href}
              underline="none"
              sx={{ textDecoration: "none" }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: item.color,
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.2s ease-in-out",
                  },
                  height: { xs: "150px", md: "180px" },
                  width: "100%",
                }}
              >
                <Box>{item.icon}</Box>
                <Typography variant="h2" fontWeight="bold">
                  {item.value}
                </Typography>
                <Typography variant="h2">{item.label}</Typography>
              </Paper>
            </MuiLink>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
