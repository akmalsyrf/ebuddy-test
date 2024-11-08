// formfield.tsx
import React, { useState } from "react";
import { Stack } from "@mui/material";
import TextInput from "../TextInput";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { TagOutlined } from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material/Select";
import SelectInput from "../SelectInput";
import { z } from "zod";
import { userLoginSchema, userRegisterSchema } from "@/apis/user";

interface IFormFieldsProps {
  path: "login" | "register";
  formData: {
    usernameOrEmail?: string;
    username?: string;
    role?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  showPassword: boolean;
  showConfirmPassword?: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onToggleShowPassword: () => void;
  onToggleShowConfirmPassword?: () => void;
}

const FormFields: React.FC<IFormFieldsProps> = ({
  path,
  formData,
  showPassword,
  showConfirmPassword,
  onChange,
  onToggleShowPassword,
  onToggleShowConfirmPassword,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    onChange({
      ...event,
      target: { name: event.target.name, value: event.target.value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const schema = path === "login" ? userLoginSchema : userRegisterSchema;

    try {
      schema.parse({
        ...formData,
        [name]: value,
      });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.find(
          (err) => err.path[0] === name
        )?.message;
        setErrors((prev) => ({
          ...prev,
          [name]: errorMessage,
        }));
      }
    }

    onChange(event);
  };

  const selectRoleRegisterOptions = [
    { label: "user", value: "USER" },
    { label: "admin", value: "ADMIN" },
  ];

  return (
    <Stack spacing={2} width="100%">
      {path === "register" ? (
        <>
          <TextInput
            label="Username"
            placeholder="Enter your username"
            type="text"
            name="username"
            value={formData.username || ""}
            startAdornmentIcon={<TagOutlined />}
            onChange={handleFormChange}
            errorMessage={errors.username}
          />
          <SelectInput
            label="Role"
            name="role"
            value={formData.role || "USER"}
            onChange={handleSelectChange}
            options={selectRoleRegisterOptions}
          />
          <TextInput
            label="Email"
            placeholder="Enter your email"
            type="text"
            name="email"
            value={formData.email || ""}
            startAdornmentIcon={<AccountCircleIcon />}
            onChange={handleFormChange}
            errorMessage={errors.email}
          />
        </>
      ) : (
        <TextInput
          label="Username or Email"
          placeholder="Enter your username or email"
          type="text"
          name="usernameOrEmail"
          value={formData.usernameOrEmail}
          startAdornmentIcon={<AccountCircleIcon />}
          onChange={handleFormChange}
          errorMessage={errors.usernameOrEmail}
        />
      )}

      <TextInput
        label="Password"
        placeholder="Enter your password"
        type="password"
        name="password"
        value={formData.password}
        showPassword={showPassword}
        onShowPasswordToggle={onToggleShowPassword}
        startAdornmentIcon={<LockIcon />}
        onChange={handleFormChange}
        errorMessage={errors.password}
      />

      {path === "register" && (
        <TextInput
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword || ""}
          showPassword={showConfirmPassword}
          onShowPasswordToggle={onToggleShowConfirmPassword}
          startAdornmentIcon={<LockIcon />}
          onChange={handleFormChange}
          errorMessage={errors.confirmPassword}
        />
      )}
    </Stack>
  );
};

export default FormFields;
