"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Paper,
  Grid,
  Container,
  Avatar,
} from "@mui/material";
import ProfileFields from "./ProfileFields";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { createUser, getUserById, updateUser } from "@/store/actions";

type TInputFields = {
  label: string;
  placeholder: string;
  type: "text" | "password" | "number";
  name: string;
};

const inputFields: TInputFields[] = [
  {
    label: "Full Name",
    placeholder: "Enter your full name",
    type: "text",
    name: "fullName",
  },
  { label: "Age", placeholder: "Enter your age", type: "number", name: "age" },
  { label: "City", placeholder: "Enter your city", type: "text", name: "city" },
  {
    label: "Street",
    placeholder: "Enter your street",
    type: "text",
    name: "street",
  },
  {
    label: "Bachelor",
    placeholder: "Enter your bachelor",
    type: "text",
    name: "bachelor",
  },
  {
    label: "Master",
    placeholder: "Enter your master",
    type: "text",
    name: "master",
  },
];

interface FormValues {
  accountId: string;
  fullName: string;
  age: number | "";
  address: string[];
  university: {
    bachelor: string;
    master: string;
  };
}

interface ProfileFormProps {
  id: string | null | undefined;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ id }) => {
  const dispatch: AppDispatch = useDispatch()
  const { account, profile } = useSelector((state: RootState) => state.auth);
  const { profileSelected } = useSelector((state: RootState) => state.user);
  const [ isCreateNew, setIsCreateNew ] = useState<boolean>(true)
  const [formValues, setFormValues] = useState<FormValues>({
    accountId: "",
    fullName: "",
    age: "",
    address: ["", ""],
    university: { bachelor: "", master: "" },
  });
  const router = useRouter();

  useEffect(() => {
    if (id) {
      dispatch(getUserById(String(localStorage.getItem("accessToken")), id))
      if (profileSelected) {
        const _profile = profileSelected as FormValues
        setFormValues((prevValues) => ({
          ...prevValues,
          ..._profile,
        }))
        setIsCreateNew(false)
      }
    }else if (profile && account) {
      const _profile = profile as FormValues
      setFormValues((prevValues) => ({
        ...prevValues,
        ..._profile,
        accountId: account!.id || ""
      }))
      setIsCreateNew(false)
    }
  }, [profile, account, id, profileSelected, dispatch])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => {
      if (name === "city" || name === "street") {
        const addressIndex = name === "city" ? 0 : 1;
        const newAddress = [...prevValues.address];
        newAddress[addressIndex] = value;
        return { ...prevValues, address: newAddress };
      } else if (name === "bachelor" || name === "master") {
        return {
          ...prevValues,
          university: { ...prevValues.university, [name]: value },
        };
      } else {
        return { ...prevValues, [name]: value };
      }
    });
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSave = async () => {
    if (isCreateNew) {
      dispatch(createUser(
        String(localStorage.getItem("accessToken")),
        { ...formValues, age: Number(formValues.age) }
      ))
    } else {
      dispatch(updateUser(
        String(localStorage.getItem("accessToken")),
        { ...formValues, age: Number(formValues.age) }
      ))
    }
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Profile Settings
        </Typography>
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          justifyContent="center"
          sx={{ marginTop: 2 }}
        >
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              textAlign: { xs: "center", sm: "left" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{ width: 120, height: 120, margin: { xs: "auto", sm: 0 } }}
              src="https://thispersondoesnotexist.com/"
            />
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Upload a picture
            </Button>
          </Grid>
          <Grid item xs={12} sm={8}>
            <ProfileFields
              inputFields={inputFields}
              formValues={formValues}
              onChange={handleChange}
              onCancel={handleCancel}
              onSave={handleSave}
              isCreateNew={isCreateNew}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfileForm;
