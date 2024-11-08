import React from "react";
import { Grid, Box, Button, Typography, Link } from "@mui/material";
import TextInput from "../TextInput";
import StatusProcess from "../StatusProcess";

type TInputFields = {
  label: string;
  placeholder: string;
  type: "text" | "password" | "number";
  name: string;
};

interface ProfileFieldsProps {
  isCreateNew: boolean;
  inputFields: TInputFields[];
  formValues: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel?: () => void;
  onSave?: () => void;
}

const ProfileFields: React.FC<ProfileFieldsProps> = ({
  isCreateNew,
  inputFields,
  formValues,
  onChange,
  onCancel,
  onSave,
}) => {
  return (
    <form>
      <Grid container spacing={2}>
        {inputFields.map((field) => (
          <Grid item xs={12} sm={6} key={field.name}>
            <TextInput
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              name={field.name}
              value={formValues[field.name as keyof typeof formValues]}
              onChange={onChange}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Box textAlign="center" marginTop={2}>
            <Link
              href="#"
              color="error"
              underline="hover"
              sx={{ display: "block", marginBottom: 1 }}
            >
              Delete Your Account
            </Link>
            <Typography variant="caption">
              You will receive an email to confirm your decision.
              <br />
              Please note that all boards you have created will be permanently
              erased.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onSave}
          >
            {isCreateNew ? "Save" : "Update"}
          </Button>
        </Grid>
      </Grid>
      <StatusProcess
        successMessage={isCreateNew ? "Save profile success" : "Update profile success"}
        module="user"
      />
    </form>
  );
};

export default ProfileFields;
