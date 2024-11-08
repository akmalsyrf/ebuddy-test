import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface ISelectInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: { label: string; value: string }[];
}

const SelectInput: React.FC<ISelectInputProps> = ({
  label,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange} label={label}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
