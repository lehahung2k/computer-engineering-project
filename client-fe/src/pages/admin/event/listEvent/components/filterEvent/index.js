import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
// @mui
import { Button, Menu } from "@mui/material";
// component
import Iconify from "../../../../../../components/iconify";

const SORT_BY_OPTIONS = [
  { value: "all", label: "Tất cả" },
  { value: "upcoming", label: "Sắp diễn ra" },
  { value: "ongoing", label: "Đang diễn ra" },
  { value: "done", label: "Đã kết thúc" },
];

export default function EventFilter() {
  const [open, setOpen] = React.useState(null);
  const [option, setOption] = React.useState("Tất cả");
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
        Lọc sự kiện:&nbsp;
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
