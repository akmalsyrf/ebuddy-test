import { RootState } from "@/store/store";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const StatusProcess: React.FC<{ successMessage: string, module: keyof RootState }> = ({
  successMessage,
  module
}) => {
  const { loading, error, success } = useSelector(
    (state: RootState) => state[module]
  );
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      {loading && (
        <Typography variant="body2" color="primary" align="center">
          Loading...
        </Typography>
      )}
      {error && (
        <Typography variant="body2" color="error" align="center">
          {error}
        </Typography>
      )}
      {success && !loading && !error && (
        <Typography variant="body2" color="success.main" align="center">
          {successMessage}
        </Typography>
      )}
    </Box>
  );
};

export default StatusProcess;
