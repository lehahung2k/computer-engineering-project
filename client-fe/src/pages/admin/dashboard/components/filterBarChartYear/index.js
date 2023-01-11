import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
// @mui
import { Button, Menu } from "@mui/material";
// component
import Iconify from "../../../../../components/iconify";

const SORT_BY_OPTIONS = [
  { value: 2022, label: "2022" },
  { value: 2023, label: "2023" },
];

export default function BarChartYearFilter() {
  const [open, setOpen] = React.useState(null);
  const [option, setOption] = React.useState("2022");
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (option) => {
    setOpen(null);
    console.log(option);
    setOption(option);
  };

  return (
    <>
      <Button
        color="inherit"
        // disableRipple
        style={{ textTransform: "none" }}
        onClick={handleOpen}
        endIcon={
          <Iconify
            icon={open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"}
          />
        }
      >
        Thống kê năm:&nbsp;
        <Typography
          component="span"
          variant="body2"
          sx={{ color: "text.secondary" }}
        >
          {option}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={() => handleClose(option)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === "newest"}
            onClick={() => handleClose(option.label)}
            sx={{ typography: "body2" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
