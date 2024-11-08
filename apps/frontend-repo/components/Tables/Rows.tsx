import React from "react";
import { TableRow, TableCell, Button, Box } from "@mui/material";

interface RowData {
  id?: string;
  accountId: string;
  fullName: string;
  age: number;
  address: string[];
  university: {
    bachelor: string;
    master: string;
  };
}

interface TableRowComponentProps {
  row: RowData;
  index: number;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableRowComponent: React.FC<TableRowComponentProps> = ({
  row,
  index,
  onView,
  onDelete,
}) => {
  const cellStyle = {
    fontSize: { xs: "0.5rem", sm: "0.8rem" },
    padding: { xs: "4px 6px", sm: "8px 16px" },
    height: { xs: "30px", sm: "auto" },
  };

  const rowId = row.id ?? "";

  return (
    <TableRow>
      <TableCell align="center" sx={cellStyle}>
        {index + 1}
      </TableCell>
      <TableCell align="center" sx={cellStyle}>
        {row.fullName}
      </TableCell>
      <TableCell align="center" sx={cellStyle}>
        {row.age}
      </TableCell>
      <TableCell align="center" sx={cellStyle}>
        {row.address}
      </TableCell>
      <TableCell align="center" sx={cellStyle}>
        {row.university.bachelor}
      </TableCell>
      <TableCell align="center" sx={cellStyle}>
        {row.university.master}
      </TableCell>
      <TableCell align="center" sx={cellStyle}>
        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onView(rowId)}
            sx={{
              fontSize: { xs: "0.5rem", sm: "0.75rem" },
              padding: { xs: "2px 4px", sm: "6px 12px" },
            }}
          >
            View
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDelete(rowId)}
            sx={{
              fontSize: { xs: "0.5rem", sm: "0.75rem" },
              padding: { xs: "2px 4px", sm: "6px 12px" },
            }}
          >
            Delete
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
