"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Link,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NextLink from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { authActions } from "@/store/reducers";

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { account, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    router.push("/login");
  };

  const userRole = account?.role || "USER";

  const navLinks = [
    { label: "Home", path: "/", role: "USER", isAuth: true },
    { label: "Profile", path: "/profile", role: "USER", isAuth: true },
    { label: "Dashboard", path: "/admin", role: "ADMIN", isAuth: true },
    { label: "Login", path: "/login", role: "USER", isAuth: false },
    { label: "Register", path: "/register", role: "USER", isAuth: false },
  ];

  const filteredNavLinks = navLinks.filter((link) => {
    const authMatch = isLoggedIn ? link.isAuth : !link.isAuth;
    const roleMatch = userRole === "ADMIN" || link.role === "USER";
    return authMatch && roleMatch;
  });

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer", textDecoration: "none" }}
          component={NextLink}
          href="/"
          color="inherit"
        >
          MyApp
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {filteredNavLinks.map((link) => (
            <Link
              key={link.label}
              color="inherit"
              href={link.path}
              component={NextLink}
              sx={{
                marginLeft: 2,
                textDecoration: "none",
                padding: 1,
                fontSize: "1rem",
              }}
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn && (
            <Button color="inherit" onClick={handleLogout} sx={{ paddingY: 1 }}>
              Logout
            </Button>
          )}
        </Box>

        <IconButton
          edge="end"
          color="inherit"
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>

        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          <List sx={{ width: 250 }}>
            {filteredNavLinks.map((link) => (
              <ListItem
                key={link.label}
                component={NextLink}
                href={link.path}
                sx={{ textDecoration: "none" }}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
            {isLoggedIn && (
              <ListItem component="button" onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
