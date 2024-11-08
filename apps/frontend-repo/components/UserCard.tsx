"use client";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

interface UserCardProps {
  avatarUrl: string;
  name: string;
  role: string;
  location: string;
}

const UserCard: React.FC<UserCardProps> = ({
  avatarUrl,
  name,
  role,
  location,
}) => {
  return (
    <Card sx={{ width: 200, textAlign: "center", m: 1 }}>
      <Box sx={{ bgcolor: "primary.main", padding: 2 }}>
        <Avatar
          src={avatarUrl}
          sx={{ width: 80, height: 80, margin: "auto" }}
        />
      </Box>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {role}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {location}
        </Typography>
        <Button variant="outlined" size="small" color="primary" sx={{ mt: 2 }}>
          Add Friend
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
