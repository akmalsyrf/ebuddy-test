"use client";
import { createTheme } from "@mui/material/styles";

const body = "#F5F5F5";
const paper = "#FFFFFF";
const primary = "#424874";
const lightTitle = "#F4F6FF";
const lightText = "#B7B7B7";
const darkText = "#333";
const borderGray = "#DCD6F7";

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    background: {
      default: body,
      paper: paper,
    },
    text: {
      primary: darkText,
      secondary: lightTitle,
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      color: lightTitle,
      "@media (max-width:600px)": {
        fontSize: "1.8rem",
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.5rem",
      color: darkText,
      "@media (max-width:600px)": {
        fontSize: "1.2rem",
      },
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1rem",
      color: lightText,
      "@media (max-width:600px)": {
        fontSize: "0.8rem",
      },
    },
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontSize: "0.8rem",
      color: lightText,
    },
    caption: {
      fonstSize: "0.5rem",
      color: lightText,
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 20px",
        },
        containedPrimary: {
          backgroundColor: primary,
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: primary,
          },
        },
        outlined: {
          borderColor: borderGray,
          color: primary,
          "&:hover": {
            backgroundColor: lightTitle,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            backgroundColor: lightTitle,
            "& fieldset": {
              borderColor: borderGray,
            },
            "&:hover fieldset": {
              borderColor: primary,
            },
            "&.Mui-focused fieldset": {
              borderColor: primary,
            },
            "@media (max-width:600px)": {
              fontSize: "0.8rem",
            },
          },
          "& .MuiInputBase-input": {
            fontSize: "0.9rem",
            color: darkText,
            "@media (max-width:600px)": {
              fontSize: "0.8rem",
            },
          },

          "& .MuiInputAdornment-root": {
            "@media (min-width:600px)": {
              marginRight: "8px",
            },
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          margin: 0,
          fontSize: "1rem",
          color: lightText,
          left: "-4px",
          "@media (max-width:600px)": {
            fontSize: "0.9rem",
          },
        },
        shrink: {
          top: 0,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "1.5rem",
          "@media (max-width:600px)": {
            fontSize: "1.2rem",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "& a": {
            color: primary,
            textDecoration: "none",
            fontWeight: 500,
          },
        },
      },
    },
  },
});

export default theme;
