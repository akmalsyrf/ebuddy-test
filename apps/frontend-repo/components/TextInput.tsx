import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface ITextInputProps {
  label: string;
  placeholder: string;
  type: "text" | "password" | "number";
  name: string;
  value: any;
  showPassword?: boolean;
  onShowPasswordToggle?: () => void;
  startAdornmentIcon?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

const TextInput: React.FC<ITextInputProps> = ({
  label,
  placeholder,
  type,
  name,
  value,
  showPassword,
  onShowPasswordToggle,
  startAdornmentIcon,
  onChange,
  errorMessage,
}) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      type={type === "password" && showPassword ? "text" : type}
      name={name}
      value={value}
      onChange={onChange}
      error={Boolean(errorMessage)}
      helperText={errorMessage}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{startAdornmentIcon}</InputAdornment>
        ),
        endAdornment: onShowPasswordToggle && (
          <InputAdornment position="end">
            <IconButton onClick={onShowPasswordToggle} edge="end" disableRipple>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TextInput;
