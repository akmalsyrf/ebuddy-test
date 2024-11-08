"use client";
import React, { useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import TableRowComponent from "@/components/Tables/Rows";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "@/store/actions";
import { AppDispatch, RootState } from "@/store/store";
import { IUserProfile } from "@/types/profile";

const headers = [
  "ID",
  "Full Name",
  "Age",
  "Address",
  "Bachelor",
  "Master",
  "Actions",
];

const TableComponent = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { token, account } = useSelector((state: RootState) => state.auth);
  const { allProfiles, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (account && account.role === "ADMIN" && token) {
      dispatch(getAllUser(token));
    }
  }, [account, token, dispatch]);

  const handleView = (id: string) => {
    router.push(`/admin/user/${id}`);
  };

  const handleDelete = (id: string) => {
    console.log("Delete item with ID:", id);
  };

  if (account && account.role !== "ADMIN") {
    return (
      <Typography variant="h6" align="center">
        Access Denied. Only admins can view this page.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1200 }}>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
          }}
        >
          User Table
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      fontSize: { xs: "0.5em", sm: "0.8rem" },
                      fontWeight: "bold",
                      padding: { xs: "4px 8px", sm: "8px 16px" },
                      textAlign: "center",
                      display: "table-cell",
                      textTransform: "uppercase",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(allProfiles) &&
                allProfiles.map((row: IUserProfile, index: number) => (
                  <TableRowComponent
                    key={row.id}
                    row={row}
                    index={index}
                    onView={handleView}
                    onDelete={handleDelete}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TableComponent;
