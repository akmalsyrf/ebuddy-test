"use client"
import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, Link as MuiLink, Avatar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import NextLink from "next/link";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "@/store/actions";
import { IUserProfile } from "@/types/profile";

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch()
  const { allProfiles } = useSelector((state: RootState) => state.user);
  const [ userProfiles, setUserProfiles ] = useState<(IUserProfile & { color: string })[]>([])

  
  function getRandomHexColor(): string {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  }
  useEffect(() => {
    dispatch(getAllUser(String(localStorage.getItem("accessToken"))))
  }, [])

  useEffect(() => {
    if (allProfiles?.length) {
      const profilesWithColor = allProfiles.map(profile => ({
        ...profile,
        color: getRandomHexColor()
      }));
      setUserProfiles(profilesWithColor);
    }
  }, [allProfiles])

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Hi, Welcome back
      </Typography>

      <Grid container spacing={2}>
        {userProfiles.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MuiLink
              component={NextLink}
              href="#"
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
                <Box>
                  <Avatar
                    sx={{ width: 60, height: 60, margin: { xs: "auto", sm: 0 } }}
                    src="https://thispersondoesnotexist.com/"
                  />
                </Box>
                <Typography variant="h2" fontWeight="bold">
                  {item.age} y.o
                </Typography>
                <Typography variant="h2">{item.fullName}</Typography>
              </Paper>
            </MuiLink>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
