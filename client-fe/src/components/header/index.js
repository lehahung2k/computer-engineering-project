import React from "react";
import style from "./style.module.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import TableRowsIcon from "@mui/icons-material/TableRows";

const ColorButton = styled(Button)({
  backgroundColor: "#4BB3EE",
  margin: "10px",
});

export default function Header({ text, openSidebar, handleOpenSidebar }) {
  const navigate = useNavigate();
  sessionStorage.getItem("accessToken") == null
    ? console.log(sessionStorage.getItem("accessToken"))
    : console.log("not null");

  return (
    <div className={style.header}>
      <div
        className={style.header__sidebar__icon}
        onClick={() => handleOpenSidebar(!openSidebar)}
      >
        <TableRowsIcon sx={{ color: "white", fontSize: 24 }} />
      </div>
      <h3>{text}</h3>
      {!sessionStorage.getItem("accessToken") ? (
        <div className={style.header__utils}>
          <ColorButton
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{ fontSize: 11 }}
          >
            Đăng nhập
          </ColorButton>
          <ColorButton
            variant="contained"
            onClick={() => navigate("/register")}
            sx={{ fontSize: 11 }}
          >
            Đăng ký
          </ColorButton>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
